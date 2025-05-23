'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { inviteUserToTeam, getUserTeams } from '@/lib/api';
import { Team } from '@/types';
import { useEffect } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  RadioGroup,
  RadioGroupItem,
} from '@/components/ui/radio-group';
import { toast } from 'sonner';

export function InviteUserForm() {
  const [email, setEmail] = useState('');
  const [teamId, setTeamId] = useState('');
  const [role, setRole] = useState<'admin' | 'member'>('member');
  const [teams, setTeams] = useState<Team[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const userTeams = await getUserTeams();
        setTeams(userTeams);
        if (userTeams.length > 0) {
          setTeamId(userTeams[0].team.id);
        }
      } catch (error) {
        console.error('Error fetching teams:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTeams();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email.trim()) {
      setError('Email is required');
      return;
    }

    if (!teamId) {
      setError('Please select a team');
      return;
    }

    setIsSubmitting(true);

    try {
      await inviteUserToTeam(email.trim(), teamId, role);

      toast('Invitation sent', {
        description: `Invitation has been sent to ${email}`,
      });

      setEmail('');
    } catch (error: any) {
      console.error('Error inviting user:', error);
      setError(error.message || 'Failed to invite user. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className='space-y-6 max-w-xl'>
        {error && (
          <Alert className="bg-red-50 text-red-800 border-red-200">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
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
          <Label htmlFor="team">Team</Label>
          {isLoading ? (
            <div className="h-10 w-full bg-muted animate-pulse rounded-md"></div>
          ) : teams.length > 0 ? (
            <Select value={teamId} onValueChange={setTeamId}>
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
          ) : (
            <Alert className="bg-yellow-50 text-yellow-800 border-yellow-200">
              <AlertDescription>
                You need to create a team first before inviting members.
              </AlertDescription>
            </Alert>
          )}
        </div>

        <div className="space-y-2">
          <Label>Role</Label>
          <RadioGroup
            value={role}
            onValueChange={(value) => setRole(value as 'admin' | 'member')}
            className="flex flex-col space-y-1"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="admin" id="admin" />
              <Label htmlFor="admin" className="cursor-pointer">Admin</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="member" id="member" />
              <Label htmlFor="member" className="cursor-pointer">Team Member</Label>
            </div>
          </RadioGroup>
        </div>
        <Button
          type="submit"
          className="w-full"
          disabled={isSubmitting || teams.length === 0}
        >
          {isSubmitting ? 'Sending Invitation...' : 'Send Invitation'}
        </Button>
    </form>
  );
}
