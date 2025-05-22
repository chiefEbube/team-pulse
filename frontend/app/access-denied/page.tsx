import { SidebarWrapper } from "@/components/sidebar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ShieldAlert, ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function AccessDeniedPage() {
  return (
    <SidebarWrapper isAdmin={false}>
      <div className="flex items-center justify-center min-h-[calc(100vh-8rem)]">
        <Card className="max-w-md w-full">
          <CardHeader className="text-center pb-2">
            <div className="flex justify-center mb-6">
              <div className="h-16 w-16 rounded-full bg-red-100 flex items-center justify-center text-red-600">
                <ShieldAlert className="h-8 w-8" />
              </div>
            </div>
            <CardTitle className="text-2xl font-bold">Access Denied</CardTitle>
            <CardDescription className="text-base mt-2">
              You don't have permission to access the Admin Panel
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center text-muted-foreground pb-2">
            <p>
              This area is restricted to administrators only. If you believe you should have access, please contact your
              system administrator.
            </p>
          </CardContent>
          <CardFooter className="flex justify-center pt-4">
            <Link href="/dashboard">
              <Button className="gap-2">
                <ArrowLeft className="h-4 w-4" />
                Back to Dashboard
              </Button>
            </Link>
          </CardFooter>
        </Card>
      </div>
    </SidebarWrapper>
  )
}
