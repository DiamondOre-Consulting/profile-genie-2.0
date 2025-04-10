import React, { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const About = ({ portfolioData }) => {
  const shouldRender = portfolioData && portfolioData.aboutMe && portfolioData.aboutMe.trim() !== '';

  useEffect(() => {
    gsap.fromTo('.about',
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        scrollTrigger: {
          trigger: '.about',
          start: 'top 80%',
        }
      }
    );

    gsap.fromTo('.aboutme',
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        delay: 0.5,
        stagger: 0.25,
        scrollTrigger: {
          trigger: '.aboutme',
          start: 'top 80%',
        }
      }
    );
  }, []);

  const { primaryTextColor, secondaryTextColor, buttonColor, profileImage, aboutMe } = portfolioData;

  return shouldRender ? (
    <div className="flex flex-col md:flex-row-reverse items-center justify-center min-h-screen -mt-20 md:mt-0 px-6 md:px-20 w-full mx-auto bg-black text-white" id='about'>
      {/* Right Column: Text */}
      <div className="flex flex-col items-center md:items-start p-8 md:pr-8 text-center md:text-left">
        <h2 className="text-[4rem] md:text-[6rem] font-bold text-gray-400 opacity-20 z-0 leading-none -top-8 left-0">
          About
        </h2>
        <h1 className="relative text-4xl md:text-6xl font-bold mb-2 -mt-18">About Me</h1>
        <div className="flex flex-col aboutme">
          <p className="text-lg text-gray-400 mb-6 max-w-4xl mt-4 md:mt-0">
            {aboutMe}
          </p>
          {/* Uncomment if needed */}
          {/* <span className="mt-4 bg-yellow-500 text-center text-black font-bold inline py-2 rounded-full">
            Download
          </span> */}
        </div>
      </div>

      {/* Left Column: Image */}
      <div className="mb-8 md:mb-0 md:pl-8">
        <img
          src={profileImage}
          alt="Profile"
          className="rounded-lg shadow-lg w-full max-w-[700px] h-auto"
        />
      </div>
    </div>
  ) : null;
};

export default About;
