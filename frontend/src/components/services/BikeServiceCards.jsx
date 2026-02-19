import { useNavigate } from "react-router-dom";

const BikeServiceCards = ({ services }) => {
  const navigate = useNavigate();

  if (!services || services.length === 0) {
    return (
      <p className="text-center text-gray-500">
        No bike services available
      </p>
    );
  }

  return (
    <section className="py-12 bg-gray-100">
      <h2 className="text-2xl font-bold text-center mb-8 text-yellow-600">
        Bike Services
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto px-4">
        {services.map((service) => (
          <div
            key={service.id}
            className="bg-white rounded-lg shadow hover:shadow-lg transition"
          >
            <img
              src={
                service.image ||
                "https://images.unsplash.com/photo-1558981806-ec527fa84c39"
              }
              alt={service.title}
              className="h-48 w-full object-cover rounded-t-lg"
            />

            <div className="p-5">
              <h3 className="font-semibold text-lg mb-1">
                {service.title}
              </h3>

              <p className="text-gray-600 text-sm mb-3">
                {service.description}
              </p>

              <div className="flex justify-between items-center">
                <span className="text-yellow-600 font-bold">
                  ₹{service.price}
                </span>

                {/* 🔧 LOGIC FIX ONLY – UI SAME */}
                <button
                  onClick={() =>
                    navigate(`/book-service/${service.id}`, {
                      state: {
                        service: {
                          ...service,
                          type: "bike", // ✅ IMPORTANT FIX
                        },
                      },
                    })
                  }
                  className="bg-yellow-500 hover:bg-yellow-600 text-black px-4 py-1 rounded text-sm font-semibold"
                >
                  Book Now
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default BikeServiceCards;
