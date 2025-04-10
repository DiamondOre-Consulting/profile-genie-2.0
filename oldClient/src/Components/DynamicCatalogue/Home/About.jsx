import React from "react";

const About = ({myprofile}) => {
  return (
    <div className="bg-c2">
      <div className="px-6 md:px-20 py-20  ">
        <h1 className="text-3xl md:text-4xl font-semibold mb-6 tracking-wider">{myprofile?.brand?.brandName}</h1>
        <p className="text-2xl text-justify text-gray-800">
        {myprofile?.brand?.brandDescription}
        </p>
      </div>
    </div>
  );
};

export default About;
