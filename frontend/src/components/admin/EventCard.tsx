import React from 'react';
import { Event } from '../../types/event';

interface EventCardProps {
  event: Event;
  onView: (event: Event) => void;
  onEdit: (event: Event) => void;
  onDelete: (id: string) => void;
}

const typeColors: Record<string, string> = {
  competition: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
  learning: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
  hackathon: 'bg-orange-500/10 text-orange-400 border-orange-500/20',
  camp: 'bg-green-500/10 text-green-400 border-green-500/20',
  workshop: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  seminar: 'bg-pink-500/10 text-pink-400 border-pink-500/20'
};

export const EventCard: React.FC<EventCardProps> = ({ event, onView, onEdit, onDelete }) => {
  return (
    <div className="group relative bg-slate-800/50 backdrop-blur-sm rounded-2xl overflow-hidden border border-slate-700/50 hover:border-cyan-500/30 transition-all duration-300 hover:shadow-xl hover:shadow-cyan-500/10 hover:-translate-y-1">
      <div className="relative h-48 overflow-hidden">
        <img 
          src={event.image} 
          alt={event.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent" />
        <span className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-medium border backdrop-blur-md ${typeColors[event.type]}`}>
          {event.type}
        </span>
      </div>

      <div className="p-6">
        <h3 className="text-xl font-bold text-slate-100 mb-2 line-clamp-1 group-hover:text-cyan-400 transition-colors">
          {event.title}
        </h3>
        
        <div className="flex items-center gap-2 text-sm text-slate-400 mb-3">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <span>{new Date(event.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
          <span className="text-slate-600">•</span>
          <span>{event.time}</span>
        </div>

        <p className="text-slate-400 text-sm line-clamp-2 mb-4">
          {event.description}
        </p>

        <div className="flex items-center gap-2 pt-4 border-t border-slate-700/50">
          <button
            onClick={() => onView(event)}
            className="flex-1 px-4 py-2 bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 rounded-lg text-sm font-medium transition-colors border border-cyan-500/20 hover:border-cyan-500/40"
          >
            View Details
          </button>
          <button
            onClick={() => onEdit(event)}
            className="p-2 hover:bg-slate-700/50 text-slate-400 hover:text-cyan-400 rounded-lg transition-colors"
            title="Edit"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </button>
          <button
            onClick={() => onDelete(event.id)}
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
