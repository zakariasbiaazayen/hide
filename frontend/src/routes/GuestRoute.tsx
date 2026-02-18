import { Navigate } from "react-router-dom";
import { JSX } from "react/jsx-runtime";

interface GuestRouteProps {
  children: JSX.Element;
}

export const GuestRoute = ({ children }: GuestRouteProps) => {
  const user = localStorage.getItem("user");

  if (user) return <Navigate to="/" replace />; // redirect logged-in users
  return children;
};
