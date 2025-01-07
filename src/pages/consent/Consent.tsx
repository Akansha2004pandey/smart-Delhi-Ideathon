import { Card, CardFooter, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogTrigger } from '@radix-ui/react-dialog';
import AddDetails from './AddDetails';
import ShowDetails from './ShowDetails';
import { useAddDetailModalStore } from '@/components/hooks/addDetailsModal';
import { useNavigate } from 'react-router-dom';
import { auth } from "../../lib/firebaseConfig";
import { onAuthStateChanged } from 'firebase/auth';
import { messaging } from "../../lib/firebaseConfig";
import { getToken } from "firebase/messaging";
import { db } from "../../lib/firebaseConfig";
import { doc, setDoc, collection, getDoc } from "firebase/firestore";
import { useUserIdStore } from '@/components/hooks/userId';
const Consent = () => {
    const userIdModal = useUserIdStore();
    const [loading, setLoading] = useState(false);
    const [location, setLocation] = useState(false);
    const [notifications, setNotifications] = useState(false);
    const [identity, setIdentity] = useState(null);
    const [userLocation, setUserLocation] = useState(null);
    const [notificationToken, setNotificationToken] = useState(null);
    const navigate = useNavigate();
    const anonymousRef = collection(db, "AnonymousUsers");
    const NonAnonymousUsers = collection(db, "NonAnonymousUsers");
   console.log(userIdModal.userId);
  

    useEffect(() => {
        if (location) {
            setLoading(true);
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    setUserLocation({ latitude:latitude, longitude:longitude });
                    setLoading(false);
                },
                (error) => {
                    console.error("Error getting location:", error);
                    alert("Location access denied or unavailable.");
                    setLoading(false);
                }
            );
        }
    }, [location]);

    useEffect(() => {
        if (notifications) {
            Notification.requestPermission().then((permission) => {
                if (permission === 'granted') {
                    getToken(messaging, { vapidKey: "YOUR_VAPID_KEY" })
                        .then((currentToken) => {
                            if (currentToken) {
                                setNotificationToken(currentToken);
                            }
                        })
                        .catch((err) => {
                            console.log('An error occurred while retrieving token.', err);
                        });
                }
            });
        }
    }, [notifications]);

    const handleDetailsSubmit = (details) => {
        setLoading(true);
        setIdentity(details);
        userIdModal.setAnonymous(false);

        setLoading(false);
    };

    const handleSubmit = async () => {
        setLoading(true);

        if ( !userLocation) {
            alert("Please ensure all permissions are granted.");
            setLoading(false);
            return;
        }

        if (identity) {
            try {
               

                    await setDoc(doc(NonAnonymousUsers, userIdModal.userId), {
                        userId: userIdModal.userId,
                        userLocation: userLocation,
                        identity: identity,
                    });
                    userIdModal.setAnonymous(false);
               
            } catch (error) {
                console.error("Error saving non-anonymous user details:", error);
            }
        }

        try {
            
           
                await setDoc(doc(anonymousRef, userIdModal.userId), {
                    userId: userIdModal.userId,
                    userLocation: userLocation,
                });
                const docRef = doc(db, "NonAnonymousUsers",userIdModal.userId);
                const docSnap = await getDoc(docRef);
                if(docSnap.exists()){
                     userIdModal.setAnonymous(false);
                }
            console.log("User details saved successfully!");


        } catch (error) {
            console.error("Error saving user details:", error);
            alert("There was an error saving your details. Please try again.");
        }

        setLoading(false);
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
                    </CardContent>
                    <CardFooter className='flex justify-end'>
                        <Button disabled={loading} variant="default" onClick={handleSubmit}>Go to Dashboard</Button>
                    </CardFooter>
                </Card>
                <AddDetails onDetailsChange={handleDetailsSubmit} />
            </div>
        </div>
    );
};

export default Consent;
