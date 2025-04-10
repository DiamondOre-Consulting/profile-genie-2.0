import React from "react";
import bg from "../../../assets/Niyor/18.jpg";
import taj from "../../../assets/Niyor/brands/Taj2.png"; 
import img1 from "../../../assets/Niyor/brands/brand2.png"; 
import img2 from "../../../assets/Niyor/brands/brand3.png"; 
import img3 from "../../../assets/Niyor/brands/brand4.png"; 
import img4 from "../../../assets/Niyor/brands/brand5.png"; 
import img5 from "../../../assets/Niyor/brands/brand6.png"; 
import img6 from "../../../assets/Niyor/brands/brand7.png"; 
import img7 from "../../../assets/Niyor/brands/brand8.png"; 
import img8 from "../../../assets/Niyor/brands/brand9.png"; 
import img9 from "../../../assets/Niyor/brands/brand10.png"; 
import img10 from "../../../assets/Niyor/brands/brand11.png"; 
import img11 from "../../../assets/Niyor/brands/brand12.png"; 
import img12 from "../../../assets/Niyor/brands/brand13.png"; 
import img13 from '../../../assets/Niyor/brands/brand14.png';
import img14 from '../../../assets/Niyor/brands/brand15.png'

const Brands = () => {
  // Array of brand logos (you can add more)
  const brandLogos = [taj ,img1 , img2 , img3 , img4 ,img5 ,img6  , img7 ,img8 , img9 , img10 , img11 , img12 , img13 , img14];

  return (
    <div
      className="relative h-auto  bg-cover bg-center"
      style={{ backgroundImage: `url(${bg})` }}
    >
      {/* Black overlay */}
      <div className="absolute inset-0 bg-black opacity-70"></div>

      {/* Centered content */}
      <div className="relative flex flex-col items-center justify-start py-10 h-full text-center space-y-12">
        {/* Heading */}
        <p className="text-[#D4B274] text-3xl md:text-5xl font-bold px-8 head">
          Some of the venues we have worked with
        </p>

        {/* Grid for brand logos */}
        <div className="grid grid-cols-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-x-8 gap-y-10 w-full max-w-6xl px-4">
          {brandLogos.map((logo, index) => (
            <div
              key={index}
              className="flex justify-center items-center hover:scale-105 transition-transform duration-300"
            >
              <img
                src={logo}
                alt={`Brand ${index}`}
                className="object-contain h-16 md:h-28"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Brands;
