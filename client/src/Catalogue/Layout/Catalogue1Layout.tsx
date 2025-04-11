import { catalogueResponse, productDetail } from '@/validations/CatalogueValidation';
import { IconArrowUp, IconBrandInstagram, IconBrandWhatsapp, IconMenu, IconPhoneCalling, IconShoppingCart, IconX } from '@tabler/icons-react';
import React, { useEffect, useState } from 'react'
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import { Link } from 'react-scroll'
import { lightenColor } from '../Hooks/calculations';

const Catalogue1Layout = ({ cart, children, data }: { cart: productDetail[], children: React.ReactNode, data: catalogueResponse }) => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [showScrollToTop, setShowScrollToTop] = useState(false);
    const { userName } = useParams()
    console.log(data)
    const goToHome = () => {
        if (userName) {
            navigate(`/catalogue/1/${userName}`);
        } else {
            navigate("/");
        }
        closeMenu();
    };

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

    const shareOnWhatsApp = () => {
        const personalMessage = `Hi! Let's connect.`;
        const encodedMessage = encodeURIComponent(personalMessage);
        const whatsappUrl = `https://wa.me/${918750316743}?text=${encodedMessage}`;
        window.open(whatsappUrl, "_blank");
    };


    return (
        <>


            <header
                style={{ backgroundColor: lightenColor(data?.data?.backgroundColor, 0.85) }}
                className="sticky top-0 z-50"
            >
                <div className='flex bg-cream items-center max-w-[80rem] w-full mx-auto justify-between gap-2 px-4 py-2 md:px-0 relative z-10'>
                    <div
                        onClick={() => {
                            goToHome()
                            scrollToTop()
                        }}

                        className="flex items-center space-x-2 cursor-pointer">
                        <img
                            src={data?.data?.logo?.url}
                            alt="Logo"
                            className=" h-13"
                        />
                        <span className="text-lg font-semibold text-black">
                            {data?.data?.name || "Profile Genie"}
                        </span>
                    </div>
                    <div className='flex items-center gap-2 p-2 px-4 bg-black rounded-full'>

                        {cart?.length > 0 && <NavLink to={`/catalogue/1/${userName}/cart`} className="border min-w-[25%] flex items-center justify-center rounded-md">
                            <div className="relative hover:text-blue-600">
                                <p className="bg-red-600 text-xs font-bold text-white absolute top-[-0.2rem] right-[-0.2rem] size-5 flex items-center justify-center rounded-full">{cart.length}</p>
                                <IconShoppingCart className="mt-2 mr-2 text-white size-5" />
                            </div>
                        </NavLink>}
                        <button
                            onClick={toggleMenu}
                            className="text-xl text-white rounded-full "
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
                            <ul className="flex flex-col items-center space-y-6 text-2xl">
                                <Link to='home' smooth={true} duration={500}>
                                    <a
                                        onClick={() => {
                                            goToHome()
                                            closeMenu()
                                        }}
                                        className="transition cursor-pointer hover:text-gray-300"
                                    >
                                        Home
                                    </a>
                                </Link>
                                <Link to='product' smooth={true} delay={600} duration={500}>
                                    <a
                                        href="#product"
                                        onClick={() => {
                                            goToHome()
                                            closeMenu()
                                        }}
                                        className="transition cursor-pointer hover:text-gray-300"
                                    >
                                        Products
                                    </a>
                                </Link>

                                <Link to='contact' smooth={true} delay={500} duration={500}>
                                    <a
                                        href="#contact"
                                        onClick={() => {
                                            goToHome()
                                            closeMenu()
                                        }}
                                        className="transition cursor-pointer hover:text-gray-300"
                                    >
                                        Contact
                                    </a>
                                </Link>
                                <Link to={``} smooth={true} delay={500} duration={500}>
                                    <a
                                        href="#cart"
                                        onClick={() => {
                                            goToHome()
                                            closeMenu()
                                        }}
                                        className="transition cursor-pointer hover:text-gray-300"
                                    >
                                        Contact
                                    </a>
                                </Link>
                            </ul>
                        </nav>
                    </div>
                )}
            </header>
            <div className='' >
                {showScrollToTop && <div onClick={scrollToTop} style={{ backgroundColor: lightenColor(data?.data?.backgroundColor, -0.3) }} className='fixed text-white p-2 rounded-md shadow-md cursor-pointer bottom-2 right-2 z-[10]'><IconArrowUp /></div>}
                {children}
            </div>
            <footer className='border-t border-gray-300 mt-4 shadow-[10px_0px_10px_#808080]' style={{ backgroundColor: lightenColor(data?.data?.backgroundColor, 0.85) }}>
                <div className="max-w-5xl py-4 mx-auto md:max-w-full md:pb-0">
                    <div
                        onClick={scrollToTop}

                        className="flex items-center mx-auto space-x-2 w-fit">
                        <img
                            src={data?.data?.logo?.url}
                            alt="Logo"
                            className="w-16 h-16"
                        />
                        <span className="text-lg font-semibold text-black">
                            {data?.data?.name || "Profile Genie"}
                        </span>
                    </div>

                    <ul className="flex flex-wrap justify-center gap-2 mt-2">
                        <button onClick={scrollToTop} className="flex items-center justify-center px-4 py-2 text-sm font-semibold text-gray-900 transition rounded-md cursor-pointer hover:bg-gray-300/50 focus:outline-none">
                            Home
                        </button>
                        <Link to='product' smooth={true} delay={500} duration={500} className='flex items-center justify-center px-4 py-2 text-sm font-semibold text-gray-900 transition rounded-md cursor-pointer hover:bg-gray-300/50 focus:outline-none'>
                            <a
                                onClick={() => {
                                    goToHome()
                                    closeMenu()
                                }}
                                className=""
                            >
                                Products
                            </a>
                        </Link>

                        <Link to='contact' id='#contact' smooth={true} duration={500} className='flex items-center justify-center px-4 py-2 text-sm font-semibold text-gray-900 transition rounded-md cursor-pointer hover:bg-gray-300/50 focus:outline-none'>Contact
                        </Link>

                        <NavLink to='./cart' className='flex items-center justify-center px-4 py-2 text-sm font-semibold text-gray-900 transition rounded-md cursor-pointer hover:bg-gray-300/50 focus:outline-none'>Cart
                        </NavLink>
                    </ul>
                    <div className='flex flex-col items-center justify-center mt-2 md:border-t md:flex-row md:justify-between md:px-10 lg:px-16'>
                        <p className="my-4 text-sm text-center text-gray-900 ">Powered by <NavLink className={'text-[#F43F5E] hover:text-[#F43F5E]/90 cursor-pointer font-semibold rounded-full text-sm hover:underline text-center '} to="/">Profile Genie</NavLink></p>
                        <ul className="flex justify-center gap-6 md:gap-8">
                            <li>
                                <a
                                    href="https://www.instagram.com/profile_genie_1?igsh=MW01amE5aHVwMTVpaw=="
                                    rel="noreferrer"
                                    target="_blank"
                                    className="text-gray-900 transition hover:text-gray-900/75"
                                >
                                    <IconBrandInstagram className='size-7' />
                                </a>
                            </li>



                            <li>
                                <a
                                    onClick={shareOnWhatsApp}
                                    rel="noreferrer"
                                    target="_blank"
                                    className="text-gray-900 transition hover:text-gray-900/75"
                                >
                                    <IconBrandWhatsapp className='size-7' />
                                </a>
                            </li>


                            <li>
                                <a
                                    href={`tel:${918750316743}`}
                                    rel="noreferrer"
                                    target="_blank"
                                    className="text-gray-900 transition hover:text-gray-900/75"
                                >
                                    <IconPhoneCalling className='size-7' />
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </footer>
        </>
    )
}

export default Catalogue1Layout
