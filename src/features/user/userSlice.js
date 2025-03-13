import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    updateProfileImage: (state, action) => {
      if (state.user) {
        state.user.profileImage = action.payload;
      }
    },
    removeProfileImage: (state) => {
      if (state.user) {
        state.user.profileImage = "";
      }
    },
    logoutUser: (state) => {
      state.user = null;
      state.loading = false;
      state.error = null;
    },
  },
});

export const {
  setUser,
  setLoading,
  setError,
  updateProfileImage,
  removeProfileImage,
  logoutUser,
} = userSlice.actions;

export default userSlice.reducer;
