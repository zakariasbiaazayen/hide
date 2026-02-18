import { useMemo, useState } from "react";
import {
  Calendar,
  MapPin,
  Clock,
  Users,
  ChevronRight,
  Sparkles,
} from "lucide-react";
import Event_img from  '../../assets/event.jfif'
/* ================= TYPES ================= */

type EventStatus = "upcoming" | "past";
type FilterType = "all" | "upcoming" | "past";

interface Category {
  name: string;
  price: number;
  ageRange: string;
}

export interface Event {
  id: number;
  title: string;
  description: string;
  date: string;
  time: string;
  duration: string;
  location: string;
  status: EventStatus;
  image: string; // ⭐ NEW
  categories: Category[];
}

/* ================= FILTER TAB ================= */

interface FilterTabProps {
  label: string;
  active: boolean;
  count: number;
  onClick: () => void;
}

function FilterTab({ label, active, count, onClick }: FilterTabProps) {
  return (
    <button
      onClick={onClick}
      aria-pressed={active}
      className={`px-6 py-3 rounded-full font-medium transition-all duration-300
        ${
          active
            ? "bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg shadow-cyan-500/30 scale-105"
            : "bg-slate-800/50 border border-slate-700/50 text-slate-300 hover:border-cyan-500/50 hover:text-white hover:scale-105"
        }`}
    >
      {label}
      <span
        className={`ml-2 px-2 py-0.5 rounded-full text-xs font-bold ${
          active ? "bg-white/20" : "bg-slate-700/50"
        }`}
      >
        {count}
      </span>
    </button>
  );
}

/* ================= EVENT CARD ================= */

function EventCard({ event }: { event: Event }) {
  const isPast = event.status === "past";

  return (
    <article
      aria-label={`Event: ${event.title}`}
      className={`group relative rounded-2xl border border-slate-700/50 bg-slate-800/30 overflow-hidden transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl hover:shadow-cyan-500/20 ${
        isPast ? "opacity-70" : "hover:border-cyan-500/50"
      }`}
    >
      {/* IMAGE */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={event.image}
          alt={event.title}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />

        {isPast && (
          <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-slate-900/80 border border-slate-600 text-xs font-semibold text-slate-300">
            Past Event
          </div>
        )}
      </div>

      {/* CONTENT */}
      <div className="p-6 space-y-5">
        <div>
          <h3 className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors">
            {event.title}
          </h3>
          <p className="text-slate-300 line-clamp-2">{event.description}</p>
        </div>

        {/* META */}
        <div className="space-y-2 text-sm text-slate-300">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-cyan-400" />
            {event.date}
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-blue-400" />
            {event.time} • {event.duration}
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-purple-400" />
            {event.location}
          </div>
        </div>

        {/* CATEGORIES */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-xs uppercase text-slate-400">
            <Users className="w-4 h-4" />
            Categories
          </div>

          {event.categories.map((c) => (
            <div
              key={c.name}
              className="flex items-center justify-between rounded-lg bg-slate-700/30 px-3 py-2 border border-slate-600/30"
            >
              <div>
                <p className="text-sm font-semibold text-white">{c.name}</p>
                <p className="text-xs text-slate-400">{c.ageRange}</p>
              </div>

              <p className="font-bold text-cyan-400">
                {c.price === 0 ? "Free" : `$${c.price}`}
              </p>
            </div>
          ))}
        </div>

        {/* ACTIONS */}
        <div className="flex gap-3 pt-3">
          <button className="flex-1 px-4 py-2 border border-slate-700 rounded-lg text-white hover:border-cyan-500 hover:bg-slate-800/80 transition">
            View More <ChevronRight className="inline w-4 h-4 ml-1" />
          </button>

          {!isPast && (
            <button className="flex-1 px-4 py-2 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-lg font-semibold text-white shadow-lg hover:scale-105 transition">
              Register
            </button>
          )}
        </div>
      </div>
    </article>
  );
}

/* ================= MAIN SECTION ================= */

export default function EventsSection() {
  const [filter, setFilter] = useState<FilterType>("all");

  /* ===== EVENTS DATA ===== */
  const events: Event[] = [
    {
      id: 1,
      title: "AI & Robotics Workshop",
      description: "Build your first intelligent robot with expert guidance.",
      date: "March 15, 2026",
      time: "2:00 PM",
      duration: "3h",
      location: "Engineering Lab",
      status: "upcoming",
      image: Event_img,
      categories: [{ name: "Beginner", price: 0, ageRange: "14-18" }],
    },
    {
      id: 2,
      title: "RoboCup Preparation Training",
      description: "Intensive training session for the upcoming RoboCup competition. Strategy planning and robot optimization.",
      date: "March 22, 2026",
      time: "10:00 AM",
      duration: "5 hours",
      location: "Robotics Arena, Sports Complex",
      image: Event_img,
      status: "upcoming",
      categories: [
        { name: "Team Competition", price: 50, ageRange: "15-22 years" }
      ]
    },
    {
      id: 3,
      title: "Introduction to Arduino",
      description: "Hands-on workshop covering Arduino basics, circuits, sensors, and programming. Perfect for absolute beginners.",
      date: "February 28, 2026",
      time: "3:00 PM",
      duration: "2.5 hours",
      location: "Maker Space, Building C",
      status: "past",
      image: Event_img,
      categories: [
        { name: "Beginner", price: 0, ageRange: "12+ years" }
      ]
    },
    {
      id: 4,
      title: "Drone Programming Challenge",
      description: "Code autonomous drone behaviors and compete in obstacle course challenges. Prizes for top performers!",
      date: "March 30, 2026",
      time: "1:00 PM",
      duration: "4 hours",
      location: "Outdoor Field, Campus West",
      image: Event_img,
      status: "upcoming",
      categories: [
        { name: "Individual", price: 15, ageRange: "16+ years" },
        { name: "Team (2-3)", price: 40, ageRange: "16+ years" }
      ]
    },
    {
      id: 5,
      title: "Computer Vision Bootcamp",
      description: "Deep dive into computer vision techniques for robotics. Learn OpenCV, object detection, and real-time processing.",
      date: "February 20, 2026",
      time: "9:00 AM",
      duration: "6 hours",
      location: "AI Lab, Building B",
      status: "past",
      image: Event_img,
      categories: [
        { name: "Advanced", price: 30, ageRange: "18+ years" }
      ]
    },
    {
      id: 6,
      title: "Robot Battle Championship",
      description: "Annual robot combat competition! Build, program, and battle your robots. Spectators welcome.",
      date: "April 10, 2026",
      time: "12:00 PM",
      duration: "8 hours",
      location: "Main Arena, Student Center",
      image: Event_img,
      status: "upcoming",
      categories: [
        { name: "Lightweight", price: 20, ageRange: "14+ years" },
        { name: "Heavyweight", price: 35, ageRange: "16+ years" },
        { name: "Spectator Pass", price: 5, ageRange: "All ages" }
      ]
    }
  ];

  /* ===== FILTERED EVENTS ===== */
  const filteredEvents = useMemo(() => {
    if (filter === "all") return events;
    return events.filter((e) => e.status === filter);
  }, [filter, events]);

  const counts = {
    all: events.length,
    upcoming: events.filter((e) => e.status === "upcoming").length,
    past: events.filter((e) => e.status === "past").length,
  };

  return (
    <section className="relative bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 py-24">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-20" />

      {/* Glow effects */}
      <div className="absolute top-20 left-10 w-96 h-96 bg-cyan-500 rounded-full mix-blend-multiply blur-3xl opacity-10 animate-pulse" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply blur-3xl opacity-10 animate-pulse delay-1000" />

      <div className="max-w-7xl mx-auto px-4 space-y-16">
        {/* HEADER */}
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <span className="text-cyan-300 text-sm">Events</span>
          </div>

          <h2 className="text-4xl font-bold text-white">
            Events & Workshops
          </h2>

          <p className="text-slate-300">
            Discover robotics workshops, competitions, and hands-on learning
            experiences.
          </p>
        </div>

        {/* FILTERS */}
        <div className="flex justify-center gap-4 flex-wrap">
          <FilterTab
            label="All"
            active={filter === "all"}
            count={counts.all}
            onClick={() => setFilter("all")}
          />
          <FilterTab
            label="Upcoming"
            active={filter === "upcoming"}
            count={counts.upcoming}
            onClick={() => setFilter("upcoming")}
          />
          <FilterTab
            label="Past"
            active={filter === "past"}
            count={counts.past}
            onClick={() => setFilter("past")}
          />
        </div>

        {/* GRID */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredEvents.map((e) => (
            <EventCard key={e.id} event={e} />
          ))}
        </div>
      </div>
    </section>
  );
}
