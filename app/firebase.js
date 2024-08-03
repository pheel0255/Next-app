// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCLMV929hBd9FL0_ktWDy3HoHdtZQgtBUs",
  authDomain: "pantry-025.firebaseapp.com",
  projectId: "pantry-025",
  storageBucket: "pantry-025.appspot.com",
  messagingSenderId: "111883770412",
  appId: "1:111883770412:web:347417591c2fc71aab0f89",
  measurementId: "G-3XNHT4HZKS",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const db = getFirestore(app);
