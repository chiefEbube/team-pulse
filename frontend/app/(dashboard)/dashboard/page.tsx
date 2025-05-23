"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { StatusUpdateForm } from "@/components/status-update-form"
import { getUserTeams, getTeamStatuses } from "@/lib/api"
import { Skeleton } from "@/components/ui/skeleton"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"
import type { Status } from "@/types"
import { useAuth } from "@/context/auth"

export default function DashboardPage() {
  const { user } = useAuth()
  const [currentStatus, setCurrentStatus] = useState<Status | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchUserStatus = async () => {
      if (!user) return

      try {
        setIsLoading(true)
        setError(null)

        // 1. Get all teams the user belongs to
        const teams = await getUserTeams()

        if (teams.length === 0) {
          setIsLoading(false)
          return
        }

        // 2. Fetch statuses for each team
        const statusPromises = teams.map((team) => getTeamStatuses(team.team.id))
        const teamStatuses = await Promise.all(statusPromises)

        // 3. Flatten the array of status arrays
        const allStatuses = teamStatuses.flat()

        // 4. Filter statuses to find those belonging to the current user
        const userStatuses = allStatuses.filter((status) => status.user_id === user.id)

        // 5. Sort by updated_at to get the most recent status
        userStatuses.sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime())

        // 6. Set the most recent status (if any)
        if (userStatuses.length > 0) {
          setCurrentStatus(userStatuses[0])
        }
      } catch (err) {
        console.error("Error fetching user status:", err)
        setError("Failed to load your current status. Please try again.")
      } finally {
        setIsLoading(false)
      }
    }

    fetchUserStatus()
  }, [user])

  // Function to format the time difference
  const formatTimeDifference = (timestamp: string) => {
    const now = new Date()
    const updateTime = new Date(timestamp)
    const diffInMinutes = Math.floor((now.getTime() - updateTime.getTime()) / (1000 * 60))

    if (diffInMinutes < 1) return "Just now"
    if (diffInMinutes < 60) return `${diffInMinutes} minute${diffInMinutes !== 1 ? "s" : ""} ago`

    const diffInHours = Math.floor(diffInMinutes / 60)
    if (diffInHours < 24) return `${diffInHours} hour${diffInHours !== 1 ? "s" : ""} ago`

    const diffInDays = Math.floor(diffInHours / 24)
    return `${diffInDays} day${diffInDays !== 1 ? "s" : ""} ago`
  }

  // Get status color based on status type
  const getStatusColor = (statusType: string | undefined) => {
    switch (statusType) {
      case "WORKING":
        return "bg-green-500"
      case "ON_LEAVE":
        return "bg-yellow-500"
      case "BLOCKED":
        return "bg-red-500"
      case "AVAILABLE":
        return "bg-blue-500"
      default:
        return "bg-gray-500"
    }
  }

  // Format status type for display
  const formatStatusType = (statusType: string | undefined) => {
    if (!statusType) return "Unknown"
    return statusType
      .replace("_", " ")
      .toLowerCase()
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ")
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">My Status</h1>
        </div>
      </div>

      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <StatusUpdateForm />
        <Card className="max-w-xl">
          <CardHeader>
            <CardTitle>Your Current Status</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Skeleton className="h-6 w-32" />
                  <Skeleton className="h-4 w-40" />
                </div>
                <div className="space-y-2">
                  <Skeleton className="h-5 w-24" />
                  <Skeleton className="h-4 w-full" />
                </div>
                <div className="space-y-2">
                  <Skeleton className="h-5 w-24" />
                  <Skeleton className="h-4 w-full" />
                </div>
              </div>
            ) : !currentStatus ? (
              <div className="text-center py-6 text-muted-foreground">
                <p>No status updates found. Update your status to get started.</p>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className={`h-3 w-3 rounded-full ${getStatusColor(currentStatus.status_type)}`}></div>
                    <span className="font-medium">{formatStatusType(currentStatus.status_type)}</span>
                  </div>
                  <span className="text-sm text-muted-foreground">
                    Updated {formatTimeDifference(currentStatus.updated_at)}
                  </span>
                </div>

                <div>
                  <h4 className="text-sm font-medium">Team</h4>
                  <p className="text-sm text-muted-foreground">{currentStatus.teams.name}</p>
                </div>

                <div>
                  <h4 className="text-sm font-medium">Current Task</h4>
                  <p className="text-sm text-muted-foreground">
                    {currentStatus.message || <span className="italic">No task specified</span>}
                  </p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
