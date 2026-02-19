const ServiceDetailsLayout = ({
  image,
  title,
  price,
  description,
  includes,
  children,
}) => {
  return (
    <div className="bg-gray-50 py-16">
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-start">

        {/* LEFT IMAGE */}
        <div>
          <img
            src={image}
            alt={title}
            className="rounded-xl shadow-lg w-full object-cover"
          />
        </div>

        {/* RIGHT CONTENT */}
        <div>
          <h1 className="text-4xl font-bold mb-2">{title}</h1>
          <p className="text-2xl font-semibold text-blue-600 mb-4">
            {price}
          </p>

          <p className="text-gray-600 mb-6">
            {description}
          </p>

          <h3 className="text-xl font-semibold mb-3">
            What’s Included
          </h3>

          <ul className="list-disc pl-5 text-gray-700 mb-6 space-y-1">
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
