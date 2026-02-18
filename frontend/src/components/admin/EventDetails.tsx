import React from 'react';
import { Event } from '../../types/event';

interface EventDetailsProps {
  event: Event;
  onBack: () => void;
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

export const EventDetails: React.FC<EventDetailsProps> = ({ event, onBack, onEdit, onDelete }) => {
  return (
    <div className="animate-fadeIn">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={onBack}
          className="flex items-center gap-2 px-4 py-2 text-slate-400 hover:text-cyan-400 transition-colors group"
        >
          <svg className="w-5 h-5 transition-transform group-hover:-translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          <span className="font-medium">Back to Events</span>
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onEdit(event)}
            className="flex items-center gap-2 px-4 py-2 bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 rounded-lg transition-colors border border-cyan-500/20"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
            Edit Event
          </button>
          <button
            onClick={() => {
              if (confirm('Are you sure you want to delete this event?')) {
                onDelete(event.id);
                onBack();
              }
            }}
            className="flex items-center gap-2 px-4 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-lg transition-colors border border-red-500/20"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
            Delete
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700/50 overflow-hidden">
        {/* Hero Image */}
        <div className="relative h-80 overflow-hidden">
          <img 
            src={event.image} 
            alt={event.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/70 to-transparent" />
          <div className="absolute bottom-8 left-8 right-8">
            <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium border backdrop-blur-md mb-3 ${typeColors[event.type]}`}>
              {event.type}
            </span>
            <h1 className="text-4xl font-bold text-white mb-2">{event.title}</h1>
            <div className="flex items-center gap-4 text-slate-300">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span>{new Date(event.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>{event.time}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="p-8">
          <p className="text-slate-300 text-lg leading-relaxed mb-8">
            {event.description}
          </p>

          {/* Themes */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-slate-100 mb-4 flex items-center gap-2">
              <span className="w-1 h-6 bg-cyan-500 rounded-full"></span>
              Themes
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {event.themes.map((theme, index) => (
                <div 
                  key={theme.id} 
                  className="bg-slate-700/30 rounded-xl p-5 border border-slate-600/30 hover:border-cyan-500/30 transition-all animate-slideUp"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex gap-4">
                    <img 
                      src={theme.image} 
                      alt={theme.title}
                      className="w-20 h-20 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-slate-100 mb-1">{theme.title}</h3>
                      <p className="text-sm text-slate-400 mb-3">{theme.description}</p>
                      <div className="grid grid-cols-2 gap-3 text-xs">
                        <div className="flex items-center gap-1 text-slate-400">
                          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          <span>{theme.date} at {theme.time}</span>
                        </div>
                        <div className="flex items-center gap-1 text-slate-400">
                          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                          </svg>
                          <span>Age: {theme.age}</span>
                        </div>
                        <div className="flex items-center gap-1 text-cyan-400 font-medium">
                          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <span>${theme.price}</span>
                        </div>
                        <a 
                          href={theme.driveLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1 text-blue-400 hover:text-blue-300 transition-colors"
                        >
                          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                          <span>Cahier de charge</span>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Registration Fields */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-slate-100 mb-4 flex items-center gap-2">
              <span className="w-1 h-6 bg-cyan-500 rounded-full"></span>
              Registration Information
            </h2>
            <div className="bg-slate-700/30 rounded-xl p-6 border border-slate-600/30">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {event.registrationFields.map((field) => (
                  <div key={field.id} className="space-y-2">
                    <label className="text-sm font-medium text-slate-300">{field.title}</label>
                    <div className="flex items-center gap-2 px-4 py-2.5 bg-slate-800/50 rounded-lg border border-slate-600/30 text-slate-400 text-sm">
                      <span className="capitalize">{field.type}</span>
                      {field.type === 'select' && field.options && (
                        <span className="text-slate-500">
                          ({field.options.join(', ')})
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Info Blocks */}
          {event.infoBlocks.length > 0 && (
            <div>
              <h2 className="text-2xl font-bold text-slate-100 mb-4 flex items-center gap-2">
                <span className="w-1 h-6 bg-cyan-500 rounded-full"></span>
                Additional Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {event.infoBlocks.map((block, index) => (
                  <div 
                    key={block.id} 
                    className="bg-slate-700/30 rounded-xl p-6 border border-slate-600/30 animate-slideUp"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <h3 className="text-lg font-semibold text-slate-100 mb-3">{block.title}</h3>
                    <ul className="space-y-2">
                      {block.bulletPoints.map((point, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-slate-400">
                          <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 mt-2 flex-shrink-0"></span>
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
