import { useNavigate } from "react-router-dom";

const CarServices = () => {
  const navigate = useNavigate();

  const services = [
    {
      title: "Full Car Service",
      desc: "Complete health check & tuning",
    },
    {
      title: "AC Service",
      desc: "Cooling system inspection & refill",
    },
    {
      title: "Wheel Alignment",
      desc: "Smooth handling & tyre life",
    },
  ];

  return (
    <section className="w-full">
      <div className="grid grid-cols-1 md:grid-cols-2">

        {/* LEFT – IMAGE / CAROUSEL LOOK */}
        <div className="h-[75vh] bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1503376780353-7e6692767b70')",
          }}
        />

        {/* RIGHT – CONTENT */}
        <div className="flex items-center bg-gray-50 px-10 py-12">
          <div className="max-w-xl">

            <span className="uppercase tracking-[2px] text-blue-600 font-bold text-xs">
              Professional Care
            </span>

            <h2 className="text-4xl font-bold mt-3 mb-4">
              Car Services
            </h2>

            <p className="text-gray-600 mb-6 leading-relaxed">
              Advanced diagnostics & professional servicing designed to
              improve performance, safety, and long-term reliability.
            </p>

            {/* Service list */}
            <div className="space-y-4 mb-8">
              {services.map((item, i) => (
                <div
                  key={i}
                  className="bg-white p-4 rounded-lg border-l-4 border-blue-600 shadow-sm"
                >
                  <h6 className="font-semibold">
                    {item.title}
                  </h6>
                  <p className="text-gray-600 text-sm">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>

            <button
              onClick={() => navigate("/services")}
              className="px-8 py-2 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition"
            >
              Book Car Service
            </button>

          </div>
        </div>

      </div>
    </section>
  );
};

export default CarServices;
