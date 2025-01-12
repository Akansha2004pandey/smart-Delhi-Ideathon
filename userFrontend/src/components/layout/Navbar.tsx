import React from 'react';
import { Bell, Settings, User } from 'lucide-react';

const Navbar = () => {
  return (
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
          <button className="flex items-center space-x-2 p-2">
            <User className="h-8 w-8 text-white-500" />
            <span className="text-sm font-medium text-white-700">Admin User</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</div>

    </nav>
  );
};

export default Navbar;