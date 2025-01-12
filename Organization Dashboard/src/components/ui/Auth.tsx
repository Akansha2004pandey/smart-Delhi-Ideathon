import React, { useState } from 'react';
import { auth, db, googleProvider } from '../../utils/firebase'; // Ensure googleProvider is imported
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  sendPasswordResetEmail,
} from 'firebase/auth';
import { collection, doc, getDoc, setDoc } from 'firebase/firestore';
import { Eye, EyeOff, LogIn } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Auth: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isRegistering, setIsRegistering] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [organizationAddress, setOrganizationAddress] = useState<string>(''); 
  

  const togglePassword = () => setShowPassword((prev) => !prev);
  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === 'email') setEmail(value);
    if (name === 'password') setPassword(value);
    if (name === 'name') setName(value);
    if (name === 'organizationAddress') setOrganizationAddress(value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setIsLoading(true);
    e.preventDefault();
    setErrorMessage(null);
  
    if (isRegistering) {
      try {
        const userDocRef = doc(db, 'Organizations', email);
        const userDoc = await getDoc(userDocRef);
        if (userDoc.exists()) {
          setErrorMessage('Email already in use. Please use a different email.');
          setIsLoading(false);
          return;
        }
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
  
        // Save the new user data, including organizationAddress
        await setDoc(userDocRef, { 
          uid: user.uid, 
          name, 
          email,
          password, 
          organizationAddress 
        });
        localStorage.setItem('currentOrganization', JSON.stringify({ 
          uid: user.uid, 
          email, 
          name, 
          organizationAddress 
        }));
        setIsLoading(false);
        navigate('/dashboard');
      } catch (error) {
        setErrorMessage('An error occurred during registration.');
        setIsLoading(false);
      }
    } else {
      try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        const userDocRef = doc(db, 'Organizations', email);
        const userDoc = await getDoc(userDocRef);
        if (!userDoc.exists()) {
          setErrorMessage('User not found. Please register first.');
          setIsLoading(false);
          return;
        }
  
        // Load user details from Firestore, including organizationAddress
        const userData = userDoc.data();
        localStorage.setItem('currentOrganization', JSON.stringify({ 
          uid: user.uid, 
          email: user.email, 
          name: userData?.name, 
          organizationAddress: userData?.organizationAddress 
        }));
        setIsLoading(false);
        navigate('/dashboard');
      } catch {
        setErrorMessage('Invalid email or password.');
        setIsLoading(false);
      }
    }
  };
  
  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      const userDocRef = doc(db, 'Organizations', user.email);
      const userDoc = await getDoc(userDocRef);
  
      if (!userDoc.exists()) {
        // If user doesn't exist, collect organizationAddress before saving
        const organizationAddress = prompt('Please enter your organization address:');
        if (!organizationAddress) {
          setErrorMessage('Organization address is required.');
          setIsLoading(false);
          return;
        }
  
        // Save new user details
        await setDoc(userDocRef, { 
          uid: user.uid, 
          name: user.displayName, 
          email: user.email,
           
          organizationAddress 
        });
  
        localStorage.setItem('currentOrganization', JSON.stringify({ 
          uid: user.uid, 
          email: user.email, 
          name: user.displayName, 
          organizationAddress 
        }));
      } else {
        // Load existing user details
        const userData = userDoc.data();
        localStorage.setItem('currentOrganization', JSON.stringify({ 
          uid: user.uid, 
          email: user.email, 
          name: userData?.name, 
          organizationAddress: userData?.organizationAddress 
        }));
      }
  
      setIsLoading(false);
      navigate('/dashboard');
    } catch {
      setErrorMessage('Google sign-in failed.');
      setIsLoading(false);
    }
  };
  
  const handleForgotPassword = async () => {
    if (!email) {
      setErrorMessage('Please enter your email to reset the password.');
      return;
    }
    try {
      await sendPasswordResetEmail(auth, email);
      alert('Password reset email sent! Check your inbox.');
    } catch {
      setErrorMessage('Failed to send reset email. Please try again.');
    }
  };

  return (
    <div className="w-full transition-all duration-300 ease-in-out  flex justify-center items-center min-h-screen">

<form
    className={`w-full max-w-lg p-6 bg-white rounded-lg transition-transform duration-500 ${
      isRegistering ? 'translate-x-0 opacity-100' : 'translate-x-0 opacity-100'
    }`}
    onSubmit={handleSubmit}
  >
          <div className="relative z-10">
            <h1 className="mb-2 text-center text-[2rem] font-medium">
              {isRegistering ? 'Register an Account' : 'Login to Your Account'}
            </h1>
            
            <p className="mb-8 px-[2rem] text-center text-[#999] text-[14px]">
              {isRegistering ? (
                <>
                  Already have an account?{' '}
                  <button
              type="button"
              onClick={() => setIsRegistering(false)}
              className="font-bold text-indigo-500 hover:text-[#7263F3] transition-all duration-300"
            >
              Login here
            </button>
                </>
              ) : (
                <>
                  Don't have an account?{' '}
                  <button
              type="button"
              onClick={() => setIsRegistering(true)}
              className="font-bold text-indigo-500 hover:text-[#7263F3] transition-all duration-300"
            >
              Register here
            </button>
                </>
              )}
            </p>
            <div className='flex justify-center items-center mb-3'>
            <button
              type="button"
              onClick={handleGoogleSignIn}
  className="cursor-pointer text-black flex gap-2 items-center justify-center bg-zinc-200 px-12 py-3 rounded-lg font-medium text-sm hover:bg-zinc-300 transition-all ease-in duration-200"
>
  <svg viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg" className="w-6">
    <path
      d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
      fill="#FFC107"
    ></path>
    <path
      d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
      fill="#FF3D00"
    ></path>
    <path
      d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
      fill="#4CAF50"
    ></path>
    <path
      d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
      fill="#1976D2"
    ></path>
  </svg>
  <div className='text-md'>
  Continue with Google
  </div>
</button>
</div>
<div className="w-full flex justify-center items-center gap-[30px] text-[#8B8E98]">
    <hr className="block w-full h-[1px] border-none bg-[#e8e8e8]"/>
    <span>Or</span>
    <hr className="block w-full h-[1px] border-none bg-[#e8e8e8]"/>
  </div>
            {isRegistering && (
              <div className="mt-[1rem] flex flex-col">
                <label htmlFor="name" className="mb-1 text-[#999]">
                  Organization Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={name}
                  onChange={handleInputChange}
                  className="px-4 py-3 transition-all duration-300 border-[2px] rounded-md outline-indigo-500 text-gray-800"
       
                  required
                />
              </div>
            )}
                      {isRegistering && (
            <div className="mt-[1rem] flex flex-col">
              <label htmlFor="organizationAddress" className="mb-1 text-[#999]">
                Organization Address
              </label>
              <input
                type="text"
                id="organizationAddress"
                name="organizationAddress"
                value={organizationAddress}
                onChange={handleInputChange}
                className="px-4 py-3 transition-all duration-300 border-[2px] rounded-md outline-indigo-500 text-gray-800"
                required
              />
            </div>
          )}
            <div className="mt-[1rem] flex flex-col">
              <label htmlFor="email" className="mb-1 text-[#999]">
                {!isRegistering && "Registered"} Organization Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={handleInputChange}
                className="px-4 py-3 border-[2px] transition-all duration-300 rounded-md outline-indigo-500 text-gray-800"

                required
              />
            </div>
            <div className="relative mt-6 flex flex-col">
  <label htmlFor="password" className="mb-2 text-sm text-gray-500">
    Password
  </label>
  <input
    type={showPassword ? 'text' : 'password'}
    id="password"
    name="password"
    value={password}
    onChange={handleInputChange}
    className="px-4 py-3 border-2 border-gray-300 rounded-md text-gray-800 placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:outline-none focus:border-indigo-500 transition duration-300"
    placeholder="***************"
    required
  />
  <button
    type="button"
    className="absolute top-1/2 right-3 transform  text-gray-600 hover:text-indigo-600 focus:outline-none"
    onClick={togglePassword}
  >
    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
  </button>

</div>
<button
    type="button"
    onClick={handleForgotPassword}
    className="mt-2 text-sm text-indigo-500 hover:text-indigo-600 focus:text-indigo-700 transition duration-300"
  >
    Forgot Password?
  </button>

            {errorMessage && <p className="mt-4 text-center text-red-500 text-sm">{errorMessage}</p>}
            <div className="flex flex-col mt-6 space-y-4">
            <button
  disabled={isLoading}
  type="submit"
  className={`px-4 py-3 text-white font-bold rounded-md transition-colors 
    ${isLoading ? 'bg-indigo-300' : 'bg-indigo-500 hover:bg-[#7263F3]'} `}
>
  {isRegistering ? 'Register Now' : 'Login Now'}
</button>

            </div>
          </div>
        </form>
    </div>
  );
};

export default Auth;
