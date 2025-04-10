import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Testimonials = ({ portfolioData }) => {
  const testimonialsRef = useRef([]);

  useEffect(() => {
    testimonialsRef.current.forEach((el, index) => {
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
    portfolioData &&
    portfolioData.testimonials &&
    portfolioData.testimonials.length > 0;

  console.log("portfoliodarya", portfolioData);

  return (
    <>
      {shouldRender && (
        <div>
          <div className="bg-black py-10">
            <div className="max-w-5xl mx-auto">
              <h1 className="text-gray-100 text-4xl text-center md:text-left mb-6">
                Client Testimonials
              </h1>

              <div className="flex flex-col justify-center py-6 items-center border border-1 border-gray-100">
                <p className="text-2xl text-gray-100 text-center px-8">
                  {portfolioData.testimonials[0]?.mainTestimonial}
                </p>
                <p className="text-gray-100 mt-4">
                  -{portfolioData.testimonials[0]?.clientName}
                </p>
              </div>
            </div>

            {/* Updated Section with spacing */}
            <div className="flex flex-col space-y-8 md:space-y-0 md:flex-row justify-between items-start max-w-6xl mt-10 mx-auto gap-x-8 px-10 md:px-0">
              {portfolioData.testimonials.slice(1).map((testimonial, index) => (
                <div className="text-gray-100 text-wrap">
                  <p className="font-bold">{testimonial.clientName}</p>
                  <p>{testimonial.mainTestimonial}</p>
                </div>
              ))}
              {/* <div className="text-gray-100 text-wrap">
                <p className="font-bold">Testimonial 2</p>
                <p>
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                  Inventore sequi sapiente, vitae mollitia nam ullam alias earum
                  amet. Eos, quisquam est porro dolor ad ea deserunt asperiores
                  magnam nobis amet!
                </p>
              </div> */}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Testimonials;
