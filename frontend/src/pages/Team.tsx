import { Trophy, Calendar, Users, Linkedin, Github, Mail } from "lucide-react";
import Member_img from '../assets/team1.jpg'
import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'

interface Member {
  id: string;
  name: string;
  role: string;
  image: string;
  since: string;
  achievements: string[];
  bio?: string;
  social?: {
    linkedin?: string;
    github?: string;
    email?: string;
  };
}

const members: Member[] = [
  {
    id: "1",
    name: "Ahmed Smida",
    role: "President",
    image: Member_img,
    since: "2023",
    achievements: ["Won National Robotics Cup", "Led 10+ workshops"],
    bio: "Passionate about AI, robotics, and building strong tech communities.",
    social: {
      linkedin: "#",
      github: "#",
      email: "mailto:ahmed@example.com",
    },
  },
  {
    id: "2",
    name: "Sara Ben Ali",
    role: "Vice President",
    image: Member_img,
    since: "2024",
    achievements: ["AI Project Lead", "Hackathon Winner"],
    bio: "Focused on machine learning and empowering students through tech.",
    social: {
      linkedin: "#",
      github: "#",
    },
  },
  {
    id: "3",
    name: "Youssef Trabelsi",
    role: "Technical Lead",
    image: Member_img,
    since: "2022",
    achievements: ["Built Autonomous Robot", "Mentored 30+ members"],
    bio: "Hardware lover and embedded systems enthusiast.",
    social: {
      github: "#",
      email: "mailto:youssef@example.com",
    },
  },
];

function SocialIcons({ social }: { social?: Member["social"] }) {
  if (!social) return null;

  return (
    <div className="flex items-center gap-3 pt-3">
      {social.linkedin && (
        <a
          href={social.linkedin}
          className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 transition"
        >
          <Linkedin className="w-4 h-4 text-cyan-400" />
        </a>
      )}
      {social.github && (
        <a
          href={social.github}
          className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 transition"
        >
          <Github className="w-4 h-4 text-cyan-400" />
        </a>
      )}
      {social.email && (
        <a
          href={social.email}
          className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 transition"
        >
          <Mail className="w-4 h-4 text-cyan-400" />
        </a>
      )}
    </div>
  );
}

function MemberCard({ member }: { member: Member }) {
  return (
    <div className="group relative bg-slate-800/40 backdrop-blur-sm rounded-2xl border border-slate-700/50 overflow-hidden hover:border-cyan-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-cyan-500/10">
      {/* Image */}
      <div className="relative h-56 overflow-hidden">
        <img
          src={member.image}
          alt={member.name}
          className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />
      </div>

      {/* Content */}
      <div className="p-6 space-y-4">
        <div>
          <h3 className="text-xl font-bold text-white">{member.name}</h3>
          <p className="text-cyan-400 font-medium">{member.role}</p>
        </div>

        {member.bio && (
          <p className="text-slate-300 text-sm leading-relaxed">{member.bio}</p>
        )}

        {/* Since */}
        <div className="flex items-center gap-2 text-sm text-slate-400">
          <Calendar className="w-4 h-4" />
          Member since {member.since}
        </div>

        {/* Achievements */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm font-semibold text-white">
            <Trophy className="w-4 h-4 text-yellow-400" />
            Achievements
          </div>
          <ul className="space-y-1 text-sm text-slate-300">
            {member.achievements.map((a, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="text-cyan-400">•</span>
                {a}
              </li>
            ))}
          </ul>
        </div>

        <SocialIcons social={member.social} />
      </div>
    </div>
  );
}

export default function TeamPage() {
  return (
    <>
        <Header />
        <section className="relative min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 py-24 overflow-hidden">
          {/* Background grid */}
          <div className="absolute inset-0 opacity-20 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem]" />

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Header */}
            <div className="text-center max-w-3xl mx-auto mb-16 space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20">
                <Users className="w-4 h-4 text-cyan-400" />
                <span className="text-sm font-medium text-cyan-300">Our Team</span>
              </div>

              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white">
                Meet the <span className="text-cyan-400">RoboClub</span> Leaders
              </h2>

              <p className="text-lg text-slate-300">
                Passionate students driving innovation, robotics, and technology
                forward through collaboration and creativity.
              </p>
            </div>

            {/* Grid */}
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {members.map((m) => (
                <MemberCard key={m.id} member={m} />
              ))}
            </div>
          </div>
        </section>
        <Footer />
    </>
  );
}
