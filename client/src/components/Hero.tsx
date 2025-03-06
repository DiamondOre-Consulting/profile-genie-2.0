
import { SparklesCore } from './ui/sparkles';
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils';
import { ButtonColorful } from './ui/button-colorful';

// const people = [
//     {
//         id: 1,
//         name: "Github",
//         designation: "webakash1806",
//         link: "https://github.com/webakash1806",
//         image:
//             "https://images.unsplash.com/photo-1647166545674-ce28ce93bdca?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//     },
//     {
//         id: 2,
//         name: "Instagram",
//         designation: "__its_akash.18",
//         link: "https://www.instagram.com/__its_akash.18/",
//         image:
//             "https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGRvd25sb2FkJTIwaWNvbnxlbnwwfHwwfHx8MA%3D%3D",
//     },
//     {
//         id: 3,
//         name: "Whatsapp",
//         designation: "+91 6207234759",
//         link: "https://wa.me/916207234759",
//         image:
//             "https://images.unsplash.com/photo-1661862649743-2799867c32b0?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8d2hhdHNhcHAlMjBsb2dvfGVufDB8fDB8fHww",
//     },
//     {
//         id: 4,
//         name: "Linkedin",
//         designation: "itsakash18",
//         link: "https://www.linkedin.com/in/itsakash18/",
//         image:
//             "https://images.unsplash.com/photo-1611944212129-29977ae1398c?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//     },
//     {
//         id: 5,
//         name: "CV",
//         designation: "Download CV",
//         link: "",
//         image:
//             "https://cdn-icons-png.freepik.com/256/10118/10118795.png?uid=R55011592&ga=GA1.1.774467265.1732693696",
//     },
// ];

const fadeUpVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: {
            duration: 1,
            delay: 0.5 + i * 0.2,
            ease: [0.25, 0.4, 0.25, 1],
        },
    }),
};

const Hero = () => {
    return (
        <div className=' mx-auto text-white pt-50 pb-42 w-[97.5%] h-full relative overflow-hidden'>
            <div className=' p-1 mx-auto  w-full max-w-[30rem] px-2 lg:max-w-[50rem] text-center'>
                <motion.div
                    custom={1}
                    variants={fadeUpVariants}
                    initial="hidden"
                    animate="visible"
                >
                    <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold mb-6 md:mb-8 tracking-tight">
                        <span className="bg-clip-text inline-block mb-2 lg:mb-3 text-transparent bg-gradient-to-b from-white to-white/70">
                            Ditch the Paper
                        </span>
                        <br />
                        <span
                            className={cn(
                                "bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 via-white/90 to-rose-300 "
                            )}
                        >
                            Elevate Your Networking!
                        </span>
                    </h1>
                </motion.div>

                <motion.div
                    custom={2}
                    variants={fadeUpVariants}
                    initial="hidden"
                    animate="visible"
                >
                    <p className="text-base sm:text-md md:text-[1.05rem] text-white/70 mb-8  font-light tracking-wide max-w-xl mx-auto px-4">
                        "Profile Genie – Your all-in-one digital identity, seamlessly shareable with a single click for smarter, paperless networking and connections.
                    </p>
                </motion.div>

                <div className='relative z-100 space-x-3'>
                    <ButtonColorful label='Get Demo!' />
                    <ButtonColorful className='bg-[#5E10DE]' label='Contact Us' />
                </div>
            </div>
            {/* <ShootingStars /> */}
            <SparklesCore particleColor='#6C3AEF' />
        </div >
    )
}

export default Hero
