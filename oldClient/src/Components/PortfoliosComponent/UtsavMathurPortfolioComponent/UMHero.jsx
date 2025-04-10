import React, { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import heropattern from '../../../assets/herospattern.png';
import umimage from '../../../assets/umimage.png'
import { FaWhatsapp } from "react-icons/fa";
import { BsArrowRight } from "react-icons/bs";

gsap.registerPlugin(ScrollTrigger);

const UMHero = () => {
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


    const handleWhatsAppChat = () => {
        const url = `https://api.whatsapp.com/send?phone=7838738916`;
        window.open(url, '_blank');
    };
    const name = "Utsav Mathur";
    const tagline = "Director Diamond Ore Consulting Pvt. Ltd";
    const primaryTextColor = "#6B7280";
    const secondaryTextColor = "#F43F5E";
    const buttonBgColor = "#0891B2";
    const backgroundColor = "#EDE9FE";
    const logoUrl = heropattern; // Using the same pattern image as the logo for this example

    return (
        <div style={{
            backgroundColor: backgroundColor
        }}>
            <div className="relative flex flex-col items-center max-w-screen-xl px-4 mx-auto md:flex-row sm:px-6 " >
                <div className="flex items-center py-5 md:w-1/2 md:pb-20 md:pt-10 md:pr-10">
                    <div className="text-left">
                        <h2
                            className="text-lg font-extrabold leading-10 tracking-tight text-gray-900 md:text-3xl sm:leading-none first">
                            Hi
                            <span className="ml-2 font-bold">There</span>
                        </h2>

                        <h2
                            className="mt-4 text-5xl font-extrabold leading-10 tracking-tight text-gray-900 md:text-7xl sm:leading-none second">
                            This is
                            <span className="ml-4 font-bold " style={{ color: secondaryTextColor }}>{name}</span>
                        </h2>
                        <p className="max-w-md mx-auto mt-6 text-base md:mt-3 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl third" style={{ color: primaryTextColor }}>
                            {tagline}
                        </p>
                        <div className="mt-10 sm:flex md:mt-8" onClick={handleWhatsAppChat}>
                            <button
                                className="relative z-10 h-12 p-2 px-6 overflow-hidden text-lg font-semibold text-white bg-black border-none rounded-md cursor-pointer w-fit group"
                            >
                                <div className='flex items-center justify-center gap-4'>
                                    <FaWhatsapp className='text-[1.6rem]' />  Let's talk on WhatsApp
                                </div>
                                <span
                                    className="absolute w-[110%] transition-transform duration-1000 origin-right transform scale-x-0 h-80 -top-8 -left-6 bg-sky-200 rotate-12 group-hover:scale-x-100 group-hover:duration-500"
                                ></span>
                                <span
                                    className="absolute w-[110%] transition-transform duration-700 origin-right transform scale-x-0 h-80 -top-8 -left-6 bg-sky-400 rotate-12 group-hover:scale-x-100 group-hover:duration-700"
                                ></span>
                                <span
                                    className="absolute w-[110%] transition-transform duration-500 origin-right transform scale-x-0 h-80 -top-8 -left-6 bg-sky-600 rotate-12 group-hover:scale-x-100 group-hover:duration-1000"
                                ></span>
                                <span
                                    className="group-hover:opacity-100 flex items-center justify-center gap-4 group-hover:duration-1000 duration-100 opacity-0 absolute top-2.5 left-6 z-10"
                                >Send message <BsArrowRight className='text-[1.6rem] mt-[0.15rem]' />
                                </span>
                            </button>

                        </div>
                    </div>
                </div>
                <div className="relative flex items-center w-full md:w-2/4 md:pb-20 md:pt-10 md:pl-10 md:ml-10" style={{ height: '500px' }}>
                    <img
                        src={heropattern}
                        className="absolute inset-0 z-0 object-cover w-full h-full"
                        alt="Pattern Image"
                    />
                    <div className='relative bottom-0 z-10 flex items-end justify-center w-full '>
                        <img src={umimage}
                            className="relative object-cover w-auto bottom-[-1.9rem] h-auto  "
                            alt="Overlay Image"
                        />
                    </div>
                </div>

            </div>
        </div>
    );
}


export default UMHero