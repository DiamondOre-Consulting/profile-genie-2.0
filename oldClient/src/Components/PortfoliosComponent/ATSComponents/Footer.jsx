import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  // Hardcoded data
  const primaryTextColor = "#333333"; // Dark gray

  const socialMedias = {

    linkedin: "https://linkedin.com/in/yourprofile",
    instagram: "https://instagram.com/yourprofile",
   
  };

  return (
    <footer className="flex flex-col space-y-4 justify-center">
      {socialMedias && (
        <div className="flex justify-center items-center space-x-5 mt-4 ml-10 mr-10">
    
          {socialMedias.linkedin && (
            <a
              href={'https://www.linkedin.com/in/sakshi-aggarwal-72533a4b/'}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src="https://img.icons8.com/fluent/30/000000/linkedin-2.png"
                alt="LinkedIn"
              />
            </a>
          )}
          {socialMedias.instagram && (
            <a
              href={'https://www.instagram.com/aapka_travel_sathi/'}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src="https://img.icons8.com/fluent/30/000000/instagram-new.png"
                alt="Instagram"
              />
            </a>
          )}
       
        </div>
      )}
        <p
            className="text-center font-medium pt-2 hidden sm:block"
            style={{ color: primaryTextColor }}
          >
            Designed and Developed by{" "}
            <Link
              to={"https://profilegenie.in/"}
              className="underline text-blue-600"
              target="_blank"
            >
              profilegenie.in
            </Link>
          </p>
          <p className="text-center font-medium md:block hidden pb-4 mt-2 ">
            Contact us on +91 8750316743
          </p>
          {/* This will display on small screens (e.g., mobile) */}
          <p
            className="text-center font-medium pt-2 block sm:hidden text-xs py-4"
            style={{ color: primaryTextColor }}
          >
            Designed and Developed by{" "}
            <Link
              to={"https://profilegenie.in/"}
              className="underline text-blue-600 mr-1"
              target="_blank"
            >
              profilegenie.in
            </Link>{" "}
            (+91 8750316743)
          </p>
    </footer>
  );
};

export default Footer;
