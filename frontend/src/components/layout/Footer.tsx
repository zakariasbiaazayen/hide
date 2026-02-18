import { Mail, MapPin, Phone, Facebook, Instagram, Linkedin, Github } from "lucide-react";
import Logo from "../ui/Logo";
import { NavLink } from "react-router-dom";

const footerLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Projects", href: "/projects" },
  { name: "Events", href: "/events" },
  { name: "Team", href: "/team" },
  { name: "Contact", href: "/contact" },
];

export default function Footer() {
  return (
    <footer className="relative bg-slate-950 border-t border-slate-700/50">
      {/* Top Gradient Glow */}
      <div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-cyan-500/40 to-transparent" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">

          {/* Brand */}
          <div className="space-y-5">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full shadow-lg">
                <Logo className="scale-80" />
              </div>
              <span className="text-white font-bold text-xl">RoboClub</span>
            </div>

            <p className="text-slate-400 leading-relaxed text-sm">
              A student-driven robotics community focused on innovation, 
              hands-on learning, and building the future through AI, 
              engineering, and teamwork.
            </p>

            {/* Socials */}
            <div className="flex gap-4">
              {[Facebook, Instagram, Linkedin, Github].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="p-2 rounded-lg bg-slate-800/60 border border-slate-700/50 hover:border-cyan-500/50 hover:text-cyan-400 transition-all duration-300"
                >
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-white font-semibold mb-5">Navigation</h3>
            <ul className="space-y-3">
              {footerLinks.map((link) => (
                <li key={link.name}>
                  <NavLink
                    to={link.href}
                    className="text-slate-400 hover:text-cyan-400 transition-colors duration-300 text-sm"
                  >
                    {link.name}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold mb-5">Contact</h3>
            <ul className="space-y-4 text-sm text-slate-400">
              <li className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-cyan-400" />
                Tunisia
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-cyan-400" />
                +216 XX XXX XXX
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-cyan-400" />
                roboclub@email.com
              </li>
            </ul>
          </div>

          {/* CTA / Join */}
          <div className="space-y-5">
            <h3 className="text-white font-semibold">Join RoboClub</h3>

            <p className="text-slate-400 text-sm leading-relaxed">
              Become part of a passionate robotics community and start 
              building real-world innovations today.
            </p>

            <NavLink
              to="/login"
              className="inline-block px-6 py-3 rounded-lg font-semibold text-white 
              bg-gradient-to-r from-blue-600 to-cyan-600 
              shadow-lg shadow-blue-500/30 
              hover:scale-105 hover:shadow-blue-500/50 
              transition-all duration-300"
            >
              Get Started
            </NavLink>
          </div>
        </div>

        {/* Divider */}
        <div className="mt-16 border-t border-slate-700/50 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">

          <p className="text-slate-500 text-sm text-center md:text-left">
            © {new Date().getFullYear()} RoboClub. All rights reserved.
          </p>

          <div className="flex gap-6 text-sm text-slate-500">
            <a href="#" className="hover:text-cyan-400 transition-colors">Privacy</a>
            <a href="#" className="hover:text-cyan-400 transition-colors">Terms</a>
            <a href="#" className="hover:text-cyan-400 transition-colors">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
