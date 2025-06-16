import {
  IconBrandInstagram,
  IconBrandWhatsapp,
  IconPhoneCalling,
} from "@tabler/icons-react";
import { ReactNode, useState } from "react";

import { Link } from "react-scroll";

const Template1Layout = ({
  children,
  fullName,
  aboutActive,
  contactActive,
  productActive,
  serviceActive,
}: {
  children: ReactNode;
  fullName: string;
  aboutActive: boolean;
  contactActive: boolean;
  productActive: boolean;
  serviceActive: boolean;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const shareOnWhatsApp = () => {
    const personalMessage = `Hi! Let's connect.`;
    const encodedMessage = encodeURIComponent(personalMessage);
    const whatsappUrl = `https://wa.me/${918750316743}?text=${encodedMessage}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <>
      <nav className="bg-[#101828] text-white backdrop-blur-md fixed h-16 top-0 left-0 w-full z-1000  ">
        <div className="flex flex-wrap items-center justify-between max-w-screen-xl px-4 py-3 mx-auto">
          <Link
            to={"/portfolio/preview/template1"}
            className="flex items-center justify-center space-x-1 rtl:space-x-reverse"
          >
            <div className="flex items-center">
              <div className="bg-[#0891B2] relative left-2 size-8 rounded-full"></div>
              <div className="bg-[#F43F5E]  size-6 rounded-full"></div>
            </div>
            <p className="text-[1.1rem] font-semibold text-white">{fullName}</p>
          </Link>
          <div className="flex space-x-3 md:order-2 md:space-x-0 rtl:space-x-reverse">
            {/* <button type="button" className="text-white bg-[#F43F5E] hover:bg-[#F43F5E]/90 cursor-pointer focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm p-2 text-center "><IconShare3 /></button> */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="inline-flex items-center justify-center w-10 h-10 p-2 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:focus:ring-gray-600"
              aria-controls="navbar-cta"
              aria-expanded={isOpen}
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="w-5 h-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 17 14"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M1 1h15M1 7h15M1 13h15"
                />
              </svg>
            </button>
          </div>
          <div
            className={`items-center justify-between  w-full md:flex md:w-auto md:order-1 transition duration-300 relative z-[100] ease-in-out ${
              isOpen ? "fixed top-0 left-0 right-0 bottom-0 flex-col" : "hidden"
            }`}
            id="navbar-cta"
          >
            <ul className="flex flex-col items-center justify-center bg-[#101828] p-4 mt-4 font-medium border border-gray-100 rounded-lg cursor-pointer space-y-2 md:space-y-0 md:p-0 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0">
              <Link
                to="home"
                onClick={() => setIsOpen(false)}
                smooth={true}
                duration={500}
                className="hover:underline"
              >
                Home
              </Link>
              {aboutActive && (
                <Link
                  onClick={() => setIsOpen(false)}
                  to="about"
                  smooth={true}
                  duration={500}
                  offset={-100}
                  className="hover:underline"
                >
                  About
                </Link>
              )}
              {serviceActive && (
                <Link
                  onClick={() => setIsOpen(false)}
                  to="services"
                  smooth={true}
                  duration={500}
                  offset={-80}
                  className="hover:underline"
                >
                  Services
                </Link>
              )}
              {productActive && (
                <Link
                  onClick={() => setIsOpen(false)}
                  to="product"
                  smooth={true}
                  duration={500}
                  offset={-100}
                  className="hover:underline"
                >
                  Product
                </Link>
              )}
              {contactActive && (
                <Link
                  onClick={() => setIsOpen(false)}
                  to="contact"
                  smooth={true}
                  duration={500}
                  offset={-50}
                  className="hover:underline"
                >
                  Contact
                </Link>
              )}
            </ul>
          </div>
        </div>
      </nav>
      {children}
      <footer className="bg-[#06080e] mt-8 relative z-10 text-white py-6 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="mb-4 text-xl font-semibold">Profile Genie</h2>
          <div className="flex justify-center mb-4 space-x-6 text-sm">
            <Link
              to="home"
              smooth={true}
              duration={500}
              className="hover:underline"
            >
              Home
            </Link>
            {aboutActive && (
              <Link
                to="about"
                smooth={true}
                duration={500}
                offset={-100}
                className="hover:underline"
              >
                About
              </Link>
            )}
            {serviceActive && (
              <Link
                to="services"
                smooth={true}
                duration={500}
                offset={-80}
                className="hover:underline"
              >
                Services
              </Link>
            )}
            {productActive && (
              <Link
                to="product"
                smooth={true}
                duration={500}
                offset={-100}
                className="hover:underline"
              >
                Product
              </Link>
            )}
            {contactActive && (
              <Link
                to="contact"
                smooth={true}
                duration={500}
                offset={-50}
                className="hover:underline"
              >
                Contact
              </Link>
            )}
          </div>

          <p className="text-sm text-gray-300">
            Powered by{" "}
            <Link
              to="https://profilegenie.in"
              target="_blank"
              className="hover:underline text-[#f43f5e]"
            >
              Profile Genie
            </Link>
          </p>
          <ul className="flex justify-center gap-6 mt-3 md:gap-8">
            <li>
              <a
                href="https://www.instagram.com/profile_genie_1?igsh=MW01amE5aHVwMTVpaw=="
                rel="noreferrer"
                target="_blank"
                className="text-gray-200 transition hover:text-gray-100/75"
              >
                <IconBrandInstagram className="size-7" />
              </a>
            </li>

            <li>
              <a
                onClick={shareOnWhatsApp}
                rel="noreferrer"
                target="_blank"
                className="text-gray-200 transition hover:text-gray-100/75"
              >
                <IconBrandWhatsapp className="size-7" />
              </a>
            </li>

            <li>
              <a
                href={`tel:${918750316743}`}
                rel="noreferrer"
                target="_blank"
                className="text-gray-200 transition hover:text-gray-100/75"
              >
                <IconPhoneCalling className="size-7" />
              </a>
            </li>
          </ul>
        </div>
      </footer>
    </>
  );
};

export default Template1Layout;
