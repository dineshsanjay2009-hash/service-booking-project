const DashboardCard = ({ title, value }) => {
  return (
    <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-xl p-6 shadow-lg">
      <p className="text-sm text-gray-300">{title}</p>
      <h2 className="text-4xl font-bold mt-2">{value}</h2>
    </div>
  );
};

export default DashboardCard;
