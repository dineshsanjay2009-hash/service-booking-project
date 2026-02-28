import { useEffect, useState } from "react";
import api from "../services/api";

import BikeServiceCards from "../components/services/BikeServiceCards";
import CarServiceCards from "../components/services/CarServiceCards";
import ServicePackages from "../components/services/ServicePackages";
import ServiceHero from "../components/services/ServiceHero";

const Services = () => {
  const [bikeServices, setBikeServices] = useState([]);
  const [carServices, setCarServices] = useState([]);
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const bikeRes = await api.get("/services/bike/");
        const carRes = await api.get("/services/car/");
        const packageRes = await api.get("/packages/");

        setBikeServices(bikeRes.data || []);
        setCarServices(carRes.data || []);
        setPackages(packageRes.data || []);
      } catch (error) {
        console.error("Service fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center px-4">
        <p className="text-gray-500 text-sm sm:text-base text-center">
          Loading services...
        </p>
      </div>
    );
  }

  return (
    <>
      <ServiceHero />
      <BikeServiceCards services={bikeServices} />
      <CarServiceCards services={carServices} />
      <ServicePackages packages={packages} />
    </>
  );
};

export default Services;