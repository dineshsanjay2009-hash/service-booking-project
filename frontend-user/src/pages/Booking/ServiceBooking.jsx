import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import api from "../../services/api";

const ServiceBooking = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const service = location.state?.service;

  const today = new Date().toISOString().split("T")[0];

  const [form, setForm] = useState({
    name: "",
    phone: "",
    date: "",
  });

  const [showPackages, setShowPackages] = useState(false);
  const [packages, setPackages] = useState([]);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("online");

  if (!service) return <p className="p-6">Service not found</p>;

  // ✅ ROBUST AUTO FILL (NO LOGIC CHANGE)
  useEffect(() => {
    const storedName =
      localStorage.getItem("userName") ||
      localStorage.getItem("name") ||
      "";

    const storedPhone =
      localStorage.getItem("userPhone") ||
      localStorage.getItem("phone") ||
      "";

    setForm((prev) => ({
      ...prev,
      name: storedName,
      phone: storedPhone,
    }));
  }, []);

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
    if (!form.name || !form.phone || !form.date) {
      alert("Please fill all fields");
      return;
    }

    if (!/^[0-9]{10}$/.test(form.phone)) {
      alert("Phone number must be exactly 10 digits");
      return;
    }

    const selectedDate = new Date(form.date);
    const todayDate = new Date();
    todayDate.setHours(0, 0, 0, 0);

    if (isNaN(selectedDate.getTime())) {
      alert("Invalid date");
      return;
    }

    if (selectedDate < todayDate) {
      alert("Past dates are not allowed");
      return;
    }

    if (selectedDate.getFullYear() > 2100) {
      alert("Invalid future year");
      return;
    }

    const userId = localStorage.getItem("userId");

    if (!userId) {
      navigate("/login", {
        state: {
          from: location.pathname,
          service: service,
        },
      });
      return;
    }

    const currentTime = new Date().toTimeString().slice(0, 5);

    const totalAmount = selectedPackage
      ? Number(service.price) + Number(selectedPackage.price)
      : Number(service.price);

    const payload = {
      user_id: Number(userId),
      customer_name: form.name,
      phone: form.phone,
      booking_date: form.date,
      booking_time: currentTime,
      service_type: service.type,
      service_name: service.title,
      service_id: Number(service.id),

      package_id: selectedPackage ? selectedPackage.id : null,
      package_name: selectedPackage ? selectedPackage.title : null,
      package_price: selectedPackage ? selectedPackage.price : null,
      booking_type: selectedPackage ? "service+package" : "service",

      total_amount: totalAmount,
    };

    try {
      const response = await api.post("/bookings/", payload);
      const bookingId = response.data.id;

      if (paymentMethod === "cod") {
        await api.put(`/bookings/${bookingId}`, {
          status: "confirmed_cod",
          payment_method: "cod",
        });

        navigate(`/booking-success/${bookingId}`);
        return;
      }

      const orderRes = await api.post("/payment/create-order", {
        amount: totalAmount,
      });

      const orderData = orderRes.data;

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY,
        amount: orderData.amount,
        currency: "INR",
        name: "ServiceHub",
        description: "Service Booking Payment",
        order_id: orderData.id,
        handler: async function (paymentResponse) {
          await api.post("/payment/verify-payment", {
            booking_id: bookingId,
            razorpay_payment_id: paymentResponse.razorpay_payment_id,
            razorpay_order_id: paymentResponse.razorpay_order_id,
            razorpay_signature: paymentResponse.razorpay_signature,
          });

          navigate(`/booking-success/${bookingId}`);
        },
        theme: {
          color: "#1d4ed8",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();

      rzp.on("payment.failed", async function () {
        try {
          await api.delete(`/bookings/${bookingId}`);
        } catch (err) {
          console.error("Failed to delete booking after payment failure");
        }

        alert("Payment failed. Please try again.");
      });

    } catch (err) {
      console.error(err);
      alert(err.response?.data?.detail || "Booking failed");
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-2 gap-8">

      <div className="bg-white rounded-lg shadow p-6">
        <img
          src={service.image}
          alt={service.title}
          className="w-full h-60 object-cover rounded mb-4"
        />
        <h2 className="text-2xl font-bold mb-2">{service.title}</h2>
        <p className="text-gray-600 mb-2">{service.description}</p>
        <p className="text-yellow-600 font-bold text-lg">
          ₹{service.price}
        </p>
      </div>

      <div className="bg-white rounded-lg shadow p-6 space-y-4">
        <h3 className="text-xl font-bold">Confirm Booking</h3>

        <input
          value={service.title}
          disabled
          className="w-full border p-2 rounded bg-gray-100"
        />

        <input
          placeholder="Your Name"
          className="w-full border p-2 rounded"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        <input
          type="tel"
          maxLength={10}
          placeholder="Phone Number"
          className="w-full border p-2 rounded"
          value={form.phone}
          onChange={(e) => {
            const value = e.target.value.replace(/\D/g, "");
            setForm({ ...form, phone: value });
          }}
        />

        <input
          type="date"
          min={today}
          max="2100-12-31"
          value={form.date}
          className="w-full border p-2 rounded"
          onChange={(e) => setForm({ ...form, date: e.target.value })}
        />

        <div className="space-y-2">
          <p className="font-semibold">Select Payment Method</p>

          <label className="flex items-center gap-2">
            <input
              type="radio"
              value="online"
              checked={paymentMethod === "online"}
              onChange={() => setPaymentMethod("online")}
            />
            Online Payment (UPI / Card / Netbanking)
          </label>

          <label className="flex items-center gap-2">
            <input
              type="radio"
              value="cod"
              checked={paymentMethod === "cod"}
              onChange={() => setPaymentMethod("cod")}
            />
            Cash on Delivery
          </label>
        </div>

        <button
          onClick={handleTogglePackages}
          className="w-full border border-blue-600 text-blue-600 py-2 rounded"
        >
          Want to add some packages?
        </button>

        {selectedPackage && (
          <div className="bg-gray-100 p-3 rounded text-sm">
            Selected: <strong>{selectedPackage.title}</strong> (₹{selectedPackage.price})
          </div>
        )}

        {showPackages && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {packages.map((pkg) => (
              <div key={pkg.id} className="border p-4 rounded shadow-sm">
                <h4 className="font-bold">{pkg.title}</h4>
                <p className="text-blue-600 font-bold">₹{pkg.price}</p>
                <button
                  onClick={() => {
                    setSelectedPackage(pkg);
                    setShowPackages(false);
                  }}
                  className="mt-2 bg-blue-600 text-white px-4 py-2 rounded w-full"
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