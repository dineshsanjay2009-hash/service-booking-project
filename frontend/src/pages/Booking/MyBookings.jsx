import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";

const MyBookings = () => {
  const navigate = useNavigate();

  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userId = localStorage.getItem("userId");

    if (!userId) {
      navigate("/login");
      return;
    }

    const fetchBookings = async () => {
      try {
        const res = await api.get(`/bookings/my/${userId}`);
        setBookings(res.data);
      } catch (err) {
        console.error("Error fetching bookings", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [navigate]);

  const statusColor = (status) => {
    if (status === "completed") return "text-green-600";
    if (status === "confirmed") return "text-blue-600";
    if (status === "pending") return "text-yellow-600";
    return "text-gray-600";
  };

  const statusMessage = (status) => {
    if (status === "completed") return "Your service has been completed";
    if (status === "confirmed") return "Your booking is confirmed";
    if (status === "pending") return "Waiting for confirmation";
    return "";
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8">

      <div className="max-w-6xl mx-auto">

        {/* LOADING STATE */}
        {loading && (
          <div className="bg-white p-6 shadow rounded text-center text-gray-500">
            Loading your bookings...
          </div>
        )}

        {/* EMPTY STATE */}
        {!loading && bookings.length === 0 && (
          <div className="bg-white p-6 shadow rounded text-center text-gray-500">
            You have no bookings yet.
          </div>
        )}

        {/* BOOKINGS LIST */}
        <div className="space-y-4">

          {bookings.map((b) => (
            <div
              key={b.id}
              className="bg-white p-5 shadow rounded hover:shadow-md transition"
            >
              <div className="flex justify-between items-center">

                {/* LEFT SECTION */}
                <div className="flex items-center gap-5">

                  <div className="w-24 h-24 bg-gray-200 rounded flex items-center justify-center text-3xl">
                    {b.service_type === "bike" ? "🏍️" : "🚗"}
                  </div>

                  <div>
                    <h2 className="font-semibold text-lg">
                      {b.service_name}
                    </h2>

                    <p className="text-sm text-gray-600 mt-1">
                      Service Type: {b.service_type}
                    </p>

                    <p className="text-sm text-gray-600">
                      📅 {b.booking_date}
                    </p>

                    <p className="text-sm text-gray-600">
                      🕒 {b.booking_time}
                    </p>

                    {b.package_name && (
                      <p className="text-sm text-purple-600 mt-1">
                        Package: {b.package_name}
                      </p>
                    )}
                  </div>
                </div>

                {/* RIGHT SECTION */}
                <div className="text-right">

                  <p className={`font-semibold ${statusColor(b.status)}`}>
                    ● {b.status?.toUpperCase()}
                  </p>

                  <p className="text-sm text-gray-500 mt-1">
                    {statusMessage(b.status)}
                  </p>

                  <p className="text-xs text-gray-400 mt-2">
                    Booking ID: #{b.id}
                  </p>

                </div>

              </div>
            </div>
          ))}

        </div>

      </div>
    </div>
  );
};

export default MyBookings;
