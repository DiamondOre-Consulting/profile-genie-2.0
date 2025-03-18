import { IconBrandFacebook, IconBrandWhatsapp, IconBrandX, IconShare3 } from '@tabler/icons-react'
import React, { ReactNode, useState } from 'react'

import { Link } from "react-scroll"

const Template1Layout = ({ children }: { children: ReactNode }) => {
    const [isOpen, setIsOpen] = useState(false)
    console.log(isOpen)
    return (
        <>
            <nav className="bg-[#101828] text-white backdrop-blur-md fixed h-16 top-0 left-0 w-full z-1000  ">
                <div className="max-w-screen-xl  flex flex-wrap items-center justify-between mx-auto px-4 py-3">
                    <Link to={"/portfolio/preview/template1"} className="flex items-center justify-center space-x-1 rtl:space-x-reverse">
                        <div className='flex items-center'>
                            <div className='bg-[#0891B2] relative left-2 size-8 rounded-full'></div>
                            <div className='bg-[#F43F5E]  size-6 rounded-full'></div>
                        </div>
                    </Link>
                    <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
                        <button type="button" className="text-white bg-[#F43F5E] hover:bg-[#F43F5E]/90 cursor-pointer focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm p-2 text-center "><IconShare3 /></button>
                        <button onClick={() => setIsOpen(!isOpen)} type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-cta" aria-expanded={isOpen}>
                            <span className="sr-only">Open main menu</span>
                            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15" />
                            </svg>
                        </button>
                    </div>
                    <div className={`items-center justify-between  w-full md:flex md:w-auto md:order-1 transition duration-300 relative z-[100] ease-in-out ${isOpen ? 'fixed top-0 left-0 right-0 bottom-0 flex-col' : 'hidden'}`} id="navbar-cta">
                        <ul className="flex cursor-pointer flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg  md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0  dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                            <Link to="home" smooth={true} duration={500} className="hover:underline">Home</Link>
                            <Link to="about" smooth={true} duration={500} offset={-100} className="hover:underline">About</Link>
                            <Link to="services" smooth={true} duration={500} offset={-80} className="hover:underline">Services</Link>
                            <Link to="product" smooth={true} duration={500} offset={-100} className="hover:underline">Product</Link>
                            <Link to="contact" smooth={true} duration={500} offset={-50} className="hover:underline">Contact</Link>
                        </ul>
                    </div>
                </div>
            </nav>
            {children}
            <footer className="bg-[#06080e] mt-8 relative z-10 text-white py-6 px-4">
                <div className="max-w-6xl mx-auto text-center">
                    <h2 className="text-xl font-semibold mb-4">Profile Genie</h2>
                    <div className="flex justify-center space-x-6 text-sm mb-4">
                        <Link to="home" smooth={true} duration={500} className="hover:underline">Home</Link>
                        <Link to="about" smooth={true} duration={500} offset={-100} className="hover:underline">About</Link>
                        <Link to="services" smooth={true} duration={500} offset={-80} className="hover:underline">Services</Link>
                        <Link to="product" smooth={true} duration={500} offset={-100} className="hover:underline">Product</Link>
                        <Link to="contact" smooth={true} duration={500} offset={-50} className="hover:underline">Contact</Link>

                    </div>

                    <p className="text-sm text-gray-300">Powered by <Link to="https://profilegenie.in" target='_blank' className="hover:underline text-[#f43f5e]">Profile Genie</Link></p>
                    <div className="flex justify-center space-x-6 text-lg mt-4">
                        <a href="#" className="hover:text-gray-400">
                            <IconBrandX />
                        </a>

                        <a href="#" className="hover:text-gray-400">
                            <IconBrandFacebook />
                        </a>
                        <a href="#" className="hover:text-gray-400">
                            <IconBrandWhatsapp />
                        </a>
                    </div>
                </div>
            </footer>
        </>

    )
}

export default Template1Layout

