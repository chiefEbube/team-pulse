import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { StatusUpdateForm } from "@/components/status-update-form"

export default function DashboardPage() {
  // Mock data for team members
  const teamMembers = [
    {
      id: 1,
      name: "John Doe",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "JD",
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
      status: "Working",
      statusColor: "bg-green-500",
      currentTask: "Fixing bugs in authentication flow",
      lastUpdated: "45 minutes ago",
    },
  ]

  // Mock data for team goals
  const teamGoals = [
    {
      id: 1,
      title: "Launch MVP by end of month",
      progress: 65,
      dueDate: "May 31, 2025",
    },
    {
      id: 2,
      title: "Improve test coverage to 80%",
      progress: 40,
      dueDate: "June 15, 2025",
    },
    {
      id: 3,
      title: "Reduce API response time by 30%",
      progress: 25,
      dueDate: "June 30, 2025",
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">Track your team's status and progress</p>
        </div>
      </div>

      <Tabs defaultValue="team-status" className="space-y-4">
        <TabsList>
          <TabsTrigger value="team-status">Team Status</TabsTrigger>
          <TabsTrigger value="goals">Team Goals</TabsTrigger>
          <TabsTrigger value="my-status">My Status</TabsTrigger>
        </TabsList>

        <TabsContent value="team-status" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {teamMembers.map((member) => (
              <Card key={member.id}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <div className="flex items-center space-x-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={member.avatar || "/placeholder.svg"} alt={member.name} />
                      <AvatarFallback>{member.initials}</AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-sm font-medium">{member.name}</CardTitle>
                      <CardDescription className="text-xs">Updated {member.lastUpdated}</CardDescription>
                    </div>
                  </div>
                  <div className="flex items-center space-x-1">
                    <div className={`h-2.5 w-2.5 rounded-full ${member.statusColor}`}></div>
                    <span className="text-xs font-medium">{member.status}</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-sm">{member.currentTask}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="goals" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {teamGoals.map((goal) => (
              <Card key={goal.id}>
                <CardHeader>
                  <CardTitle className="text-lg">{goal.title}</CardTitle>
                  <CardDescription>Due: {goal.dueDate}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span>Progress</span>
                      <span className="font-medium">{goal.progress}%</span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-gray-200">
                      <div className="h-2 rounded-full bg-purple-600" style={{ width: `${goal.progress}%` }}></div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="my-status" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Update Your Status</CardTitle>
              <CardDescription>Let your team know what you're working on and if you need help</CardDescription>
            </CardHeader>
            <CardContent>
              <StatusUpdateForm />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Your Current Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="h-3 w-3 rounded-full bg-green-500"></div>
                    <span className="font-medium">Working</span>
                  </div>
                  <span className="text-sm text-muted-foreground">Updated 10 minutes ago</span>
                </div>

                <div>
                  <h4 className="text-sm font-medium">Current Task</h4>
                  <p className="text-sm text-muted-foreground">Implementing dashboard UI</p>
                </div>

                <div>
                  <h4 className="text-sm font-medium">Notes</h4>
                  <p className="text-sm text-muted-foreground">Making good progress, should be done by EOD.</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
