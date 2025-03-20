import { createSlice } from "@reduxjs/toolkit";
/**
 * Initial state for the user slice.
 * - `user`: Stores user details (null initially).
 * - `loading`: Indicates whether a request is in progress.
 * - `error`: Stores error messages if an API call fails.
 */
const initialState = {
  user: null,
  loading: false,
  error: null,
};
//--  Redux slice for managing user-related state.
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    //-- Set the user data in the state.
    setUser: (state, action) => {
      state.user = action.payload;
    },
    //-- Set the loading state.
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    //-- Set an error message in the state.
    setError: (state, action) => {
      state.error = action.payload;
    },
    //-- Update the user's profile image.
    updateProfileImage: (state, action) => {
      if (state.user) {
        state.user.profileImage = action.payload;
      }
    },

    // updateProfileDetails: (state, action) => {
    //   state.user = action.payload; // ✅ Update full user details
    // },
    //-- Update user profile details.
    updateProfileDetails: (state, action) => {
      state.user = { ...state.user, ...action.payload }; // ✅ Merging new data instead of replacing
    },

    //-- Remove the user's profile image.
    removeProfileImage: (state) => {
      if (state.user) {
        state.user.profileImage = "";
      }
    },
    //-- Log out the user.
    logoutUser: (state) => {
      state.user = null;
      state.loading = false;
      state.error = null;
    },
  },
});

// Export action creators
export const {
  setUser,
  setLoading,
  setError,
  updateProfileImage,
  removeProfileImage,
  logoutUser,
  updateProfileDetails,
} = userSlice.actions;
// Export the reducer to be used in the Redux store
export default userSlice.reducer;
