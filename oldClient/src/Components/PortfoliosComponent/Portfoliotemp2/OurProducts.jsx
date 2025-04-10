import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const OurProducts = ({ portfolioData }) => {
  const productsRef = useRef([]);

  useEffect(() => {
    productsRef.current.forEach((el, index) => {
      gsap.fromTo(
        el,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          scrollTrigger: {
            trigger: el,
            start: "top 80%",
            end: "top 30%",
            toggleActions: "play none none reverse",
          },
          delay: index * 0.2,
          duration: 1,
        }
      );
    });
  }, []);

  const primaryTextColor = portfolioData.primaryTextColor;
  const buttonBgColor = portfolioData.buttonColor;
  const secondaryTextColor = portfolioData.secondaryTextColor;
  const backgroundColor = portfolioData.bgColor || "#000000";

  const shouldRender =
    portfolioData.products && portfolioData.products.length > 0;
  const logoUrl = portfolioData.productImage;
  return (
    <>
      {shouldRender && (
        <div>
          <div className="flex  flex-col justify-center items-center out overflow-x-hidden " id="product">
            <h2 className=" text-[5rem]   font-bold text-gray-100 opacity-20 z-0 leading-none -top-8 left-0">
              Prouducts
            </h2>
            <h1 className=" text-center text-6xl text-gray-100  font-bold mb-4">
              Our Products
            </h1>
            <div className="w-60 h-1 bg-yellow-500 mx-auto rounded-full"></div>
          </div>
          <section
            id="Projects "
            class="w-fit mx-auto grid py-20 grid-cols-1 lg:grid-cols-3 md:grid-cols-2 justify-items-center justify-center gap-y-20 gap-x-14 mt-10 "
          >
            {portfolioData.products.map((product, index) => (
              <div
                key={index}
                ref={(el) => (productsRef.current[index] = el)}
                class="w-96 bg-transparent shadow-md  duration-500 hover:scale-105 hover:shadow-xl"
              >
                <a href="#">
                  <img
                    src={product.productImage}
                    alt="Product"
                    class="h-96 w-96 object-cover "
                  />
                  <div class="py-4 w-full">
                    <p class="text-2xl hover:text-yellow-500 font-bold text-gray-100 truncate block capitalize">
                      {product.productName}
                    </p>
                    <span class="text-gray-400 mr-3 capitlized text-xs">
                      {product.productDescription}
                    </span>
                  </div>
                </a>
              </div>
            ))}
          </section>
        </div>
      )}
    </>
  );
};

export default OurProducts;
