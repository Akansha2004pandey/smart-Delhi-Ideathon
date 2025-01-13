import React, { useContext } from 'react'
import { Bell, Settings, User } from 'lucide-react'
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
       <nav className="bg-white  border-gray-200">
<div className=" flex  justify-end ">
  <div className="fixed z-20 bg-white/50 mt-3  rounded-full backdrop-blur px-4 sm:px-6 lg:px-8">
    <div className="flex justify-between h-16">
      <div className="flex">
        <div className="flex-shrink-0 flex items-center">
          {/* Add your logo or other content here */}
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <button className="p-2 text-white-500 hover:text-gray-700">
          <Bell className="h-5 w-5" />
        </button>
        <div className="relative">
          
            <Button className="text-md bg-red-500 font-medium hover:bg-red-300 text-white" onClick={()=>handleClick()}>Logout</Button>
          
        </div>
      </div>
    </div>
  </div>
</div>

    </nav>
    </div>
  )
}

export default NavbarUser
