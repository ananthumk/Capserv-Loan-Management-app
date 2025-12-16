import { useAuth } from "../context/AuthContext";

const InputField = ({
  label,
  type = "text",
  name,
  value,
  onChange,
  placeholder,
}) => {
  const { lightTheme } = useAuth();

  return (
    <div className="space-y-1">
      {label && (
        <label className={`block text-sm font-medium ${
          lightTheme ? "text-slate-800" : "text-slate-200"
        }`}>
          {label}
        </label>
      )}
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
          lightTheme
            ? "border-slate-300 bg-white text-slate-900 placeholder:text-slate-400"
            : "border-slate-700 bg-slate-900 text-slate-100 placeholder:text-slate-500"
        }`}
      />
    </div>
  );
};

export default InputField;
