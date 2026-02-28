import { useEffect, useState } from "react";
import api from "../../services/api";

const BikeServicesAdmin = () => {
  const [services, setServices] = useState([]);
  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    image: "",
  });
  const [editingId, setEditingId] = useState(null);

  const fetchServices = async () => {
    try {
      const res = await api.get("/services/bike/");
      setServices(res.data);
    } catch (err) {
      console.error("Fetch bike services failed", err);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingId) {
        await api.put(`/services/bike/${editingId}`, form);
      } else {
        await api.post("/services/bike/", form);
      }

      setForm({ title: "", description: "", price: "", image: "" });
      setEditingId(null);
      fetchServices();
    } catch (err) {
      console.error("Save failed", err);
    }
  };

  const handleEdit = (item) => {
    setEditingId(item.id);
    setForm({
      title: item.title,
      description: item.description,
      price: item.price,
      image: item.image,
    });
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this service?")) return;

    try {
      await api.delete(`/services/bike/${id}`);
      fetchServices();
    } catch (err) {
      console.error("Delete failed", err);
    }
  };

  return (
    <div className="p-4 sm:p-6">
      <h2 className="text-xl sm:text-2xl font-bold mb-4">
        Manage Bike Services
      </h2>

      {/* FORM */}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-4 rounded shadow flex flex-col lg:flex-row gap-4 mb-6"
      >
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={form.title}
          onChange={handleChange}
          className="border p-2 w-full rounded text-sm sm:text-base"
          required
        />

        <input
          type="text"
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          className="border p-2 w-full rounded text-sm sm:text-base"
          required
        />

        <input
          type="number"
          name="price"
          placeholder="Price"
          value={form.price}
          onChange={handleChange}
          className="border p-2 w-full lg:w-40 rounded text-sm sm:text-base"
          required
        />

        <input
          type="text"
          name="image"
          placeholder="Image URL"
          value={form.image}
          onChange={handleChange}
          className="border p-2 w-full rounded text-sm sm:text-base"
          required
        />

        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 w-full lg:w-auto text-sm sm:text-base"
        >
          {editingId ? "Update" : "Add"}
        </button>
      </form>

      {/* LIST */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {services.map((item) => (
          <div
            key={item.id}
            className="border rounded p-4 shadow flex flex-col sm:flex-row gap-4 items-start sm:items-center"
          >
            <img
              src={item.image}
              alt={item.title}
              className="w-full sm:w-32 h-40 sm:h-20 object-cover rounded"
            />

            <div className="flex-1">
              <h3 className="font-semibold text-sm sm:text-base">
                {item.title}
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 break-words">
                {item.description}
              </p>
              <p className="font-bold mt-1 text-sm sm:text-base">
                ₹{item.price}
              </p>
            </div>

            <div className="flex flex-row sm:flex-col gap-2 w-full sm:w-auto">
              <button
                onClick={() => handleEdit(item)}
                className="bg-yellow-400 px-3 py-1 rounded text-xs sm:text-sm w-full sm:w-auto"
              >
                Edit
              </button>

              <button
                onClick={() => handleDelete(item.id)}
                className="bg-red-600 text-white px-3 py-1 rounded text-xs sm:text-sm w-full sm:w-auto"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BikeServicesAdmin;0