import React, { useState } from 'react';
import { Brain, Bot, Trophy, Cpu, ExternalLink, Github, ChevronRight } from 'lucide-react';

// Project type definitions
type ProjectType = 'AI' | 'Robotics' | 'Competition' | 'All';

interface Project {
  id: number;
  title: string;
  description: string;
  type: ProjectType;
  image: string;
  tags: string[];
  link?: string;
  github?: string;
}

interface ProjectCardProps {
  project: Project;
}

interface FilterButtonProps {
  type: ProjectType;
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  count: number;
}

// Project Card Component
const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const getTypeColor = (type: ProjectType) => {
    switch (type) {
      case 'AI':
        return 'from-purple-500 to-pink-500';
      case 'Robotics':
        return 'from-blue-500 to-cyan-500';
      case 'Competition':
        return 'from-orange-500 to-red-500';
      default:
        return 'from-slate-500 to-slate-600';
    }
  };

  const getTypeIcon = (type: ProjectType) => {
    switch (type) {
      case 'AI':
        return <Brain className="w-4 h-4" />;
      case 'Robotics':
        return <Bot className="w-4 h-4" />;
      case 'Competition':
        return <Trophy className="w-4 h-4" />;
      default:
        return <Cpu className="w-4 h-4" />;
    }
  };

  return (
    <article
      className="group relative bg-slate-800/30 backdrop-blur-sm rounded-2xl border border-slate-700/50 overflow-hidden hover:border-cyan-500/50 transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl hover:shadow-cyan-500/20"
      aria-label={`Project: ${project.title}`}
    >
      {/* Gradient Glow on Hover */}
      <div className={`absolute inset-0 bg-gradient-to-br ${getTypeColor(project.type)} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>

      {/* Image Container */}
      <div className="relative h-56 bg-gradient-to-br from-slate-700 to-slate-800 overflow-hidden">
        {/* Placeholder gradient if no image */}
        <div className={`absolute inset-0 bg-gradient-to-br ${getTypeColor(project.type)} opacity-20`}></div>
        
        {/* Image overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500"></div>
        
        {/* Placeholder icon */}
        <div className="absolute inset-0 flex items-center justify-center">
          <Cpu className="w-20 h-20 text-slate-600 group-hover:text-cyan-400 group-hover:scale-110 transition-all duration-500" strokeWidth={1.5} />
        </div>

        {/* Project Type Badge */}
        <div className="absolute top-4 left-4 z-10">
          <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r ${getTypeColor(project.type)} shadow-lg`}>
            <div className="text-white">
              {getTypeIcon(project.type)}
            </div>
            <span className="text-xs font-semibold text-white">{project.type}</span>
          </div>
        </div>

        {/* Action Buttons - Show on Hover */}
        <div className="absolute top-4 right-4 z-10 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          {project.github && (
            <button
              className="p-2 rounded-lg bg-slate-900/80 backdrop-blur-sm border border-slate-700 hover:border-cyan-500 hover:bg-slate-800 transition-all duration-300"
              aria-label="View on GitHub"
            >
              <Github className="w-4 h-4 text-white" />
            </button>
          )}
          {project.link && (
            <button
              className="p-2 rounded-lg bg-slate-900/80 backdrop-blur-sm border border-slate-700 hover:border-cyan-500 hover:bg-slate-800 transition-all duration-300"
              aria-label="View project"
            >
              <ExternalLink className="w-4 h-4 text-white" />
            </button>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 p-6 space-y-4">
        {/* Title */}
        <h3 className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors duration-300">
          {project.title}
        </h3>

        {/* Description */}
        <p className="text-slate-300 leading-relaxed line-clamp-3">
          {project.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag, index) => (
            <span
              key={index}
              className="px-3 py-1 text-xs font-medium rounded-full bg-slate-700/50 text-slate-300 border border-slate-600/50"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Learn More Link */}
        <div className="pt-2">
          <button className="group/btn flex items-center gap-2 text-cyan-400 hover:text-cyan-300 font-medium transition-colors duration-300">
            <span>Learn More</span>
            <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-300" />
          </button>
        </div>
      </div>

      {/* Bottom Accent Line */}
      <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${getTypeColor(project.type)} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left`}></div>
    </article>
  );
};

// Filter Button Component
const FilterButton: React.FC<FilterButtonProps> = ({ type, active, onClick, icon, count }) => {
  return (
    <button
      onClick={onClick}
      className={`
        flex items-center gap-2 px-5 py-3 rounded-full font-medium transition-all duration-300
        ${active 
          ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg shadow-cyan-500/30 scale-105' 
          : 'bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 text-slate-300 hover:border-cyan-500/50 hover:text-white hover:scale-105'
        }
      `}
      aria-label={`Filter by ${type}`}
      aria-pressed={active}
    >
      <div className={active ? 'text-white' : 'text-cyan-400'}>
        {icon}
      </div>
      <span>{type}</span>
      <span className={`
        px-2 py-0.5 rounded-full text-xs font-bold
        ${active ? 'bg-white/20' : 'bg-slate-700/50'}
      `}>
        {count}
      </span>
    </button>
  );
};

// Main Projects Section Component
export default function Projects() {
  const [activeFilter, setActiveFilter] = useState<ProjectType>('All');

  // Sample projects data
  const projects: Project[] = [
    {
      id: 1,
      title: "Autonomous Navigation Robot",
      description: "AI-powered robot using computer vision and SLAM algorithms to navigate complex environments autonomously. Achieved 95% accuracy in obstacle detection.",
      type: "AI",
      image: "/projects/robot-1.jpg",
      tags: ["Python", "ROS", "OpenCV", "TensorFlow"],
      github: "#",
      link: "#"
    },
    {
      id: 2,
      title: "Robotic Arm Assembly Line",
      description: "6-DOF robotic arm with precision control for automated assembly tasks. Integrated with IoT sensors for real-time monitoring and quality control.",
      type: "Robotics",
      image: "/projects/robot-2.jpg",
      tags: ["Arduino", "C++", "Kinematics", "IoT"],
      github: "#",
      link: "#"
    },
    {
      id: 3,
      title: "RoboCup Soccer Champion",
      description: "Competition-winning autonomous soccer robot with advanced path planning and team coordination. 1st place at National RoboCup 2024.",
      type: "Competition",
      image: "/projects/robot-3.jpg",
      tags: ["AI", "Teamwork", "Strategy", "Real-time"],
      github: "#",
      link: "#"
    },
    {
      id: 4,
      title: "Gesture Recognition System",
      description: "Real-time hand gesture recognition using deep learning for human-robot interaction. Supports 20+ gestures with 98% accuracy.",
      type: "AI",
      image: "/projects/robot-4.jpg",
      tags: ["CNN", "MediaPipe", "PyTorch", "Computer Vision"],
      github: "#",
      link: "#"
    },
    {
      id: 5,
      title: "Warehouse Automation Bot",
      description: "Collaborative robot for warehouse logistics, featuring autonomous navigation, object recognition, and efficient path optimization.",
      type: "Robotics",
      image: "/projects/robot-5.jpg",
      tags: ["ROS2", "LiDAR", "Path Planning", "Automation"],
      github: "#",
      link: "#"
    },
    {
      id: 6,
      title: "Drone Swarm Coordination",
      description: "Multi-drone system with swarm intelligence for search and rescue missions. Winner of Innovation Award at TechFest 2024.",
      type: "Competition",
      image: "/projects/robot-6.jpg",
      tags: ["Swarm AI", "Flight Control", "Communication", "Sensors"],
      github: "#",
      link: "#"
    }
  ];

  // Filter projects
  const filteredProjects = activeFilter === 'All' 
    ? projects 
    : projects.filter(project => project.type === activeFilter);

  // Count projects by type
  const projectCounts = {
    All: projects.length,
    AI: projects.filter(p => p.type === 'AI').length,
    Robotics: projects.filter(p => p.type === 'Robotics').length,
    Competition: projects.filter(p => p.type === 'Competition').length,
  };

  const filters: { type: ProjectType; icon: React.ReactNode }[] = [
    { type: 'All', icon: <Cpu className="w-5 h-5" /> },
    { type: 'AI', icon: <Brain className="w-5 h-5" /> },
    { type: 'Robotics', icon: <Bot className="w-5 h-5" /> },
    { type: 'Competition', icon: <Trophy className="w-5 h-5" /> },
  ];

  return (
    <section
      className="relative min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 py-24 overflow-hidden"
      aria-labelledby="projects-heading"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-20"></div>

      {/* Floating Gradient Orbs */}
      <div className="absolute top-40 left-20 w-96 h-96 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse"></div>
      <div className="absolute bottom-40 right-20 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse delay-1000"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse delay-500"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-6">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 backdrop-blur-sm">
            <Bot className="w-4 h-4 text-cyan-400" />
            <span className="text-sm font-medium text-cyan-300">Our Work</span>
          </div>

          {/* Main Title */}
          <h2
            id="projects-heading"
            className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight"
          >
            <span className="block text-white">Featured</span>
            <span className="block bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
              Projects & Innovations
            </span>
          </h2>

          {/* Subtitle */}
          <p className="text-lg sm:text-xl text-slate-300 leading-relaxed">
            Explore cutting-edge robotics projects built by our talented members. 
            From AI-powered systems to competition-winning robots, 
            <span className="text-cyan-400 font-semibold"> innovation drives everything we do</span>.
          </p>
        </div>

        {/* Filter Buttons */}
        <div
          className="flex flex-wrap justify-center gap-4 mb-12"
          role="group"
          aria-label="Project filters"
        >
          {filters.map((filter) => (
            <FilterButton
              key={filter.type}
              type={filter.type}
              active={activeFilter === filter.type}
              onClick={() => setActiveFilter(filter.type)}
              icon={filter.icon}
              count={projectCounts[filter.type]}
            />
          ))}
        </div>

        {/* Projects Grid */}
        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"
          role="list"
        >
          {filteredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>

        {/* Empty State */}
        {filteredProjects.length === 0 && (
          <div className="text-center py-20">
            <Bot className="w-16 h-16 text-slate-600 mx-auto mb-4" />
            <p className="text-xl text-slate-400">No projects found in this category</p>
          </div>
        )}

        {/* CTA Section */}
        <div className="relative mt-20">
          <div className="relative bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm rounded-3xl p-12 border border-slate-700/50 shadow-2xl overflow-hidden">
            {/* Decorative Elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-cyan-500/10 to-transparent rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-purple-500/10 to-transparent rounded-full blur-3xl"></div>

            <div className="relative z-10 text-center space-y-6">
              <h3 className="text-3xl sm:text-4xl font-bold text-white">
                Ready to Build Something Amazing?
              </h3>
              <p className="text-lg text-slate-300 max-w-2xl mx-auto">
                Join our club and turn your ideas into reality. Whether you're a beginner or an expert, 
                there's a place for you in our robotics community.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                <button className="group relative px-8 py-4 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-lg font-semibold text-white shadow-lg shadow-cyan-500/30 hover:shadow-cyan-500/50 transition-all duration-300 hover:scale-105">
                  <span className="relative z-10">Start Your Project</span>
                  <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </button>
                
                <button className="group px-8 py-4 bg-slate-800/50 backdrop-blur-sm border-2 border-slate-700 rounded-lg font-semibold text-white hover:border-cyan-500 hover:bg-slate-800/80 transition-all duration-300 hover:scale-105">
                  View All Projects
                  <span className="inline-block ml-2 group-hover:translate-x-1 transition-transform duration-300">→</span>
                </button>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Bottom Gradient Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-900 to-transparent pointer-events-none"></div>
    </section>
  );
}