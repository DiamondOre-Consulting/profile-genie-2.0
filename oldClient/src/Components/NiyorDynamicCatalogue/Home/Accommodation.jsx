import React from "react";

const Accommodation = () => {
  return (
    <div>
      <div className="bg-[#2D2E30]">
        {/* Divider line */}
        <div className="w-20 md:w-40 lg:w-60 bg-[#D4B274] mx-auto h-1"></div>

        {/* Content section */}
        <div className="flex flex-col px-4 md:px-10 lg:px-40 py-10 md:py-20">
          <h1 className="text-3xl md:text-5xl lg:text-6xl text-center head text-[#D4B274] mb-10 md:mb-20 npf">
            Accommodation
          </h1>

          <p
            className="text-gray-200 text-base md:text-lg npf lg:text-xl text-center leading-7 md:leading-8 lg:leading-9"
            style={{ wordSpacing: "3px", letterSpacing: "1px" }}
          >
            A changing and R&R room for the team to prepare and get ready, at
            the venue for the same-day event, and separate accommodation provided
            for an overnight stay itinerary. Hotel room pictures can be shared
            beforehand with the POC. In case we are not able to mutually confirm
            the accommodation, our team will book their own accommodation (3
            star) and will send screenshots for reimbursement.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Accommodation;
