import { Navigate } from "react-router-dom";
import { JSX } from "react/jsx-runtime";

interface ProtectedRouteProps {
  children: JSX.Element;
  role?: "user" | "admin";
}

export const ProtectedRoute = ({ children, role }: ProtectedRouteProps) => {
  const stored = localStorage.getItem("user");
  if (!stored) return <Navigate to="/login" replace />; // not logged in

  const user = JSON.parse(stored);
  if (role && user.role !== role) return <Navigate to="/" replace />; // wrong role

  return children;
};
