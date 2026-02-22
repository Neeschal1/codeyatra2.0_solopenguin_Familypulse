import React from "react";
import logo from "../assets/logo.png";
import { useNavigate } from "react-router-dom";

const Welcome = () => {
  const navigation = useNavigate()

  const handleLogin = () => {
    navigation("/login")
  }


  const handleSignup = () => {
    navigation("/dep_user")
  }

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 px-4">

      <img
        src={logo}
        alt="FamilyPulse Logo"
        className="w-80 h-45 mb-6"
      />


      <div className="text-center mb-10">
        <h1 className="text-5xl font-bold text-[#9747ff] mb-4"> 
          Welcome to FamilyPulse
        </h1>
        <p className="text-gray-600 text-lg">
          Connect and care for your loved ones.
        </p>
      </div>

      <div className="w-full max-w-sm space-y-4">

        <button onClick={handleLogin} className="w-full border-2 border-[#9747ff] text-[#9747ff] py-3 rounded-lg text-lg font-semibold transition hover:bg-[#9747ff] duration-400 hover:text-white">
          Login
        </button>

        <button onClick={handleSignup} className="w-full bg-[#9747ff] text-white py-3 rounded-lg text-lg font-semibold border hover:bg-[#7d1ef9] duration-400 border-gray-300  transition">
          Sign Up
        </button>

      </div>

    </div>
  );
};

export default Welcome;