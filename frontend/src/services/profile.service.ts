import axios from "axios";

const API_URL = "http://localhost:3000/api/profile";

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

// GET profile
export const getProfile = async () => {
  const response = await api.get("");
  return response.data;
};

// UPDATE profile
export const updateProfile = async (data: {
  name: string;
  dateOfBirth: string;
  phoneNumber: number;
  University: string;
  major: string;
  Experience: number;
  LinkedIn: string;
}) => {
  const response = await api.patch("/", data);
  return response.data;
};

// CHANGE password
export const changePassword = async (data: {
  oldPassword: string;
  newPassword: string;
}) => {
  const response = await api.patch("/password", data);
  return response.data;
};

// UPLOAD profile image
export const uploadImage = async (file: File) => {
  const formData = new FormData();
  formData.append("file", file);

  const res = await api.post("/image", formData);
  return res.data.imageUrl;
};
