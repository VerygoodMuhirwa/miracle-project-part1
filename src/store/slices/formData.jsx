import { createSlice } from "@reduxjs/toolkit";
import { updateProfile } from "../../helpers/addSingle";
import { deleteProfile } from "../../helpers/deleteProfile";
import { HandleEditProfile } from "../../helpers/editProfile";

export const formData = createSlice({
  name: "formData",
  initialState: {
    inventions: [],

    education: [],

    patents: [],

    experience: [],

    certificate: [],
  },
  reducers: {
    
    addInvention: (state, action) => {
      const newData = action.payload;
      const isDuplicate = state.inventions.some((item) => item._id === newData._id);

      if (!isDuplicate) {
        state.inventions.push(newData);
        console.log(state.inventions);
      } else {
        return
      }
    },
    editInvention: (state, action) => {
      const { _id, company, description } = action.payload;
      const updatedObject=state.inventions.find((item)=>item._id===_id)
      const updatedInventions = state.inventions.map((item) =>
        item._id === _id ? { ...item, company, description } : item
      );
      state.inventions = updatedInventions;
      updateProfile("inventions",updatedObject)
   
    },
    deleteInvetion:(state,action)=>{
      const { _id } = action.payload;
      // Filter out the item with the specified id from the inventions array
      state.patents = state.patents.filter((item) => item._id !== _id);
    },
  
    addPatent: (state, action) => {
      const newData = action.payload;
      const isDuplicate = state.patents.some((item) => item._id === newData._id);

      if (!isDuplicate) {
        state.patents.push(newData);
      } else {
        return
      }

    },
    editPatent: (state, action) => {
      const { _id, title, description } = action.payload;
      const updatedObject=state.patents.find((item)=>item._id===_id)
      const updatePatent = state.patents.map((item) =>
        item._id === _id ? { ...item, title, description } : item
      );
      updateProfile("patents",updatedObject)
      
   
      state.patents = updatePatent;
      console.log(updatedObject);
    },
    deletePatent: (state, action) => {
      const { _id } = action.payload;
      // Filter out the item with the specified id from the patents array
      state.patents = state.patents.filter((item) => item._id !== _id);
    },
   
   
    addEducation: (state, action) => {
      const newData = action.payload;
      // console.log(newData);
       const isDuplicate = state.education.some((item) => item._id === newData._id);
 
       if (!isDuplicate) {
        console.log(newData);
         state.education.push(newData);
        } else {
          console.log("Duplicate data found. Skipped adding.");
          return
        }
        console.log(state.education);
       
        // HandleEditProfil
     },
    editEducation: (state, action) => {
      const { _id, school, description } = action.payload;
      const updatedObject=state.education.find((item)=>item._id===_id)
      const updateEducation = state.education.map((item) =>
        item._id === _id ? { ...item, school, description } : item
      );
      
   
      state.education = updateEducation;
      console.log(updatedObject);
    },
    deleteEducation: (state, action) => {
      const { _id } = action.payload;
      // Filter out the item with the specified id from the patents array
      state.education = state.education.filter((item) => item._id !== _id);
    },
 
    addExperience: (state, action) => {
     const newData = action.payload;
      const isDuplicate = state.experience.some((item) => item._id === newData._id);

      if (!isDuplicate) {
        state.experience.push(newData);
        console.log(state.experience);
      } else {
        console.log("Duplicate data found. Skipped adding.");
        return
      }
    },

    editExperience: async(state, action) => {
      const { _id, company, description } = action.payload;
      const updatedObject=state.experience.find((item)=>item._id===_id)
      const updatedExperience = state.experience.map((item) =>
        item._id === _id ? { ...item, company, description } : item
      );
      
   
      state.experience = updatedExperience;
      console.log(updatedObject);
    //  await updateProfile("experience",updatedObject)
    },
    
    deleteExperience: (state, action) => {
      const { _id } = action.payload;
      // Filter out the item with the specified id from the patents array
      state.experience = state.experience.filter((item) => item._id !== _id);
    },
    
    addCertificate: (state, action) => {
      const newData = action.payload;
      const isDuplicate = state.certificate.some((item) => item._id === newData._id);

      if (!isDuplicate) {
        state.certificate.push(newData);
      } else {
        return
      }
 
    },
    editCertificate: (state, action) => {
      const { _id, title, description } = action.payload;
      const updateCertificate = state.certificate.map((item) =>
      item._id === _id ? { ...item, title, description } : item
      );
      state.certificate = updateCertificate;
      const updatedObject=state.certificate.find((item)=>item._id===_id)
      // updateProfile("certification",updatedObject)
      
      
   
    },
    deleteCertificate: (state, action) => {
      const { _id } = action.payload;
      // Filter out the item with the specified id from the patents array
      state.certificate = state.certificate.filter((item) => item._id !== _id);
      // deleteProfile(_id)
    },
  },
});

export const formDataActions = formData.actions;

export default formData.reducer;
