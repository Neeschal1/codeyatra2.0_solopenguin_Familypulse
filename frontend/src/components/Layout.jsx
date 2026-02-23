import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";

const navItems = {
  USER: [
    { label: "Dashboard", icon: "🏠", view: "dashboard" },
    { label: "Dependents", icon: "👨‍👩‍👧", view: "dependents" },
    { label: "Visits", icon: "🏥", view: "visits" },
  ],
  NURSE: [
    { label: "My Visits", icon: "🩺", view: "nurse_visits" },
  ],
  ADMIN: [
    { label: "Dashboard", icon: "📊", view: "admin_dashboard" },
    { label: "Nurses", icon: "👩‍⚕️", view: "admin_nurses" },
    { label: "Visits", icon: "📋", view: "admin_visits" },
  ],
};

const Layout = ({ currentView, setView, children }) => {
  const { user, logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const items = navItems[user?.role] || [];

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-white border-r border-gray-200 shadow-xl shadow-[#9747ff]/5 flex flex-col transform transition-transform duration-300
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0 lg:static lg:flex`}
      >
        {/* Brand */}
        <div className="px-6 py-7 border-b border-gray-100">
          <h1 className="text-2xl font-extrabold text-[#9747ff] tracking-tight">FamilyPulse</h1>
          <div className="w-8 h-0.5 bg-linear-to-r from-[#9747ff] to-[#7d1ef9] rounded-full mt-1" />
          <p className="text-xs text-gray-400 mt-2 capitalize">{user?.role?.toLowerCase()} portal</p>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-4 py-6 space-y-1">
          {items.map((item) => (
            <button
              key={item.view}
              onClick={() => { setView(item.view); setSidebarOpen(false); }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200
                ${currentView === item.view
                  ? "bg-linear-to-r from-[#9747ff] to-[#7d1ef9] text-white shadow-lg shadow-[#9747ff]/30"
                  : "text-gray-500 hover:bg-[#f5f0ff] hover:text-[#9747ff]"
                }`}
            >
              <span className="text-base">{item.icon}</span>
              {item.label}
            </button>
          ))}
        </nav>

        {/* User info + logout */}
        <div className="px-4 py-5 border-t border-gray-100">
          <div className="flex items-center gap-3 mb-3 px-2">
            <div className="w-9 h-9 rounded-full bg-linear-to-br from-[#9747ff] to-[#7d1ef9] flex items-center justify-center text-white text-sm font-bold">
              {user?.email?.[0]?.toUpperCase()}
            </div>
            <div className="overflow-hidden">
              <p className="text-xs font-semibold text-gray-700 truncate">{user?.email}</p>
              <p className="text-xs text-gray-400 capitalize">{user?.role?.toLowerCase()}</p>
            </div>
          </div>
          <button
            onClick={logout}
            className="w-full flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm text-red-500 hover:bg-red-50 transition-all duration-200 font-medium"
          >
            <span>🚪</span> Logout
          </button>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-30 bg-black/30 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Topbar */}
        <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center gap-4 lg:hidden">
          <button onClick={() => setSidebarOpen(true)} className="text-[#9747ff] text-xl">☰</button>
          <h1 className="text-lg font-extrabold text-[#9747ff]">FamilyPulse</h1>
        </header>

        <main className="flex-1 p-6 lg:p-8 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
