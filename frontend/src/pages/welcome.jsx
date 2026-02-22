import React from "react";
import logo from "../assets/logo.png";
import { useNavigate } from "react-router-dom";

const Welcome = () => {
  const navigation = useNavigate();

  const handleLogin = () => navigation("/login");
  const handleSignup = () => navigation("/signup");

  return (
    <div className="min-h-screen flex flex-col justify-center items-center relative overflow-hidden bg-gray-100 px-6">

      {/* Background blobs */}
      <div className="absolute top-[-80px] left-[-80px] w-72 h-72 bg-[#9747ff] opacity-5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-[-60px] right-[-60px] w-96 h-96 bg-[#7d1ef9] opacity-5 rounded-full blur-3xl pointer-events-none" />

      {/* Card */}
      <div className="relative z-10 w-full max-w-md bg-white rounded-3xl shadow-xl shadow-[#9747ff]/10 border border-gray-200 px-10 py-12 flex flex-col items-center">

        {/* Logo */}
        <div className="mb-6 p-3 bg-[#f0e6ff] rounded-2xl shadow-inner">
          <img
            src={logo}
            alt="FamilyPulse Logo"
            className="w-24 h-24 object-contain"
          />
        </div>

        {/* Heading */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-extrabold text-[#9747ff] mb-3">
            FamilyPulse
          </h1>
          <p className="text-gray-500 text-base">
            Stay connected and care for the people who matter most.
          </p>
        </div>

        {/* Buttons */}
        <div className="w-full space-y-3">
          <button
            onClick={handleSignup}
            className="w-full bg-linear-to-r from-[#9747ff] to-[#7d1ef9] text-white py-3.5 rounded-xl font-semibold"
          >
            Sign Up
          </button>

          <button
            onClick={handleLogin}
            className="w-full bg-white border-2 border-[#9747ff] text-[#9747ff] py-3.5 rounded-xl font-semibold"
          >
            Login
          </button>
        </div>

        <p className="mt-8 text-xs text-gray-400 text-center">
          By continuing, you agree to our{" "}
          <span className="text-[#9747ff] cursor-pointer hover:underline">Terms</span>{" "}
          &{" "}
          <span className="text-[#9747ff] cursor-pointer hover:underline">Privacy Policy</span>.
        </p>

      </div>
    </div>
  );
};

export default Welcome;