export type UserRole = 'admin' | 'member';

export interface User {
  id: string;
  email: string;
  role: UserRole;
  name?: string;
  avatar_url?: string;
}

export interface Team {
  id: string;
  name: string;
  created_at: string;
  created_by: string;
}

export interface Status {
  id: string;
  user_id: string;
  team_id: string;
  status: 'Working' | 'On Leave' | 'Blocked' | 'Available';
  current_task?: string;
  note?: string;
  created_at: string;
  updated_at: string;
}

export interface TeamMember {
  id: string;
  user_id: string;
  team_id: string;
  role: UserRole;
  name?: string;
  email: string;
  avatar_url?: string;
  status?: Status;
}