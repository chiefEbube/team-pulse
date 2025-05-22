export interface User {
  id: string;
  email: string;
  role: 'admin' | 'member';
  created_at: Date;
}