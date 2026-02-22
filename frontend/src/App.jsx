import { useState } from 'react'
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css'
import Login from './pages/login';
import Signup from './pages/signup';
import Home from './pages/home';
import Welcome from './pages/welcome';

<<<<<<< HEAD
=======
// import Navbar from './pages/navbar';

>>>>>>> origin/main

function App() {

  return (
    <Router>
      <div className="flex w-full h-screen justify-center items-center flex-1 bg-[#EEF3F9]">
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/login" element={<Login />} />
<<<<<<< HEAD
          <Route path="/signup" element={<Signup />} />
          <Route path="/home" element={<Home />} />
        </Routes>
=======
          <Route path="/signup" element={<Signup />} />         
          <Route path="/home" element={<Home />} />
        </Routes>
        {/* <Navbar /> */}
>>>>>>> origin/main
        <welcome />
      </div>
    </Router>
  )
}

export default App