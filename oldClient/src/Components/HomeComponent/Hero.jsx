import React, { useEffect, useRef } from 'react';
import bgvedio from '../../assets/bgvedio.mp4';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const textRef = useRef(null);

  useEffect(() => {
    const element = textRef.current;
    
    gsap.fromTo(
      element.querySelectorAll('.text-content'),
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
          trigger: element,
          start: 'top 80%', // Adjust start position as needed
        },
      }
    );
  }, []);

  return (
    <div className="relative h-screen overflow-hidden" id="home">
      {/* Background Video */}
      <video
        className="absolute top-0 left-0 h-full object-cover w-full"
        autoPlay
        loop
        muted
      >
        <source src={bgvedio} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Overlay Text */}
      <div className="relative z-10 flex items-center h-full" ref={textRef}>
        <div className="text-white p-6 md:p-16 md:max-w-5xl w-full">
          <h1 className="text-4xl md:text-6xl font-bold font-serif leading-snug text-content">
            Your Story, Perfectly Packaged
          </h1>
          <p className="mt-4 text-lg md:text-xl text-content">
            Tailored Portfolios for Every Need
          </p>
          
          <a
            href="#contact"
            className="mt-8 inline-block bg-transparent text-white py-4 px-20 rounded-full border border-2 border-white font-bold text-xl text-content"
          >
            Get Started
          </a>
        </div>
      </div>

      {/* Overlay to Darken the Video */}
      <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50"></div>
    </div>
  );
};

export default Hero;
