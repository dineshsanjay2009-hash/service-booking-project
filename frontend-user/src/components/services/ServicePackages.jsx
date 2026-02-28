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
    <section className="py-12 sm:py-16 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
        
        <h2 className="text-2xl sm:text-3xl font-bold mb-8 sm:mb-12">
          Service Packages
        </h2>

        {loading ? (
          <p className="text-sm sm:text-base">
            Loading packages...
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
            {packages.map((pkg) => (
              <div
                key={pkg.id}
                className={`rounded-xl shadow-md p-5 sm:p-6 border transition ${
                  selectedPackage?.id === pkg.id
                    ? "border-blue-600"
                    : "border-gray-200"
                }`}
              >
                <h3 className="text-lg sm:text-xl font-bold mb-2">
                  {pkg.title}
                </h3>

                <p className="text-xl sm:text-2xl font-bold text-blue-600 mb-4">
                  ₹{pkg.price}
                </p>

                <ul className="text-gray-600 text-xs sm:text-sm mb-6 space-y-2 text-left">
                  {pkg.features?.map((f, i) => (
                    <li key={i}>✓ {f}</li>
                  ))}
                </ul>

                <button
                  onClick={() => onSelectPackage(pkg)}
                  className={`px-5 py-2 rounded text-sm sm:text-base font-medium transition w-full ${
                    selectedPackage?.id === pkg.id
                      ? "bg-blue-700 text-white"
                      : "bg-blue-600 text-white hover:bg-blue-700"
                  }`}
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