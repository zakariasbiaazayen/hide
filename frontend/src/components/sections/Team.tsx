import React from "react";
import { Facebook, Instagram, Linkedin, Users } from "lucide-react";
import Team_img from '../../assets/team1.jpg'
interface SocialLinks {
  facebook?: string;
  instagram?: string;
  linkedin?: string;
}

interface TeamMember {
  id: number;
  name: string;
  role: string;
  description: string;
  image: string;
  social: SocialLinks;
}

interface TeamMemberCardProps {
  member: TeamMember;
  index: number;
}

const TeamMemberCard: React.FC<TeamMemberCardProps> = ({ member, index }) => {
  return (
    <article
      className="group relative bg-slate-800/30 backdrop-blur-sm rounded-2xl border border-slate-700/50 overflow-hidden hover:border-cyan-500/50 transition-all duration-500 hover:scale-[1.03] hover:shadow-2xl hover:shadow-cyan-500/20"
      style={{ animation: `fadeSlideUp 0.6s ease-out ${index * 0.1}s both` }}
      aria-label={`Team member: ${member.name}`}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

      <div className="relative z-10 p-6 space-y-6">
        {/* Avatar */}
        <div className="relative">
          <div className="relative w-32 h-32 mx-auto">
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl rotate-6 group-hover:rotate-12 transition-transform duration-500"></div>

            <div className="relative w-full h-full bg-gradient-to-br from-slate-700 to-slate-800 rounded-2xl overflow-hidden border-4 border-slate-900 shadow-xl">
              {member.image ? (
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center">
                  <Users className="w-16 h-16 text-slate-500" strokeWidth={1.5} />
                </div>
              )}
            </div>

            <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
            </div>
          </div>
        </div>

        {/* Name & Role */}
        <div className="text-center space-y-2">
          <h3 className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors duration-300">
            {member.name}
          </h3>
          <div className="inline-block px-4 py-1.5 rounded-full bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/20">
            <p className="text-sm font-semibold text-cyan-400">{member.role}</p>
          </div>
        </div>

        {/* Description */}
        <p className="text-sm text-slate-300 text-center leading-relaxed min-h-[40px]">
          {member.description}
        </p>

        {/* Social Links */}
        <div className="flex justify-center gap-3 pt-2">
          {member.social.facebook && (
            <a
              href={member.social.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="group/social p-3 rounded-lg bg-slate-700/30 border border-slate-600/30 hover:border-blue-500/50 hover:bg-slate-700/50 transition-all duration-300 hover:scale-110"
              aria-label={`${member.name}'s Facebook`}
            >
              <Facebook className="w-5 h-5 text-slate-400 group-hover/social:text-blue-400 transition-colors duration-300" />
            </a>
          )}

          {member.social.instagram && (
            <a
              href={member.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="group/social p-3 rounded-lg bg-slate-700/30 border border-slate-600/30 hover:border-pink-500/50 hover:bg-slate-700/50 transition-all duration-300 hover:scale-110"
              aria-label={`${member.name}'s Instagram`}
            >
              <Instagram className="w-5 h-5 text-slate-400 group-hover/social:text-pink-400 transition-colors duration-300" />
            </a>
          )}

          {member.social.linkedin && (
            <a
              href={member.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="group/social p-3 rounded-lg bg-slate-700/30 border border-slate-600/30 hover:border-cyan-500/50 hover:bg-slate-700/50 transition-all duration-300 hover:scale-110"
              aria-label={`${member.name}'s LinkedIn`}
            >
              <Linkedin className="w-5 h-5 text-slate-400 group-hover/social:text-cyan-400 transition-colors duration-300" />
            </a>
          )}
        </div>
      </div>

      {/* Bottom gradient bar */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500 to-blue-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
    </article>
  );
};

export default function TeamSection() {
  const teamMembers: TeamMember[] = [
    {
      id: 1,
      name: "Sarah Anderson",
      role: "President",
      description: "Leading innovation in autonomous systems and AI integration",
      image: Team_img,
      social: { facebook: "#", instagram: "#", linkedin: "#" },
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "Vice-President",
      description: "Expert in robotics hardware design and embedded systems",
      image: Team_img,
      social: { facebook: "#", instagram: "#", linkedin: "#" },
    },
    {
      id: 3,
      name: "Emma Rodriguez",
      role: "Treasurer",
      description: "Managing finances and coordinating sponsorship partnerships",
      image: Team_img,
      social: { instagram: "#", linkedin: "#" },
    },
    {
      id: 4,
      name: "James Wilson",
      role: "Technical Lead",
      description: "Specialist in computer vision and machine learning applications",
      image: Team_img,
      social: { facebook: "#", linkedin: "#" },
    },
  ];

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 py-24 overflow-hidden">
      <style>{`
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
         <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-20" />

      {/* Glow effects */}
      <div className="absolute top-20 left-10 w-96 h-96 bg-cyan-500 rounded-full mix-blend-multiply blur-3xl opacity-10 animate-pulse" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply blur-3xl opacity-10 animate-pulse delay-1000" />
     
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 backdrop-blur-sm">
            <Users className="w-4 h-4 text-cyan-400" />
            <span className="text-sm font-medium text-cyan-300">Team</span>
          </div>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
            <span className="block text-white">Meet Our</span>
            <span className="block bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
              Leadership Team
            </span>
          </h2>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {teamMembers.map((member, index) => (
            <TeamMemberCard key={member.id} member={member} index={index} />
          ))}
        </div>
        
        <div className="relative mt-20">
          <div className="relative bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm rounded-3xl p-12 border border-slate-700/50 shadow-2xl overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-cyan-500/10 to-transparent rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-purple-500/10 to-transparent rounded-full blur-3xl"></div>

            <div className="relative z-10 text-center space-y-6">
              <h3 className="text-3xl sm:text-4xl font-bold text-white">
                Want to Join Our Team?
              </h3>
              <p className="text-lg text-slate-300 max-w-2xl mx-auto">
                We're always looking for passionate individuals to join our leadership team. 
                Whether you're interested in technical roles or organizational positions, there's a place for you.
              </p>
              <div className="pt-4">
                <button className="group relative px-8 py-4 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-lg font-semibold text-white shadow-lg shadow-cyan-500/30 hover:shadow-cyan-500/50 transition-all duration-300 hover:scale-105">
                  <span className="relative z-10">Apply Now</span>
                  <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </button>
              </div>
            </div>
          </div>
        </div>

   
      </div>
      
    </section>
  );
}
