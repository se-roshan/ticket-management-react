import axios from "axios";
import config from "../config";

const api = axios.create({
  baseURL: config.baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Function to attach token dynamically
api.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) req.headers.Authorization = `Bearer ${token}`;
  return req;
});

// Register User
export const registerUser = async (userData) => {
  return api.post("/Login/Register", userData);
};

// Login User
export const loginUser = async (credentials) => {
  return api.post("/Login/Login", credentials);
};

// Get All Users
export const getAllUsers = async () => {
  return api.get("/User/GetAllUsers");
};
