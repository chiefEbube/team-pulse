"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { MoreHorizontal, Search } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function TeamManagement() {
  const [selectedTeam, setSelectedTeam] = useState("all")

  // Mock data for teams
  const teams = [
    { id: "all", name: "All Teams" },
    { id: "team1", name: "Frontend Team" },
    { id: "team2", name: "Backend Team" },
    { id: "team3", name: "Design Team" },
    { id: "team4", name: "Product Team" },
  ]

  // Mock data for team members
  const teamMembers = [
    {
      id: 1,
      name: "John Doe",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "JD",
      email: "john@example.com",
      team: "Frontend Team",
      role: "Admin",
      status: "Active",
    },
    {
      id: 2,
      name: "Jane Smith",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "JS",
      email: "jane@example.com",
      team: "Product Team",
      role: "Member",
      status: "Active",
    },
    {
      id: 3,
      name: "Mike Johnson",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "MJ",
      email: "mike@example.com",
      team: "Backend Team",
      role: "Member",
      status: "Active",
    },
    {
      id: 4,
      name: "Sarah Williams",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "SW",
      email: "sarah@example.com",
      team: "Design Team",
      role: "Member",
      status: "Invited",
    },
    {
      id: 5,
      name: "Alex Chen",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "AC",
      email: "alex@example.com",
      team: "Frontend Team",
      role: "Member",
      status: "Active",
    },
  ]

  // Filter members based on selected team
  const filteredMembers =
    selectedTeam === "all"
      ? teamMembers
      : teamMembers.filter((member) => member.team === teams.find((t) => t.id === selectedTeam)?.name)

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="sm:w-64">
          <Label htmlFor="team-filter">Filter by Team</Label>
          <Select value={selectedTeam} onValueChange={setSelectedTeam}>
            <SelectTrigger id="team-filter">
              <SelectValue placeholder="Select a team" />
            </SelectTrigger>
            <SelectContent>
              {teams.map((team) => (
                <SelectItem key={team.id} value={team.id}>
                  {team.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex-1">
          <Label htmlFor="search">Search</Label>
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input id="search" type="search" placeholder="Search by name or email..." className="w-full pl-8" />
          </div>
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Team</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="w-[80px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredMembers.map((member) => (
              <TableRow key={member.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={member.avatar || "/placeholder.svg"} alt={member.name} />
                      <AvatarFallback>{member.initials}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">{member.name}</div>
                      <div className="text-xs text-muted-foreground">{member.email}</div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>{member.team}</TableCell>
                <TableCell>
                  <Badge variant={member.role === "Admin" ? "default" : "outline"}>{member.role}</Badge>
                </TableCell>
                <TableCell>
                  <Badge variant={member.status === "Active" ? "default" : "secondary"}>{member.status}</Badge>
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Open menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>Edit User</DropdownMenuItem>
                      <DropdownMenuItem>Change Role</DropdownMenuItem>
                      <DropdownMenuItem>Change Team</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-red-600">Remove User</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
