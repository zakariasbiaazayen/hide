// ========================================
// SERVICE LAYER - Backend Integration
// ========================================

import type {
  EmailPayload,
  EmailResponse,
  LogsFilter,
  LogsResponse,
  AdminMember,
  PermissionUpdate,
  PermissionsResponse,
} from '../types/settings.types';

// API Configuration
const API_BASE_URL ='https://api.yourdomain.com';

// Generic API error handler
class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message);
    this.name = 'ApiError';
  }
}

// ========================================
// EMAIL SERVICE
// ========================================
export class EmailService {
  private static endpoint = `${API_BASE_URL}/admin/email`;

  /**
   * Send email to selected category
   * @param payload - Email data including category, subject, content, and optional image
   * @returns Promise with success status and message
   */
  static async sendEmail(payload: EmailPayload): Promise<EmailResponse> {
    try {
      const formData = new FormData();
      formData.append('category', payload.category);
      formData.append('subject', payload.subject);
      formData.append('content', payload.content);
      
      if (payload.image) {
        formData.append('image', payload.image);
      }

      const response = await fetch(`${this.endpoint}/send`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.getAuthToken()}`,
        },
        body: formData,
      });

      if (!response.ok) {
        throw new ApiError(response.status, 'Failed to send email');
      }

      return await response.json();
    } catch (error) {
      console.error('Email service error:', error);
      throw error;
    }
  }

  /**
   * Get recipient count for a category (useful for preview)
   */
  static async getRecipientCount(category: string): Promise<number> {
    try {
      const response = await fetch(
        `${this.endpoint}/recipients/count?category=${category}`,
        {
          headers: {
            'Authorization': `Bearer ${this.getAuthToken()}`,
          },
        }
      );

      if (!response.ok) {
        throw new ApiError(response.status, 'Failed to fetch recipient count');
      }

      const data = await response.json();
      return data.count;
    } catch (error) {
      console.error('Recipient count error:', error);
      throw error;
    }
  }

  private static getAuthToken(): string {
    // Replace with your actual token retrieval logic
    return localStorage.getItem('admin_token') || '';
  }
}

// ========================================
// LOGS SERVICE
// ========================================
export class LogsService {
  private static endpoint = `${API_BASE_URL}/admin/logs`;

  /**
   * Fetch admin logs with optional filters
   * @param filters - Filter criteria including email, date range, pagination
   * @returns Promise with logs data and pagination info
   */
  static async fetchLogs(filters?: LogsFilter): Promise<LogsResponse> {
    try {
      const queryParams = new URLSearchParams();
      
      if (filters?.email) queryParams.append('email', filters.email);
      if (filters?.startDate) queryParams.append('startDate', filters.startDate);
      if (filters?.endDate) queryParams.append('endDate', filters.endDate);
      if (filters?.page) queryParams.append('page', filters.page.toString());
      if (filters?.limit) queryParams.append('limit', filters.limit.toString());

      const response = await fetch(
        `${this.endpoint}?${queryParams.toString()}`,
        {
          headers: {
            'Authorization': `Bearer ${this.getAuthToken()}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (!response.ok) {
        throw new ApiError(response.status, 'Failed to fetch logs');
      }

      return await response.json();
    } catch (error) {
      console.error('Logs service error:', error);
      throw error;
    }
  }

  /**
   * Export logs to CSV
   */
  static async exportLogs(filters?: LogsFilter): Promise<Blob> {
    try {
      const queryParams = new URLSearchParams();
      
      if (filters?.email) queryParams.append('email', filters.email);
      if (filters?.startDate) queryParams.append('startDate', filters.startDate);
      if (filters?.endDate) queryParams.append('endDate', filters.endDate);

      const response = await fetch(
        `${this.endpoint}/export?${queryParams.toString()}`,
        {
          headers: {
            'Authorization': `Bearer ${this.getAuthToken()}`,
          },
        }
      );

      if (!response.ok) {
        throw new ApiError(response.status, 'Failed to export logs');
      }

      return await response.blob();
    } catch (error) {
      console.error('Export logs error:', error);
      throw error;
    }
  }

  private static getAuthToken(): string {
    return localStorage.getItem('admin_token') || '';
  }
}

// ========================================
// PERMISSIONS SERVICE
// ========================================
export class PermissionsService {
  private static endpoint = `${API_BASE_URL}/admin/permissions`;

  /**
   * Fetch all admin members with their current permissions
   */
  static async fetchMembers(): Promise<AdminMember[]> {
    try {
      const response = await fetch(`${this.endpoint}/members`, {
        headers: {
          'Authorization': `Bearer ${this.getAuthToken()}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new ApiError(response.status, 'Failed to fetch members');
      }

      return await response.json();
    } catch (error) {
      console.error('Fetch members error:', error);
      throw error;
    }
  }

  /**
   * Update permissions for a specific admin member
   */
  static async updatePermissions(
    update: PermissionUpdate
  ): Promise<PermissionsResponse> {
    try {
      const response = await fetch(`${this.endpoint}/update`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${this.getAuthToken()}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(update),
      });

      if (!response.ok) {
        throw new ApiError(response.status, 'Failed to update permissions');
      }

      return await response.json();
    } catch (error) {
      console.error('Update permissions error:', error);
      throw error;
    }
  }

  /**
   * Bulk update permissions for multiple members
   */
  static async bulkUpdatePermissions(
    updates: PermissionUpdate[]
  ): Promise<PermissionsResponse> {
    try {
      const response = await fetch(`${this.endpoint}/bulk-update`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${this.getAuthToken()}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ updates }),
      });

      if (!response.ok) {
        throw new ApiError(response.status, 'Failed to bulk update permissions');
      }

      return await response.json();
    } catch (error) {
      console.error('Bulk update permissions error:', error);
      throw error;
    }
  }

  private static getAuthToken(): string {
    return localStorage.getItem('admin_token') || '';
  }
}

// ========================================
// MOCK DATA FOR DEVELOPMENT
// ========================================
export const MockDataService = {
  // Mock email send (use this during development)
  mockSendEmail: async (payload: EmailPayload): Promise<EmailResponse> => {
    await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate network delay
    
    const recipientCounts = {
      members: 245,
      users: 1823,
      newsletter_subscribers: 5420,
    };

    return {
      success: true,
      message: 'Email sent successfully',
      sentCount: recipientCounts[payload.category],
    };
  },

  // Mock logs fetch
  mockFetchLogs: async (filters?: LogsFilter): Promise<LogsResponse> => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const mockLogs = Array.from({ length: 50 }, (_, i) => ({
      id: `log-${i + 1}`,
      memberEmail: ['admin@robotics.com', 'john.doe@robotics.com', 'sarah.admin@robotics.com'][i % 3],
      memberName: ['Admin User', 'John Doe', 'Sarah Anderson'][i % 3],
      location: ['San Francisco, USA', 'London, UK', 'Tokyo, Japan'][i % 3],
      ipAddress: `192.168.1.${i + 1}`,
      city: ['San Francisco', 'London', 'Tokyo'][i % 3],
      country: ['USA', 'UK', 'Japan'][i % 3],
      date: new Date(Date.now() - i * 86400000).toISOString().split('T')[0],
      time: `${String(Math.floor(Math.random() * 24)).padStart(2, '0')}:${String(Math.floor(Math.random() * 60)).padStart(2, '0')}`,
      timestamp: Date.now() - i * 86400000,
    }));

    return {
      logs: mockLogs.slice(0, 10),
      total: 50,
      page: filters?.page || 1,
      totalPages: 5,
    };
  },

  // Mock fetch members
  mockFetchMembers: async (): Promise<AdminMember[]> => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    return [
      {
        id: '1',
        name: 'John Doe',
        email: 'john.doe@robotics.com',
        role: 'Super Admin',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
        joinedDate: '2024-01-15',
        lastActive: '2025-02-13',
        permissions: ['dashboard', 'events', 'members', 'users', 'registrations', 'settings'],
      },
      {
        id: '2',
        name: 'Sarah Anderson',
        email: 'sarah.admin@robotics.com',
        role: 'HR Manager',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
        joinedDate: '2024-03-20',
        lastActive: '2025-02-12',
        permissions: ['members', 'registrations'],
      },
      {
        id: '3',
        name: 'Michael Chen',
        email: 'michael.c@robotics.com',
        role: 'Events Manager',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
        joinedDate: '2024-02-10',
        lastActive: '2025-02-13',
        permissions: ['dashboard', 'events', 'registrations'],
      },
      {
        id: '4',
        name: 'Emma Rodriguez',
        email: 'emma.r@robotics.com',
        role: 'Content Manager',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop',
        joinedDate: '2024-04-05',
        lastActive: '2025-02-11',
        permissions: ['dashboard'],
      },
    ];
  },
};
