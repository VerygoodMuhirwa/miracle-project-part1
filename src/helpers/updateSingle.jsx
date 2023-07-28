import axios from "axios";
export const editSingle = async (objectType, newData) => {
  try {
    const { _id } = newData;
    const token = JSON.parse(localStorage.getItem("userData")).token;

    const res = await axios.put(
      `http://localhost:5002/api/v1/profile/updateProfile/${_id}`,
     {objectType, newData},
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
      window.location.reload()
    }
    console.log(res.data);
  } catch (error) {
    console.log(error);
  }
};
