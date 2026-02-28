const MissionVision = () => {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-10">

        <div>
          <span className="uppercase text-sm font-bold tracking-widest text-blue-600">
            Who We Are
          </span>

          <h2 className="text-3xl font-bold mt-3 mb-4">
            Reliable Vehicle Care, Simplified
          </h2>

          <p className="text-gray-600 mb-3">
            ServiceHub connects customers with certified mechanics to deliver
            professional bike and car servicing at transparent prices.
          </p>

          <p className="text-gray-600">
            We remove uncertainty from vehicle maintenance through clear
            communication, expert handling, and dependable service standards.
          </p>
        </div>

        <div className="bg-gray-50 p-6 rounded-xl border-l-4 border-blue-600">
          <h5 className="font-bold mb-3">
            Why Customers Trust ServiceHub
          </h5>

          <ul className="text-gray-600 space-y-2 list-disc list-inside">
            <li>Certified & experienced mechanics</li>
            <li>Genuine spare parts only</li>
            <li>Transparent pricing model</li>
            <li>Service warranty & long-term support</li>
          </ul>
        </div>

      </div>
    </section>
  );
};

export default MissionVision;
