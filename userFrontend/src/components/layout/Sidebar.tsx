import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Users, Shield, Key, Home, Menu, X,StepForwardIcon } from 'lucide-react';

const navigation = [
  { name: 'Dashboard', href: '/', icon: Home },
  { name: 'Users', href: '/users', icon: Users },
  { name: 'Roles', href: '/roles', icon: Shield },
  { name: 'Permissions', href: '/permissions', icon: Key },
];

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative">
      {/* Hamburger Menu */}
      <button
        onClick={toggleSidebar}
        className="absolute top-4 left-4 z-20 p-2 bg-transparent text-white rounded-md md:hidden"
      >
        {isOpen ? <X className="h-6 w-6 text-black fixed m-4" /> : <StepForwardIcon className="h-8 w-8 fixed bg-white/20 rounded-full backdrop:blur p-1 z-20" />}
      </button>

      {/* Sidebar */}
      <div
        className={`fixed md:sticky top-0 h-screen bg-transparent  p-4 inset-y-0 left-0 transform ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0 transition-transform duration-300 ease-in-out bg-transparent w-64 z-10 md:flex md:flex-shrink-0`}
      >
        <div className="flex flex-col w-full h-full">
          <div className="flex  w-64  flex-col flex-grow pt-5 pb-4 overflow-y-auto rounded-3xl bg-white  shadow-lg">
            <h1 className="text-2xl font-bold text-center text-gray-900">
              Permigo
            </h1>
            <div className="flex-grow flex flex-col">
              <nav className="flex-1 px-4 mt-8 space-y-1">
                {navigation.map((item) => {
                  const Icon = item.icon;
                  return (
                    <NavLink
                      key={item.name}
                      to={item.href}
                      className={({ isActive }) =>
                        `group flex items-center px-4 py-2 text-lg font-medium rounded-md ${
                          isActive
                            ? 'bg-indigo-500 text-white'
                            : 'text-gray-900 hover:bg-gray-50 hover:text-gray-900'
                        }`
                      }
                    >
                      <Icon
                        className={`mr-3 h-5 w-5 `}
                        aria-hidden="true"
                      />
                      {item.name}
                    </NavLink>
                  );
                })}
              </nav>
            </div>
          </div>
        </div>
      </div>

      {/* Overlay */}
      {isOpen && (
        <div
          onClick={toggleSidebar}
          className="fixed inset-0 bg-black opacity-50  md:hidden"
        ></div>
      )}
    </div>
  );
};

export default Sidebar;
