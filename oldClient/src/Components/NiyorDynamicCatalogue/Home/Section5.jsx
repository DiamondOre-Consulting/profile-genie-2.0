import React from "react";
import bg from "../../../assets/Niyor/19.jpg";

const Section5 = () => {
  return (
    <div>
      <div
        className="relative md:h-screen h-[60vh]   bg-cover bg-center"
        style={{ backgroundImage: `url(${bg})` }}
      >
        {/* Black overlay with opacity */}
        <div className="absolute inset-0 bg-black opacity-80"></div>

        {/* Centered text */}
        <div className="relative flex flex-col items-center justify-center h-full text-center px-4 md:px-10 lg:px-20">
          <p className="text-[#D4B274] text-lg md:text-4xl lg:text-5xl font-bold w-full head">
            States our Nïyor Perfume bar has been set up in
          </p>

          <div className="grid  grid-cols-2 gap-20 md:gap-60 mt-10 md:mt-20">
            {/* First Column */}
            <div className="flex flex-col text-gray-100 text-sm md:text-2xl lg:text-3xl npf space-y-2 md:space-y-4">
              <span>Maharashtra</span>
              <span>Andhra Pradesh</span>
              <span>Gujarat</span>
              <span>Rajasthan</span>
              <span>Jharkhand</span>
              <span>West Bengal</span>
              <span>Uttarakhand</span>
              <span>Madhya Pradesh</span>
            </div>

            {/* Second Column */}
            <div className="flex flex-col text-gray-100 text-sm md:text-2xl lg:text-3xl space-y-2 md:space-y-4">
              <span>Odisha</span>
              <span>Punjab</span>
              <span>Uttar Pradesh</span>
              <span>Kerala</span>
              <span>Goa</span>
              <span>Karnataka</span>

              <span>Telangana</span>
              <span>Tamil Nadu</span>
             
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Section5;
