import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";

const LoginForm = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post("/auth/login", {
        email,
        password,
      });

      // 🔥 Store userId in localStorage
      localStorage.setItem("userId", res.data.id);
      localStorage.setItem("userEmail", res.data.email);

      // Redirect to home
      navigate("/");

    } catch (err) {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg">
      <h2 className="text-2xl font-bold text-center mb-6">Login</h2>

      <form className="space-y-4" onSubmit={handleLogin}>
        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full border px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="Enter email"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full border px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="Enter password"
          />
        </div>

        {error && (
          <p className="text-red-500 text-sm">{error}</p>
        )}

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
