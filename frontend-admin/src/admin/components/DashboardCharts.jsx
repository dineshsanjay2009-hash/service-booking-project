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

const COLORS = ["#2563eb", "#726d59"];

const DashboardCharts = () => {
  const [monthlyRevenue, setMonthlyRevenue] = useState([]);
  const [serviceDistribution, setServiceDistribution] = useState([]);

  useEffect(() => {
    const fetchChartData = async () => {
      try {
        const monthlyRes = await api.get("/dashboard/monthly-revenue");
        setMonthlyRevenue(monthlyRes.data);

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
    <div className="mt-6 sm:mt-8 w-full">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6">

        {/* MONTHLY REVENUE */}
        <div className="lg:col-span-8 bg-white rounded-xl shadow p-4 sm:p-6">
          <h3 className="font-semibold text-sm sm:text-base mb-3 sm:mb-4">
            Monthly Revenue
          </h3>

          <div style={{ width: "100%", height: 300 }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={monthlyRevenue}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="amount"
                  stroke="#2563eb"
                  strokeWidth={3}
                  dot={{ r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* SERVICE DISTRIBUTION */}
        <div className="lg:col-span-4 bg-white rounded-xl shadow p-4 sm:p-6">
          <h3 className="font-semibold text-sm sm:text-base mb-3 sm:mb-4">
            Service Distribution
          </h3>

          <div style={{ width: "100%", height: 250 }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={serviceDistribution}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={60}
                  outerRadius={90}
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

          {/* ✅ NEW LEGEND SECTION (UI ONLY) */}
          <div className="flex justify-center gap-6 mt-4 text-sm">
            <div className="flex items-center gap-2">
              <div
                className="w-4 h-4 rounded-sm"
                style={{ backgroundColor: COLORS[0] }}
              ></div>
              <span>Bike Services</span>
            </div>

            <div className="flex items-center gap-2">
              <div
                className="w-4 h-4 rounded-sm"
                style={{ backgroundColor: COLORS[1] }}
              ></div>
              <span>Car Services</span>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default DashboardCharts;