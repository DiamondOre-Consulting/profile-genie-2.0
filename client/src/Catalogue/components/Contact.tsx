import { portfolioResponse } from "@/validations/PortfolioValidation";
import {
    IconMapPin,
    IconPhone,
    IconMail,
    IconBrandWhatsapp,
    IconDeviceFloppy,
    IconBrandFacebook,
    IconBrandX,
} from "@tabler/icons-react";
import { useState } from "react";

import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import { Link } from "react-router-dom"


const Contact = ({ contact, bgColor }: { contact: portfolioResponse['contactData'], bulkLinks: portfolioResponse['otherDetails']['bulkLink'], fullName: string }) => {
    console.log(contact)
    const [whatsappNo, setWhatsAppNo] = useState('');
    const url = encodeURIComponent(window.location.href);

    // const message = `*${"Hello"}*%0A%0A${"description"}%0A%0A🔗 ${url}`;
    // const whatsappUrl = `https://wa.me/?text=${message}`;
    // window.open(whatsappUrl, "_blank");

    const shareOnWhatsApp = () => {
        const personalMessage = `Hi! I am *${fullName}*, let's connect!%0A%0AIf you are eager to know what I do,%0Aplease visit my portfolio at %0A%0A ${"https://honda-admin.onrender.com/"}`;
        const whatsappUrl = `https://wa.me/?text=${personalMessage}`;
        window.open(whatsappUrl, "_blank");
    };

    const shareOnFacebook = () => {
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, "_blank");
    };

    const shareOnTwitter = () => {
        const message = `Hi! I am ${fullName}, let's connect! \n \n If you are eager to know what I do,%0Aplease visit my portfolio: \n  ${"https://honda-admin.onrender.com/"}`;
        const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(message)}`;

        window.open(twitterUrl, "_blank");
    };

    const lightenColor = (color, percent) => {
        const num = parseInt(color?.slice(1), 16),
            amt = Math.round(2.55 * percent * 100),
            r = (num >> 16) + amt,
            g = ((num >> 8) & 0x00ff) + amt,
            b = (num & 0x0000ff) + amt;

        return `rgb(${Math.min(255, r)}, ${Math.min(255, g)}, ${Math.min(255, b)})`;
    };


    return (
        <div className=" bg-white p-2 sm:p-6 md:p-16">
            <div style={{ backgroundColor: lightenColor(bgColor, 0.85) }} className="flex flex-col items-center  shadow-md rounded-lg mt-8 p-1.5 ">
                <div className="flex shadow-md items-center flex-col sm:flex-row w-full  mx-auto">
                    <div className="w-full h-70">
                        {(contact?.mapLink) &&
                            <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d28054.49214055431!2d77.08672!3d28.4852224!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sin!4v1743401160150!5m2!1sen!2sin" loading="lazy" className="w-full h-full sm:rounded-tr-none sm:rounded-l-md rounded-t-md "></iframe>
                        }
                    </div>

                    <div className="flex flex-col w-full md:min-w-[22rem] h-70 rounded-b-md sm:rounded-r-md md:max-w-[23rem] sm:rounded-bl-none   text-white bg-[#070a0f] items-center">
                        <h3 className="py-2 uppercase font-semibold tracking-wide">Share Catalogue</h3>
                        <div className=" p-4 rounded-t-xl w-full">
                            <div className="mt-1 flex flex-col w-full text-black  bg-[#00b718] shadow-md p-[2px] rounded-sm md:flex-row items-center relative gap-4  mx-auto">
                                <div className="bg-[#00b718] shadow-md h-9 w-12 cursor-pointer rounded-sm flex right-0.5 items-center justify-center gap-4 z-10 absolute border-green-500">
                                    <IconBrandWhatsapp className="text-white   " size={24} />
                                </div>
                                <PhoneInput
                                    placeholder="Enter phone number"
                                    country={'in'}
                                    inputStyle={{ width: '100%', border: 'none', fontSize: '14px' }}
                                    value={whatsappNo}
                                    onChange={phone => setWhatsAppNo(phone)}
                                />
                            </div>
                            <div className="flex space-x-3 mt-4">
                                <button onClick={shareOnWhatsApp} className="bg-green-500 cursor-pointer text-white flex items-center justify-center p-2 px-3 w-full rounded-md">
                                    <IconBrandWhatsapp />
                                </button>
                                <button onClick={shareOnFacebook} className="bg-blue-600 cursor-pointer text-white flex items-center justify-center p-2 px-3 w-full rounded-md">
                                    <IconBrandFacebook />
                                </button>
                                <button onClick={shareOnTwitter} className="bg-black text-white cursor-pointer p-2 flex items-center justify-center w-full px-3 rounded-md">
                                    <IconBrandX />
                                </button>
                            </div>
                            <div className=" flex flex-wrap mt-4 justify-center md:justify-start gap-3 ">

                                {contact?.contactCSV &&
                                    <Link to={contact?.contactCSV} className="bg-[#0890b21a] flex w-full items-center justify-center gap-1 text-[#0891b2] border border-[#0891b2] border-b-4 font-medium overflow-hidden relative px-2 py-2 rounded-md hover:brightness-150 hover:border-t-4 hover:border-b active:opacity-75 outline-none duration-300 group">
                                        <span className="bg-[#0891b2] shadow-[#0891b2] absolute -top-[150%] left-0 inline-flex w-80 h-[5px] rounded-md opacity-50 group-hover:top-[150%] duration-500 shadow-[0_0_10px_10px_rgba(0,0,0,0.3)]"></span>
                                        <IconDeviceFloppy size={18} /> Save Contact
                                    </Link>
                                }
                                {(contact?.brochureLink?.link) &&
                                    <Link to={contact?.brochureLink?.link}
                                        className="cursor-pointer w-full flex justify-between bg-rose-500 px-3 py-2 rounded-md text-white tracking-wider shadow-xl hover:bg-red-600  duration-500 hover:ring-1 font-mono "
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


            </div>
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Address */}
                <div className="bg-[#101828] shadow-md p-5 rounded-lg flex items-center gap-4 border-l-6 border-blue-500">
                    <div className="bg-blue-100 p-2 rounded-full">
                        <IconMapPin className="text-blue-500" size={24} />
                    </div>
                    <div>
                        <h4 className="font-semibold text-lg text-white">Head Office</h4>
                        <p className="text-gray-100">The Vion, PKB 54, Sector 122, Noida 201307</p>
                    </div>
                </div>

                <div className="bg-[#101828] shadow-md p-5 rounded-lg flex items-center gap-4 border-l-6 border-green-500">
                    <div className="bg-green-100 p-2 rounded-full">
                        <IconMapPin className="text-green-500" size={24} />
                    </div>
                    <div>
                        <h4 className="font-semibold text-lg text-white">Branch Office</h4>
                        <p className="text-gray-100">SCO 29, Sector 18, Gurugram, Haryana 122001</p>
                    </div>
                </div>

                {/* Phone Numbers */}
                <div className="bg-[#101828] shadow-md p-5 py-4 rounded-lg flex items-center gap-4 border-l-6 border-yellow-500">

                    <div className="bg-red-100 p-2 rounded-full">
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
                    <div className="bg-yellow-100 p-2 rounded-full">
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


        </div>
    );
};

export default Contact;
