import React from 'react';

const PaymentTerms = () => {
  return (
    <div>
      <div className="bg-[#2D2E30]">
        {/* Divider line */}
        <div className="w-20 md:w-40 lg:w-60 bg-[#D4B274] mx-auto h-1"></div>

        {/* Content section */}
        <div className="flex flex-col px-4 md:px-10 lg:px-40 py-10 md:py-20">
          <h1 className="text-3xl md:text-5xl head lg:text-6xl text-center text-[#D4B274] mb-10 md:mb-20 npf">
            Payment Terms
          </h1>

          <p
            className="text-gray-200 text-base md:text-lg npf lg:text-xl text-center leading-7 md:leading-8 lg:leading-9"
            style={{ wordSpacing: "3px", letterSpacing: "1px" }}
          >
            50% of the amount on the date of booking, and 50% at the venue on the same day of the event. We are not able to start the Perfume Bar until the remaining 50% has been paid. We have had bad experiences and will not be able to perform the job if we are worrying about chasing payments. No assurances suffice, and this is non-negotiable for everyone.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PaymentTerms;
