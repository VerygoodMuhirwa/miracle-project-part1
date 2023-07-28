import { createSlice } from "@reduxjs/toolkit";

export const aboutSlice = createSlice({
  name: "aboutSlice",
  initialState: {
    description:
      "",
    selectedTime: [],
  },
  reducers: {
    setAbout:(state,action)=>{
     state.description=action.payload.description
     state.selectedTime=action.payload.selectedTime
    },
    updatedAbout: (state, action) => {
      const { description, selectedTime } = action.payload;
      state.description = description;
      state.selectedTime = selectedTime;
    },
  },
});

export const aboutActions = aboutSlice.actions;
