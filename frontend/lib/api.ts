import { Status, Team, TeamMember, User } from '@/types';

const BASE_API_URL = process.env.NEXT_PUBLIC_API_URL

async function fetchWithAuth(endpoint: string, options: RequestInit = {}) {
  const raw = localStorage.getItem('sb-nvmprofsjdrjzabolnul-auth-token');
  const token = JSON.parse(raw ?? '{}').access_token;
  
  if (!token) {
    throw new Error('No authentication token found');
  }

  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`,
    ...options.headers,
  };

  const response = await fetch(`${BASE_API_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.message || 'Something went wrong');
  }

  return response.json();
}

export async function getCurrentUser(): Promise<User> {
  return fetchWithAuth('/user/me');
}

export async function getUserTeams(): Promise<Team[]> {
  return fetchWithAuth('/user/teams');
}

export async function getTeamStatuses(teamId: string): Promise<Status[]> {
  return fetchWithAuth(`/status/team/${teamId}`);
}

export async function createTeam(name: string): Promise<Team> {
  return fetchWithAuth('/team', {
    method: 'POST',
    body: JSON.stringify({ name }),
  });
}

export async function inviteUserToTeam(email: string, teamId: string, role: 'admin' | 'member'): Promise<void> {
  return fetchWithAuth('/team/invite', {
    method: 'POST',
    body: JSON.stringify({ email, teamId, role }),
  });
}

export async function updateStatus(
  teamId: string,
  statusType: 'WORKING' | 'ON_LEAVE' | 'BLOCKED' | 'AVAILABLE',
  message: string,
): Promise<Status> {
  return fetchWithAuth('/status', {
    method: 'POST',
    body: JSON.stringify({
      teamId,
      statusType,
      message,
    }),
  });
}

export async function getTeamMembers(teamId: string): Promise<TeamMember[]> {
  return fetchWithAuth(`/team/${teamId}/members`);
}