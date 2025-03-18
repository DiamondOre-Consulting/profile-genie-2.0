import { Mail, MapPin } from "lucide-react";
import { Link } from "react-router-dom";

const Contact = () => {
    return (
        <section className="pt-20">
            <div className="container text-white max-w-[82rem] mx-auto px-4">
                <div className="mb-10 flex flex-col items-center">
                    <span className="text-sm font-semibold">Reach Us</span>
                    <h1 className="mb-3 mt-1 text-balance text-3xl font-semibold md:text-4xl">
                        Speak with Our Friendly Team
                    </h1>
                    <p className="text-lg text-muted-foreground">
                        We&apos;d love to assist you. Fill out the form or drop us an email.
                    </p>
                </div>
                <div className="grid  md:grid-cols-3">
                    <div
                        className={
                            "flex flex-col border py-10 bg-[#010102] group/feature border-neutral-800  transition-all duration-500  h-full w-full hover:bg-gradient-to-t hover:from-[#6738e7]/80 via-[#4826A7]/20  to-transparent "}
                    >

                        <div className="mb-4 relative z-10 px-10 text-neutral-400">
                            <MapPin />
                        </div>
                        <div className="text-lg font-bold mb-2 relative z-10 px-10">
                            <div className="absolute left-0 inset-y-0 h-6 group-hover/feature:h-8 w-1 rounded-tr-full rounded-br-full bg-neutral-700 group-hover/feature:bg-[#6E3DEF] transition-all duration-200 origin-center" />
                            <span className="group-hover/feature:translate-x-2 transition duration-200 inline-block text-neutral-100">
                                Visit Us
                            </span>
                        </div>
                        <p className="text-sm text-neutral-300 max-w-xs relative z-10 px-10">
                            Drop by our office for a chat.
                        </p>
                        <Link to="" className="px-10 font-semibold hover:underline">
                            1234 Street Name, City Name
                        </Link>
                    </div>
                    <div
                        className={
                            "flex flex-col border py-10 bg-[#010102] group/feature border-neutral-800  transition-all duration-500  h-full w-full hover:bg-gradient-to-t hover:from-[#6738e7]/80 via-[#4826A7]/20  to-transparent "}
                    >

                        <div className="mb-4 relative z-10 px-10 text-neutral-400">
                            <Mail />
                        </div>
                        <div className="text-lg font-bold mb-2 relative z-10 px-10">
                            <div className="absolute left-0 inset-y-0 h-6 group-hover/feature:h-8 w-1 rounded-tr-full rounded-br-full bg-neutral-700 group-hover/feature:bg-[#6E3DEF] transition-all duration-200 origin-center" />
                            <span className="group-hover/feature:translate-x-2 transition duration-200 inline-block text-neutral-100">
                                Call Us
                            </span>
                        </div>
                        <p className="text-sm text-neutral-300 max-w-xs relative z-10 px-10">
                            We&apos;re available Mon-Fri, 9am-5pm.
                        </p>
                        <Link to="" className="px-10 font-semibold hover:underline">
                            +123 456 7890
                        </Link>
                    </div> <div
                        className={
                            "flex flex-col border py-10 bg-[#010102] group/feature border-neutral-800  transition-all duration-500  h-full w-full hover:bg-gradient-to-t hover:from-[#6738e7]/80 via-[#4826A7]/20  to-transparent "}
                    >

                        <div className="mb-4 relative z-10 px-10 text-neutral-400">
                            <Mail />
                        </div>
                        <div className="text-lg font-bold mb-2 relative z-10 px-10">
                            <div className="absolute left-0 inset-y-0 h-6 group-hover/feature:h-8 w-1 rounded-tr-full rounded-br-full bg-neutral-700 group-hover/feature:bg-[#6E3DEF] transition-all duration-200 origin-center" />
                            <span className="group-hover/feature:translate-x-2 transition duration-200 inline-block text-neutral-100">
                                Email Us
                            </span>
                        </div>
                        <p className="text-sm text-neutral-300 max-w-xs relative z-10 px-10">
                            Our team is ready to assist.
                        </p>
                        <Link to="" className="px-10 font-semibold hover:underline">
                            abc@example.com
                        </Link>
                    </div>
                </div>
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3502.40921070659!2d77.37797097550026!3d28.617495275673047!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cef068957c2f1%3A0xe72309664887757f!2sDiamond%20Ore%20Consulting%20Pvt.%20Ltd.!5e0!3m2!1sen!2sin!4v1741849131026!5m2!1sen!2sin&theme=dark" loading="lazy" className="w-full h-[15rem]"></iframe>
            </div>
        </section>
    );
};

export default Contact;
