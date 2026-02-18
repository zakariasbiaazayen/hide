import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home.tsx";
import Login from "../pages/Login.tsx";
import Register from "../pages/Register.tsx";
import Achivevement from "../pages/Achievement.tsx";
import Events from "../pages/Events.tsx";
import Team from "../pages/Team.tsx";
import Contact from "../pages/Contact.tsx";
import Notfound from "../pages/Notfound.tsx";
import Event from "../pages/Event.tsx";
import PreInscriptionForm from "../pages/inscription.tsx";
import Account from "../pages/Account.tsx";
import Admin from "../pages/Admin.tsx";
import { GuestRoute } from "./GuestRoute.tsx";
import { ProtectedRoute } from "./ProtectedRoute.tsx";

export default function AppRoutes() {
  return (
    <Routes>
      {/* Public pages */}
      <Route path="/" element={<Home />} />
      <Route path="/achievement" element={<Achivevement />} />
      <Route path="/events" element={<Events />} />
      <Route path="/team" element={<Team />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/event" element={<Event />} />
      <Route path="/inscription" element={<PreInscriptionForm />} />

      {/* Guest-only pages */}
      <Route
        path="/login"
        element={
          <GuestRoute>
            <Login />
          </GuestRoute>
        }
      />
      <Route
        path="/register"
        element={
          <GuestRoute>
            <Register />
          </GuestRoute>
        }
      />

      {/* Protected pages */}
      <Route
        path="/account/*"
        element={
          <ProtectedRoute>
            <Account />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/*"
        element={
          <ProtectedRoute role="admin">
            <Admin />
          </ProtectedRoute>
        }
      />

      {/* 404 */}
      <Route path="*" element={<Notfound />} />
    </Routes>
  );
}
