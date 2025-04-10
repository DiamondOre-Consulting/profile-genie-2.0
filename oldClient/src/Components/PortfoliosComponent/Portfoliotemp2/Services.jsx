import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Services = ({portfolioData}) => {


  const servicesRef = useRef([]);

  useEffect(() => {
      servicesRef.current.forEach((el, index) => {
          gsap.fromTo(
              el,
              { opacity: 0, y: 50 },
              {
                  opacity: 1,
                  y: 0,
                  scrollTrigger: {
                      trigger: el,
                      start: 'top 80%',
                      end: 'top 30%',
                      toggleActions: 'play none none reverse',
                  },
                  delay: index * 0.2,
                  duration: 1,
              }
          );
      });
  }, []);

  if (!portfolioData.services || portfolioData.services.length === 0) {
      return null;
  }

  const shouldRender = portfolioData.services && portfolioData.services.some(service =>
      service.heading.trim() !== '' ||
      service.description.trim() !== ''
  );

  return (
    <div>

{shouldRender && (
      <div className="flex justify-center  flex-col items-center min-h-screen b" id='service'>


      <h2 className="rela text-[6rem] tracking-wider font-bold text-gray-100 opacity-20 z-0 leading-none -top-8 left-0">
          Services
          </h2>
        <h1 className=" text-center text-6xl text-gray-100 -mt-28 font-bold mb-4">Our Services</h1>
        <div className="w-60 h-1 bg-yellow-500 mx-auto rounded-full"></div>
        <div className="grid grid-cols-1 mt-10 md:grid-cols-3 gap-8 p-8 ">
          {/* Card 1 */}
          {portfolioData.services.map((service, index) => (
          <div
          key={index}
          ref={(el) => (servicesRef.current[index] = el)}
           className="bg-[#1A1A1A] text-start cursor-pointer p-6 rounded-lg hover:bg-yellow-500 hover:text-gray-800">
           
            <div className="text-gray-100 text-2xl mb-4 ">{service.heading}</div>
            <div className="w-20 h-0.5 bg-yellow-500 hover:bg-white"></div>
          
            <h3 className="text-white text-md text-justify font-semibold py-2 transition duration-300 ease-in-out ">
            {service?.description}
            </h3>
          </div>

))}
        </div>
      </div>

)}
    </div>
  );
};

export default Services;
