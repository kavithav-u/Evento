// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBDwuOjxflVgnH-TfBxJtbf8gQLvOeK6fQ",
  authDomain: "evento-auth.firebaseapp.com",
  projectId: "evento-auth",
  storageBucket: "evento-auth.appspot.com",
  messagingSenderId: "1001742381305",
  appId: "1:1001742381305:web:6a1821e8f510ddb4097228"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);