import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
<<<<<<< HEAD
=======

>>>>>>> 131bc95d8888b0cbf53aec3d39db0c469ac1d6c1
import Login from "./pages/login";
import Signup from "./pages/signup";
import Home from "./pages/home";
import Welcome from "./pages/welcome";
import Dashboard from "./pages/dashboard";

function App() {
  return (
    <Router>
      <div className="flex w-full h-screen justify-center items-center bg-[#EEF3F9]">
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/home" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;