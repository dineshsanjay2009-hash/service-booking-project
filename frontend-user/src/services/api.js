import axios from "axios";

const api = axios.create({
  baseURL: "https://servicehub-backend-myaj.onrender.com/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// Token Auto Attach
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default api;