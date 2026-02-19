import { useEffect, useState } from "react";
import api from "../../services/api";
import DashboardCard from "../components/DashboardCard";
import DashboardCharts from "../components/DashboardCharts";

const Dashboard = () => {
  const [stats, setStats] = useState({
    carousels: 0,
    bikeServices: 0,
    carServices: 0,
    packages: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [carouselRes, bikeRes, carRes, packageRes] =
          await Promise.all([
            api.get("/carousel/"),
            api.get("/services/bike/"),
            api.get("/services/car/"),
            api.get("/packages/"),
          ]);

        setStats({
          carousels: carouselRes.data.length,
          bikeServices: bikeRes.data.length,
          carServices: carRes.data.length,
          packages: packageRes.data.length,
        });
      } catch (err) {
        console.error("Dashboard stats error", err);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>

      {/* ===== CARDS (UNCHANGED) ===== */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <DashboardCard title="Total Carousels" value={stats.carousels} />
        <DashboardCard title="Bike Services" value={stats.bikeServices} />
        <DashboardCard title="Car Services" value={stats.carServices} />
        <DashboardCard title="Packages" value={stats.packages} />
      </div>

      {/* ===== CHARTS (FULL WIDTH, NEW) ===== */}
      <DashboardCharts />
    </div>
  );
};

export default Dashboard;
