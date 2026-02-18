
export interface UserProfile {
  id: string;
  name: string;
  email: string;
  dateOfBirth: string;
  phoneNumber: number;
  University: string;
  major: string;
  Experience: number;
  LinkedIn: string;
  profilePicture: string;
  role: string;
  joinedDate: string;
  lastActive: string;
  imageUrl: string;
  
}

export interface ProfileUpdatePayload {
  fullName: string;
  email: string;
  dateOfBirth: string;
  phone: number;
  university: string;
  major: string;
  yearsExperience: number;
  linkedinUrl: string;
}

export interface PasswordChangePayload {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export interface ProfilePictureUpload {
  file: File;
  preview: string;
}

export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
}

export interface ValidationError {
  field: string;
  message: string;
}

export type PasswordStrength = 'weak' | 'medium' | 'strong';
