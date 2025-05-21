import { SidebarWrapper } from "@/components/sidebar"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, Filter } from "lucide-react"

export default function TeamPage() {
  // Mock data for team members
  const teamMembers = [
    {
      id: 1,
      name: "John Doe",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "JD",
      role: "Frontend Developer",
      email: "john@example.com",
      status: "Working",
      statusColor: "bg-green-500",
      currentTask: "Implementing dashboard UI",
      lastUpdated: "10 minutes ago",
    },
    {
      id: 2,
      name: "Jane Smith",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "JS",
      role: "Product Manager",
      email: "jane@example.com",
      status: "In a meeting",
      statusColor: "bg-yellow-500",
      currentTask: "Client presentation prep",
      lastUpdated: "25 minutes ago",
    },
    {
      id: 3,
      name: "Mike Johnson",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "MJ",
      role: "Backend Developer",
      email: "mike@example.com",
      status: "Blocked",
      statusColor: "bg-red-500",
      currentTask: "API integration - waiting for backend",
      lastUpdated: "1 hour ago",
    },
    {
      id: 4,
      name: "Sarah Williams",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "SW",
      role: "UX Designer",
      email: "sarah@example.com",
      status: "On Leave",
      statusColor: "bg-gray-500",
      currentTask: "Out until Thursday",
      lastUpdated: "2 days ago",
    },
    {
      id: 5,
      name: "Alex Chen",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "AC",
      role: "QA Engineer",
      email: "alex@example.com",
      status: "Working",
      statusColor: "bg-green-500",
      currentTask: "Fixing bugs in authentication flow",
      lastUpdated: "45 minutes ago",
    },
  ]

  return (
    <SidebarWrapper>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Team</h1>
            <p className="text-muted-foreground">View and manage your team members</p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input type="search" placeholder="Search team members..." className="w-full pl-8" />
          </div>
          <Button variant="outline" className="gap-2">
            <Filter className="h-4 w-4" />
            <span>Filter</span>
          </Button>
        </div>

        <div className="space-y-4">
          {teamMembers.map((member) => (
            <Card key={member.id}>
              <CardContent className="p-6">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={member.avatar || "/placeholder.svg"} alt={member.name} />
                      <AvatarFallback>{member.initials}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-medium">{member.name}</h3>
                      <p className="text-sm text-muted-foreground">{member.role}</p>
                      <p className="text-sm text-muted-foreground">{member.email}</p>
                    </div>
                  </div>

                  <div className="flex flex-col items-start sm:items-end gap-2">
                    <div className="flex items-center gap-2">
                      <div className={`h-2.5 w-2.5 rounded-full ${member.statusColor}`}></div>
                      <span className="text-sm font-medium">{member.status}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">{member.currentTask}</p>
                    <p className="text-xs text-muted-foreground">Updated {member.lastUpdated}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </SidebarWrapper>
  )
}
