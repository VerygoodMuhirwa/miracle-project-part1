// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { FacebookAuthProvider, GithubAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBYZrEXv2g-n9ZnOi9acnP197ZsZ_0b2Ws",
  authDomain: "miracle-d2f29.firebaseapp.com",
  projectId: "miracle-d2f29",
  storageBucket: "miracle-d2f29.appspot.com",
  messagingSenderId: "439591602302",
  appId: "1:439591602302:web:850f4a590c5e6c9364f02f",
  measurementId: "G-YQQE3ZDLJP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    
    return result;
  } catch (error) {
    console.log(error);
    throw error;
    
  }
};

;
const provider2 = new FacebookAuthProvider();

export const signInWithFacebook = async () => {
  try {
    const result = await signInWithPopup(auth, provider2);
    return result;
  } catch (error) {
    if (error.code === "auth/popup-closed-by-user") {
      console.log("Facebook sign-in popup was closed by the user.");
      // You can display a message to the user informing them that the popup was closed.
      // For example: alert("Please do not close the sign-in popup before completing the process.");
    } else {
      console.log("Error occurred during Facebook sign-in:", error);
    }
    throw error;
  }
};
const provider3 = new GithubAuthProvider();

export const signInWithGithub = async () => {
  try {
    const result = await signInWithPopup(auth, provider3);
    return result;
  } catch (error) {
    if (error.code === "auth/popup-closed-by-user") {
      console.log("Facebook sign-in popup was closed by the user.");
      // You can display a message to the user informing them that the popup was closed.
      // For example: alert("Please do not close the sign-in popup before completing the process.");
    } else {
      console.log("Error occurred during Facebook sign-in:", error);
    }
    throw error;
  }
};
const analytics = getAnalytics(app);