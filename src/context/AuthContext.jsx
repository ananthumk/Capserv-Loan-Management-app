import { createContext, useContext, useEffect, useState } from "react";
import { getLocalData, setLocalData } from "../utils/storage";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [lightTheme, setLightTheme] = useState(false)

  useEffect(() => {
    const stored = getLocalData("currentUser");
    if (stored) setCurrentUser(stored);
  }, []);

  const login = (user) => {
    setCurrentUser(user);
    setLocalData("currentUser", user);
    setLocalData("isLoggedIn", true);
  };

  const logout = () => {
    setCurrentUser(null);
    setLocalData("currentUser", null);
    setLocalData("isLoggedIn", false);
  };

  return (
    <AuthContext.Provider value={{ currentUser, lightTheme, setLightTheme, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
