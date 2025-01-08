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
  useEffect(() => {
    
    if (!userIdModal.userId) {
      alert("User is not logged in.");
    }
  }, [userIdModal.userId]);

  const handleSubmit = async (e) => {
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
        anonymous: updatedFormData.anonymous,
        userId: userIdModal.userId,
      });
      setAlertMessage({ type: 'success', text: 'Feedback Submitted Successfully' });
     
    } catch (error) {
      console.error(error);
       setAlertMessage({ type: 'error', text: 'Error Submitting Feedback' });
    }
    
    setLoading(false);
    
    
  };
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleAnonymousChange = () => {
    setFormData((prevData) => ({
      ...prevData,
      anonymous: !prevData.anonymous,
    }));
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
          {!userIdModal.anonymous && (
            <div className="flex flex-col space-y-2">
              <label className="text-md font-semibold text-gray-800">Set Up Your Identity</label>
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-500">No Identity</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={formData.anonymous}
                    onChange={handleAnonymousChange}
                  />
                  <span className="w-10 h-5 bg-gray-300 rounded-full peer-checked:bg-blue-600 peer-checked:after:translate-x-5 peer-checked:after:bg-white after:content-[''] after:absolute after:left-0.5 after:top-0.5 after:w-4 after:h-4 after:bg-white after:rounded-full after:transition-all"></span>
                </label>
                <span className="text-sm text-gray-500">Show Identity</span>
              </div>
            </div>
          )}

          <div className="flex flex-col space-y-2">
            <label htmlFor="feedback" className="text-md font-semibold text-gray-800">Feedback</label>
            <textarea
              id="feedback"
              name="feedback"
              value={formData.feedback}
              onChange={handleInputChange}
              className="px-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              rows="4"
              placeholder="Describe your feedback"
              required
            />
          </div>

          <Button
            disabled={loading}
            variant="default"
            className="w-full py-3 bg-[#5634dc] text-white font-semibold text-lg rounded-md hover:bg-[#766acb] transition duration-300"
          >
            {loading ? 'Submitting...' : 'Submit Feedback'}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Feedback;
