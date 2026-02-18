import React from 'react';
import { Brain, Hammer, Trophy, Users, Rocket, CircuitBoard, Sparkles, Target } from 'lucide-react';

interface MissionCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  gradient: string;
}

const MissionCard: React.FC<MissionCardProps> = ({ icon, title, description, gradient }) => (
  <article 
    className={`group relative rounded-2xl border border-slate-700/50 bg-slate-900/40 p-6 backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/20`}
    aria-label={title}
  >
    {/* Gradient Glow on Hover */}
    <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />

    <div className="relative z-10 space-y-4">
      <div className={`flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br ${gradient} shadow-lg transition-transform duration-300 group-hover:scale-110`}>
        {icon}
      </div>
      <h3 className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors duration-300">
        {title}
      </h3>
      <p className="text-slate-300 leading-relaxed">
        {description}
      </p>
    </div>
  </article>
);

interface ValuePillProps {
  icon: React.ReactNode;
  text: string;
}

const ValuePill: React.FC<ValuePillProps> = ({ icon, text }) => (
  <div className="flex items-center gap-3 rounded-full border border-slate-700/50 bg-slate-900/40 px-5 py-3 backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:border-cyan-500/50">
    <div className="text-cyan-400">{icon}</div>
    <span className="text-slate-200 font-medium">{text}</span>
  </div>
);

export default function About() {
  const missionCards = [
    {
      icon: <Brain className="w-7 h-7 text-white" strokeWidth={2} />,
      title: "Learn AI & Robotics",
      description: "Master machine learning, computer vision, and autonomous systems through hands-on workshops and expert mentorship.",
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      icon: <Hammer className="w-7 h-7 text-white" strokeWidth={2} />,
      title: "Build Real Projects",
      description: "Design and develop cutting-edge robots, from line-followers to advanced autonomous drones and intelligent systems.",
      gradient: "from-purple-500 to-blue-500"
    },
    {
      icon: <Trophy className="w-7 h-7 text-white" strokeWidth={2} />,
      title: "Compete & Win",
      description: "Represent your school in national robotics competitions, hackathons, and innovation challenges.",
      gradient: "from-cyan-500 to-blue-400"
    },
    {
      icon: <Users className="w-7 h-7 text-white" strokeWidth={2} />,
      title: "Join a Community",
      description: "Connect with passionate innovators, collaborate on groundbreaking projects, and build lifelong friendships.",
      gradient: "from-orange-500 to-red-500"
    }
  ];

  const coreValues = [
    { icon: <Rocket className="w-5 h-5" />, text: "Innovation First" },
    { icon: <CircuitBoard className="w-5 h-5" />, text: "Hands-On Learning" },
    { icon: <Sparkles className="w-5 h-5" />, text: "Creative Problem Solving" },
    { icon: <Target className="w-5 h-5" />, text: "Excellence Driven" }
  ];

  return (
    <section className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 py-24" aria-labelledby="about-heading">
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-20 pointer-events-none"></div>
      {/* Floating Orbs */}
      <div className="absolute top-20 right-10 h-96 w-96 animate-pulse rounded-full bg-blue-500/20 mix-blend-multiply blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-20 left-10 h-96 w-96 animate-pulse rounded-full bg-purple-500/20 mix-blend-multiply blur-3xl pointer-events-none delay-1000"></div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-20 text-center max-w-3xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/20 bg-cyan-500/10 px-4 py-2 backdrop-blur-sm">
            <Target className="h-4 w-4 text-cyan-400" />
            <span className="text-sm font-medium text-cyan-300">Our Mission</span>
          </div>
          <h2 id="about-heading" className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
            <span className="block">Empowering the Next</span>
            <span className="block bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent">
              Generation of Innovators
            </span>
          </h2>
          <p className="text-lg leading-relaxed text-slate-300 sm:text-xl">
            We're a student-driven community passionate about robotics, AI, and engineering. Our mission is to provide a collaborative space where curiosity meets innovation, and ideas transform into <span className="font-semibold text-cyan-400">real-world solutions</span>.
          </p>
        </div>

        {/* Vision Statement */}
        <div className="mb-16 max-w-4xl mx-auto relative rounded-3xl border border-slate-700/50 bg-slate-900/50 p-8 sm:p-12 backdrop-blur-sm shadow-2xl">
          <div className="relative z-10 space-y-6">
            <h3 className="flex items-center gap-3 text-2xl font-bold text-white sm:text-3xl">
              <Sparkles className="h-8 w-8 text-cyan-400" /> Our Vision
            </h3>
            <p className="text-lg leading-relaxed text-slate-300">
              To become the premier robotics community where students don't just learn about technology—they <span className="font-semibold text-cyan-400">shape its future</span>. We believe in learning by doing, failing fast, and iterating faster. Every robot we build, every line of code we write, and every competition we enter brings us closer to solving tomorrow's biggest challenges.
            </p>
            <div className="flex flex-wrap gap-3 pt-4">
              {coreValues.map((value, idx) => <ValuePill key={idx} icon={value.icon} text={value.text} />)}
            </div>
          </div>
        </div>

        {/* Offer Cards */}
        <div className="mb-16">
          <h3 className="mb-4 text-3xl text-center font-bold text-white sm:text-4xl">What We Offer</h3>
          <p className="mx-auto mb-12 max-w-2xl text-center text-slate-400">
            From beginner-friendly workshops to advanced robotics competitions, we provide everything you need to excel
          </p>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4" role="list">
            {missionCards.map((card, idx) => <MissionCard key={idx} {...card} />)}
          </div>
        </div>

        {/* Stats Bar */}
        <div className="relative">
          <div className="rounded-2xl border border-slate-700/50 bg-slate-900/30 p-8 backdrop-blur-sm">
            <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
              <div className="space-y-2 text-center">
                <div className="bg-clip-text text-4xl font-bold text-transparent bg-gradient-to-r from-cyan-400 to-blue-400">24/7</div>
                <div className="text-sm text-slate-400">Lab Access</div>
              </div>
              <div className="space-y-2 text-center">
                <div className="bg-clip-text text-4xl font-bold text-transparent bg-gradient-to-r from-purple-400 to-blue-400">100%</div>
                <div className="text-sm text-slate-400">Free to Join</div>
              </div>
              <div className="space-y-2 text-center">
                <div className="bg-clip-text text-4xl font-bold text-transparent bg-gradient-to-r from-blue-400 to-cyan-400">15+</div>
                <div className="text-sm text-slate-400">Weekly Workshops</div>
              </div>
              <div className="space-y-2 text-center">
                <div className="bg-clip-text text-4xl font-bold text-transparent bg-gradient-to-r from-orange-400 to-red-400">All Levels</div>
                <div className="text-sm text-slate-400">Welcome</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Gradient Fade */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-900 to-transparent"></div>
    </section>
  );
}