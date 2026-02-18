import React from 'react';
import { 
  Target, 
  Lightbulb, 
  Users, 
  Rocket, 
  Brain, 
  Hammer, 
  Trophy, 
  Sparkles,
  Code,
  CircuitBoard,
  Cpu,
  Zap,
  Star,
  Clock,
  Award,
  TrendingUp
} from 'lucide-react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import Logo from '../components/ui/Logo';
import Project_img from '../assets/project_img.jfif';
import Achievement from '../components/sections/achievement.tsx';

interface MissionCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  gradient: string;
  delay?: number;
}

const MissionCard: React.FC<MissionCardProps> = ({ icon, title, description, gradient, delay = 0 }) => {
  return (
    <article
      className="group relative bg-slate-800/30 backdrop-blur-sm rounded-2xl border border-slate-700/50 p-8 hover:border-cyan-500/50 transition-all duration-500 hover:scale-[1.03] hover:shadow-2xl hover:shadow-cyan-500/20"
      style={{ animationDelay: `${delay}ms` }}
      role="article"
    >
      <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>
      
      <div className="relative z-10 space-y-5">
        <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
          {icon}
        </div>

        <h3 className="text-2xl font-bold text-white group-hover:text-cyan-400 transition-colors duration-300">
          {title}
        </h3>

        <p className="text-slate-300 leading-relaxed">
          {description}
        </p>
      </div>

      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-cyan-500/10 to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-2xl"></div>
    </article>
  );
};

interface ValuePillProps {
  icon: React.ReactNode;
  text: string;
}

const ValuePill: React.FC<ValuePillProps> = ({ icon, text }) => {
  return (
    <div className="group flex flex-col items-center gap-3">
      <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-slate-700/50 to-slate-800/50 backdrop-blur-sm border border-slate-600/50 flex items-center justify-center group-hover:border-cyan-500/50 transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-cyan-500/20">
        <div className="text-cyan-400 group-hover:text-cyan-300 transition-colors duration-300">
          {icon}
        </div>
      </div>
      <div className="px-5 py-2.5 rounded-full bg-slate-800/40 backdrop-blur-sm border border-slate-700/50 group-hover:border-cyan-500/50 transition-all duration-300 group-hover:scale-105">
        <span className="text-slate-200 font-medium text-sm group-hover:text-cyan-400 transition-colors duration-300">
          {text}
        </span>
      </div>
    </div>
  );
};

interface StatCardProps {
  icon: React.ReactNode;
  value: string;
  label: string;
  gradient: string;
}

const StatCard: React.FC<StatCardProps> = ({ icon, value, label, gradient }) => {
  return (
    <div className="group relative bg-slate-800/30 backdrop-blur-sm rounded-2xl border border-slate-700/50 p-6 hover:border-cyan-500/50 transition-all duration-500 hover:scale-105 hover:shadow-xl hover:shadow-cyan-500/10">
      <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>
      
      <div className="relative z-10 text-center space-y-3">
        <div className="flex justify-center">
          <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center shadow-lg`}>
            {icon}
          </div>
        </div>
        <div className={`text-4xl font-bold bg-gradient-to-r ${gradient.replace('to-', 'via-')} bg-clip-text text-transparent`}>
          {value}
        </div>
        <div className="text-sm text-slate-400">{label}</div>
      </div>
    </div>
  );
};

export default function AboutPage() {
  const missionCards = [
    {
      icon: <Brain className="w-8 h-8 text-white" strokeWidth={2} />,
      title: "Learn & Innovate",
      description: "Master cutting-edge robotics, AI, and engineering through hands-on projects and expert mentorship. Our curriculum covers everything from basics to advanced autonomous systems.",
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      icon: <Hammer className="w-8 h-8 text-white" strokeWidth={2} />,
      title: "Build Real Projects",
      description: "Transform ideas into reality. Design and develop robots, drones, and intelligent systems that solve real-world problems. Access our fully-equipped lab 24/7.",
      gradient: "from-purple-500 to-pink-500"
    },
    {
      icon: <Trophy className="w-8 h-8 text-white" strokeWidth={2} />,
      title: "Compete & Excel",
      description: "Represent our club in national and international competitions. Test your skills against the best, win awards, and build a portfolio that stands out.",
      gradient: "from-orange-500 to-red-500"
    },
    {
      icon: <Users className="w-8 h-8 text-white" strokeWidth={2} />,
      title: "Community Driven",
      description: "Join a vibrant community of passionate innovators. Collaborate on groundbreaking projects, share knowledge, and build lifelong professional connections.",
      gradient: "from-cyan-500 to-blue-600"
    }
  ];

  const coreValues = [
    { icon: <Rocket className="w-8 h-8" />, text: "Innovation First" },
    { icon: <CircuitBoard className="w-8 h-8" />, text: "Hands-On Learning" },
    { icon: <Sparkles className="w-8 h-8" />, text: "Creative Thinking" },
    { icon: <Target className="w-8 h-8" />, text: "Excellence Driven" },
    { icon: <Code className="w-8 h-8" />, text: "Open Source" },
    { icon: <Star className="w-8 h-8" />, text: "Collaborative Spirit" }
  ];

  const stats = [
    {
      icon: <Clock className="w-6 h-6 text-white" />,
      value: "24/7",
      label: "Lab Access",
      gradient: "from-cyan-400 to-blue-400"
    },
    {
      icon: <Users className="w-6 h-6 text-white" />,
      value: "300+",
      label: "Active Members",
      gradient: "from-purple-400 to-pink-400"
    },
    {
      icon: <Cpu className="w-6 h-6 text-white" />,
      value: "50+",
      label: "Projects Built",
      gradient: "from-blue-400 to-cyan-400"
    },
    {
      icon: <Award className="w-6 h-6 text-white" />,
      value: "12",
      label: "Awards Won",
      gradient: "from-orange-400 to-red-400"
    },
    {
      icon: <TrendingUp className="w-6 h-6 text-white" />,
      value: "100%",
      label: "Free to Join",
      gradient: "from-green-400 to-emerald-400"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 overflow-hidden">
      <Header/>
      
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-20"></div>

      {/* Floating Gradient Orbs */}
      <div className="absolute top-20 left-10 w-96 h-96 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse delay-1000"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse delay-500"></div>

      {/* Hero About Section */}
      <section className="relative pt-30 pb-24 px-4 sm:px-6 lg:px-8" aria-labelledby="hero-heading">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* Left Content */}
            <div className="space-y-8 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 backdrop-blur-sm">
                <Sparkles className="w-4 h-4 text-cyan-400" />
                <span className="text-sm font-medium text-cyan-300">About Us</span>
              </div>

              <h1 
                id="hero-heading"
                className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight"
              >
                <span className="block text-white">Empowering the</span>
                <span className="block bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                  Next Generation
                </span>
                <span className="block text-white">of Innovators</span>
              </h1>

              <p className="text-lg sm:text-xl text-slate-300 leading-relaxed">
                RoboClub is more than just a robotics club—it's a 
                <span className="text-cyan-400 font-semibold"> launchpad for innovation</span>. 
                We provide students with the tools, knowledge, and community they need to transform bold ideas into 
                <span className="text-cyan-400 font-semibold"> groundbreaking reality</span>. 
                From AI-powered robots to autonomous drones, we're shaping the future, one project at a time.
              </p>

              <div className="flex flex-wrap gap-4 justify-center lg:justify-start pt-4">
                <div className="flex items-center gap-3 px-5 py-3 rounded-full bg-slate-800/40 backdrop-blur-sm border border-slate-700/50">
                  <Zap className="w-5 h-5 text-cyan-400" />
                  <span className="text-slate-200 font-medium">Established 2018</span>
                </div>
                <div className="flex items-center gap-3 px-5 py-3 rounded-full bg-slate-800/40 backdrop-blur-sm border border-slate-700/50">
                  <Award className="w-5 h-5 text-purple-400" />
                  <span className="text-slate-200 font-medium">Award Winning</span>
                </div>
              </div>
            </div>

            {/* Right Illustration */}
            <div className="relative">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-full blur-3xl"></div>
                
                <div className="relative bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm rounded-3xl p-8 border border-slate-700/50 shadow-2xl">
                  <div className="aspect-square relative">
                    {/* Animated Rings */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-full h-full border-2 border-cyan-500/30 rounded-full animate-ping"></div>
                    </div>
                    <div className="absolute inset-8 flex items-center justify-center">
                      <div className="w-full h-full border-2 border-blue-500/30 rounded-full animate-pulse"></div>
                    </div>
                    
                    {/* Center Icon */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="relative">
                        <div className="w-40 h-40 bg-gradient-to-br from-cyan-500 to-purple-600 rounded-3xl rotate-45 shadow-2xl shadow-cyan-500/50 animate-pulse"></div>
                        <div className="absolute inset-0 flex items-center justify-center -rotate-45">
                          <Logo className="w-20 h-20" />
                        </div>
                      </div>
                    </div>

                    {/* Floating Elements */}
                    <div className="absolute top-8 right-8 w-16 h-16 bg-cyan-500/20 backdrop-blur-sm rounded-xl border border-cyan-500/30 flex items-center justify-center animate-bounce">
                      <Brain className="w-8 h-8 text-cyan-400" />
                    </div>
                    <div className="absolute bottom-8 left-8 w-16 h-16 bg-purple-500/20 backdrop-blur-sm rounded-xl border border-purple-500/30 flex items-center justify-center animate-bounce delay-300">
                      <Rocket className="w-8 h-8 text-purple-400" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Cards Section */}
      <section className="relative py-24 px-4 sm:px-6 lg:px-8" aria-labelledby="mission-heading">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <h2 id="mission-heading" className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
              Our <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">Mission</span>
            </h2>
            <p className="text-lg text-slate-300">
              We're committed to creating an environment where innovation thrives and every member can reach their full potential
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {missionCards.map((card, index) => (
              <MissionCard
                key={index}
                icon={card.icon}
                title={card.title}
                description={card.description}
                gradient={card.gradient}
                delay={index * 100}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section className="relative py-24 px-4 sm:px-6 lg:px-8" aria-labelledby="vision-heading">
        <div className="max-w-7xl mx-auto">
          <div className="relative bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm rounded-3xl p-12 lg:p-16 border border-slate-700/50 shadow-2xl overflow-hidden">
            
            {/* Decorative Elements */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-cyan-500/10 to-transparent rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-purple-500/10 to-transparent rounded-full blur-3xl"></div>
            
            {/* Floating Geometric Shapes */}
            <div className="absolute top-10 left-10 w-20 h-20 border-2 border-cyan-500/20 rounded-xl rotate-12 animate-pulse"></div>
            <div className="absolute bottom-10 right-10 w-16 h-16 border-2 border-purple-500/20 rounded-full animate-pulse delay-500"></div>

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              
              {/* Left: Text Content */}
              <div className="space-y-6">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 backdrop-blur-sm">
                  <Lightbulb className="w-4 h-4 text-purple-400" />
                  <span className="text-sm font-medium text-purple-300">Our Vision</span>
                </div>

                <h2 id="vision-heading" className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
                  Shaping Tomorrow's <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Tech Leaders</span>
                </h2>

                <p className="text-lg text-slate-300 leading-relaxed">
                  We envision a world where every student has the opportunity to explore, create, and innovate without limits. 
                  Our goal is to be the <span className="text-cyan-400 font-semibold">premier robotics community</span> where 
                  students don't just learn about technology—they <span className="text-cyan-400 font-semibold">shape its future</span>.
                </p>

                <p className="text-lg text-slate-300 leading-relaxed">
                  Through hands-on experience, mentorship, and collaboration, we're building a generation of engineers, 
                  innovators, and problem-solvers ready to tackle the world's biggest challenges.
                </p>

                <div className="flex flex-wrap gap-3 pt-4">
                  <div className="px-4 py-2 rounded-full bg-slate-700/50 text-slate-300 text-sm font-medium">
                    Inclusive Learning
                  </div>
                  <div className="px-4 py-2 rounded-full bg-slate-700/50 text-slate-300 text-sm font-medium">
                    Global Impact
                  </div>
                  <div className="px-4 py-2 rounded-full bg-slate-700/50 text-slate-300 text-sm font-medium">
                    Future Ready
                  </div>
                </div>
              </div>

              {/* Right: Illustration with Images */}
                <div className="relative grid grid-cols-2 gap-4">
                  <div className="aspect-square bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-xl flex items-center justify-center border border-cyan-500/30 hover:scale-105 transition-transform duration-300 overflow-hidden">
                    <img src={Project_img} alt="AI Robot Project" className="object-cover w-full h-full rounded-xl"/>
                  </div>
                  <div className="aspect-square bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-xl flex items-center justify-center border border-purple-500/30 hover:scale-105 transition-transform duration-300 overflow-hidden">
                    <img src={Project_img} alt="Autonomous Drone" className="object-cover w-full h-full rounded-xl"/>
                  </div>
                  <div className="aspect-square bg-gradient-to-br from-orange-500/20 to-red-500/20 rounded-xl flex items-center justify-center border border-orange-500/30 hover:scale-105 transition-transform duration-300 overflow-hidden">
                    <img src={Project_img} alt="Robot Arm Project" className="object-cover w-full h-full rounded-xl"/>
                  </div>
                  <div className="aspect-square bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-xl flex items-center justify-center border border-blue-500/30 hover:scale-105 transition-transform duration-300 overflow-hidden">
                    <img src={Project_img} alt="Workshop Activity" className="object-cover w-full h-full rounded-xl"/>
                  </div>
                </div>

            </div>
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="relative py-24 px-4 sm:px-6 lg:px-8" aria-labelledby="values-heading">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <h2 id="values-heading" className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
              Our <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">Core Values</span>
            </h2>
            <p className="text-lg text-slate-300">
              Principles that guide everything we do
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
            {coreValues.map((value, index) => (
              <ValuePill key={index} icon={value.icon} text={value.text} />
            ))}
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="relative py-24 px-4 sm:px-6 lg:px-8" aria-labelledby="stats-heading">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <h2 id="stats-heading" className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
              By the <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">Numbers</span>
            </h2>
            <p className="text-lg text-slate-300">
              Our impact in the robotics community
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {stats.map((stat, index) => (
              <StatCard
                key={index}
                icon={stat.icon}
                value={stat.value}
                label={stat.label}
                gradient={stat.gradient}
              />
            ))}
          </div>
        </div>
      </section>
      <Achievement/>        
      {/* Bottom CTA */}
      <section className="relative py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="relative bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm rounded-3xl p-12 border border-slate-700/50 shadow-2xl overflow-hidden text-center">
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-cyan-500/10 to-transparent rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-purple-500/10 to-transparent rounded-full blur-3xl"></div>

            <div className="relative z-10 space-y-6">
              <h3 className="text-3xl sm:text-4xl font-bold text-white">
                Ready to Start Your Journey?
              </h3>
              <p className="text-lg text-slate-300 max-w-2xl mx-auto">
                Join hundreds of students who are already building the future. Whether you're a complete beginner or an experienced maker, there's a place for you at RoboClub.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                <button className="group relative px-8 py-4 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-lg font-semibold text-white shadow-lg shadow-cyan-500/30 hover:shadow-cyan-500/50 transition-all duration-300 hover:scale-105">
                  <span className="relative z-10">Join the Club</span>
                  <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </button>
                
                <button className="group px-8 py-4 bg-slate-800/50 backdrop-blur-sm border-2 border-slate-700 rounded-lg font-semibold text-white hover:border-cyan-500 hover:bg-slate-800/80 transition-all duration-300 hover:scale-105">
                  Explore Projects
                  <span className="inline-block ml-2 group-hover:translate-x-1 transition-transform duration-300">→</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer/>
    
    </div>
  );
}