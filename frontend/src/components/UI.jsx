import React from "react";

export const Card = ({ children, className = "" }) => (
  <div className={`bg-white rounded-3xl shadow-xl shadow-[#9747ff]/10 border border-gray-200 ${className}`}>
    {children}
  </div>
);

export const Badge = ({ status }) => {
  const styles = {
    SCHEDULED: "bg-blue-100 text-blue-700",
    IN_PROGRESS: "bg-yellow-100 text-yellow-700",
    COMPLETED: "bg-green-100 text-green-700",
    CANCELLED: "bg-red-100 text-red-700",
  };
  return (
    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${styles[status] || "bg-gray-100 text-gray-600"}`}>
      {status?.replace("_", " ")}
    </span>
  );
};

export const Button = ({ children, onClick, type = "button", variant = "primary", className = "", disabled = false }) => {
  const base = "px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed";
  const variants = {
    primary: "bg-gradient-to-r from-[#9747ff] to-[#7d1ef9] text-white shadow-lg shadow-[#9747ff]/30 hover:shadow-[#9747ff]/50 hover:scale-[1.02] active:scale-[0.98]",
    outline: "border-2 border-[#9747ff] text-[#9747ff] hover:bg-[#f5f0ff] hover:scale-[1.02] active:scale-[0.98]",
    danger: "bg-red-500 text-white hover:bg-red-600 hover:scale-[1.02] active:scale-[0.98]",
    ghost: "text-gray-500 hover:text-[#9747ff] hover:bg-[#f5f0ff]",
  };
  return (
    <button type={type} onClick={onClick} disabled={disabled} className={`${base} ${variants[variant]} ${className}`}>
      {children}
    </button>
  );
};

export const Input = ({ label, ...props }) => (
  <div>
    {label && <label className="block text-gray-600 text-sm font-medium mb-1.5">{label}</label>}
    <input
      {...props}
      className="w-full px-4 py-3 border border-gray-200 text-gray-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#9747ff]/40 focus:border-[#9747ff] transition-all duration-200 placeholder-gray-300 text-sm"
    />
  </div>
);

export const Select = ({ label, children, ...props }) => (
  <div>
    {label && <label className="block text-gray-600 text-sm font-medium mb-1.5">{label}</label>}
    <select
      {...props}
      className="w-full px-4 py-3 border border-gray-200 text-gray-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#9747ff]/40 focus:border-[#9747ff] transition-all duration-200 text-sm bg-white cursor-pointer"
    >
      {children}
    </select>
  </div>
);

export const Modal = ({ open, onClose, title, children }) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg p-8 relative">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-extrabold text-[#9747ff]">{title}</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-2xl leading-none">&times;</button>
        </div>
        {children}
      </div>
    </div>
  );
};

export const Alert = ({ type = "error", message }) => {
  if (!message) return null;
  const styles = {
    error: "bg-red-50 border-red-200 text-red-700",
    success: "bg-green-50 border-green-200 text-green-700",
  };
  return (
    <div className={`border rounded-xl px-4 py-3 text-sm ${styles[type]}`}>
      {message}
    </div>
  );
};

export const Spinner = () => (
  <div className="flex justify-center items-center py-12">
    <div className="w-10 h-10 border-4 border-[#9747ff]/30 border-t-[#9747ff] rounded-full animate-spin" />
  </div>
);

export const EmptyState = ({ message }) => (
  <div className="text-center py-16 text-gray-400">
    <div className="text-5xl mb-4">📭</div>
    <p className="text-sm">{message}</p>
  </div>
);
