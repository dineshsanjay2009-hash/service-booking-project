const DashboardCard = ({ title, value }) => {
  return (
    <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-xl p-4 sm:p-6 shadow-lg">
      <p className="text-xs sm:text-sm text-gray-300">
        {title}
      </p>
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mt-1 sm:mt-2 whitespace-nowrap">
        {value}
      </h2>
    </div>
  );
};

export default DashboardCard;