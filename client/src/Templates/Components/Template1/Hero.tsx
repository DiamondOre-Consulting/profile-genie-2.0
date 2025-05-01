import heropattern from '../../../assets/herospattern.png'
import { IconBrandWhatsapp } from '@tabler/icons-react';
import { portfolioResponse } from '@/validations/PortfolioValidation';
import girlImg from '../../../assets/qwer.png'
import boyImg from '../../../assets/qw.png'

const Hero = ({ portfolio }: { portfolio: portfolioResponse }) => {
    const handleWhatsAppChat = () => {
        if (portfolio?.contactData?.whatsappNo) {
            const url = `https://api.whatsapp.com/send?phone=${encodeURIComponent(portfolio?.contactData?.whatsappNo)}`;
            window.open(url, '_blank');
        }
    }

    return (
        <div className={`relative bg-transparent pt-16 ${portfolio?.userName && "min-h-[94vh]"} flex flex-col items-center justify-center max-w-[75rem] px-4 mx-auto md:flex-row sm:px-6`}>
            <div className="flex items-center py-5 md:w-1/2 md:pt-10 md:pr-10">
                <section className="flex flex-col items-center justify-center px-6 text-center md:text-left md:items-start bg-gradient-to-r">
                    <h1 className="text-2xl font-semibold text-gray-900 sm:text-3xl">
                        Hi, I'm <br /> <span className="text-[#F43F5E] text-4xl sm:text-5xl font-bold md:text-5xl">{portfolio?.fullName}</span>
                    </h1>
                    <p className='mt-4 text-lg font-semibold text-gray-800'>{portfolio?.tagline}</p>
                    <p className="max-w-2xl text-gray-700 text-md">
                        {portfolio?.shortDescription}
                    </p>
                    {
                        portfolio?.contactData?.whatsappNo &&
                        <div className="border flex mt-3 items-center gap-3 cursor-pointer bg-[#F43F5E] min-w-[15rem]  px-6 py-2 rounded-md hover:bg-[#f52044] text-white transition" onClick={handleWhatsAppChat}>
                            <IconBrandWhatsapp /> let&apos;s talk on whatsapp
                        </div>
                    }
                </section>

            </div>
            <div className="relative flex items-center w-full pt-5 md:w-2/4 md:pt-10 md:pl-10 md:ml-10" >
                <img
                    src={heropattern}
                    className="absolute inset-0 z-0 object-cover w-full h-full"
                    alt="Pattern Image"
                />
                {<div className='relative bottom-0 flex items-end justify-center w-full z-1 '>
                    <img src={(portfolio?.image?.url) ? portfolio?.image?.url :(portfolio?.gender === "female") ? girlImg : boyImg}
                        className="relative object-cover w-auto bottom-0 h-auto max-h-[26rem]"
                        alt="Overlay Image"
                    />
                </div>}
            </div>

        </div>
    )
}

export default Hero
