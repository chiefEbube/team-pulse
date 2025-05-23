import { Users } from "lucide-react";
import { Card, CardDescription, CardHeader, CardTitle } from "./ui/card";

export default function NoTeam() {
     return (
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Welcome to TeamPulse</h1>
          </div>
        </div>

        <Card className="max-w-xl">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-primary" />
              <CardTitle>{`You're not in any teams yet`}</CardTitle>
            </div>
            <CardDescription>
              You need to be added to a team before you can update your status or view team information.
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    )
}