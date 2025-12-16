const Button = ({ children, className = "", ...props }) => {
  return (
    <button
      className={`inline-flex items-center justify-center rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
