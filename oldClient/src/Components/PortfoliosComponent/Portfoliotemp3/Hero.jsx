import React, { useEffect, useRef } from "react";
import gsap from "gsap";

const Hero = ({ portfolioData }) => {
  const { phone, name, primaryTextColor, buttonColor, secondaryTextColor } =
    portfolioData;
  const logoUrl = portfolioData.profileImage;

  // Refs for animations
  const textRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    // GSAP animations for text and image
    gsap.fromTo(
      textRef.current,
      { opacity: 0, y: -50 },
      { opacity: 1, y: 0, duration: 1, ease: "power3.out", delay: 0.3 }
    );

    gsap.fromTo(
      imageRef.current,
      { opacity: 0, scale: 0.8 },
      { opacity: 1, scale: 1, duration: 1.2, ease: "power3.out", delay: 0.6 }
    );
  }, []);

  const handleWhatsAppChat = () => {
    const url = `https://api.whatsapp.com/send?phone=${encodeURIComponent(
      phone
    )}`;
    window.open(url, "_blank");
  };

  return (
    <div
      className="  py-8 px-4 mx-auto max-w-screen-lg mb-20 md:mb-0 flex flex-col md:flex-row items-center  justify-between"
      id="home"
    >
      {/* Text Content */}
      <div className="flex flex-col text-center md:text-left mb-6 md:mb-0 md:w-1/2">
        <h1 className="text-4xl md:text-6xl font-bold text-primary">{name}</h1>
        <p className="text-lg md:text-2xl text-gray-700 mt-3">
          {portfolioData?.tagline}
        </p>

        <button
          onClick={handleWhatsAppChat}
          className="mt-6 px-6 py-2 md:w-1/2 rounded-md border border-1 border-black text-black hover:bg-black hover:text-white transition duration-300 ease-in-out"
        >
          Contact Us
        </button>
      </div>

      {/* Image Content */}
      <div className="mb-8 md:mb-0 md:pl-8">
        <img
          src={logoUrl}
          alt="Profile"
          className="rounded-lg w-full max-w-[400px] -mt-10 h-auto "
        />
      </div>
    </div>
  );
};

export default Hero;
