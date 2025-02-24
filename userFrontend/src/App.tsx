import React, { useState, useEffect, useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import Login from './pages/userLogin/Login';
import UserContext from './utils/UserContext';
import Complain from './pages/complain/Complain';
import UserDashboardLayout from './components/layout/userDashboard/UserDashboardLayout';
import Feedback from './pages/feedback/Feedback';
import Home from './pages/userHome/home';
import UserRegister from './pages/Authentication/UserRegister';
import RegisterHome from './components/layout/AnonymousDashboard/registerHome';
import RegisteredUserContext from './utils/RegisteredUserContext';
import { getAuth,onAuthStateChanged } from 'firebase/auth';
import Training from './components/ui/Training';
// PrivateRoute Component
const PrivateRoute = ({ children }: any) => {
  const { isLoggedIn } = useContext(UserContext);

  return isLoggedIn ? children : <Navigate to="/userLogin" />;
};

const ProtectedRouteUser = ({ children }: any) => {
  const { user } = useContext(RegisteredUserContext);

  return user ? children : <Navigate to="/userRegister" />;
};

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    const saved = localStorage.getItem('isLoggedIn');
    return saved ? JSON.parse(saved) : false;
  });

  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('user');
    return saved ? JSON.parse(saved) : null;
  });
   const auth=getAuth();

   onAuthStateChanged(auth, (user) => {
    if (user) {
      console.log(user, "from app js");
    }else{

      console.log("User is not logged in");
    }});


  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    localStorage.setItem('isLoggedIn', JSON.stringify(isLoggedIn));
  }, [isLoggedIn]);

  return (
    <UserContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      <RegisteredUserContext.Provider value={{ user, setUser }}>
        <Router>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/userLogin" element={<Login />} />
            <Route path="/userRegister" element={<UserRegister />} />

            <Route
              path="/userRegister/home"
              element={
                <ProtectedRouteUser>
                  <RegisterHome />
                </ProtectedRouteUser>
              }
            />
            {/* Private Routes */}
            <Route
              path="/userDashboard/"
              element={
                <PrivateRoute>
                  <UserDashboardLayout />
                </PrivateRoute>
              }
            >
              {/* <Route index element={<Complain />} /> */}
              <Route path="complaint" element={<Complain />} />
              <Route path="feedback" element={<Feedback />} />
              <Route path='train' element={<Training/>}/>
             
            </Route>

          </Routes>
        </Router>
      </RegisteredUserContext.Provider>
    </UserContext.Provider>
  );
}

export default App;
