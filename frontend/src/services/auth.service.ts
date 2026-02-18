import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/api",
  headers: { "Content-Type": "application/json" },
});

export const loginRequest = async (email: string, password: string) => {
  const { data } = await api.post("/auth/login", { email, password });
  return data;
};

export const registerRequest = async (data: any) => {
  const { data: res } = await api.post("/auth/register", data);
  return res;
};
