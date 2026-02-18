import React, { useState } from 'react';
import {
  Search,
  SlidersHorizontal,
  Calendar,
  MapPin,
  Clock,
  Users,
  DollarSign,
  Grid3x3,
  List,
  X,
  ChevronDown,
  Filter,
  Eye,
  Sparkles,
  RotateCcw
} from 'lucide-react';
import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'
// Types & Interfaces
interface Category {
  name: string;
  price: number;
  ageRange: string;
}

interface Event {
  id: number;
  title: string;
  description: string;
  image: string;
  date: string;
  time: string;
  duration: string;
  location: string;
  type: string;
  categories: Category[];
  featured?: boolean;
}

interface FilterState {
  search: string;
  types: string[];
  priceRange: [number, number];
  ageRange: [number, number];
  location: string;
  freeOnly: boolean;
}

type ViewMode = 'grid' | 'list';
type SortOption = 'upcoming' | 'price-low' | 'age-group';

// Mock Events Data
const mockEvents: Event[] = [
  {
    id: 1,
    title: "AI & Machine Learning Workshop",
    description: "Learn fundamentals of AI integration in robotics. Build intelligent systems with expert guidance.",
    image: "/events/ai-workshop.jpg",
    date: "March 15, 2026",
    time: "2:00 PM",
    duration: "3 hours",
    location: "Engineering Lab, Building A",
    type: "Workshop",
    featured: true,
    categories: [
      { name: "Beginner Track", price: 0, ageRange: "14-18 years" },
      { name: "Advanced Track", price: 25, ageRange: "16+ years" }
    ]
  },
  {
    id: 2,
    title: "RoboCup Competition Training",
    description: "Intensive preparation for RoboCup. Strategy planning, robot optimization, and team coordination.",
    image: "/events/robocup.jpg",
    date: "March 22, 2026",
    time: "10:00 AM",
    duration: "5 hours",
    location: "Robotics Arena, Sports Complex",
    type: "Competition",
    categories: [
      { name: "Team Entry", price: 50, ageRange: "15-22 years" }
    ]
  },
  {
    id: 3,
    title: "Arduino Basics Bootcamp",
    description: "Complete beginner's guide to Arduino programming, circuits, and sensor integration.",
    image: "/events/arduino.jpg",
    date: "March 18, 2026",
    time: "3:00 PM",
    duration: "2.5 hours",
    location: "Maker Space, Building C",
    type: "Bootcamp",
    categories: [
      { name: "Beginner", price: 0, ageRange: "12+ years" }
    ]
  },
  {
    id: 4,
    title: "Drone Programming Challenge",
    description: "Code autonomous drone behaviors. Compete in obstacle courses and win prizes!",
    image: "/events/drone.jpg",
    date: "March 30, 2026",
    time: "1:00 PM",
    duration: "4 hours",
    location: "Outdoor Field, Campus West",
    type: "Competition",
    featured: true,
    categories: [
      { name: "Individual", price: 15, ageRange: "16+ years" },
      { name: "Team (2-3)", price: 40, ageRange: "16+ years" }
    ]
  },
  {
    id: 5,
    title: "Computer Vision Deep Dive",
    description: "Master OpenCV, object detection, and real-time image processing for robotics applications.",
    image: "/events/vision.jpg",
    date: "April 5, 2026",
    time: "9:00 AM",
    duration: "6 hours",
    location: "AI Lab, Building B",
    type: "Training",
    categories: [
      { name: "Advanced", price: 30, ageRange: "18+ years" }
    ]
  },
  {
    id: 6,
    title: "Robot Battle Championship",
    description: "Build, program, and battle robots in our annual combat competition. Spectators welcome!",
    image: "/events/battle.jpg",
    date: "April 10, 2026",
    time: "12:00 PM",
    duration: "8 hours",
    location: "Main Arena, Student Center",
    type: "Competition",
    featured: true,
    categories: [
      { name: "Lightweight", price: 20, ageRange: "14+ years" },
      { name: "Heavyweight", price: 35, ageRange: "16+ years" },
      { name: "Spectator Pass", price: 5, ageRange: "All ages" }
    ]
  },
  {
    id: 7,
    title: "3D Printing for Robotics",
    description: "Learn to design and print custom robot parts. CAD modeling and rapid prototyping techniques.",
    image: "/events/3dprint.jpg",
    date: "March 25, 2026",
    time: "4:00 PM",
    duration: "3 hours",
    location: "Design Studio, Building D",
    type: "Workshop",
    categories: [
      { name: "Intermediate", price: 15, ageRange: "15+ years" }
    ]
  },
  {
    id: 8,
    title: "ROS2 Introduction Course",
    description: "Get started with Robot Operating System 2. Essential for advanced robotics development.",
    image: "/events/ros.jpg",
    date: "April 8, 2026",
    time: "10:00 AM",
    duration: "4 hours",
    location: "Computer Lab, Building E",
    type: "Training",
    categories: [
      { name: "Intermediate", price: 20, ageRange: "17+ years" }
    ]
  }
];

// Event Card Component - Grid Mode
const EventCardGrid: React.FC<{ event: Event }> = ({ event }) => {
  return (
    <article className="group relative max-w-sm mx-auto bg-slate-800/40 backdrop-blur-sm rounded-2xl border border-slate-700/50 overflow-hidden hover:border-cyan-500/50 transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl hover:shadow-cyan-500/20">
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

      {event.featured && (
        <div className="absolute top-4 right-4 z-10">
          <div className="px-3 py-1 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 shadow-lg flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-white" />
            <span className="text-xs font-semibold text-white">Featured</span>
          </div>
        </div>
      )}

      <div className="relative h-48 bg-gradient-to-br from-slate-700 to-slate-800 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-purple-500/20"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <Calendar className="w-20 h-20 text-slate-600 group-hover:text-cyan-400 group-hover:scale-110 transition-all duration-500" strokeWidth={1.5} />
        </div>
        
        <div className="absolute top-4 left-4 z-10">
          <div className="px-3 py-1 rounded-full bg-slate-900/80 backdrop-blur-sm border border-slate-700">
            <span className="text-xs font-semibold text-cyan-400">{event.type}</span>
          </div>
        </div>
      </div>

      <div className="relative z-10 p-6 space-y-4">
        <h3 className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors duration-300 line-clamp-2">
          {event.title}
        </h3>

        <p className="text-slate-300 text-sm leading-relaxed line-clamp-2">
          {event.description}
        </p>

        <div className="space-y-2">
          <div className="flex items-center gap-2 text-slate-400 text-sm">
            <Calendar className="w-4 h-4 text-cyan-400" />
            <span>{event.date}</span>
          </div>
          <div className="flex items-center gap-2 text-slate-400 text-sm">
            <Clock className="w-4 h-4 text-blue-400" />
            <span>{event.time} • {event.duration}</span>
          </div>
          <div className="flex items-center gap-2 text-slate-400 text-sm">
            <MapPin className="w-4 h-4 text-purple-400" />
            <span className="line-clamp-1">{event.location}</span>
          </div>
        </div>

        <div className="space-y-2 pt-2">
          {event.categories.map((cat, idx) => (
            <div key={idx} className="flex items-center justify-between p-2 rounded-lg bg-slate-700/30 border border-slate-600/30">
              <div className="space-y-0.5">
                <div className="text-xs font-semibold text-white">{cat.name}</div>
                <div className="text-xs text-slate-400">{cat.ageRange}</div>
              </div>
              <div className="text-sm font-bold text-cyan-400">
                {cat.price === 0 ? 'Free' : `$${cat.price}`}
              </div>
            </div>
          ))}
        </div>

        <div className="flex gap-2 pt-2">
          <button className="flex-1 px-4 py-2.5 bg-slate-800/50 backdrop-blur-sm border-2 border-slate-700 rounded-lg text-sm font-semibold text-white hover:border-cyan-500 hover:bg-slate-800/80 transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2">
            <Eye className="w-4 h-4" />
            Details
          </button>
          <button className="flex-1 group/btn relative px-4 py-2.5 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-lg text-sm font-semibold text-white shadow-lg shadow-cyan-500/30 hover:shadow-cyan-500/50 transition-all duration-300 hover:scale-105">
            <span className="relative z-10">Register</span>
            <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
          </button>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500 to-blue-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
    </article>
  );
};

// Event Card Component - List Mode
const EventCardList: React.FC<{ event: Event }> = ({ event }) => {
  return (
    <article className="group relative bg-slate-800/40 backdrop-blur-sm rounded-2xl border border-slate-700/50 overflow-hidden hover:border-cyan-500/50 transition-all duration-500 hover:shadow-xl hover:shadow-cyan-500/20">
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

      <div className=" z-10 flex flex-col sm:flex-row gap-6 p-6">
        <div className="relative w-full sm:w-48 h-48 sm:h-auto rounded-xl bg-gradient-to-br from-slate-700 to-slate-800 overflow-hidden flex-shrink-0">
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-purple-500/20"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <Calendar className="w-16 h-16 text-slate-600 group-hover:text-cyan-400 transition-colors duration-500" strokeWidth={1.5} />
          </div>
          
          {event.featured && (
            <div className="absolute top-3 right-3">
              <div className="px-2 py-1 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 shadow-lg flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-white" />
                <span className="text-xs font-semibold text-white">Featured</span>
              </div>
            </div>
          )}
          
          <div className="absolute top-3 left-3">
            <div className="px-2 py-1 rounded-full bg-slate-900/80 backdrop-blur-sm border border-slate-700">
              <span className="text-xs font-semibold text-cyan-400">{event.type}</span>
            </div>
          </div>
        </div>

        <div className="flex-1 space-y-4">
          <div>
            <h3 className="text-2xl font-bold text-white group-hover:text-cyan-400 transition-colors duration-300 mb-2">
              {event.title}
            </h3>
            <p className="text-slate-300 leading-relaxed line-clamp-2">
              {event.description}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="flex items-center gap-2 text-slate-400 text-sm">
              <Calendar className="w-4 h-4 text-cyan-400" />
              <span>{event.date}</span>
            </div>
            <div className="flex items-center gap-2 text-slate-400 text-sm">
              <Clock className="w-4 h-4 text-blue-400" />
              <span>{event.time}</span>
            </div>
            <div className="flex items-center gap-2 text-slate-400 text-sm">
              <MapPin className="w-4 h-4 text-purple-400" />
              <span className="line-clamp-1">{event.location}</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {event.categories.map((cat, idx) => (
              <div key={idx} className="flex items-center gap-3 px-4 py-2 rounded-lg bg-slate-700/30 border border-slate-600/30">
                <div className="space-y-0.5">
                  <div className="text-xs font-semibold text-white">{cat.name}</div>
                  <div className="text-xs text-slate-400">{cat.ageRange}</div>
                </div>
                <div className="text-sm font-bold text-cyan-400">
                  {cat.price === 0 ? 'Free' : `$${cat.price}`}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex sm:flex-col gap-2 sm:justify-center">
          <button className="flex-1 sm:flex-none px-6 py-2.5 bg-slate-800/50 backdrop-blur-sm border-2 border-slate-700 rounded-lg text-sm font-semibold text-white hover:border-cyan-500 hover:bg-slate-800/80 transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2">
            <Eye className="w-4 h-4" />
            Details
          </button>
          <button className="flex-1 sm:flex-none group/btn relative px-6 py-2.5 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-lg text-sm font-semibold text-white shadow-lg shadow-cyan-500/30 hover:shadow-cyan-500/50 transition-all duration-300 hover:scale-105 whitespace-nowrap">
            <span className="relative z-10">Register Now</span>
            <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
          </button>
        </div>
      </div>
    </article>
  );
};

// Filters Sidebar Component
const FiltersSidebar: React.FC<{
  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
  isOpen: boolean;
  onClose: () => void;
}> = ({ filters, setFilters, isOpen, onClose }) => {
  const eventTypes = ['Workshop', 'Competition', 'Training', 'Bootcamp'];

  const handleReset = () => {
    setFilters({
      search: '',
      types: [],
      priceRange: [0, 100],
      ageRange: [12, 25],
      location: '',
      freeOnly: false
    });
  };
  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/80 backdrop-blur-sm z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside 
        className={`
          fixed lg:sticky top-0 left-0 h-screen lg:h-auto w-80 lg:w-full
          bg-slate-800/50 backdrop-blur-sm lg:bg-transparent border-r lg:border-r-0 border-slate-700/50
          z-50 lg:z-0 transition-transform duration-300 overflow-y-auto
          ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
      >
        <div className="p-6 space-y-6">
          {/* Mobile Header */}
          <div className="flex items-center justify-between lg:hidden pb-4 border-b border-slate-700/50">
            <h3 className="text-lg font-bold text-white">Filters</h3>
            <button onClick={onClose} className="p-2 hover:bg-slate-700/50 rounded-lg transition-colors">
              <X className="w-5 h-5 text-slate-400" />
            </button>
          </div>

          {/* Category Filter */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-slate-300 flex items-center gap-2">
              <Filter className="w-4 h-4 text-cyan-400" />
              Event Type
            </h4>
            <div className="space-y-2">
              {eventTypes.map(type => (
                <label key={type} className="flex items-center gap-3 p-3 rounded-lg bg-slate-800/40 border border-slate-700/50 hover:border-cyan-500/50 cursor-pointer transition-all duration-300 group">
                  <input
                    type="checkbox"
                    checked={filters.types.includes(type)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setFilters(prev => ({ ...prev, types: [...prev.types, type] }));
                      } else {
                        setFilters(prev => ({ ...prev, types: prev.types.filter(t => t !== type) }));
                      }
                    }}
                    className="w-4 h-4 rounded border-slate-600 bg-slate-900/50 text-cyan-500 focus:ring-cyan-500 focus:ring-offset-0 focus:ring-2"
                  />
                  <span className="text-sm text-slate-300 group-hover:text-white transition-colors">{type}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Price Range */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-slate-300 flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-cyan-400" />
              Price Range
            </h4>
            <div className="p-4 rounded-lg bg-slate-800/40 border border-slate-700/50">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-slate-400">${filters.priceRange[0]}</span>
                <span className="text-sm text-slate-400">${filters.priceRange[1]}</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={filters.priceRange[1]}
                onChange={(e) => setFilters(prev => ({ ...prev, priceRange: [0, parseInt(e.target.value)] }))}
                className="w-full accent-cyan-500"
              />
            </div>
          </div>

          {/* Age Range */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-slate-300 flex items-center gap-2">
              <Users className="w-4 h-4 text-cyan-400" />
              Age Range
            </h4>
            <div className="p-4 rounded-lg bg-slate-800/40 border border-slate-700/50">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-slate-400">{filters.ageRange[0]} years</span>
                <span className="text-sm text-slate-400">{filters.ageRange[1]} years</span>
              </div>
              <input
                type="range"
                min="12"
                max="25"
                value={filters.ageRange[1]}
                onChange={(e) => setFilters(prev => ({ ...prev, ageRange: [12, parseInt(e.target.value)] }))}
                className="w-full accent-cyan-500"
              />
            </div>
          </div>

          {/* Free Only Toggle */}
          <label className="flex items-center justify-between p-4 rounded-lg bg-slate-800/40 border border-slate-700/50 hover:border-cyan-500/50 cursor-pointer transition-all duration-300">
            <span className="text-sm font-medium text-slate-300">Free Events Only</span>
            <input
              type="checkbox"
              checked={filters.freeOnly}
              onChange={(e) => setFilters(prev => ({ ...prev, freeOnly: e.target.checked }))}
              className="w-5 h-5 rounded border-slate-600 bg-slate-900/50 text-cyan-500 focus:ring-cyan-500 focus:ring-offset-0 focus:ring-2"
            />
          </label>

          {/* Reset Button */}
          <button
            onClick={handleReset}
            className="w-full px-4 py-3 bg-slate-800/40 border-2 border-slate-700/50 rounded-lg font-semibold text-slate-300 hover:border-cyan-500/50 hover:text-white transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2"
          >
            <RotateCcw className="w-4 h-4" />
            Reset Filters
          </button>
        </div>
      </aside>
    </>
  );
};

// Main Events Page Component
export default function EventsPage() {
  const [filters, setFilters] = useState<FilterState>({
    search: '',
    types: [],
    priceRange: [0, 100],
    ageRange: [12, 25],
    location: '',
    freeOnly: false
  });
  
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [sortBy, setSortBy] = useState<SortOption>('upcoming');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const filteredEvents = mockEvents.filter(event => {
    // Search filter
    if (filters.search && !event.title.toLowerCase().includes(filters.search.toLowerCase()) &&
        !event.description.toLowerCase().includes(filters.search.toLowerCase())) {
      return false;
    }

    // Type filter
    if (filters.types.length > 0 && !filters.types.includes(event.type)) {
      return false;
    }

    // Price filter
    if (filters.freeOnly && event.categories.some(cat => cat.price > 0)) {
      return false;
    }

    const maxPrice = Math.max(...event.categories.map(cat => cat.price));
    if (maxPrice > filters.priceRange[1]) {
      return false;
    }

    return true;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <Header />
      <div className="relative pt-30 z-10 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          
          {/* Header Section */}
          <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 backdrop-blur-sm">
              <Calendar className="w-4 h-4 text-cyan-400" />
              <span className="text-sm font-medium text-cyan-300">Events & Workshops</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
              <span className="block text-white">Explore Our</span>
              <span className="block bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                Upcoming Events
              </span>
            </h1>

            <p className="text-lg text-slate-300 leading-relaxed">
              Join our workshops, competitions, and training sessions. From beginner-friendly bootcamps to 
              <span className="text-cyan-400 font-semibold"> advanced robotics challenges</span>, 
              there's something for everyone.
            </p>
          </div>

          {/* Search + Controls Bar */}
          <div className="mb-8 space-y-4">
            <div className="flex flex-col sm:flex-row gap-4">
              {/* Search Input */}
              <div className="flex-1 relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Search className="w-5 h-5 text-slate-400" />
                </div>
                <input
                  type="text"
                  value={filters.search}
                  onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
                  placeholder="Search events, workshops, competitions…"
                  className="w-full pl-12 pr-4 py-3.5 bg-slate-800/50 backdrop-blur-sm border-2 border-slate-700/50 rounded-lg text-white placeholder-slate-500 transition-all duration-300 focus:outline-none focus:border-cyan-400 focus:shadow-lg focus:shadow-cyan-500/20"
                />
              </div>

              {/* Sort Dropdown */}
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as SortOption)}
                  className="w-full sm:w-48 pl-4 pr-10 py-3.5 bg-slate-800/50 backdrop-blur-sm border-2 border-slate-700/50 rounded-lg text-white transition-all duration-300 focus:outline-none focus:border-cyan-400 appearance-none cursor-pointer"
                >
                  <option value="upcoming">Upcoming First</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="age-group">Age Group</option>
                </select>
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" />
              </div>

              {/* View Toggle */}
              <div className="flex gap-2 bg-slate-800/50 backdrop-blur-sm border-2 border-slate-700/50 rounded-lg p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`px-4 py-2.5 rounded-lg font-medium transition-all duration-300 flex items-center gap-2 ${
                    viewMode === 'grid'
                      ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Grid3x3 className="w-4 h-4" />
                  Grid
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`px-4 py-2.5 rounded-lg font-medium transition-all duration-300 flex items-center gap-2 ${
                    viewMode === 'list'
                      ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <List className="w-4 h-4" />
                  List
                </button>
              </div>

              {/* Mobile Filter Button */}
              <button
                onClick={() => setIsSidebarOpen(true)}
                className="lg:hidden px-4 py-3.5 bg-slate-800/50 backdrop-blur-sm border-2 border-slate-700/50 rounded-lg text-white hover:border-cyan-500/50 transition-all duration-300 flex items-center justify-center gap-2"
              >
                <SlidersHorizontal className="w-5 h-5" />
                Filters
              </button>
            </div>
          </div>

          {/* Main Layout */}
          <div className="flex flex-col lg:flex-row gap-6">

            
            {/* Filters Sidebar */}
            <div className="hidden lg:block w-80 flex-shrink-0">
              <div className="sticky top-8">
                <FiltersSidebar
                  filters={filters}
                  setFilters={setFilters}
                  isOpen={isSidebarOpen}
                  onClose={() => setIsSidebarOpen(false)}
                />
              </div>
            </div>

            <div className="block lg:hidden">
                <FiltersSidebar
                  filters={filters}
                  setFilters={setFilters}
                  isOpen={isSidebarOpen}
                  onClose={() => setIsSidebarOpen(false)}
                />
            </div>    
            {/* Events Display */}
            <div className="flex-1">
              {filteredEvents.length === 0 ? (
                <div className="text-center py-20 space-y-6">
                  <div className="flex justify-center">
                    <div className="w-24 h-24 bg-gradient-to-br from-slate-700/50 to-slate-800/50 rounded-2xl flex items-center justify-center">
                      <Calendar className="w-12 h-12 text-slate-600" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-2xl font-bold text-white">No Events Found</h3>
                    <p className="text-slate-400">No events match your current filters. Try adjusting your search criteria.</p>
                  </div>
                  <button
                    onClick={() => setFilters({
                      search: '',
                      types: [],
                      priceRange: [0, 100],
                      ageRange: [12, 25],
                      location: '',
                      freeOnly: false
                    })}
                    className="px-6 py-3 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-lg font-semibold text-white shadow-lg shadow-cyan-500/30 hover:shadow-cyan-500/50 transition-all duration-300 hover:scale-105 inline-flex items-center gap-2"
                  >
                    <RotateCcw className="w-4 h-4" />
                    Reset Filters
                  </button>
                </div>
              ) : (
                <div className={
                  viewMode === 'grid'
                  ? 'grid relative grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 justify-items-center'
                  : 'space-y-6'
                }>
                  {filteredEvents.map(event => (
                    viewMode === 'grid' ? (
                      <EventCardGrid key={event.id} event={event} />
                    ) : (
                      <EventCardList key={event.id} event={event} />
                    )
                  ))}
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
      <Footer />
    </div>
  );
}