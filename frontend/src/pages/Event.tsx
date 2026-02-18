import { useNavigate } from "react-router-dom";
import {
  Calendar,
  MapPin,
  Users,
  Clock,
  Tag,
  ChevronRight,
  FileText,
  Mail,
  AlertCircle,
  Package,
  Award,
  Target,
  Lightbulb,
  ExternalLink,
  Sparkles
} from 'lucide-react';
import Event_img from '../assets/event.jfif'
import Them_img from '../assets/them.jfif'
import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'

interface Theme {
  id: number;
  title: string;
  description: string;
  date: string;
  time: string;
  ageRange: string;
  price: number;
  image: string;
  cahierDeChargeUrl: string;
}

interface ThemeCardProps {
  theme: Theme;
}

const ThemeCard: React.FC<ThemeCardProps> = ({ theme }) => {
  return (
    <article className="group relative bg-slate-800/40 backdrop-blur-sm rounded-2xl border border-slate-700/50 overflow-hidden hover:border-cyan-500/50 transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl hover:shadow-cyan-500/20">
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

      <div className="relative h-52 bg-gradient-to-br from-slate-700 to-slate-800 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-purple-500/20"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <img src={Them_img} className="w-full h-full text-slate-600 group-hover:text-cyan-400 group-hover:scale-110 transition-all duration-500" alt="them_img" />
        </div>
      </div>

      <div className="relative z-10 p-6 space-y-5">
        <h3 className="text-2xl font-bold text-white group-hover:text-cyan-400 transition-colors duration-300">
          {theme.title}
        </h3>

        <p className="text-slate-300 leading-relaxed line-clamp-3">
          {theme.description}
        </p>

        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm text-slate-400">
              <Calendar className="w-4 h-4 text-cyan-400" />
              <span>{theme.date}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-slate-400">
              <Clock className="w-4 h-4 text-blue-400" />
              <span>{theme.time}</span>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm text-slate-400">
              <Users className="w-4 h-4 text-purple-400" />
              <span>{theme.ageRange}</span>
            </div>
            <div className="flex items-center gap-2 text-sm font-bold text-cyan-400">
              <Tag className="w-4 h-4" />
              <span>{theme.price === 0 ? 'Free' : `$${theme.price}`}</span>
            </div>
          </div>
        </div>

        <div className="space-y-3 pt-3">
          <button className="w-full group/btn relative px-6 py-3.5 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-xl font-semibold text-white shadow-lg shadow-cyan-500/30 hover:shadow-cyan-500/50 transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2">
            <span className="relative z-10">Pre-Register Now</span>
            <ChevronRight className="relative z-10 w-5 h-5 group-hover/btn:translate-x-1 transition-transform duration-300" />
            <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
          </button>

          <a
            href={theme.cahierDeChargeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full px-6 py-3.5 bg-slate-800/50 backdrop-blur-sm border-2 border-slate-700 rounded-xl font-semibold text-white hover:border-cyan-500 hover:bg-slate-800/80 transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2"
          >
            <FileText className="w-5 h-5" />
            <span>View Rules & Specifications</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500 to-blue-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
    </article>
  );
};

export default function EventDetailsPage() {
  const themes: Theme[] = [
    {
      id: 1,
      title: "Beginner Track - Introduction to Robotics",
      description: "Perfect for newcomers! Learn the fundamentals of robotics, basic programming, and build your first autonomous robot. No prior experience required.",
      date: "March 15, 2026",
      time: "9:00 AM - 12:00 PM",
      ageRange: "14-16 years",
      price: 0,
      image: "/themes/beginner.jpg",
      cahierDeChargeUrl: "https://drive.google.com/file/beginner-rules"
    },
    {
      id: 2,
      title: "Intermediate Track - AI Integration",
      description: "Take your skills to the next level! Implement machine learning algorithms, computer vision, and autonomous decision-making in robotics systems.",
      date: "March 15, 2026",
      time: "1:00 PM - 5:00 PM",
      ageRange: "16-18 years",
      price: 25,
      image: "/themes/intermediate.jpg",
      cahierDeChargeUrl: "https://drive.google.com/file/intermediate-rules"
    },
    {
      id: 3,
      title: "Advanced Track - Competition Challenge",
      description: "Elite competition for experienced roboticists. Design and build advanced autonomous systems to compete in complex challenges. Prizes for top performers!",
      date: "March 16, 2026",
      time: "9:00 AM - 6:00 PM",
      ageRange: "17-22 years",
      price: 50,
      image: "/themes/advanced.jpg",
      cahierDeChargeUrl: "https://drive.google.com/file/advanced-rules"
    }
  ];
  const navigate = useNavigate();

  // scroll to themes section
  const scrollToThemes = () => {
    const themesSection = document.getElementById("themes-section");
    if (themesSection) {
      themesSection.scrollIntoView({ behavior: "smooth" });
    }
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      <Header />
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-20"></div>

      {/* Floating Gradient Orbs */}
      <div className="absolute top-20 left-10 w-96 h-96 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse delay-1000"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse delay-500"></div>

      <div className="relative z-10">

        {/* Hero Event Header */}
        <section className="relative h-[600px] overflow-hidden">

          {/* Main Background Image */}
          <img
            src={Event_img}
            alt="RoboClub Spring Innovation Challenge"
            className="absolute inset-0 w-full h-full object-cover"
          />
        
          {/* Dark + gradient overlays for readability */}
          <div className="absolute inset-0 bg-slate-900/70"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/80 to-transparent"></div>
        
          {/* Decorative blur lights */}
          <div className="absolute top-20 right-20 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 left-20 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl"></div>
        
          {/* Content */}
          <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
            <div className="w-full">
              
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 backdrop-blur-sm mb-6">
                <Sparkles className="w-4 h-4 text-cyan-400" />
                <span className="text-sm font-medium text-cyan-300">Featured Event</span>
              </div>

              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight mb-6">
                <span className="block bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                  RoboClub Spring
                </span>
                <span className="block text-white">Innovation Challenge 2026</span>
              </h1>

              <p className="text-xl sm:text-2xl text-slate-300 mb-8 max-w-3xl">
                Join the ultimate robotics competition where innovation meets engineering excellence. 
                Three tracks designed for every skill level.
              </p>

              {/* Quick Info Badges */}
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-3 px-5 py-3 rounded-xl bg-slate-800/50 backdrop-blur-sm border border-slate-700/50">
                  <Calendar className="w-5 h-5 text-cyan-400" />
                  <div>
                    <div className="text-xs text-slate-400">Date</div>
                    <div className="font-semibold text-white">March 15-16, 2026</div>
                  </div>
                </div>

                <div className="flex items-center gap-3 px-5 py-3 rounded-xl bg-slate-800/50 backdrop-blur-sm border border-slate-700/50">
                  <MapPin className="w-5 h-5 text-purple-400" />
                  <div>
                    <div className="text-xs text-slate-400">Location</div>
                    <div className="font-semibold text-white">Engineering Complex</div>
                  </div>
                </div>

                <div className="flex items-center gap-3 px-5 py-3 rounded-xl bg-slate-800/50 backdrop-blur-sm border border-slate-700/50">
                  <Users className="w-5 h-5 text-blue-400" />
                  <div>
                    <div className="text-xs text-slate-400">Age Range</div>
                    <div className="font-semibold text-white">14-22 years</div>
                  </div>
                </div>

                <div className="flex items-center gap-3 px-5 py-3 rounded-xl bg-slate-800/50 backdrop-blur-sm border border-slate-700/50">
                  <Tag className="w-5 h-5 text-orange-400" />
                  <div>
                    <div className="text-xs text-slate-400">Event Type</div>
                    <div className="font-semibold text-white">Competition</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
  

        {/* Full Event Description */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              
              {/* Left Column */}
              <div className="space-y-8">
                <div>
                  <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4 flex items-center gap-3">
                    <Lightbulb className="w-8 h-8 text-cyan-400" />
                    About This Event
                  </h2>
                  <p className="text-lg text-slate-300 leading-relaxed">
                    The RoboClub Spring Innovation Challenge is our flagship annual competition designed to push the boundaries 
                    of robotics innovation. Whether you're taking your first steps in robotics or you're a seasoned competitor, 
                    this event offers the perfect platform to showcase your skills, learn from experts, and connect with fellow 
                    robotics enthusiasts.
                  </p>
                </div>

                <div className="relative bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700/50">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-cyan-500/10 to-transparent rounded-full blur-2xl"></div>
                  
                  <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                    <Target className="w-6 h-6 text-cyan-400" />
                    Event Objectives
                  </h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3 text-slate-300">
                      <div className="w-2 h-2 rounded-full bg-cyan-400 mt-2 flex-shrink-0"></div>
                      <span>Design and build autonomous robots capable of navigating complex environments</span>
                    </li>
                    <li className="flex items-start gap-3 text-slate-300">
                      <div className="w-2 h-2 rounded-full bg-blue-400 mt-2 flex-shrink-0"></div>
                      <span>Implement AI and machine learning algorithms for intelligent decision-making</span>
                    </li>
                    <li className="flex items-start gap-3 text-slate-300">
                      <div className="w-2 h-2 rounded-full bg-purple-400 mt-2 flex-shrink-0"></div>
                      <span>Collaborate with teams to solve real-world robotics challenges</span>
                    </li>
                    <li className="flex items-start gap-3 text-slate-300">
                      <div className="w-2 h-2 rounded-full bg-cyan-400 mt-2 flex-shrink-0"></div>
                      <span>Present and defend your engineering solutions to expert judges</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-8">
                <div className="relative bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700/50">
                  <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-purple-500/10 to-transparent rounded-full blur-2xl"></div>
                  
                  <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                    <Award className="w-6 h-6 text-purple-400" />
                    Skills You'll Learn
                  </h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3 text-slate-300">
                      <div className="w-2 h-2 rounded-full bg-purple-400 mt-2 flex-shrink-0"></div>
                      <span>Advanced programming in Python, C++, and ROS2</span>
                    </li>
                    <li className="flex items-start gap-3 text-slate-300">
                      <div className="w-2 h-2 rounded-full bg-cyan-400 mt-2 flex-shrink-0"></div>
                      <span>Computer vision and image processing techniques</span>
                    </li>
                    <li className="flex items-start gap-3 text-slate-300">
                      <div className="w-2 h-2 rounded-full bg-blue-400 mt-2 flex-shrink-0"></div>
                      <span>Sensor integration and data fusion methodologies</span>
                    </li>
                    <li className="flex items-start gap-3 text-slate-300">
                      <div className="w-2 h-2 rounded-full bg-purple-400 mt-2 flex-shrink-0"></div>
                      <span>Path planning and autonomous navigation algorithms</span>
                    </li>
                    <li className="flex items-start gap-3 text-slate-300">
                      <div className="w-2 h-2 rounded-full bg-cyan-400 mt-2 flex-shrink-0"></div>
                      <span>Team collaboration and project management</span>
                    </li>
                  </ul>
                </div>

                <div className="relative bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700/50">
                  <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                    <Users className="w-6 h-6 text-blue-400" />
                    Who Should Join
                  </h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3 text-slate-300">
                      <div className="w-2 h-2 rounded-full bg-blue-400 mt-2 flex-shrink-0"></div>
                      <span>High school and university students passionate about robotics</span>
                    </li>
                    <li className="flex items-start gap-3 text-slate-300">
                      <div className="w-2 h-2 rounded-full bg-cyan-400 mt-2 flex-shrink-0"></div>
                      <span>Engineering enthusiasts looking to apply theoretical knowledge</span>
                    </li>
                    <li className="flex items-start gap-3 text-slate-300">
                      <div className="w-2 h-2 rounded-full bg-purple-400 mt-2 flex-shrink-0"></div>
                      <span>Teams wanting to compete at national and international levels</span>
                    </li>
                    <li className="flex items-start gap-3 text-slate-300">
                      <div className="w-2 h-2 rounded-full bg-blue-400 mt-2 flex-shrink-0"></div>
                      <span>Anyone eager to learn from industry experts and mentors</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Event Themes / Tracks */}
        <section id="themes-section" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-transparent via-slate-800/30 to-transparent">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16 space-y-4">
              <h2 className="text-4xl sm:text-5xl font-bold text-white">
                Choose Your <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">Track</span>
              </h2>
              <p className="text-lg text-slate-300 max-w-3xl mx-auto">
                Select the competition track that matches your skill level and ambitions. Each track offers unique challenges 
                and learning opportunities tailored to different experience levels.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {themes.map(theme => (
                <ThemeCard key={theme.id} theme={theme} />
              ))}
            </div>
          </div>
        </section>

        {/* Important Information */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <div className="relative bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm rounded-2xl p-8 sm:p-12 border border-slate-700/50 shadow-2xl overflow-hidden">
              
              <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-cyan-500/10 to-transparent rounded-full blur-3xl"></div>
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-purple-500/10 to-transparent rounded-full blur-3xl"></div>

              <div className="relative z-10">
                <h2 className="text-3xl sm:text-4xl font-bold text-white mb-8 flex items-center gap-3">
                  <AlertCircle className="w-8 h-8 text-cyan-400" />
                  Important Information
                </h2>

                <div className="space-y-8">
                  
                  {/* Required Materials */}
                  <div className="space-y-4">
                    <h3 className="text-xl font-bold text-white flex items-center gap-2">
                      <Package className="w-6 h-6 text-purple-400" />
                      Required Materials
                    </h3>
                    <div className="pl-8 space-y-2">
                      <p className="text-slate-300">• Laptop with development environment (Python 3.8+, ROS2, or Arduino IDE)</p>
                      <p className="text-slate-300">• Basic robotics kit (Arduino/Raspberry Pi recommended)</p>
                      <p className="text-slate-300">• Sensors and actuators as specified in track requirements</p>
                      <p className="text-slate-300">• USB cables, power supplies, and basic tools</p>
                      <p className="text-slate-300">• Notebook for documentation and planning</p>
                    </div>
                  </div>

                  {/* Rules Summary */}
                  <div className="space-y-4 pt-4 border-t border-slate-700/50">
                    <h3 className="text-xl font-bold text-white flex items-center gap-2">
                      <FileText className="w-6 h-6 text-blue-400" />
                      Rules Summary
                    </h3>
                    <div className="pl-8 space-y-2">
                      <p className="text-slate-300">• Teams of 2-4 members (individual participation allowed for beginner track)</p>
                      <p className="text-slate-300">• All code and designs must be original work created during the event</p>
                      <p className="text-slate-300">• Robots must comply with size and weight restrictions (detailed in cahier de charge)</p>
                      <p className="text-slate-300">• Safety regulations must be followed at all times</p>
                      <p className="text-slate-300">• Judges' decisions are final in all competition matters</p>
                    </div>
                  </div>

                  {/* Contact & Deadline */}
                  <div className="pt-4 border-t border-slate-700/50 grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="flex items-start gap-4 p-4 rounded-xl bg-slate-700/30 border border-slate-600/30">
                      <Mail className="w-6 h-6 text-cyan-400 flex-shrink-0 mt-1" />
                      <div>
                        <h4 className="font-semibold text-white mb-1">Questions?</h4>
                        <a href="mailto:events@roboclub.edu" className="text-cyan-400 hover:text-cyan-300 transition-colors">
                          events@roboclub.edu
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start gap-4 p-4 rounded-xl bg-slate-700/30 border border-slate-600/30">
                      <Calendar className="w-6 h-6 text-purple-400 flex-shrink-0 mt-1" />
                      <div>
                        <h4 className="font-semibold text-white mb-1">Registration Deadline</h4>
                        <p className="text-slate-300">March 10, 2026 at 11:59 PM</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Call To Action */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="relative bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm rounded-3xl p-12 border border-slate-700/50 shadow-2xl overflow-hidden text-center">

          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-cyan-500/10 to-transparent rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-purple-500/10 to-transparent rounded-full blur-3xl"></div>

          <div className="relative z-10 space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 backdrop-blur-sm mb-4">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              <span className="text-sm font-medium text-cyan-300">Limited Spots Available</span>
            </div>

            <h3 className="text-3xl sm:text-4xl font-bold text-white">
              Ready to Join This Event?
            </h3>

            <p className="text-lg text-slate-300 max-w-2xl mx-auto">
              Don't miss this opportunity to showcase your robotics skills, learn from experts, and compete for amazing prizes. 
              Register now and secure your spot in the competition!
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
              {/* Register Now */}
              <button
                onClick={scrollToThemes}
                className="group relative px-10 py-5 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-xl font-bold text-lg text-white shadow-lg shadow-cyan-500/30 hover:shadow-cyan-500/50 transition-all duration-300 hover:scale-105 flex items-center justify-center gap-3"
              >
                <span className="relative z-10">Register Now</span>
                <ChevronRight className="relative z-10 w-6 h-6 group-hover:translate-x-1 transition-transform duration-300" />
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>

              {/* Back to Events */}
              <button
                onClick={() => navigate("/events")}
                className="px-10 py-5 bg-slate-800/50 backdrop-blur-sm border-2 border-slate-700 rounded-xl font-bold text-lg text-white hover:border-cyan-500 hover:bg-slate-800/80 transition-all duration-300 hover:scale-105"
              >
                Back to Events
              </button>
            </div>

            <p className="text-sm text-slate-500 pt-4">
              By registering, you agree to our event terms and conditions
            </p>
          </div>
        </div>
      </div>
    </section>
      </div>
    <Footer />
    </div>
  );
}