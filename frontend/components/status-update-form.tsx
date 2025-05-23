'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { getUserTeams, updateStatus } from '@/lib/api';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Team } from '@/types';
import { toast } from 'sonner';

export function StatusUpdateForm() {
  const [teams, setTeams] = useState<Team[]>([]);
  const [teamId, setTeamId] = useState<string>(teams.length > 0 ? teams[0].team.id : '');
  const [statusType, setStatusType] = useState<'WORKING' | 'ON_LEAVE' | 'BLOCKED' | 'AVAILABLE'>('WORKING');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchTeams = async () => {
    try {
      const userTeams = await getUserTeams();
      setTeams(userTeams);

    } catch (error) {
      console.error('Error fetching teams:', error);
    }
  };

  useEffect(() => {
    fetchTeams();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!teamId) {
      toast('Error', {
        description: 'Please select a team',
      });
      return;
    }

    setIsSubmitting(true);

    try {
      await updateStatus(teamId, statusType, message);

      toast('Status updated', {
        description: 'Your status has been updated successfully',
      });

      setMessage('');
    } catch (error) {
      console.error('Error updating status:', error);
      toast('Error', {
        description: 'Failed to update status. Please try again.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="max-w-xl">
      <CardHeader>
        <CardTitle>Update Your Status</CardTitle>
        <CardDescription>
          {`Let your team know what you're working on and your availability.`}
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit} className="space-y-4">
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="team">Team</Label>
            <Select
              value={teamId}
              onValueChange={setTeamId}
              disabled={teams.length === 0}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a team" />
              </SelectTrigger>
              <SelectContent>
                {teams.map(({ team }) => (
                  <SelectItem key={team.id} value={team.id}>
                    {team.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {teams.length === 0 && (
              <p className="text-sm text-muted-foreground">
                You are not a member of any teams.
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="statusType">Status</Label>
            <Select
              value={statusType}
              onValueChange={(value) => setStatusType(value as 'WORKING' | 'ON_LEAVE' | 'BLOCKED' | 'AVAILABLE')}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select your status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="WORKING">Working</SelectItem>
                <SelectItem value="ON_LEAVE">On Leave</SelectItem>
                <SelectItem value="BLOCKED">Blocked</SelectItem>
                <SelectItem value="AVAILABLE">Available</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="message">Current Task</Label>
            <Input
              id="currentTask"
              placeholder="What are you working on?"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full" disabled={isSubmitting || teams.length === 0}>
            {isSubmitting ? 'Updating...' : 'Update Status'}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
