import { useEffect, useState } from "react";
import api from "../../services/api";
import {
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const COLORS = ["#2563eb", "#facc15"];

const DashboardCharts = () => {
  const [weeklyBookings, setWeeklyBookings] = useState([]);
  const [serviceDistribution, setServiceDistribution] = useState([]);

  useEffect(() => {
    const fetchChartData = async () => {
      try {
        // 🔹 Weekly bookings API
       const weeklyRes = await api.get("/dashboard/weekly-bookings");


        // Backend returns { day: "Mon", count: 5 }
        const formattedWeekly = weeklyRes.data.map((item) => ({
          day: item.day,
          value: item.count,
        }));

        setWeeklyBookings(formattedWeekly);

        // 🔹 Service distribution API
       const serviceRes = await api.get("/dashboard/service-distribution");
        setServiceDistribution([
          { name: "Bike Services", value: serviceRes.data.bike },
          { name: "Car Services", value: serviceRes.data.car },
        ]);
      } catch (err) {
        console.error("Dashboard chart error", err);
      }
    };

    fetchChartData();
  }, []);

  return (
    <div className="mt-8 w-full">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

        {/* WEEKLY BOOKINGS */}
        <div className="lg:col-span-8 bg-white rounded-xl shadow p-6">
          <h3 className="font-semibold mb-4">
            Weekly Bookings Trend
          </h3>

          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={weeklyBookings}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#2563eb"
                  strokeWidth={3}
                  dot={{ r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* SERVICE DISTRIBUTION */}
        <div className="lg:col-span-4 bg-white rounded-xl shadow p-6">
          <h3 className="font-semibold mb-4">
            Service Distribution
          </h3>

          <div className="h-80 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={serviceDistribution}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={70}
                  outerRadius={100}
                  paddingAngle={6}
                >
                  {serviceDistribution.map((_, i) => (
                    <Cell key={i} fill={COLORS[i]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>
    </div>
  );
};

export default DashboardCharts;
