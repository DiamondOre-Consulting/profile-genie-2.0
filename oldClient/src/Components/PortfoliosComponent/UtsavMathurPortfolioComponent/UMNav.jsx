import React, { useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const UMNav = () => {
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

    const handleWhatsAppChat = () => {
        const url = `https://api.whatsapp.com/send?phone=7838738916`;
        window.open(url, '_blank');
    };

    const backgroundColor = "#EDE9FE";
    const primaryTextColor = "#6B7280";
    const secondaryTextColor = "#F43F5E";
    const buttonBgColor = "#0891B2";
    const name = "Utsav Mathur";
    return (
        <nav className="py-2.5 py-8 nav" style={{ backgroundColor: backgroundColor, color: primaryTextColor }}>
            <div className="flex flex-wrap items-center justify-between max-w-screen-xl px-4 mx-auto">
                <a href="#" className="flex items-center">
                    <div className='w-6 h-6 rounded-full' style={{ backgroundColor: buttonBgColor }}></div>
                    <div className='w-5 h-5 rounded-full -ml-2 z-10' style={{ backgroundColor: secondaryTextColor }}></div>
                    <span className="self-center text-xl font-semibold whitespace-nowrap" style={{ color: buttonBgColor }}>{name}</span>
                </a>
                <div className="flex items-center lg:order-2">
                
                    <button
                        onClick={toggleMobileMenu}
                        type="button"
                        className="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
                        aria-controls="mobile-menu-2"
                        aria-expanded={showMobileMenu}
                    >
                        <span className="sr-only">Open main menu</span>
                        <svg className={`w-6 h-6 ${showMobileMenu ? 'hidden' : ''}`} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"></path>
                        </svg>
                        <svg className={`w-6 h-6 ${showMobileMenu ? '' : 'hidden'}`} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path>
                        </svg>
                    </button>
                </div>
                <div className={`items-center justify-between w-full lg:flex lg:w-auto lg:order-1 ${showMobileMenu ? 'block' : 'hidden'}`} id="mobile-menu-2">
                    <ul className="flex text-center flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
                        <li>
                            <a href="/" className="block py-2 pl-3 pr-4 text-white rounded lg:bg-transparent lg:text-cyan-600 lg:p-0" style={{ color: buttonBgColor }} aria-current="page">Home</a>
                        </li>
                        <li>
                            <a href="#aboutme" className="block py-2 pl-3 pr-4 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:p-0">About me</a>
                        </li>
                        {/* <li>
                            <a href="#products" className="block py-2 pl-3 pr-4 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:p-0">Products</a>
                        </li> */}
                        <li>
                            <a href="#service" className="block py-2 pl-3 pr-4 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:p-0">Services</a>
                        </li>
                        <li>
                            <a href="#contact" className="block py-2 pl-3 pr-4 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:p-0">Get In Touch</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default UMNav