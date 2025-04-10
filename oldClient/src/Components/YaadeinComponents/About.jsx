import React from "react";

const About = ({ portfolioData }) => {
  const shouldRender =
    portfolioData.products && portfolioData.products.length > 0;

  // Extract the zeroth index heading if available
  const heading = shouldRender ? portfolioData.products[0]?.productName : '';

  return (
    <div className="relative -mt-30">
     

      <div className="relative h-auto px-4 md:px-20 space-y-20 py-10">
        {/* Display only the zeroth index heading */}
        {heading && (
          <h1 className="text-4xl font-bold mb-8 text-center">
            {heading}
          </h1>
        )}

        {/* Map through the products and alternate image and text positions */}
        {portfolioData.products.map((product, index) => (
          <div
            key={index}
            className={`flex flex-col md:flex-${index % 2 === 0 ? 'row' : 'row-reverse'} items-center gap-10 mb-8`}
          >
            <div className="flex-shrink-0 w-full md:w-1/2">
              <img
                src={product.productImage}
                alt={product.productName}
                className="w-full h-auto object-cover"
              />
            </div>
            <div className="flex-shrink-0 w-full md:w-1/2">
              <p className="text-xl md:text-4xl">
                {product.productDescription}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default About;
