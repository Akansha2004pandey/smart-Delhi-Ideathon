import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Navbar from './Navbar';

const DashboardLayout = () => {
  return (
    <div className="relative min-h-screen bg-gray-50">
      {/* Fixed gradient background */}
      <div className="fixed inset-0 bg-gradient-to-r from-indigo-800 via-indigo-700 to-indigo-600 z-0 h-96"></div>

      {/* Foreground content */}
      <div className="relative z-10">
        <Navbar />
        <div className="flex">
          <Sidebar />
          <main className="flex-1 my-12 p-8">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;