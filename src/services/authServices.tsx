const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:3002";

export interface LoginData {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  role: "admin" | "regular";
  email: string;
  password: string;
}

export async function loginUser(credentials: LoginData) {
  try {
    console.log("Making login request to:", `${API_BASE_URL}/login`);
    const res = await fetch(`${API_BASE_URL}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
    });

    console.log("Response status:", res.status);
    const data = await res.json();
    console.log("Response data:", data);

    return data;
  } catch (error) {
    console.error("Login request failed:", error);
    throw error;
  }
}

export async function registerUser(userData: RegisterData) {
  try {
    const res = await fetch(`${API_BASE_URL}/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    });
    return res.json();
  } catch (error) {
    console.error("Register request failed:", error);
    throw error;
  }
}

// Axios configuration for authenticated requests
import axios from "axios";

axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL;
axios.interceptors.request.use((config) => {
  const token = localStorage.getItem("authToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
