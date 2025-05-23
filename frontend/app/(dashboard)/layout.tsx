import type React from "react"
import { SidebarWrapper } from "@/components/sidebar"
import { ProtectedRoute } from "@/components/protected-route"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ProtectedRoute>
      <SidebarWrapper>{children}</SidebarWrapper>
    </ProtectedRoute>
  )
}
