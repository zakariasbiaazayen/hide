// ========================================
// PERMISSIONS SECTION COMPONENT
// ========================================

import React, { useState, useEffect } from 'react';
import { Shield, Save, User, CheckCircle2 } from 'lucide-react';
import type { AdminMember, AdminSection, PermissionUpdate } from '../../../types/settings.types';
import { PermissionsService, MockDataService } from '../../../services/services';
import { Button, Card, Toggle, Alert, LoadingSpinner, EmptyState } from './UIComponents';

export const PermissionsSection: React.FC = () => {
  const [members, setMembers] = useState<AdminMember[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [alert, setAlert] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [hasChanges, setHasChanges] = useState(false);

  const sections: { id: AdminSection; label: string; description: string }[] = [
    { id: 'dashboard', label: 'Dashboard', description: 'View analytics and overview' },
    { id: 'events', label: 'Events', description: 'Manage events and workshops' },
    { id: 'members', label: 'Members', description: 'Manage admin members' },
    { id: 'users', label: 'Users', description: 'Manage event participants' },
    { id: 'registrations', label: 'Registrations', description: 'View and manage registrations' },
    { id: 'settings', label: 'Settings', description: 'Access system settings' },
  ];

  useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = async () => {
    setIsLoading(true);
    try {
      // Use mock service for development
      const data = await MockDataService.mockFetchMembers();
      
      // For production:
      // const data = await PermissionsService.fetchMembers();

      setMembers(data);
    } catch (error) {
      console.error('Fetch members error:', error);
      setAlert({
        type: 'error',
        message: 'Failed to load admin members',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handlePermissionToggle = (memberId: string, section: AdminSection) => {
    setMembers((prev) =>
      prev.map((member) => {
        if (member.id === memberId) {
          const hasPermission = member.permissions.includes(section);
          return {
            ...member,
            permissions: hasPermission
              ? member.permissions.filter((p) => p !== section)
              : [...member.permissions, section],
          };
        }
        return member;
      })
    );
    setHasChanges(true);
  };

  const handleSavePermissions = async () => {
    setAlert(null);
    setIsSaving(true);

    try {
      // Prepare permission updates
      const updates: PermissionUpdate[] = members.map((member) => ({
        memberId: member.id,
        permissions: member.permissions,
      }));

      // Use mock service for development
      await new Promise((resolve) => setTimeout(resolve, 1500));
      const response = { success: true, message: 'Permissions updated successfully' };
      
      // For production:
      // const response = await PermissionsService.bulkUpdatePermissions(updates);

      if (response.success) {
        setAlert({
          type: 'success',
          message: response.message,
        });
        setHasChanges(false);
      } else {
        throw new Error('Failed to update permissions');
      }
    } catch (error) {
      console.error('Save permissions error:', error);
      setAlert({
        type: 'error',
        message: 'Failed to save permissions. Please try again.',
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleResetChanges = () => {
    fetchMembers();
    setHasChanges(false);
    setAlert(null);
  };

  if (isLoading) {
    return (
      <Card title="Role & Authorization Management">
        <LoadingSpinner />
      </Card>
    );
  }

  if (members.length === 0) {
    return (
      <Card title="Role & Authorization Management">
        <EmptyState
          icon={<User className="w-8 h-8" />}
          title="No admin members found"
          description="Add admin members to manage their permissions"
        />
      </Card>
    );
  }

  return (
    <Card
      title="Role & Authorization Management"
      description="Configure access permissions for each admin member"
      action={
        hasChanges && (
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleResetChanges}
              disabled={isSaving}
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={handleSavePermissions}
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

        {/* Permissions Matrix */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-700">
                <th className="text-left py-4 px-4 text-sm font-semibold text-slate-300 sticky left-0 bg-slate-800 z-10">
                  Admin Member
                </th>
                {sections.map((section) => (
                  <th
                    key={section.id}
                    className="text-center py-4 px-3 text-sm font-semibold text-slate-300 min-w-[120px]"
                  >
                    <div className="flex flex-col items-center gap-1">
                      <Shield className="w-4 h-4 text-cyan-400" />
                      <span>{section.label}</span>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {members.map((member, memberIndex) => (
                <tr
                  key={member.id}
                  className={`
                    border-b border-slate-800 hover:bg-slate-700/20 transition-colors
                    ${memberIndex === members.length - 1 ? 'border-b-0' : ''}
                  `}
                >
                  <td className="py-4 px-4 sticky left-0 bg-slate-800 z-10">
                    <div className="flex items-center gap-3">
                      {member.avatar ? (
                        <img
                          src={member.avatar}
                          alt={member.name}
                          className="w-10 h-10 rounded-lg object-cover ring-2 ring-slate-700"
                        />
                      ) : (
                        <div className="w-10 h-10 rounded-lg bg-slate-700 flex items-center justify-center">
                          <User className="w-5 h-5 text-slate-400" />
                        </div>
                      )}
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-white truncate">
                          {member.name}
                        </p>
                        <p className="text-xs text-slate-400 truncate">{member.email}</p>
                        <p className="text-xs text-cyan-400 mt-0.5">{member.role}</p>
                      </div>
                    </div>
                  </td>
                  {sections.map((section) => {
                    const hasPermission = member.permissions.includes(section.id);
                    return (
                      <td key={section.id} className="py-4 px-3">
                        <div className="flex justify-center">
                          <button
                            onClick={() => handlePermissionToggle(member.id, section.id)}
                            className={`
                              p-2 rounded-lg transition-all
                              ${
                                hasPermission
                                  ? 'bg-cyan-500/20 text-cyan-400 hover:bg-cyan-500/30'
                                  : 'bg-slate-700 text-slate-500 hover:bg-slate-600'
                              }
                            `}
                            title={`${hasPermission ? 'Revoke' : 'Grant'} ${section.label} access`}
                          >
                            <CheckCircle2
                              className={`w-5 h-5 ${hasPermission ? 'fill-current' : ''}`}
                            />
                          </button>
                        </div>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Permission Summary */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 pt-6 border-t border-slate-700">
          {members.map((member) => (
            <div
              key={member.id}
              className="bg-slate-900/50 rounded-xl p-4 border border-slate-700"
            >
              <div className="flex items-center gap-3 mb-3">
                {member.avatar ? (
                  <img
                    src={member.avatar}
                    alt={member.name}
                    className="w-8 h-8 rounded-lg object-cover"
                  />
                ) : (
                  <div className="w-8 h-8 rounded-lg bg-slate-700 flex items-center justify-center">
                    <User className="w-4 h-4 text-slate-400" />
                  </div>
                )}
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-white truncate">{member.name}</p>
                  <p className="text-xs text-slate-400">{member.role}</p>
                </div>
              </div>
              
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-400">Access Level</span>
                  <span className="text-cyan-400 font-semibold">
                    {member.permissions.length} / {sections.length}
                  </span>
                </div>
                <div className="w-full bg-slate-800 rounded-full h-1.5">
                  <div
                    className="bg-cyan-500 h-full rounded-full transition-all"
                    style={{
                      width: `${(member.permissions.length / sections.length) * 100}%`,
                    }}
                  />
                </div>
                <div className="flex flex-wrap gap-1 pt-1">
                  {member.permissions.slice(0, 3).map((perm) => (
                    <span
                      key={perm}
                      className="text-xs bg-cyan-500/10 text-cyan-400 px-2 py-0.5 rounded"
                    >
                      {sections.find((s) => s.id === perm)?.label}
                    </span>
                  ))}
                  {member.permissions.length > 3 && (
                    <span className="text-xs text-slate-500">
                      +{member.permissions.length - 3} more
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Info Box */}
        <div className="bg-cyan-500/10 border border-cyan-500/20 rounded-xl p-4">
          <div className="flex gap-3">
            <div className="flex-shrink-0">
              <Shield className="w-5 h-5 text-cyan-400" />
            </div>
            <div className="text-sm text-cyan-300">
              <p className="font-semibold mb-1">Permission Management Best Practices</p>
              <ul className="list-disc list-inside space-y-1 text-cyan-400/80">
                <li>Grant minimum required permissions based on role responsibilities</li>
                <li>Regularly review and audit member access levels</li>
                <li>Settings access should be restricted to senior administrators</li>
                <li>Changes take effect immediately after saving</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};
