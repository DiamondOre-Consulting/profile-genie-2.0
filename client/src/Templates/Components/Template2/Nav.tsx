import { useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { portfolioResponse } from '@/validations/PortfolioValidation';

gsap.registerPlugin(ScrollTrigger);

const Nav = ({ portfolioData }: { portfolioData: portfolioResponse }) => {
    const [showMobileMenu, setShowMobileMenu] = useState(false);

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

    const toggleMobileMenu = () => {
        setShowMobileMenu(!showMobileMenu);
    };

    return (
        <nav className="py-2.5 py-8 nav">
            <div className="flex flex-wrap items-center justify-between max-w-screen-xl px-4 mx-auto">
                <a href="#" className="flex items-center">
                    <div className='w-6 h-6 rounded-full bg-blue'></div>
                    <div className='z-10 w-5 h-5 -ml-2 rounded-full bg-pink'></div>
                    <span className="self-center ml-2 text-xl font-semibold whitespace-nowrap text-blue">
                        {portfolioData?.fullName}
                    </span>
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
                <div
                    className={`items-center justify-between w-full lg:flex lg:w-auto lg:order-1 ${showMobileMenu ? 'block' : 'hidden'}`}
                    id="mobile-menu-2"
                >
                    <ul className="flex flex-col mt-4 font-medium text-center lg:flex-row lg:space-x-8 lg:mt-0">
                        <li>
                            <a
                                href={`/profile/1/${portfolioData?.userName}`}
                                className="block py-2 pl-3 pr-4 text-white rounded lg:bg-transparent lg:text-cyan-600 lg:p-0"
                                aria-current="page"
                            >
                                Home
                            </a>
                        </li>
                        <li>
                            <a
                                href="#aboutme"
                                className="block py-2 pl-3 pr-4 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:p-0"
                            >
                                About me
                            </a>
                        </li>
                        {portfolioData?.otherDetails?.products?.productList && portfolioData.otherDetails.products.productList.length > 0 && (
                            <li>
                                <a
                                    href="#products"
                                    className="block py-2 pl-3 pr-4 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:p-0"
                                >
                                    Products
                                </a>
                            </li>
                        )}
                        {portfolioData?.otherDetails?.services?.serviceList && portfolioData.otherDetails.services.serviceList.length > 0 && (
                            <li>
                                <a
                                    href="#service"
                                    className="block py-2 pl-3 pr-4 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:p-0"
                                >
                                    Services
                                </a>
                            </li>
                        )}
                        <li>
                            <a
                                href="#contact"
                                className="block py-2 pl-3 pr-4 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:p-0"
                            >
                                Get In Touch
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Nav;
