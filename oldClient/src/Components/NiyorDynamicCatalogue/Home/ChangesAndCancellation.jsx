import React from 'react';

const ChangesAndCancellation = () => {
  return (
    <div>
      <div className="bg-[#2D2E30]">
        {/* Divider line */}
        <div className="w-20 md:w-40 lg:w-60 bg-[#D4B274] mx-auto h-1"></div>

        {/* Content section */}
        <div className="flex flex-col px-4 md:px-10 lg:px-40 py-10 md:py-20">
          <h1 className="text-3xl md:text-5xl head lg:text-6xl text-center text-[#D4B274] mb-10 md:mb-20 npf">
            Changes & Cancellation
          </h1>

          <p
            className="text-gray-200 text-sm md:text-lg npf lg:text-xl text-justify leading-7 md:leading-8 lg:leading-9"
            style={{ wordSpacing: "2px", letterSpacing: "1px" }}
          >
            In case last-minute date changes are made after travel arrangements are completed, there will be a charge levied, as the team will have to make costly changes in scheduling, transportation, or shuffling of team members. The cost will depend on the investment required and will be shared before the event. This additional cost must be paid for before the event.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ChangesAndCancellation;
