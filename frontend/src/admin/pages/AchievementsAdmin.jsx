import { useEffect, useState } from "react";
import api from "../../services/api";

const AchievementsAdmin = () => {
  const [achievements, setAchievements] = useState([]);
  const [form, setForm] = useState({
    title: "",
    value: "",
  });
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchAchievements();
  }, []);

  // -------------------------
  // FETCH
  // -------------------------
  const fetchAchievements = async () => {
    try {
      const res = await api.get("/achievements/");
      setAchievements(res.data);
    } catch (err) {
      console.error("Fetch achievements error", err);
    }
  };

  // -------------------------
  // SUBMIT (ADD / UPDATE)
  // -------------------------
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.title || !form.value) {
      alert("Please fill all fields");
      return;
    }

    setLoading(true);

    try {
      if (editId) {
        // UPDATE
        await api.put(`/achievements/${editId}`, form);
      } else {
        // CREATE
        await api.post("/achievements/", form);
      }

      setForm({ title: "", value: "" });
      setEditId(null);
      fetchAchievements();
    } catch (err) {
      console.error("Save achievement error", err);
    } finally {
      setLoading(false);
    }
  };

  // -------------------------
  // EDIT
  // -------------------------
  const handleEdit = (item) => {
    setForm({
      title: item.title,
      value: item.value,
    });
    setEditId(item.id);
  };

  // -------------------------
  // DELETE
  // -------------------------
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this achievement?")) return;

    try {
      await api.delete(`/achievements/${id}`);
      fetchAchievements();
    } catch (err) {
      console.error("Delete achievement error", err);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Achievements</h1>

      {/* FORM */}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-4 rounded shadow mb-6 max-w-lg"
      >
        <div className="mb-3">
          <label className="block text-sm font-medium mb-1">
            Title
          </label>
          <input
            type="text"
            className="w-full border p-2 rounded"
            value={form.title}
            onChange={(e) =>
              setForm({ ...form, title: e.target.value })
            }
            placeholder="e.g. Happy Customers"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">
            Value
          </label>
          <input
            type="text"
            className="w-full border p-2 rounded"
            value={form.value}
            onChange={(e) =>
              setForm({ ...form, value: e.target.value })
            }
            placeholder="e.g. 10K+"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          {editId ? "Update Achievement" : "Add Achievement"}
        </button>
      </form>

      {/* TABLE */}
      <div className="overflow-x-auto">
        <table className="w-full border">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 border">ID</th>
              <th className="p-3 border">Title</th>
              <th className="p-3 border">Value</th>
              <th className="p-3 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {achievements.map((item) => (
              <tr key={item.id} className="text-center">
                <td className="p-2 border">{item.id}</td>
                <td className="p-2 border">{item.title}</td>
                <td className="p-2 border">{item.value}</td>
                <td className="p-2 border space-x-2">
                  <button
                    onClick={() => handleEdit(item)}
                    className="bg-yellow-500 text-white px-3 py-1 rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="bg-red-600 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {achievements.length === 0 && (
              <tr>
                <td
                  colSpan="4"
                  className="p-4 text-center text-gray-500"
                >
                  No achievements found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AchievementsAdmin;
