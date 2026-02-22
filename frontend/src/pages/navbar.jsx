import React from 'react';
import logo from '../assets/logo.png';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <nav className="w-full bg-white shadow-md px-6 py-4 flex justify-between items-center">
      
      <div className="flex items-center">
        <img src={logo} alt="FamilyPulse Logo" className="h-10 w-auto object-contain" />
        <span className="ml-2 font-bold text-xl text-[#9747ff]">FamilyPulse</span>
      </div>

      {/* Links */}
      <div className="space-x-4">
        <button
          onClick={() => navigate('/login')}
          className="px-4 py-2 border border-[#9747ff] text-[#9747ff] rounded-lg hover:bg-[#9747ff] hover:text-white transition duration-300"
        >
          Login
        </button>
        <button
          onClick={() => navigate('/signup')}
          className="px-4 py-2 bg-[#9747ff] text-white rounded-lg hover:bg-[#7d1ef9] transition duration-300"
        >
          Sign Up
        </button>
      </div>

    </nav>
  );
};

export default Navbar;