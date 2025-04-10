import React, { useState } from "react";
import logo2 from '../../assets/QR~Genie logo.png';
import { Link, useNavigate } from "react-router-dom";

const AdminNavbar = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/admin-login");
    console.log("Logging out");
  };

  return (
    <header className="fixed top-0 left-0 w-full lg:px-16 px-4 bg-[#2C1E4A] flex flex-wrap items-center py-2 shadow-md z-50">
      <div className="flex-1 flex justify-between items-center">
        <img src={logo2} alt="Company Logo" className="w-12 rounded-full" />
      </div>

      {/* Mobile menu button */}
      <div className="md:hidden">
        <button
          className="text-gray-100 focus:outline-none"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <svg
            className="fill-current"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <title>menu</title>
            <path d="M0 5h24v2H0V5zm0 7h24v2H0v-2zm0 7h24v2H0v-2z"></path>
          </svg>
        </button>
      </div>

      {/* Navigation links */}
      <div
        className={`md:flex md:items-center md:w-auto w-full ${
          isMenuOpen ? "block" : "hidden"
        } transition-all duration-300 ease-in-out`}
        id="menu"
      >
        <nav className="w-full md:w-auto">
          <ul className="md:flex items-center text-center justify-between text-base text-gray-100 pt-4 md:pt-0">
            <li>
              <a
                href="#home"
                className="md:p-4 py-2 px-0 block hover:underline underline-offset-8"
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="#about"
                className="md:p-4 py-2 px-0 block hover:underline underline-offset-8"
              >
                All Portfolio
              </a>
            </li>
            <li>
              <a
                href="#service"
                className="md:p-4 py-2 px-0 block hover:underline underline-offset-8"
              >
                Services
              </a>
            </li>
            <li>
              <a
                href="#testi"
                className="md:p-4 py-2 px-0 block hover:underline underline-offset-8"
              >
                Testimonials
              </a>
            </li>
            <li>
              <a
                href="#contact"
                className="md:p-4 py-2 px-0 block md:mb-0 mb-2 hover:underline underline-offset-8"
              >
                Contact Us
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default AdminNavbar;
