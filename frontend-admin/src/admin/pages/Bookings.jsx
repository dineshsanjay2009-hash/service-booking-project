import { useEffect, useState } from "react";
import api from "../../services/api";

const Bookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const res = await api.get("/bookings/");
      setBookings(res.data);
    } catch (err) {
      console.error("Error fetching bookings", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 sm:p-6">
      <h1 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">
        Bookings
      </h1>

      {loading ? (
        <p className="text-sm sm:text-base">Loading...</p>
      ) : bookings.length === 0 ? (
        <p className="text-sm sm:text-base">No bookings found</p>
      ) : (
        <div className="overflow-x-auto rounded-lg border border-gray-200">
          <table className="min-w-[800px] w-full text-xs sm:text-sm md:text-base">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-2 sm:p-3 border">ID</th>
                <th className="p-2 sm:p-3 border">Service</th>
                <th className="p-2 sm:p-3 border">Name</th>
                <th className="p-2 sm:p-3 border">Phone</th>
                <th className="p-2 sm:p-3 border">Date</th>
                <th className="p-2 sm:p-3 border">Time</th>
                <th className="p-2 sm:p-3 border">Package</th>
                <th className="p-2 sm:p-3 border">Status</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((b) => (
                <tr key={b.id} className="text-center">
                  <td className="p-2 border whitespace-nowrap">
                    {b.id}
                  </td>

                  <td className="p-2 border whitespace-nowrap">
                    {b.service_type?.toUpperCase()}
                  </td>

                  <td className="p-2 border break-words">
                    {b.customer_name}
                  </td>

                  <td className="p-2 border whitespace-nowrap">
                    {b.phone}
                  </td>

                  <td className="p-2 border whitespace-nowrap">
                    {b.booking_date}
                  </td>

                  <td className="p-2 border whitespace-nowrap">
                    {b.booking_time}
                  </td>

                  <td className="p-2 border break-words">
                    {b.package_name || "-"}
                  </td>

                  <td className="p-2 border whitespace-nowrap">
                    {b.booking_type || "service"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Bookings;