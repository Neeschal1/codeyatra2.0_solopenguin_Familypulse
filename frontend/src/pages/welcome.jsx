import React from "react";
import { useNavigate } from "react-router-dom";

const Welcome = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 px-6 relative overflow-hidden">
      <div className="absolute top-[-80px] left-[-80px] w-72 h-72 bg-[#9747ff] opacity-5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-[-60px] right-[-60px] w-96 h-96 bg-[#7d1ef9] opacity-5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 w-full max-w-md bg-white rounded-3xl shadow-xl shadow-[#9747ff]/10 border border-gray-200 px-10 py-12 flex flex-col items-center">
        <div className="mb-6 w-16 h-16 bg-linear-to-br from-[#9747ff] to-[#7d1ef9] rounded-2xl flex items-center justify-center shadow-lg shadow-[#9747ff]/30">
          <span className="text-3xl">💜</span>
        </div>

        <div className="text-center mb-10">
          <h1 className="text-4xl font-extrabold text-[#9747ff] leading-tight tracking-tight mb-3">
            FamilyPulse
          </h1>
          <div className="w-12 h-1 bg-linear-to-r from-[#9747ff] to-[#7d1ef9] rounded-full mx-auto mb-4" />
          <p className="text-gray-500 text-base leading-relaxed">
            Stay connected and care for the people<br />who matter most.
          </p>
        </div>

        <div className="w-full space-y-3">
          <button
            onClick={() => navigate("/signup")}
            className="w-full bg-linear-to-r from-[#9747ff] to-[#7d1ef9] text-white py-3.5 rounded-xl text-base font-semibold shadow-lg shadow-[#9747ff]/30 hover:shadow-[#9747ff]/50 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
          >
            Get Started
          </button>
          <button
            onClick={() => navigate("/login")}
            className="w-full bg-white border-2 border-[#9747ff] text-[#9747ff] py-3.5 rounded-xl text-base font-semibold hover:bg-[#f5f0ff] hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
