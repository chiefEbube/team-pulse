import { Injectable } from '@nestjs/common';
import { SupabaseService } from '../supabase/supabase.service';
import { CreateTeamDto } from './dto/create-team.dto';
import { InviteUserDto } from './dto/invite-user.dto';
import { Team } from '../common/models/team.model';
import { TeamMember } from '../common/models/team-member.model';

@Injectable()
export class TeamService {
  constructor(private readonly supabaseService: SupabaseService) {}

  async createTeam(userId: string, createTeamDto: CreateTeamDto): Promise<Team> {
    const { name } = createTeamDto;

    // Create the team
    const { data: team, error: teamError } = await this.supabaseService
      .getClient()
      .from('teams')
      .insert({
        name,
        created_by: userId,
      })
      .select()
      .single();

    if (teamError) throw teamError;

    // Add the creator as an admin
    const { error: memberError } = await this.supabaseService
      .getClient()
      .from('team_members')
      .insert({
        team_id: team.id,
        user_id: userId,
        role: 'admin',
      });

    if (memberError) throw memberError;

    return team;
  }

  async inviteUser(inviteUserDto: InviteUserDto): Promise<TeamMember> {
    const { teamId, email, role } = inviteUserDto;

    // Find user by email
    const { data: user, error: userError } = await this.supabaseService
      .getClient()
      .from('users')
      .select('id')
      .eq('email', email)
      .single();

    if (userError) {
      throw new Error(`User with email ${email} not found`);
    }

    // Check if user is already a member of the team
    const { data: existingMember, error: memberError } = await this.supabaseService
      .getClient()
      .from('team_members')
      .select()
      .eq('team_id', teamId)
      .eq('user_id', user.id)
      .single();

    if (!memberError && existingMember) {
      throw new Error(`User is already a member of this team`);
    }

    // Add user to team
    const { data: teamMember, error: addError } = await this.supabaseService
      .getClient()
      .from('team_members')
      .insert({
        team_id: teamId,
        user_id: user.id,
        role,
      })
      .select()
      .single();

    if (addError) throw addError;

    return teamMember;
  }

  async isTeamAdmin(userId: string, teamId: string): Promise<boolean> {
    return this.supabaseService.isTeamAdmin(userId, teamId);
  }
}