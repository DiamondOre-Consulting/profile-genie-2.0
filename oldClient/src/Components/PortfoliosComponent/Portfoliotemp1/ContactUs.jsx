import React, { useState } from "react";
import { BsSave2Fill } from "react-icons/bs";
import { FaDownload } from "react-icons/fa";
import { IoSave } from "react-icons/io5";
import { MdOutlineFileDownload } from "react-icons/md";
import { Link } from "react-router-dom";

const ContactUs = ({ portfolioData }) => {
  const name = portfolioData.name;
  const email = portfolioData.email;
  const phone = portfolioData.phone;

  const [whatsAppNumber, setWhatsAppNumber] = useState('')

  const primaryTextColor = portfolioData.primaryTextColor;
  const buttonBgColor = portfolioData.buttonColor;
  const secondaryTextColor = portfolioData.secondaryTextColor;

  const portfolioUrl = window.location.href;
  const message = `Hello, find my portfolio here:\n\n${portfolioUrl}\n\n📌 Click the link above to view my portfolio!`;
  const encodedMessage = encodeURIComponent(message);

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
    <div className="px-4 mt-10 md:mt-20" id="contact">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        {googleMapLink && (
          <div className="lg:text-center">
            <div className="relative w-full overflow-hidden h-60">
              <iframe
                src={googleMapLink}
                className="absolute inset-0 w-full h-full border-0"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        )}

        <div className="mt-10 mb-10">
          <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-3 md:gap-x-8 md:gap-y-10">
            {/* Address Section */}
            <div className="flex">
              <div className="flex-shrink-0">
                <div
                  className="flex items-center justify-center w-12 h-12 text-white rounded-md"
                  style={{ backgroundColor: buttonBgColor }}
                >
                  <svg
                    className="w-6 h-6 "
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </div>
              </div>
              {portfolioData.contact?.address && (
                <div className="ml-4">
                  <dt
                    className="text-lg font-medium leading-6"
                    style={{ color: primaryTextColor }}
                  >
                    Address
                  </dt>
                  <dd
                    className="mt-2 text-base"
                    style={{ color: primaryTextColor }}
                  >
                    {portfolioData.contact.address}
                  </dd>
                </div>
              )}
            </div>

            {/* Phone Number Section */}

            <div className="flex">
              <div className="flex-shrink-0">
                <div
                  className="flex items-center justify-center w-12 h-12 text-white rounded-md"
                  style={{ backgroundColor: buttonBgColor }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
                    />
                  </svg>
                </div>
              </div>
              {portfolioData?.phone && (
                <div className="ml-4">
                  <dt
                    className="text-lg font-medium leading-6"
                    style={{ color: primaryTextColor }}
                  >
                    Phone number
                  </dt>
                  <dd
                    className="mt-2 text-base"
                    style={{ color: primaryTextColor }}
                  >
                    <a href={`tel:+91${portfolioData.phone}`}>
                      {portfolioData.phone}
                    </a>
                  </dd>
                </div>
              )}
            </div>

            {/* Email Section */}
            <div className="flex">
              <div className="flex-shrink-0">
                <div
                  className="flex items-center justify-center w-12 h-12 text-white rounded-md"
                  style={{ backgroundColor: buttonBgColor }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                    />
                  </svg>
                </div>
              </div>
              {portfolioData?.email && (
                <div className="ml-4">
                  <dt
                    className="text-lg font-medium leading-6"
                    style={{ color: primaryTextColor }}
                  >
                    Email
                  </dt>
                  <dd
                    className="mt-2 text-base"
                    style={{ color: primaryTextColor }}
                  >
                    <a href={`mailto:${portfolioData.email}`}>
                      {portfolioData.email}
                    </a>
                  </dd>
                </div>
              )}
            </div>
          </dl>
        </div>
        <div className="flex flex-col items-center justify-center w-full my-4">
          <div className="mx-auto w-fit">
            <div
              className="w-full text-lg font-medium leading-6 text-gray-400"

            >
              Share Portfolio
            </div>
            <div className="flex gap-2 max-auto items-center justify-center max-w-[35rem] w-[95vw] ">
              <input value={whatsAppNumber} onChange={(e) => setWhatsAppNumber(e.target.value)} type="text" className="w-full p-2 border rounded" placeholder="Enter whatsapp number" />
              <a target="_blank" className="bg-[#0891B2] p-2 px-6 text-white rounded" href={`https://wa.me/91${whatsAppNumber}?text=${encodedMessage}`}>Send</a>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between gap-2 lg:text-center md:justify-center">
          <button
            onClick={() => downloadVCard(name, email, phone)}
          >
            <button
              className="relative z-10 w-full h-12 flex items-center justify-center p-2 px-3 sm:px-10 text-[0.9rem] overflow-hidden font-semibold text-white bg-[#0891B2] border-none rounded-full cursor-pointer group"
            >
              <div className='flex items-center justify-center gap-1 sm:gap-4'>
                <IoSave className='text-[1.1rem]' />  Save Contact
              </div>

            </button>
          </button>

          {driveLink && (
            <div
              onClick={() => window.open(driveLink, "_blank")}
            >
              <button
                className="relative z-10 w-full h-12 p-2 px-3 sm:px-10 text-[0.9rem] overflow-hidden font-semibold text-white bg-[#0891B2] border-none rounded-full cursor-pointer group"
              >
                <div className='flex items-center justify-center gap-2 sm:gap-4'>
                  <FaDownload className='text-[1.1rem]' />  Download Brochure
                </div>

              </button>

            </div>
          )}


        </div>
        {/* <div className="flex items-center justify-between lg:text-center md:justify-center">
          <button
            onClick={() => downloadVCard(name, email, phone)}
            className="py-3 mt-2 mb-4 mr-4 text-xs font-bold leading-4 tracking-tight text-gray-100 transition duration-300 rounded-full md:text-lg md:mr-0 sm:text-xl w-60 hover:shadow-xl"
            style={{ backgroundColor: buttonBgColor }}
          >
            Save Contact
          </button>
          {driveLink && (
            <button
              onClick={() => window.open(driveLink, "_blank")}
              className="py-3 mt-2 mb-4 text-xs font-bold leading-4 tracking-tight text-gray-100 transition duration-300 rounded-full md:ml-4 md:text-lg sm:text-xl w-60 hover:shadow-xl"
              style={{ backgroundColor: buttonBgColor }}
            >
              Download Brochure
            </button>
          )}
        </div> */}
      </div>

    </div>
  );
};

export default ContactUs;
