import { Card, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import React, { useState, useEffect } from 'react'
import { CardDescription, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Dialog, DialogTrigger } from '@radix-ui/react-dialog'
import AddDetails from './AddDetails'
import ShowDetails from './ShowDetails';
import { useAddDetailModalStore } from '@/components/hooks/addDetailsModal'
import { useNavigate } from 'react-router-dom'
import { auth } from "../../lib/firebaseConfig";
import { onAuthStateChanged } from 'firebase/auth'
import { messaging } from "../../lib/firebaseConfig";
import { getToken } from "firebase/messaging";

const Consent = () => {
    const [location, setLocation] = useState(false);
    const [notifications, setNotifications] = useState(false);
    const [identity, setIdentity] = useState(null)
    const [userId, setUserId] = useState(null);
    const [userLocation, setUserLocation] = useState(null);
    const [notificationToken, setNotificationToken] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        // Service Worker Registration for Firebase Messaging
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.register("/firebase-messaging-sw.js")
                .then((registration) => {
                    console.log("Service Worker registered with scope:", registration.scope);
                })
                .catch((error) => {
                    console.error("Service Worker registration failed:", error);
                });
        }
    }, []);

    useEffect(() => {
        // Handle location permissions
        if (location) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    setUserLocation({ latitude, longitude });
                    console.log("User Location:", latitude, longitude);
                },
                (error) => {
                    console.error("Error getting location:", error);
                    alert("Location access denied or unavailable.");
                }
            );
        }
    }, [location]);

    const handleDetailsSubmit = (details) => {
        setIdentity(details);
        console.log('User Details Submitted:', details);
    };

    const handleSubmit = async () => {
        onAuthStateChanged(auth, async (user) => {
            if (user) {
                const uid = user.uid;
                setUserId(uid);
                console.log("User ID:", uid);
            }

            if (userLocation) {
                console.log("User Location:", userLocation);
            }

            if (notifications) {
                // Request permission for notifications
                await Notification.requestPermission().then((permission) => {
                    if (permission === 'granted') {
                        getToken(messaging, { vapidKey: 'YOUR_VAPID_KEY' })
                            .then((currentToken) => {
                                if (currentToken) {
                                    setNotificationToken(currentToken);
                                    console.log('Notification token:', currentToken);
                                } else {
                                    console.log('No registration token available. Request permission to generate one.');
                                }
                            })
                            .catch((err) => {
                                console.log('An error occurred while retrieving token.', err);
                            });
                    } else {
                        console.log("Notification permission denied");
                    }
                });
            }
        });

        // Ensure all asynchronous actions are done before navigating
        navigate("/userDashboard");
    };

    const handleLocationChange = () => {
        setLocation(!location);
    };

    const handleNotificationsChange = () => {
        setNotifications(!notifications);
    };

    const addDetails = useAddDetailModalStore();

    return (
        <div className='h-screen'>
            <div className='h-1/2 bg-[#211278]'></div>
            <div className='flex items-center absolute justify-center h-screen top-0 w-full'>
                <Card className='w-1/3 min-w-[400px] border-2 border-solid border-gray-200 rounded-lg p-4 shadow-md z-20'>
                    <CardHeader>
                        <CardTitle>Consent Form</CardTitle>
                        <CardDescription>
                            {!identity && (
                                <Dialog>
                                    <DialogTrigger asChild>
                                        <Button className='w-full mt-5' onClick={addDetails.onOpen}>Add Identity Details</Button>
                                    </DialogTrigger>
                                </Dialog>
                            )}
                            {identity && <ShowDetails details={identity} />}
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className=''>
                            <div className="flex justify-between items-center">
                                <div className="flex items-center space-x-2">
                                    <label htmlFor="location" className="text-sm">Allow Location Access</label>
                                    <input
                                        id="location"
                                        type="checkbox"
                                        checked={location}
                                        onChange={handleLocationChange}
                                        className="toggle toggle-sm"
                                    />
                                </div>

                                <div className="flex items-center space-x-2">
                                    <label htmlFor="notifications" className="text-sm">Allow Notifications</label>
                                    <input
                                        id="notifications"
                                        type="checkbox"
                                        checked={notifications}
                                        onChange={handleNotificationsChange}
                                        className="toggle toggle-sm"
                                    />
                                </div>
                            </div>
                        </div>
                    </CardContent>
                    <CardFooter className='flex justify-end'>
                        <Button variant="default" onClick={handleSubmit}>Go to Dashboard</Button>
                    </CardFooter>
                </Card>
                <AddDetails onDetailsChange={handleDetailsSubmit} />
            </div>
        </div>
    );
};

export default Consent;
