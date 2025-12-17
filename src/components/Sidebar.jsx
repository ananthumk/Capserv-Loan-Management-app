import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { SunMedium, Moon } from "lucide-react";

const Sidebar = () => {
  const { currentUser, lightTheme, setLightTheme } = useAuth();

  const handleToggleTheme = () => {
    setLightTheme((prev) => !prev);
  };

  return (
    <div
      className={`w-64 hidden sm:block border-r transition-colors ${
        lightTheme
          ? "border-slate-200 bg-white"
          : "border-slate-800 bg-slate-900"
      }`}
    >
      <div className="flex h-screen flex-col justify-between pt-20">
        <div>
          <div className="px-4 py-6">
            <h2
              className={`text-xl font-semibold ${
                lightTheme ? "text-slate-900" : "text-slate-100"
              }`}
            >
              Loan Dashboard
            </h2>
          </div>
          <nav className="px-4">
            <ul className="space-y-2">
              <li>
                <Link
                  to="/dashboard"
                  className={`block rounded-md px-4 py-2 text-sm font-medium transition-colors ${
                    lightTheme
                      ? "text-slate-700 hover:bg-slate-100"
                      : "text-slate-300 hover:bg-slate-800"
                  }`}
                >
                  Dashboard
                </Link>
              </li>
              <li>
                <Link
                  to="/profile"
                  className={`block rounded-md px-4 py-2 text-sm font-medium transition-colors ${
                    lightTheme
                      ? "text-slate-700 hover:bg-slate-100"
                      : "text-slate-300 hover:bg-slate-800"
                  }`}
                >
                  Profile
                </Link>
              </li>
            </ul>
          </nav>
        </div>
        <div className={`border-t px-4 py-4 ${
          lightTheme ? "border-slate-200" : "border-slate-700"
        }`}>
          <div
            className={`flex items-center justify-between text-sm font-medium ${
              lightTheme ? "text-slate-700" : "text-slate-300"
            }`}
          >
            <span>Welcome, {currentUser?.name}</span>
            <button
              onClick={handleToggleTheme}
              className={`rounded-full p-2 transition-colors ${
                lightTheme ? "hover:bg-slate-200" : "hover:bg-slate-700"
              }`}
            >
              {lightTheme ? (
                <Moon className="h-5 w-5" />
              ) : (
                <SunMedium className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
