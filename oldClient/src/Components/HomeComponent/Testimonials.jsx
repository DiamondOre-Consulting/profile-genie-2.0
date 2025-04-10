import React, { useEffect, useRef } from 'react';
import bgvedio from '../../assets/bgvedio.mp4';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Testimonials = () => {
  const sectionRef = useRef(null);
  const testimonialsRef = useRef([]);

  useEffect(() => {
    const sectionElement = sectionRef.current;
    const testimonials = testimonialsRef.current;

    gsap.fromTo(
      testimonials,
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

  const testimonials = [
    {
      name: "Sunil Verma, CEO of",
      title: "Verma Enterprises",
      quote: "We wanted a professional and visually appealing portfolio to present our business to clients. Profile Genie crafted a portfolio that perfectly captures our brand and services. The process was seamless, and the results speak for themselves",
      stars: 5,
    },
    {
      name: "Priya Desai, CEO of",
      title: "Digital Consulting",
      quote: "We needed a way to highlight our business’s achievements and offerings in a way that would stand out to potential clients. Profile Genie delivered a portfolio that not only looks amazing but also effectively communicates our brand message",
      stars: 4,
    },
    {
      name: "Nidhi Kapoor, Software",
      title: "Engineer",
      quote: "The team at Profile Genie took the time to understand my career goals and crafted a portfolio that aligned perfectly with my vision. Their expertise in content and design made a significant difference in how I present myself to employers",
      stars: 5,
    }
  ];

  return (
    <>
      <div className="relative md:h-screen h-auto overflow-hidden" id="testi" ref={sectionRef}>
        {/* Background Video */}
        <video
          className="absolute h-full object-cover w-full"
          autoPlay
          loop
          muted
        >
          <source src={bgvedio} type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Overlay Text */}
        <div className="relative z-10 flex items-center h-full">
          <div className="text-white p-8 md:p-16">
            <h1 className="text-5xl font-bold leading-9 font-serif text-center">Testimonials</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mt-20">
              {testimonials.map((testimonial, index) => (
                <div
                  key={index}
                  ref={(el) => (testimonialsRef.current[index] = el)}
                  className="bg-[#2C1E4A] bg-opacity-60 p-8 rounded-lg shadow-lg flex flex-col items-center"
                >
                  <div className="mb-4 flex">
                    {Array.from({ length: testimonial.stars }).map((_, starIndex) => (
                      <svg
                        key={starIndex}
                        className="w-8 h-8 text-yellow-400 mb-2"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-gray-300 mb-4 text-center tracking-widest">
                    {testimonial.quote}
                  </p>
                  <div className="mt-auto">
                    <h3 className="text-xl font-semibold text-center tracking-wider">
                      - {testimonial.name}
                    </h3>
                    <p className="text-gray-400 text-center tracking-wider">
                      {testimonial.title}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Overlay to Darken the Video */}
        <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50"></div>
      </div>
    </>
  );
};

export default Testimonials;
