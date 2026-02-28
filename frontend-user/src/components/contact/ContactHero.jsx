const ContactHero = () => {
  return (
    <section
      className="relative min-h-[40vh] sm:min-h-[50vh] flex items-center justify-center text-center text-white"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1521791136064-7986c2920216')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/70"></div>

      {/* Content */}
      <div className="relative z-10 px-4 sm:px-6">
        <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold">
          Contact Us
        </h1>

        <p className="text-sm sm:text-lg mt-2 sm:mt-3 max-w-xl mx-auto">
          We’re here to help you with bike & car services
        </p>
      </div>
    </section>
  );
};

export default ContactHero;