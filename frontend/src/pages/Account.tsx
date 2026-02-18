import React, { useState, useEffect } from 'react';
import {
  User,
  Mail,
  Phone,
  Calendar,
  GraduationCap,
  Briefcase,
  Linkedin,
  Camera,
  Shield,
  Edit2,
  Save,
  X,
  Upload,
} from 'lucide-react';
import type {
  UserProfile,
  ProfileUpdatePayload,
  PasswordChangePayload,
  ProfilePictureUpload,
} from '../types/account.types';
import { getProfile, updateProfile, changePassword , uploadImage } from "../services/profile.service";
import {
  FormInput,
  PasswordInput,
  Button,
  Alert,
  Card,
  LoadingSpinner,
} from '../components/sections/AccountComponent';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';

const ProfileInformationSection: React.FC<{
  profile: UserProfile;
  onUpdate: (profile: UserProfile) => void;
}> = ({ profile, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [alert, setAlert] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [formData, setFormData] = useState<ProfileUpdatePayload>({
    fullName: profile.name,
    email: profile.email,
    dateOfBirth: profile.dateOfBirth,
    phone: profile.phoneNumber,
    university: profile.University,
    major: profile.major,
    yearsExperience: profile.Experience,
    linkedinUrl: profile.LinkedIn,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Reset form when profile changes
  useEffect(() => {
    setFormData({
      fullName: profile.name,
      email: profile.email,
      dateOfBirth: profile.dateOfBirth,
      phone: profile.phoneNumber,
      university: profile.University,
      major: profile.major,
      yearsExperience: profile.Experience,
      linkedinUrl: profile.LinkedIn,
    });
  }, [profile]);

  const handleSave = async () => {
    setAlert(null);
    

    setErrors({});
    setIsSaving(true);

    try {
      const updatedProfile = await updateProfile({
        name: formData.fullName,
        dateOfBirth: formData.dateOfBirth,
        phoneNumber: formData.phone,
        University: formData.university,
        major: formData.major,
        Experience: formData.yearsExperience,
        LinkedIn: formData.linkedinUrl,
      });
      // For production:
      // const updatedProfile = await AccountService.updateProfile(formData);
      setAlert({
        type: 'success',
        message: 'Profile updated successfully!',
      });
      const userData = localStorage.getItem("user");
      if (userData) {
        const user = JSON.parse(userData);
        user.name = updatedProfile.name;
        localStorage.setItem("user", JSON.stringify(user));
      }

      onUpdate(updatedProfile);
      setIsEditing(false);

    } catch (error) {
      console.error('Update profile error:', error);
      setAlert({
        type: 'error',
        message: 'Failed to update profile. Please try again.',
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      fullName: profile.name,
      email: profile.email,
      dateOfBirth: profile.dateOfBirth,
      phone: profile.phoneNumber,
      university: profile.University,
      major: profile.major,
      yearsExperience: profile.Experience,
      linkedinUrl: profile.LinkedIn,
    });
    setErrors({});
    setIsEditing(false);
    setAlert(null);
  };

  return (
    <Card
      title="Profile Information"
      description="Manage your personal information and professional details"
      action={
        !isEditing ? (
          <Button
            variant="secondary"
            size="sm"
            onClick={() => setIsEditing(true)}
            leftIcon={<Edit2 className="w-4 h-4" />}
          >
            Edit Profile
          </Button>
        ) : (
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleCancel}
              disabled={isSaving}
              leftIcon={<X className="w-4 h-4" />}
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={handleSave}
              isLoading={isSaving}
              leftIcon={<Save className="w-4 h-4" />}
            >
              Save Changes
            </Button>
          </div>
        )
      }
    >
      <div className="space-y-6">
        {/* Alert */}
        {alert && (
          <Alert
            type={alert.type}
            message={alert.message}
            onClose={() => setAlert(null)}
          />
        )}

        {/* Form Fields */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Full Name */}
          <FormInput
            label="Full Name"
            placeholder="Enter your full name"
            value={isEditing ? formData.fullName : profile.name}
            onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
            error={errors.fullName}
            leftIcon={<User className="w-4 h-4" />}
            disabled={!isEditing}
            required
          />

          {/* Email */}
          <FormInput
            label="Email Address"
            type="email"
            placeholder="your.email@example.com"
            value={isEditing ? formData.email : profile.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            error={errors.email}
            leftIcon={<Mail className="w-4 h-4" />}
            disabled={true}
            required
          />

          {/* Birthday */}
          <FormInput
            label="Birthday"
            type="date"
            value={
              isEditing
                ? formData.dateOfBirth
                : profile.dateOfBirth?.split("T")[0]
            }
            onChange={(e) =>
              setFormData({ ...formData, dateOfBirth: e.target.value })
            }
            error={errors.dateOfBirth}
            leftIcon={<Calendar className="w-4 h-4" />}
            disabled={!isEditing}
          />
          

          {/* Phone */}
          <FormInput
            label="Phone Number"
            type="tel"
            placeholder="97779338"
            value={isEditing ? formData.phone : profile.phoneNumber}
            onChange={(e) => setFormData({ ...formData, phone: parseInt(e.target.value) || 0 })}
            error={errors.phoneNumber}
            leftIcon={<Phone className="w-4 h-4" />}
            disabled={!isEditing}
            required
          />

          {/* University */}
          <FormInput
            label="University / School"
            placeholder="Enter your university name"
            value={isEditing ? formData.university : profile.University}
            onChange={(e) => setFormData({ ...formData, university: e.target.value })}
            error={errors.university}
            leftIcon={<GraduationCap className="w-4 h-4" />}
            disabled={!isEditing}
          />

          {/* Major */}
          <FormInput
            label="Major / Field of Study"
            placeholder="e.g., Robotics Engineering"
            value={isEditing ? formData.major : profile.major}
            onChange={(e) => setFormData({ ...formData, major: e.target.value })}
            error={errors.major}
            leftIcon={<GraduationCap className="w-4 h-4" />}
            disabled={!isEditing}
          />

          {/* Years of Experience */}
          <FormInput
            label="Years of Robotics Experience"
            type="number"
            min="0"
            max="50"
            placeholder="0"
            value={isEditing ? formData.yearsExperience : profile.Experience}
            onChange={(e) => setFormData({ ...formData, yearsExperience: parseInt(e.target.value) || 0 })}
            error={errors.yearsExperience}
            leftIcon={<Briefcase className="w-4 h-4" />}
            disabled={!isEditing}
          />

          {/* LinkedIn */}
          <FormInput
            label="LinkedIn Profile"
            type="url"
            placeholder="https://linkedin.com/in/yourprofile"
            value={isEditing ? formData.linkedinUrl : profile.LinkedIn}
            onChange={(e) => setFormData({ ...formData, linkedinUrl: e.target.value })}
            error={errors.linkedinUrl}
            leftIcon={<Linkedin className="w-4 h-4" />}
            disabled={!isEditing}
            helperText="Optional: Add your LinkedIn profile URL"
          />
        </div>

        {/* Account Info (Read-only) */}
        <div className="pt-6 border-t border-slate-700">
          <h4 className="text-sm font-medium text-slate-300 mb-4">Account Information</h4>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-slate-900/50 rounded-xl p-4">
              <p className="text-xs text-slate-400 mb-1">Role</p>
              <p className="text-sm font-medium text-white">{profile.role}</p>
            </div>
            <div className="bg-slate-900/50 rounded-xl p-4">
              <p className="text-xs text-slate-400 mb-1">Member Since</p>
              <p className="text-sm font-medium text-white">
                {profile.joinedDate ? new Date(profile.joinedDate).toLocaleDateString('en-US', {
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric',
                }) : "none"
                }
              </p>
            </div>
            <div className="bg-slate-900/50 rounded-xl p-4">
              <p className="text-xs text-slate-400 mb-1">Last Active</p>
              <p className="text-sm font-medium text-white">
                {profile.lastActive ? new Date(profile.lastActive).toLocaleDateString('en-US', {
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric',
                }) : "none"
                }
              </p>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

// ========================================
// PROFILE PICTURE SECTION
// ========================================
const ProfilePictureSection: React.FC<{
  profile: UserProfile;
  onUpdate: (url: string) => void;
}> = ({ profile, onUpdate }) => {
  const [isUploading, setIsUploading] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [alert, setAlert] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return ;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      setAlert({
        type: 'error',
        message: 'Please select a valid image file',
      });
      return;
    }

    // Validate file size (5MB max)
    if (file.size > 5 * 1024 * 1024) {
      setAlert({
        type: 'error',
        message: 'Image size must be less than 5MB',
      });
      return;
    }

    try{
      
    }catch(error){
      console.error('File processing error:', error);
      setAlert({
        type: 'error',
        message: 'Failed to process image file. Please try another file.',
      });
    }
    // Create preview
    const previewUrl = URL.createObjectURL(file);
    setPreview(previewUrl);
    setAlert(null);
  };
  const handleUpload = async () => {
    const file = fileInputRef.current?.files?.[0];
    if (!file || !preview) return;

    setIsUploading(true);
    setAlert(null);

    try {
      setIsUploading(true);

      const res = await uploadImage(file);
        console.log('Upload response:', res);
      setAlert({
        type: "success",
        message: "Profile picture updated successfully!",
      });
    
      onUpdate(res);
      setPreview(res);
    
    } catch (error) {
      console.error("Upload error:", error);
    
      setAlert({
        type: "error",
        message: "Failed to upload profile picture. Please try again.",
      });
    
    } finally {
      setIsUploading(false);
    }

  };

  const handleCancel = () => {
    setPreview(null);
    setAlert(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <Card
      title="Profile Picture"
      description="Update your profile photo"
    >
      {isUploading && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
    <div className="relative flex flex-col items-center gap-6 bg-white rounded-3xl px-10 py-9 shadow-2xl w-80 overflow-hidden">

      {/* Glow blob */}
      <div className="absolute -top-10 -right-10 w-48 h-48 rounded-full bg-indigo-400/10 blur-2xl pointer-events-none" />

      {/* Orbital spinner */}
      <div className="relative w-16 h-16 flex items-center justify-center">
        {/* Pulse ring */}
        <div className="absolute inset-0 rounded-full bg-indigo-400/20 animate-ping" />

        {/* Center icon */}
        <div className="relative z-10 w-11 h-11 rounded-xl bg-gradient-to-br from-indigo-500 to-indigo-400 flex items-center justify-center shadow-lg shadow-indigo-400/40">
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            className="text-white"
          >
            <path
              d="M12 16V8m0 0-3 3m3-3 3 3"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M3 16.5v1A2.5 2.5 0 0 0 5.5 20h13a2.5 2.5 0 0 0 2.5-2.5v-1"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </div>

        {/* Spinning orbit ring */}
        <div className="absolute inset-0 rounded-full border-2 border-indigo-500/20 border-t-indigo-500 animate-spin" />
        <div className="absolute inset-[-6px] rounded-full border border-indigo-300/20 border-b-indigo-300/60 animate-spin [animation-duration:2s] [animation-direction:reverse]" />
      </div>

      {/* Text */}
      <div className="flex flex-col items-center gap-1 text-center">
        <p className="text-sm font-semibold text-slate-800 tracking-tight">
          Uploading your image
        </p>

        {/* Bouncing dots */}
        <div className="flex items-center gap-1 mt-1">
          <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-bounce [animation-delay:0ms]" />
          <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-bounce [animation-delay:150ms]" />
          <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-bounce [animation-delay:300ms]" />
        </div>

        <p className="text-xs text-slate-400 mt-1">
          Please wait, this won&apos;t take long
        </p>
      </div>

      {/* Progress bar */}
      <div className="w-full h-1.5 rounded-full bg-indigo-100 overflow-hidden">
        <div className="h-full w-2/3 rounded-full bg-gradient-to-r from-indigo-500 to-indigo-300 animate-pulse" />
      </div>
    </div>
  </div>
)}

      <div className="space-y-6">
        {/* Alert */}
        {alert && (
          <Alert
            type={alert.type}
            message={alert.message}
            onClose={() => setAlert(null)}
          />
        )}

        <div className="flex flex-col md:flex-row items-center gap-8">
          {/* Current/Preview Picture */}
          <div className="relative">
            <div className="w-32 h-32 rounded-2xl overflow-hidden ring-4 ring-slate-700 bg-slate-700">
              {!profile.imageUrl && !preview && (
                <div className="w-full h-full flex items-center justify-center text-slate-400">
                  <User className="w-12 h-12 color-cayn-400" />
                </div>
               )

              }

              {preview ? (
                <img
                  src={preview}
                  alt="Profile Preview"
                  className="w-full h-full object-cover"
                />
              ) : (
                profile.imageUrl && (
                  <img
                    src={profile.imageUrl}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                )
              )}
            </div>
            {preview && (
              <div className="absolute -top-2 -right-2 bg-cyan-600 text-white rounded-full p-1.5">
                <Camera className="w-4 h-4" />
              </div>
            )}
          </div>

          {/* Upload Controls */}
          <div className="flex-1 space-y-4">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileSelect}
              className="hidden"
            />

            {!preview ? (
              <Button
                variant="secondary"
                onClick={() => fileInputRef.current?.click()}
                leftIcon={<Upload className="w-4 h-4" />}
              >
                Choose New Picture
              </Button>
            ) : (
              <div className="flex items-center gap-3">
                <Button
                  variant="primary"
                  onClick={handleUpload}
                  isLoading={isUploading}
                  leftIcon={<Save className="w-4 h-4" />}
                >
                  Upload Picture
                </Button>
                <Button
                  variant="ghost"
                  onClick={handleCancel}
                  disabled={isUploading}
                >
                  Cancel
                </Button>
              </div>
            )}

            <div className="text-sm text-slate-400">
              <p>• Recommended: Square image, at least 400x400px</p>
              <p>• Max file size: 5MB</p>
              <p>• Supported formats: JPG, PNG, GIF</p>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

// ========================================
// CHANGE PASSWORD SECTION
// ========================================
const ChangePasswordSection: React.FC = () => {
  const [formData, setFormData] = useState<PasswordChangePayload>({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isChanging, setIsChanging] = useState(false);
  const [alert, setAlert] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAlert(null);
    if (formData.newPassword !== formData.confirmPassword) {
      setErrors({ confirmPassword: 'New password and confirmation do not match' });
      return;
    }
    
  

    setErrors({});
    setIsChanging(true);

    try {
      const updatedProfile = await changePassword({
        oldPassword: formData.currentPassword,
        newPassword: formData.newPassword,
        
      });
      updateProfile(updatedProfile);
      setAlert({
        type: 'success',
        message: 'Password changed successfully!',
      });
      
    } catch (error: any) {
      console.error('Change password error:', error);
      setAlert({
        type: 'error',
        message: error.message || 'Failed to change password. Please try again.',
      });
    } finally {
      setIsChanging(false);
    }
  };

  return (
    <Card
      title="Change Password"
      description="Update your password to keep your account secure"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Alert */}
        {alert && (
          <Alert
            type={alert.type}
            message={alert.message}
            onClose={() => setAlert(null)}
          />
        )}

        {/* Current Password */}
        <PasswordInput
          label="Current Password"
          placeholder="Enter your current password"
          value={formData.currentPassword}
          onChange={(e) => setFormData({ ...formData, currentPassword: e.target.value })}
          error={errors.currentPassword}
          required
        />

        {/* New Password */}
        <PasswordInput
          label="New Password"
          placeholder="Enter your new password"
          value={formData.newPassword}
          onChange={(e) => setFormData({ ...formData, newPassword: e.target.value })}
          error={errors.newPassword}
          showStrength
          required
          helperText="Must be at least 8 characters long"
        />

        {/* Confirm Password */}
        <PasswordInput
          label="Confirm New Password"
          placeholder="Confirm your new password"
          value={formData.confirmPassword}
          onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
          error={errors.confirmPassword}
          required
        />

        {/* Submit Button */}
        <div className="pt-4 border-t border-slate-700">
          <Button
            type="submit"
            variant="primary"
            isLoading={isChanging}
            leftIcon={<Shield className="w-4 h-4" />}
          >
            {isChanging ? 'Changing Password...' : 'Change Password'}
          </Button>
        </div>

        {/* Security Info */}
        <div className="bg-cyan-500/10 border border-cyan-500/20 rounded-xl p-4">
          <div className="flex gap-3">
            <Shield className="w-5 h-5 text-cyan-400 flex-shrink-0" />
            <div className="text-sm text-cyan-300">
              <p className="font-semibold mb-1">Password Security Tips</p>
              <ul className="list-disc list-inside space-y-1 text-cyan-400/80">
                <li>Use a mix of uppercase, lowercase, numbers, and symbols</li>
                <li>Avoid common words or personal information</li>
                <li>Don't reuse passwords from other accounts</li>
                <li>Consider using a password manager</li>
              </ul>
            </div>
          </div>
        </div>
      </form>
    </Card>
  );
};

// ========================================
// MAIN ACCOUNT PAGE COMPONENT
// ========================================
export default function AccountPage() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    setIsLoading(true);
    try {

      const data = await getProfile();
      console.log("Profile data loaded:", data);
      // For production:
      // const data = await AccountService.getProfile();

      setProfile(data);
    } catch (error) {
      console.error('Load profile error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleProfileUpdate = (updatedProfile: UserProfile) => {
    setProfile(updatedProfile);
  };

  const handleProfilePictureUpdate = (url: string) => {
    if (profile) {
      setProfile({ ...profile, profilePicture: url });
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-900 p-4 md:p-8">
        <div className="max-w-4xl mx-auto">
          <LoadingSpinner />
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen bg-slate-900 p-4 md:p-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center text-white">Failed to load profile</div>
        </div>
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-slate-900 ">
      <Header />
      <div className="max-w-4xl py-24 mx-auto px-4 md:px-8 space-y-6">
        {/* Page Header */}
        <div className="flex items-center gap-4">
          <div className="p-2 bg-slate-800 rounded-xl border border-slate-700">
            {
              profile.imageUrl ? (
                <img
                  src={profile.imageUrl}
                  alt="Profile"
                  className="w-15 h-15  object-cover"
                />
              ) : (
                <User className="w-8 h-8 text-slate-400" />
            )}

          </div>
          <div>
            <h1 className="text-3xl font-bold text-white">Account Settings</h1>
            <p className="text-slate-400">Manage your personal information and security</p>
          </div>
        </div>

        {/* Profile Information Section */}
        <ProfileInformationSection
          profile={profile}
          onUpdate={handleProfileUpdate}
        />

        {/* Profile Picture Section */}
        <ProfilePictureSection
          profile={profile}
          onUpdate={handleProfilePictureUpdate}
        />

        {/* Change Password Section */}
        <ChangePasswordSection />
        <button
          onClick={() => {localStorage.clear(); window.location.reload();}}
          className=" w-full h-15 rounded-full bg-red-500 hover:bg-red-600  text-white cursor-pointer   transition-all"
        >
          Exit Account
        </button>
      </div>
      <Footer />
    </div>
  );
}
