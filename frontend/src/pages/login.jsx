import React from "react";

const Login = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      
      <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8">
        
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Login
        </h2>

        <form className="space-y-5">
          
          <div>
            <label className="block text-gray-600 mb-2 text-sm">
              Email
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-1 border text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-gray-600 mb-2 text-sm">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter your password"
              className="w-full px-4 py-1 border  text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* <div className="text-right">
            <a
              href="#"
              className="text-sm text-[#9747ff] hover:underline"
            >
              Forgot password?
            </a>
          </div> */}

          <button
            type="submit"
            className="w-full bg-[#9747ff] text-white py-3 rounded-lg text-lg font-semibold hover:bg-[#7d1ef9] transition"
          >
            Login
          </button>

        </form>

        <div className="mt-6 text-center text-sm text-gray-600">
          Don’t have an account?{" "}
          <a href="http://localhost:5174/dep_user" className="text-[#8f4de6] font-semibold hover:underline">
            Sign up
          </a>
       
        </div>

      </div>

    </div>
  );
};

export default Login;