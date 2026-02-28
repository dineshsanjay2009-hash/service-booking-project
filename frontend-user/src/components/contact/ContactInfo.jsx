const ContactInfo = () => {
  return (
    <section className="py-12 sm:py-16 bg-gray-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 text-center">

        {[
          ["📞 Phone", "+91 98765 43210"],
          ["✉️ Email", "support@servicehub.com"],
          ["⏰ Working Hours", "Mon – Sat : 9 AM – 7 PM"],
        ].map((item, i) => (
          <div
            key={i}
            className="bg-white p-5 sm:p-6 rounded-xl shadow"
          >
            <h5 className="font-bold mb-2 text-base sm:text-lg">
              {item[0]}
            </h5>
            <p className="text-gray-600 text-sm sm:text-base">
              {item[1]}
            </p>
          </div>
        ))}

      </div>
    </section>
  );
};

export default ContactInfo;