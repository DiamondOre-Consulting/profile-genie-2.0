import { portfolioResponse } from '@/validations/PortfolioValidation';
import { ContainerScroll } from './ui/container-scroll-animation';
import Marquee from 'react-fast-marquee';

const About = ({ about, brands }: { about: portfolioResponse['about'], brands: portfolioResponse['otherDetails']['brands'] }) => {
    return (
        <div id='about' className='relative z-100'>
            <ContainerScroll>
                <div className='p-2 sm:p-6 md:p-8 sm:pt-4 md:pt-4' >
                    <h1 className="pointer-events-none whitespace-pre-wrap bg-gradient-to-b from-black to-neutral-500/80 bg-clip-text text-center text-5xl mb-4 font-bold leading-none text-transparent ">
                        {about?.head}
                    </h1>
                    <div
                        dangerouslySetInnerHTML={{ __html: about?.body }}></div>
                    <div className="relative flex w-full flex-col items-center justify-center overflow-hidden pt-6">
                        <Marquee pauseOnHover loop={0} direction="left" speed={30}>
                            {Array.from({ length: 10 }).map(() => (
                                ((brands?.brandList && brands?.brandList?.length > 1) && brands?.brandList?.map((brand, i) => (
                                    <div key={i} className="w-[5rem]  text-black text-left h-full rounded-lg  mx-1.5 ">
                                        <div className=" flex flex-col items-center gap-1 ">
                                            <img src={brand?.image?.url} className='rounded-md' alt={brand?.brandName} />
                                            <h2 className="pl-1 text-center">{brand?.brandName}</h2>
                                        </div>
                                    </div>)
                                ))
                            ))}
                        </Marquee>

                        <div className="pointer-events-none absolute inset-y-0 left-0 hidden w-1/3 bg-gradient-to-r from-white sm:block" />
                        <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-1/3 bg-gradient-to-l from-white sm:block" />
                    </div>
                </div>
            </ContainerScroll >

        </div>
    )
}

export default About
