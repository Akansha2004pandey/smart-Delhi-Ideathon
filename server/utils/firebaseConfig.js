// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";


let analytics, messaging;

if (typeof window !== "undefined") {
  
  import("firebase/analytics").then(({ getAnalytics, isSupported }) => {
    isSupported().then((supported) => {
      if (supported) {
        analytics = getAnalytics(app);
        console.log("Analytics initialized");
      } else {
        console.log("Analytics not supported in this environment.");
      }
    });
  });

  import("firebase/messaging").then(({ getMessaging }) => {
    messaging = getMessaging(app);
  });
}


const firebaseConfig = {
  apiKey: "AIzaSyD37hjYTu5FhynQ94VNTDY2uLnVISWVNBY",
  authDomain: "smart-delhi-ideathon.firebaseapp.com",
  projectId: "smart-delhi-ideathon",
  storageBucket: "smart-delhi-ideathon.firebasestorage.app",
  messagingSenderId: "1088473688215",
  appId: "1:1088473688215:web:4e119aed7ccfa9757ee1d2",
  measurementId: "G-82GS3YWPSF",
};


const app = initializeApp(firebaseConfig);


const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db, analytics, messaging };
