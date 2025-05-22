import { useEffect } from 'react'
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { portfolioResponse } from '@/validations/PortfolioValidation';

gsap.registerPlugin(ScrollTrigger);

const About = ({ portfolioData }: { portfolioData: portfolioResponse }) => {
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

    return portfolioData?.about?.body ? (
        <div className='max-w-screen-xl px-4 mx-auto my-10 md:px-10' id='aboutme'>
            <div className='flex flex-col items-center gap-10 md:flex'>
                <div className='flex flex-col w-full'>
                    <h1 className='w-full text-4xl font-bold text-gray-900 md:text-6xl about md:w-80'>
                        {portfolioData?.about?.head || "About Us"}
                    </h1>
                    <div className='w-40 h-0.5 mb-4 bg-blue'></div>
                </div>

                <div className='flex flex-col w-full gap-2 aboutme'>
                    <p className="text-base md:text-lg" dangerouslySetInnerHTML={{ __html: portfolioData?.about?.body }}></p>
                </div>
            </div>
        </div>
    ) : null;
};

export default About;
