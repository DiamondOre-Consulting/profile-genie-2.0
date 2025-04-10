import React from "react";
import bg from "../../../assets/Niyor/13.jpg";

const Section4 = () => {
  return (
    <div
      className="relative md:h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${bg})` }}
    >
      {/* Black overlay with opacity */}
      <div className="absolute inset-0 bg-black opacity-90"></div>

      {/* Centered text */}
      <div className="relative flex items-center justify-center h-full text-center py-20 md:py-0 ">
        <p className="text-[#D4B274] text-xl md:text-3xl font-semibild px-2 md:px-40 npf">
           We promise that we will be the
          biggest attraction at your event, and when your guests go for future
          events they will simply not have the same amount of fun. In short, we
          make sure people remember your wedding more than their own! 
        </p>
      </div>
    </div>
  );
};

export default Section4;
