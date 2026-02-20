import axios from "axios";

const API_URL = "http://localhost:3000/api/admin";

const api = axios.create({
  baseURL: API_URL,
});

// Attach JWT automatically
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("access_token");
  if (token) {
    config.headers!["Authorization"] = `Bearer ${token}`;
  }
  return config;
});

export const getAllUsers = async () => {
  const response = await api.get("/users");
  console.log("Fetched users:", response);
  return response.data;
}
export const updateUser = async (id: string, data: any) => {
  const response = await api.patch(`/users/${id}`, data);
  console.log("Updated user:", response);
  return response.data;
}
export const updateUserImg = async (file: File , id: string) => {
  const formData = new FormData();
  formData.append("file", file);

  const res = await api.patch(`/users/upload/${id}`, formData);
  return res.data.imageUrl;
};
