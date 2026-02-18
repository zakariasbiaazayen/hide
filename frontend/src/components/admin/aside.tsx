import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Calendar,
  Users,
  UserStar ,
  ClipboardList,
  Settings,
  LogOut,
  Menu
} from "lucide-react";
import { useState } from "react";
import Logo from "../ui/Logo";

const navItems = [
  { name: "Dashboard", icon: LayoutDashboard, href: "/admin/dashboard" },
  { name: "Events", icon: Calendar, href: "/admin/events" },
  { name: "Members", icon: UserStar, href: "/admin/members" },
  { name: "Users", icon: Users, href: "/admin/users" },
  { name: "Registrations", icon: ClipboardList, href: "/admin/registrations" },
  { name: "Settings", icon: Settings, href: "/admin/settings" }
];

export default function AdminSidebar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        onClick={() => setOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-slate-900 border border-slate-800 text-white shadow-md hover:bg-slate-800 transition-colors"
        aria-label="Open sidebar"
      >
        <Menu className="w-5 h-5" />
      </button>

      {/* Overlay for Mobile */}
      {open && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden transition-opacity"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
    className={`fixed top-0 left-0 z-50 h-screen w-72 bg-slate-900 border-r border-slate-800 flex flex-col justify-between transition-transform duration-300
    ${open ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}
  >
        {/* Top Section: Logo & Navigation */}
        <div>
          {/* Logo */}
          <div className="flex items-center gap-3 px-6 py-6 border-b border-slate-800">
            <div className="h-10 w-10 rounded-full overflow-hidden">
              <Logo className="scale-90" />
            </div>
            <span className="text-xl font-bold text-white select-none">
              RoboClub Admin
            </span>
          </div>

          {/* Navigation Links */}
          <nav className="flex flex-col gap-2 px-4 py-6">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.name}
                  to={item.href}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200
                    ${
                      isActive
                        ? "bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-lg shadow-cyan-500/30"
                        : "text-slate-400 hover:text-white hover:bg-slate-800/80"
                    }`
                  }
                >
                  <Icon className="w-5 h-5" />
                  {item.name}
                </NavLink>
              );
            })}
          </nav>
        </div>

        {/* Bottom Section: Logout */}
        <div className="px-6 py-6 border-t border-slate-800">
          <button className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-slate-800 text-slate-300 hover:bg-red-600 hover:text-white shadow-sm transition-all duration-200">
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>
      </aside>
    </>
  );
}
