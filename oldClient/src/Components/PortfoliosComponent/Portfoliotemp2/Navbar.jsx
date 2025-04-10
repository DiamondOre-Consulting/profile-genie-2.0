import React, { useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Navbar = ({ portfolioData }) => {
  const [navbar, setNavbar] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  // Function to change navbar color on scroll
  const changeBackground = () => {
    if (window.scrollY >= 80) {
      setNavbar(true);
    } else {
      setNavbar(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', changeBackground);
    return () => {
      window.removeEventListener('scroll', changeBackground);
    };
  }, []);

  useEffect(() => {
    gsap.fromTo(
      '.nav',
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 0.5,
        scrollTrigger: {
          trigger: '.nav',
          start: 'top 80%',
        },
      }
    );
  }, []);

  const toggleMobileMenu = () => {
    setShowMobileMenu(!showMobileMenu);
  };

  const { phone, name } = portfolioData;

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-colors duration-500 ${
        navbar ? 'bg-gray-900 shadow-md opacity-75' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-24">
        {/* Logo */}
        <div className="flex-shrink-0">
          <p className="text-white font-bold text-3xl">{name}</p>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          <button
            onClick={toggleMobileMenu}
            className="text-gray-100 hover:text-gray-300 focus:outline-none"
          >
            <svg
              className="w-8 h-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          </button>
        </div>

        {/* Navigation Links */}
        <div className="hidden md:flex space-x-8">
          <a href="#home" className="text-gray-100 hover:text-gray-300 transition-colors">
            Home
          </a>
          <a href="#about" className="text-gray-100 hover:text-gray-300 transition-colors">
            About
          </a>
          <a href="#product" className="text-gray-100 hover:text-gray-300 transition-colors">
            Product
          </a>
          <a href="#service" className="text-gray-100 hover:text-gray-300 transition-colors">
            Services
          </a>
          <a href="#contact" className="text-gray-100 hover:text-gray-300 transition-colors">
            Get in touch
          </a>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 bg-gray-800 bg-opacity-75 z-40 transform transition-transform ${
          showMobileMenu ? 'translate-x-0' : 'translate-x-full'
        } md:hidden`}
      >
        <div className="flex flex-col items-center py-10 space-y-6">
          <button
            onClick={toggleMobileMenu}
            className="absolute top-4 right-4 text-gray-100"
          >
            <svg
              className="w-8 h-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <a href="#home" className="text-gray-100 text-2xl" onClick={toggleMobileMenu}>
            Home
          </a>
          <a href="#about" className="text-gray-100 text-2xl" onClick={toggleMobileMenu}>
            About
          </a>
          <a href="#product" className="text-gray-100 text-2xl" onClick={toggleMobileMenu}>
            Product
          </a>
          <a href="#service" className="text-gray-100 text-2xl" onClick={toggleMobileMenu}>
            Services
          </a>
          <a href="#contact" className="text-gray-100 text-2xl" onClick={toggleMobileMenu}>
            Get in touch
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
