import {
    IconMapPin,
    IconPhone,
    IconMail,
    IconBrandWhatsapp,
    IconDownload,
    IconBrandLinkedin,
    IconBrandGoogle,
    IconBrandInstagram,
    IconBrandYoutube,
    IconDeviceFloppy,
    IconBrandFacebook,
    IconBrandX
} from "@tabler/icons-react";
import { useState } from "react";
import Marquee from "react-fast-marquee";

import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'



const Contact: React.FC = () => {

    const [whatsappNo, setWhatsAppNo] = useState('');
    const url = encodeURIComponent(window.location.href);

    const shareOnWhatsApp = () => {
        window.open(`https://wa.me/?text=${url}`, "_blank");
    };

    const shareOnFacebook = () => {
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, "_blank");
    };

    const shareOnTwitter = () => {
        window.open(`https://x.com/intent/tweet?url=${url}`, "_blank");
    };

    console.log(whatsappNo)
    return (
        <div className="bg-transparent relative z-20 py-10 px-2 sm:px-6 md:px-16">

            <div className="flex flex-col items-center bg-gradient-to-b from-[#101828] to-black shadow-md rounded-lg mt-8 p-1.5 ">

                <div className="flex items-center w-full  mx-auto">
                    <div className="w-full h-70">
                        <iframe
                            title="Google Maps"
                            className="w-full h-full rounded-lg rounded-r-none "
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14014.249050812883!2d77.35272185!3d28.5864514!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce567fdfcc2fb%3A0xa2fc39f8c6c92c91!2sSector%20122%2C%20Noida%2C%20Uttar%20Pradesh!5e0!3m2!1sen!2sin!4v1710000000000"
                            loading="lazy"
                        ></iframe>
                    </div>

                    <div className="flex flex-col w-full md:min-w-[22rem] md:max-w-[23rem] text-white bg-[#141d2fcb] items-center">
                        <h3 className="py-2 uppercase font-semibold tracking-wide">Share Portfolio</h3>
                        <div className=" p-4 rounded-t-xl">
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
                                <button onClick={shareOnWhatsApp} className="bg-green-500 text-white flex items-center justify-center p-2 px-3 w-full rounded-md">
                                    <IconBrandWhatsapp />
                                </button>
                                <button onClick={shareOnFacebook} className="bg-blue-600 text-white flex items-center justify-center p-2 px-3 w-full rounded-md">
                                    <IconBrandFacebook />
                                </button>
                                <button onClick={shareOnTwitter} className="bg-black text-white p-2 flex items-center justify-center w-full px-3 rounded-md">
                                    <IconBrandX />
                                </button>
                            </div>
                            <div className=" flex flex-wrap mt-4 justify-center md:justify-start gap-3 ">

                                <button className="bg-[#0890b21a] flex w-full items-center justify-center gap-1 text-[#0891b2] border border-[#0891b2] border-b-4 font-medium overflow-hidden relative px-2 py-2 rounded-md hover:brightness-150 hover:border-t-4 hover:border-b active:opacity-75 outline-none duration-300 group">
                                    <span className="bg-[#0891b2] shadow-[#0891b2] absolute -top-[150%] left-0 inline-flex w-80 h-[5px] rounded-md opacity-50 group-hover:top-[150%] duration-500 shadow-[0_0_10px_10px_rgba(0,0,0,0.3)]"></span>
                                    <IconDeviceFloppy size={18} /> Save Contact
                                </button>
                                <button
                                    className="cursor-pointer w-full flex justify-between bg-rose-500 px-3 py-2 rounded-md text-white tracking-wider shadow-xl hover:bg-red-600 hover:scale-105 duration-500 hover:ring-1 font-mono "
                                >
                                    Download Brochure
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
                                </button>

                            </div>
                        </div>
                    </div>

                </div>

                <Marquee speed={30} gradient={true} gradientColor="#000" className="flex items-center bg-black py-3  text-white ">
                    <div className="bg-neutral-700 p-2 rounded-md mx-4">
                        <IconBrandLinkedin className="hover:text-blue-700 cursor-pointer " size={24} />
                    </div>
                    <div className="bg-neutral-700 p-2 rounded-md mx-4">
                        <IconBrandGoogle className="hover:text-red-500 cursor-pointer" size={28} />
                    </div>
                    <div className="bg-neutral-700 p-2 rounded-md mx-4">
                        <IconBrandInstagram className="hover:text-pink-500 cursor-pointer" size={28} />
                    </div>
                    <div className="bg-neutral-700 p-2 rounded-md mx-4">
                        <IconBrandYoutube className="hover:text-red-600 cursor-pointer" size={28} />
                    </div>
                    <div className="bg-neutral-700 p-2 rounded-md mx-4">
                        <IconBrandLinkedin className="hover:text-blue-700 cursor-pointer " size={24} />
                    </div>
                    <div className="bg-neutral-700 p-2 rounded-md mx-4">
                        <IconBrandGoogle className="hover:text-red-500 cursor-pointer" size={28} />
                    </div>
                    <div className="bg-neutral-700 p-2 rounded-md mx-4">
                        <IconBrandInstagram className="hover:text-pink-500 cursor-pointer" size={28} />
                    </div>
                    <div className="bg-neutral-700 p-2 rounded-md mx-4">
                        <IconBrandYoutube className="hover:text-red-600 cursor-pointer" size={28} />
                    </div>
                    <div className="bg-neutral-700 p-2 rounded-md mx-4">
                        <IconBrandLinkedin className="hover:text-blue-700 cursor-pointer " size={24} />
                    </div>
                    <div className="bg-neutral-700 p-2 rounded-md mx-4">
                        <IconBrandGoogle className="hover:text-red-500 cursor-pointer" size={28} />
                    </div>
                    <div className="bg-neutral-700 p-2 rounded-md mx-4">
                        <IconBrandInstagram className="hover:text-pink-500 cursor-pointer" size={28} />
                    </div>
                    <div className="bg-neutral-700 p-2 rounded-md mx-4">
                        <IconBrandYoutube className="hover:text-red-600 cursor-pointer" size={28} />
                    </div>
                    <div className="bg-neutral-700 p-2 rounded-md mx-4">
                        <IconBrandYoutube className="hover:text-red-600 cursor-pointer" size={28} />
                    </div>
                    <div className="bg-neutral-700 p-2 rounded-md mx-4">
                        <IconBrandLinkedin className="hover:text-blue-700 cursor-pointer " size={24} />
                    </div>
                    <div className="bg-neutral-700 p-2 rounded-md mx-4">
                        <IconBrandGoogle className="hover:text-red-500 cursor-pointer" size={28} />
                    </div>
                    <div className="bg-neutral-700 p-2 rounded-md mx-4">
                        <IconBrandInstagram className="hover:text-pink-500 cursor-pointer" size={28} />
                    </div>
                    <div className="bg-neutral-700 p-2 rounded-md mx-4">
                        <IconBrandYoutube className="hover:text-red-600 cursor-pointer" size={28} />
                    </div>
                </Marquee>

            </div>

            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Address */}
                <div className="bg-[#101828] shadow-md p-5 rounded-lg flex items-center gap-4 border-l-6 border-blue-500">
                    <div className="bg-blue-100 p-3 rounded-full">
                        <IconMapPin className="text-blue-500" size={28} />
                    </div>
                    <div>
                        <h4 className="font-semibold text-lg text-white">Head Office</h4>
                        <p className="text-gray-100">The Vion, PKB 54, Sector 122, Noida 201307</p>
                    </div>
                </div>

                <div className="bg-[#101828] shadow-md p-5 rounded-lg flex items-center gap-4 border-l-6 border-green-500">
                    <div className="bg-green-100 p-3 rounded-full">
                        <IconMapPin className="text-green-500" size={28} />
                    </div>
                    <div>
                        <h4 className="font-semibold text-lg text-white">Branch Office</h4>
                        <p className="text-gray-100">SCO 29, Sector 18, Gurugram, Haryana 122001</p>
                    </div>
                </div>

                {/* Phone Numbers */}
                <div className="bg-[#101828] shadow-md p-5 rounded-lg flex items-center gap-4 border-l-6 border-red-500">
                    <div className="bg-red-100 p-3 rounded-full">
                        <IconPhone className="text-red-500" size={28} />
                    </div>
                    <div>
                        <p className="text-gray-100">+91 9717017366</p>
                        <p className="text-gray-100">+91 9717017366</p>
                    </div>
                </div>



                {/* Emails */}
                <div className="bg-[#101828] shadow-md p-5 rounded-lg flex items-center gap-4 border-l-6 border-yellow-500">
                    <div className="bg-yellow-100 p-3 rounded-full">
                        <IconMail className="text-yellow-500" size={28} />
                    </div>
                    <div>
                        <p className="text-gray-100">connect@vion.co.in</p>
                        <p className="text-gray-100">connect@vion.co.in</p>
                    </div>
                </div>
            </div>


        </div>
    );
};

export default Contact;
