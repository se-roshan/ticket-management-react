
// //-- apiService.js

// import axios from "axios";
// import config from "../config";
// import { getAuthToken, setAuthToken, logoutUser } from "./authService";

// // Creating an Axios instance with default settings
// const api = axios.create({
//   baseURL: config.baseURL,
//   headers: { "Content-Type": "application/json" }
// });

// // Centralized Error Handler for 401 Unauthorized
// const handleUnauthorizedError = (error) => {
//   if (error.response?.status === 401) {
//     console.error("Unauthorized! Redirecting to login...");
//     logoutUser(); // Clear token from storage
//     window.location.href = "/login"; // Redirect to login
//   }
//   throw error; // Rethrow for additional handling if needed
// };

// // Fetch user profile (For Header & Profile Page)
// export const fetchUserDetails = async () => {
//   const token = getAuthToken();
//   if (!token) return null;

//   try {
//     const response = await api.get("/User/GetUserDetail", {
//       headers: { Authorization: `Bearer ${token}` },
//     });
//     return response.data;
//   } catch (error) {
//     console.error("Error fetching user details", error);
//     handleUnauthorizedError(error);
//     return null;
//   }
// };

// // Fetch all users (For User List)
// export const getAllUsers = async () => {
//   try {
//     const response = await api.get("/User/GetAllUsers", {
//       headers: { Authorization: `Bearer ${getAuthToken()}` },
//     });
//     return response.data;
//   } catch (error) {
//     console.error("Error fetching users", error);
//     handleUnauthorizedError(error);
//     return { data: [] };
//   }
// };

// // Register User API
// export const registerUser = async (userData) => {
//   try {
//     const response = await api.post("/Login/Register", userData);
//     return response;
//   } catch (error) {
//     console.error("Registration error", error);
//     throw error;
//   }
// };

// // Login User API
// export const loginUser = async (credentials) => {
//   try {
//     const response = await api.post("/Login/Login", credentials);
//     if (response.data.statusCode === 200) {
//       setAuthToken(response.data.data.token);
//     }
//     return response;
//   } catch (error) {
//     console.error("Login error", error);
//     throw error;
//   }
// };

// // 🔹 Upload Profile Picture
// export const uploadProfilePicture = async (file) => {
//   try {
//     const formData = new FormData();
//     formData.append("file", file); // ✅ API likely expects 'file' as the key

//     const response = await api.post( 
//       "/FileUpload/UploadProfilePicture?IsProfile=true",
//       formData,
//       {
//         headers: {
//           "Content-Type": "multipart/form-data",
//           Authorization: `Bearer ${getAuthToken()}`
//         },
//       }
//     );

//     return response.data; // ✅ Return uploaded image URL
//   } catch (error) {
//     console.error("Upload error:", error);
//     handleUnauthorizedError(error);
//     throw error;
//   }
// };

// // 🔹 Remove Profile Picture (Backend should support this)
// export const removeProfilePicture = async () => {
//   const token = getAuthToken();
//   if (!token) return null;

//   try {
//     const response = await api.delete("/FileUpload/RemoveProfilePic", {
//       headers: { Authorization: `Bearer ${token}` },
//     });
//     return response.data;
//   } catch (error) {
//     console.error("Remove error:", error);
//     handleUnauthorizedError(error);
//     throw error;
//   }
// };

// // 🔹 Change Password
// export const changePassword = async (newPassword) => {
//   const token = getAuthToken();
//   if (!token) return null;

//   try {
//     const response = await api.post(
//       "/Login/ChnagePassword",
//       { newPassword },
//       { headers: { Authorization: `Bearer ${token}` } }
//     );
//     return response.data;
//   } catch (error) {
//     console.error("Change Password error:", error);
//     handleUnauthorizedError(error);
//     throw error;
//   }
// };

import axios from "axios";
import config from "../config";
import { getAuthToken, setAuthToken, logoutUser } from "./authService";

// 🔹 Create an Axios instance
const api = axios.create({
  baseURL: config.baseURL,
  headers: { "Content-Type": "application/json" }
});

// 🔹 Centralized Error Handler for 401 Unauthorized
const handleUnauthorizedError = (error) => {
  if (error.response?.status === 401) {
    console.error("Unauthorized! Redirecting to login...");
    logoutUser(); // Clear token from storage
    window.location.href = "/login"; // Redirect to login
  }
  throw error;
};

// 🔹 Generate Auth Headers
const axiosApiConfig = () => ({
  headers: {
    Authorization: `Bearer ${getAuthToken()}`
  }
});

// 🔹 Utility: Form the URL with Query Parameters
const getUrl = (baseUrl, queryParameters = []) => {
  return queryParameters.length > 0 ? `${baseUrl}?${queryParameters.join("&")}` : baseUrl;
};

// 🔹 Fetch user profile (For Header & Profile Page)
export const fetchUserDetails = async () => {
  try {
    const url = getUrl("/User/GetUserDetail"); // ✅ Now using getUrl
    const response = await api.get(url, axiosApiConfig());
    return response.data;
  } catch (error) {
    console.error("Error fetching user details", error);
    handleUnauthorizedError(error);
    return null;
  }
};

// 🔹 Fetch all users (For User List)
export const getAllUsers = async () => {
  try {
    const url = getUrl("/User/GetAllUsers"); // ✅ Now using getUrl
    const response = await api.get(url, axiosApiConfig());
    return response.data;
  } catch (error) {
    console.error("Error fetching users", error);
    handleUnauthorizedError(error);
    return { data: [] };
  }
};

// 🔹 Register User API
export const registerUser = async (userData) => {
  try {
    const url = getUrl("/Login/Register"); // ✅ Now using getUrl
    const response = await api.post(url, userData);
    return response;
  } catch (error) {
    console.error("Registration error", error);
    throw error;
  }
};

// 🔹 Login User API
export const loginUser = async (credentials) => {
  try {
    const url = getUrl("/Login/Login"); // ✅ Now using getUrl
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

// 🔹 Upload Profile Picture
export const uploadProfilePicture = async (file) => {
  try {
    const queryParameters = ["IsProfile=true"];
    const url = getUrl("/FileUpload/UploadProfilePicture", queryParameters); // ✅ Now using getUrl

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
    handleUnauthorizedError(error);
    throw error;
  }
};

// 🔹 Remove Profile Picture
export const removeProfilePicture = async () => {
  try {
    const url = getUrl("/FileUpload/RemoveProfilePic"); // ✅ Now using getUrl
    const response = await api.delete(url, axiosApiConfig());
    return response.data;
  } catch (error) {
    console.error("Remove error:", error);
    handleUnauthorizedError(error);
    throw error;
  }
};

// 🔹 Change Password
export const changePassword = async (newPassword) => {
  try {
    const url = getUrl("/Login/ChnagePassword"); // ✅ Now using getUrl
    const response = await api.post(url, { newPassword }, axiosApiConfig());
    return response.data;
  } catch (error) {
    console.error("Change Password error:", error);
    handleUnauthorizedError(error);
    throw error;
  }
};
