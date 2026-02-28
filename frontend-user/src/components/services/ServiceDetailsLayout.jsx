const ServiceDetailsLayout = ({
  image,
  title,
  price,
  description,
  includes,
  children,
}) => {
  return (
    <div className="bg-gray-50 py-12 sm:py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 items-start">

        {/* LEFT IMAGE */}
        <div>
          <img
            src={image}
            alt={title}
            className="rounded-xl shadow-lg w-full h-64 sm:h-80 md:h-auto object-cover"
          />
        </div>

        {/* RIGHT CONTENT */}
        <div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2">
            {title}
          </h1>

          <p className="text-lg sm:text-xl md:text-2xl font-semibold text-blue-600 mb-4">
            {price}
          </p>

          <p className="text-gray-600 text-sm sm:text-base mb-6">
            {description}
          </p>

          <h3 className="text-lg sm:text-xl font-semibold mb-3">
            What’s Included
          </h3>

          <ul className="list-disc pl-5 text-gray-700 text-sm sm:text-base mb-6 space-y-1">
            {includes.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>

          {/* BUTTON / FORM SLOT */}
          {children}
        </div>

      </div>
    </div>
  );
};

export default ServiceDetailsLayout;