import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { portfolioResponse } from "@/validations/PortfolioValidation";

gsap.registerPlugin(ScrollTrigger);

const AboutmeBrands = ({ portfolioData }: { portfolioData: portfolioResponse }) => {
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



  return (
    <div>
      {portfolioData?.otherDetails?.brands?.brandList && (
        <div className="max-w-[75rem] mx-auto  ">
          <div className="flex flex-wrap items-start justify-center gap-8 text-gray-500 ">
            {portfolioData?.otherDetails?.brands?.brandList?.map((brand, index) => (
              <a
                key={index}
                className="flex items-center justify-center"
              >
                <div className="flex flex-col items-center w-40 h-40 sm:w-52 sm:h-52">
                  <img
                    className="object-cover w-full h-full bg-gray-200 rounded-md hover:text-gray-900"
                    src={brand?.image?.url}
                  />

                  <p className="mt-2 text-center text-gray-900" dangerouslySetInnerHTML={{ __html: brand?.brandName as string }} ></p>
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
