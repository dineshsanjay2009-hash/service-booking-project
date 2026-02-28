import { useEffect, useState } from "react";
import api from "../../services/api"; // ✅ CORRECT PATH

const Achievements = () => {
  const [achievements, setAchievements] = useState([]);

  useEffect(() => {
    api
      .get("/achievements/")
      .then((res) => setAchievements(res.data))
      .catch((err) => console.error("Achievements error", err));
  }, []);

  return (
    <section className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-6 text-center">

        <h2 className="text-3xl font-bold mb-12">
          Our Achievements & Impact
        </h2>

        <div className="grid md:grid-cols-4 gap-6">
          {achievements.map((item, i) => (
            <div
              key={i}
              className="bg-gray-50 p-6 rounded-xl shadow-sm"
            >
              <h3 className="text-3xl font-bold text-blue-600">
                {item.value}
              </h3>
              <p className="text-gray-600 mt-2">
                {item.title}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Achievements;
