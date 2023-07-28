import { createSlice } from "@reduxjs/toolkit";

export const userCredentials = createSlice({
  name: "userCredentials",
  initialState: {
    username: "",
    id: "sdxfcgvhbjnk",
    title: "",
    skills: "",
    hoursRate: "15",
    countryInfo: {
      countryName: "Canada",
      city: "info",
      flag: "🇨🇦",
      time: "",
    },
    email: "",
    phoneNumber: "No phone Number",
    openToCollabrate: false,
    backgroundPicture: "",
    profilePicture: "",
  },
  reducers: {
    updateUserData: (state, action) => {
      const {
        username,
        title,
        skills,
        hoursRate,
        countryInfo,
        flag,
        time,
        email,
        phoneNumber,
        openToCollabrate,
        id,
        profilePicture,
        backgroundPicture,
      } = action.payload;

      // Return a new state object with updated values
      return {
        ...state,
        username: username,
        title: title,
        skills: skills,
        hoursRate: hoursRate,
        countryInfo: countryInfo,
        flag: flag,
        time: time,
        email: email,
        phoneNumber: phoneNumber,
        openToCollabrate: openToCollabrate,
        id: id,
        profilePicture: profilePicture,
        backgroundPicture: backgroundPicture,
      };
    },

    updateUserData2: (state, action) => {
      const {
        username,
        title,
        skills,
        hoursRate,
        countryInfo,
        email,
        phoneNumber,
        openToCollabrate,
      } = action.payload;

      // Return a new state object with updated values
      return {
        ...state,
        username: username,
        title: title,
        skills: skills,
        hoursRate: hoursRate,
        countryInfo: countryInfo,
        email: email,
        phoneNumber: phoneNumber,
        openToCollabrate: openToCollabrate,
      };
    },
  },
});

export const userActions = userCredentials.actions;
