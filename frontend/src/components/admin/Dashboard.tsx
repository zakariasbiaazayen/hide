import React from 'react';
import InteractiveChart from './sections/InteractiveChart';

import {
  Users,
  Calendar,
  FileCheck,
  FolderKanban,
  TrendingUp,
  TrendingDown,
  Plus,
  Settings,
  Eye,
  ChevronRight,
  Sparkles,
  MapPin,
  Clock
} from 'lucide-react';

interface Stat {
  id: number;
  title: string;
  value: string;
  trend: number;
  icon: React.ReactNode;
  iconColor: string;
}

interface Event {
  id: number;
  title: string;
  date: string;
  location: string;
  status: 'Upcoming' | 'Ongoing' | 'Finished';
}

interface QuickAction {
  id: number;
  label: string;
  icon: React.ReactNode;
  gradient: string;
  onClick: () => void;
}

interface StatCardProps {
  stat: Stat;
}

const StatCard: React.FC<StatCardProps> = ({ stat }) => {
  const isPositive = stat.trend >= 0;

  return (
    <div className="group relative bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700/50 p-6 hover:border-cyan-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/10">
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-blue-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      <div className="relative z-10 space-y-4">
        <div className="flex items-start justify-between">
          <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${stat.iconColor} flex items-center justify-center shadow-lg`}>
            {stat.icon}
          </div>
          <div className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold ${
            isPositive ? 'bg-emerald-500/10 text-emerald-400' : 'bg-red-500/10 text-red-400'
          }`}>
            {isPositive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
            {Math.abs(stat.trend)}%
          </div>
        </div>
        <div>
          <p className="text-sm text-slate-400 mb-1">{stat.title}</p>
          <p className="text-3xl font-bold text-white">{stat.value}</p>
        </div>
      </div>
    </div>
  );
};

interface RecentEventsProps {
  events: Event[];
}

const RecentEvents: React.FC<RecentEventsProps> = ({ events }) => {
  const getStatusColor = (status: Event['status']) => {
    switch (status) {
      case 'Upcoming': return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
      case 'Ongoing': return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
      case 'Finished': return 'bg-slate-500/10 text-slate-400 border-slate-500/20';
    }
  };

  return (
    <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700/50 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
          <Calendar className="w-6 h-6 text-cyan-400" />
          Recent Events
        </h2>
        <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-cyan-400 hover:text-cyan-300 transition-colors">
          View All
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
      <div className="space-y-3">
        {events.map((event) => (
          <div
            key={event.id}
            className="group flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl bg-slate-900/30 border border-slate-700/30 hover:border-cyan-500/30 transition-all duration-300"
          >
            <div className="flex-1 space-y-2">
              <h3 className="font-semibold text-white group-hover:text-cyan-400 transition-colors">
                {event.title}
              </h3>
              <div className="flex flex-wrap items-center gap-4 text-sm text-slate-400">
                <div className="flex items-center gap-1.5"><Clock className="w-4 h-4" />{event.date}</div>
                <div className="flex items-center gap-1.5"><MapPin className="w-4 h-4" />{event.location}</div>
              </div>
            </div>
            <div className={`px-3 py-1.5 rounded-full text-xs font-semibold border ${getStatusColor(event.status)}`}>
              {event.status}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

interface QuickActionsProps {
  actions: QuickAction[];
}

const QuickActions: React.FC<QuickActionsProps> = ({ actions }) => (
  <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700/50 p-6">
    <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
      <Sparkles className="w-6 h-6 text-purple-400" /> Quick Actions
    </h2>
    <div className="grid grid-cols-1  gap-4">
      {actions.map(action => (
        <button
          key={action.id}
          onClick={action.onClick}
          className={`group relative px-6 py-4 bg-gradient-to-r ${action.gradient} rounded-xl font-semibold text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 flex items-center justify-center gap-3`}
        >
          <span className="relative z-10 flex items-center gap-3">
            {action.icon} {action.label}
          </span>
          <div className="absolute inset-0 rounded-xl bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </button>
      ))}
    </div>
  </div>
);

export default function DashboardMain() {
  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
  });

  const stats: Stat[] = [
    { id: 1, title: 'Total Members', value: '1,247', trend: 12.5, icon: <Users className="w-7 h-7 text-white" />, iconColor: 'from-cyan-500 to-blue-500' },
    { id: 2, title: 'Total Events', value: '48', trend: 8.2, icon: <Calendar className="w-7 h-7 text-white" />, iconColor: 'from-purple-500 to-pink-500' },
    { id: 3, title: 'Active Registrations', value: '356', trend: -3.1, icon: <FileCheck className="w-7 h-7 text-white" />, iconColor: 'from-blue-500 to-cyan-500' },
    { id: 4, title: 'Team Projects', value: '127', trend: 15.8, icon: <FolderKanban className="w-7 h-7 text-white" />, iconColor: 'from-orange-500 to-red-500' },
  ];

  const recentEvents: Event[] = [
    { id: 1, title: 'AI & Machine Learning Workshop', date: 'March 15, 2026', location: 'Engineering Lab A', status: 'Upcoming' },
    { id: 2, title: 'RoboCup Competition Training', date: 'March 12, 2026', location: 'Robotics Arena', status: 'Ongoing' },
    { id: 3, title: 'Arduino Basics Bootcamp', date: 'March 10, 2026', location: 'Maker Space', status: 'Finished' },
    { id: 4, title: 'Drone Programming Challenge', date: 'March 8, 2026', location: 'Outdoor Field', status: 'Finished' },
    { id: 5, title: 'Computer Vision Deep Dive', date: 'March 5, 2026', location: 'AI Lab', status: 'Finished' },
  ];

  const quickActions: QuickAction[] = [
    { id: 1, label: 'Create Event', icon: <Plus className="w-5 h-5" />, gradient: 'from-cyan-600 to-blue-600', onClick: () => console.log('Create Event clicked') },
    { id: 2, label: 'Manage Members', icon: <Users className="w-5 h-5" />, gradient: 'from-purple-600 to-pink-600', onClick: () => console.log('Manage Members clicked') },
    { id: 3, label: 'View Registrations', icon: <Eye className="w-5 h-5" />, gradient: 'from-blue-600 to-cyan-600', onClick: () => console.log('View Registrations clicked') },
    { id: 4, label: 'Settings', icon: <Settings className="w-5 h-5" />, gradient: 'from-slate-600 to-slate-700', onClick: () => console.log('Settings clicked') },
  ];

  return (
    <div className="min-h-screen  p-6 lg:p-8 relative overflow-hidden">
      
      {/* Background Pattern & Orbs */}
      <div className="fixed inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-10 pointer-events-none"></div>
      <div className="fixed top-20 left-10 w-96 h-96 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-5 animate-pulse pointer-events-none"></div>
      <div className="fixed bottom-20 right-10 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-5 animate-pulse delay-1000 pointer-events-none"></div>

      <div className="relative z-10 max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/20">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              <span className="text-xs font-semibold text-cyan-300">Admin Panel</span>
            </div>
            <h1 className="text-4xl font-bold text-white">Dashboard Overview</h1>
            <p className="text-slate-400">Monitor and manage your RoboClub platform</p>
          </div>
          <div className="px-4 py-2 rounded-xl bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 text-center">
            <p className="text-sm text-slate-400">Today</p>
            <p className="text-white font-semibold">{currentDate}</p>
          </div>
        </div>
        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map(stat => <StatCard key={stat.id} stat={stat} />)}
        </div>
        {/* Interactive Chart */}
        <InteractiveChart />

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2"><RecentEvents events={recentEvents} /></div>
          <QuickActions actions={quickActions} />
        </div>
      </div>
    </div>
  );
}
