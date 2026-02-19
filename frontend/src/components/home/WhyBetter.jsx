const WhyBetter = () => {
  const points = [
    {
      title: "Certified Mechanics",
      desc: "Verified professionals with proven expertise",
    },
    {
      title: "Transparent Pricing",
      desc: "No hidden charges, clear cost breakdown",
    },
    {
      title: "Genuine Parts",
      desc: "Only quality-approved components used",
    },
    {
      title: "Service Warranty",
      desc: "Peace of mind with assured service support",
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-6">

        <h2 className="text-4xl font-bold text-center mb-4">
          Why Our Services Are Better
        </h2>

        <p className="text-center text-gray-600 mb-12 text-lg">
          Built on trust, transparency, and technical excellence.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {points.map((item, i) => (
            <div
              key={i}
              className="border rounded-lg p-8 text-center hover:shadow-md transition"
            >
              <h6 className="text-xl font-semibold mb-3">
                {item.title}
              </h6>

              <p className="text-gray-600 leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default WhyBetter;
