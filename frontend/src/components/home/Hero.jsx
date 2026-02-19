import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api"; 

const Hero = () => {
  const navigate = useNavigate();
  const [carousel, setCarousel] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Fetch carousel data
  useEffect(() => {
    const fetchCarousel = async () => {
      try {
        const res = await api.get("/carousel/");
        setCarousel(res.data || []);
      } catch (err) {
        console.error("Carousel fetch failed:", err);
      }
    };

    fetchCarousel();
  }, []);

  // Auto slide
  useEffect(() => {
    if (carousel.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) =>
        prev === carousel.length - 1 ? 0 : prev + 1
      );
    }, 4000);

    return () => clearInterval(interval);
  }, [carousel]);

  // Loading state
  if (carousel.length === 0) {
    return (
      <section className="min-h-screen flex items-center justify-center">
        <p className="text-gray-400">Loading...</p>
      </section>
    );
  }

  const currentSlide = carousel[currentIndex];

  return (
    <section
      className="min-h-screen flex items-center justify-center text-white relative bg-cover bg-center transition-all duration-700"
      style={{
        backgroundImage: `url(${currentSlide.image})`,
      }}
    >
      {/* overlay */}
      <div className="absolute inset-0 bg-black/70"></div>

      {/* CONTENT */}
      <div className="relative text-center px-4">
        <h1 className="text-5xl font-bold mb-4">
          Bike & Car Service
        </h1>

        <p className="text-lg mb-6">
          {currentSlide.description ||
            "Trusted mechanics • Transparent pricing • Quick service"}
        </p>

        <button
          onClick={() => navigate("/services")}
          className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-full font-semibold transition"
        >
          Book Service
        </button>
      </div>
    </section>
  );
};

export default Hero;
