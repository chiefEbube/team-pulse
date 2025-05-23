"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { getTeamStatuses, updateStatus, getUserTeams } from "@/lib/api"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { RefreshCw, AlertCircle } from "lucide-react"
import { SidebarWrapper } from "@/components/sidebar"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import type { Status, Team } from "@/types"

export default function TeamDetailPage() {
  const params = useParams()
  const teamId = params.id as string

  const [team, setTeam] = useState<Team | null>(null)
  const [statuses, setStatuses] = useState<Status[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Status update form state
  const [statusType, setStatusType] = useState<"WORKING" | "ON_LEAVE" | "BLOCKED" | "AVAILABLE">("WORKING")
  const [statusMessage, setStatusMessage] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [updateSuccess, setUpdateSuccess] = useState(false)

  // Fetch team data and statuses
  useEffect(() => {
    const fetchTeamData = async () => {
      try {
        setIsLoading(true)
        setError(null)

        // Fetch team details
        const teams = await getUserTeams()
        const currentTeam = teams.find((t) => t.team.id === teamId)

        if (!currentTeam) {
          setError("Team not found")
          return
        }

        setTeam(currentTeam)

        // Fetch team statuses
        const teamStatuses = await getTeamStatuses(teamId)
        setStatuses(teamStatuses)
      } catch (err) {
        console.error("Error fetching team data:", err)
        setError("Failed to load team data. Please try again.")
      } finally {
        setIsLoading(false)
      }
    }

    if (teamId) {
      fetchTeamData()
    }
  }, [teamId])

  // Handle status update submission
  const handleStatusUpdate = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!teamId) return

    try {
      setIsSubmitting(true)
      setError(null)

      await updateStatus(teamId, statusType, statusMessage)

      // Refresh statuses after update
      const updatedStatuses = await getTeamStatuses(teamId)
      setStatuses(updatedStatuses)

      // Show success message
      setUpdateSuccess(true)
      setTimeout(() => setUpdateSuccess(false), 3000)

      // Reset form
      setStatusMessage("")
    } catch (err) {
      console.error("Error updating status:", err)
      setError("Failed to update status. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  // Handle refresh button click
  const handleRefresh = async () => {
    try {
      setIsLoading(true)
      setError(null)

      const teamStatuses = await getTeamStatuses(teamId)
      setStatuses(teamStatuses)
    } catch (err) {
      console.error("Error refreshing statuses:", err)
      setError("Failed to refresh team data. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">{team?.team.name || "Team"}</h1>
          <p className="text-muted-foreground">
            {isLoading ? "Loading team details..." : `${statuses.length} team members`}
          </p>
        </div>
        <Button variant="outline" size="sm" className="gap-1" onClick={handleRefresh} disabled={isLoading}>
          <RefreshCw className="h-4 w-4" />
          <span>Refresh</span>
        </Button>
      </div>

      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Team Members Status</CardTitle>
          <CardDescription>View the current status of all team members</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Current Task</TableHead>
                  <TableHead>Last Updated</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center py-4">
                      Loading team members...
                    </TableCell>
                  </TableRow>
                ) : statuses.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center py-4">
                      No status updates found for this team
                    </TableCell>
                  </TableRow>
                ) : (
                  statuses.map((status) => (
                    <TableRow key={`${status.user_id}-${status.team_id}`}>
                      <TableCell>
                        <div className="flex flex-col">
                          <div className="font-medium">{status.users.full_name}</div>
                          <div className="text-xs text-muted-foreground">{status.users.email}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <div className="flex items-center gap-2">
                                <div
                                  className={`h-2.5 w-2.5 rounded-full ${status.status_type === "WORKING"
                                    ? "bg-green-500"
                                    : status.status_type === "ON_LEAVE"
                                      ? "bg-yellow-500"
                                      : status.status_type === "BLOCKED"
                                        ? "bg-red-500"
                                        : status.status_type === "AVAILABLE"
                                          ? "bg-blue-500"
                                          : "bg-gray-500"
                                    }`}
                                ></div>
                                <span className="font-medium">{status.status_type.replace("_", " ")}</span>
                              </div>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Last updated: {new Date(status.updated_at).toLocaleString()}</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </TableCell>
                      <TableCell>
                        <div className="max-w-[300px]">
                          {status.message || <span className="text-muted-foreground italic">No message</span>}
                        </div>
                      </TableCell>
                      <TableCell>
                        {new Date(status.updated_at).toLocaleDateString()} at{" "}
                        {new Date(status.updated_at).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
