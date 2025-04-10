import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Product$Services = ({ portfolioData }) => {
  const shouldRender =
    portfolioData.products && portfolioData.products.length > 0;
  const logoUrl = portfolioData.profileImage;

  if (!portfolioData.services || portfolioData.services.length === 0) {
    return null;
  }

  const shouldRenderService =
    portfolioData.services &&
    portfolioData.services.some(
      (service) =>
        service.heading.trim() !== "" || service.description.trim() !== ""
    );
  return (
    <div className=" flex justify-between items-center px-10 md:px-20" id="products">
      <div className="py-8 md:pl-40">
        <h1 className="text-3xl md:text-5xl font-semibold"> Product & Services</h1>
        <div className=" flex justify-between md:flex-col">
        {shouldRender && (
          <div className=" flex flex-col mt-4">
            <h1 className="font-bold text-2xl mb-2">Products</h1>
            {portfolioData.products.map((product, index) => (
              <p>{product.productName}</p>
            ))}
          </div>
        )}

        {shouldRenderService && (
          <div className=" flex flex-col mt-4">
            <h1 className="font-bold text-2xl mb-2">Services</h1>
            {portfolioData.services.map((service, index) => (
            <p>{service?.heading}</p>
            ))}
          </div>
        )}

</div>
      </div>

      <img src={logoUrl} alt="" className=" w-1/3  hidden md:block" />
    </div>
  );
};

export default Product$Services;
