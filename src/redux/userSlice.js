import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: null,
  name: "",
  email: "",
  initialBalance: 0,
  numberOfGroups: 0,
  hasSetup: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      return { ...action.payload }; // Set user data from API response
    },
    logout: () => {
      return { ...initialState }; // Reset state on logout
    },
  },
});

export const { setUser, logout } = userSlice.actions;
export default userSlice.reducer;
