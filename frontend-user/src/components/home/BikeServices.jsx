import { useNavigate } from "react-router-dom";

const BikeServices = () => {
  const navigate = useNavigate();

  const services = [
    {
      title: "General Service",
      desc: "Complete bike inspection, tuning, and safety checks.",
    },
    {
      title: "Oil Change",
      desc: "High-quality engine oil replacement for better mileage.",
    },
    {
      title: "Brake Service",
      desc: "Brake inspection and repair to ensure rider safety.",
    },
  ];

  return (
    <section
      className="relative py-14 sm:py-20 bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1511994298241-608e28f14fde?q=80&w=2070&auto=format&fit=crop')",
      }}
    >
      {/* overlay */}
      <div className="absolute inset-0 bg-black/75"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 text-white">
        
        {/* heading */}
        <div className="text-center mb-10 sm:mb-14">
          <span className="uppercase tracking-[2px] sm:tracking-[3px] text-pink-500 font-bold text-xs sm:text-sm">
            Bike Care
          </span>

          <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold mt-3 sm:mt-4">
            Bike Services
          </h2>

          <p className="mt-3 sm:mt-4 text-gray-200 text-sm sm:text-base max-w-2xl mx-auto">
            Precision bike servicing designed for performance, safety,
            and long-term reliability.
          </p>
        </div>

        {/* cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
          {services.map((item, i) => (
            <div
              key={i}
              className="p-5 sm:p-6 rounded-2xl backdrop-blur-md bg-white/10 border border-white/20 hover:scale-[1.02] transition"
            >
              <div className="w-10 h-10 sm:w-12 sm:h-12 mb-4 rounded-full bg-pink-500 flex items-center justify-center text-sm sm:text-lg font-bold">
                {i + 1}
              </div>

              <h4 className="text-lg sm:text-xl font-bold mb-2">
                {item.title}
              </h4>

              <p className="text-gray-200 text-xs sm:text-sm">
                {item.desc}
              </p>
            </div>
          ))}
        </div>

        {/* bottom CTA */}
        <div className="mt-10 sm:mt-14 p-5 sm:p-6 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-4 bg-slate-900/80 border border-white/20">
          
          <div className="text-center md:text-left">
            <h5 className="text-base sm:text-lg font-bold">
              What You Get
            </h5>
            <p className="text-gray-300 text-xs sm:text-sm">
              Certified mechanics • Genuine parts • Transparent pricing
            </p>
          </div>

          <button
            onClick={() => navigate("/services")}
            className="px-5 sm:px-6 py-2 rounded-full border border-white text-white text-sm sm:text-base hover:bg-white hover:text-black transition w-full md:w-auto"
          >
            Book Bike Service
          </button>
        </div>

      </div>
    </section>
  );
};

export default BikeServices;