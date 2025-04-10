import React from "react";
import { Link } from "react-router-dom";

const Footer = ({ myprofile }) => {
  return (
    <footer className="bg-c1 shadow ">
      <div className="max-w-7xl mx-auto p-4 md:py-8">
        <div className="flex  md:flex-row justify-between items-center md:items-start space-y-3 md:space-y-0">
          <div className="flex justify-center md:justify-start">
            <img
              src={
                myprofile?.brand?.brandLogo || "https://via.placeholder.com/80"
              }
              className="h-4 md:h-10"
              alt="Brand Logo"
            />
          </div>

          {myprofile?.brand?.brandSocials && (
            <div className="flex justify-center md:justify-end items-center space-x-2 md:space-x-8">
              {myprofile.brand?.brandSocials?.facebook && (
                <a
                  href={myprofile.brand?.brandSocials?.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src="https://img.icons8.com/fluent/30/000000/facebook-new.png"
                    alt="Facebook"
                    className="w-6 md:w-8"
                  />
                </a>
              )}
              {myprofile.brand?.brandSocials?.instagram && (
                <a
                  href={myprofile.brand?.brandSocials?.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src="https://img.icons8.com/fluent/30/000000/instagram-new.png"
                    alt="Instagram"
                    className="w-6 md:w-8"
                  />
                </a>
              )}
              {myprofile.brand?.brandSocials?.twitter && (
                <a
                  href={myprofile.brand?.brandSocials?.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src="https://img.icons8.com/?size=100&id=fJp7hepMryiw&format=png&color=000000"
                    alt="Twitter"
                    className="w-6 md:w-8 bg-white rounded-full p-1"
                  />
                </a>
              )}
              {myprofile.brand?.brandSocials?.youtube && (
                <a
                  href={myprofile.brand?.brandSocials?.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src="https://img.icons8.com/?size=100&id=19318&format=png&color=000000"
                    alt="YouTube"
                    className="w-6 md:w-8"
                  />
                </a>
              )}
            </div>
          )}

          <div className="flex justify-center md:justify-end">
            <ul className="flex space-x-6 text-sm font-medium text-gray-500 ">
              <li>
                <Link
                  to="/dynamic-catalogue/admin-login/1"
                  className="underline text-gray-100"
                >
                  Admin Login
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <hr className="my-6 border-gray-200 sm:mx-auto  lg:my-8" />

        <span className="block text-sm text-gray-100 flex max-w-7xl mx-auto justify-center md:ml-20">
          Created By{" "}
          <a
            href="https://www.profilegenie.in/"
            target="_blank"
            rel="noopener noreferrer"
            className="underline ml-1"
          >
            Profile-Genie
          </a>
        </span>
      </div>
    </footer>
  );
};

export default Footer;
