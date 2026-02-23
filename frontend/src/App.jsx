import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import Layout from "./components/Layout";
import Welcome from "./pages/Welcome";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import UserDashboard from "./pages/user/Dashboard";
import Dependents from "./pages/user/Dependents";
import Visits from "./pages/user/Visits";
import NurseVisits from "./pages/nurse/NurseVisits";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminNurses from "./pages/admin/AdminNurses";
import AdminVisits from "./pages/admin/AdminVisits";
import { Spinner } from "./components/UI";

const defaultView = {
  USER: "dashboard",
  NURSE: "nurse_visits",
  ADMIN: "admin_dashboard",
};

const AppShell = () => {
  const { user, loading } = useAuth();
  const [view, setView] = useState(null);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <Spinner />
      </div>
    );
  }

  if (!user) return <Navigate to="/login" replace />;

  const currentView = view || defaultView[user.role];

  const renderView = () => {
    switch (currentView) {
      case "dashboard": return <UserDashboard setView={setView} />;
      case "dependents": return <Dependents />;
      case "visits": return <Visits />;
      case "nurse_visits": return <NurseVisits />;
      case "admin_dashboard": return <AdminDashboard setView={setView} />;
      case "admin_nurses": return <AdminNurses />;
      case "admin_visits": return <AdminVisits />;
      default: return <UserDashboard setView={setView} />;
    }
  };

  return (
    <Layout currentView={currentView} setView={setView}>
      {renderView()}
    </Layout>
  );
};

const PublicRoute = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <Spinner />
      </div>
    );
  }
  if (user) return <Navigate to="/app" replace />;
  return children;
};

const Routes_ = () => (
  <Routes>
    <Route path="/" element={<PublicRoute><Welcome /></PublicRoute>} />
    <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
    <Route path="/signup" element={<PublicRoute><SignUp /></PublicRoute>} />
    <Route path="/app" element={<AppShell />} />
    <Route path="*" element={<Navigate to="/" replace />} />
  </Routes>
);

const App = () => (
  <BrowserRouter>
    <AuthProvider>
      <Routes_ />
    </AuthProvider>
  </BrowserRouter>
);

export default App;
