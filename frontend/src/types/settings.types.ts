// ========================================
// TYPE DEFINITIONS
// ========================================

// Email Service Types
export type EmailCategory = 'members' | 'users' | 'newsletter_subscribers';

export interface EmailPayload {
  category: EmailCategory;
  subject: string;
  content: string;
  image?: File | null;
}

export interface EmailResponse {
  success: boolean;
  message: string;
  sentCount?: number;
}

// Admin Logs Types
export interface AdminLog {
  id: string;
  memberEmail: string;
  memberName: string;
  location: string;
  ipAddress: string;
  city?: string;
  country?: string;
  date: string;
  time: string;
  timestamp: number;
}

export interface LogsFilter {
  email?: string;
  startDate?: string;
  endDate?: string;
  page?: number;
  limit?: number;
}

export interface LogsResponse {
  logs: AdminLog[];
  total: number;
  page: number;
  totalPages: number;
}

// Permissions Types
export type AdminSection = 
  | 'dashboard'
  | 'events'
  | 'members'
  | 'users'
  | 'registrations'
  | 'settings';

export interface AdminMember {
  id: string;
  name: string;
  email: string;
  role: string;
  avatar?: string;
  joinedDate: string;
  lastActive: string;
  permissions: AdminSection[];
}

export interface PermissionUpdate {
  memberId: string;
  permissions: AdminSection[];
}

export interface PermissionsResponse {
  success: boolean;
  message: string;
}

// UI State Types
export interface LoadingState {
  isLoading: boolean;
  error: string | null;
}

export interface SelectOption {
  value: string;
  label: string;
}
