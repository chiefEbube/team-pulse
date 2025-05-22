import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

@Injectable()
export class SupabaseService {
  private supabase: SupabaseClient;

  constructor(private configService: ConfigService) {
    const supabaseUrl = this.configService.get<string>('SUPABASE_URL');
    const supabaseKey = this.configService.get<string>('SUPABASE_KEY');

    if (!supabaseUrl || !supabaseKey) {
      throw new Error('Supabase URL and Key must be provided');
    }

    this.supabase = createClient(supabaseUrl, supabaseKey);
  }

  getClient(): SupabaseClient {
    return this.supabase;
  }

  async getUser(userId: string) {
    const { data, error } = await this.supabase
      .from('users')
      .select('*')
      .eq('id', userId)
      .single();
      
    if (error) throw error;
    return data;
  }

  async getTeam(teamId: string) {
    const { data, error } = await this.supabase
      .from('teams')
      .select('*')
      .eq('id', teamId)
      .single();
      
    if (error) throw error;
    return data;
  }

  async isTeamMember(userId: string, teamId: string) {
    const { data, error } = await this.supabase
      .from('team_members')
      .select('*')
      .eq('user_id', userId)
      .eq('team_id', teamId)
      .single();
      
    if (error) return false;
    return !!data;
  }

  async isTeamAdmin(userId: string, teamId: string) {
    const { data, error } = await this.supabase
      .from('team_members')
      .select('*')
      .eq('user_id', userId)
      .eq('team_id', teamId)
      .eq('role', 'admin')
      .single();
      
    if (error) return false;
    return !!data;
  }

  async isUserAdmin(userId: string) {
    const { data, error } = await this.supabase
      .from('users')
      .select('role')
      .eq('id', userId)
      .single();
      
    if (error) return false;
    return data?.role === 'admin';
  }
}