const ServiceProcess = () => {
  const steps = [
    { step: "01", title: "Inspection", desc: "Detailed vehicle check" },
    { step: "02", title: "Approval", desc: "Transparent cost approval" },
    { step: "03", title: "Servicing", desc: "Expert handling" },
    { step: "04", title: "Quality Check", desc: "Final inspection" },
  ];

  return (
    <section className="py-14 sm:py-20 bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        <h2 className="text-center text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">
          Our Service Process & Standards
        </h2>

        <p className="text-center text-gray-600 mb-8 sm:mb-12 text-sm sm:text-lg max-w-2xl mx-auto">
          A transparent, step-by-step approach built for quality and trust.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {steps.map((item, index) => (
            <div
              key={index}
              className="bg-white p-6 sm:p-8 rounded-xl shadow text-center hover:shadow-lg transition"
            >
              <div className="w-12 h-12 sm:w-14 sm:h-14 mx-auto mb-4 rounded-full bg-blue-600 text-white flex items-center justify-center text-base sm:text-xl font-bold">
                {item.step}
              </div>

              <h4 className="text-lg sm:text-xl font-semibold mb-2">
                {item.title}
              </h4>

              <p className="text-gray-600 text-sm sm:text-base">
                {item.desc}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default ServiceProcess;