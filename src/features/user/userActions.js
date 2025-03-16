import { fetchUserDetails, uploadProfilePicture, removeProfilePicture, changePassword } from "../../services/apiService";
import { setUser, setLoading, setError, updateProfileImage, removeProfileImage } from "./userSlice";

// Fetch user details from API
export const getUserDetails = () => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const userData = await fetchUserDetails();
    dispatch(setUser(userData.data));
  } catch (error) {
    dispatch(setError(error.message));
  } finally {
    dispatch(setLoading(false));
  }
};

// Upload profile picture
export const uploadProfile = (file) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const response = await uploadProfilePicture(file);
    dispatch(updateProfileImage(response.filePath));
  } catch (error) {
    dispatch(setError(error.message));
  } finally {
    dispatch(setLoading(false));
  }
};

// Remove profile picture
export const removeProfile = () => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    await removeProfilePicture();
    dispatch(removeProfileImage());
  } catch (error) {
    dispatch(setError(error.message));
  } finally {
    dispatch(setLoading(false));
  }
};

// Change password
export const updatePassword = (newPassword) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    await changePassword(newPassword);
    alert("Password changed successfully!");
  } catch (error) {
    dispatch(setError(error.message));
  } finally {
    dispatch(setLoading(false));
  }
};
