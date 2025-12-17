import { useAuth } from "../context/AuthContext";
import Button from "./Button";
import { useNavigate, useLocation } from "react-router-dom";
import { SunMedium, Menu, X } from 'lucide-react';
import { Moon } from 'lucide-react';
import { useState } from "react";

const Navbar = () => {
  const { currentUser, logout, lightTheme, setLightTheme } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleNavigation = (path) => {
    navigate(path);
    setIsMenuOpen(false);
  };

  console.log(lightTheme)

  const handleToggleTheme = () => {
    setLightTheme(prev => !prev)
  }

  return (
   <header
  className={`flex w-full items-center justify-between border-b ${
    lightTheme ? "border-slate-200 bg-white" : "border-slate-800 bg-slate-900/70"
  } px-4 sm:px-6 py-3 backdrop-blur`}
>
  <div onClick={() => {navigate('/dashboard')}} className={`text-sm sm:text-lg font-semibold cursor-pointer ${lightTheme ? "text-slate-900" : "text-indigo-400"}`}>Loan Management</div>
  <div className="flex items-center gap-2 sm:gap-4">
    {/* {currentUser && (
      <p className={`text-sm hidden sm:block ${lightTheme ? "text-slate-800" : "text-slate-200"}`}>
        Welcome, <span className="font-semibold">{currentUser.name}</span>
      </p>
    )} */}

    {lightTheme ? (
      <Moon
        onClick={handleToggleTheme}
        className="cursor-pointer text-slate-900"
      />
    ) : (
      <SunMedium onClick={handleToggleTheme} className="cursor-pointer text-slate-200" />
    )}
       <div className="sm:hidden relative">
      <button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className={`p-1 rounded transition ${
          lightTheme ? "text-slate-900 hover:bg-slate-100" : "text-slate-100 hover:bg-slate-800"
        }`}
      >
        {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {isMenuOpen && (
        <div
          className={`absolute right-0 mt-2 w-48 rounded-lg border shadow-lg ${
            lightTheme
              ? "border-slate-200 bg-white"
              : "border-slate-700 bg-slate-900"
          }`}
        >
          <button
            onClick={() => handleNavigation('/dashboard')}
            className={`block w-full text-left px-4 py-2 text-sm font-medium rounded-t-lg transition ${
              location.pathname === '/dashboard'
                ? lightTheme ? "bg-indigo-100 text-indigo-700" : "bg-indigo-900/30 text-indigo-400"
                : lightTheme ? "text-slate-700 hover:bg-slate-100" : "text-slate-300 hover:bg-slate-800"
            }`}
          >
            Dashboard
          </button>
          <button
            onClick={() => handleNavigation('/profile')}
            className={`block w-full text-left px-4 py-2 text-sm font-medium transition ${
              location.pathname === '/profile'
                ? lightTheme ? "bg-indigo-100 text-indigo-700" : "bg-indigo-900/30 text-indigo-400"
                : lightTheme ? "text-slate-700 hover:bg-slate-100" : "text-slate-300 hover:bg-slate-800"
            }`}
          >
            Profile
          </button>
          <button
            onClick={() => {
              handleLogout();
              setIsMenuOpen(false);
            }}
            className={`block w-full text-left px-4 py-2 text-sm font-medium rounded-b-lg transition border-t ${
              lightTheme
                ? "border-slate-200 text-red-700 hover:bg-red-50"
                : "border-slate-700 text-red-400 hover:bg-red-900/20"
            }`}
          >
            Logout
          </button>
        </div>
      )}
    </div>
    <div  className="hidden sm:block">
    <Button onClick={handleLogout}>Logout</Button></div>
  </div>
</header>

  );
};

export default Navbar;
