import { ContainerScroll } from '@/Templates/Portfolio/Components/Template1/ui/container-scroll-animation'
import { portfolioResponse } from '@/validations/PortfolioValidation';

const About = ({ about, brands }: { about: portfolioResponse['about'], brands: portfolioResponse['otherDetails']['brands'] }) => {

    return (
        <div id='about' className='relative z-100'>
            <ContainerScroll>
                <div className='p-4 sm:p-6 md:p-8 sm:pt-4 md:pt-4' >
                    <h1 className="pointer-events-none whitespace-pre-wrap bg-gradient-to-b from-black to-neutral-500/80 bg-clip-text text-center text-5xl mb-4 font-bold leading-none text-transparent ">
                        {about?.head}
                    </h1>
                    <div
                        dangerouslySetInnerHTML={{ __html: about?.body }}></div>
                </div>
            </ContainerScroll >

        </div>
    )
}

export default About
