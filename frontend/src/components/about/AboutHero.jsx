const AboutHero = () => {
  return (
    <section
      className="relative min-h-[75vh] flex items-center justify-center text-white"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1493238792000-8113da705763')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-black/70"></div>

      <div className="relative z-10 text-center max-w-4xl px-6">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          About ServiceHub
        </h1>
        <p className="text-lg text-gray-200">
          Reliable bike & car service built on trust, technology,
          and skilled professionals.
        </p>
      </div>
    </section>
  );
};

export default AboutHero;
