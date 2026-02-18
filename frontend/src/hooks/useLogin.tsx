import { useState } from "react";
import { loginRequest } from "../services/auth.service";
import { useNavigate } from "react-router-dom";
export const useLogin = () => {
  const navigate = useNavigate();

  // form values
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // UI states
  const [showPassword, setShowPassword] = useState(false);
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);

  // request states
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // submit login
  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setIsLoading(true);
  setError(null);

  try {
    const data = await loginRequest(email, password);

    // store token (temporary dev solution)
    localStorage.setItem("access_token", data.access_token);
    localStorage.setItem("user", JSON.stringify(data.user));
    console.log(data)
    console.log("Login success");

    // redirect based on backend role
    const role = data.user.role;

    if (role === "admin") {
      navigate("/admin/dashboard", { replace: true });
    } else {
      navigate("/", { replace: true });
    }

  } catch (err) {
    setError("Invalid email or password");
  } finally {
    setIsLoading(false);
  }
};


  // OAuth login
  const handleOAuthLogin = (provider: "google" | "github") => {
    console.log(`Login with ${provider}`);

  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    showPassword,
    setShowPassword,
    emailFocused,
    setEmailFocused,
    passwordFocused,
    setPasswordFocused,
    isLoading,
    error,
    handleSubmit,
    handleOAuthLogin,
  };
};
