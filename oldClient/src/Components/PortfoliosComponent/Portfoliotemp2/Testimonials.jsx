import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Sample testimonials data

const Testimonials = ({portfolioData}) => {
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
  return (
    <>
      {shouldRender && (
        <div className="py-10 px-4 sm:px-6 lg:px-8 ">
          <h2 className="text-4xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-8 text-gray-100">
            Testimonials
          </h2>
          <div className="grid grid-cols-1 mt-4 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {portfolioData.testimonials.map((testimonial, index) => (
              <div
              key={index}
              ref={(el) => (testimonialsRef.current[index] = el)}
                className="bg-transparen p-6 rounded-lg shadow-lg text-center border border-gray-200 transition-transform transform hover:scale-105"
              >
                <img
                  src="https://w7.pngwing.com/pngs/178/595/png-transparent-user-profile-computer-icons-login-user-avatars-thumbnail.png"
                  alt={testimonial.name}
                  className="w-24 h-24 sm:w-32 sm:h-32 md:w-20 md:h-20 rounded-full mx-auto mb-4 border-4 border-gray-300"
                />
                <h3 className="text-lg sm:text-xl md:text-2xl font-semibold mb-1 text-gray-100">
                {testimonial.clientName}
                </h3>
                <p className="text-sm sm:text-base md:text-lg text-gray-500 mb-4">
                {testimonial.mainTestimonial}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Testimonials;
