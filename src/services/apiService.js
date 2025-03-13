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
    const response = await api.get("/User/GetUserDetail", {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data; 
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
    return response;
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
    return response;
  } catch (error) {
    console.error("Login error", error);
    throw error;
  }
};



// 🔹 Upload Profile Picture
export const uploadProfilePicture = async (file) => {
  const token = getAuthToken();
  if (!token) return null;

  const formData = new FormData();
  formData.append("file", file);

  try {
    const response = await api.post(
      "/FileUpload/UploadProfilePicure?IsProfile=true",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Upload error:", error);
    throw error;
  }
};

// 🔹 Remove Profile Picture (Backend should support this)
export const removeProfilePicture = async () => {
  const token = getAuthToken();
  if (!token) return null;

  try {
    const response = await api.delete("/FileUpload/RemoveProfilePic", {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error("Remove error:", error);
    throw error;
  }
};

// 🔹 Change Password
export const changePassword = async (newPassword) => {
  const token = getAuthToken();
  if (!token) return null;

  try {
    const response = await api.post(
      "/Login/ChnagePassword",
      { newPassword },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return response.data;
  } catch (error) {
    console.error("Change Password error:", error);
    throw error;
  }
};