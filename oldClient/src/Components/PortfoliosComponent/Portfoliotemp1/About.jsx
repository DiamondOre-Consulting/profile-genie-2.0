import React, { useEffect } from 'react'
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const About = ({ portfolioData }) => {

    const shouldRender = portfolioData?.aboutMe?.aboutContent || portfolioData && portfolioData?.aboutMe && portfolioData?.aboutMe?.trim() !== '';

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

    function load() {
        portfolioData?.aboutMe?.aboutContent?.map((data, ind) => {
            console.log(data.content)
        })
    }

    load()

    const primaryTextColor = portfolioData.primaryTextColor;
    const secondaryTextColor = portfolioData.secondaryTextColor;
    const buttonBgColor = portfolioData.buttonColor;

    console.log(portfolioData?.aboutMe?.aboutContent)
    return shouldRender ? (
        <div className='px-10 my-10 ' id='aboutme'>
            <div className='flex-col items-center gap-10 md:flex'>
                <div className='flex flex-col w-full'>
                    <h1 className='text-6xl font-bold text-gray-900 about w-80 '>{portfolioData?.aboutMe?.aboutHead || "About Us"}</h1>
                    <div className='w-40 h-0.5 mb-4' style={{ backgroundColor: buttonBgColor }}></div>
                </div>


                <div className='flex flex-col gap-2' style={{ color: primaryTextColor }}>
                    {
                        portfolioData?.aboutMe?.aboutContent ?
                            portfolioData?.aboutMe?.aboutContent?.map((data, ind) => {
                                return <p key={data?.id}>
                                    {data.content}
                                </p>
                            }) :
                            <p>
                                {portfolioData?.aboutMe}
                            </p>
                    }
                </div>
            </div>
        </div>
    ) : null;
}

export default About;
