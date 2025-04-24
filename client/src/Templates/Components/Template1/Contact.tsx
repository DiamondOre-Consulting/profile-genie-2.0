import { cn } from "@/lib/utils";
import { portfolioResponse } from "@/validations/PortfolioValidation";
import {
    IconMapPin,
    IconPhone,
    IconMail,
    IconBrandWhatsapp,
    IconBrandLinkedin,
    IconBrandInstagram,
    IconDeviceFloppy,
    IconBrandFacebook,
    IconBrandX,
    IconBrandGoogleFilled,
    IconLink
} from "@tabler/icons-react";
import { useState } from "react";
import Marquee from "react-fast-marquee";

import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import { Link } from "react-router-dom"


const Contact = ({ contact, bulkLinks, fullName }: { contact: portfolioResponse['contactData'], bulkLinks: portfolioResponse['otherDetails']['bulkLink'], fullName: string }) => {

    const [whatsappNo, setWhatsAppNo] = useState('');
    const url = encodeURIComponent(window.location.href);

    // const message = `*${"Hello"}*%0A%0A${"description"}%0A%0A🔗 ${url}`;
    // const whatsappUrl = `https://wa.me/?text=${message}`;
    // window.open(whatsappUrl, "_blank");

    const shareWithNumber = () => {
        const personalMessage = `Hi! I am *${fullName}*, let's connect!%0A%0AIf you are eager to know what I do,%0Aplease visit my portfolio at %0A%0A ${url}`;
        const whatsappUrl = `https://wa.me/${whatsappNo}?text=${personalMessage}`;
        window.open(whatsappUrl, "_blank");
    };

    const shareOnWhatsApp = () => {
        const personalMessage = `Hi! I am *${fullName}*, let's connect!%0A%0AIf you are eager to know what I do,%0Aplease visit my portfolio at %0A%0A ${url}`;
        const whatsappUrl = `https://wa.me/?text=${personalMessage}`;
        window.open(whatsappUrl, "_blank");
    };

    const shareOnFacebook = () => {
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, "_blank");
    };

    const shareOnTwitter = () => {
        const message = `Hi! I am ${fullName}, let's connect! \n \n If you are eager to know what I do,%0Aplease visit my portfolio: \n  ${url}`;
        const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(message)}`;

        window.open(twitterUrl, "_blank");
    };

    const getMapSrc = (mapLink?: string): string => {
        if (!mapLink) return '';

        if (mapLink.startsWith('http')) {
            return mapLink;
        }

        const match = mapLink.match(/src=["']([^"']+)["']/);
        console.log(match)
        return match ? match[1] : '';
    };

    console.log(contact)
    console.log("bulk", bulkLinks)
    return (
        <div className="relative z-20 px-2 py-10 bg-transparent sm:px-6 md:px-16">

            {(bulkLinks?.bulkLinkList?.length > 0) &&
                <div className="grid grid-cols-1 gap-4 md:grid-cols-3 sm:grid-cols-2">
                    {bulkLinks?.bulkLinkList?.map((link, index) => (
                        <Link key={index}
                            target="_blank"
                            to={link?.link ?? ""}
                            className={cn(
                                "relative   px-4 py-2 rounded-md overflow-hidden",
                                "shadow-md shadow-[#FF2056]/50 ",
                                "transition-all hover:-translate-y-0.5 cursor-pointer duration-200 bg-[#101828]",
                                "group",
                            )}
                        >


                            <div className="relative flex items-center justify-center gap-2">
                                <span className="pr-4 text-white">{link?.linkName}</span>
                                <IconLink className="w-5 absolute top-0 -right-2 text-[#FF2056] " />
                            </div>
                        </Link>
                    ))}
                </div>
            }

            {contact &&
                <>
                    <div className="flex flex-col items-center bg-gradient-to-b from-[#101828] to-black shadow-md rounded-lg mt-8 p-1.5 ">

                        <div className="flex flex-col items-center w-full mx-auto sm:flex-row">
                            <div className="w-full overflow-hidden h-70">
                                {(contact?.mapLink) &&
                                    <iframe
                                        title="Google Maps"
                                        className="w-full h-full rounded-lg rounded-r-none "
                                        src={getMapSrc(contact?.mapLink)}
                                        loading="lazy"
                                    >
                                    </iframe>
                                }
                            </div>

                            <div className="flex flex-col w-full h-70 my-auto md:min-w-[22rem] md:max-w-[23rem] text-white bg-[#141d2fcb] items-center">
                                <h3 className="py-2 font-semibold tracking-wide uppercase">Share Portfolio</h3>
                                <div className="w-full p-4 rounded-t-xl">
                                    <div className="mt-1 flex flex-col w-full text-black  bg-[#00b718] shadow-md p-[2px] rounded-sm md:flex-row items-center relative gap-4  mx-auto">
                                        <div className="bg-[#00b718] shadow-md h-9 w-12 cursor-pointer rounded-sm flex right-0.5 items-center justify-center gap-4 z-10 absolute border-green-500">
                                            <IconBrandWhatsapp onClick={shareWithNumber} className="text-white" size={24} />
                                        </div>
                                        <PhoneInput
                                            placeholder="Enter phone number..."
                                            country={'in'}
                                            inputStyle={{ width: '100%', border: 'none', fontSize: '14px' }}
                                            value={whatsappNo}
                                            onChange={phone => setWhatsAppNo(phone)}
                                        />
                                    </div>
                                    <div className="flex mt-4 space-x-3">
                                        <button onClick={shareOnWhatsApp} className="flex items-center justify-center w-full p-2 px-3 text-white bg-green-500 rounded-md cursor-pointer">
                                            <IconBrandWhatsapp />
                                        </button>
                                        <button onClick={shareOnFacebook} className="flex items-center justify-center w-full p-2 px-3 text-white bg-blue-600 rounded-md cursor-pointer">
                                            <IconBrandFacebook />
                                        </button>
                                        <button onClick={shareOnTwitter} className="flex items-center justify-center w-full p-2 px-3 text-white bg-black rounded-md cursor-pointer">
                                            <IconBrandX />
                                        </button>
                                    </div>
                                    <div className="flex flex-wrap justify-center gap-3 mt-4 md:justify-start">

                                        {contact?.contactCSV &&
                                            <Link to={contact?.contactCSV} className="bg-[#0890b21a] flex w-full items-center justify-center gap-1 text-[#0891b2] border border-[#0891b2] border-b-4 font-medium overflow-hidden relative px-2 py-2 rounded-md hover:brightness-150 hover:border-t-4 hover:border-b active:opacity-75 outline-none duration-300 group">
                                                <span className="bg-[#0891b2] shadow-[#0891b2] absolute -top-[150%] left-0 inline-flex w-80 h-[5px] rounded-md opacity-50 group-hover:top-[150%] duration-500 shadow-[0_0_10px_10px_rgba(0,0,0,0.3)]"></span>
                                                <IconDeviceFloppy size={18} /> Save Contact
                                            </Link>
                                        }
                                        {(contact?.brochureLink?.link) &&
                                            <Link to={contact?.brochureLink?.link}
                                                className="flex justify-between w-full px-3 py-2 font-mono tracking-wider text-white duration-500 rounded-md shadow-xl cursor-pointer bg-rose-500 hover:bg-red-600 hover:ring-1 "
                                            >
                                                {contact?.brochureLink?.tagline}
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    stroke-width="2"
                                                    stroke="currentColor"
                                                    className="w-5 h-5 animate-bounce"
                                                >
                                                    <path
                                                        stroke-linecap="round"
                                                        stroke-linejoin="round"
                                                        d="M19.5 13.5 12 21m0 0-7.5-7.5M12 21V3"
                                                    ></path>
                                                </svg>
                                            </Link>
                                        }

                                    </div>
                                </div>
                            </div>

                        </div>

                        <Marquee speed={30} gradient={true} gradientColor="#000" pauseOnHover className="text-white bg-black ">
                            {Array.from({ length: 10 }).map((_, index) => (
                                <div key={index} className="flex items-center py-3">
                                    {contact?.social?.facebook &&
                                        <Link to={contact?.social?.facebook} className="block p-2 mx-4 duration-300 rounded-md hover:scale-110 bg-neutral-700">
                                            <IconBrandFacebook className="cursor-pointer " size={24} />
                                        </Link>
                                    }
                                    {contact?.social?.linkedin &&
                                        <Link to={contact?.social?.linkedin} className="block p-2 mx-4 duration-300 rounded-md hover:scale-110 bg-neutral-700">
                                            <IconBrandLinkedin className="cursor-pointer " size={24} />
                                        </Link>
                                    }
                                    {contact?.social?.twitter &&
                                        <Link to={contact?.social?.twitter} className="block p-2 mx-4 duration-300 rounded-md hover:scale-110 bg-neutral-700">
                                            <IconBrandX className="cursor-pointer " size={24} />
                                        </Link>
                                    }
                                    {contact?.social?.instagram &&
                                        <Link to={contact?.social?.instagram} className="block p-2 mx-4 duration-300 rounded-md hover:scale-110 bg-neutral-700">
                                            <IconBrandInstagram className="cursor-pointer " size={24} />
                                        </Link>
                                    }
                                    {contact?.social?.googleLink &&
                                        <Link to={contact?.social?.googleLink} className="block p-2 mx-4 duration-300 rounded-md hover:scale-110 bg-neutral-700">
                                            <IconBrandGoogleFilled className="cursor-pointer " size={24} />
                                        </Link>
                                    }
                                    {(contact?.social?.otherSocialList) && contact?.social?.otherSocialList?.length >= 0 &&
                                        contact?.social?.otherSocialList?.map((item, index) => {
                                            return (
                                                <Link key={index} to={item.link || ''} className="block p-2 mx-4 duration-300 rounded-md hover:scale-110 bg-neutral-700">
                                                    <img src={item?.img?.url} alt={"Image" + index} className="w-6 h-6 cursor-pointer " />
                                                </Link>
                                            );
                                        })
                                    }
                                </div>
                            ))}
                        </Marquee>
                    </div>
                    <div className="grid grid-cols-1 gap-6 mt-8 md:grid-cols-2">

                        {Array.isArray(contact?.address) && contact.address.length > 0 && contact?.address?.map((item, index) => {
                            return (
                                <div key={index} className="bg-[#101828] shadow-md p-5 rounded-lg flex items-center gap-4 border-l-6 border-blue-500">
                                    <div className="p-2 bg-blue-100 rounded-full">
                                        <IconMapPin className="text-blue-500" size={24} />
                                    </div>
                                    <div>
                                        <h4 className="text-lg font-semibold text-white">{item?.title}</h4>
                                        <p className="text-gray-100">{item?.detail}</p>
                                    </div>
                                </div>
                            );
                        })}


                        {/* Phone Numbers */}
                        <div className="bg-[#101828] shadow-md p-5 py-4 rounded-lg flex items-center gap-4 border-l-6 border-yellow-500">

                            <div className="p-2 bg-red-100 rounded-full">
                                <IconPhone className="text-red-500" size={24} />
                            </div>
                            <div>
                                {contact?.phoneList?.map((item, index) => {
                                    return (
                                        <p key={index} className="text-gray-100">{item?.phone}</p>
                                    );
                                })}
                            </div>
                        </div>



                        {/* Emails */}
                        <div className="bg-[#101828] shadow-md p-5 py-4 rounded-lg flex items-center gap-4 border-l-6 border-yellow-500">
                            <div className="p-2 bg-yellow-100 rounded-full">
                                <IconMail className="text-yellow-500" size={24} />
                            </div>
                            <div>
                                {contact?.emailList?.map((item, index) => {
                                    return (
                                        <p key={index} className="text-gray-100">{item?.email}</p>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </>
            }


        </div>
    );
};

export default Contact;
