// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getMessaging } from "firebase/messaging";
import { connectFirestoreEmulator } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD37hjYTu5FhynQ94VNTDY2uLnVISWVNBY",
  authDomain: "smart-delhi-ideathon.firebaseapp.com",
  projectId: "smart-delhi-ideathon",
  storageBucket: "smart-delhi-ideathon.firebasestorage.app",
  messagingSenderId: "1088473688215",
  appId: "1:1088473688215:web:4e119aed7ccfa9757ee1d2",
  measurementId: "G-82GS3YWPSF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const db = getFirestore(app);
const messaging = getMessaging(app);
const auth=getAuth(app);


export { app, analytics ,db,auth,messaging};