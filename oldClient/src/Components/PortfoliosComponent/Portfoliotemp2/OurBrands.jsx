import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const OurBrands = ({ portfolioData }) => {
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

  const shouldRender =
    portfolioData.aboutMeBrands && portfolioData.aboutMeBrands.length > 0;

  return (
    <>
      {shouldRender && (
        <div className="flex flex-wrap justify-center mx-auto p-4">
          {/* Rounded Div with Background Image */}
          {portfolioData.aboutMeBrands.map((brand, index) => (
            <div
              key={index}
              ref={(el) => (brandsRef.current[index] = el)}
              className="flex-shrink-0 m-4 rounded-full border p-4 bg-yellow-500 border-6 border-yellow-500"
              style={{
                backgroundImage: `url(${brand?.brandImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                width: '80px',  // Default width for small screens
                height: '80px', // Default height for small screens
              }}
            ></div>
          ))}
        </div>
      )}
    </>
  );
};

export default OurBrands;
