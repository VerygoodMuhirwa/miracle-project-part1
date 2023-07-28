import axios from "axios";
export const updateProfile = async (objectType, newData) => {
  try {
    if (!objectType && !newData) return;
    const token = JSON.parse(localStorage.getItem("userData")).token;
    let newData1
    if(objectType=="education"){
      const {school,description}=newData
     newData1={school,description}
    }else if(objectType==="experience"){
      const {company,description}=newData
      newData1={company,description}
    }
    else{
      const {title,description}=newData
      newData1 = {title,description}
    }

    const res = await axios.post(
      `http://localhost:5002/api/v1/profile/addSingleProfile/${objectType}`,
       newData1 ,
      {
        headers: {
          authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    if (res.data) {
      const userData = JSON.parse(localStorage.getItem("userData"));
      const newProfile = res.data.profile;
      const updatedUserData = Object.assign({}, userData, {
        profile: newProfile,
      });
      localStorage.setItem("userData", JSON.stringify(updatedUserData));
    }
    console.log(res.data);
          window.location.reload();

  } catch (error) {
    console.log(error);
  }
};
