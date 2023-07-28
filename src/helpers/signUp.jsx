import axios from "axios";

export const useSignUp = async ({ name, email, password }) => {
    try {
      const response = await axios.post("http://localhost:5002/api/v1/auth/registerUser", {
        name,
        email,
        password,
      });
      return { success: true, data: response.data };
    } catch (error) {
      if (error.response) {
        return { success: false, error: error.response.data };
      } else if (error.request) {
        return { success: false, error: "No response from server." };
      } else {
        return { success: false, error: "Request Error: " + error.message };
      }
    }
  };
