import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { StatusModule } from './status/status.module';
import { TeamModule } from './team/team.module';
import { UserModule } from './user/user.module';
import { SupabaseModule } from './supabase/supabase.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    SupabaseModule,
    AuthModule,
    StatusModule,
    TeamModule,
    UserModule,
  ],
})
export class AppModule {}