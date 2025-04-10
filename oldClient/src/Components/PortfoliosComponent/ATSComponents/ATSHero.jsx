import React, { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import heropattern from '../../../assets/herospattern.png';
import umimage from '../../../assets/ATS.png'

gsap.registerPlugin(ScrollTrigger);

const ATSHero = () => {
    useEffect(() => {
        gsap.fromTo('.first',
            { opacity: 0, y: 50 },
            {
                opacity: 1,
                y: 0,
                duration: 1,
                scrollTrigger: {
                    trigger: '.first',
                    start: 'top 80%',
                }
            }
        );

        gsap.fromTo('.second',
            { opacity: 0, y: 50 },
            {
                opacity: 1,
                y: 0,
                duration: 1,
                delay: 0.5,
                stagger: 0.25,
                scrollTrigger: {
                    trigger: '.second',
                    start: 'top 80%',
                }
            }
        );

        gsap.fromTo('.third',
            { opacity: 0, y: 50 },
            {
                opacity: 1,
                y: 0,
                duration: 1,
                delay: 1,
                stagger: 0.25,
                scrollTrigger: {
                    trigger: '.third',
                    start: 'top 80%',
                }
            }
        );
    }, []);

    const name = "Vishal & Sakshi Aggarwal";
    const tagline = "Aapka Travel Saathi";
    const primaryTextColor = "#6B7280";
    const secondaryTextColor = "#F43F5E";
    const buttonBgColor = "#0891B2";

    const backgroundColor = "#EDE9FE";
    const logoUrl = heropattern; // Using the same pattern image as the logo for this example

    const handleWhatsAppChat = () => {
        const url = `https://api.whatsapp.com/send?phone=7838200690`;
        window.open(url, '_blank');
    };

    return (
        <div className="relative flex flex-col  items-center  px-4 mx-auto md:flex-row sm:px-6" style={{backgroundColor : backgroundColor}}>
            <div className="flex items-center py-5 md:w-1/2 md:pb-20 md:pt-10 md:pr-10">
                <div className="text-left">
                    <h2 className="text-lg md:text-3xl font-extrabold leading-10 tracking-tight text-gray-900 sm:leading-none first">
                        Hi
                        <span className="font-bold ml-2">There</span>
                    </h2>

                    <h2 className="text-5xl md:text-7xl mt-4 font-extrabold leading-10 tracking-tight text-gray-900 sm:leading-none second">
                        This is
                        <span className="font-bold ml-4" style={{ color: secondaryTextColor }}>{name}</span>
                    </h2>
                    <p className="max-w-md mx-auto mt-6 md:mt-3 text-base sm:text-lg md:mt-5 md:text-xl md:max-w-3xl third" style={{ color: primaryTextColor }}>
                        {tagline}
                    </p>
                    <div className="mt-10 sm:flex md:mt-8" onClick={handleWhatsAppChat}>
                        <div className="rounded-md shadow">
                            <a href=""
                               className="flex items-center justify-center w-full px-8 py-3 text-base font-medium leading-6 text-white transition duration-150 ease-in-out border border-transparent rounded-md hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue md:py-4 md:text-lg md:px-10"
                               style={{ backgroundColor: buttonBgColor }}>
                                Let's talk on WhatsApp
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-full relative flex items-center py-5 md:w-2/4 md:pb-20 md:pt-10 md:pl-10 md:ml-10" style={{ height: '500px' }}>
                <img
                    src={heropattern}
                    className="absolute inset-0 w-full h-full object-cover z-0"
                    alt="Pattern Image"
                />
                <img
                    src={umimage}
                    className="absolute top-10 md:top-0 md:right-14 md:bottom-0 w-auto h-auto object-cover z-10"
                    alt="Overlay Image"
                />
            </div>
        </div>
    );
}


export default ATSHero