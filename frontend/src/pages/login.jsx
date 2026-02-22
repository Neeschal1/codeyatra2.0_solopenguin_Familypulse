import React from "react";

const Login = () => {
  return (
    <div className="flex items-center justify-center bg-gray-100 px-4 py-10">
      
      <div className="w-full max-w-xl bg-white shadow-xl rounded-3xl p-10">
        
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Login
        </h2>

        <form className="space-y-6">
          
          <div>
            <label className="block text-gray-600 mb-2 text-sm font-medium">
              Email
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-3 border border-gray-300 text-black rounded-xl focus:outline-none focus:ring-2 focus:ring-[#9747ff] focus:border-[#9747ff] transition"
            />
          </div>

          <div>
            <label className="block text-gray-600 mb-2 text-sm font-medium">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter your password"
              className="w-full px-4 py-3 border border-gray-300 text-black rounded-xl focus:outline-none focus:ring-2 focus:ring-[#9747ff] focus:border-[#9747ff] transition"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#9747ff] text-white py-3 rounded-xl text-lg font-semibold hover:bg-[#7d1ef9] transition shadow-md hover:shadow-lg"
          >
            Login
          </button>

        </form>

        <div className="mt-8 text-center text-sm text-gray-600">
          Don’t have an account?{" "}
          <a href="http://localhost:5174/signup" className="text-[#8f4de6] font-semibold hover:underline">
            Sign up
          </a>
        </div>

      </div>

    </div>
  );
};

export default Login;