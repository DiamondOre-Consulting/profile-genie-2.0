import { portfolioResponse } from "@/validations/PortfolioValidation";
import { Contact, Mail, MapPin, Phone } from "lucide-react";
import { useState } from "react";
import { FaDownload } from "react-icons/fa";
import PhoneInput from "react-phone-input-2";
import 'react-phone-input-2/lib/style.css'

const ContactUs = ({ portfolioData }: { portfolioData: portfolioResponse }) => {
  const [whatsAppNumber, setWhatsAppNumber] = useState<number | null>(null)

  const portfolioUrl = window.location.href;
  const message = `Hello, find my portfolio here:\n\n${portfolioUrl}\n\n📌 Click the link above to view my portfolio!`;
  const encodedMessage = encodeURIComponent(message);

  return (
    <div className="mt-10 md:mt-20" id="contact">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        {portfolioData?.contactData?.mapLink && (
          <div className="lg:text-center">
            <div className="relative w-full overflow-hidden h-60">
              <iframe
                src={portfolioData?.contactData?.mapLink}
                className="absolute inset-0 w-full h-full border-0"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        )}

        <div className="mt-10 mb-10">
          <dl className="grid grid-cols-1 gap-10 md:grid-cols-3">
            {/* Address Section */}
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center w-12 h-12 text-white bg-[#0891B2] rounded-lg">
                  <MapPin className="w-6 h-6" />
                </div>
              </div>
              {portfolioData?.contactData?.address && portfolioData.contactData.address.length > 0 && (
                <div className="ml-4">
                  <dt className="text-lg font-medium leading-6 text-gray-900">
                    Addresses
                  </dt>
                  <dd className="mt-2 space-y-2">
                    {portfolioData.contactData.address.map((addr, index) => (
                      <div key={index} className="text-gray-600">
                        {addr.title && (
                          <div className="font-medium text-gray-900">
                            {addr.title}
                          </div>
                        )}
                        <div className="text-base">
                          {addr.detail}
                        </div>
                      </div>
                    ))}
                  </dd>
                </div>
              )}
            </div>

            {/* Phone Number Section */}
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center w-12 h-12 text-white bg-[#0891B2] rounded-lg">
                  <Phone className="w-6 h-6" />
                </div>
              </div>
              {portfolioData?.contactData?.phoneList && portfolioData.contactData.phoneList.length > 0 && (
                <div className="ml-4">
                  <dt className="text-lg font-medium leading-6 text-gray-900">
                    Phone Numbers
                  </dt>
                  <dd className="mt-1">
                    {portfolioData.contactData.phoneList.map((phoneItem, index) => (
                      <div key={index}>
                        <a
                          href={`tel:+91${phoneItem.phone}`}
                          className="text-base text-gray-600 hover:text-[#0891B2] transition-colors"
                        >
                          <span className="pb-1 text-lg">+</span>{phoneItem.phone}
                        </a>
                      </div>
                    ))}
                  </dd>
                </div>
              )}
            </div>

            {/* Email Section */}
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center w-12 h-12 text-white bg-[#0891B2] rounded-lg">
                  <Mail className="w-6 h-6" />
                </div>
              </div>
              {portfolioData?.email && (
                <div className="ml-4">
                  <dt className="text-lg font-medium leading-6 text-gray-900">
                    Email
                  </dt>
                  <dd className="mt-2">
                    <a
                      href={`mailto:${portfolioData.email}`}
                      className="text-base text-gray-600 hover:text-[#0891B2] transition-colors"
                    >
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
            <div className="w-full text-lg font-medium leading-6 text-gray-400">
              Share Portfolio
            </div>
            <div className="flex gap-2 max-auto items-center justify-center max-w-[35rem] w-[95vw]">
              <PhoneInput
                country={'in'}
                buttonStyle={{
                  border: "1px solid #000",
                  backgroundColor: "#fff",
                  color: "#000"
                }}
                inputStyle={{
                  width: "100%",
                  border: "1px solid #000",
                  fontSize: "15px",
                  paddingTop: "9px",
                  paddingBottom: "9px",
                  height: "40px",
                  borderRadius: "4px",
                  backgroundColor: "#fff",
                  color: "#000"
                }}
                dropdownStyle={{
                  backgroundColor: "#fff",
                  color: "#000",
                  border: "1px solid #000"
                }}
                value={whatsAppNumber?.toString()}
                onChange={phone => setWhatsAppNumber(phone ? Number(phone) : null)}
              />
              <a
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#0891B2] p-2 px-6 text-white rounded"
                href={`https://wa.me/${whatsAppNumber}?text=${encodedMessage}`}
              >
                Send
              </a>
            </div>
          </div>
        </div>
        <div className="flex items-center sm:flex-row flex-col justify-between max-w-[35rem] mx-auto gap-2 lg:text-center md:justify-center">
          {portfolioData?.contactData?.contactCSV && (
            <button
              onClick={() => window.open(portfolioData?.contactData?.contactCSV, "_blank")}
              className="relative w-full h-12 flex items-center mx-auto justify-center p-2 px-3 sm:px-10 text-[0.9rem] overflow-hidden font-semibold text-white bg-[#0891B2] border-none rounded-full cursor-pointer group"
            >
              <div className='flex items-center justify-center gap-1 sm:gap-4'>
                <Contact className='text-[1.4rem]' /> Save Contact
              </div>
            </button>
          )}

          {portfolioData?.contactData?.brochureLink?.link && (
            <button
              onClick={() => window.open(portfolioData?.contactData?.brochureLink?.link, "_blank")}
              className="relative w-full h-12 p-2 px-3 sm:px-10 text-[0.9rem] overflow-hidden font-semibold text-white bg-[#0891B2] border-none rounded-full cursor-pointer group"
            >
              <div className='flex items-center justify-center gap-2 sm:gap-4'>
                <FaDownload className='text-[1.1rem]' /> Download Brochure
              </div>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
