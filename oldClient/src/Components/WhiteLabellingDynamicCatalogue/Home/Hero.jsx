import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import banner from "../../../assets/Niyor/hero.jpg";

gsap.registerPlugin(ScrollTrigger);

const Hero = ({ myprofile }) => {
  const heroRef = useRef(null);
  const textRef = useRef(null);
  const logoRef = useRef(null);

  useEffect(() => {
    // Parallax Effect on background
    gsap.to(heroRef.current, {
      backgroundPositionY: "20%", // Adjust parallax effect strength
      ease: "none",
      scrollTrigger: {
        trigger: heroRef.current,
        start: "top top", // Start when hero section is at the top
        scrub: true, // Smooth scroll effect
      },
    });

    // Text and logo reveal animation
    gsap.fromTo(
      [logoRef.current, textRef.current.children],
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        stagger: 0.2, // Delay between elements
        scrollTrigger: {
          trigger: textRef.current,
          start: "top 80%", // Adjust where the animation starts
          toggleActions: "play none none reverse", // Replay on scroll back up
        },
      }
    );
  }, []);

  return (
    <div
      ref={heroRef}
      className="relative w-full h-screen bg-cover bg-center"
      style={{
        backgroundImage: `url(${banner})`,
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black opacity-50"></div>

      <div
        ref={textRef}
        className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white"
      >
        {/* Logo */}
        <img
          ref={logoRef}
          src={myprofile?.brand?.brandLogo}
          alt="Brand Logo"
          className="w-40 md:w-1/2 mb-4 " 
        />

        {/* Brand Name */}
        {/* <h1 className="text-4xl md:text-8xl mb-4 npf">
          {myprofile?.brand?.brandName || "Brand Name"}
        </h1> */}

        {/* Tagline */}
        <p className="text-2xl mb-6 npf text-[#BC9E41] uppercase" style={{letterSpacing:"12px" , wordSpacing:"4px"}}>
          {/* {myprofile?.brand?.brandTagline || "Your brand tagline goes here."} */}
          Perfume Bar Quotations 
        </p>

        {/* Visit Website Button */}
        {/* <a
          href={myprofile?.brand?.brandWebsite || "#"}
          target="_blank"
          rel="noopener noreferrer"
          className="px-6 py-3 bg-c1 text-white text-lg font-semibold rounded-full hover:bg-opacity-90 transition-all"
        >
          Visit Website
        </a> */}
      </div>
    </div>
  );
};

export default Hero;
