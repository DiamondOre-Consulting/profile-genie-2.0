import { useEffect } from 'react'
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import heropattern from '../../../assets/herospattern.png'
import { FaWhatsapp } from 'react-icons/fa';
import { portfolioResponse } from '@/validations/PortfolioValidation';
// import newOverlayImage from '../../../assets/demoheroimage.png'

gsap.registerPlugin(ScrollTrigger);

const Hero = ({ portfolioData }: { portfolioData: portfolioResponse }) => {

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
        const url = `https://api.whatsapp.com/send?phone=${encodeURIComponent(portfolioData?.phoneNumber || '')}`;
        window.open(url, '_blank');
    };

    console.log(portfolioData)

    return (
        <div className="relative flex flex-col items-center max-w-screen-xl px-4 mx-auto bg-template2mainBg md:flex-row sm:px-6">
            <div className="flex items-center justify-center w-full py-5 md:w-1/2 md:pb-20 md:pt-10 md:pr-10">
                <div className="text-left">
                    <h2 className="text-lg font-extrabold leading-10 tracking-tight text-gray-900 md:text-3xl sm:leading-none first">
                        Hi
                        <span className="ml-2 font-bold">There</span>
                    </h2>

                    <h2 className="mt-4 text-5xl font-extrabold leading-10 tracking-tight text-gray-900 md:text-7xl sm:leading-none second">
                        This is
                        <span className="font-bold text-pink"> {portfolioData?.fullName}</span>
                    </h2>
                    <p className="max-w-md mt-6 text-base md:mt-3 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl third" dangerouslySetInnerHTML={{ __html: portfolioData?.tagline }} />
                    <div className="mt-10 sm:flex md:mt-8">
                        <button
                            onClick={handleWhatsAppChat}
                            className="relative z-10 h-12 p-2 px-6 overflow-hidden text-lg font-semibold text-white bg-[#2EAAC1] border-none rounded-md cursor-pointer w-fit group"
                        >
                            <div className='flex items-center justify-center gap-4'>
                                <FaWhatsapp className='text-[1.6rem]' /> Let's talk on WhatsApp
                            </div>
                        </button>
                    </div>
                </div>
            </div>
            <div className="relative flex items-center justify-center w-full py-5 md:w-2/4 md:pb-20 md:pt-10 md:pl-10 md:ml-10" style={{ height: '500px' }}>
                <img
                    src={heropattern}
                    className="absolute inset-0 z-0 object-cover w-full h-full"
                    alt="Pattern Image"
                />
                {portfolioData?.image?.url && (
                    <div className='relative bottom-0 z-10 flex items-end justify-center w-full'>
                        <img
                            src={portfolioData?.image?.url}
                            className="relative object-cover w-auto bottom-[-1.2rem] h-auto"
                            alt="Profile Image"
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

export default Hero