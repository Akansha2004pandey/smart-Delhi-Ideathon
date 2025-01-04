import React , {useEffect} from "react";
import {messaging } from "../../lib/firebaseConfig";
import { onMessage } from 'firebase/messaging';

const Notification = () => {
  useEffect(() => {
    navigator.serviceWorker
    .register('/firebase-messaging-sw.js')
    .then((registration) => {
      console.log('Service Worker registered:', registration);
    })
    .catch((error) => {
      console.error('Service Worker registration failed:', error);
    });
    onMessage(messaging, (message) => {
      console.log("Notification message:", message);
    });
  }, []);

  return(<div>Notification</div>);
};
export default Notification;
