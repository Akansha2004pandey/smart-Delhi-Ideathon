import { initializeApp } from 'https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js';
import { getMessaging, onBackgroundMessage } from 'https://www.gstatic.com/firebasejs/11.1.0/firebase-messaging.js';

const firebaseConfig = {
  apiKey: "AIzaSyD37hjYTu5FhynQ94VNTDY2uLnVISWVNBY",
  authDomain: "smart-delhi-ideathon.firebaseapp.com",
  projectId: "smart-delhi-ideathon",
  storageBucket: "smart-delhi-ideathon.firebasestorage.app",
  messagingSenderId: "1088473688215",
  appId: "1:1088473688215:web:4e119aed7ccfa9757ee1d2",
  measurementId: "G-82GS3YWPSF"
};

const app = initializeApp(firebaseConfig);

const messaging = getMessaging(app);

onBackgroundMessage(messaging, function(payload) {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);

  const notificationTitle = 'Background Message Title';
  const notificationOptions = {
    body: payload.data.body || 'Background Message body.',
    icon: '/firebase-logo.png',
  };

  // Show the notification
  self.registration.showNotification(notificationTitle, notificationOptions);
});
