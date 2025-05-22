import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { SupabaseService } from '../supabase/supabase.service';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private supabaseService: SupabaseService,
  ) {}

  // Simulate JWT validation that would be handled by Supabase Auth
  validateToken(token: string): any {
    try {
      return this.jwtService.verify(token);
    } catch (error) {
      return null;
    }
  }

  async validateUser(userId: string): Promise<any> {
    try {
      const user = await this.supabaseService.getUser(userId);
      return user;
    } catch (error) {
      return null;
    }
  }
}