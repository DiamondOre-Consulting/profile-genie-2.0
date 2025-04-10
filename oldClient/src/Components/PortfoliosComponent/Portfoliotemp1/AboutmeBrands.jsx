import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const AboutmeBrands = ({ portfolioData }) => {
  const brandsRef = useRef([]);

  useEffect(() => {
    brandsRef.current.forEach((el, index) => {
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

  const primaryTextColor = portfolioData.primaryTextColor || "#000";
  const buttonBgColor = portfolioData.buttonColor || "#f00";
  const secondaryTextColor = portfolioData.secondaryTextColor || "#555";
  const backgroundColor = portfolioData.bgColor || "#fff";
  const shouldRender =
    portfolioData.aboutMeBrands && portfolioData.aboutMeBrands.length > 0;

    
  return (
    <div>
      {shouldRender && (
        <div class="container mx-auto ">
          <div class="grid grid-cols-2 gap-8 text-gray-500 sm:gap-12 md:grid-cols-3 lg:grid-cols-5 ">
            {portfolioData.aboutMeBrands.map((brand, index) => (
              <a
                key={index}
                ref={(el) => (brandsRef.current[index] = el)}
                class="flex justify-center items-center"
              >
                <div className="flex flex-col items-center">
                <img
                  class="h-24 hover:text-gray-900 "
                  src={brand?.brandImage}
                />

                <p className=" text-gray-900 mt-2 ">{brand?.brandName}</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AboutmeBrands;
