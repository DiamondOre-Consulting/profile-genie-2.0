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
        <div className=" bg-white p-2 sm:p-6 md:p-16">
            <div style={{ backgroundColor: lightenColor(bgColor, 0.85) }} className="flex flex-col items-center  shadow-md rounded-lg mt-8 p-1.5 ">
                <div className="flex shadow-md items-center flex-col sm:flex-row w-full  mx-auto">
                    <div className="w-full h-70">
                        {(contact?.mapLink) &&
                            <iframe src={getMapSrc(contact?.mapLink)} loading="lazy" className="w-full h-full sm:rounded-tr-none sm:rounded-l-md rounded-t-md "></iframe>
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
