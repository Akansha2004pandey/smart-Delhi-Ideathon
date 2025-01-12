import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import RegisteredUserContext from "../../../utils/RegisteredUserContext";
import { useContext } from "react";
import { getAuth, signOut } from "firebase/auth";

const RegisterHome = () => {
  const navigate = useNavigate();
  const { user, setUser } = useContext(RegisteredUserContext);
  const auth = getAuth();

  const handleLogOut = () => {
    signOut(auth)
      .then(() => {
        console.log("User successfully logged out");
      })
      .catch((error) => {
        console.log("Error in log out:", error);
      });

    setUser(null);
    navigate("/");
  };

  return (
    <div className="">
      <div className="md:w-full bg-gradient-to-r from-indigo-800 via-indigo-700 to-indigo-600 flex justify-center items-center min-h-screen relative overflow-hidden">
        {/* Animated Background Effect */}
        <div className="absolute inset-0 z-0 opacity-50">
          <div className="animate-pulse bg-indigo-900 w-72 h-72 rounded-full absolute -top-16 -left-10"></div>
          <div className="animate-pulse bg-indigo-900 w-56 h-56 rounded-full absolute bottom-10 right-5"></div>
        </div>

        {/* Main Content */}
        <div className="relative z-10 text-center px-4">
          <h1 className="text-white text-5xl md:text-6xl font-extrabold mb-4">
            Welcome to{" "}
            <span className="text-pink-400 animate-text-gradient">SahasiShe</span>
          </h1>
          <p className="mt-2 text-lg text-gray-200">
            Empowering women, preventing crimes, <br /> and creating a safer
            tomorrow.
          </p>
          <p className="mt-2 text-base italic text-gray-300">
            “Your safety, our priority. Together, we are fearless.”
          </p>

          {/* Display User Info */}
          {user ? (
            <div className="mt-6 text-lg text-gray-100">
              <p>Welcome, {user.displayName || "User"}!</p> {/* Display the username clearly */}
              <p>Email: {user.email}</p>
            </div>
          ) : (
            <p className="mt-6 text-lg text-gray-100">
              User information not available.
            </p>
          )}

          {/* Log Out Button */}
          <Button onClick={handleLogOut} className="mt-4 bg-red-500 text-white">
            Log Out
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RegisterHome;
