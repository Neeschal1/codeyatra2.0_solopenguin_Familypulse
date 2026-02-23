import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register, getMe } from "../api";
import { useAuth } from "../context/AuthContext";
import { Input, Select, Alert } from "../components/UI";

const SignUp = () => {
  const navigate = useNavigate();
  const { loginUser } = useAuth();
  const [form, setForm] = useState({ name: "", email: "", password: "", confirm_password: "", role: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const set = (key) => (e) => setForm({ ...form, [key]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (form.password !== form.confirm_password) return setError("Passwords do not match");
    if (!form.role) return setError("Please select a user type");
    setLoading(true);
    try {
      const res = await register({ email: form.email, password: form.password, role: form.role, name: form.name });
      loginUser({ access: res.access, refresh: res.refresh }, { id: res.id, email: res.email, role: res.role });
      navigate("/app");
    } catch (err) {
      setError(err.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 py-10 relative overflow-hidden">
      <div className="absolute top-[-80px] left-[-80px] w-72 h-72 bg-[#9747ff] opacity-5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-[-60px] right-[-60px] w-96 h-96 bg-[#7d1ef9] opacity-5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 w-full max-w-md bg-white rounded-3xl shadow-xl shadow-[#9747ff]/10 border border-gray-200 px-10 py-12">
        <div className="text-center mb-8">
          <h2 className="text-4xl font-extrabold text-[#9747ff] tracking-tight mb-3">Create Account</h2>
          <div className="w-12 h-1 bg-linear-to-r from-[#9747ff] to-[#7d1ef9] rounded-full mx-auto mb-3" />
          <p className="text-gray-400 text-sm">Join FamilyPulse and stay connected</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Alert message={error} />
          <Input label="Name" type="text" placeholder="Enter your name" value={form.name} onChange={set("name")} required />
          <Input label="Email" type="email" placeholder="Enter your email" value={form.email} onChange={set("email")} required />
          <Input label="Password" type="password" placeholder="Enter your password" value={form.password} onChange={set("password")} required />
          <Input label="Confirm Password" type="password" placeholder="Confirm your password" value={form.confirm_password} onChange={set("confirm_password")} required />
          <Select label="User Type" value={form.role} onChange={set("role")}>
            <option value="" disabled>Select user type</option>
            <option value="USER">User</option>
            <option value="NURSE">Nurse</option>
            <option value="ADMIN">ADMIN</option>
          </Select>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-linear-to-r from-[#9747ff] to-[#7d1ef9] text-white py-3.5 rounded-xl text-base font-semibold shadow-lg shadow-[#9747ff]/30 hover:shadow-[#9747ff]/50 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed mt-2"
          >
            {loading ? "Creating account..." : "Sign Up"}
          </button>
        </form>

        <p className="mt-8 text-center text-sm text-gray-400">
          Already have an account?{" "}
          <button onClick={() => navigate("/login")} className="text-[#9747ff] font-semibold hover:underline bg-transparent border-none cursor-pointer p-0">
            Login
          </button>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
