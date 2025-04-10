import React from "react";

const Section2 = () => {
  return (
    <div className="bg-[#2D2E30]">
      <div className="flex justify-center items-center py-10 md:py-20 lg:py-40 px-4 md:px-16 lg:px-28">
        <div className="grid grid-cols-3 gap-6 md:gap-10 lg:gap-16 items-start md:items-center justify-center">
          {/* Step 1 */}
          <div className="flex flex-col space-y-4 justify-center items-center">
            <span className="text-[#D4B274] text-2xl md:text-5xl lg:text-6xl head">1.</span>
            <p className="text-gray-100 text-[10px] md:text-base lg:text-lg text-center npf">
              Browse through our selection of perfume bottles and select the one
              that speaks to you.
            </p>
          </div>

          {/* Step 2 */}
          <div className="flex flex-col space-y-4 justify-center items-center">
            <span className="text-[#D4B274] text-2xl md:text-5xl lg:text-6xl head">2.</span>
            <p className="text-gray-100 text-[10px] md:text-base lg:text-lg text-center npf">
              Choose the desired packaging to perfectly complement your selected
              bottle.
            </p>
          </div>

          {/* Step 3 */}
          <div className="flex flex-col space-y-4 justify-center items-center">
            <span className="text-[#D4B274] text-2xl md:text-5xl lg:text-6xl head">3.</span>
            <p className="text-gray-100 text-[10px] md:text-base lg:text-lg text-center npf">
              Request a quote for your preferred combination by getting in touch
              with us. All rates are listed in INR/ ₹.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Section2;
