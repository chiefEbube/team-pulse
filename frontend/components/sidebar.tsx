"use client"

import type React from "react"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { LayoutDashboard, Users, Settings } from "lucide-react"
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface SidebarWrapperProps {
  children: React.ReactNode
  isAdmin?: boolean
}

export function SidebarWrapper({ children, isAdmin = true }: SidebarWrapperProps) {
  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex min-h-screen w-full">
        <AppSidebar isAdmin={isAdmin} />
        <div className="flex flex-1 flex-col">
          <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-4 sm:px-6">
            <SidebarTrigger />
            <div className="ml-auto flex items-center gap-4">
              <UserNav />
            </div>
          </header>
          <main className="flex-1 p-4 sm:p-6">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  )
}

interface AppSidebarProps {
  isAdmin?: boolean
}

function AppSidebar({ isAdmin = false }: AppSidebarProps) {
  const pathname = usePathname()
  const adminLink = isAdmin ? "/admin" : "/access-denied"
  const isAdminPage = pathname === "/admin" || pathname === "/access-denied"

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
            <SidebarMenuButton asChild isActive={pathname === "/team"} tooltip="Team">
              <Link href="/team">
                <Users className="h-5 w-5" />
                <span>Team</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>

          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={isAdminPage} tooltip="Admin">
              <Link href={adminLink}>
                <Settings className="h-5 w-5" />
                <span>Admin Panel</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="border-t p-4">
        <div className="flex items-center gap-3 px-2">
          <Avatar className="h-9 w-9">
            <AvatarImage src="/placeholder.svg?height=36&width=36" alt="Avatar" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span className="text-sm font-medium">John Doe</span>
            <span className="text-xs text-muted-foreground">john@example.com</span>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}

function UserNav() {
  return (
    <Avatar className="h-9 w-9 cursor-pointer">
      <AvatarImage src="/placeholder.svg?height=36&width=36" alt="Avatar" />
      <AvatarFallback>JD</AvatarFallback>
    </Avatar>
  )
}
