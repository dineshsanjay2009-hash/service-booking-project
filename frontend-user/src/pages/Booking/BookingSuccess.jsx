import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../../services/api";

const BookingSuccess = () => {
  const { id } = useParams();

  const [booking, setBooking] = useState(null);
  const [servicePrice, setServicePrice] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // 1️⃣ Get booking
        const bookingRes = await api.get(`/bookings/${id}`);
        setBooking(bookingRes.data);

        // 2️⃣ Fetch services again to get price
        const bike = await api.get("/services/bike/");
        const car = await api.get("/services/car/");

        const allServices = [...bike.data, ...car.data];

        const matchedService = allServices.find(
          (s) => s.id === bookingRes.data.service_id
        );

        if (matchedService) {
          setServicePrice(matchedService.price);
        }

      } catch (err) {
        console.error("Error fetching booking:", err);
      }
    };

    fetchData();
  }, [id]);

  if (!booking) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        Loading booking...
      </div>
    );
  }

  const total =
    servicePrice +
    (booking.package_price ? booking.package_price : 0);

  return (
    <div className="min-h-[80vh] bg-gray-50 py-8 px-4 flex items-center justify-center">
      <div className="w-full max-w-6xl">

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-green-600">
            ✅ Booking Confirmed Successfully
          </h1>
          <p className="text-gray-500 mt-2 text-sm sm:text-base">
            Booking ID: #{booking.id}
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">

          {/* LEFT */}
          <div className="lg:col-span-2 space-y-6">

            <div className="bg-white rounded-xl shadow-sm p-5 sm:p-6">
              <h2 className="font-semibold text-lg mb-3">
                Vehicle Details
              </h2>
              <div className="space-y-1">
                <p><strong>Service:</strong> {booking.service_name}</p>
                <p><strong>Type:</strong> {booking.service_type}</p>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-5 sm:p-6">
              <h2 className="font-semibold text-lg mb-3">
                Pickup & Schedule
              </h2>
              <div className="space-y-1">
                <p><strong>Date:</strong> {booking.booking_date}</p>
                <p><strong>Time:</strong> {booking.booking_time}</p>
              </div>
            </div>

          </div>

          {/* RIGHT */}
          <div className="bg-white rounded-xl shadow-md p-5 sm:p-6 h-fit">

            <h2 className="font-semibold text-lg mb-4">
              Order Summary
            </h2>

            <div className="space-y-2">

              <div className="flex justify-between">
                <span>Service Cost</span>
                <span>₹{servicePrice}</span>
              </div>

              {booking.package_price && (
                <div className="flex justify-between">
                  <span>Package Cost</span>
                  <span>₹{booking.package_price}</span>
                </div>
              )}

            </div>

            <hr className="my-4" />

            <div className="flex justify-between font-bold text-lg">
              <span>Total</span>
              <span>₹{total}</span>
            </div>

            <div className="mt-4 text-sm text-gray-600">
              <p><strong>Status:</strong> {booking.status}</p>
              <p>
                <strong>Package:</strong>{" "}
                {booking.package_name
                  ? booking.package_name
                  : "Service Only"}
              </p>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};

export default BookingSuccess;