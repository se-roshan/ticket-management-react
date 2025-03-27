//-- apiService.js
import axios from "axios";
import config from "../config";
import { getAuthToken, setAuthToken, logoutUser } from "./authService";

// Create an Axios instance
const api = axios.create({
  baseURL: config.baseURL,
  headers: { "Content-Type": "application/json" }
});

// Add Axios Response Interceptor to handle authentication globally
api.interceptors.response.use(
  (response) => response, // Return response if successful
  (error) => {
    console.error("API Error:", error);
    // Check for Unauthorized (401) or Connection Refused errors
    if (error.response?.status === 401 || error.code === "ERR_NETWORK" || error.message.includes("ERR_CONNECTION_REFUSED")) {
      alert("Session expired or connection lost. Redirecting to login...");
      logoutUser(); // Clear stored token
      window.location.href = "/login"; // Redirect to login page
    }

    return Promise.reject(error); // Forward error to catch blocks if needed
  }
);

// // Centralized Error Handler for 401 Unauthorized
// const handleUnauthorizedError = (error) => {
//   if (error.response?.status === 401) {
//     console.error("Unauthorized! Redirecting to login...");
//     logoutUser(); // Clear token from storage
//     window.location.href = "/login"; // Redirect to login
//   }
//   throw error;
// };

// Generate Auth Headers
const axiosApiConfig = () => ({
  headers: {
    Authorization: `Bearer ${getAuthToken()}`
  }
});

// Utility: Form the URL with Query Parameters
const getUrl = (baseUrl, queryParameters = []) => {
  return queryParameters.length > 0 ? `${baseUrl}?${queryParameters.join("&")}` : baseUrl;
};

// Register User API
export const registerUser = async (userData) => {
  try {
    const url = getUrl("/Login/Register");
    const response = await api.post(url, userData);
    return response;
  } catch (error) {
    console.error("Registration error", error);
    throw error;
  }
};

// Login User API
export const loginUser = async (credentials) => {
  try {
    const url = getUrl("/Login/Login");
    const response = await api.post(url, credentials);
    if (response.data.statusCode === 200) {
      setAuthToken(response.data.data.token);
    }
    return response;
  } catch (error) {
    console.error("Login error", error);
    throw error;
  }
};


// Fetch user profile (For Header & Profile Page)
export const fetchUserDetails = async () => {
  try {
    const url = getUrl("/User/GetUserDetail");
    const response = await api.get(url, axiosApiConfig());
    return response.data;
  } catch (error) {
    console.error("Error fetching user details", error);
    //handleUnauthorizedError(error);
    return null;
  }
};

// Fetch all users (For User List)
export const getAllUsers = async () => {
  try {
    const url = getUrl("/User/GetAllUsers");
    const response = await api.get(url, axiosApiConfig());
    return response.data;
  } catch (error) {
    console.error("Error fetching users", error);
    //handleUnauthorizedError(error);
    return { data: [] };
  }
};

// Update Profile Details
export const updateProfileDetails = async (profileData) => {
  try {
    const url = getUrl("/User/AddUpdateUser");
    const response = await api.post(url, profileData, axiosApiConfig());
    return response.data;
  } catch (error) {
    console.error("Update error", error);
    throw error;
  }
};

// Upload Profile Picture
export const uploadProfilePicture = async (file) => {
  try {
    const queryParameters = ["IsProfile=true"];
    const url = getUrl("/FileUpload/UploadProfilePicture", queryParameters);

    const formData = new FormData();
    formData.append("file", file);

    const response = await api.post(url, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${getAuthToken()}`
      },
    });

    return response.data;
  } catch (error) {
    console.error("Upload error:", error);
    //handleUnauthorizedError(error);
    throw error;
  }
};

// Remove Profile Picture
export const removeProfilePicture = async (userId) => {
  try {
    const queryParameters = [`userId=${userId}`]; 
    const url = getUrl("/FileUpload/RemoveProfileImage", queryParameters);
    const response = await api.get(url, axiosApiConfig());
    return response.data;
  } catch (error) {
    console.error("Remove error:", error);
    throw error;
  }
};


// Change Password
export const changePassword = async (newPassword) => {
  try {
    const url = getUrl("/Login/ChnagePassword");
    const response = await api.post(url, { newPassword }, axiosApiConfig());
    return response.data;
  } catch (error) {
    console.error("Change Password error:", error);
    //handleUnauthorizedError(error);
    throw error;
  }
};

export const changePasswordAPI = async (newPassword) => {
  try {
    const url = getUrl("/Login/ChangePassword");
    const response = await api.post(url, { newPassword }, axiosApiConfig());
    return response.data;
  } catch (error) {
    console.error("Change Password error:", error);
    throw error;
  }
};

