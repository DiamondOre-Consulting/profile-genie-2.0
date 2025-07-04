import { SparklesCore } from "./ui/sparkles";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { ButtonColorful } from "./ui/button-colorful";
import { AnimatedTooltip } from "./ui/animated-tooltip";
import { Link } from "react-scroll";

const people = [
  {
    id: 1,
    name: "Ruksha Razdan",
    designation: "Business Development",
    link: "https://www.profilegenie.in/profile/1/R2R3",
    image:
      "https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3387&q=80",
  },
  {
    id: 2,
    name: "Robert Johnson",
    designation: "Product Manager",
    link: "https://www.profilegenie.in/profile/1/R2R3",
    image:
      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YXZhdGFyfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
  },
  {
    id: 3,
    name: "Jane Smith",
    designation: "Data Scientist",
    link: "https://www.profilegenie.in/profile/1/R2R3",
    image:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8YXZhdGFyfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
  },
  {
    id: 4,
    name: "Emily Davis",
    designation: "UX Designer",
    link: "https://www.profilegenie.in/profile/1/R2R3",
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGF2YXRhcnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
  },
  {
    id: 5,
    name: "Tyler Durden",
    designation: "Soap Developer",
    link: "https://www.profilegenie.in/profile/1/R2R3",
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3540&q=80",
  },
  {
    id: 6,
    name: "Dora",
    designation: "The Explorer",
    link: "https://www.profilegenie.in/profile/1/R2R3",
    image:
      "https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3534&q=80",
  },
];

const fadeUpVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 1,
      delay: 0.5 + i * 0.2,
      ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number], // 👈 Fix ease typing
    },
  }),
};

const Hero = () => {
  return (
    <div className=" mx-auto text-white pt-40 pb-42 w-[97.5%] h-full relative overflow-hidden">
      <div className=" p-1 mx-auto  w-full  px-2 md:max-w-[50rem] text-center">
        <motion.div
          custom={1}
          variants={fadeUpVariants}
          initial="hidden"
          animate="visible"
        >
          <h1 className="mb-6 text-3xl font-bold tracking-tight sm:text-5xl md:text-6xl md:mb-8">
            <span className="inline-block pb-2 text-transparent bg-clip-text lg:pb-3 bg-gradient-to-b from-white to-white/70">
              Ditch the Paper
            </span>
            <br />
            <span
              className={cn(
                "bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-white/90 to-yellow-200 "
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
            Profile Genie – Your all-in-one digital identity, seamlessly
            shareable with a single click for smarter, paperless networking and
            connections.
          </p>
        </motion.div>

        <div className="relative space-x-3 z-100">
          <a href="https://profilegenie.store" target="_blank">
            <ButtonColorful label="Get Your Smart Card !" />
          </a>
          <Link to="contact" smooth={true} duration={500}>
            <ButtonColorful className="bg-[#5E10DE]" label="Contact Us" />
          </Link>
        </div>
        <div className="relative flex flex-row items-center justify-center w-full mt-10 z-100">
          <AnimatedTooltip items={people} />
        </div>
      </div>
      {/* <ShootingStars /> */}
      <SparklesCore particleColor="#6C3AEF" />
    </div>
  );
};

export default Hero;
