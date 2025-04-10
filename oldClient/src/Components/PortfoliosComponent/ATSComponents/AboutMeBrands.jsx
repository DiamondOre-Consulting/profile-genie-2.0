import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import b1 from '../../../assets/b1.png'
import b2 from '../../../assets/b2.png'
import b3 from '../../../assets/b3.png'
import b4 from '../../../assets/b4.png'
import b5 from '../../../assets/b5.png'

gsap.registerPlugin(ScrollTrigger);

const AboutmeBrands = () => {
  // Hardcoded data
  const portfolioData = {
    primaryTextColor: "#000",
    buttonColor: "#f00",
    secondaryTextColor: "#555",
    bgColor: "#fff",
    aboutMeBrands: [
      { brandImage: b1 },
      { brandImage: b2 },
      { brandImage: b3 },
      { brandImage: b4 },
      { brandImage: b5 },
    ],
  };

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

  const primaryTextColor = portfolioData.primaryTextColor;
  const buttonBgColor = portfolioData.buttonColor;
  const secondaryTextColor = portfolioData.secondaryTextColor;
  const backgroundColor = portfolioData.bgColor;
  const shouldRender =
    portfolioData.aboutMeBrands && portfolioData.aboutMeBrands.length > 0;

  return (
    <div>
      {shouldRender && (
        <div className="container mx-auto">
          <div className="grid grid-cols-2 gap-8 text-gray-500 sm:gap-12 md:grid-cols-3 lg:grid-cols-5">
            {portfolioData.aboutMeBrands.map((brand, index) => (
              <a
                key={index}
                ref={(el) => (brandsRef.current[index] = el)}
                className="flex justify-center items-center"
              >
                <img
                  className="h-24 hover:text-gray-900"
                  src={brand?.brandImage}
                  alt={`Brand ${index + 1}`}
                />
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AboutmeBrands;
