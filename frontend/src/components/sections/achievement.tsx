import { Trophy, Medal, Star, Users } from "lucide-react";
import Achievement_img from '../../assets/Hero1.jpg'
type Achievement = {
  title: string;
  description: string;
  image: string;
  icon: React.ReactNode;
  gradient: string;
};

const achievements: Achievement[] = [
  {
    title: "1st Place – National Robotics Cup",
    description:
      "Our autonomous robot won first place among 50+ teams with advanced AI navigation and precision control.",
    image: Achievement_img,
    icon: <Trophy className="w-5 h-5" />,
    gradient: "from-yellow-500 to-orange-500",
  },
  {
    title: "Best Innovation Award 2024",
    description:
      "Recognized for creating an AI-powered gesture recognition system for human-robot interaction.",
    image: Achievement_img,
    icon: <Star className="w-5 h-5" />,
    gradient: "from-purple-500 to-pink-500",
  },
  {
    title: "International Robotics Finalists",
    description:
      "Reached the finals competing against top engineering schools worldwide.",
    image: Achievement_img,
    icon: <Medal className="w-5 h-5" />,
    gradient: "from-cyan-500 to-blue-500",
  },
  {
    title: "100+ Active Members",
    description:
      "A growing community collaborating on real-world robotics and AI projects.",
    image: Achievement_img,
    icon: <Users className="w-5 h-5" />,
    gradient: "from-emerald-500 to-teal-500",
  },
];

export default function AchievementsSection() {
  return (
    <section className="relative py-24 overflow-hidden">
      

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="text-4xl sm:text-5xl font-bold text-white">
            Our{" "}
            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Achievements
            </span>
          </h2>
          <p className="text-slate-300 text-lg">
            Milestones that reflect our passion, innovation, and dedication to robotics excellence.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {achievements.map((item, index) => (
            <article
              key={index}
              className="group relative rounded-2xl overflow-hidden border border-slate-700/50 bg-slate-800/40 backdrop-blur-sm hover:border-cyan-500/40 transition-all duration-500 hover:scale-[1.03] hover:shadow-xl hover:shadow-cyan-500/10"
            >
              {/* Image */}
              <div className="relative h-44 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  loading="lazy"
                />

                {/* Gradient overlay */}
                <div className={`absolute inset-0 bg-gradient-to-t ${item.gradient} opacity-40`} />
              </div>

              {/* Content */}
              <div className="p-6 space-y-3 relative">
                {/* Icon */}
                <div
                  className={`w-10 h-10 flex items-center justify-center rounded-lg bg-gradient-to-br ${item.gradient} text-white shadow-lg`}
                >
                  {item.icon}
                </div>

                {/* Title */}
                <h3 className="text-lg font-semibold text-white group-hover:text-cyan-400 transition-colors">
                  {item.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-slate-300 leading-relaxed">
                  {item.description}
                </p>
              </div>

              {/* Bottom accent line */}
              <div
                className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${item.gradient} scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500`}
              />
            </article>
          ))}
        </div>
      </div>

      {/* Bottom fade */}
    </section>
  );
}
