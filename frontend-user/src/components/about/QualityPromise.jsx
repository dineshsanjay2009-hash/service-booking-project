const QualityPromise = () => {
  return (
    <section className="py-16 bg-gray-100">
      <div className="max-w-6xl mx-auto px-6 text-center">

        <h2 className="text-3xl font-bold mb-3">
          Our Quality Promise
        </h2>

        <p className="text-gray-600 mb-10 text-lg">
          Built on professionalism, trust, and long-term reliability.
        </p>

        <div className="grid md:grid-cols-2 gap-6">
          {[
            ["Certified Mechanics", "Verified and trained professionals"],
            ["Genuine Parts", "Only quality-approved components"],
            ["Transparent Pricing", "No hidden charges"],
            ["Service Warranty", "Assured peace of mind"],
          ].map((item, i) => (
            <div
              key={i}
              className="bg-white p-6 rounded-xl border"
            >
              <h6 className="font-semibold mb-2">
                {item[0]}
              </h6>
              <p className="text-gray-600">
                {item[1]}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default QualityPromise;
