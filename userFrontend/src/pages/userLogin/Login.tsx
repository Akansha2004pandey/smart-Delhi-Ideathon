import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UserContext from '@/utils/UserContext';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import { useProModalStore } from '@/components/hooks/promodal';
import Promodal from '@/components/layout/promodal';
import { signInAnonymously, onAuthStateChanged } from "firebase/auth";
import { auth } from "../../lib/firebaseConfig";
import { useUserIdStore } from '@/components/hooks/userId';
import { db } from "../../lib/firebaseConfig";
import { collection, setDoc, doc } from "firebase/firestore";
import { Switch } from "../../components/ui/switch";
import { Label } from "../../components/ui/label";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
    const userIdModal = useUserIdStore();
    const { isLoggedIn, setIsLoggedIn } = useContext(UserContext);
    const [location, setLocation] = useState(false);
    const [userLocation, setUserLocation] = useState(null);
    const [loading, setLoading] = useState(false);
    
    const proModal = useProModalStore();
    const navigate = useNavigate();

    useEffect(() => {
        // Reset state on initial load
        localStorage.clear();
        userIdModal.setUserId('');
        userIdModal.setAnonymous(true);
    }, []);

    useEffect(() => {
        const savedLoginState = localStorage.getItem('isLoggedIn') === 'true';
        setIsLoggedIn(savedLoginState);
    }, [setIsLoggedIn]);

    const toggleLocationAccess = () => {
        setLocation(prevState => !prevState);
    };

    const fetchUserLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    setUserLocation({ latitude, longitude });
                    toast.success("Location fetched successfully!");
                },
                (error) => {
                    console.error("Error getting location:", error);
                    toast.error("Location access denied or unavailable.");
                }
            );
        } else {
            alert("Geolocation is not supported by this browser.");
        }
    };

    const handleLoginClick = async () => {
        if (!location) {
            alert("Location is necessary");
            return;
        }

        setLoading(true);
        try {
            await signInAnonymously(auth);
            onAuthStateChanged(auth, async (user) => {
                if (user) {
                    const uid = user.uid;
                    userIdModal.setUserId(uid);
                    console.log("User signed in:", uid);
                    setIsLoggedIn(true);
                    localStorage.setItem('isLoggedIn', 'true');

                    if (userLocation) {
                        try {
                            await setDoc(doc(db, "AnonymousUsers", uid), {
                                userId: uid,
                                userLocation,
                            });
                            console.log("User location saved:", userLocation);
                            toast.success("Data for location saved successfully!");
                            navigate('/userDashboard/complaint');
                        } catch (error) {
                            toast.error("Error saving location data");
                            console.error("Error saving location:", error);
                        }
                    }
                } else {
                    console.log("No user detected");
                }
            });
        } catch (error) {
            toast.error("Sign-in error: " + error.message);
            console.error("Sign-in error:", error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (location) {
            fetchUserLocation();
        }
    }, [location]);

    return (
        <div className="h-screen bg-gradient-to-br from-indigo-700 via-indigo-800 to-indigo-900 flex items-center justify-center relative">
            <Card className="w-full shadow-lg sm:w-96 md:w-1/3 border-2 border-solid border-gray-200 rounded-lg p-6 shadow-lg">
                <CardHeader className="text-center">
                    <CardTitle className="text-3xl font-extrabold text-gray-800">Welcome To <span className="text-indigo-800">SahasiShe</span></CardTitle>
                    <CardDescription className="mt-2 text-lg text-gray-600 italic">"Empowering Connections, Enabling Support"</CardDescription>
                </CardHeader>
                <CardContent>
                    <p className="mt-4 text-gray-800 text-lg">Log in anonymously to explore the app features without sharing personal details.</p>
                    <div className="flex items-center justify-start space-x-4 mt-6">
                        <div className="flex items-center space-x-3">
                        
                            
                            <div className="flex items-center justify-between w-full gap-x-5 mb-8">
          <Switch id="location" defaultChecked={false} onCheckedChange={toggleLocationAccess} className='' />
          <Label htmlFor="location" className="text-md  text-gray-700">
            Enable Your Location
          </Label>
        </div>
                                <span className="absolute top-0.5 left-1 text-white text-xs">
                                    {location ? (
                                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="none" viewBox="0 0 24 24">
                                            <path fill="currentColor" d="M12 2C7.03 2 3 6.03 3 10c0 3.49 3.51 7.86 7.94 12.24l1.06 1.06c.25.25.65.25.91 0l1.06-1.06C17.49 17.86 21 13.49 21 10c0-3.97-4.03-8-9-8zm0 13c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm0-3c-.55 0-1 .45-1 1s.45 1 1 1 1-.45 1-1-.45-1-1-1z" />
                                        </svg>
                                    ) : (
                                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="none" viewBox="0 0 24 24">
                                            <path fill="currentColor" d="M12 2C7.03 2 3 6.03 3 10c0 3.49 3.51 7.86 7.94 12.24l1.06 1.06c.25.25.65.25.91 0l1.06-1.06C17.49 17.86 21 13.49 21 10c0-3.97-4.03-8-9-8zm0 13c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z" />
                                        </svg>
                                    )}
                                </span>
                            
                        </div>
                    </div>
                </CardContent>
                <CardFooter className="flex justify-between  items-center gap-5">
                    <Button 
                        disabled={loading}
                        className="w-full  bg-gradient-to-r from-indigo-800 via-indigo-700 to-indigo-600 text-white hover:bg-indigo-500 transition-colors duration-200 py-3"
                        variant="default"
                        onClick={handleLoginClick}
                    >
                        {loading ? 'Logging in...' : 'Login'}
                    </Button>
                  
                </CardFooter>
            </Card>
            <Promodal />
            <ToastContainer />
        </div>
    );
};

export default Login;
