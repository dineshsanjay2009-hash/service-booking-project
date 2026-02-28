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

  const fetchPackages = async () => {
    try {
      const res = await api.get("/packages/");
      setPackages(res.data);
    } catch (err) {
      console.error("Fetch packages error", err);
    }
  };

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

  const handleEdit = (pkg) => {
    setForm({
      title: pkg.title,
      price: pkg.price,
      features: pkg.features.join(", "),
    });
    setEditId(pkg.id);
  };

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
    <div className="p-4 sm:p-6">
      <h1 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">
        Service Packages
      </h1>

      {/* FORM */}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-4 sm:p-6 rounded shadow mb-6 w-full max-w-full sm:max-w-xl"
      >
        <div className="mb-3">
          <label className="block text-sm font-medium mb-1">
            Package Title
          </label>
          <input
            className="w-full border p-2 sm:p-3 rounded text-sm sm:text-base"
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
            className="w-full border p-2 sm:p-3 rounded text-sm sm:text-base"
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
            className="w-full border p-2 sm:p-3 rounded text-sm sm:text-base"
            rows="3"
            value={form.features}
            onChange={(e) =>
              setForm({ ...form, features: e.target.value })
            }
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded w-full sm:w-auto text-sm sm:text-base"
        >
          {editId ? "Update Package" : "Add Package"}
        </button>
      </form>

      {/* TABLE */}
      <div className="overflow-x-auto rounded-lg border">
        <table className="min-w-[500px] w-full text-xs sm:text-sm md:text-base">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 sm:p-3 border">ID</th>
              <th className="p-2 sm:p-3 border">Title</th>
              <th className="p-2 sm:p-3 border">Price</th>
              <th className="p-2 sm:p-3 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {packages.map((pkg) => (
              <tr key={pkg.id} className="text-center">
                <td className="p-2 border whitespace-nowrap">
                  {pkg.id}
                </td>

                <td className="p-2 border break-words">
                  {pkg.title}
                </td>

                <td className="p-2 border whitespace-nowrap">
                  ₹{pkg.price}
                </td>

                <td className="p-2 border">
                  <div className="flex flex-col sm:flex-row gap-2 justify-center">
                    <button
                      onClick={() => handleEdit(pkg)}
                      className="bg-yellow-500 text-white px-3 py-1 rounded text-xs sm:text-sm w-full sm:w-auto"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(pkg.id)}
                      className="bg-red-600 text-white px-3 py-1 rounded text-xs sm:text-sm w-full sm:w-auto"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}

            {packages.length === 0 && (
              <tr>
                <td
                  colSpan="4"
                  className="p-4 text-center text-gray-500 text-sm"
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