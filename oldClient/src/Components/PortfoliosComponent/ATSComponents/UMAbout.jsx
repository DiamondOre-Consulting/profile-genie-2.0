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
    const aboutMeText = "Aapka Travel Saathi is your trusted partner in creating seamless and memorable travel experiences. Specializing in everything from domestic and international flights, curated tour packages, and exclusive hotel deals to comprehensive visa assistance and travel insurance, we ensure that your journey is stress-free and perfectly organized. Our commitment to excellence is evident in our personalized travel solutions, instant bookings, and expert guidance, making us a preferred choice for both business and leisure travelers. Whether you're embarking on a family vacation, a solo adventure, or a business trip, Aapka Travel Saathi takes care of every detail, so you can focus on enjoying the journey. Clients rave about our attention to detail, exceptional customer service, and the ease of traveling with our support. At Aapka Travel Saathi, we believe in turning destinations into cherished memories. Join us and start your journey today!";

    return (
        <div className='px-10 my-10' id='aboutme'>
            <div className='md:flex gap-10 items-center flex-col'>
                <div className='flex flex-col w-full'>
                    <h1 className='font-bold text-6xl text-gray-900 about w-80'>About Me</h1>
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