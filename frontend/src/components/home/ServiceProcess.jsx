const ServiceProcess = () => {
  const steps = [
    {
      step: "01",
      title: "Inspection",
      desc: "Detailed vehicle check",
    },
    {
      step: "02",
      title: "Approval",
      desc: "Transparent cost approval",
    },
    {
      step: "03",
      title: "Servicing",
      desc: "Expert handling",
    },
    {
      step: "04",
      title: "Quality Check",
      desc: "Final inspection",
    },
  ];

  return (
    <section className="py-20 bg-gray-100">
      <div className="max-w-7xl mx-auto px-6">

        <h2 className="text-center text-4xl font-bold mb-4">
          Our Service Process & Standards
        </h2>

        <p className="text-center text-gray-600 mb-12 text-lg">
          A transparent, step-by-step approach built for quality and trust.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {steps.map((item, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-xl shadow text-center hover:shadow-lg transition"
            >
              <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-blue-600 text-white flex items-center justify-center text-xl font-bold">
                {item.step}
              </div>

              <h4 className="text-xl font-semibold mb-2">
                {item.title}
              </h4>

              <p className="text-gray-600">
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
