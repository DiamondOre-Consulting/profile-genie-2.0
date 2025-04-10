import React from "react";
import { Link } from "react-router-dom";

const Footer = ({ myprofile }) => {
  return (
    <footer className="bg-c1 shadow ">
      <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
        <div className="flex justify-between items-center">
          

       
         <div>
            <img
              src={myprofile?.brand?.brandLogo || "https://via.placeholder.com/80"}
              className="h-6 md:h-8"
              alt="Brand Logo"
            />
       </div>
       <div className="sm:flex sm:items-center sm:justify-between">
          <div className="flex flex-col items-center sm:items-end">
            {myprofile?.brand?.brandSocials && (
              <div className="flex justify-center items-center space-x-5 md:mt-4">
                {myprofile.brand?.brandSocials?.facebook && (
                  <a
                    href={myprofile.brand?.brandSocials?.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      src="https://img.icons8.com/fluent/30/000000/facebook-new.png"
                      alt="Facebook"
                      className="w-6 md:w-10"
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
                      className="w-6 md:w-10"
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
                      className="w-4 md:w-8 bg-white rounded-sm"
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
                      alt="Website"
                      className="w-6 md:w-10"
                    />
                  </a>
                )}
              </div>
            )}

           
          </div>
        </div>
        <div className="flex justify-between items-center  sm:mt-0">
          <ul className="flex space-x-6 text-sm font-medium text-gray-500 ">
            <li>
              <Link
                to="/dynamic-catalogue/admin-login"
                className="underline text-gray-100"
              >
                Admin Login
              </Link>
            </li>
          </ul>
        </div>
        </div>
       


        <hr className="my-6 border-gray-200 sm:mx-auto  lg:my-8" />

        <span className="block text-sm text-gray-100 text-center">
          Design And Developed By{" "}
          <a
            href="https://www.profilegenie.in/"
            target="_blank"
            rel="noopener noreferrer"
            className="underline"
          >
            Profile-Genie
          </a>
        </span>

        <p className="text-center text-gray-200 font-medium pt-4">
              Contact us on +91 8750316743
            </p>
      </div>
    </footer>
  );
};

export default Footer;
