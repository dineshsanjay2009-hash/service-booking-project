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
      className="relative py-20 bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1511994298241-608e28f14fde?q=80&w=2070&auto=format&fit=crop')",
      }}
    >
      {/* overlay */}
      <div className="absolute inset-0 bg-black/75"></div>

      <div className="relative max-w-7xl mx-auto px-6 text-white">
        {/* heading */}
        <div className="text-center mb-14">
          <span className="uppercase tracking-[3px] text-pink-500 font-bold text-sm">
            Bike Care
          </span>

          <h2 className="text-5xl font-bold mt-4">Bike Services</h2>

          <p className="mt-4 text-gray-200 max-w-2xl mx-auto">
            Precision bike servicing designed for performance, safety,
            and long-term reliability.
          </p>
        </div>

        {/* cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {services.map((item, i) => (
            <div
              key={i}
              className="p-6 rounded-2xl backdrop-blur-md bg-white/10 border border-white/20 hover:scale-[1.02] transition"
            >
              <div className="w-12 h-12 mb-4 rounded-full bg-pink-500 flex items-center justify-center text-lg font-bold">
                {i + 1}
              </div>

              <h4 className="text-xl font-bold mb-2">
                {item.title}
              </h4>

              <p className="text-gray-200 text-sm">
                {item.desc}
              </p>
            </div>
          ))}
        </div>

        {/* bottom CTA */}
        <div className="mt-14 p-6 rounded-2xl flex flex-col md:flex-row items-center justify-between bg-slate-900/80 border border-white/20">
          <div className="mb-4 md:mb-0">
            <h5 className="text-lg font-bold">What You Get</h5>
            <p className="text-gray-300 text-sm">
              Certified mechanics • Genuine parts • Transparent pricing
            </p>
          </div>

          <button
            onClick={() => navigate("/services")}
            className="px-6 py-2 rounded-full border border-white text-white hover:bg-white hover:text-black transition"
          >
            Book Bike Service
          </button>
        </div>
      </div>
    </section>
  );
};

export default BikeServices;
