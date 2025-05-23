"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { CardContent, CardFooter } from "./ui/card"
import { Alert, AlertDescription } from "./ui/alert"
import { createTeam } from "@/lib/api"
import { toast } from "sonner"

export function CreateTeamForm() {
  const [teamName, setTeamName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!teamName.trim()) {
      setError('Team name is required');
      return;
    }

    setIsSubmitting(true);

    try {
      await createTeam(teamName.trim());

      toast("Team created", {
        description: "Your team has been created successfully",
      })

      setTeamName('');
    } catch (error: unknown) {
      console.error('Error creating team:', error);
      if (error && typeof error === 'object' && 'message' in error) {
        setError((error as { message?: string }).message || 'Failed to create team. Please try again.');
      } else {
        setError('Failed to create team. Please try again.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (

    <form onSubmit={handleSubmit}className="max-w-xl space-y-4">
      <CardContent className="space-y-4">
        {error && (
          <Alert className="bg-red-50 text-red-800 border-red-200">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <div className="space-y-2">
          <Label htmlFor="teamName">Team Name</Label>
          <Input
            id="teamName"
            placeholder="E.g., Frontend Team"
            value={teamName}
            onChange={(e) => setTeamName(e.target.value)}
            required
          />
        </div>
      </CardContent>
      <CardFooter>
        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? 'Creating...' : 'Create Team'}
        </Button>
      </CardFooter>
    </form>
  )
}
