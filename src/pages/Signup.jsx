import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import InputField from "../components/InputField";
import Button from "../components/Button";
import { getLocalData, setLocalData } from "../utils/storage";
import { useAuth } from "../context/AuthContext";

const Signup = () => {
  const navigate = useNavigate();
  const { lightTheme } = useAuth();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    conformPassword: "",
    phone: "",
    city: "",
  });

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { name, email, password, conformPassword, phone, city } = form;

    if (!name || !email || !password || !conformPassword || !phone || !city) {
      toast.error("Please fill all fields");
      return;
    }

    const users = getLocalData("users") || [];
    const exists = users.find((u) => u.email === email);

    if (exists) {
      toast.error("Email already registered");
      return;
    }

    if (conformPassword !== password) {
      toast.error("Passwords do not match");
      return;
    }
  
    if (phone.length > 10){
      toast.error("Invalid phone number")
      return;
    }

    const newUser = {
      id: Date.now(),
      name,
      email,
      password,
      phone,
      city,
      otp: "123456", // default OTP for new users
    };

    const updated = [...users, newUser];
    setLocalData("users", updated);
    toast.success("Signup successful! Please login.");
    navigate("/login");
  };

  return (
    <div className={`flex min-h-screen  items-center justify-center px-4 ${
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
          Create an account
        </h1>
        <p className={`mb-6 text-sm ${
          lightTheme ? "text-slate-600" : "text-slate-400"
        }`}>
          Sign up to access the loan management dashboard.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <InputField
            label="Name"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Rahul Sharma"
          />
          <InputField
            label="Email"
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="you@example.com"
          />
          <InputField
            label="Password"
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="********"
          />
          <InputField
            label="ConformPassword"
            type="password"
            name="conformPassword"
            value={form.conformPassword}
            onChange={handleChange}
            placeholder="********"
          />
          <InputField
            label="Phone"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            placeholder="9876543210"
          />
          <InputField
            label="City"
            name="city"
            value={form.city}
            onChange={handleChange}
            placeholder="Mumbai"
          />

          <Button type="submit" className="w-full">
            Sign up
          </Button>
        </form>

        <p className={`mt-4 text-center text-sm ${
          lightTheme ? "text-slate-600" : "text-slate-400"
        }`}>
          Already have an account?{" "}
          <Link
            to="/login"
            className={`font-medium ${
              lightTheme
                ? "text-indigo-600 hover:text-indigo-700"
                : "text-indigo-400 hover:text-indigo-300"
            }`}
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
