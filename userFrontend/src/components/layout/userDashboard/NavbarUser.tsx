import React, { useContext } from 'react'
import { Bell, DoorOpen, Settings, User } from 'lucide-react'
import { useState, useEffect } from 'react';
import { useUserIdStore } from '@/components/hooks/userId';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import UserContext from '@/utils/UserContext';
const NavbarUser = () => {
   

    const userIdModal = useUserIdStore();
    const navigate=useNavigate();
    
    const handleClick = async () => {
        await userIdModal.setUserId('');
        userIdModal.setAnonymous(true);
        localStorage.clear();
      
        navigate('/');
      };

  return (
    <div>
<nav className="bg-white border-gray-200 ">
  <div className="flex justify-end px-3 ">
    <div className="fixed z-20 ">
      <div className="flex justify-between items-center h-10">
        <div className="flex  items-center space-x-4">
          <div className="relative bg-white/50 mt-3 flex rounded-md backdrop-blur px-4 sm:px-4 lg:px-4 ">

          </div>
          <button
            onClick={handleClick}
           className="flex  mt-3 items-center space-x-2 px-4 py-2  bg-red-500 text-white font-semibold rounded-md shadow-md hover:bg-red-600 transition-transform transform hover:scale-105">
            <DoorOpen className="h-5 w-5" />
            <span>Logout</span>
          </button>

        </div>
        
      </div>

    </div>
    
  </div>
  
</nav>
    </div>
  )
}

export default NavbarUser
