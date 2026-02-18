import React, { useState } from 'react';
import { ChevronLeft, Users, Calendar, DollarSign, Award, Mail, Phone, GraduationCap, Briefcase, Linkedin, Edit2, Save, Trash2, X, Layers, TrendingUp } from 'lucide-react';

// Type definitions
// Event type
type Event = {
  id: string;
  title: string;
  description: string;
  image: string;
  startDate: string;
  endDate?: string; // optional, if needed
  location: string;
};

// Props for EventCard component
type EventCardProps = {
  event: Event;
  totalRegistrations: number;
  themesCount: number;
  onClick: () => void;
};

// Difficulty levels for themes
type Difficulty = "Beginner" | "Intermediate" | "Advanced";

// Theme type
type Theme = {
  id: string;
  eventId?: string; // optional if you link themes to events
  title: string;
  description: string;
  image: string;
  price: number;
  capacity: number;
  difficulty: Difficulty;
};

// Props for ThemeCard
type ThemeCardProps = {
  theme: Theme;
  registrationCount: number;
  onClick: () => void;
};

// User type
type User = {
  id: string;
  name: string;
  email: string;
  age: number;
  phone: string;
  university: string;
  signupDate: string;
  major: string;
  yearsExperience: number;
  profileImage: string;
  themeId?: string;
  linkedin?: string; // optional link to Theme
};

// Props for UserCard
type UserCardProps = {
  user: User;
  onClick: () => void;
};

// Props for EventsList or EventDetails container
type EventsListProps = {
  events: Event[];
  themes: Theme[];
  users: User[];
  onSelectEvent: (event: Event) => void;
};

// Props for EventDetails
type EventDetailsProps = {
  event: Event;
  themes: Theme[];
  users: User[];
  onBack: () => void;
  onSelectTheme: (theme: Theme) => void;
};

// Props for ThemeDetails
type ThemeDetailsProps = {
  theme: Theme;
  users: User[];
  onBack: () => void;
  onSelectUser: (user: User) => void;
};

type UserDetailsProps = {
    user: User;
    onBack: () => void;
    onUpdate: (updatedUser: User) => void;
    onDelete: (userId: string) => void;
};
// Mock Data
const mockEvents: Event[] = [
  {
    id: '1',
    title: 'RoboTech Summit 2025',
    description: 'Annual flagship robotics conference featuring workshops, competitions, and networking opportunities across multiple specialized tracks.',
    image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&h=400&fit=crop',
    startDate: '2025-03-15',
    endDate: '2025-03-17',
    location: 'San Francisco, CA'
  },
  {
    id: '2',
    title: 'AI & Robotics Bootcamp',
    description: 'Intensive 5-day bootcamp covering machine learning, computer vision, and autonomous systems with hands-on projects.',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=400&fit=crop',
    startDate: '2025-04-10',
    endDate: '2025-04-14',
    location: 'Boston, MA'
  },
  {
    id: '3',
    title: 'Drone Innovation Week',
    description: 'Week-long series of workshops and challenges focused on aerial robotics, autonomous flight, and drone applications.',
    image: 'https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=800&h=400&fit=crop',
    startDate: '2025-05-20',
    endDate: '2025-05-24',
    location: 'Austin, TX'
  },
  {
    id: '4',
    title: 'Industrial Robotics Expo',
    description: 'Explore manufacturing automation, collaborative robots, and Industry 4.0 technologies through expert-led sessions.',
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&h=400&fit=crop',
    startDate: '2025-06-05',
    endDate: '2025-06-07',
    location: 'Detroit, MI'
  }
];

const mockThemes: Theme[] = [
  // RoboTech Summit themes
  {
    id: '1',
    eventId: '1',
    title: 'Autonomous Navigation',
    description: 'Master ROS2, SLAM, and path planning algorithms for self-driving robots.',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&h=400&fit=crop',
    price: 299,
    difficulty: 'Advanced',
    capacity: 30
  },
  {
    id: '2',
    eventId: '1',
    title: 'Computer Vision & Detection',
    description: 'Deep learning for object detection, tracking, and scene understanding in robotics.',
    image: 'https://images.unsplash.com/photo-1535378917042-10a22c95931a?w=800&h=400&fit=crop',
    price: 249,
    difficulty: 'Intermediate',
    capacity: 40
  },
  {
    id: '3',
    eventId: '1',
    title: 'Robot Design Fundamentals',
    description: 'Learn mechanical design, actuators, and prototyping for custom robot builds.',
    image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&h=400&fit=crop',
    price: 199,
    difficulty: 'Beginner',
    capacity: 50
  },
  {
    id: '4',
    eventId: '1',
    title: 'RoboSoccer Competition',
    description: 'Team-based soccer tournament where robots compete in strategic gameplay.',
    image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&h=400&fit=crop',
    price: 0,
    difficulty: 'Intermediate',
    capacity: 24
  },
  // AI & Robotics Bootcamp themes
  {
    id: '5',
    eventId: '2',
    title: 'Deep Learning for Robotics',
    description: 'Neural networks, CNNs, and reinforcement learning applied to robotic systems.',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=400&fit=crop',
    price: 399,
    difficulty: 'Advanced',
    capacity: 25
  },
  {
    id: '6',
    eventId: '2',
    title: 'Sensor Fusion & Perception',
    description: 'Combine LiDAR, cameras, and IMU data for robust environmental perception.',
    image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800&h=400&fit=crop',
    price: 349,
    difficulty: 'Intermediate',
    capacity: 30
  },
  {
    id: '7',
    eventId: '2',
    title: 'Robotic Manipulation',
    description: 'Kinematics, inverse kinematics, and control for robotic arms and grippers.',
    image: 'https://images.unsplash.com/photo-1563207153-f403bf289096?w=800&h=400&fit=crop',
    price: 299,
    difficulty: 'Intermediate',
    capacity: 35
  },
  // Drone Innovation Week themes
  {
    id: '8',
    eventId: '3',
    title: 'Autonomous Flight Control',
    description: 'PID controllers, waypoint navigation, and autonomous mission planning for drones.',
    image: 'https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=800&h=400&fit=crop',
    price: 279,
    difficulty: 'Advanced',
    capacity: 20
  },
  {
    id: '9',
    eventId: '3',
    title: 'Drone Building Workshop',
    description: 'Hands-on assembly and configuration of custom quadcopters from components.',
    image: 'https://images.unsplash.com/photo-1508614589041-895b88991e3e?w=800&h=400&fit=crop',
    price: 199,
    difficulty: 'Beginner',
    capacity: 40
  },
  // Industrial Robotics Expo themes
  {
    id: '10',
    eventId: '4',
    title: 'Collaborative Robots (Cobots)',
    description: 'Safety systems, human-robot interaction, and cobot programming for industry.',
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&h=400&fit=crop',
    price: 349,
    difficulty: 'Intermediate',
    capacity: 30
  }
];

const mockUsers: User[] = [
  // Autonomous Navigation theme users
  {
    id: '1',
    themeId: '1',
    name: 'Sarah Anderson',
    email: 'sarah.anderson@university.edu',
    phone: '+1 (555) 123-4567',
    age: 24,
    profileImage: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop',
    signupDate: '2025-01-15',
    university: 'MIT',
    major: 'Robotics Engineering',
    yearsExperience: 4,
    linkedin: 'https://linkedin.com/in/sarahanderson'
  },
  {
    id: '2',
    themeId: '1',
    name: 'Michael Chen',
    email: 'mchen@techmail.com',
    phone: '+1 (555) 234-5678',
    age: 26,
    profileImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop',
    signupDate: '2025-01-18',
    university: 'Stanford University',
    major: 'Computer Science',
    yearsExperience: 5,
    linkedin: 'https://linkedin.com/in/michaelchen'
  },
  {
    id: '3',
    themeId: '1',
    name: 'Emma Rodriguez',
    email: 'emma.r@robotics.edu',
    phone: '+1 (555) 345-6789',
    age: 25,
    profileImage: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop',
    signupDate: '2025-01-20',
    university: 'Carnegie Mellon',
    major: 'Mechanical Engineering',
    yearsExperience: 3,
    linkedin: 'https://linkedin.com/in/emmarodriguez'
  },
  // Computer Vision theme users
  {
    id: '4',
    themeId: '2',
    name: 'David Kim',
    email: 'david.kim@institute.edu',
    phone: '+1 (555) 456-7890',
    age: 23,
    profileImage: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop',
    signupDate: '2025-01-22',
    university: 'Georgia Tech',
    major: 'Electrical Engineering',
    yearsExperience: 2,
    linkedin: 'https://linkedin.com/in/davidkim'
  },
  {
    id: '5',
    themeId: '2',
    name: 'Lisa Patel',
    email: 'lpatel@university.edu',
    phone: '+1 (555) 567-8901',
    age: 22,
    profileImage: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop',
    signupDate: '2025-01-16',
    university: 'UC Berkeley',
    major: 'Artificial Intelligence',
    yearsExperience: 3,
    linkedin: 'https://linkedin.com/in/lisapatel'
  },
  {
    id: '6',
    themeId: '2',
    name: 'James Wilson',
    email: 'jwilson@techmail.com',
    phone: '+1 (555) 678-9012',
    age: 24,
    profileImage: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&h=200&fit=crop',
    signupDate: '2025-01-19',
    university: 'Caltech',
    major: 'Data Science',
    yearsExperience: 4,
    linkedin: 'https://linkedin.com/in/jameswilson'
  },
  {
    id: '7',
    themeId: '2',
    name: 'Sophia Martinez',
    email: 'sophia.m@tech.edu',
    phone: '+1 (555) 789-0123',
    age: 21,
    profileImage: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=200&h=200&fit=crop',
    signupDate: '2025-01-25',
    university: 'University of Washington',
    major: 'Computer Vision',
    yearsExperience: 2,
    linkedin: 'https://linkedin.com/in/sophiamartinez'
  },
  // Robot Design Fundamentals users
  {
    id: '8',
    themeId: '3',
    name: 'Alex Johnson',
    email: 'ajohnson@design.edu',
    phone: '+1 (555) 890-1234',
    age: 20,
    profileImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop',
    signupDate: '2025-02-01',
    university: 'Arizona State University',
    major: 'Mechanical Engineering',
    yearsExperience: 1,
    linkedin: 'https://linkedin.com/in/alexjohnson'
  },
  {
    id: '9',
    themeId: '3',
    name: 'Olivia Brown',
    email: 'obrown@student.edu',
    phone: '+1 (555) 901-2345',
    age: 19,
    profileImage: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&h=200&fit=crop',
    signupDate: '2025-02-03',
    university: 'University of Michigan',
    major: 'Industrial Design',
    yearsExperience: 1,
    linkedin: 'https://linkedin.com/in/oliviabrown'
  },
  // RoboSoccer Competition users
  {
    id: '10',
    themeId: '4',
    name: 'Ryan Taylor',
    email: 'rtaylor@sports.edu',
    phone: '+1 (555) 012-3456',
    age: 22,
    profileImage: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=200&h=200&fit=crop',
    signupDate: '2025-01-28',
    university: 'Ohio State University',
    major: 'Mechatronics',
    yearsExperience: 2,
    linkedin: 'https://linkedin.com/in/ryantaylor'
  },
  // Deep Learning theme users
  {
    id: '11',
    themeId: '5',
    name: 'Jennifer Lee',
    email: 'jlee@ai.university.edu',
    phone: '+1 (555) 111-2222',
    age: 27,
    profileImage: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=200&h=200&fit=crop',
    signupDate: '2025-01-12',
    university: 'Cornell University',
    major: 'Machine Learning',
    yearsExperience: 5,
    linkedin: 'https://linkedin.com/in/jenniferlee'
  },
  {
    id: '12',
    themeId: '5',
    name: 'Marcus Thompson',
    email: 'mthompson@grad.edu',
    phone: '+1 (555) 222-3333',
    age: 28,
    profileImage: 'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=200&h=200&fit=crop',
    signupDate: '2025-01-14',
    university: 'Princeton University',
    major: 'AI Research',
    yearsExperience: 6,
    linkedin: 'https://linkedin.com/in/marcusthompson'
  }
];

const EventCard: React.FC<EventCardProps> = ({
  event,
  totalRegistrations,
  themesCount,
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      className="group bg-slate-800 rounded-2xl overflow-hidden border border-slate-700 hover:border-cyan-500 transition-all duration-300 cursor-pointer hover:shadow-xl hover:shadow-cyan-500/10 hover:-translate-y-1"
    >
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={event.image}
          alt={event.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent" />

        {/* Stats badges */}
        <div className="absolute top-4 right-4 flex gap-2">
          <div className="bg-slate-900/80 backdrop-blur-sm px-3 py-1.5 rounded-full flex items-center gap-1.5">
            <Layers className="w-4 h-4 text-cyan-400" />
            <span className="text-sm font-semibold text-white">
              {themesCount}
            </span>
          </div>

          <div className="bg-cyan-600 backdrop-blur-sm px-3 py-1.5 rounded-full flex items-center gap-1.5">
            <Users className="w-4 h-4 text-white" />
            <span className="text-sm font-semibold text-white">
              {totalRegistrations}
            </span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">
          {event.title}
        </h3>

        <p className="text-slate-400 text-sm mb-4 line-clamp-2">
          {event.description}
        </p>

        {/* Meta */}
        <div className="flex items-center gap-4 mb-4 text-sm">
          <div className="flex items-center gap-1.5 text-slate-300">
            <Calendar className="w-4 h-4 text-cyan-400" />
            <span>
              {new Date(event.startDate).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
              })}
            </span>
          </div>

          <div className="flex items-center gap-1.5 text-slate-300">
            <span className="w-1 h-1 bg-slate-600 rounded-full" />
            <span className="truncate">{event.location}</span>
          </div>
        </div>

        {/* Action */}
        <button className="w-full bg-cyan-600 hover:bg-cyan-500 text-white py-2.5 px-4 rounded-xl font-medium transition-colors duration-200 flex items-center justify-center gap-2">
          View Themes
          <ChevronLeft className="w-4 h-4 rotate-180" />
        </button>
      </div>
    </div>
  );
};

// Theme Card Component
const ThemeCard: React.FC<ThemeCardProps> = ({
  theme,
  registrationCount,
  onClick,
}) => {
  const difficultyColors: Record<Difficulty, string> = {
    Beginner: "bg-green-500/10 text-green-400 border-green-500/20",
    Intermediate: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
    Advanced: "bg-red-500/10 text-red-400 border-red-500/20",
  };

  const fillPercentage =
    theme.capacity > 0 ? (registrationCount / theme.capacity) * 100 : 0;

  return (
    <div
      onClick={onClick}
      className="group bg-slate-800 rounded-2xl overflow-hidden border border-slate-700 hover:border-cyan-500 transition-all duration-300 cursor-pointer hover:shadow-lg hover:shadow-cyan-500/10 hover:-translate-y-1"
    >
      {/* Image */}
      <div className="relative h-40 overflow-hidden">
        <img
          src={theme.image}
          alt={theme.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent" />

        {/* Difficulty badge */}
        <div className="absolute top-3 right-3">
          <div
            className={`px-3 py-1 rounded-full text-xs font-semibold border ${
              difficultyColors[theme.difficulty]
            }`}
          >
            {theme.difficulty}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <h4 className="text-lg font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">
          {theme.title}
        </h4>

        <p className="text-slate-400 text-sm mb-4 line-clamp-2">
          {theme.description}
        </p>

        {/* Price & capacity */}
        <div className="space-y-3">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-1.5 text-slate-300">
              <DollarSign className="w-4 h-4 text-cyan-400" />
              <span className="font-semibold">
                {theme.price === 0 ? "Free" : `$${theme.price}`}
              </span>
            </div>

            <div className="flex items-center gap-1.5 text-slate-300">
              <Users className="w-4 h-4 text-cyan-400" />
              <span className="font-semibold">
                {registrationCount} / {theme.capacity}
              </span>
            </div>
          </div>

          {/* Capacity bar */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span>Capacity</span>
              <span>{fillPercentage.toFixed(0)}% filled</span>
            </div>

            <div className="w-full bg-slate-700 rounded-full h-2 overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-500 ${
                  fillPercentage >= 90
                    ? "bg-red-500"
                    : fillPercentage >= 70
                    ? "bg-yellow-500"
                    : "bg-cyan-500"
                }`}
                style={{ width: `${Math.min(fillPercentage, 100)}%` }}
              />
            </div>
          </div>
        </div>

        {/* Action */}
        <button className="w-full mt-4 bg-slate-700 hover:bg-cyan-600 text-slate-300 hover:text-white py-2 px-4 rounded-lg font-medium transition-all duration-200 flex items-center justify-center gap-2 text-sm">
          View Registrations
          <ChevronLeft className="w-3.5 h-3.5 rotate-180" />
        </button>
      </div>
    </div>
  );
};

// User Card Component

const UserCard: React.FC<UserCardProps> = ({ user, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="group bg-slate-800 rounded-2xl p-6 border border-slate-700 hover:border-cyan-500 transition-all duration-300 cursor-pointer hover:shadow-lg hover:shadow-cyan-500/10 hover:-translate-y-1"
    >
      <div className="flex items-start gap-4">
        {/* Profile image */}
        <img
          src={user.profileImage}
          alt={user.name}
          className="w-16 h-16 rounded-xl object-cover ring-2 ring-slate-700 group-hover:ring-cyan-500 transition-all"
        />

        {/* Info */}
        <div className="flex-1 min-w-0">
          <h4 className="text-lg font-semibold text-white mb-1 group-hover:text-cyan-400 transition-colors">
            {user.name}
          </h4>

          <p className="text-slate-400 text-sm mb-2 truncate">{user.email}</p>

          <div className="flex items-center gap-3 text-slate-300 text-sm">
            <div className="flex items-center gap-1.5">
              <Award className="w-4 h-4 text-cyan-400" />
              <span>{user.age} years</span>
            </div>

            <div className="flex items-center gap-1.5">
              <GraduationCap className="w-4 h-4 text-cyan-400" />
              <span>{user.yearsExperience}y exp</span>
            </div>
          </div>
        </div>
      </div>

      {/* Action */}
      <button className="w-full mt-4 bg-slate-700 hover:bg-cyan-600 text-slate-300 hover:text-white py-2 px-4 rounded-lg font-medium transition-all duration-200 flex items-center justify-center gap-2 text-sm">
        View Profile
        <ChevronLeft className="w-3.5 h-3.5 rotate-180" />
      </button>
    </div>
  );
};

// Events List View
const EventsList = ({ events, themes, users, onSelectEvent }: EventsListProps) => {
  const getEventStats = (eventId: string) => {
      const eventThemes = themes.filter(t => t.eventId === eventId);
      const themeIds = eventThemes.map(t => t.id);
      const registrations = users.filter(u => u.themeId && themeIds.includes(u.themeId)).length;
      return { themesCount: eventThemes.length, totalRegistrations: registrations };
    };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Events & Workshops</h1>
          <p className="text-slate-400">Manage events, themes, and participant registrations</p>
        </div>
        <div className="bg-slate-800 px-4 py-2 rounded-xl border border-slate-700">
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-cyan-400" />
            <span className="text-slate-300 font-medium">{events.length} Active Events</span>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map(event => {
          const stats = getEventStats(event.id);
          return (
            <EventCard 
              key={event.id} 
              event={event}
              totalRegistrations={stats.totalRegistrations}
              themesCount={stats.themesCount}
              onClick={() => onSelectEvent(event)}
            />
          );
        })}
      </div>
    </div>
  );
};


const EventDetails = ({ event, themes, users, onBack, onSelectTheme }: EventDetailsProps) => {
  const eventThemes = themes.filter((t) => t.eventId === event.id);
  const themeIds = eventThemes.map((t) => t.id);
  const totalRegistrations = users.filter((u) => u.themeId && themeIds.includes(u.themeId)).length;

  const getThemeRegistrations = (themeId: string) => {
    return users.filter((u) => u.themeId === themeId).length;
  };

  const eventUsers = users.filter((u) => u.themeId && themeIds.includes(u.themeId));
  const avgAge = eventUsers.length > 0
    ? Math.round(eventUsers.reduce((sum, u) => sum + u.age, 0) / eventUsers.length)
    : 0;

  const totalCapacity = eventThemes.reduce((sum, t) => sum + t.capacity, 0);
  const capacityPercentage = totalCapacity ? Math.round((totalRegistrations / totalCapacity) * 100) : 0;

  return (
    <div className="space-y-6">
      {/* Back Button */}
      <button 
        onClick={onBack}
        className="flex items-center gap-2 text-slate-400 hover:text-cyan-400 transition-colors"
      >
        <ChevronLeft className="w-5 h-5" />
        <span className="font-medium">Back to Events</span>
      </button>

      {/* Event Header */}
      <div className="bg-slate-800 rounded-2xl overflow-hidden border border-slate-700">
        <div className="relative h-64">
          <img 
            src={event.image} 
            alt={event.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent"></div>
          <div className="absolute bottom-6 left-6 right-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold text-white mb-2">{event.title}</h1>
                <p className="text-slate-300 mb-3">{event.description}</p>
                <div className="flex items-center gap-4 text-sm text-slate-300">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-4 h-4 text-cyan-400" />
                    <span>
                      {new Date(event.startDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - {event.endDate ? new Date(event.endDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : ''}
                    </span>
                  </div>
                  <span className="text-slate-500">•</span>
                  <span>{event.location}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Event Stats */}
        <div className="p-6 grid grid-cols-2 md:grid-cols-4 gap-4 border-t border-slate-700">
          <div className="bg-slate-900/50 rounded-xl p-4">
            <div className="flex items-center gap-2 text-slate-400 mb-1">
              <Layers className="w-4 h-4" />
              <span className="text-xs font-medium">Themes</span>
            </div>
            <p className="text-2xl font-bold text-white">{eventThemes.length}</p>
          </div>
          <div className="bg-slate-900/50 rounded-xl p-4">
            <div className="flex items-center gap-2 text-slate-400 mb-1">
              <Users className="w-4 h-4" />
              <span className="text-xs font-medium">Total Registered</span>
            </div>
            <p className="text-2xl font-bold text-cyan-400">{totalRegistrations}</p>
          </div>
          <div className="bg-slate-900/50 rounded-xl p-4">
            <div className="flex items-center gap-2 text-slate-400 mb-1">
              <Award className="w-4 h-4" />
              <span className="text-xs font-medium">Avg Age</span>
            </div>
            <p className="text-2xl font-bold text-white">{avgAge}y</p>
          </div>
          <div className="bg-slate-900/50 rounded-xl p-4">
            <div className="flex items-center gap-2 text-slate-400 mb-1">
              <TrendingUp className="w-4 h-4" />
              <span className="text-xs font-medium">Capacity</span>
            </div>
            <p className="text-2xl font-bold text-white">{capacityPercentage}%</p>
          </div>
        </div>
      </div>

      {/* Themes List */}
      <div>
        <h2 className="text-2xl font-bold text-white mb-4">Event Themes</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {eventThemes.map((theme) => (
            <ThemeCard 
              key={theme.id} 
              theme={theme}
              registrationCount={getThemeRegistrations(theme.id)}
              onClick={() => onSelectTheme(theme)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
// Theme Details with Users
const ThemeDetails = ({ theme, users, onBack, onSelectUser }: ThemeDetailsProps) => {
  const themeUsers = users.filter(u => u.themeId === theme.id);
  const avgAge = themeUsers.length > 0
    ? Math.round(themeUsers.reduce((sum, u) => sum + u.age, 0) / themeUsers.length)
    : 0;

  const difficultyColors = {
    Beginner: 'bg-green-500/10 text-green-400 border-green-500/20',
    Intermediate: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
    Advanced: 'bg-red-500/10 text-red-400 border-red-500/20'
  };

  return (
    <div className="space-y-6">
      <button 
        onClick={onBack}
        className="flex items-center gap-2 text-slate-400 hover:text-cyan-400 transition-colors"
      >
        <ChevronLeft className="w-5 h-5" />
        <span className="font-medium">Back to Themes</span>
      </button>
      
      <div className="bg-slate-800 rounded-2xl overflow-hidden border border-slate-700">
        <div className="relative h-56">
          <img 
            src={theme.image} 
            alt={theme.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent"></div>
          <div className="absolute top-4 right-4">
            <div className={`px-4 py-2 rounded-xl text-sm font-semibold border ${difficultyColors[theme.difficulty]}`}>
              {theme.difficulty}
            </div>
          </div>
          <div className="absolute bottom-6 left-6 right-6">
            <h1 className="text-3xl font-bold text-white mb-2">{theme.title}</h1>
            <p className="text-slate-300">{theme.description}</p>
          </div>
        </div>
        
        <div className="p-6 grid grid-cols-2 md:grid-cols-4 gap-4 border-t border-slate-700">
          <div className="bg-slate-900/50 rounded-xl p-4">
            <div className="flex items-center gap-2 text-slate-400 mb-1">
              <DollarSign className="w-4 h-4" />
              <span className="text-xs font-medium">Price</span>
            </div>
            <p className="text-2xl font-bold text-white">
              {theme.price === 0 ? 'Free' : `$${theme.price}`}
            </p>
          </div>
          <div className="bg-slate-900/50 rounded-xl p-4">
            <div className="flex items-center gap-2 text-slate-400 mb-1">
              <Users className="w-4 h-4" />
              <span className="text-xs font-medium">Registered</span>
            </div>
            <p className="text-2xl font-bold text-cyan-400">{themeUsers.length} / {theme.capacity}</p>
          </div>
          <div className="bg-slate-900/50 rounded-xl p-4">
            <div className="flex items-center gap-2 text-slate-400 mb-1">
              <Award className="w-4 h-4" />
              <span className="text-xs font-medium">Avg Age</span>
            </div>
            <p className="text-2xl font-bold text-white">{avgAge}y</p>
          </div>
          <div className="bg-slate-900/50 rounded-xl p-4">
            <div className="flex items-center gap-2 text-slate-400 mb-1">
              <TrendingUp className="w-4 h-4" />
              <span className="text-xs font-medium">Fill Rate</span>
            </div>
            <p className="text-2xl font-bold text-white">
              {Math.round((themeUsers.length / theme.capacity) * 100)}%
            </p>
          </div>
        </div>
      </div>
      
      <div>
        <h2 className="text-2xl font-bold text-white mb-4">Registered Participants</h2>
        {themeUsers.length === 0 ? (
          <div className="bg-slate-800 rounded-2xl p-12 border border-slate-700 text-center">
            <Users className="w-16 h-16 text-slate-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-slate-400 mb-2">No registrations yet</h3>
            <p className="text-slate-500">This theme doesn't have any participants registered.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {themeUsers.map(user => (
              <UserCard 
                key={user.id} 
                user={user} 
                onClick={() => onSelectUser(user)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

// User Full Details View
const UserDetails = ({ user, onBack, onUpdate, onDelete }: UserDetailsProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState(user);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const handleSave = () => {
    onUpdate(editedUser);
    setIsEditing(false);
  };

  const handleDelete = () => {
    onDelete(user.id);
    onBack();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-slate-400 hover:text-cyan-400 transition-colors"
        >
          <ChevronLeft className="w-5 h-5" />
          <span className="font-medium">Back to Participants</span>
        </button>
        
        <div className="flex items-center gap-3">
          {isEditing ? (
            <>
              <button
                onClick={() => setIsEditing(false)}
                className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-slate-300 rounded-xl transition-colors flex items-center gap-2"
              >
                <X className="w-4 h-4" />
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-white rounded-xl transition-colors flex items-center gap-2"
              >
                <Save className="w-4 h-4" />
                Save Changes
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => setIsEditing(true)}
                className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-slate-300 rounded-xl transition-colors flex items-center gap-2"
              >
                <Edit2 className="w-4 h-4" />
                Edit
              </button>
              <button
                onClick={() => setShowDeleteConfirm(true)}
                className="px-4 py-2 bg-red-900/20 hover:bg-red-900/40 text-red-400 border border-red-800 rounded-xl transition-colors flex items-center gap-2"
              >
                <Trash2 className="w-4 h-4" />
                Delete
              </button>
            </>
          )}
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-slate-800 rounded-2xl p-6 max-w-md w-full border border-slate-700">
            <h3 className="text-xl font-bold text-white mb-2">Confirm Deletion</h3>
            <p className="text-slate-400 mb-6">
              Are you sure you want to delete <span className="text-white font-semibold">{user.name}</span>? This action cannot be undone.
            </p>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="flex-1 px-4 py-2 bg-slate-700 hover:bg-slate-600 text-slate-300 rounded-xl transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="flex-1 px-4 py-2 bg-red-600 hover:bg-red-500 text-white rounded-xl transition-colors"
              >
                Delete User
              </button>
            </div>
          </div>
        </div>
      )}
      
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Left Column - Profile Image */}
        <div className="lg:col-span-1">
          <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700 space-y-4">
            <img 
              src={editedUser.profileImage} 
              alt={editedUser.name}
              className="w-full aspect-square rounded-xl object-cover ring-2 ring-slate-700"
            />
            
            <div className="space-y-3">
              <div className="flex items-center justify-center gap-2 text-slate-400">
                <Calendar className="w-4 h-4" />
                <span className="text-sm">
                  Joined {new Date(editedUser.signupDate).toLocaleDateString('en-US', { 
                    month: 'short', 
                    day: 'numeric', 
                    year: 'numeric' 
                  })}
                </span>
              </div>
              
              {editedUser.linkedin && (
                <a 
                  href={editedUser.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full bg-blue-600 hover:bg-blue-500 text-white py-2.5 px-4 rounded-xl transition-colors"
                >
                  <Linkedin className="w-4 h-4" />
                  LinkedIn Profile
                </a>
              )}
            </div>
          </div>
        </div>
        
        {/* Right Column - Details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Basic Information */}
          <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700">
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <Users className="w-5 h-5 text-cyan-400" />
              Basic Information
            </h2>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-2">Full Name</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={editedUser.name}
                    onChange={(e) => setEditedUser({...editedUser, name: e.target.value})}
                    className="w-full bg-slate-700 text-white px-4 py-2.5 rounded-xl border border-slate-600 focus:border-cyan-500 focus:outline-none transition-colors"
                  />
                ) : (
                  <p className="text-white font-medium">{editedUser.name}</p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-2">Age</label>
                {isEditing ? (
                  <input
                    type="number"
                    value={editedUser.age}
                    onChange={(e) => setEditedUser({...editedUser, age: parseInt(e.target.value)})}
                    className="w-full bg-slate-700 text-white px-4 py-2.5 rounded-xl border border-slate-600 focus:border-cyan-500 focus:outline-none transition-colors"
                  />
                ) : (
                  <p className="text-white font-medium">{editedUser.age} years</p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-2">
                  <Mail className="w-4 h-4 inline mr-1" />
                  Email
                </label>
                {isEditing ? (
                  <input
                    type="email"
                    value={editedUser.email}
                    onChange={(e) => setEditedUser({...editedUser, email: e.target.value})}
                    className="w-full bg-slate-700 text-white px-4 py-2.5 rounded-xl border border-slate-600 focus:border-cyan-500 focus:outline-none transition-colors"
                  />
                ) : (
                  <p className="text-white font-medium">{editedUser.email}</p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-2">
                  <Phone className="w-4 h-4 inline mr-1" />
                  Phone
                </label>
                {isEditing ? (
                  <input
                    type="tel"
                    value={editedUser.phone}
                    onChange={(e) => setEditedUser({...editedUser, phone: e.target.value})}
                    className="w-full bg-slate-700 text-white px-4 py-2.5 rounded-xl border border-slate-600 focus:border-cyan-500 focus:outline-none transition-colors"
                  />
                ) : (
                  <p className="text-white font-medium">{editedUser.phone}</p>
                )}
              </div>
            </div>
          </div>
          
          {/* Academic Information */}
          <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700">
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <GraduationCap className="w-5 h-5 text-cyan-400" />
              Academic Information
            </h2>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-2">University / School</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={editedUser.university}
                    onChange={(e) => setEditedUser({...editedUser, university: e.target.value})}
                    className="w-full bg-slate-700 text-white px-4 py-2.5 rounded-xl border border-slate-600 focus:border-cyan-500 focus:outline-none transition-colors"
                  />
                ) : (
                  <p className="text-white font-medium">{editedUser.university}</p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-2">Major / Field</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={editedUser.major}
                    onChange={(e) => setEditedUser({...editedUser, major: e.target.value})}
                    className="w-full bg-slate-700 text-white px-4 py-2.5 rounded-xl border border-slate-600 focus:border-cyan-500 focus:outline-none transition-colors"
                  />
                ) : (
                  <p className="text-white font-medium">{editedUser.major}</p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-2">
                  <Briefcase className="w-4 h-4 inline mr-1" />
                  Years of Experience
                </label>
                {isEditing ? (
                  <input
                    type="number"
                    value={editedUser.yearsExperience}
                    onChange={(e) => setEditedUser({...editedUser, yearsExperience: parseInt(e.target.value)})}
                    className="w-full bg-slate-700 text-white px-4 py-2.5 rounded-xl border border-slate-600 focus:border-cyan-500 focus:outline-none transition-colors"
                  />
                ) : (
                  <p className="text-white font-medium">{editedUser.yearsExperience} years</p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-2">LinkedIn URL</label>
                {isEditing ? (
                  <input
                    type="url"
                    value={editedUser.linkedin}
                    onChange={(e) => setEditedUser({...editedUser, linkedin: e.target.value})}
                    className="w-full bg-slate-700 text-white px-4 py-2.5 rounded-xl border border-slate-600 focus:border-cyan-500 focus:outline-none transition-colors"
                  />
                ) : (
                  <a 
                    href={editedUser.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-cyan-400 hover:text-cyan-300 font-medium truncate block"
                  >
                    {editedUser.linkedin}
                  </a>
                )}
              </div>
            </div>
          </div>
          
          {/* Details Image */}
          <div className="bg-slate-800 rounded-2xl overflow-hidden border border-slate-700">
            <img 
              alt="User details"
              className="w-full h-64 object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

// Main App Component
export default function RoboticsRegistrationsDashboard() {
  const [currentView, setCurrentView] = useState('events');
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [selectedTheme, setSelectedTheme] = useState<Theme | null>(null);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [users, setUsers] = useState(mockUsers);

  const handleSelectEvent = (event: Event) => {
    setSelectedEvent(event);
    setCurrentView('eventDetails');
  };

  const handleSelectTheme = (theme: Theme) => {
    setSelectedTheme(theme);
    setCurrentView('themeDetails');
  };

  const handleSelectUser = (user: User) => {
    setSelectedUser(user);
    setCurrentView('userDetails');
  };

  const handleUpdateUser = (updatedUser: User) => {
    setUsers(users.map(u => u.id === updatedUser.id ? updatedUser : u));
    setSelectedUser(updatedUser);
  };

  const handleDeleteUser = (userId: string) => {
    setUsers(users.filter(u => u.id !== userId));
  };

  const handleBackFromEventDetails = () => {
    setSelectedEvent(null);
    setCurrentView('events');
  };

  const handleBackFromThemeDetails = () => {
    setSelectedTheme(null);
    setCurrentView('eventDetails');
  };

  const handleBackFromUserDetails = () => {
    setSelectedUser(null);
    setCurrentView('themeDetails');
  };

  return (
    <div className="min-h-screen bg-slate-900 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {currentView === 'events' && (
          <EventsList 
            events={mockEvents}
            themes={mockThemes}
            users={users}
            onSelectEvent={handleSelectEvent}
          />
        )}
        
        {currentView === 'eventDetails' && selectedEvent && (
          <EventDetails 
            event={selectedEvent}
            themes={mockThemes}
            users={users}
            onBack={handleBackFromEventDetails}
            onSelectTheme={handleSelectTheme}
          />
        )}
        
        {currentView === 'themeDetails' && selectedTheme && (
          <ThemeDetails 
            theme={selectedTheme}
            users={users}
            onBack={handleBackFromThemeDetails}
            onSelectUser={handleSelectUser}
          />
        )}
        
        {currentView === 'userDetails' && selectedUser && (
          <UserDetails 
            user={selectedUser}
            onBack={handleBackFromUserDetails}
            onUpdate={handleUpdateUser}
            onDelete={handleDeleteUser}
          />
        )}
      </div>
    </div>
  );
}