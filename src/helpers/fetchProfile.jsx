import axios from "axios";

export const fetchProfile=async()=>{

    try {
        const token= JSON.parse(localStorage.getItem("userData")).token;
      const res = await axios.get("http://localhost:5002/api/v1/profile/getMyProfile",{
            headers: {
              authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          })
          if (res.data) {
            const userData = JSON.parse(localStorage.getItem('userData'));
            const newProfile = res.data.profile;
            const updatedUserData = Object.assign({}, userData, {
              profile: newProfile,
            });
            localStorage.setItem('userData', JSON.stringify(updatedUserData));
          }
    } catch (error) {
        console.log(error);
    }
}