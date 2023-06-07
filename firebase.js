// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA5YpbatL96PeQGgUfnFJLzv7gnis3z1N4",
  authDomain: "motherstime-7777.firebaseapp.com",
  projectId: "motherstime-7777",
  storageBucket: "motherstime-7777.appspot.com",
  messagingSenderId: "786574593165",
  appId: "1:786574593165:web:efc08bf7aa9bed0339e6c4",
  measurementId: "G-9KDKVMWGBW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);
const auth = getAuth();
const provider = new GoogleAuthProvider(app);

export { auth, provider };