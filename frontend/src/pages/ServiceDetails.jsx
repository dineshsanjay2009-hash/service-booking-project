import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../services/api";

const ServiceDetails = () => {
  const { id } = useParams();
  const [service, setService] = useState(null);

  useEffect(() => {
    const fetchService = async () => {
      try {
        const bike = await api.get("/services/bike/");
        const car = await api.get("/services/car/");
        const all = [...bike.data, ...car.data];
        setService(all.find((s) => s.id === Number(id)));
      } catch (err) {
        console.error(err);
      }
    };

    fetchService();
  }, [id]);

  if (!service) {
    return <p className="text-center mt-10">Loading service...</p>;
  }

  return (
    <section className="max-w-4xl mx-auto py-12 px-4">
      <img
        src={service.image}
        alt={service.title}
        className="w-full h-80 object-cover rounded-lg mb-6"
      />

      <h1 className="text-3xl font-bold mb-3">{service.title}</h1>
      <p className="text-gray-600 mb-4">{service.description}</p>

      <p className="text-xl font-bold text-yellow-600 mb-6">
        ₹{service.price}
      </p>

      <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded font-semibold">
        Proceed to Booking
      </button>
    </section>
  );
};

export default ServiceDetails;
