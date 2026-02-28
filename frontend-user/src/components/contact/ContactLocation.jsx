const ContactLocation = () => {
  return (
    <section className="py-12 sm:py-16 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-10">
          Our Location
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-gray-50 p-4 sm:p-6 rounded-xl shadow">

          {/* ADDRESS SECTION */}
          <div>
            <h5 className="font-bold text-base sm:text-lg mb-3 sm:mb-4">
              📍 Our Address
            </h5>

            <p className="text-gray-700 text-sm sm:text-lg leading-relaxed mb-4">
              <strong>ServiceHub</strong><br />
              Anna Nagar, Chennai – 600040<br />
              Tamil Nadu, India
            </p>

            <ul className="list-disc pl-5 text-gray-600 text-sm sm:text-base space-y-1">
              <li>Easy access from all main roads</li>
              <li>Near Anna Nagar Tower & Metro</li>
              <li>Bike & Car services available</li>
              <li>Pickup & drop supported</li>
            </ul>

            <p className="text-xs sm:text-sm text-gray-500 mt-4">
              🕘 <strong>Working Hours:</strong> Mon – Sat, 9 AM – 7 PM
            </p>
          </div>

          {/* MAP */}
          <div className="rounded overflow-hidden shadow">
            <iframe
              title="ServiceHub Location"
              src="https://www.google.com/maps?q=Anna%20Nagar%20Chennai&output=embed"
              className="w-full h-64 sm:h-[320px] border-0"
              loading="lazy"
            />
          </div>

        </div>
      </div>
    </section>
  );
};

export default ContactLocation;