import {
    IconMapPin,
    IconPhone,
    IconMail,
    IconBrandWhatsapp,
    IconDownload,
    IconBrandLinkedin,
    IconBrandGoogle,
    IconBrandInstagram,
    IconBrandYoutube
} from "@tabler/icons-react";

const Contact: React.FC = () => {
    return (
        <div className="bg-gray-100 relative z-20 py-10 px-6 md:px-16">
            {/* Google Map */}
            <div className="w-full h-64">
                <iframe
                    title="Google Maps"
                    className="w-full h-full rounded-lg shadow-md"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14014.249050812883!2d77.35272185!3d28.5864514!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce567fdfcc2fb%3A0xa2fc39f8c6c92c91!2sSector%20122%2C%20Noida%2C%20Uttar%20Pradesh!5e0!3m2!1sen!2sin!4v1710000000000"
                    loading="lazy"
                ></iframe>
            </div>

            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Address */}
                <div className="bg-[#101828] shadow-md p-5 rounded-lg flex items-center gap-4 border-l-4 border-blue-500">
                    <div className="bg-blue-100 p-3 rounded-full">
                        <IconMapPin className="text-blue-500" size={28} />
                    </div>
                    <div>
                        <h4 className="font-semibold text-lg text-white">Head Office</h4>
                        <p className="text-gray-100">The Vion, PKB 54, Sector 122, Noida 201307</p>
                    </div>
                </div>

                <div className="bg-[#101828] shadow-md p-5 rounded-lg flex items-center gap-4 border-l-4 border-green-500">
                    <div className="bg-green-100 p-3 rounded-full">
                        <IconMapPin className="text-green-500" size={28} />
                    </div>
                    <div>
                        <h4 className="font-semibold text-lg text-white">Branch Office</h4>
                        <p className="text-gray-100">SCO 29, Sector 18, Gurugram, Haryana 122001</p>
                    </div>
                </div>

                {/* Phone Numbers */}
                <div className="bg-[#101828] shadow-md p-5 rounded-lg flex items-center gap-4 border-l-4 border-red-500">
                    <div className="bg-red-100 p-3 rounded-full">
                        <IconPhone className="text-red-500" size={28} />
                    </div>
                    <div>
                        <p className="text-gray-100">+91 9717017366</p>
                        <p className="text-gray-100">+91 9717017366</p>
                    </div>
                </div>



                {/* Emails */}
                <div className="bg-[#101828] shadow-md p-5 rounded-lg flex items-center gap-4 border-l-4 border-yellow-500">
                    <div className="bg-yellow-100 p-3 rounded-full">
                        <IconMail className="text-yellow-500" size={28} />
                    </div>
                    <div>
                        <p className="text-gray-100">connect@vion.co.in</p>
                        <p className="text-gray-100">connect@vion.co.in</p>
                    </div>
                </div>


            </div>

            {/* Share Portfolio */}
            <div className="mt-8 flex flex-col md:flex-row items-center gap-4">
                <input
                    type="text"
                    placeholder="Enter WhatsApp number"
                    className="w-full md:w-1/3 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
                <button className="bg-blue-500 text-white px-6 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-600">
                    <IconBrandWhatsapp size={20} /> Send
                </button>
            </div>

            {/* Action Buttons */}
            <div className="mt-6 flex flex-wrap justify-center md:justify-start gap-4">
                <button className="bg-blue-500 text-white px-6 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-600">
                    <IconPhone size={20} /> Save Contact
                </button>
                <button className="bg-blue-500 text-white px-6 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-600">
                    <IconDownload size={20} /> Download Brochure
                </button>
            </div>

            {/* Social Media Icons */}
            <div className="mt-6 flex justify-center gap-4 text-2xl text-gray-600">
                <IconBrandLinkedin className="hover:text-blue-700 cursor-pointer" size={28} />
                <IconBrandGoogle className="hover:text-red-500 cursor-pointer" size={28} />
                <IconBrandInstagram className="hover:text-pink-500 cursor-pointer" size={28} />
                <IconBrandYoutube className="hover:text-red-600 cursor-pointer" size={28} />
            </div>

            {/* Footer */}
            <div className="mt-8 text-center text-gray-600">
                Designed and Developed by{" "}
                <a href="https://profilegenie.in" className="text-blue-500 font-semibold hover:underline">
                    profilegenie.in
                </a>
                <p>Contact us on +91 8750316743</p>
            </div>
        </div>
    );
};

export default Contact;
