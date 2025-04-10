import React from "react";

const Message = ({ portfolioData }) => {
  if (!portfolioData.services || portfolioData.services.length === 0) {
    return null;
  }

  const shouldRender =
    portfolioData.services &&
    portfolioData.services.some(
      (service) =>
        service.heading.trim() !== "" || service.description.trim() !== ""
    );

  const heading = shouldRender ? portfolioData.services[0]?.heading : "";
  return (
    <>
      <div className="">
      

        <div className="relative px-4 md:px-20 pt-10">
          {portfolioData.services.map((service, index) => (
            <div key={index} className="mb-10">
              <p className="text-xl md:text-2xl text-center mb-4">
                {service?.description}
              </p>
              <p className="text-center font-bold text-xl md:text-2xl">
                ~ {service?.heading}
              </p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Message;
