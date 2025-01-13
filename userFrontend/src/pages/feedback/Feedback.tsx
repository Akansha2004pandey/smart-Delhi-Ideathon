import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { useUserIdStore } from '@/components/hooks/userId';
import { db } from "../../lib/firebaseConfig";
import { collection, addDoc } from "firebase/firestore";
import { AlarmCheck } from 'lucide-react';
import { Alert } from '@mui/material';

const Feedback = () => {
  const userIdModal = useUserIdStore();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    feedback: '',
    date: '',
    time: '',
    anonymous: true,
  });
     const [alertMessage, setAlertMessage] = useState({ type: '', text: '' });
 

  const handleSubmit = async (e:any) => {
    e.preventDefault();
    setLoading(true);

    
    if (!formData.feedback.trim()) {
      alert("Feedback cannot be empty");
      setLoading(false);
      return;
    }

    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleDateString();
    const formattedTime = currentDate.toLocaleTimeString();

    const updatedFormData = {
      ...formData,
      date: formattedDate,
      time: formattedTime,
    };

    setFormData(updatedFormData);
    console.log(updatedFormData);

    try {
      await addDoc(collection(db, "feedback"), {
        Feedback: updatedFormData.feedback,
        date: updatedFormData.date,
        time: updatedFormData.time,
    
        userId: userIdModal.userId,
      });
      setAlertMessage({ type: 'success', text: 'Feedback Submitted Successfully' });
     
    } catch (error) {
      console.error(error);
       setAlertMessage({ type: 'error', text: 'Error Submitting Feedback' });
    }
    
    setLoading(false);
    
    
  };
  
  const handleInputChange = (e:any) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  
  
  return (
    <div className="w-full max-w-screen-sm mx-auto p-4 sm:p-6 lg:p-8">
      <div className="flex justify-center items-center gap-3 mb-6">

        <div className='text-2xl sm:text-3xl text-white font-extrabold text-left'>
          Your Voice, Our Progress – Share Your Feedback!
        </div>
      </div>

      <div className="w-full bg-white p-6 rounded-lg shadow-lg">
        {alertMessage.text && (
          <Alert className='mb-5' severity={alertMessage.type} onClose={() => setAlertMessage({ type: '', text: '' })}>
            {alertMessage.text}
          </Alert>
        )}
        <form onSubmit={handleSubmit} className="space-y-5">
         

          <div className="flex flex-col space-y-2">
            <label htmlFor="feedback" className="text-md font-semibold text-gray-800">Feedback</label>
            <textarea
              id="feedback"
              name="feedback"
              value={formData.feedback}
              onChange={handleInputChange}
             className="mt-1 block w-full rounded-md bg-gray-100 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-lg py-2 px-3 border outline-none"
              rows="4"
              placeholder="Describe your feedback"
              required
            />
          </div>

          <Button
            disabled={loading}
            variant="default"
           className="w-full py-3 bg-indigo-800 text-white font-semibold text-lg rounded-md hover:bg-indigo-800 transition duration-300"
          >
            {loading ? 'Submitting...' : 'Submit Feedback'}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Feedback;
