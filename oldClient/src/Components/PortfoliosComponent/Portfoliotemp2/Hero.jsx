import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const slides = [
  {
    id: 1,
    imageUrl: "https://themewagon.github.io/clark/images/bg_1.png",
  },
  {
    id: 2,
    imageUrl: "https://themewagon.github.io/clark/images/bg_2.png",
  },
];

const Hero = ({ portfolioData }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Function to handle the slide change
  const handleNextSlide = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  // Automatically change slides every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      handleNextSlide();
    }, 3000);

    return () => clearInterval(interval); // Cleanup on component unmount
  }, []);

  const { phone, name, primaryTextColor, buttonColor, secondaryTextColor , uniqueUserName } = portfolioData;
  const logoUrl = portfolioData.profileImage;


  const handleWhatsAppChat = () => {
    const url = `https://api.whatsapp.com/send?phone=${encodeURIComponent(phone)}`;
    window.open(url, '_blank');
};





  const handleWhatsAppChatNJK = () => {
    const url = `https://api.whatsapp.com/send?phone=919650918558`;
    window.open(url, '_blank');
  };

  return (
    <div className="relative py-20 h-screen bg-black text-white flex flex-col md:flex-row px-6 sm:px-10 items-center overflow-hidden" id="home">
      {/* Static Text Content */}
      <div className="flex flex-col justify-center p-6 md:p-10 text-center md:text-left md:w-1/2">
        <p className="text-sm uppercase text-yellow-500 mb-4">Hello!</p>
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-2">
          This is <span className="text-yellow-500">{name}</span>
        </h1>
        <h2 className="text-lg md:text-2xl font-light text-gray-300 mb-6">
          {portfolioData?.tagline}
        </h2>
        <div className="flex justify-center md:justify-start w-full">
          <button
            className="px-6 py-3 bg-black text-white border border-white rounded-md hover:bg-gray-800 transition duration-300"
            onClick={handleWhatsAppChat}
          >
            Contact Us
          </button>
        </div>
      </div>

      {/* AnimatePresence for Image Changes Only */}
      <AnimatePresence mode="wait">
        <motion.div
          key={slides[currentSlide].id} // Unique key for each slide
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5 }} // Smooth fade transition duration
          className="w-full md:w-1/2 flex items-center justify-center"
        >
          {/* Right Side Image */}
          <img
            src={logoUrl}
            alt={`Slide ${currentSlide + 1}`}
            className="object-cover w-full h-full max-h-[80vh] rounded-md shadow-lg"
          />
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default Hero;
