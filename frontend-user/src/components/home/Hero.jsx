import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";

const Hero = () => {
  const navigate = useNavigate();
  const [carousel, setCarousel] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

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

  useEffect(() => {
    if (carousel.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) =>
        prev === carousel.length - 1 ? 0 : prev + 1
      );
    }, 4000);

    return () => clearInterval(interval);
  }, [carousel]);

  if (carousel.length === 0) {
    return (
      <section className="min-h-[70vh] sm:min-h-screen flex items-center justify-center">
        <p className="text-gray-400 text-sm sm:text-base">
          Loading...
        </p>
      </section>
    );
  }

  const currentSlide = carousel[currentIndex];

  return (
    <section
      className="min-h-[80vh] sm:min-h-screen flex items-center justify-center text-white relative bg-cover bg-center transition-all duration-700"
      style={{
        backgroundImage: `url(${currentSlide.image})`,
      }}
    >
      {/* overlay */}
      <div className="absolute inset-0 bg-black/70"></div>

      {/* CONTENT */}
      <div className="relative text-center px-4 sm:px-6 max-w-3xl">
        
        <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4">
          Bike & Car Service
        </h1>

        <p className="text-sm sm:text-lg mb-5 sm:mb-6 text-gray-200">
          {currentSlide.description ||
            "Trusted mechanics • Transparent pricing • Quick service"}
        </p>

        <button
          onClick={() => navigate("/services")}
          className="bg-blue-600 hover:bg-blue-700 px-5 sm:px-6 py-2 sm:py-3 rounded-full font-semibold text-sm sm:text-base transition w-full sm:w-auto"
        >
          Book Service
        </button>
      </div>
    </section>
  );
};

export default Hero;