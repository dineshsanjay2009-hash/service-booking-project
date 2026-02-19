const ServiceHero = () => {
  const scrollToServices = () => {
    const el = document.getElementById("services-section");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      className="position-relative text-white"
      style={{
        minHeight: "70vh",
        display: "flex",
        alignItems: "center",      // ✅ vertical center
        justifyContent: "center",  // ✅ horizontal center
        backgroundImage:
          "linear-gradient(rgba(0,0,0,0.45), rgba(0,0,0,0.65)), url('https://images.unsplash.com/photo-1486006920555-c77dcf18193c')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div
        className="container text-center"
        style={{ marginTop: "60px" }} // ✅ navbar offset
      >
        <h1 className="fw-bold display-5 mb-3">
          Bike & Car Services
        </h1>

        <p
          className="lead mb-4 mx-auto"
          style={{
            maxWidth: "760px",
            fontSize: "1.15rem",
            opacity: 0.95,
          }}
        >
          Reliable bike and car servicing by experienced mechanics.
          Easy booking, transparent pricing, and quality service you can trust.
        </p>

        <button
          className="btn btn-warning px-5 py-2 rounded-pill fw-semibold shadow"
          onClick={scrollToServices}
        >
          View Our Services
        </button>
      </div>
    </section>
  );
};

export default ServiceHero;
