import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { getLocalData, setLocalData } from "../utils/storage";
import InputField from "../components/InputField";
import Button from "../components/Button";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { Mail, Phone, Edit2, Save, X } from "lucide-react";
import toast from "react-hot-toast";

const Profile = () => {
  const { currentUser, lightTheme, logout } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState(null);
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const users = getLocalData("users") || [];
    const userProfile = users.find((u) => u.email === currentUser?.email);
    if (userProfile) {
      setProfile(userProfile);
      setFormData(userProfile);
    }
    setLoading(false);
  }, [currentUser?.email]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveProfile = () => {
    if (!formData.fullName || !formData.phone) {
      toast.error("Please fill in all fields");
      return;
    }

    const users = getLocalData("users") || [];
    const updatedUsers = users.map((u) =>
      u.email === currentUser?.email ? { ...u, ...formData } : u
    );
    setLocalData("users", updatedUsers);
    setProfile(formData);
    setIsEditing(false);
    toast.success("Profile updated successfully!");
  };

  const handleCancelEdit = () => {
    setFormData(profile);
    setIsEditing(false);
  };

  if (loading) {
    return (
      <div
        className={`flex min-h-screen items-center justify-center ${
          lightTheme ? "bg-slate-50" : "bg-slate-950"
        }`}
      >
        <p
          className={`text-lg ${lightTheme ? "text-slate-600" : "text-slate-400"}`}
        >
          Loading profile...
        </p>
      </div>
    );
  }

  return (
    <div
      className={`flex min-h-screen flex-col sm:flex-row ${
        lightTheme ? "bg-slate-50 text-slate-900" : "bg-slate-950 text-slate-100"
      }`}
    >
      <Sidebar />
      <div className="flex flex-1 flex-col w-full">
        <Navbar />
        <main className="flex-1 overflow-auto">
          <div className="mx-auto max-w-6xl px-4 py-6">
            <div className="mx-auto max-w-3xl">
            <div
              className={`rounded-xl border p-8 shadow-sm ${
                lightTheme
                  ? "border-slate-200 bg-white"
                  : "border-slate-800 bg-slate-900/50"
              }`}
            >
              <div className="flex flex-col items-center gap-6 sm:flex-row">
                <div
                  className={`flex h-24 w-24 items-center justify-center rounded-full text-3xl font-bold ${
                    lightTheme
                      ? "bg-indigo-100 text-indigo-700"
                      : "bg-indigo-900/30 text-indigo-400"
                  }`}
                >
                  {profile?.fullName?.charAt(0).toUpperCase() || "U"}
                </div>
                <div className="flex flex-1 flex-row items-center justify-between gap-4">
                  <div>
                    <h2
                      className={`text-2xl font-bold ${
                        lightTheme ? "text-slate-900" : "text-slate-100"
                      }`}
                    >
                      {profile?.fullName || "User"}
                    </h2>
                    <p
                      className={`mt-1 text-sm ${
                        lightTheme ? "text-slate-600" : "text-slate-400"
                      }`}
                    >
                      {profile?.email}
                    </p>
                    <p
                      className={`mt-1 text-sm ${
                        lightTheme ? "text-slate-600" : "text-slate-400"
                      }`}
                    >
                      {profile?.phone}
                    </p>
                    <span
                      className={`mt-2 inline-block rounded-full px-3 py-1 text-xs font-medium ${
                        lightTheme
                          ? "bg-green-100 text-green-700"
                          : "bg-green-900/30 text-green-400"
                      }`}
                    >
                      Active User
                    </span>
                  </div>
                  {!isEditing && (
                    <button
                      onClick={() => setIsEditing(true)}
                      className={`flex items-center gap-2 rounded-md px-4 py-2 font-medium transition ${
                        lightTheme
                          ? "bg-indigo-100 text-indigo-700 hover:bg-indigo-200"
                          : "bg-indigo-900/30 text-indigo-400 hover:bg-indigo-900/50"
                      }`}
                    >
                      <Edit2 size={16} />
                      <span className="hidden sm:inline">Edit Profile</span>
                    </button>
                  )}
                </div>
              </div>

              <div
                className={`my-6 ${
                  lightTheme ? "border-slate-200" : "border-slate-700"
                }`}
                style={{ borderTop: "1px solid currentColor" }}
              />

              <div>
                <h3
                  className={`mb-4 text-lg font-semibold ${
                    lightTheme ? "text-slate-900" : "text-slate-100"
                  }`}
                >
                  {isEditing ? "Edit Information" : "Personal Information"}
                </h3>

                {!isEditing ? (
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div
                      className={`rounded-lg p-4 ${
                        lightTheme
                          ? "bg-slate-50"
                          : "bg-slate-800/50"
                      }`}
                    >
                      <div className="flex items-center gap-2 text-sm font-medium">
                        <Mail size={16} />
                        <span>Email Address</span>
                      </div>
                      <p
                        className={`mt-1 text-sm ${
                          lightTheme ? "text-slate-900" : "text-slate-100"
                        }`}
                      >
                        {profile?.email}
                      </p>
                    </div>

                    <div
                      className={`rounded-lg p-4 ${
                        lightTheme
                          ? "bg-slate-50"
                          : "bg-slate-800/50"
                      }`}
                    >
                      <div className="flex items-center gap-2 text-sm font-medium">
                        <Phone size={16} />
                        <span>Phone Number</span>
                      </div>
                      <p
                        className={`mt-1 text-sm ${
                          lightTheme ? "text-slate-900" : "text-slate-100"
                        }`}
                      >
                        {profile?.phone}
                      </p>
                    </div>

                    <div
                      className={`rounded-lg p-4 ${
                        lightTheme
                          ? "bg-slate-50"
                          : "bg-slate-800/50"
                      }`}
                    >
                      <div className="text-sm font-medium">Full Name</div>
                      <p
                        className={`mt-1 text-sm ${
                          lightTheme ? "text-slate-900" : "text-slate-100"
                        }`}
                      >
                        {profile?.fullName}
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label
                        className={`mb-1 block text-sm font-medium ${
                          lightTheme ? "text-slate-700" : "text-slate-300"
                        }`}
                      >
                        Full Name
                      </label>
                      <InputField
                        type="text"
                        name="fullName"
                        value={formData.fullName || ""}
                        onChange={handleInputChange}
                        placeholder="Enter your full name"
                      />
                    </div>
                    <div>
                      <label
                        className={`mb-1 block text-sm font-medium ${
                          lightTheme ? "text-slate-700" : "text-slate-300"
                        }`}
                      >
                        Email Address
                      </label>
                      <InputField
                        type="email"
                        disabled
                        value={formData.email || ""}
                        placeholder="Email cannot be changed"
                      />
                    </div>
                    <div>
                      <label
                        className={`mb-1 block text-sm font-medium ${
                          lightTheme ? "text-slate-700" : "text-slate-300"
                        }`}
                      >
                        Phone Number
                      </label>
                      <InputField
                        type="tel"
                        name="phone"
                        value={formData.phone || ""}
                        onChange={handleInputChange}
                        placeholder="Enter your phone number"
                      />
                    </div>
                  </div>
                )}
              </div>

              {isEditing && (
                <div className="mt-6 flex flex-wrap gap-3">
                  <Button
                    onClick={handleSaveProfile}
                    className="flex items-center gap-2 bg-green-600 hover:bg-green-700"
                  >
                    <Save size={16} />
                    Save Changes
                  </Button>
                  <button
                    onClick={handleCancelEdit}
                    className={`flex items-center gap-2 rounded-md px-4 py-2 font-medium transition ${
                      lightTheme
                        ? "bg-slate-200 text-slate-700 hover:bg-slate-300"
                        : "bg-slate-700 text-slate-300 hover:bg-slate-600"
                    }`}
                  >
                    <X size={16} />
                    Cancel
                  </button>
                </div>
              )}
            </div>

            <div className="mt-8 space-y-4">
              
              <button
                onClick={() => {
                  logout();
                  toast.success("Logged out successfully!");
                }}
                className={`w-full rounded-lg px-4 py-3 font-medium transition ${
                  lightTheme
                    ? "bg-red-100 text-red-700 hover:bg-red-200"
                    : "bg-red-900/30 text-red-400 hover:bg-red-900/50"
                }`}
              >
                Logout
              </button>
            </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Profile;
