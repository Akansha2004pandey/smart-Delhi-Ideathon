import { createContext } from "react";

interface RegisteredUserContextType {
  user: any; 
  setUser: React.Dispatch<React.SetStateAction<any>>;
}


const RegisteredUserContext = createContext<RegisteredUserContextType | undefined>(undefined);

export default RegisteredUserContext;
