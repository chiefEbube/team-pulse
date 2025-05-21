import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight, Clock, Users } from "lucide-react"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100">
      <header className="container mx-auto px-4 py-6 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="size-10 rounded-md bg-primary flex items-center justify-center">
            <Clock className="text-primary-foreground size-6" />
          </div>
          <h1 className="text-xl font-bold">TeamPulse</h1>
        </div>
        <div className="flex gap-4">
          <Button variant="outline" asChild>
            <Link href="/login">Login</Link>
          </Button>
          <Button asChild>
            <Link href="/register">Sign Up</Link>
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Keep your team aligned and informed</h1>
          <p className="text-lg text-muted-foreground mb-8">
            TeamPulse helps you track team availability, current tasks, and progress towards goals in one place.
          </p>
          <Button size="lg" asChild>
            <Link href="/register">
              Get Started <ArrowRight className="ml-2 size-4" />
            </Link>
          </Button>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mt-16">
          <Card>
            <CardHeader>
              <CardTitle>Track Availability</CardTitle>
              <CardDescription>See who's available, on leave, or blocked at a glance.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-40 rounded-md bg-slate-200 flex items-center justify-center">
                <Users className="size-12 text-slate-400" />
              </div>
            </CardContent>
            <CardFooter>
              <p className="text-sm text-muted-foreground">Easy status updates for the whole team.</p>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Current Tasks</CardTitle>
              <CardDescription>Know what everyone is working on right now.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-40 rounded-md bg-slate-200 flex items-center justify-center">
                <Clock className="size-12 text-slate-400" />
              </div>
            </CardContent>
            <CardFooter>
              <p className="text-sm text-muted-foreground">Transparent updates on current work.</p>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Team Goals</CardTitle>
              <CardDescription>Keep everyone aligned with shared objectives.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-40 rounded-md bg-slate-200 flex items-center justify-center">
                <Users className="size-12 text-slate-400" />
              </div>
            </CardContent>
            <CardFooter>
              <p className="text-sm text-muted-foreground">Track progress towards your team goals.</p>
            </CardFooter>
          </Card>
        </div>
      </main>

      <footer className="container mx-auto px-4 py-8 mt-16 border-t">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">© 2024 TeamPulse. All rights reserved.</p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
              Terms
            </Link>
            <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
              Privacy
            </Link>
            <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
              Contact
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
