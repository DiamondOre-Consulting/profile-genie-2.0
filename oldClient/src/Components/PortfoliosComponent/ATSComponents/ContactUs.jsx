import React from "react";

const ContactUs = () => {
  const name = "Vishal & Sakshi Aggarwal";
  const email = "sakshi@aapkatravelsathi.com";
  const phone = "7838200690";

  const primaryTextColor = "#333333"; // Dark gray
  const buttonBgColor = "#0891B2"; // Blue
  const secondaryTextColor = "#666666"; // Light gray

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

  const address =
    "11th Floor, Flat No.1138, Osimo Tower, Mahagun Moderne, Sector 78, Noida, Noida, Gautambuddha Nagar, Uttar Pradesh";
  const googleMapLink =
    "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d224271.20665627!2d77.38627200000002!3d28.562627000000003!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cef5a2e725983%3A0x9020cb6d10df3914!2sAAPKA%20TRAVEL%20SATHI!5e0!3m2!1sen!2sin!4v1724492862408!5m2!1sen!2sin";

  return (
    <div className="mt-10 md:mt-20 px-4" id="contact">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {googleMapLink && (
          <div className="lg:text-center">
            <div className="relative w-full h-60 overflow-hidden">
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
                  className="flex items-center justify-center h-12 w-12 rounded-md text-white"
                  style={{ backgroundColor: buttonBgColor }}
                >
                  <svg
                    className="h-6 w-6"
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
              <div className="ml-4">
                <dt
                  className="text-lg leading-6 font-medium"
                  style={{ color: primaryTextColor }}
                >
                  Address
                </dt>
                <dd
                  className="mt-2 text-base"
                  style={{ color: primaryTextColor }}
                >
                  {address}
                </dd>
              </div>
            </div>

            {/* Phone Number Section */}
            <div className="flex">
              <div className="flex-shrink-0">
                <div
                  className="flex items-center justify-center h-12 w-12 rounded-md text-white"
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
              <div className="ml-4">
                <dt
                  className="text-lg leading-6 font-medium"
                  style={{ color: primaryTextColor }}
                >
                  Phone number
                </dt>
                <dd
                  className="mt-2 text-base"
                  style={{ color: primaryTextColor }}
                >
                  <a href={`tel:${phone}`}>{phone}</a>
                </dd>
              </div>
            </div>

            {/* Email Section */}
            <div className="flex">
              <div className="flex-shrink-0">
                <div
                  className="flex items-center justify-center h-12 w-12 rounded-md text-white"
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
              <div className="ml-4">
                <dt
                  className="text-lg leading-6 font-medium"
                  style={{ color: primaryTextColor }}
                >
                  Email
                </dt>
                <dd
                  className="mt-2 text-base"
                  style={{ color: primaryTextColor }}
                >
                  <a href={`mailto:${email}`}>{email}</a>
                </dd>
              </div>
            </div>
          </dl>
        </div>

        <div className="lg:text-center flex justify-between md:justify-center items-center">
          <button
            onClick={() => downloadVCard(name, email, phone)}
            className="mt-2 text-xs md:text-xl  leading-4 font-bold tracking-tight md:mr-0 mr-4 px-12 w-60 py-4 mb-4 text-gray-100 rounded-full hover:shadow-xl transition duration-300"
            style={{ backgroundColor: buttonBgColor }}
          >
             Save Contact
          </button>

          <button
            className="mt-2 md:ml-4 text-xs md:text-xl leading-4 font-bold tracking-tight   w-60  px-3 py-4 mb-4 text-gray-100 rounded-full hover:shadow-xl transition duration-300"
            style={{ backgroundColor: buttonBgColor }}
          >
            Download Brochure
          </button>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
