import React from 'react'
import { useNavigate } from "react-router-dom";


const Dep_user = () => {
      const navigation = useNavigate()

      const handleDependent = () => {
    navigation("/signup")
  }


  const handleUser = () => {
    navigation("/signup")
  }
    
    return (
        <div className="min-h-screen flex gap-3 justify-center items-center bg-gray-100 px-4">
            <button onClick={handleDependent} className="w-full border-2 border-[#9747ff] text-[#9747ff] py-3 rounded-lg text-lg font-semibold transition hover:bg-[#9747ff] duration-400 hover:text-white">
                Dependent
            </button>

            <button onClick={handleUser} className="w-full bg-[#9747ff] text-white py-3 rounded-lg text-lg font-semibold border hover:bg-[#7d1ef9] duration-400 border-gray-300  transition">
                User
            </button>
        </div>

    )
}

export default Dep_user;
