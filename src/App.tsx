import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DashboardLayout from './components/layout/DashboardLayout';
import Dashboard from './pages/Dashboard';
import Users from './pages/Users';
import Roles from './pages/Roles';
import Permissions from './pages/Permissions';
import AnimatedCursor from 'react-animated-cursor';
import Login from './pages/userLogin/Login';
import Consent from './pages/consent/Consent';
import UserContext from './utils/UserContext';
import { Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { User } from 'lucide-react';

import UserDashboardLayout from './components/layout/userDashboard/UserDashboardLayout';
// PrivateRoute Component

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); 

  return (
    <UserContext.Provider value={{isLoggedIn,setIsLoggedIn}}>
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
        <Route path="/" element={<DashboardLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="users" element={<Users />} />
          <Route path="roles" element={<Roles />} />
          <Route path="permissions" element={<Permissions />} />
        </Route>
        <Route path="/userLogin" element={<Login/>}/>
        <Route path="/consent" element={isLoggedIn?<Consent/>:<Login/>}/>
        <Route path="/userDashboard" element={<UserDashboardLayout />}>
     
        </Route>
        
      </Routes>
    </Router>
    </UserContext.Provider>
  );
}

export default App;