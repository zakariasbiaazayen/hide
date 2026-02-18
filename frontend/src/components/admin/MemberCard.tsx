import React from 'react';
import { Member } from '../../types/member.ts';

interface MemberCardProps {
  member: Member;
  onView: (member: Member) => void;
  onEdit: (member: Member) => void;
  onDelete: (id: string) => void;
}

const roleColors: Record<string, string> = {
  President: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  Coach: 'bg-green-500/10 text-green-400 border-green-500/20',
  Member: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
  Alumni: 'bg-gray-500/10 text-gray-400 border-gray-500/20',
};

export default function MemberCard({ member, onView, onEdit, onDelete }: MemberCardProps) {
  return (
    <div className="group relative bg-slate-800/50 backdrop-blur-sm rounded-2xl overflow-hidden border border-slate-700/50 hover:border-blue-500/30 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/10 hover:-translate-y-1">
      <div className="relative h-48 overflow-hidden">
        <img
          src={member.image}
          alt={`${member.firstName} ${member.lastName}`}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent" />
        <span className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-medium border backdrop-blur-md ${roleColors[member.role] || 'bg-gray-500/10 text-gray-400 border-gray-500/20'}`}>
          {member.role}
        </span>
      </div>

      <div className="p-6">
        <h3 className="text-xl font-bold text-slate-100 mb-2 line-clamp-1 group-hover:text-blue-400 transition-colors">
          {member.firstName} {member.lastName}
        </h3>
        <p className="text-slate-400 text-sm mb-1">Age: {member.age}</p>
        <p className="text-slate-400 text-sm mb-4">Member since: {member.startDate}{member.endDate ? ` - ${member.endDate}` : ''}</p>

        <div className="flex items-center gap-2 pt-4 border-t border-slate-700/50">
          <button
            onClick={() => onView(member)}
            className="flex-1 px-4 py-2 bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 rounded-lg text-sm font-medium transition-colors border border-blue-500/20 hover:border-blue-500/40"
          >
            View Details
          </button>
          <button
            onClick={() => onEdit(member)}
            className="p-2 hover:bg-slate-700/50 text-slate-400 hover:text-blue-400 rounded-lg transition-colors"
            title="Edit"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </button>
          <button
            onClick={() => onDelete(member.id)}
            className="p-2 hover:bg-red-500/10 text-slate-400 hover:text-red-400 rounded-lg transition-colors"
            title="Delete"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};
