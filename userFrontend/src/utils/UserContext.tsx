import { createContext } from "react";


interface UserContextType {
  isLoggedIn: boolean;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>; // SetState function to update isLoggedIn
}


const UserContext = createContext<UserContextType | undefined>(undefined);

export default UserContext;
