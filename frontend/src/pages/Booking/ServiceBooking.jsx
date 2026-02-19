import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../../services/api";

const ServiceBooking = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const service = state?.service;

  const [form, setForm] = useState({
    name: "",
    phone: "",
    date: "",
    time: "",
  });

  const [showPackages, setShowPackages] = useState(false);
  const [packages, setPackages] = useState([]);
  const [selectedPackage, setSelectedPackage] = useState(null);

  if (!service) return <p>Service not found</p>;

  const fetchPackages = async () => {
    try {
      const res = await api.get("/packages/");
      setPackages(res.data);
    } catch (err) {
      console.error("Package fetch error", err);
    }
  };

  const handleTogglePackages = async () => {
    if (!showPackages && packages.length === 0) {
      await fetchPackages();
    }
    setShowPackages(!showPackages);
  };

  const handleConfirmBooking = async () => {
    if (!form.name || !form.phone || !form.date || !form.time) {
      alert("Please fill all fields");
      return;
    }

    // 🔥 Get logged in userId
    const userId = localStorage.getItem("userId");

    if (!userId) {
      alert("Please login first");
      navigate("/login");
      return;
    }

    const payload = {
      user_id: Number(userId),  // ✅ NEW (VERY IMPORTANT)

      customer_name: form.name,
      phone: form.phone,
      booking_date: String(form.date),
      booking_time: String(form.time),
      service_type: service.type,
      service_name: service.title,
      service_id: Number(service.id),

      package_id: selectedPackage ? selectedPackage.id : null,
      package_name: selectedPackage ? selectedPackage.title : null,
      package_price: selectedPackage ? selectedPackage.price : null,
      booking_type: selectedPackage ? "service+package" : "service",
    };

    try {
      await api.post("/bookings/", payload);
      navigate("/booking-success");
    } catch (err) {
      console.error(err);
      alert("Booking failed");
    }
  };

  return (
    <div className="max-w-6xl mx-auto py-10 grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* LEFT */}
      <div className="bg-white rounded-lg shadow p-6">
        <img
          src={service.image}
          alt={service.title}
          className="w-full h-60 object-cover rounded mb-4"
        />
        <h2 className="text-2xl font-bold mb-2">{service.title}</h2>
        <p className="text-gray-600 mb-2">{service.description}</p>
        <p className="text-yellow-600 font-bold text-lg">₹{service.price}</p>
      </div>

      {/* RIGHT */}
      <div className="bg-white rounded-lg shadow p-6 space-y-4">
        <h3 className="text-xl font-bold mb-4">Confirm Booking</h3>

        <input value={service.title} disabled className="w-full border p-2 rounded bg-gray-100" />

        <input placeholder="Your Name" className="w-full border p-2 rounded"
          onChange={(e) => setForm({ ...form, name: e.target.value })} />

        <input placeholder="Phone Number" className="w-full border p-2 rounded"
          onChange={(e) => setForm({ ...form, phone: e.target.value })} />

        <input type="date" className="w-full border p-2 rounded"
          onChange={(e) => setForm({ ...form, date: e.target.value })} />

        <input type="time" className="w-full border p-2 rounded"
          onChange={(e) => setForm({ ...form, time: e.target.value })} />

        <button
          onClick={handleTogglePackages}
          className="w-full border border-blue-600 text-blue-600 py-2 rounded"
        >
          Want to add some packages?
        </button>

        {selectedPackage && (
          <input
            value={selectedPackage.title}
            disabled
            className="w-full border p-2 rounded bg-gray-100"
          />
        )}

        {showPackages && (
          <div className="grid md:grid-cols-2 gap-4 pt-4">
            {packages.map((pkg) => (
              <div key={pkg.id} className="border rounded-lg p-4 shadow-sm">
                <h4 className="font-bold">{pkg.title}</h4>
                <p className="text-blue-600 font-bold">₹{pkg.price}</p>
                <ul className="text-sm text-gray-600 mt-2">
                  {pkg.features.map((f, i) => (
                    <li key={i}>✓ {f}</li>
                  ))}
                </ul>
                <button
                  onClick={() => {
                    setSelectedPackage(pkg);
                    setShowPackages(false);
                  }}
                  className="mt-3 bg-blue-600 text-white px-4 py-2 rounded"
                >
                  Choose Plan
                </button>
              </div>
            ))}
          </div>
        )}

        <button
          onClick={handleConfirmBooking}
          className="w-full bg-blue-700 text-white py-2 rounded hover:bg-blue-800"
        >
          Confirm Booking
        </button>
      </div>
    </div>
  );
};

export default ServiceBooking;
