//-- apiService.jsx
import axios from "axios";
import config from "../config";
import { getAuthToken, setAuthToken } from "./authService";

const api = axios.create({
  baseURL: config.baseURL,
  headers: { "Content-Type": "application/json" }
});

// Fetch user profile (For Header)
export const fetchUserDetails = async () => {
  const token = getAuthToken();
  if (!token) return null;

  try {
    const response = await api.get("/User/GetUserDetails", {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data.data[0]; 
  } catch (error) {
    console.error("Error fetching user details", error);
    return null;
  }
};

// Fetch all users (For User List)
export const getAllUsers = async () => {
  try {
    const response = await api.get("/User/GetAllUsers", {
      headers: { Authorization: `Bearer ${getAuthToken()}` },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching users", error);
    return { data: [] };
  }
};

// Register User API
export const registerUser = async (userData) => {
  try {
    const response = await api.post("/Login/Register", userData);
    return response.data;
  } catch (error) {
    console.error("Registration error", error);
    throw error;
  }
};

// Login User API
export const loginUser = async (credentials) => {
  try {
    const response = await api.post("/Login/Login", credentials);
    if (response.data.statusCode === 200) {
      setAuthToken(response.data.data.token);
    }
    //return response.data;
    return response;
  } catch (error) {
    console.error("Login error", error);
    throw error;
  }
};