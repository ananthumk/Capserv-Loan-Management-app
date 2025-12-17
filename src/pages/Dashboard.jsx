import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import LoanTable from "../components/LoanTable";
import { getLocalData } from "../utils/storage";
import { useAuth } from "../context/AuthContext";
import InputField from "../components/InputField";

const Dashboard = () => {
  const { currentUser, lightTheme } = useAuth();
  const [loans, setLoans] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [typeFilter, setTypeFilter] = useState("All");

  useEffect(() => {
    const storedLoans = getLocalData("loans") || [];
    setLoans(storedLoans);
  }, []);

  // filtered loans without useMemo
  const filteredLoans = loans.filter((loan) => {
    const matchesSearch = loan.customerName
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "All" || loan.status === statusFilter;

    const matchesType = typeFilter === "All" || loan.type === typeFilter;

    return matchesSearch && matchesStatus && matchesType;
  });

  // unique types without useMemo
  const uniqueTypes = ["All", ...new Set(loans.map((l) => l.type))];

  return (
    <div
      className={`flex w-full min-h-screen flex-col sm:flex-row ${
        lightTheme ? "bg-slate-50 text-slate-900" : "bg-slate-950 text-slate-100"
      }`}
    >
      <Sidebar />
      <div className="flex flex-1 flex-col w-full">
        <Navbar />
        <main className="flex-1 overflow-auto">
          <div className="mx-auto max-w-6xl px-4 py-6">
            <section className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <h2
                className={`text-2xl sm:hidden font-semibold ${
                  lightTheme ? "text-slate-900" : "text-slate-100"
                }`}
              >
                Welcome back,{" "}
                <span className="font-semibold">{currentUser.name}</span>
              </h2>
              <div>
                <h2
                  className={`text-xl font-semibold ${
                    lightTheme ? "text-slate-900" : "text-slate-100"
                  }`}
                >
                  Loan Dashboard
                </h2>
                <p
                  className={`text-sm ${
                    lightTheme ? "text-slate-700" : "text-slate-400"
                  }`}
                >
                  Track and filter customer loans in real time.
                </p>
              </div>
              {currentUser && (
                <p
                  className={`text-sm ${
                    lightTheme ? "text-slate-700" : "text-slate-300"
                  }`}
                >
                  Logged in as{" "}
                  <span className="font-semibold">{currentUser.email}</span>
                </p>
              )}
            </section>

            <section
              className={`mb-5 grid gap-4 rounded-xl border p-4 md:grid-cols-3 ${
                lightTheme
                  ? "border-slate-300 bg-white/80"
                  : "border-slate-800 bg-slate-900/70"
              }`}
            >
              <div className="md:col-span-1">
                <InputField
                  label="Search by customer name"
                  name="search"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="e.g. Rahul"
                />
              </div>

              <div>
                <label
                  className={`mb-1 block text-sm font-medium ${
                    lightTheme ? "text-slate-800" : "text-slate-200"
                  }`}
                >
                  Status
                </label>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className={`w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                    lightTheme
                      ? "border-slate-300 bg-white text-slate-900"
                      : "border-slate-700 bg-slate-900 text-slate-100"
                  }`}
                >
                  <option value="All">All</option>
                  <option value="Approved">Approved</option>
                  <option value="Pending">Pending</option>
                  <option value="Rejected">Rejected</option>
                </select>
              </div>

              <div>
                <label
                  className={`mb-1 block text-sm font-medium ${
                    lightTheme ? "text-slate-800" : "text-slate-200"
                  }`}
                >
                  Loan type
                </label>
                <select
                  value={typeFilter}
                  onChange={(e) => setTypeFilter(e.target.value)}
                  className={`w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                    lightTheme
                      ? "border-slate-300 bg-white text-slate-900"
                      : "border-slate-700 bg-slate-900 text-slate-100"
                  }`}
                >
                  {uniqueTypes.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </div>
            </section>

            <LoanTable loans={filteredLoans} />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
