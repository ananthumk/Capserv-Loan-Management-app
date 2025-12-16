import { useAuth } from "../context/AuthContext";
import Button from "./Button";
import { useNavigate } from "react-router-dom";
import { SunMedium } from 'lucide-react';
import { Moon } from 'lucide-react';

const Navbar = () => {
  const { currentUser, logout, lightTheme, setLightTheme } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  console.log(lightTheme)

  const handleToggleTheme = () => {
    setLightTheme(prev => !prev)
  }

  return (
   <header
  className={`flex w-full items-center justify-between border-b ${
    lightTheme ? "border-slate-200 bg-white" : "border-slate-800 bg-slate-900/70"
  } px-6 py-3 backdrop-blur`}
>
  <div className={`text-lg font-semibold ${lightTheme ? "text-slate-900" : "text-indigo-400"}`}>Loan Management</div>
  <div className="flex items-center gap-4">
    {currentUser && (
      <p className={`text-sm hidden sm:block ${lightTheme ? "text-slate-800" : "text-slate-200"}`}>
        Welcome, <span className="font-semibold">{currentUser.name}</span>
      </p>
    )}

    {lightTheme ? (
      <Moon
        onClick={handleToggleTheme}
        className="cursor-pointer text-slate-900"
      />
    ) : (
      <SunMedium onClick={handleToggleTheme} className="cursor-pointer text-slate-200" />
    )}

    <Button onClick={handleLogout}>Logout</Button>
  </div>
</header>

  );
};

export default Navbar;
