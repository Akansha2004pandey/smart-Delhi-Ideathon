import React, { useState, useEffect, useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import DashboardLayout from './components/layout/DashboardLayout';
import Dashboard from './pages/Dashboard';
import Users from './pages/Users';
import Roles from './pages/Roles';
import Permissions from './pages/Permissions';
import AnimatedCursor from 'react-animated-cursor';
import Login from './pages/userLogin/Login';
import Consent from './pages/consent/Consent';
import UserContext from './utils/UserContext';
import Complain from './pages/complain/Complain';
import UserDashboardLayout from './components/layout/userDashboard/UserDashboardLayout';
import Feedback from './pages/feedback/Feedback';
import Userdashboard from './pages/userdashboard/userdashboard';

// PrivateRoute Component
const PrivateRoute = ({ children }) => {
  const { isLoggedIn } = useContext(UserContext);
  return isLoggedIn ? children : <Navigate to="/userLogin" />;
};

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    const saved = localStorage.getItem('isLoggedIn');
    return saved ? JSON.parse(saved) : false;
  });


  useEffect(() => {
    localStorage.setItem('isLoggedIn', JSON.stringify(isLoggedIn));
  }, [isLoggedIn]);

  return (
    <UserContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      <Router>
        <AnimatedCursor
          innerSize={8}
          outerSize={8}
          color="65,45,200"
          outerAlpha={0.2}
          innerScale={0.7}
          outerScale={5}
          clickables={[
            'a',
            'input[type="text"]',
            'input[type="email"]',
            'input[type="number"]',
            'input[type="submit"]',
            'input[type="image"]',
            'label[for]',
            'select',
            'textarea',
            'button',
            '.link',
            {
              target: '.custom',
              options: {
                innerSize: 12,
                outerSize: 12,
                color: '58,45,163',
                outerAlpha: 0.3,
                innerScale: 0.7,
                outerScale: 5,
              },
            },
          ]}
        />
        <Routes>
          {/* Public Routes */}
          <Route path="/userLogin" element={<Login />} />

          {/* Private Routes */}
          <Route path="/" element={<PrivateRoute><DashboardLayout /></PrivateRoute>}>
            <Route index element={<Dashboard />} />
            <Route path="users" element={<Users />} />
            <Route path="roles" element={<Roles />} />
            <Route path="permissions" element={<Permissions />} />
          </Route>
          <Route path="/consent" element={<PrivateRoute><Consent /></PrivateRoute>} />
          <Route path="/userDashboard" element={<PrivateRoute><UserDashboardLayout /></PrivateRoute>}>
            <Route index element={<Userdashboard />} />
            <Route path="complaint" element={<Complain />} />
            <Route path="feedback" element={<Feedback />} />
          </Route>
        </Routes>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
