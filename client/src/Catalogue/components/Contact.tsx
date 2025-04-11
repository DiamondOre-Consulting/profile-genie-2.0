import {
    IconMapPin,
    IconPhone,
    IconMail,
    IconBrandWhatsapp,
    IconBrandFacebook,
    IconBrandX,
} from "@tabler/icons-react";
import { useState } from "react";

import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import { lightenColor } from "../Hooks/calculations";
import { catalogueResponse } from "@/validations/CatalogueValidation";


const Contact = ({ contact, bgColor, fullName }: { contact: catalogueResponse['data']['catalogueOwner'], bgColor: string, fullName: string }) => {
    console.log(contact)
    const [whatsappNo, setWhatsAppNo] = useState('');
    const url = encodeURIComponent(window.location.href);

    // const message = `*${"Hello"}*%0A%0A${"description"}%0A%0A🔗 ${url}`;
    // const whatsappUrl = `https://wa.me/?text=${message}`;
    // window.open(whatsappUrl, "_blank");

    const shareOnWhatsApp = () => {
        const personalMessage = `Hi! I am *${fullName}*, let's connect!%0A%0AIf you are eager to know what I do,%0Aplease visit my portfolio at %0A%0A ${url}`;
        const whatsappUrl = `https://wa.me/?text=${personalMessage}`;
        window.open(whatsappUrl, "_blank");
    };

    const shareOnFacebook = () => {
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, "_blank");
    };

    const shareOnTwitter = () => {
        const message = `Hi! I am ${fullName}, let's connect! \n \n If you are eager to know what I do,%0Aplease visit my catalogue: \n  ${url}`;
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


    return (
        <div id="#contact" className="p-2 bg-white sm:p-6 md:p-16">
            <div style={{ backgroundColor: lightenColor(bgColor, 0.85) }} className="flex flex-col items-center  shadow-md rounded-lg mt-8 p-1.5 ">
                <div className="flex flex-col items-center w-full mx-auto shadow-md sm:flex-row">
                    <div className="w-full h-70">
                        {(contact?.mapLink) &&
                            <iframe src={getMapSrc(contact?.mapLink)} loading="lazy" className="w-full h-full sm:rounded-tr-none sm:rounded-l-md rounded-t-md "></iframe>
                        }
                    </div>

                    <div className="flex flex-col w-full md:min-w-[22rem] h-70 rounded-b-md sm:rounded-r-md md:max-w-[23rem] sm:rounded-bl-none   text-white bg-[#070a0f] items-center">
                        <h3 className="py-2 font-semibold tracking-wide uppercase">Share Catalogue</h3>
                        <div className="w-full p-4 rounded-t-xl">
                            <div className="mt-1 flex flex-col w-full text-black  bg-[#00b718] shadow-md p-[2px] rounded-sm md:flex-row items-center relative gap-4  mx-auto">
                                <div onClick={shareOnWhatsApp} className="bg-[#00b718] shadow-md h-9 w-12 cursor-pointer rounded-sm flex right-0.5 items-center justify-center gap-4 z-10 absolute border-green-500">
                                    <IconBrandWhatsapp className="text-white " size={24} />
                                </div>
                                <PhoneInput
                                    placeholder="Enter phone number"
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



                            </div>
                        </div>
                    </div>

                </div>


            </div>
            <div className="grid grid-cols-1 gap-6 mt-8 md:grid-cols-2">
                {/* Address */}
                <div className="bg-[#101828] shadow-md p-5 rounded-lg flex items-center gap-4 border-l-6 border-blue-500">
                    <div className="p-2 bg-blue-100 rounded-full">
                        <IconMapPin className="text-blue-500" size={24} />
                    </div>
                    <div>
                        <h4 className="text-lg font-semibold text-white">Head Office</h4>
                        <p className="text-gray-100">The Vion, PKB 54, Sector 122, Noida 201307</p>
                    </div>
                </div>

                <div className="bg-[#101828] shadow-md p-5 rounded-lg flex items-center gap-4 border-l-6 border-green-500">
                    <div className="p-2 bg-green-100 rounded-full">
                        <IconMapPin className="text-green-500" size={24} />
                    </div>
                    <div>
                        <h4 className="text-lg font-semibold text-white">Branch Office</h4>
                        <p className="text-gray-100">SCO 29, Sector 18, Gurugram, Haryana 122001</p>
                    </div>
                </div>

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


        </div>
    );
};

export default Contact;
