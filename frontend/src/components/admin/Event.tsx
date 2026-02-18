import React, { useState } from 'react';
import { Event, ViewMode } from '../../types/event';
import { mockEvents } from './data/mockevent';
import { EventCard } from './EventCard';
import { EventDetails } from './EventDetails';
import { EventForm } from './EventForm';

const EventsAdmin: React.FC = () => {
  const [events, setEvents] = useState<Event[]>(mockEvents);
  const [viewMode, setViewMode] = useState<ViewMode>('list');
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const handleViewDetails = (event: Event) => {
    setSelectedEvent(event);
    setViewMode('details');
  };

  const handleEdit = (event: Event) => {
    setSelectedEvent(event);
    setViewMode('edit');
  };

  const handleDelete = (id: string) => {
    setEvents(events.filter(e => e.id !== id));
  };

  const handleSave = (event: Event) => {
    if (viewMode === 'create') {
      setEvents([...events, event]);
    } else if (viewMode === 'edit') {
      setEvents(events.map(e => e.id === event.id ? event : e));
      setSelectedEvent(event);
      setViewMode('details');
      return;
    }
    setViewMode('list');
    setSelectedEvent(null);
  };

  const handleCancel = () => {
    if (viewMode === 'edit' && selectedEvent) {
      setViewMode('details');
    } else {
      setViewMode('list');
      setSelectedEvent(null);
    }
  };

  const handleBackToList = () => {
    setViewMode('list');
    setSelectedEvent(null);
  };

  const filteredEvents = events.filter(event => {
    const query = searchQuery.toLowerCase();
    return (
      event.title.toLowerCase().includes(query) ||
      event.type.toLowerCase().includes(query) ||
      event.description.toLowerCase().includes(query) ||
      event.date.includes(query)
    );
  });

  return (
    <div className="min-h-screen p-6 md:p-8">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800&family=DM+Sans:wght@400;500;600&display=swap');
        
        * {
          font-family: 'DM Sans', sans-serif;
        }
        
        h1, h2, h3, h4, h5, h6 {
          font-family: 'Outfit', sans-serif;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.4s ease-out;
        }

        .animate-slideUp {
          animation: slideUp 0.5s ease-out;
          animation-fill-mode: both;
        }

        .animate-slideDown {
          animation: slideDown 0.5s ease-out;
        }

        body {
          background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
          min-height: 100vh;
        }
      `}</style>

      <div className="max-w-7xl mx-auto">
        {viewMode === 'list' && (
          <div className="animate-fadeIn">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
              <div>
                <h1 className="text-4xl font-bold text-slate-100 mb-2">Events Management</h1>
                <p className="text-slate-400">Manage your robotics and tech platform events</p>
              </div>
              <button
                onClick={() => setViewMode('create')}
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white rounded-xl font-medium transition-all shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:scale-105"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Create Event
              </button>
            </div>

            {/* Search Bar */}
            <div className="mb-6 animate-slideDown">
              <div className="relative">
                <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  type="text"
                  placeholder="Search events by title, type, or date..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3.5 bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20 transition-all"
                />
              </div>
            </div>

            {/* Events Grid */}
            {filteredEvents.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredEvents.map((event, index) => (
                  <div 
                    key={event.id}
                    className="animate-slideUp"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <EventCard
                      event={event}
                      onView={handleViewDetails}
                      onEdit={handleEdit}
                      onDelete={handleDelete}
                    />
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <svg className="w-16 h-16 mx-auto text-slate-600 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h3 className="text-xl font-semibold text-slate-400 mb-2">No events found</h3>
                <p className="text-slate-500">Try adjusting your search criteria</p>
              </div>
            )}
          </div>
        )}

        {viewMode === 'details' && selectedEvent && (
          <EventDetails
            event={selectedEvent}
            onBack={handleBackToList}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        )}

        {(viewMode === 'create' || viewMode === 'edit') && (
          <EventForm
            event={viewMode === 'edit' ? selectedEvent! : undefined}
            mode={viewMode === 'create' ? 'create' : 'edit'}
            onSave={handleSave}
            onCancel={handleCancel}
          />
        )}
      </div>
    </div>
  );
};

export default EventsAdmin;
