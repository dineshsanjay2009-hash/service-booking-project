import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import api from "../../services/api";

const LoginForm = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await api.post("/auth/login", {
        email: email.trim(),
        password: password.trim(),
      });

      // ✅ Store user data
      localStorage.setItem("userToken", res.data.access_token);
      localStorage.setItem("userId", res.data.id);
      localStorage.setItem("userEmail", res.data.email);
      localStorage.setItem("userName", res.data.name);
      localStorage.setItem("userPhone", res.data.phone); // 🔥 ADD THIS LINE

      const redirectPath = location.state?.from || "/";
      const serviceState = location.state?.service || null;

      navigate(redirectPath, {
        replace: true,
        state: serviceState ? { service: serviceState } : undefined,
      });

    } catch (err) {
      console.error("Login error:", err);
      setError("Invalid email or password");
    }
  };

  return (
    <div className="w-full max-w-md mx-auto bg-white p-6 sm:p-8 rounded-2xl shadow-lg">
      
      <h2 className="text-xl sm:text-2xl font-bold text-center mb-4 sm:mb-6">
        Login
      </h2>

      <form className="space-y-4" onSubmit={handleLogin}>
        
        <div>
          <label className="block text-sm font-medium mb-1">
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full border px-3 sm:px-4 py-2 rounded-lg text-sm sm:text-base focus:ring-2 focus:ring-blue-500"
            placeholder="Enter email"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full border px-3 sm:px-4 py-2 rounded-lg text-sm sm:text-base focus:ring-2 focus:ring-blue-500"
            placeholder="Enter password"
          />
        </div>

        {error && (
          <p className="text-red-500 text-sm">
            {error}
          </p>
        )}

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 sm:py-3 rounded-lg font-semibold text-sm sm:text-base hover:bg-blue-700 transition"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginForm;