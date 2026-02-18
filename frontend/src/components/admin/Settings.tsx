// ========================================
// MAIN SETTINGS PAGE COMPONENT
// ========================================

import React, { useState } from 'react';
import { Settings as SettingsIcon, Mail, FileText, Shield } from 'lucide-react';
import { EmailSection } from './settings_part/EmailSection';
import { LogsSection } from './settings_part/LogsSection';
import { PermissionsSection } from './settings_part/PermissionsSection';

type SettingsTab = 'email' | 'logs' | 'permissions';

interface TabConfig {
  id: SettingsTab;
  label: string;
  icon: React.ReactNode;
  component: React.ReactNode;
}

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<SettingsTab>('email');

  const tabs: TabConfig[] = [
    {
      id: 'email',
      label: 'Email Campaigns',
      icon: <Mail className="w-5 h-5" />,
      component: <EmailSection />,
    },
    {
      id: 'logs',
      label: 'Admin Logs',
      icon: <FileText className="w-5 h-5" />,
      component: <LogsSection />,
    },
    {
      id: 'permissions',
      label: 'Permissions',
      icon: <Shield className="w-5 h-5" />,
      component: <PermissionsSection />,
    },
  ];

  const activeTabConfig = tabs.find((tab) => tab.id === activeTab);

  return (
    <div className="min-h-screen bg-slate-900 p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Page Header */}
        <div className="flex items-center gap-3">
          <div className="p-3 bg-slate-800 rounded-xl border border-slate-700">
            <SettingsIcon className="w-6 h-6 text-cyan-400" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white">Settings</h1>
            <p className="text-slate-400">Manage system settings and configurations</p>
          </div>
        </div>

        {/* Tabs Navigation */}
        <div className="bg-slate-800 rounded-2xl border border-slate-700 p-2">
          <div className="flex gap-2 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`
                  flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-all whitespace-nowrap
                  ${
                    activeTab === tab.id
                      ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-600/20'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-700'
                  }
                `}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Active Tab Content */}
        <div className="animate-fadeIn">
          {activeTabConfig?.component}
        </div>
      </div>

      {/* Add fadeIn animation */}
      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}
