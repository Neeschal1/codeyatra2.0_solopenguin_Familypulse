import React from "react";
import logo from "../assets/logo.png";
import { useNavigate } from "react-router-dom";

const Welcome = () => {
<<<<<<< HEAD
  const navigation = useNavigate()

  const handleLogin = () => {
    navigation("/login")
  }


  const handleSignup = () => {
    navigation("/signup")
  }

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 px-4">

      <img
        src={logo}
        alt="FamilyPulse Logo"
        className="w-80 h-45 mb-6"
      />


      <div className="text-center mb-10">
        <h1 className="text-5xl font-bold text-blue-600 mb-4">
          Welcome to FamilyPulse
        </h1>
        <p className="text-gray-600 text-lg">
          Connect and care for your loved ones.
        </p>
      </div>

      <div className="w-full max-w-sm space-y-4">

        <button onClick={handleLogin} className="w-full border-2 border-blue-600 text-blue-600 py-3 rounded-lg text-lg font-semibold transition hover:bg-black duration-400 hover:text-white">
          Login
        </button>

        <button onClick={handleSignup} className="w-full bg-blue-600 text-white py-3 rounded-lg text-lg font-semibold border hover:bg-blue-800 duration-400 border-gray-300  transition">
          Sign Up
        </button>

      </div>

=======
  const navigation = useNavigate();

  const handleLogin = () => navigation("/login");
  const handleSignup = () => navigation("/signup");

  return (
    <div className="min-h-screen flex flex-col justify-center items-center relative overflow-hidden bg-gray-100 px-6">

      {/* Subtle background decorative blobs */}
      <div className="absolute -top-20 -left-20 w-72 h-72 bg-[#9747ff] opacity-5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-60 -right-15 w-96 h-96 bg-[#7d1ef9] opacity-5 rounded-full blur-3xl pointer-events-none" />

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
          <h1 className="text-4xl font-extrabold text-[#9747ff] leading-tight tracking-tight mb-3">
            FamilyPulse
          </h1>
          <div className="w-12 h-1 bg-linear-to-r from-[#9747ff] to-[#7d1ef9] rounded-full mx-auto mb-4" />
          <p className="text-gray-500 text-base leading-relaxed">
            Stay connected and care for the people<br />who matter most.
          </p>
        </div>

        {/* Buttons */}
        <div className="w-full space-y-3">
          <button
            onClick={handleSignup}
            className="w-full bg-linear-to-r from-[#9747ff] to-[#7d1ef9] text-white py-3.5 rounded-xl text-base font-semibold shadow-lg shadow-[#9747ff]/30 hover:shadow-[#9747ff]/50 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
          >
            Sign Up
          </button>

          <button
            onClick={handleLogin}
            className="w-full bg-white border-2 border-[#9747ff] text-[#9747ff] py-3.5 rounded-xl text-base font-semibold hover:bg-[#f5f0ff] hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
          >
            Login
          </button>
        </div>

        {/* Footer note */}
        <p className="mt-8 text-xs text-gray-400 text-center">
          By continuing, you agree to our{" "}
          <span className="text-[#9747ff] cursor-pointer hover:underline">Terms</span>{" "}
          &{" "}
          <span className="text-[#9747ff] cursor-pointer hover:underline">Privacy Policy</span>.
        </p>
      </div>
>>>>>>> origin/main
    </div>
  );
};

export default Welcome;