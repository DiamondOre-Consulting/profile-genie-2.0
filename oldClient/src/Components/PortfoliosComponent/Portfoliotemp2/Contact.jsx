import React from "react";

const Contact = ({ portfolioData }) => {
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
    <>
      <div className="pt-10 flex flex-col justify-center items-center px-4 md:px-20" id="contact">
        <h2 className="text-[4rem] md:text-[6rem] tracking-wider font-bold text-gray-100 opacity-20 z-0 leading-none">
          Contact
        </h2>
        <h1 className="text-3xl md:text-6xl text-gray-100 font-bold mb-4 text-center">
          Contact Me
        </h1>
        <div className="w-24 md:w-60 h-1 bg-yellow-500 mx-auto rounded-full"></div>

        <p className="text-gray-400 max-w-xl text-lg text-center mt-4">
        We're here to help with any questions or inquiries you may have. <br />
        Feel free to reach out, and we'll respond as quickly as possible.
        </p>

        <div className="py-10 mt-10 w-full">
          <div className="flex flex-col md:flex-row md:justify-around space-y-8 md:space-y-0 md:space-x-20">
            {/* Address */}
            {portfolioData.contact?.address && (
              <div className="flex flex-col items-center text-gray-100 text-center space-y-4">
                <div className="bg-[#1A1A1A] rounded-full w-16 h-16 md:w-20 md:h-20 text-yellow-500 flex items-center justify-center">
                  <svg
                    className="h-8 w-8 md:h-8 md:w-8 text-yellow-500"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                </div>
                <p className="text-lg font-semibold">Address</p>
                <p>{portfolioData.contact.address}</p>
              </div>
            )}

            {/* Phone */}
            {portfolioData?.phone && (
              <div className="flex flex-col items-center text-gray-100 text-center space-y-4">
                <div className="bg-[#1A1A1A] rounded-full w-16 h-16 md:w-20 md:h-20 text-yellow-500 flex items-center justify-center">
                  <svg
                    className="h-8 w-8 md:h-8 md:w-8 text-yellow-500"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                    stroke="currentColor"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" />
                    <path d="M5 4h4l2 5l-2.5 1.5a11 11 0 0 0 5 5l1.5 -2.5l5 2v4a2 2 0 0 1 -2 2a16 16 0 0 1 -15 -15a2 2 0 0 1 2 -2" />
                  </svg>
                </div>
                <p className="text-lg font-semibold">Contact Number</p>
                <p>
                  <a href={`tel:+91${portfolioData.phone}`}>+91 {portfolioData.phone}</a>
                </p>
              </div>
            )}

            {/* Email */}
            {portfolioData?.email && (
              <div className="flex flex-col items-center text-gray-100 text-center space-y-4">
                <div className="bg-[#1A1A1A] rounded-full w-16 h-16 md:w-20 md:h-20 text-yellow-500 flex items-center justify-center">
                  <svg
                    className="h-8 w-8 md:h-8 md:w-8 text-yellow-500"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="22" y1="2" x2="11" y2="13" />
                    <polygon points="22 2 15 22 11 13 2 9 22 2" />
                  </svg>
                </div>
                <p className="text-lg font-semibold">Email Address</p>
                <p>
                  <a href={`mailto:${portfolioData.email}`}>{portfolioData.email}</a>
                </p>
              </div>
            )}
          </div>
        </div>

        <div className="lg:text-center mt-4 flex md:flex">
          <button
            onClick={() => downloadVCard(name, email, phone)}
            className="mt-2 text-md leading-4 font-bold tracking-tight bg-yellow-500 text-center sm:text-2xl px-20 py-2 mb-4 text-gray-100 rounded-full hover:shadow-xl transition duration-300"
          >
            Save Contact
          </button>
          {driveLink && (
            <button
              onClick={() => window.open(driveLink, "_blank")}
              className="mt-2 md:ml-4 text-md leading-4 font-bold tracking-tight bg-yellow-500 sm:text-2xl px-12 py-2 mb-4 text-gray-100 rounded-full hover:shadow-xl transition duration-300"
            >
              Download Brochure
            </button>
          )}
        </div>

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
      </div>
    </>
  );
};

export default Contact;
