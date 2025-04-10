import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ContactUs = ({ portfolioData }) => {
  const name = portfolioData.name;
  const email = portfolioData.email;
  const phone = portfolioData.phone;

  const generateVCard = (name, email, phone) => {
    return `
  BEGIN:VCARD
  VERSION:3.0
  FN:${name}
  EMAIL;TYPE=INTERNET:${email}
  TEL;TYPE=CELL:${phone}
  END:VCARD
      `;
  };

  const downloadVCard = (name, email, phone) => {
    const vCardContent = generateVCard(name, email, phone).trim();
    const blob = new Blob([vCardContent], { type: "text/vcard" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${name}.vcf`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const address = portfolioData.contact?.address;
  const googleMapLink = portfolioData?.googleMapLink;
  const driveLink = portfolioData?.documentGoogleDriveLink;

  return (
    <div id="contact">
      {googleMapLink && (
        <div className="w-full h-80 md:h-96 overflow-hidden mt-10">
          <iframe
            src={googleMapLink}
            className="w-full h-full border-0"
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      )}

      <div className="flex flex-col md:flex-row items-center justify-center max-w-5xl mx-auto  py-10">
        {/* Left Side - Contact Information */}

        <div className="flex flex-col w-full md:w-1/2 p-10 ">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Get in Touch
          </h2>
          <p className="text-gray-600 mb-4">
            We’d love to hear from you! Here’s how you can reach us...
          </p>
          <div className="mb-4">
            <h3 className="text-xl font-semibold text-gray-800">Address</h3>
            {portfolioData.contact?.address && (
              <p className="text-gray-600">{portfolioData.contact.address}</p>
            )}
          </div>
          <div className="mb-4">
            <h3 className="text-xl font-semibold text-gray-800">Phone</h3>
            {portfolioData?.phone && (
              <a href={`tel:+91${portfolioData.phone}`}>
                {portfolioData.phone}
              </a>
            )}
          </div>
          <div className="mb-4">
            <h3 className="text-xl font-semibold text-gray-800">Email</h3>
            {portfolioData?.email && (
              <a href={`mailto:${portfolioData.email}`}>
                {portfolioData.email}
              </a>
            )}
          </div>

          <div className="lg:text-center mt-4 flex md:flex">
          <button
            onClick={() => downloadVCard(name, email, phone)}
            className="mt-2 text-md leading-4 font-bold tracking-tight bg-transparent text-center  px-6 py-2 mb-4 text-gray-900 rounded-md border border-gray-400 hover:shadow-xl transition duration-300"
          >
            Save Contact
          </button>
          {driveLink && (
            <button
              onClick={() => window.open(driveLink, "_blank")}
              className="mt-2 md:ml-4 text-md leading-4 font-bold tracking-tight bg-transparent  px-6 py-2 mb-4 text-gray-900 rounded-md border border-1 border-gray-400 hover:shadow-xl transition duration-300"
            >
              Download Brochure
            </button>
          )}
        </div>
        </div>

        {/* Right Side - Image */}
        <div
          // ref={imageRef}
          className="w-full md:w-1/2 p-10 flex justify-center items-center"
        >
          <img
            src="https://burst.shopifycdn.com/photos/contact-us-image.jpg?width=1000&format=pjpg&exif=0&iptc=0"
            alt="Contact Us"
            className="w-full h-auto rounded-md shadow-md"
          />
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
