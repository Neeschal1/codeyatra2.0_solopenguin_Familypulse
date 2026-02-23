import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login, getMe } from "../api";
import { useAuth } from "../context/AuthContext";
import { Input, Button, Alert } from "../components/UI";

const Login = () => {
  const navigate = useNavigate();
  const { loginUser } = useAuth();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const tokens = await login(form.email, form.password);
      const userData = await getMe(tokens.access);
      loginUser(tokens, userData);
      navigate("/app");
    } catch (err) {
      setError(err.message || "Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 relative overflow-hidden">
      <div className="absolute top-[-80px] left-[-80px] w-72 h-72 bg-[#9747ff] opacity-5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-[-60px] right-[-60px] w-96 h-96 bg-[#7d1ef9] opacity-5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 w-full max-w-md bg-white rounded-3xl shadow-xl shadow-[#9747ff]/10 border border-gray-200 px-10 py-12">
        <div className="text-center mb-8">
          <h2 className="text-4xl font-extrabold text-[#9747ff] tracking-tight mb-3">Welcome Back</h2>
          <div className="w-12 h-1 bg-linear-to-r from-[#9747ff] to-[#7d1ef9] rounded-full mx-auto mb-3" />
          <p className="text-gray-400 text-sm">Log in to your FamilyPulse account</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <Alert message={error} />
          <Input label="Email" type="email" placeholder="Enter your email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
          <Input label="Password" type="password" placeholder="Enter your password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} required />
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-linear-to-r from-[#9747ff] to-[#7d1ef9] text-white py-3.5 rounded-xl text-base font-semibold shadow-lg shadow-[#9747ff]/30 hover:shadow-[#9747ff]/50 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed mt-1"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="mt-8 text-center text-sm text-gray-400">
          Don't have an account?{" "}
          <button onClick={() => navigate("/signup")} className="text-[#9747ff] font-semibold hover:underline bg-transparent border-none cursor-pointer p-0">
            Sign up
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;