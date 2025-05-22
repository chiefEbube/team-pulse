import { Injectable } from '@nestjs/common';
import { SupabaseService } from '../supabase/supabase.service';

@Injectable()
export class UserService {
  constructor(private readonly supabaseService: SupabaseService) {}

  async getUserProfile(userId: string) {
    const { data, error } = await this.supabaseService
      .getClient()
      .from('users')
      .select('id, email, role')
      .eq('id', userId)
      .single();

    if (error) throw error;
    return data;
  }

  async getUserTeams(userId: string) {
    const { data, error } = await this.supabaseService
      .getClient()
      .from('team_members')
      .select(`
        role,
        team:team_id (
          id,
          name,
          created_at
        )
      `)
      .eq('user_id', userId);

    if (error) throw error;
    return data;
  }
}