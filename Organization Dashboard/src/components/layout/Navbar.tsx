import React from 'react';
import {  Building2, DoorOpen, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate(); // Initialize the navigation hook

  const handleLogout = () => {
    localStorage.clear(); // Clear all items from localStorage
    window.location.href = '/'; // Redirect to the homepage using window.location
  };
  const currentOrganization = JSON.parse(localStorage.getItem('currentOrganization'));

  return (
<nav className="bg-white border-gray-200 ">
  <div className="flex justify-end px-3 ">
    <div className="fixed z-20 ">
      <div className="flex justify-between items-center h-10">
        <div className="flex  items-center space-x-4">
          <div className="relative bg-white/50 mt-3 flex rounded-md backdrop-blur px-4 sm:px-4 lg:px-4 ">
            <button className="flex items-center space-x-2 p-2">
              <div className='bg-indigo-500 p-1 rounded-full'>
              <Building2 className="h-5 w-5 text-white" />
              </div>
              <span className="text-sm font-medium text-gray-700">{currentOrganization.name}</span>
            </button>
          </div>
          <button
            onClick={handleLogout}
           className="flex  mt-3 items-center space-x-2 px-4 py-2  bg-red-500 text-white font-semibold rounded-md shadow-md hover:bg-red-600 transition-transform transform hover:scale-105">
            <DoorOpen className="h-5 w-5" />
            <span>Logout</span>
          </button>

        </div>
        
      </div>

    </div>
    
  </div>
  
</nav>

  );
};

export default Navbar;