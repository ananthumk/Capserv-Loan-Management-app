import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import InputField from "../components/InputField";
import Button from "../components/Button";
import { getLocalData } from "../utils/storage";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const navigate = useNavigate();
  const { login, lightTheme } = useAuth();

  const [step, setStep] = useState("CREDENTIALS"); // or "OTP"
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otpInput, setOtpInput] = useState("");
  const [tempUser, setTempUser] = useState(null);

  const handleLogin = (e) => {
    e.preventDefault();
    const users = getLocalData("users") || [];
    const user = users.find(
      (u) => u.email === email.trim() && u.password === password
    );

    if (!user) {
      toast.error("Invalid credentials");
      return;
    }

    setTempUser(user);
    setStep("OTP");
    toast.success("OTP sent to your registered mobile!");
  };

  const handleVerifyOtp = (e) => {
    e.preventDefault();
    if (!tempUser) return;

    if (otpInput.trim() === tempUser.otp) {
      login(tempUser);
      toast.success("Login successful!");
      navigate("/dashboard");
    } else {
      toast.error("Invalid OTP");
    }
  };

  return (
    <div className={`flex min-h-screen items-center justify-center px-4 ${
      lightTheme ? "bg-slate-50" : "bg-slate-950"
    }`}>
      <div className={`w-full max-w-md rounded-xl border p-6 shadow-lg ${
        lightTheme
          ? "border-slate-300 bg-white"
          : "border-slate-800 bg-slate-900/80"
      }`}>
        <h1 className={`mb-1 text-xl font-semibold ${
          lightTheme ? "text-slate-900" : "text-slate-100"
        }`}>
          Loan Dashboard Login
        </h1>
        <p className={`mb-6 text-sm ${
          lightTheme ? "text-slate-600" : "text-slate-400"
        }`}>
          Use your email and password to login. OTP is required to complete
          authentication.
        </p>

        {step === "CREDENTIALS" ? (
          <form onSubmit={handleLogin} className="space-y-4">
            <InputField
              label="Email"
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
            />
            <InputField
              label="Password"
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="********"
            />
            <Button type="submit" className="w-full">
              Continue
            </Button>
          </form>
        ) : (
          <form onSubmit={handleVerifyOtp} className="space-y-4">
            <InputField
              label="Enter OTP"
              name="otp"
              value={otpInput}
              onChange={(e) => setOtpInput(e.target.value)}
              placeholder="6-digit OTP"
            />
            <Button type="submit" className="w-full">
              Verify OTP
            </Button>
            <button
              type="button"
              onClick={() => setStep("CREDENTIALS")}
              className={`w-full text-center text-sm ${
                lightTheme
                  ? "text-slate-600 hover:text-slate-800"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              Back to login
            </button>
          </form>
        )}

        <p className={`mt-4 text-center text-sm ${
          lightTheme ? "text-slate-600" : "text-slate-400"
        }`}>
          New here?{" "}
          <Link
            to="/signup"
            className={`font-medium ${
              lightTheme
                ? "text-indigo-600 hover:text-indigo-700"
                : "text-indigo-400 hover:text-indigo-300"
            }`}
          >
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
};


export default Login;
