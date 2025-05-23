"use client"

import type React from "react"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { LayoutDashboard, Users, Settings, LogOut, ChevronDown, ChevronRight } from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "./ui/button"
import { useAuth } from "@/context/auth"
import { Team, User } from "@/types"
import { useEffect, useState } from "react"
import { getUserTeams } from "@/lib/api"

interface SidebarWrapperProps {
  children: React.ReactNode
}

function getInitials(name?: string) {
  if (!name) return ""
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .toUpperCase()
}

export function SidebarWrapper({ children }: SidebarWrapperProps) {
  const { user, signOut } = useAuth();
  const isAdmin = user?.role === "admin"
  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex min-h-screen w-full">
        <AppSidebar isAdmin={isAdmin} user={user} signOut={signOut} />
        <div className="flex flex-1 flex-col">
          <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-4 sm:px-6">
            <SidebarTrigger />
            <div className="ml-auto flex items-center gap-4">
              <UserNav user={user} />
            </div>
          </header>
          <main className="flex-1 p-4 sm:p-6">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  )
}

interface AppSidebarProps {
  isAdmin?: boolean,
  user?: User | null
  signOut?: () => void
}

function AppSidebar({ isAdmin, user, signOut }: AppSidebarProps) {
  const pathname = usePathname()
  const [teams, setTeams] = useState<Team[]>([]);
  const [teamsExpanded, setTeamsExpanded] = useState(true);

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const userTeams = await getUserTeams();
        console.log("TEAMS", userTeams);
        setTeams(userTeams);
      } catch (error) {
        console.error('Error fetching teams:', error);
      }
    };

    fetchTeams();
  }, [user]);

  return (
    <Sidebar>
      <SidebarHeader className="flex flex-col gap-0 px-2 py-4">
        <div className="flex items-center gap-2 px-2">
          <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-white font-bold">
            TP
          </div>
          <span className="text-lg font-bold">TeamPulse</span>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={pathname === "/dashboard"} tooltip="Dashboard">
              <Link href="/dashboard">
                <LayoutDashboard className="h-5 w-5" />
                <span>Dashboard</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>

          <SidebarMenuItem>
            <SidebarMenuButton onClick={() => setTeamsExpanded(!teamsExpanded)}>
              {teamsExpanded ? (
                <ChevronDown className="h-4 w-4 mr-" />
              ) : (
                <ChevronRight className="h-4 w-4 mr-1" />
              )}
              My Teams
            </SidebarMenuButton>

            {teamsExpanded && (
              <div className="space-y-1 ml-4">
                {teams.length > 0 ? (
                  teams.map(({ team }) => (
                    <Button
                      key={team.id}
                      variant={pathname === `/teams/${team.id}` ? 'secondary' : 'ghost'}
                      className="w-full justify-start"
                      asChild
                    >
                      <Link href={`/teams/${team.id}`}>
                        <Users className="mr-2 h-4 w-4" />
                        {team.name}
                      </Link>
                    </Button>
                  ))
                ) : (
                  <p className="text-sm text-muted-foreground py-2">No teams found</p>
                )}
              </div>
            )}
          </SidebarMenuItem>
          {isAdmin && (
            <SidebarMenuItem>
              <SidebarMenuButton asChild isActive={pathname === "/admin"} tooltip="Admin">
                <Link href="/admin">
                  <Settings className="h-5 w-5" />
                  <span>Admin Panel</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          )}
        </SidebarMenu>

      </SidebarContent>
      <SidebarFooter className="border-t p-4">
        <div className="flex items-center gap-3 px-2 mb-4">
          <Avatar className="h-9 w-9">
            <AvatarFallback>{getInitials(user?.full_name)}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span className="text-sm font-medium">{user?.full_name}</span>
            <span className="text-xs text-muted-foreground">{user?.email}</span>
            <span className="text-xs text-muted-foreground">{user?.role}</span>
          </div>
        </div>
        <div className="flex items-center gap-3 px-2 mb-7">
          <Button
            variant="ghost"
            className="w-full justify-start py-4"
            onClick={() => signOut?.()}
          >
            <LogOut className="mr-2 h-4 w-4" />
            Log out
          </Button>
        </div>
      </SidebarFooter>
    </Sidebar >
  )
}

function UserNav({ user }: { user: User | null }) {
  return (
    <Avatar className="h-9 w-9 cursor-pointer">
      <AvatarFallback>{getInitials(user?.full_name)}</AvatarFallback>
    </Avatar>
  )
}
