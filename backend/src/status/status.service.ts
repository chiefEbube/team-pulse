import { Injectable } from '@nestjs/common';
import { SupabaseService } from '../supabase/supabase.service';
import { CreateStatusDto } from './dto/create-status.dto';
import { Status } from '../common/models/status.model';

@Injectable()
export class StatusService {
  constructor(private readonly supabaseService: SupabaseService) {}

  async createStatus(userId: string, createStatusDto: CreateStatusDto): Promise<Status> {
    const { teamId, statusType, message } = createStatusDto;
    
    // Check if there's an existing status for this user in this team
    const { data: existingStatus, error: findError } = await this.supabaseService
      .getClient()
      .from('statuses')
      .select('*')
      .eq('user_id', userId)
      .eq('team_id', teamId)
      .single();

    if (findError && findError.code !== 'PGRST116') {
      throw findError;
    }

    if (existingStatus) {
      // Update existing status
      const { data, error } = await this.supabaseService
        .getClient()
        .from('statuses')
        .update({
          status_type: statusType,
          message,
          updated_at: new Date().toISOString(),
        })
        .eq('id', existingStatus.id)
        .select()
        .single();

      if (error) throw error;
      return data;
    } else {
      // Create new status
      const { data, error } = await this.supabaseService
        .getClient()
        .from('statuses')
        .insert({
          user_id: userId,
          team_id: teamId,
          status_type: statusType,
          message,
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    }
  }

  async getTeamStatuses(teamId: string): Promise<Status[]> {
    const { data, error } = await this.supabaseService
      .getClient()
      .from('statuses')
      .select(`
        *,
        users:user_id (
          id,
          email,
          full_name,
          role
        ),
        teams:team_id (
          id,
          name
        )
      `)
      .eq('team_id', teamId)
      .order('updated_at', { ascending: false });

    if (error) throw error;
    return data;
  }

  async canAccessTeam(userId: string, teamId: string): Promise<boolean> {
    return this.supabaseService.isTeamMember(userId, teamId);
  }
}