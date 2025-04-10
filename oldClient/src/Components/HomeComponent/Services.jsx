import React, { useEffect, useRef } from 'react';
import bgvedio from '../../assets/bgvedio.mp4';
import img1 from '../../assets/6.png';
import img2 from '../../assets/7.png';
import img3 from '../../assets/8.png';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Services = () => {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    const sectionElement = sectionRef.current;
    const cards = cardsRef.current;

    gsap.fromTo(
      cards,
      {
        opacity: 0,
        y: 50,
      },
      {
        opacity: 1,
        y: 0,
        duration: 1.5,
        stagger: 0.3,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: sectionElement,
          start: 'top 80%',
          end: 'bottom top',
          scrub: true, // Optional: makes the animation sync with scrolling
        },
      }
    );
  }, []);

  return (
    <>
      <div className="relative md:h-screen h-auto overflow-hidden" id="service" ref={sectionRef}>
        {/* Background Video */}
        <video
          className="absolute h-full object-cover w-full rotate-180"
          autoPlay
          loop
          muted
        >
          <source src={bgvedio} type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Overlay Text */}
        <div className="relative z-10 flex items-start justify-center h-full">
          <div className="text-white p-8 md:p-16">
            <h1 className="text-5xl font-bold leading-9 font-serif text-center fade-in">Our Services</h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-20 md:gap-28 mt-20">
              {/* 1st */}
              <div ref={(el) => (cardsRef.current[0] = el)}>
                <div className="max-w-xs bg-white rounded-lg shadow">
                  <a href="#">
                    <img className="rounded-t-lg" src={img1} alt="Business Portfolio" />
                  </a>
                  <div className="p-5">
                    <a href="#">
                      <h5 className="mb-2 text-2xl font-bold font-serif text-center tracking-tight text-gray-900 ">
                        Business Portfolio
                      </h5>
                    </a>
                    <p className="mb-3 font-normal text-gray-700 ">
                      Showcase your business confidently by emphasizing strengths, services, and success stories to attract clients and build your brand.
                    </p>
                  </div>
                </div>
              </div>

              {/* 2nd */}
              <div ref={(el) => (cardsRef.current[1] = el)}>
                <div className="max-w-xs bg-white rounded-lg shadow">
                  <a href="#">
                    <img className="rounded-t-lg" src={img2} alt="Personal Portfolio" />
                  </a>
                  <div className="p-5">
                    <a href="#">
                      <h5 className="mb-2 text-2xl font-bold font-serif text-center tracking-tight text-gray-900 ">
                        Personal Portfolio
                      </h5>
                    </a>
                    <p className="mb-3 font-normal text-gray-700 ">
                      We craft portfolios showcasing skills, achievements, and personal brand, ideal for those wanting a strong first impression.
                    </p>
                  </div>
                </div>
              </div>

              {/* 3rd */}
              <div ref={(el) => (cardsRef.current[2] = el)}>
                <div className="max-w-xs bg-white rounded-lg shadow">
                  <a href="#">
                    <img className="rounded-t-lg" src={img3} alt="Content Development" />
                  </a>
                  <div className="p-5">
                    <a href="#">
                      <h5 className="mb-2 text-2xl font-bold font-serif text-center tracking-tight text-gray-900 ">
                        Content Development
                      </h5>
                    </a>
                    <p className="mb-3 font-normal text-gray-700 ">
                      Whether you need a bio, service descriptions, or client testimonials, we’ve got you covered.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* <a href="#" className="mt-8 inline-block bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700">Learn More</a> */}
          </div>
        </div>

        {/* Overlay to Darken the Video */}
        <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50"></div>
      </div>
    </>
  );
};

export default Services;
