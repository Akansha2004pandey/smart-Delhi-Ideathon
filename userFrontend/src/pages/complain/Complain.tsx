import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { useUserIdStore } from '@/components/hooks/userId';
import { db } from "../../lib/firebaseConfig";
import { collection, addDoc } from "firebase/firestore";
import { AlarmCheck } from 'lucide-react';
import Alert from '@mui/material/Alert';
import { createComplain } from '@/components/services/complainApi';
const Complain = () => {
    const userIdModal = useUserIdStore();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        complain: '',
        location: { latitude: null, longitude: null },
        date: '',
        time: '',
    });
    const [alertMessage, setAlertMessage] = useState({ type: '', text: '' });

    const handleSubmit = async (e) => {
        setLoading(true);
        e.preventDefault();

        const currentDate = new Date();
        const formattedDate = currentDate.toLocaleDateString();
        const formattedTime = currentDate.toLocaleTimeString();

        const updatedFormData = {
            ...formData,
            date: formattedDate,
            time: formattedTime,
        };

        try {
            const complaindata={
                complain: updatedFormData.complain,
                location: updatedFormData.location,
                date: updatedFormData.date,
                time: updatedFormData.time,
                userId: userIdModal.userId,
            }
            const complain=await createComplain(complaindata);
            console.log(complain);
            setAlertMessage({ type: 'success', text: 'Complaint Submitted Successfully' });
            
            
           
        } catch (error) {
            console.error(error);
            setAlertMessage({ type: 'error', text: 'Error Submitting Complaint' });
        }
        
        setLoading(false);
        
    };
   
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    setFormData((prevData) => ({
                        ...prevData,
                        location: { latitude, longitude },
                    }));
                },
                (error) => {
                    console.error('Error getting location:', error);
                    alert('Location access denied or unavailable.');
                }
            );
        }
    }, []);

    return (
        <>
            <div className="w-3/4  mx-auto py-8 mb-10">
            <div className='text-3xl text-white font-extrabold mb-5 text-center'>Raise a Complaint</div>
                {alertMessage.text && (
                    <Alert severity={alertMessage.type} onClose={() => setAlertMessage({ type: '', text: '' })}>
                        {alertMessage.text}
                    </Alert>
                )}
                <form onSubmit={handleSubmit} className="space-y-5 bg-white p-6 rounded-lg shadow-lg">
                    

                    <div className="flex flex-col space-y-2">
                        <label htmlFor="location" className="text-md font-semibold text-gray-800">Detected Location</label>
                        <input
                            id="location"
                            name="location"
                            value={`Latitude: ${formData.location.latitude || 'loading'}, Longitude: ${formData.location.longitude || 'loading'}`}
                            readOnly
                            className="px-4 py-2 border border-gray-300 rounded-md text-sm bg-gray-100"
                        />
                    </div>

                    <div className="flex flex-col space-y-2">
                        <label htmlFor="complain" className="text-md font-semibold text-gray-800">Complaint</label>
                        <textarea
                            id="complain"
                            name="complain"
                            value={formData.complain}
                            onChange={handleInputChange}
                            className="px-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            rows="4"
                            placeholder="Describe your complaint"
                            required
                        />
                    </div>

                    <Button
                        disabled={loading}
                        variant="default"
                        className="w-full py-3 bg-[#5634dc] text-white font-semibold text-lg rounded-md hover:bg-[#766acb] transition duration-300"
                    >
                        Submit Complaint
                    </Button>
                </form>
            </div>
        </>
    );
};

export default Complain;
