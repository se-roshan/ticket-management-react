import {
  fetchUserDetails,
  uploadProfilePicture,
  removeProfilePicture,
  changePassword,
  updateProfileDetails as updateProfileAPI
} from "../../services/apiService";
import { setUser, setLoading, setError, updateProfileImage, removeProfileImage } from "./userSlice";

// Fetch user details from the API and update the Redux store.
export const getUserDetails = () => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const userData = await fetchUserDetails();// Fetch user data from API
    dispatch(setUser(userData.data));// Store user data in Redux
  } catch (error) {
    dispatch(setError(error.message));// Handle error by setting error state
  } finally {
    dispatch(setLoading(false));// Reset loading state
  }
};

// Upload a new profile picture and update Redux store with the new image.
export const uploadProfile = (file) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const response = await uploadProfilePicture(file);// Upload the image
    dispatch(updateProfileImage(response.filePath));// Update image path in Redux
  } catch (error) {
    dispatch(setError(error.message));
  } finally {
    dispatch(setLoading(false));
  }
};

// Update user profile details.
export const updateProfileDetails = (ParamsData) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const response = await updateProfileAPI(ParamsData);// API call to update profile
    dispatch(setUser(response.data)); // Update Redux store with new user data
  } catch (error) {
    dispatch(setError(error.message));
  } finally {
    dispatch(setLoading(false));
  }
};
//  Remove the user's profile picture.
export const removeProfile = () => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    await removeProfilePicture();// API call to remove profile picture
    dispatch(removeProfileImage()); // Update Redux store by removing image
  } catch (error) {
    dispatch(setError(error.message));
  } finally {
    dispatch(setLoading(false));
  }
};

// Change the user's password.
export const updatePassword = (newPassword) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    await changePassword(newPassword); // API call to change password
    alert("Password changed successfully!");
  } catch (error) {
    dispatch(setError(error.message));
  } finally {
    dispatch(setLoading(false));
  }
};
