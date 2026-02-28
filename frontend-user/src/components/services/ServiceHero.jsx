const ServiceHero = () => {
  const scrollToServices = () => {
    const el = document.getElementById("services-section");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      className="relative text-white flex items-center justify-center min-h-[60vh] sm:min-h-[70vh] bg-cover bg-center"
      style={{
        backgroundImage:
          "linear-gradient(rgba(0,0,0,0.45), rgba(0,0,0,0.65)), url('https://images.unsplash.com/photo-1486006920555-c77dcf18193c')",
      }}
    >
      <div className="text-center px-4 sm:px-6 mt-12 sm:mt-16 max-w-3xl">
        
        <h1 className="font-bold text-2xl sm:text-4xl md:text-5xl mb-3">
          Bike & Car Services
        </h1>

        <p className="text-sm sm:text-lg mb-5 opacity-95">
          Reliable bike and car servicing by experienced mechanics.
          Easy booking, transparent pricing, and quality service you can trust.
        </p>

        <button
          onClick={scrollToServices}
          className="bg-yellow-500 hover:bg-yellow-600 text-black px-6 sm:px-8 py-2 sm:py-3 rounded-full font-semibold shadow text-sm sm:text-base transition w-full sm:w-auto"
        >
          View Our Services
        </button>

      </div>
    </section>
  );
};

export default ServiceHero;