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
    bikeBookings: 0,
    carBookings: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [
          carouselRes,
          bikeRes,
          carRes,
          bookingStatsRes,
        ] = await Promise.all([
          api.get("/carousel/"),
          api.get("/services/bike/"),
          api.get("/services/car/"),
          api.get("/dashboard/stats"),
        ]);

        setStats({
          carousels: carouselRes.data.length,
          bikeServices: bikeRes.data.length,
          carServices: carRes.data.length,
          packages: bookingStatsRes.data.packageBookings, // ✅ changed
          bikeBookings: bookingStatsRes.data.bikeBookings,
          carBookings: bookingStatsRes.data.carBookings,
        });
      } catch (err) {
        console.error("Dashboard stats error", err);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="p-4 sm:p-6">
      <h1 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">
        Admin Dashboard
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
        
        <DashboardCard title="Booked Packages" value={stats.packages} />
        <DashboardCard title="Bike Bookings" value={stats.bikeBookings} />
        <DashboardCard title="Car Bookings" value={stats.carBookings} />
      </div>

      <DashboardCharts />
    </div>
  );
};

export default Dashboard;