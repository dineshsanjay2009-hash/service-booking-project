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

  const fetchServices = async () => {
    const res = await api.get("/services/car/");
    setServices(res.data);
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

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

  const handleDelete = async (id) => {
    await api.delete(`/services/car/${id}`);
    fetchServices();
  };

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
    <div className="p-4 sm:p-6">
      <h2 className="text-xl sm:text-2xl font-bold mb-4">
        Manage Car Services
      </h2>

      {/* FORM */}
      <div className="flex flex-col lg:flex-row gap-3 mb-6">
        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Title"
          className="border px-3 py-2 rounded w-full text-sm sm:text-base"
        />
        <input
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Description"
          className="border px-3 py-2 rounded w-full text-sm sm:text-base"
        />
        <input
          name="price"
          value={form.price}
          onChange={handleChange}
          placeholder="Price"
          className="border px-3 py-2 rounded w-full text-sm sm:text-base"
        />
        <input
          name="image"
          value={form.image}
          onChange={handleChange}
          placeholder="Image URL"
          className="border px-3 py-2 rounded w-full text-sm sm:text-base"
        />
        <button
          onClick={handleSubmit}
          className="bg-blue-600 text-white px-5 py-2 rounded w-full lg:w-auto text-sm sm:text-base"
        >
          {editingId ? "Update" : "Add"}
        </button>
      </div>

      {/* LIST */}
      <div className="space-y-4">
        {services.map((s) => (
          <div
            key={s.id}
            className="border rounded p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
          >
            <div className="flex flex-col sm:flex-row gap-4 w-full">
              <img
                src={s.image}
                alt={s.title}
                className="w-full sm:w-32 h-40 sm:h-20 object-cover rounded"
              />
              <div>
                <h3 className="font-bold text-sm sm:text-base">
                  {s.title}
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 break-words">
                  {s.description}
                </p>
                <p className="font-semibold text-sm sm:text-base">
                  ₹{s.price}
                </p>
              </div>
            </div>

            <div className="flex flex-row sm:flex-col gap-2 w-full sm:w-auto">
              <button
                onClick={() => handleEdit(s)}
                className="bg-yellow-400 px-4 py-1 rounded text-xs sm:text-sm w-full sm:w-auto"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(s.id)}
                className="bg-red-600 text-white px-4 py-1 rounded text-xs sm:text-sm w-full sm:w-auto"
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