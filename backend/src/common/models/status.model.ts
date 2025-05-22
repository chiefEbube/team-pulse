export enum StatusType {
  WORKING = 'WORKING',
  ON_LEAVE = 'ON_LEAVE',
  BLOCKED = 'BLOCKED',
  AVAILABLE = 'AVAILABLE',
}

export interface Status {
  id: string;
  user_id: string;
  team_id: string;
  status_type: StatusType;
  message: string;
  created_at: Date;
  updated_at: Date;
}