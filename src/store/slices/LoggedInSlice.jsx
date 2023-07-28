import { createSlice } from "@reduxjs/toolkit";

// Check for the initial data in localStorage
const initialUserData = localStorage.getItem("userData");
const initialUsername = localStorage.getItem("username");
const initialState = {
  loggedIn: !!initialUserData, // Check if there's initialUserData in localStorage
  username: initialUsername || "",
  userData: initialUserData ? JSON.parse(initialUserData) : {},
};

export const loggedInSlice = createSlice({
  name: "loggedIn",
  initialState,
  reducers: {
    loggedUser: (state, action) => {
      const { username, userData } = action.payload;
      state.loggedIn = true;
      state.username = username;
      state.userData = userData;

      // Store the user data in localStorage
      localStorage.setItem("username", username);
      localStorage.setItem("userData", JSON.stringify(userData));
    },
    signOut: (state) => {
      state.loggedIn = false;

      // Clear the user data from localStorage on sign-out
      localStorage.removeItem("username");
      localStorage.removeItem("userData");
    },
  },
});

export const loggedActions = loggedInSlice.actions;
