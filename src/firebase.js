// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCLV7T31kzfkp2TdgfKC6kKxYDnugH6ju8",
  authDomain: "gym-app-57978.firebaseapp.com",
  projectId: "gym-app-57978",
  storageBucket: "gym-app-57978.appspot.com",
  messagingSenderId: "331561823905",
  appId: "1:331561823905:web:bfbf992a4c7f9b71888ae0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export default app;