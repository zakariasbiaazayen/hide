import { Routes, Route, Navigate } from "react-router-dom";
import Aside from "../components/admin/aside.tsx"; // Your sidebar component
import DashboardMain from "../components/admin/Dashboard.tsx";
import EventsAdmin from "../components/admin/Event.tsx";
import MembersAdmin from "../components/admin/Members.tsx";
import UsersAdmin from "../components/admin/users.tsx";
import RoboticsRegistrationsDashboard from "../components/admin/Registeration.tsx";
import SettingsPage from "../components/admin/Settings.tsx";
export default function AdminPage() {
  return (
    <div className="flex min-h-screen bg-slate-900 text-white">
      
      {/* Sidebar */}
      <Aside />

      {/* Main Content */}
      <main className="flex-1 ml-0 lg:ml-72  lg:p-8 overflow-auto">
        <Routes>
          {/* Default route redirects to dashboard */}
          <Route path="/" element={<Navigate to="dashboard" replace />} />

          <Route path="dashboard" element={<DashboardMain />} />
          <Route path="events" element={<EventsAdmin />} />
          <Route path="members" element={<MembersAdmin />} />
          <Route path="users" element={<UsersAdmin />} />
          <Route path="registrations" element={<RoboticsRegistrationsDashboard />} />
          <Route path="settings" element={<SettingsPage />} />
          <Route path="*" element={<p className="text-red-500">Page Not Found</p>} />
        </Routes>
      </main>
    </div>
  );
}
