import { useState } from "react";
import api from "../../services/api";

const ContactForm = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.message) {
      alert("Please fill all fields");
      return;
    }

    try {
      setLoading(true);
      await api.post("/contact/", form);
      setSuccess(true);
      setForm({ name: "", email: "", message: "" });
    } catch (err) {
      console.error("Contact error", err);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-16 bg-gray-100">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-12">
          Get in Touch
        </h2>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="rounded-xl overflow-hidden shadow">
            <img
              src="https://i.pinimg.com/736x/b2/01/59/b2015907c5797fe3c8dfa3f5d07105bc.jpg"
              alt="Get in touch"
              className="w-full h-[420px] object-cover"
            />
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <form className="space-y-4" onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Full Name"
                className="w-full border rounded-lg px-4 py-2"
                value={form.name}
                onChange={(e) =>
                  setForm({ ...form, name: e.target.value })
                }
              />

              <input
                type="email"
                placeholder="Email"
                className="w-full border rounded-lg px-4 py-2"
                value={form.email}
                onChange={(e) =>
                  setForm({ ...form, email: e.target.value })
                }
              />

              <textarea
                rows="4"
                placeholder="Message"
                className="w-full border rounded-lg px-4 py-2"
                value={form.message}
                onChange={(e) =>
                  setForm({ ...form, message: e.target.value })
                }
              />

              <button
                type="submit"
                disabled={loading}
                className="bg-blue-600 text-white px-8 py-2 rounded-full"
              >
                {loading ? "Sending..." : "Send Message"}
              </button>

              {success && (
                <p className="text-green-600 text-sm">
                  Message sent successfully ✅
                </p>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
