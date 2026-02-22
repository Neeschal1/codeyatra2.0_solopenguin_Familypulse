import React, { useState } from "react";
import login from "../api/handlelogin";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigation = useNavigate()

  const handleLogin = (e) => {
    e.preventDefault();
    login(email, password, navigation)
  };

  return (
    <div className="flex items-center justify-center bg-gray-100 px-4 py-10 min-h-screen">
      <div className="w-full max-w-lg bg-white shadow-xl rounded-3xl overflow-hidden">
        
        {/* Header */}
        <div className="bg-[#9747ff] py-6 px-8 text-center">
          <h2 className="text-3xl font-bold text-white">Login</h2>
          <p className="text-purple-100 mt-1 text-sm">
            Enter your credentials to continue
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-4 p-8">
          
          <div>
            <label className="block text-gray-700 mb-1 text-sm font-medium">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              autoComplete="email"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#9747ff] focus:border-[#9747ff] text-gray-800 transition"
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-1 text-sm font-medium">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              autoComplete="current-password"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#9747ff] focus:border-[#9747ff] text-gray-800 transition"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#9747ff] text-white py-3 rounded-xl text-lg font-semibold hover:bg-[#7d1ef9] shadow-lg transition duration-200 hover:scale-[1.02]"
          >
            Login
          </button>
        </form>

        {/* Footer */}
        <div className="py-4 px-8 text-center border-t border-gray-200 text-sm text-gray-600">
          Don’t have an account?{" "}
          <a
            href="http://localhost:5174/signup"
            className="text-[#9747ff] font-semibold hover:underline"
          >
            Sign Up
          </a>
        </div>
      </div>
    </div>
  );
};

export default Login;