"use client"

import { useEffect, useState } from "react"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { getTeamStatuses, getUserTeams } from "@/lib/api"
import type { Status, Team } from "@/types"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export function TeamManagement() {
  const [selectedTeam, setSelectedTeam] = useState<string>("")
  const [teams, setTeams] = useState<Team[]>([])
  const [statuses, setStatuses] = useState<Status[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const userTeams = await getUserTeams()
        setTeams(userTeams)
        if (userTeams.length > 0) {
          setSelectedTeam(userTeams[0].team.id)
        }
      } catch (error) {
        console.error("Error fetching teams:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchTeams()
  }, [])

  useEffect(() => {
    const fetchStatuses = async () => {
      if (!selectedTeam) return

      try {
        setIsLoading(true)
        const teamStatuses = await getTeamStatuses(selectedTeam)
        setStatuses(teamStatuses)
      } catch (error) {
        console.error("Error fetching statuses:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchStatuses()
  }, [selectedTeam])


  const getStatusBadgeVariant = (statusType: string) => {
    switch (statusType) {
      case "WORKING":
        return "green-200"
      case "ON_LEAVE":
        return "yellow-200"
      case "BLOCKED":
        return "red-200"
      case "AVAILABLE":
        return "blue-200"
      default:
        return "gray-200"
    }
  }


  const filteredStatuses = statuses.filter((status) => {
    if (!searchQuery) return true

    const fullName = status.users.full_name.toLowerCase()
    const email = status.users.email.toLowerCase()
    const query = searchQuery.toLowerCase()

    return fullName.includes(query) || email.includes(query)
  })

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="sm:w-64 space-y-2">
          <Label htmlFor="team-filter">Filter by Team</Label>
          <Select value={selectedTeam} onValueChange={setSelectedTeam}>
            <SelectTrigger id="team-filter">
              <SelectValue placeholder="Select a team" />
            </SelectTrigger>
            <SelectContent>
              {teams.map(({ team }) => (
                <SelectItem key={team.id} value={team.id}>
                  {team.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Team</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Current task</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-4">
                  Loading team members...
                </TableCell>
              </TableRow>
            ) : filteredStatuses.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-4">
                  {searchQuery ? "No team members match your search" : "No team members found"}
                </TableCell>
              </TableRow>
            ) : (
              filteredStatuses.map((status) => (
                <TableRow key={`${status.user_id}-${status.team_id}`}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div>
                        <div className="font-medium">{status.users.full_name}</div>
                        <div className="text-xs text-muted-foreground">{status.users.email}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{status.teams.name}</TableCell>
                  <TableCell>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <div className="flex items-center gap-2">
                            <p className={`text-sm ${status.status_type === "WORKING" ? "text-green-600" :
                                status.status_type === "ON_LEAVE" ? "text-yellow-600" :
                                  status.status_type === "BLOCKED" ? "text-red-600" :
                                    status.status_type === "AVAILABLE" ? "text-blue-600" :
                                      "text-gray-600"
                              }`}>
                              {status.status_type.replace("_", " ").toLowerCase()}
                            </p>
                          </div>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Last updated: {new Date(status.updated_at).toLocaleString()}</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </TableCell>
                  <TableCell>
                    <div className="max-w-[200px] truncate">
                      {status.message || <span className="text-muted-foreground italic">No message</span>}
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

