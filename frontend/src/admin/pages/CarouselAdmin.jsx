import { useEffect, useState } from "react";
import api from "../../services/api";

const CarouselAdmin = () => {
  const [carousel, setCarousel] = useState([]);
  const [form, setForm] = useState({
    title: "",
    description: "",
    image: "",
  });
  const [editId, setEditId] = useState(null);

  // fetch carousel
  const fetchCarousel = async () => {
    try {
      const res = await api.get("/carousel/");
      setCarousel(res.data);
    } catch (err) {
      console.error("Carousel fetch error", err);
    }
  };

  useEffect(() => {
    fetchCarousel();
  }, []);

  // handle input
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // add / update carousel
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
        await api.put(`/carousel/${editId}`, form);
      } else {
        await api.post("/carousel/", form);
      }

      setForm({ title: "", description: "", image: "" });
      setEditId(null);
      fetchCarousel();
    } catch (err) {
      console.error("Save carousel failed", err);
    }
  };

  // edit
  const handleEdit = (item) => {
    setEditId(item.id);
    setForm({
      title: item.title,
      description: item.description,
      image: item.image,
    });
  };

  // delete
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this carousel item?")) return;
    try {
      await api.delete(`/carousel/${id}`);
      fetchCarousel();
    } catch (err) {
      console.error("Delete failed", err);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Manage Carousel</h2>

      {/* ADD / UPDATE FORM */}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-4 rounded-lg shadow mb-8 grid grid-cols-1 md:grid-cols-4 gap-4"
      >
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={form.title}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />

        <input
          type="text"
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />

        <input
          type="text"
          name="image"
          placeholder="Image URL"
          value={form.image}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />

        <button
          type="submit"
          className="bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          {editId ? "Update Carousel" : "Add Carousel"}
        </button>
      </form>

      {/* LIST */}
      <div className="bg-white rounded-lg shadow">
        <table className="w-full border-collapse">
          <thead className="bg-gray-100">
            <tr>
              <th className="border p-3 text-left">Title</th>
              <th className="border p-3 text-left">Description</th>
              <th className="border p-3 text-left">Image</th>
              <th className="border p-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {carousel.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50">
                <td className="border p-3">{item.title}</td>
                <td className="border p-3">{item.description}</td>
                <td className="border p-3">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="h-12 rounded"
                  />
                </td>
                <td className="border p-3 space-x-2">
                  <button
                    onClick={() => handleEdit(item)}
                    className="bg-yellow-500 text-white px-3 py-1 rounded text-sm"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="bg-red-600 text-white px-3 py-1 rounded text-sm"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {carousel.length === 0 && (
          <p className="text-center text-gray-500 p-4">
            No carousel items found
          </p>
        )}
      </div>
    </div>
  );
};

export default CarouselAdmin;
