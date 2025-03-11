//-- authService.js

let authToken = sessionStorage.getItem("token") || null; 

export const setAuthToken = (token) => {
  authToken = token;
  sessionStorage.setItem("token", token);
};

export const getAuthToken = () => authToken;

export const isAuthenticated = () => !!authToken;

export const logoutUser = () => {
  authToken = null;
  sessionStorage.removeItem("token");
};
