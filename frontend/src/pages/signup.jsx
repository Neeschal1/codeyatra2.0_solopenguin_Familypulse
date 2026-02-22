import React, { useState } from "react";
import signup from "../api/handlesignup";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("");

  const navigation = useNavigate()

  const handleSignup = (e) => {
     e.preventDefault();
     if (password == confirmpassword){
      signup(name, email, password, role, navigation)
     }
  }

  return (
    <div className="flex items-center justify-center bg-gray-100 w-2xl  px-4">
      <div className="w-full max-w-lg bg-white rounded-3xl shadow-xl overflow-hidden">
        {/* Header */}
        <div className="bg-[#9747ff] py-6 px-10 text-center">
          <h2 className="text-3xl font-bold text-white">Sign Up</h2>
          <p className="text-purple-100 mt-1 text-sm">
            Create your account quickly
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSignup} className="space-y-4 p-8">
          <div>
            <label className="block text-gray-700 mb-1 text-sm font-medium">
              Name
            </label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              placeholder="Enter your name"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#9747ff] focus:border-[#9747ff] text-gray-800 transition"
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-1 text-sm font-medium">
              Email
            </label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#9747ff] focus:border-[#9747ff] text-gray-800 transition"
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-1 text-sm font-medium">
              Password
            </label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="new-password"
              type="password"
              placeholder="Enter your password"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#9747ff] focus:border-[#9747ff] text-gray-800 transition"
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-1 text-sm font-medium">
              Confirm Password
            </label>
            <input
              value={confirmpassword}
              autoComplete="new-password"
              onChange={(e) => setConfirmPassword(e.target.value)}
              type="password"
              placeholder="Confirm your password"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#9747ff] focus:border-[#9747ff] text-gray-800 transition"
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-1 text-sm font-medium">
              User Type
            </label>
            <select
  value={role} // controlled component
  onChange={(e) => setRole(e.target.value)}
  className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#9747ff] focus:border-[#9747ff] text-gray-800 transition"
>
  <option value="" disabled>
    Select User Type
  </option>
  <option value="dependent">Dependent</option>
  <option value="user">User</option>
</select>
          </div>

          <button
            type="submit"
            className="w-full bg-[#9747ff] text-white py-3 rounded-xl text-lg font-semibold hover:bg-[#7d1ef9] shadow-lg transition duration-200 hover:scale-[1.02]"
          >
            Sign Up
          </button>
        </form>

        {/* Footer */}
        <div className="py-4 px-10 text-center border-t border-gray-200 text-sm text-gray-600">
          Already have an account?{" "}
          <a
            href="http://localhost:5174/login"
            className="text-[#9747ff] font-semibold hover:underline"
          >
            Login
          </a>
        </div>
      </div>
    </div>
  );
};

export default Login;
