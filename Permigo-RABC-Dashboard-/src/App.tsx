import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import DashboardLayout from './components/layout/DashboardLayout';
import Dashboard from './pages/Dashboard';
import Permissions from './pages/Alerts';
import AnimatedCursor from 'react-animated-cursor';
import MapControl from './pages/MapControl';
import Register from './pages/Register';
import Cameras from './pages/Cameras';
import Alerts from './pages/Alerts';

function ProtectedRoute() {
  const currentOrganization = localStorage.getItem('currentOrganization');
  
  if (!currentOrganization) {
    alert('Unauthorized access. Please log in to continue.');
    return <Navigate to="/" replace />;
  }
  
  return <Outlet />;
}

function App() {
  const isLoggedIn = localStorage.getItem('currentOrganization');

  return (
    <Router>
      <Routes>
        {/* Redirect based on login status */}
        <Route path="/" element={isLoggedIn ? <Navigate to="/dashboard" replace /> : <Register />} />

        {/* Protected Dashboard Routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="camera" element={<Cameras />} />
            <Route path="map" element={<MapControl />} />
            <Route path="alerts" element={<Alerts />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
