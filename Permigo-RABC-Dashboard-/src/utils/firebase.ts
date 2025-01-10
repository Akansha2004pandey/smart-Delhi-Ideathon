// Import the functions you need from the SDKs
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore} from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getMessaging } from "firebase/messaging";
import { GoogleAuthProvider } from "firebase/auth";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD37hjYTu5FhynQ94VNTDY2uLnVISWVNBY",
  authDomain: "smart-delhi-ideathon.firebaseapp.com",
  projectId: "smart-delhi-ideathon",
  storageBucket: "smart-delhi-ideathon.appspot.com",
  messagingSenderId: "1088473688215",
  appId: "1:1088473688215:web:4e119aed7ccfa9757ee1d2",
  measurementId: "G-82GS3YWPSF",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Analytics (optional, check environment before using analytics in development)


// Initialize Firebase Services
const auth = getAuth(app);
const db = getFirestore(app);
const messaging = getMessaging(app);
const googleProvider = new GoogleAuthProvider();



// Export the initialized Firebase services
export { app, googleProvider, auth, db, messaging };
