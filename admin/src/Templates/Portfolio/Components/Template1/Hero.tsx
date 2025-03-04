import heropattern from '../../../../assets/herospattern.png'
import { IconBrandWhatsapp } from '@tabler/icons-react';


const Hero = ({ portfolio }) => {
    const handleWhatsAppChat = () => {
        const url = `https://api.whatsapp.com/send?phone=${encodeURIComponent(916207234759)}`;
        window.open(url, '_blank');
    }

    return (
        <div className="relative bg-transparent pt-16 min-h-[94vh]  flex flex-col items-center justify-center max-w-[75rem] px-4 mx-auto md:flex-row sm:px-6 ">
            <div className="flex items-center py-5 md:w-1/2  md:pt-10 md:pr-10">
                <section className=" md:text-left flex flex-col md:items-start items-center justify-center text-center bg-gradient-to-r  px-6">
                    <h1 className="text-2xl sm:text-3xl  font-semibold text-gray-900">
                        Hi, I'm <br /> <span className="text-[#F43F5E] text-4xl sm:text-5xl font-bold md:text-5xl">{portfolio?.fullName}</span>
                    </h1>
                    <p className='mt-4 font-semibold text-lg text-gray-800'>{portfolio?.tagline}</p>
                    <p className=" text-md text-gray-700 max-w-2xl">
                        {portfolio?.shortDescription}
                    </p>
                    <div className="mt-6 flex gap-4">
                        <a href="#contact" className="bg-[#F43F5E] text-white px-6 py-2 rounded-md shadow-md hover:bg-[#f52044] transition">
                            About me
                        </a>
                        <div className="border flex items-center gap-3 cursor-pointer border-[#F43F5E] text-[#F43F5E] px-6 py-2 rounded-md hover:bg-[#f52044] hover:text-white transition" onClick={handleWhatsAppChat}>
                            <IconBrandWhatsapp /> let&apos;s talk
                        </div>
                    </div>
                </section>

            </div>
            <div className="relative flex items-center  w-full pt-5 md:w-2/4 md:pt-10 md:pl-10 md:ml-10" >
                <img
                    src={heropattern}
                    className="absolute inset-0 z-0 object-cover w-full h-full"
                    alt="Pattern Image"
                />
                {<div className='relative bottom-0 z-1 flex items-end justify-center w-full '>
                    <img src={portfolio?.image?.url}
                        className="relative object-cover w-auto bottom-0 h-auto max-h-[26rem]"
                        alt="Overlay Image"
                    />
                </div>}
            </div>

        </div>
    )
}

export default Hero