import {  useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { portfolioResponse } from '@/validations/PortfolioValidation';
import { Link } from 'react-scroll';

gsap.registerPlugin(ScrollTrigger);

const Nav = ({ portfolioData }: { portfolioData: portfolioResponse }) => {
    const [showMobileMenu, setShowMobileMenu] = useState(false);


    const toggleMobileMenu = () => {
        setShowMobileMenu(!showMobileMenu);
    };

    return (
        <nav className="py-2.5 sm:py-4 md:py-6 relative overflow-x-hidden w-full">
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
                    className={`items-center justify-between duration-500 w-full bg-template2mainBg z-100 absolute lg:flex lg:static lg:w-auto lg:order-1 ${showMobileMenu ? 'right-0 cursor-pointer top-10' : 'top-10 -right-500'}`}
                    id="mobile-menu-2"
                >
                    <ul className="flex flex-col mt-4 font-medium text-center lg:flex-row lg:space-x-8 lg:mt-0">
                            <Link
                                 smooth={true} duration={500} 
                                to={`home`} 
                                className="block py-2 pl-3 pr-4 rounded cursor-pointer text-pink lg:bg-transparent lg:text-cyan-600 lg:p-0"
                                aria-current="page"
                            >
                                Home
                            </Link>
                       
                      
                            <Link
                                to="aboutme"
                                 smooth={true} duration={500} offset={0}
                                 onClick={() => setShowMobileMenu(false)}
                                className="block py-2 pl-3 pr-4 text-gray-700 border-b border-gray-100 cursor-pointer hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:p-0"
                            >
                                About me
                            </Link>
                       
                      
                        {portfolioData?.otherDetails?.services?.serviceList && portfolioData.otherDetails.services.serviceList.length > 0 && (
                          
                                <Link
                                    to="service"  smooth={true} duration={500} offset={20}
                                    className="block py-2 pl-3 pr-4 text-gray-700 border-b border-gray-100 cursor-pointer hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:p-0"
                                >
                                    Services
                                </Link>
                           
                        )}
                          {portfolioData?.otherDetails?.products?.productList && portfolioData.otherDetails.products.productList.length > 0 && (
                          
                                <Link
                                to="products" 
                                smooth={true} duration={500} offset={40}
                                    className="block py-2 pl-3 pr-4 text-gray-700 border-b border-gray-100 cursor-pointer hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:p-0"
                                >
                                    Products
                                </Link>
                           
                        )}
                      
                            <Link
                                 smooth={true} duration={500} offset={40}
                                to="contact" 
                                className="block py-2 pl-3 pr-4 text-gray-700 border-b border-gray-100 cursor-pointer hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:p-0"
                            >
                                Get In Touch
                            </Link>
                       
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Nav;
