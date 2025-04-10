import React from "react";
import { BsArrowRight } from "react-icons/bs";
import { FaDownload, FaWhatsapp } from "react-icons/fa";
import { MdOutlineFileDownload } from "react-icons/md";
import { IoSave } from "react-icons/io5";
import { BsSave2Fill } from "react-icons/bs";

const UMContact = () => {
  const name = "Utsav Mathur";
  const email = "Utsav@diamondore.in";
  const phone = "7838738916";
  const address = "Sector 63, Noida";

  const primaryTextColor = "#6B7280";
  const secondaryTextColor = "#F43F5E";
  const buttonBgColor = "#0891B2";

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


  const driveLink = "https://drive.google.com/file/d/19twSM_zdpE5wk_gfL3Y0QydyuPtACHGx/view"
  const googleMapLink =
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3502.4090536461185!2d77.3779709742929!3d28.61749998476528!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cef068957c2f1%3A0xe72309664887757f!2sDiamond%20Ore%20Consulting%20Pvt.%20Ltd.!5e0!3m2!1sen!2sin!4v1725953523566!5m2!1sen!2sin";

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

        <div className="lg:text-center">
          <p className="mt-2 text-3xl font-extrabold leading-8 tracking-tight text-gray-900 sm:text-4xl">
            Contact
          </p>
          <p
            className="max-w-2xl mt-4 text-xl lg:mx-auto"
            style={{ color: primaryTextColor }}
          >
            Want to contact us? Choose an option below and we'll be happy to
            show you how we can transform your company's web experience.
          </p>
        </div>

        <div className="mt-10 mb-10">
          <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-3 md:gap-x-8 md:gap-y-10">
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
                      d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418"
                    />
                  </svg>
                </div>
              </div>
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
                  {address}
                </dd>
              </div>
            </div>

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
                  <a href={`tel:${phone}`}>{phone}</a>
                </dd>
              </div>
            </div>

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
                  <a href={`mailto:${email}`}>{email}</a>
                </dd>
              </div>
            </div>
          </dl>
        </div>

        <div className="flex items-center justify-between gap-2 lg:text-center md:justify-center">
          <button
            onClick={() => downloadVCard(name, email, phone)}
          >
            <button
              className="relative z-10 w-full h-12 flex items-center justify-center p-2 px-3 sm:px-10 text-[0.9rem] overflow-hidden font-semibold text-white bg-black border-none rounded-full cursor-pointer group"
            >
              <div className='flex items-center justify-center gap-1 sm:gap-4'>
                <IoSave className='text-[1.1rem]' />  Save Contact
              </div>
              <span
                className="absolute w-[110%] transition-transform duration-1000 origin-right transform scale-x-0 h-80 -top-8 -left-6 bg-sky-200 rotate-12 group-hover:scale-x-100 group-hover:duration-500"
              ></span>
              <span
                className="absolute w-[110%] transition-transform duration-700 origin-right transform scale-x-0 h-80 -top-8 -left-6 bg-sky-400 rotate-12 group-hover:scale-x-100 group-hover:duration-700"
              ></span>
              <span
                className="absolute w-[110%] transition-transform duration-500 origin-right transform scale-x-0 h-80 -top-8 -left-6 bg-sky-600 rotate-12 group-hover:scale-x-100 group-hover:duration-1000"
              ></span>
              <span
                className="absolute z-10 flex items-center justify-center gap-4 duration-100 opacity-0 group-hover:opacity-100 group-hover:duration-1000 left-6"
              >Save now<BsSave2Fill className='text-[1.3rem] mt-[0.15rem] hidden sm:block' />
              </span>
            </button>
          </button>

          <div
            onClick={() => window.open(driveLink, "_blank")}
          >
            <button
              className="relative z-10 w-full h-12 p-2 px-3 sm:px-10 text-[0.9rem] overflow-hidden font-semibold text-white bg-black border-none rounded-full cursor-pointer group"
            >
              <div className='flex items-center justify-center gap-2 sm:gap-4'>
                <FaDownload className='text-[1.1rem]' />  Download Brochure
              </div>
              <span
                className="absolute w-[110%] transition-transform duration-1000 origin-right transform scale-x-0 h-80 -top-8 -left-6 bg-sky-200 rotate-12 group-hover:scale-x-100 group-hover:duration-500"
              ></span>
              <span
                className="absolute w-[110%] transition-transform duration-700 origin-right transform scale-x-0 h-80 -top-8 -left-6 bg-sky-400 rotate-12 group-hover:scale-x-100 group-hover:duration-700"
              ></span>
              <span
                className="absolute w-[110%] transition-transform duration-500 origin-right transform scale-x-0 h-80 -top-8 -left-6 bg-sky-600 rotate-12 group-hover:scale-x-100 group-hover:duration-1000"
              ></span>
              <span
                className="group-hover:opacity-100 flex items-center justify-center gap-4 group-hover:duration-1000 duration-100 opacity-0 absolute top-2.5 left-6 z-10"
              >Download now<MdOutlineFileDownload className='text-[1.6rem] mt-[0.15rem]' />
              </span>
            </button>

          </div>
        </div>
      </div>
    </div>
  );
};

export default UMContact;
