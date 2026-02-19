import { useEffect, useState } from "react";
import api from "../../services/api";

const CarServiceAdmin = () => {
  const [services, setServices] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    image: "",
  });

  // fetch car services
  const fetchServices = async () => {
    const res = await api.get("/services/car/");
    setServices(res.data);
  };

  useEffect(() => {
    fetchServices();
  }, []);

  // input change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // add / update
  const handleSubmit = async () => {
    if (editingId) {
      await api.put(`/services/car/${editingId}`, form);
    } else {
      await api.post("/services/car/", form);
    }

    setForm({ title: "", description: "", price: "", image: "" });
    setEditingId(null);
    fetchServices();
  };

  // delete
  const handleDelete = async (id) => {
    await api.delete(`/services/car/${id}`);
    fetchServices();
  };

  // edit (form fill)
  const handleEdit = (service) => {
    setForm({
      title: service.title,
      description: service.description,
      price: service.price,
      image: service.image,
    });
    setEditingId(service.id);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Manage Car Services</h2>

      {/* FORM (UI SAME AS BIKE) */}
      <div className="flex gap-3 mb-6">
        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Title"
          className="border px-3 py-2 rounded w-full"
        />
        <input
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Description"
          className="border px-3 py-2 rounded w-full"
        />
        <input
          name="price"
          value={form.price}
          onChange={handleChange}
          placeholder="Price"
          className="border px-3 py-2 rounded w-full"
        />
        <input
          name="image"
          value={form.image}
          onChange={handleChange}
          placeholder="Image URL"
          className="border px-3 py-2 rounded w-full"
        />
        <button
          onClick={handleSubmit}
          className="bg-blue-600 text-white px-5 rounded"
        >
          {editingId ? "Update" : "Add"}
        </button>
      </div>

      {/* LIST */}
      <div className="space-y-4">
        {services.map((s) => (
          <div
            key={s.id}
            className="border rounded p-4 flex justify-between items-center"
          >
            <div className="flex gap-4">
              <img
                src={s.image}
                alt={s.title}
                className="w-32 h-20 object-cover rounded"
              />
              <div>
                <h3 className="font-bold">{s.title}</h3>
                <p className="text-sm text-gray-600">{s.description}</p>
                <p className="font-semibold">₹{s.price}</p>
              </div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => handleEdit(s)}
                className="bg-yellow-400 px-4 py-1 rounded"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(s.id)}
                className="bg-red-600 text-white px-4 py-1 rounded"
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

export default CarServiceAdmin;
