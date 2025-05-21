"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"

export function InviteUserForm() {
  const [email, setEmail] = useState("")
  const [role, setRole] = useState("member")
  const [team, setTeam] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Mock data for teams
  const teams = [
    { id: "team1", name: "Frontend Team" },
    { id: "team2", name: "Backend Team" },
    { id: "team3", name: "Design Team" },
    { id: "team4", name: "Product Team" },
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // In a real app, we would submit to an API
    // For demo purposes, we'll just simulate a delay
    setTimeout(() => {
      setIsSubmitting(false)
      // Reset form or show success message
      alert("Invitation sent successfully!")
      setEmail("")
    }, 1000)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="email">Email Address</Label>
        <Input
          id="email"
          type="email"
          placeholder="user@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="role">Role</Label>
        <Select value={role} onValueChange={setRole}>
          <SelectTrigger id="role">
            <SelectValue placeholder="Select a role" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="admin">Admin</SelectItem>
            <SelectItem value="member">Team Member</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="team">Team</Label>
        <Select value={team} onValueChange={setTeam}>
          <SelectTrigger id="team">
            <SelectValue placeholder="Select a team" />
          </SelectTrigger>
          <SelectContent>
            {teams.map((team) => (
              <SelectItem key={team.id} value={team.id}>
                {team.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Sending Invitation..." : "Send Invitation"}
      </Button>

      <div className="pt-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-sm">
              <p className="font-medium">Invitation Preview</p>
              <p className="text-muted-foreground mt-2">
                An email will be sent to {email || "the recipient"} with instructions to join the team.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </form>
  )
}
