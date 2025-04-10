import React from "react";

const Section3 = () => {
  return (
    <div className="bg-[#2D2E30] py-20">
      <h1 className="text-[#D4B274] text-4xl md:text-6xl text-center mb-10 head">
        Please Note:
      </h1>
      <div className="flex justify-center items-center px-6 md:px-10 lg:px-28">
        <div className="grid grid-cols-3 md:grid-cols-3 lg:grid-cols-3 items-start gap-10 lg:gap-20">
          {/* First Item */}
          <div className="flex flex-col space-y-4 justify-center items-center text-center">
            <span className="text-[#D4B274] text-4xl md:text-5xl lg:text-6xl head">1.</span>
            <p className="text-gray-100 text-[6px] md:text-base npf">
              The Platinum package includes luxurious boxes for your perfume bottle, while the Gold package includes premium pouches.
            </p>
          </div>

          {/* Second Item */}
          <div className="flex flex-col space-y-4 justify-center items-center text-center">
            <span className="text-[#D4B274] text-4xl md:text-5xl lg:text-6xl head">2.</span>
            <p className="text-gray-100 text-[6px] md:text-base npf">
              Outstation travel charges are not included in the quotes.
            </p>
          </div>

          {/* Third Item */}
          <div className="flex flex-col space-y-4 justify-center items-center text-center">
            <span className="text-[#D4B274] text-4xl md:text-5xl lg:text-6xl head">3.</span>
            <p className="text-gray-100 text-[6px] md:text-base npf">
              Please ensure that our team is provided with food and beverage while on-site.
            </p>
          </div>

          {/* Fourth Item */}
          <div className="flex flex-col space-y-4 justify-center items-center text-center">
            <span className="text-[#D4B274] text-4xl md:text-5xl lg:text-6xl head">4.</span>
            <p className="text-gray-100 text-[6px] md:text-base npf">
              We require a 50% advance payment before proceeding with customization for your event.
            </p>
          </div>

          {/* Fifth Item */}
          <div className="flex flex-col space-y-4 justify-center items-center text-center">
            <span className="text-[#D4B274] text-4xl md:text-5xl lg:text-6xl head">5.</span>
            <p className="text-gray-100 text-[6px] md:text-base npf">
              Our perfume bar service starts only upon receiving full payment. The remaining 50% can be paid before or during set-up.
            </p>
          </div>

          {/* Sixth Item */}
          <div className="flex flex-col space-y-4 justify-center items-center text-center">
            <span className="text-[#D4B274] text-4xl md:text-5xl lg:text-6xl head">6.</span>
            <p className="text-gray-100 text-[6px] md:text-base npf">
              Any additional perfumes will be billed separately and subject to your approval.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Section3;
