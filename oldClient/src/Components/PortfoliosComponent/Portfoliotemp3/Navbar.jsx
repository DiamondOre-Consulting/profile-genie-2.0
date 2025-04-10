import React, { useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Navbar = ({ portfolioData }) => {
    useEffect(() => {
        gsap.fromTo('.nav', 
            { opacity: 0, y: 50 }, 
            {
                opacity: 1, 
                y: 0, 
                duration: 0.5, 
                scrollTrigger: {
                    trigger: '.nav',
                    start: 'top 80%',
                }
            }
        );
    }, []);

    const [showMobileMenu, setShowMobileMenu] = useState(false);

    const toggleMobileMenu = () => {
        setShowMobileMenu(!showMobileMenu);
    };

    const { phone, name, primaryTextColor, buttonColor, secondaryTextColor } = portfolioData;

    return (
        <nav className="py-2.5 py-8 nav">
            <div className="flex items-center justify-between bg-black py-4 rounded-full max-w-screen-xl px-4 mx-auto">
                {/* Left side: Name and Logo */}
                <a href="#" className="flex items-center">
               
                    <span className="self-center text-xl font-semibold whitespace-nowrap text-gray-100">{name}</span>
                </a>
                
                {/* Right side: Menu */}
                <div className="hidden lg:flex lg:items-center lg:space-x-8">
                    <a href="#home" className="block py-2 pl-3 pr-4 text-white lg:bg-transparent lg:text-gray-100 lg:p-0" aria-current="page">Home</a>
                    <a href="#aboutme" className="block py-2 pl-3 pr-4 text-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:p-0">About me</a>
                    <a href="#products" className="block py-2 pl-3 pr-4 text-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:p-0">Products & Services</a>
                    <a href="#contact" className="block py-2 pl-3 pr-4 text-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:p-0">Get In Touch</a>
                </div>
                
                {/* Mobile Menu Button */}
                <button onClick={toggleMobileMenu} type="button" className="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200">
                    <span className="sr-only">Open main menu</span>
                    <svg className={`w-6 h-6 ${showMobileMenu ? 'hidden' : ''}`} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"></path>
                    </svg>
                    <svg className={`w-6 h-6 ${showMobileMenu ? '' : 'hidden'}`} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path>
                    </svg>
                </button>
            </div>

            {/* Mobile Menu */}
            <div className={`fixed inset-0 transition-transform ${showMobileMenu ? 'translate-x-0' : 'translate-x-full'} lg:hidden z-50`} style={{opacity : "1"}}>
                <div className="flex flex-col items-center py-10 h-screen space-y-6 bg-black bg-opacity-75 ">
                    <button onClick={toggleMobileMenu} className="absolute top-4 right-4 text-gray-100">
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                    <a href="#home" className="text-gray-100 text-2xl" onClick={toggleMobileMenu}>Home</a>
                    <a href="#aboutme" className="text-gray-100 text-2xl" onClick={toggleMobileMenu}>About me</a>
                   
                    <a href="#products" className="text-gray-100 text-2xl opacity-100" onClick={toggleMobileMenu}>Products & Services</a>
             
                    <a href="#contact" className="text-gray-100 text-2xl" onClick={toggleMobileMenu}>Get In Touch</a>

               
                  
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
