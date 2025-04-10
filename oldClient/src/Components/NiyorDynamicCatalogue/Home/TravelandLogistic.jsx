import React from "react";

const TravelandLogistic = () => {
  return (
    <div className="bg-[#2D2E30] py-10 md:py-20">
      <div className="flex flex-col px-4 md:px-10 lg:px-40">
        <h1 className="text-3xl md:text-5xl head lg:text-6xl text-center text-[#D4B274] mb-10 md:mb-20 npf">
          Travel & Logistics
        </h1>


        <p
          className="text-gray-200 npf text-base md:text-lg lg:text-xl text-center leading-7 md:leading-8 lg:leading-9"
          style={{ wordSpacing: "3px", letterSpacing: "1px" }}
        >
          As per the quantity of Perfume requested, the minimum number of people
          travelling will be 2+. The client agrees to arrange the travelling
          cost of the team inter-city and intra-city - that includes travel to
          the city via flight/train/bus and pick up and drop from the
          airport/station to the venue/accommodation. In case of international
          events, the client agrees to cover the cost of travel, visa, and any
          fixed unavoidable event-related expenses.
        </p>
      </div>
    </div>
  );
};

export default TravelandLogistic;
