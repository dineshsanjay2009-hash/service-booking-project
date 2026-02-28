import { useNavigate } from "react-router-dom";

const BikeServiceCards = ({ services }) => {
  const navigate = useNavigate();

  if (!services || services.length === 0) {
    return (
      <p className="text-center text-gray-500 text-sm sm:text-base py-6">
        No bike services available
      </p>
    );
  }

  return (
    <section className="py-10 sm:py-12 bg-gray-100">
      <h2 className="text-xl sm:text-2xl font-bold text-center mb-6 sm:mb-8 text-yellow-600">
        Bike Services
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 max-w-6xl mx-auto px-4">
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
              className="h-40 sm:h-48 w-full object-cover rounded-t-lg"
            />

            <div className="p-4 sm:p-5">
              <h3 className="font-semibold text-base sm:text-lg mb-1">
                {service.title}
              </h3>

              <p className="text-gray-600 text-xs sm:text-sm mb-3 line-clamp-2">
                {service.description}
              </p>

              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-0">
                <span className="text-yellow-600 font-bold text-sm sm:text-base">
                  ₹{service.price}
                </span>

                <button
                  onClick={() =>
                    navigate(`/book-service/${service.id}`, {
                      state: {
                        service: {
                          ...service,
                          type: "bike",
                        },
                      },
                    })
                  }
                  className="bg-yellow-500 hover:bg-yellow-600 text-black px-4 py-1 rounded text-xs sm:text-sm font-semibold w-full sm:w-auto"
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