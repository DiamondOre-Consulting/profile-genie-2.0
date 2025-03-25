import { IconMenu, IconX } from '@tabler/icons-react';
import React, { useEffect, useState } from 'react'

const Catalogue1Layout = ({ logo, name, bgColor }: { logo?: string, name: string }) => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [showScrollToTop, setShowScrollToTop] = useState(false);




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
        <header className="flex bg-cream items-center max-w-[80rem] w-full mx-auto justify-between gap-2 px-4 py-4 md:px-0 relative z-10">
            {/* Logo and Title */}
            <div
                onClick={scrollToTop}

                className="flex items-center space-x-2">
                <img
                    src={logo}
                    alt="Logo"
                    className="w-16 h-16"
                />
                <span className="text-lg font-semibold text-black">
                    {name || "Profile Genie"}
                </span>
            </div>

            {/* Hamburger Menu Button */}
            <button
                onClick={toggleMenu}
                className="px-5 py-3 text-xl text-white bg-black rounded-full"
            >
                {menuOpen ? <IconX /> : <IconMenu />}
            </button>

            {/* Overlay Menu */}
            {menuOpen && (
                <div className="fixed inset-0 z-20 flex flex-col items-center justify-center bg-black backdrop-blur-sm bg-opacity-80">
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
    )
}

export default Catalogue1Layout
