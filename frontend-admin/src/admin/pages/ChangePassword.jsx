import { useState } from "react";
import api from "../../services/api";

export default function ChangePassword() {
  const [current, setCurrent] = useState("");
  const [newPass, setNewPass] = useState("");
  const [confirm, setConfirm] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPass !== confirm) {
      alert("Passwords do not match");
      return;
    }

    try {
      await api.put("/admin/change-password", {
        current_password: current,
        new_password: newPass,
      });

      alert("Password updated successfully");

      setCurrent("");
      setNewPass("");
      setConfirm("");
    } catch (err) {
      alert(err.response?.data?.detail || "Error updating password");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-[70vh] px-4">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md">
        
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Change Password
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            type="password"
            placeholder="Current Password"
            value={current}
            onChange={(e) => setCurrent(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded-lg"
          />

          <input
            type="password"
            placeholder="New Password"
            value={newPass}
            onChange={(e) => setNewPass(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded-lg"
          />

          <input
            type="password"
            placeholder="Confirm New Password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded-lg"
          />

          <button className="w-full bg-blue-600 text-white py-2 rounded-lg">
            Update Password
          </button>

        </form>

      </div>
    </div>
  );
}