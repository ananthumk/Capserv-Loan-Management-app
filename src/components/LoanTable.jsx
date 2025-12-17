import { useAuth } from "../context/AuthContext";

const LoanTable = ({ loans }) => {
  const { lightTheme } = useAuth();

  return (
    <div className={`rounded-lg border overflow-hidden ${
      lightTheme
        ? "border-slate-300 bg-white"
        : "border-slate-800 bg-slate-900/70"
    }`}>
      <div className="overflow-x-auto">
      <table className="min-w-full text-left text-sm">
        <thead className={lightTheme ? "bg-slate-100" : "bg-slate-900"}>
          <tr>
            <th className={`px-4 py-3 font-medium ${
              lightTheme ? "text-slate-900" : "text-slate-300"
            }`}>ID</th>
            <th className={`px-4 py-3 font-medium ${
              lightTheme ? "text-slate-900" : "text-slate-300"
            }`}>
              Customer Name
            </th>
            <th className={`px-4 py-3 font-medium ${
              lightTheme ? "text-slate-900" : "text-slate-300"
            }`}>Amount</th>
            <th className={`px-4 py-3 font-medium ${
              lightTheme ? "text-slate-900" : "text-slate-300"
            }`}>Type</th>
            <th className={`px-4 py-3 font-medium ${
              lightTheme ? "text-slate-900" : "text-slate-300"
            }`}>Status</th>
            <th className={`px-4 py-3 font-medium ${
              lightTheme ? "text-slate-900" : "text-slate-300"
            }`}>Date</th>
          </tr>
        </thead>
        <tbody>
          {loans.length === 0 ? (
            <tr>
              <td
                colSpan={6}
                className={`px-4 py-6 text-center ${
                  lightTheme ? "text-slate-600" : "text-slate-400"
                }`}
              >
                No loans match your filters.
              </td>
            </tr>
          ) : (
            loans.map((loan) => (
              <tr
                key={loan.id}
                className={`border-t ${
                  lightTheme
                    ? "border-slate-200 hover:bg-slate-50"
                    : "border-slate-800 hover:bg-slate-800/60"
                }`}
              >
                <td className={`px-4 py-3 ${
                  lightTheme ? "text-slate-900" : "text-slate-200"
                }`}>{loan.id}</td>
                <td className={`px-4 py-3 ${
                  lightTheme ? "text-slate-900" : "text-slate-200"
                }`}>
                  {loan.customerName}
                </td>
                <td className={`px-4 py-3 ${
                  lightTheme ? "text-slate-900" : "text-slate-200"
                }`}>
                  ₹{loan.amount.toLocaleString()}
                </td>
                <td className={`px-4 py-3 ${
                  lightTheme ? "text-slate-900" : "text-slate-200"
                }`}>{loan.type}</td>
                <td className="px-4 py-3">
                  <span
                    className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${
                      loan.status === "Approved"
                        ? lightTheme ? "bg-green-100 text-green-800" : "bg-emerald-500/10 text-emerald-400"
                        : loan.status === "Rejected"
                        ? lightTheme ? "bg-red-100 text-red-800" : "bg-rose-500/10 text-rose-400"
                        : lightTheme ? "bg-yellow-100 text-yellow-800" : "bg-amber-500/10 text-amber-400"
                    }`}
                  >
                    {loan.status}
                  </span>
                </td>
                <td className={`px-4 py-3 ${
                  lightTheme ? "text-slate-700" : "text-slate-300"
                }`}>{loan.date}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      </div>
    </div>
  );
};

export default LoanTable;
