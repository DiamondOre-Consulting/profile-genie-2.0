import React, { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const UMAbout = () => {
    useEffect(() => {
        gsap.fromTo('.about',
            { opacity: 0, y: 50 },
            {
                opacity: 1,
                y: 0,
                duration: 1,
                scrollTrigger: {
                    trigger: '.about',
                    start: 'top 80%',
                }
            }
        );

        gsap.fromTo('.aboutme',
            { opacity: 0, y: 50 },
            {
                opacity: 1,
                y: 0,
                duration: 1,
                delay: 0.5,
                stagger: 0.25,
                scrollTrigger: {
                    trigger: '.aboutme',
                    start: 'top 80%',
                }
            }
        );

    }, []);

    const primaryTextColor = "#6B7280";
    const secondaryTextColor = "#F43F5E";
    const buttonBgColor = "#0891B2";
    const aboutMeText = "I am a Business Administration graduate from Symbiosis Pune, with dual specializations in Marketing and International Business, bringing over 5 years of international experience in markets such as the Middle East and South Asia. My career includes significant roles with a Singapore-based supply chain major, where I managed vendor development, supply chain optimization, and business development. I have 3 years of recruitment expertise, focusing on channel development, internal talent acquisition, and process implementation with a system-oriented approach to drive results. Additionally, I have successfully led teams of HR specialists, sales professionals, MIS, and strategy experts, ensuring excellence in training and development.";

    return (
        <div className='px-10 my-10' id='aboutme'>
            <div className='md:flex gap-10 items-center flex-col'>
                <div className='flex flex-col w-full'>
                    <h1 className='font-bold text-6xl text-gray-900 about w-80'>About Us</h1>
                    <div className='w-40 h-0.5 mb-4' style={{ backgroundColor: buttonBgColor }}></div>
                </div>
                <p className='aboutme' style={{ color: primaryTextColor }}>
                    {aboutMeText}
                </p>
            </div>
        </div>
    );
}

export default UMAbout