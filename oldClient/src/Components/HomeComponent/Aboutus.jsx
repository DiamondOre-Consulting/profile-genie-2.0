import React, { useEffect, useRef } from 'react';
import bgvedio from '../../assets/bgvedio.mp4';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Aboutus = () => {
  const textRef = useRef(null);

  useEffect(() => {
    const element = textRef.current;

    gsap.fromTo(
      element.querySelectorAll('.fade-in'),
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
          start: 'top 80%',
          end: 'bottom top',
          scrub: true, // Optional: makes the animation sync with scrolling
        },
      }
    );
  }, []);

  return (
    <>
      <div className="relative md:h-screen h-auto overflow-hidden" id="about">
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
        <div className="relative z-10 flex items-start h-full" ref={textRef}>
          <div className="text-white p-4 md:p-16">
            <h1 className="text-3xl font-bold leading-9 font-serif md:ml-0 ml-4 fade-in">About Us</h1>
            <div className="px-10 mt-10 space-y-20 md:space-y-40">
              <p className="float-left w-full md:w-1/2 text-justify md:pr-5 tracking-wide fade-in">
                At Profile Genie, we believe that your story deserves to be told in the most compelling way possible. Whether you're an individual looking to showcase your professional journey or a business aiming to present your services, we specialize in creating stunning, customized portfolios that leave a lasting impression.
              </p>
              <p className="float-right w-full md:w-1/2 text-justify md:pl-5 mt-10 md:mt-20 tracking-wide fade-in">
                Our mission is simple: to help you stand out in a crowded market by crafting portfolios that not only highlight your strengths but also resonate with your target audience. With a blend of creativity, precision, and modern design, we transform your information into a powerful narrative that truly represents who you are and what you offer.
              </p>
              <p className="float-left w-full md:w-1/2 text-justify md:pr-5 mt-10 md:mt-20 tracking-wide fade-in">
                We understand that every profile is unique, and that's why we take ​a personalized approach to every project. Whether you're a ​freelancer, entrepreneur, or established business, our team of ​experts is dedicated to creating a portfolio that perfectly aligns ​with your goals and vision.
              </p>
            </div>
          </div>
        </div>

        {/* Overlay to Darken the Video */}
        <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50"></div>
      </div>
    </>
  );
};

export default Aboutus;
