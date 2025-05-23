export type UserRole = 'admin' | 'member';

export interface User {
  id: string;
  email: string;
  role: UserRole;
  full_name?: string;
}

export interface Team {
  role: string,
  team: {
    id: string,
    name: string,
  }
}

export interface Status {
  id: string
  user_id: string
  team_id: string
  status_type:  'WORKING' | 'ON_LEAVE' | 'BLOCKED' | 'AVAILABLE'
  message?: string
  created_at: string
  updated_at: string
  users: {
  id: string
  email: string
  full_name: string,
  role: string
}
  teams: {
  id: string
  name: string
}
}
