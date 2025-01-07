import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { useAddDetailModalStore } from '@/components/hooks/addDetailsModal';

const AddDetails = ({ onDetailsChange }) => {
  const addDetail = useAddDetailModalStore();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    gender: 'male',
    age: '',
    address: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onDetailsChange(formData);
    console.log('Form Data:', formData);
    addDetail.onClose();
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div>
      <Dialog open={addDetail.isOpen} onOpenChange={addDetail.onClose}>
        <DialogContent className="sm:max-w-[400px] p-4 bg-white rounded-lg shadow-md">
          <DialogHeader>
            <DialogTitle className="text-base font-medium text-gray-800">Add Identity Details</DialogTitle>
            <DialogDescription className="text-xs text-gray-500">Fill in your details below.</DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-3">
            {/* Name */}
            <div className="flex flex-col space-y-1">
              <label htmlFor="name" className="text-xs text-gray-700">Name</label>
              <input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="px-3 py-1.5 border border-gray-300 rounded-sm text-sm focus:outline-none focus:ring-2 focus:ring-gray-400"
                type="text"
                placeholder="Enter your name"
              />
            </div>

            {/* Phone Number */}
            <div className="flex flex-col space-y-1">
              <label htmlFor="phone" className="text-xs text-gray-700">Phone Number</label>
              <input
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="px-3 py-1.5 border border-gray-300 rounded-sm text-sm focus:outline-none focus:ring-2 focus:ring-gray-400"
                type="text"
                placeholder="Enter your phone number"
              />
            </div>

            {/* Email */}
            <div className="flex flex-col space-y-1">
              <label htmlFor="email" className="text-xs text-gray-700">Email</label>
              <input
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="px-3 py-1.5 border border-gray-300 rounded-sm text-sm focus:outline-none focus:ring-2 focus:ring-gray-400"
                type="text"
                placeholder="Enter your email"
              />
            </div>

            {/* Gender */}
            <div className="flex flex-col space-y-1">
              <label htmlFor="gender" className="text-xs text-gray-700">Gender</label>
              <select
                id="gender"
                name="gender"
                value={formData.gender}
                onChange={handleInputChange}
                className="px-3 py-1.5 border border-gray-300 rounded-sm text-sm focus:outline-none focus:ring-2 focus:ring-gray-400"
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>

            {/* Age */}
            <div className="flex flex-col space-y-1">
              <label htmlFor="age" className="text-xs text-gray-700">Age</label>
              <input
                id="age"
                name="age"
                value={formData.age}
                onChange={handleInputChange}
                className="px-3 py-1.5 border border-gray-300 rounded-sm text-sm focus:outline-none focus:ring-2 focus:ring-gray-400"
                type="number"
                placeholder="Enter your age"
              />
            </div>

            {/* Address */}
            <div className="flex flex-col space-y-1">
              <label htmlFor="address" className="text-xs text-gray-700">Address</label>
              <input
                id="address"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                className="px-3 py-1.5 border border-gray-300 rounded-sm text-sm focus:outline-none focus:ring-2 focus:ring-gray-400"
                type="text"
                placeholder="Enter your address"
              />
            </div>

            {/* Submit Button */}
            <DialogFooter>
              <Button  variant={'default'}>Save Details</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddDetails;
