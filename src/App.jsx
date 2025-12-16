import { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import { SAMPLE_USERS, SAMPLE_LOANS } from "./data/mockData";
import { getLocalData, setLocalData } from "./utils/storage";
import ProtectedRoute from "./components/ProtectedRoute";
import { useAuth } from "./context/AuthContext";

const App = () => {
  const {lightTheme} = useAuth()
  useEffect(() => {
    const existingUsers = getLocalData("users");
    const existingLoans = getLocalData("loans");

    if (!existingUsers || existingUsers.length === 0) {
      setLocalData("users", SAMPLE_USERS);
    }

    if (!existingLoans || existingLoans.length === 0) {
      setLocalData("loans", SAMPLE_LOANS);
    }
  }, []);

  return (
    <div className={`min-h-screen min-w-full ${lightTheme ? "bg-slate-50 text-slate-950" : "bg-slate-950 text-slate-100" }`}>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </div>
  );
};

export default App;
