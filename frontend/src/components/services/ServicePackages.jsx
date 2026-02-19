import { useEffect, useState } from "react";
import api from "../../services/api";

const ServicePackages = ({ onSelectPackage, selectedPackage }) => {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPackages();
  }, []);

  const fetchPackages = async () => {
    try {
      const res = await api.get("/packages/");
      setPackages(res.data);
    } catch (err) {
      console.error("Error fetching packages", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold mb-12">
          Service Packages
        </h2>

        {loading ? (
          <p>Loading packages...</p>
        ) : (
          <div className="grid md:grid-cols-3 gap-8">
            {packages.map((pkg) => (
              <div
                key={pkg.id}
                className={`rounded-xl shadow-md p-6 border ${
                  selectedPackage?.id === pkg.id
                    ? "border-blue-600"
                    : ""
                }`}
              >
                <h3 className="text-xl font-bold mb-2">
                  {pkg.title}
                </h3>

                <p className="text-2xl font-bold text-blue-600 mb-4">
                  ₹{pkg.price}
                </p>

                <ul className="text-gray-600 text-sm mb-6 space-y-2">
                  {pkg.features?.map((f, i) => (
                    <li key={i}>✓ {f}</li>
                  ))}
                </ul>

                <button
                  onClick={() => onSelectPackage(pkg)}
                  className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700"
                >
                  {selectedPackage?.id === pkg.id
                    ? "Selected"
                    : "Choose Plan"}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default ServicePackages;
