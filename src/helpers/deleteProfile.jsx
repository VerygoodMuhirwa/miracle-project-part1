import axios from "axios";
import { fetchProfile } from "./fetchProfile";

export const deleteProfile = async (id) => {
  try {
    const token = JSON.parse(localStorage.getItem("userData")).token;
    console.log(id);
    if (!id) return;

    const res = await axios.delete(
      `http://localhost:5002/api/v1/profile/deleteProfile/${id}`,
      {
        headers: {
          authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    // Handle the response
    if (res.data && res.data.message === "Record deleted successfully") {
      const userData = JSON.parse(localStorage.getItem("userData"));
      const newProfile = res.data.profile;
      const updatedUserData = Object.assign({}, userData, {
        profile: newProfile,
      });
      localStorage.setItem("userData", JSON.stringify(updatedUserData));

      console.log("Profile deleted successfully");
      window.location.reload();
    } else {
      console.log("Profile deletion failed");
    }
  } catch (error) {
    console.log(error);
    console.log("An error occurred while deleting the profile");
  }
};
