importScripts('https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/11.1.0/firebase-messaging.js');

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD37hjYTu5FhynQ94VNTDY2uLnVISWVNBY",
  authDomain: "smart-delhi-ideathon.firebaseapp.com",
  projectId: "smart-delhi-ideathon",
  storageBucket: "smart-delhi-ideathon.firebasestorage.app",
  messagingSenderId: "1088473688215",
  appId: "1:1088473688215:web:4e119aed7ccfa9757ee1d2",
  measurementId: "G-82GS3YWPSF"
};

// Initialize Firebase app
firebase.initializeApp(firebaseConfig);

// Initialize Firebase Messaging
const messaging = firebase.messaging();

// Handle background messages
messaging.onBackgroundMessage(function(payload) {
  console.log('Received background message ', payload);

  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: payload.notification.icon,
  };

  // Show notification
  self.registration.showNotification(notificationTitle, notificationOptions);
});
