import { useEffect, useState } from "react";
import api from "../../services/api";

const PackagesAdmin = () => {
  const [packages, setPackages] = useState([]);
  const [form, setForm] = useState({
    title: "",
    price: "",
    features: "",
  });
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchPackages();
  }, []);

  // -------------------------
  // FETCH
  // -------------------------
  const fetchPackages = async () => {
    try {
      const res = await api.get("/packages/");
      setPackages(res.data);
    } catch (err) {
      console.error("Fetch packages error", err);
    }
  };

  // -------------------------
  // SUBMIT (ADD / UPDATE)
  // -------------------------
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.title || !form.price || !form.features) {
      alert("Fill all fields");
      return;
    }

    const payload = {
      title: form.title,
      price: Number(form.price),
      features: form.features.split(",").map(f => f.trim()),
    };

    try {
      if (editId) {
        await api.put(`/packages/${editId}`, payload);
      } else {
        await api.post("/packages/", payload);
      }

      setForm({ title: "", price: "", features: "" });
      setEditId(null);
      fetchPackages();
    } catch (err) {
      console.error("Save package error", err);
    }
  };

  // -------------------------
  // EDIT
  // -------------------------
  const handleEdit = (pkg) => {
    setForm({
      title: pkg.title,
      price: pkg.price,
      features: pkg.features.join(", "),
    });
    setEditId(pkg.id);
  };

  // -------------------------
  // DELETE
  // -------------------------
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this package?")) return;

    try {
      await api.delete(`/packages/${id}`);
      fetchPackages();
    } catch (err) {
      console.error("Delete package error", err);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Service Packages</h1>

      {/* FORM (same style as carousel) */}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-4 rounded shadow mb-6 max-w-xl"
      >
        <div className="mb-3">
          <label className="block text-sm font-medium mb-1">
            Package Title
          </label>
          <input
            className="w-full border p-2 rounded"
            value={form.title}
            onChange={(e) =>
              setForm({ ...form, title: e.target.value })
            }
          />
        </div>

        <div className="mb-3">
          <label className="block text-sm font-medium mb-1">
            Price
          </label>
          <input
            type="number"
            className="w-full border p-2 rounded"
            value={form.price}
            onChange={(e) =>
              setForm({ ...form, price: e.target.value })
            }
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">
            Features (comma separated)
          </label>
          <textarea
            className="w-full border p-2 rounded"
            rows="3"
            value={form.features}
            onChange={(e) =>
              setForm({ ...form, features: e.target.value })
            }
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          {editId ? "Update Package" : "Add Package"}
        </button>
      </form>

      {/* TABLE (same as carousel) */}
      <div className="overflow-x-auto">
        <table className="w-full border">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 border">ID</th>
              <th className="p-3 border">Title</th>
              <th className="p-3 border">Price</th>
              <th className="p-3 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {packages.map((pkg) => (
              <tr key={pkg.id} className="text-center">
                <td className="p-2 border">{pkg.id}</td>
                <td className="p-2 border">{pkg.title}</td>
                <td className="p-2 border">₹{pkg.price}</td>
                <td className="p-2 border space-x-2">
                  <button
                    onClick={() => handleEdit(pkg)}
                    className="bg-yellow-500 text-white px-3 py-1 rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(pkg.id)}
                    className="bg-red-600 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}

            {packages.length === 0 && (
              <tr>
                <td
                  colSpan="4"
                  className="p-4 text-center text-gray-500"
                >
                  No packages found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PackagesAdmin;
