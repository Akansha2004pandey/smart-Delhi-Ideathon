import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import UserContext from '@/utils/UserContext'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card'
import { Dialog, DialogTrigger } from '@/components/ui/dialog'
import { useProModalStore } from '@/components/hooks/promodal'
import Promodal from '@/components/layout/promodal'
import { signInAnonymously, onAuthStateChanged } from "firebase/auth";
import { auth } from "../../lib/firebaseConfig";
import { useUserIdStore } from '@/components/hooks/userId';
const Login = () => {
    const userIdModal = useUserIdStore();
    const { isLoggedIn, setIsLoggedIn } = useContext(UserContext);
    const proModal = useProModalStore();
    const navigate = useNavigate();
    const handleClick = async () => {

        await signInAnonymously(auth)
            .then(() => {
                onAuthStateChanged(auth, (user) => {
                    if (user) {

                        const uid = user.uid;
                        userIdModal.setUserId(uid);
                        console.log("User signed in:", uid);
                    } else {
                        console.log("error");
                    }
                });
                setIsLoggedIn(true);
                navigate("/consent");
            })
            .catch((error) => {
                console.error("Sign-in error:", error.message);
            });

    }
    return (
        <>
            <div className='h-screen'>
                <div className='h-1/2 bg-[#211278]'>

                </div>
                <div className='flex items-center h-screen justify-center absolute top-0 w-full'>

                    <Card className="border-2 border-solid border-gray-200 rounded-lg p-4 shadow-md z-20">
                        <CardHeader>
                            <CardTitle className='tracking-normal font-bold text-[#7575d1] flex gap-3'>Welcome To <div className='font-extrabold text-[#db3a93]'>SahasiShe</div></CardTitle>
                            <CardDescription className='tracking-normal'>"Empowering Connections, Enabling Support"</CardDescription>

                        </CardHeader>
                        <CardContent>
                            <p>Log in anonymously to explore the app features without sharing personal details.</p>
                        </CardContent>
                        <CardFooter className='flex justify-between'>
                            <Button className='bg-[#7f2154] text-white hover:bg-[#db3a93] transition-colors duration-200' variant="default" onClick={() => handleClick()}>
                                Login
                            </Button>
                            <Dialog>
                                <DialogTrigger asChild>
                                    <Button variant="newcolor" onClick={proModal.onOpen}>

                                        Terms And Conditions</Button>
                                </DialogTrigger>
                            </Dialog>
                        </CardFooter>
                    </Card>
                    <Promodal />
                </div>
            </div>
        </>
    )
}

export default Login