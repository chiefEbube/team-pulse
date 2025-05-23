"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CreateTeamForm } from "@/components/create-team-form"
import { InviteUserForm } from "@/components/invite-user-form"
import { TeamManagement } from "@/components/team-management"
import { useAuth } from "@/context/auth"
import AccessDenied from "@/components/access-denied"

export default function Admin() {
  const { user } = useAuth()
  const isAdmin = user?.role === "admin"
  if (!isAdmin) {
    return (
      <AccessDenied/>
    )
  }
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Admin Panel</h1>
        <p className="text-muted-foreground">Manage teams and users</p>
      </div>

      <Tabs defaultValue="teams" className="space-y-4">
        <TabsList>
          <TabsTrigger value="teams">Teams</TabsTrigger>
          <TabsTrigger value="invite">Invite Users</TabsTrigger>
          <TabsTrigger value="manage">Team Status</TabsTrigger>
        </TabsList>

        <TabsContent value="teams" className="space-y-4 max-w-xl">
          <Card>
            <CardHeader>
              <CardTitle>Create Team</CardTitle>
              <CardDescription>Create a new team and add members to it</CardDescription>
            </CardHeader>
            <CardContent>
              <CreateTeamForm />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="invite" className="space-y-4 max-w-xl">
          <Card>
            <CardHeader>
              <CardTitle>Invite User</CardTitle>
              <CardDescription>Add a new user to a team</CardDescription>
            </CardHeader>
            <CardContent>
              <InviteUserForm />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="manage" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Team Status</CardTitle>
              <CardDescription>View status of team members</CardDescription>
            </CardHeader>
            <CardContent>
              <TeamManagement />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
