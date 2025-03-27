import { IconMenu, IconShoppingCart, IconX } from '@tabler/icons-react';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';

const Catalogue1Layout = ({ cart, children, data }: { logo?: string, name: string }) => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [showScrollToTop, setShowScrollToTop] = useState(false);
    const navigate = useNavigate()



    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    const closeMenu = () => {
        setMenuOpen(false);
    };

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 300) {
                setShowScrollToTop(true);
            } else {
                setShowScrollToTop(false);
            }
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <>
            <header style={{ backgroundColor: `${data?.data?.backgroundColor}1A` }} className="">
                <div className='flex bg-cream items-center max-w-[80rem] w-full mx-auto justify-between gap-2 px-4 py-2 md:px-0 relative z-10'>
                    <div
                        onClick={scrollToTop}

                        className="flex items-center space-x-2">
                        <img
                            src={data?.data?.logo?.url}
                            alt="Logo"
                            className="w-16 h-16"
                        />
                        <span className="text-lg font-semibold text-black">
                            {data?.data?.name || "Profile Genie"}
                        </span>
                    </div>
                    <div className='bg-black flex items-center gap-2 p-2 rounded-full px-4'>

                        {cart?.length > 0 && <Link to={'./cart'} className="border min-w-[25%] flex items-center justify-center rounded-md">
                            <div className="hover:text-blue-600 relative">
                                <p className="bg-red-600 text-xs font-bold text-white absolute top-[-0.2rem] right-[-0.2rem] size-5 flex items-center justify-center rounded-full">{cart.length}</p>
                                <IconShoppingCart className="size-5 mt-2 mr-2 text-white" />
                            </div>
                        </Link>}
                        <button
                            onClick={toggleMenu}
                            className="  text-xl text-white  rounded-full"
                        >
                            {menuOpen ? <IconX /> : <IconMenu />}
                        </button>
                    </div>
                </div>

                {/* Overlay Menu */}
                {menuOpen && (
                    <div className="fixed inset-0 z-10 flex flex-col items-center justify-center bg-black backdrop-blur-sm bg-opacity-80">
                        {/* Close Button */}
                        <button
                            onClick={closeMenu}
                            className="absolute px-5 py-3 text-xl text-white transition bg-black rounded-full top-5 right-5 hover:bg-brown"
                        >
                            <IconX />
                        </button>

                        {/* Navigation Links */}
                        <nav className="mt-10 text-center text-white">
                            <ul className="space-y-6 text-2xl">
                                <li>
                                    <a
                                        onClick={closeMenu}
                                        className="transition cursor-pointer hover:text-gray-300"
                                    >
                                        Home
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#product"
                                        onClick={closeMenu}
                                        className="transition cursor-pointer hover:text-gray-300"
                                    >
                                        Products
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#about"
                                        onClick={closeMenu}
                                        className="transition cursor-pointer hover:text-gray-300"
                                    >
                                        About Us
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#contact"
                                        onClick={closeMenu}
                                        className="transition cursor-pointer hover:text-gray-300"
                                    >
                                        Contact
                                    </a>
                                </li>
                            </ul>
                        </nav>
                    </div>
                )}
            </header>
            <div className='' style={{ backgroundColor: `${data?.data?.backgroundColor}1A` }}>
                {children}
            </div>
            <footer>footer</footer>
        </>
    )
}

export default Catalogue1Layout
