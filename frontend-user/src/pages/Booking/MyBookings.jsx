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
    <div className="min-h-screen bg-gray-100 py-6 sm:py-8 px-4">
      <div className="max-w-6xl mx-auto">

        {/* LOADING */}
        {loading && (
          <div className="bg-white p-5 sm:p-6 shadow rounded text-center text-gray-500 text-sm sm:text-base">
            Loading your bookings...
          </div>
        )}

        {/* EMPTY */}
        {!loading && bookings.length === 0 && (
          <div className="bg-white p-5 sm:p-6 shadow rounded text-center text-gray-500 text-sm sm:text-base">
            You have no bookings yet.
          </div>
        )}

        {/* BOOKINGS */}
        <div className="space-y-4 mt-4">

          {bookings.map((b) => (
            <div
              key={b.id}
              className="bg-white p-4 sm:p-5 shadow rounded hover:shadow-md transition"
            >
              <div className="flex flex-col sm:flex-row justify-between gap-4">

                {/* LEFT */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">

                  <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gray-200 rounded flex items-center justify-center text-2xl sm:text-3xl">
                    {b.service_type === "bike" ? "🏍️" : "🚗"}
                  </div>

                  <div>
                    <h2 className="font-semibold text-base sm:text-lg">
                      {b.service_name}
                    </h2>

                    <p className="text-xs sm:text-sm text-gray-600 mt-1">
                      Service Type: {b.service_type}
                    </p>

                    <p className="text-xs sm:text-sm text-gray-600">
                      📅 {b.booking_date}
                    </p>

                    <p className="text-xs sm:text-sm text-gray-600">
                      🕒 {b.booking_time}
                    </p>

                    {b.package_name && (
                      <p className="text-xs sm:text-sm text-purple-600 mt-1">
                        Package: {b.package_name}
                      </p>
                    )}
                  </div>
                </div>

                {/* RIGHT */}
                <div className="text-left sm:text-right">
                  <p className={`font-semibold text-sm sm:text-base ${statusColor(b.status)}`}>
                    ● {b.status?.toUpperCase()}
                  </p>

                  <p className="text-xs sm:text-sm text-gray-500 mt-1">
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