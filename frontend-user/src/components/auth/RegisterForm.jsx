import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";

const RegisterForm = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");   // ✅ NEW
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    // ✅ PHONE VALIDATION (same style as booking)
    if (!/^[0-9]{10}$/.test(phone)) {
      setError("Phone number must be exactly 10 digits");
      return;
    }

    try {
      await api.post("/auth/register", {
        name,
        email,
        phone,      // ✅ SEND PHONE
        password,
      });

      navigate("/login");
    } catch (err) {
      setError("Registration failed");
    }
  };

  return (
    <div className="w-full max-w-md mx-auto bg-white p-6 sm:p-8 rounded-2xl shadow-lg">
      
      <h2 className="text-xl sm:text-2xl font-bold text-center mb-4 sm:mb-6">
        Register
      </h2>

      <form className="space-y-4" onSubmit={handleRegister}>
        
        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border px-3 sm:px-4 py-2 rounded-lg text-sm sm:text-base"
          required
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border px-3 sm:px-4 py-2 rounded-lg text-sm sm:text-base"
          required
        />

        {/* ✅ PHONE FIELD ADDED */}
        <input
          type="tel"
          maxLength={10}
          placeholder="Phone Number"
          value={phone}
          onChange={(e) => {
            const value = e.target.value.replace(/\D/g, "");
            setPhone(value);
          }}
          className="w-full border px-3 sm:px-4 py-2 rounded-lg text-sm sm:text-base"
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border px-3 sm:px-4 py-2 rounded-lg text-sm sm:text-base"
          required
        />

        {error && (
          <p className="text-red-500 text-sm">
            {error}
          </p>
        )}

        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 sm:py-3 rounded-lg font-semibold text-sm sm:text-base hover:bg-green-700 transition"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default RegisterForm;