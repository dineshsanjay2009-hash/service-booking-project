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

  // FETCH BIKE SERVICES
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

  // HANDLE INPUT
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ADD / UPDATE
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

  // EDIT
  const handleEdit = (item) => {
    setEditingId(item.id);
    setForm({
      title: item.title,
      description: item.description,
      price: item.price,
      image: item.image,
    });
  };

  // DELETE
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
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Manage Bike Services</h2>

      {/* FORM (SAME AS CAROUSEL UI) */}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-4 rounded shadow flex gap-4 mb-6"
      >
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={form.title}
          onChange={handleChange}
          className="border p-2 w-full rounded"
          required
        />

        <input
          type="text"
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          className="border p-2 w-full rounded"
          required
        />

        <input
          type="number"
          name="price"
          placeholder="Price"
          value={form.price}
          onChange={handleChange}
          className="border p-2 w-40 rounded"
          required
        />

        <input
          type="text"
          name="image"
          placeholder="Image URL"
          value={form.image}
          onChange={handleChange}
          className="border p-2 w-full rounded"
          required
        />

        <button
          type="submit"
          className="bg-blue-600 text-white px-6 rounded hover:bg-blue-700"
        >
          {editingId ? "Update" : "Add"}
        </button>
      </form>

      {/* LIST (CARD STYLE – SAME FEEL AS CAROUSEL) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {services.map((item) => (
          <div
            key={item.id}
            className="border rounded p-4 shadow flex gap-4 items-center"
          >
            <img
              src={item.image}
              alt={item.title}
              className="w-32 h-20 object-cover rounded"
            />

            <div className="flex-1">
              <h3 className="font-semibold">{item.title}</h3>
              <p className="text-sm text-gray-600">{item.description}</p>
              <p className="font-bold mt-1">₹{item.price}</p>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => handleEdit(item)}
                className="bg-yellow-400 px-3 py-1 rounded"
              >
                Edit
              </button>

              <button
                onClick={() => handleDelete(item.id)}
                className="bg-red-600 text-white px-3 py-1 rounded"
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

export default BikeServicesAdmin;
