import React, { useState , useEffect} from "react";
import { Menu, X, User } from "lucide-react";
import { NavLink } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Logo from "../ui/Logo";

// ================================
// Navigation configuration
// ================================
export const navItems = [
  { name: "Home", path: "/" },
  { name: "Achievement", path: "/achievement" },
  { name: "Events", path: "/events" },
  { name: "Team", path: "/team" },
  { name: "Contact", path: "/contact" },
];

// ================================
// Reusable desktop/mobile link
// ================================
function HeaderLink({ item, onClick }: { item: { name: string; path: string }; onClick?: () => void }) {
  return (
    <NavLink
      to={item.path}
      onClick={onClick}
      className={({ isActive }) =>
        `group relative font-medium transition-colors duration-300 ${
          isActive ? "text-cyan-400" : "text-white hover:text-cyan-400"
        }`
      }
    >
      {item.name}
      <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-cyan-400 transition-all duration-300 group-hover:w-full" />
    </NavLink>
  );
}

// ================================
// Mobile menu component
// ================================
function MobileMenu({ open, onClose, user }: { open: boolean; onClose: () => void; user: { name: string; email: string; role: string } | null }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.2 }}
          className="md:hidden bg-slate-900/95 backdrop-blur-sm border-t border-slate-700/50"
        >
          <nav className="flex flex-col gap-4 p-6">
            {navItems.map((item) => (
              <HeaderLink key={item.name} item={item} onClick={onClose} />
            ))}

            {user ? (
              <NavLink
                to="/account"
                onClick={onClose}
                className="mt-2 flex items-center justify-center gap-2 rounded-xl bg-slate-800 px-6 py-3 font-semibold text-white shadow-lg shadow-blue-500/30 transition-all duration-300 hover:scale-105 hover:shadow-blue-500/50"
              >
                <User className="h-4 w-4" />
                {user.name}
              </NavLink>
            ) : (
              <NavLink
                to="/login"
                onClick={onClose}
                className="mt-2 flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 px-6 py-3 font-semibold text-white shadow-lg shadow-blue-500/30 transition-all duration-300 hover:scale-105 hover:shadow-blue-500/50"
              >
                <User className="h-4 w-4" />
                Login
              </NavLink>
            )}

          </nav>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ================================
// Main Header
// ================================
export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState<{ name: string; email: string; role: string } | null>(null);

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  return (
    <header className="fixed left-0 right-0 top-0 z-50 border-b border-slate-700/50 bg-slate-900/60 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full shadow-lg">
              <Logo className="scale-90" />
            </div>
            <span className="text-xl font-bold text-white sm:text-2xl">RoboClub</span>
          </div>

          {/* Desktop navigation */}
          <nav className="hidden items-center gap-8 md:flex">
            {navItems.map((item) => (
              <HeaderLink key={item.name} item={item} />
            ))}

            {/* Auth area */}
            {user ? (
              <NavLink
                to="/account"
                className="border border-blue-600 ml-4 flex items-center gap-3 rounded-xl bg-slate-800 px-4 py-2 text-white hover:bg-slate-700 transition-colors"
              >
                <User className="h-4 w-4" />
                <span className="text-sm font-medium">{user.name}</span>
              </NavLink>
            ) : (
              <NavLink
                to="/login"
                className="ml-4 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 px-6 py-2 font-semibold text-white shadow-lg shadow-blue-500/30 transition-all duration-300 hover:scale-105 hover:shadow-blue-500/50"
              >
                Login
              </NavLink>
            )}

          </nav>

          {/* Mobile toggle */}
          <button
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((prev) => !prev)}
            className="rounded-lg p-2 transition-colors hover:bg-slate-800 md:hidden"
          >
            {menuOpen ? (
              <X className="h-6 w-6 text-white" />
            ) : (
              <Menu className="h-6 w-6 text-white" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} user={user} />
    </header>
  );
}