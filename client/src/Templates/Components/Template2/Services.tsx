import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { portfolioResponse } from "@/validations/PortfolioValidation";
import { IconX } from "@tabler/icons-react";
import { AnimatePresence, motion } from "framer-motion";
import { SparklesText } from "@/components/ui/sparkles-text";

gsap.registerPlugin(ScrollTrigger);

interface Service {
  title?: string;
  detail?: string;
  image?: {
    url?: string;
  };
}

const Services = ({ portfolioData }: { portfolioData: portfolioResponse }) => {
  const servicesRef = useRef<(HTMLDivElement | null)[]>([]);

  const [activeService, setActiveService] = useState<Service | null>(null);

  useEffect(() => {
    servicesRef.current.forEach((el, index) => {
      if (el) {
        gsap.fromTo(
          el,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            scrollTrigger: {
              trigger: el,
              start: "top 80%",
              end: "top 30%",
              toggleActions: "play none none reverse",
            },
            delay: index * 0.2,
            duration: 1,
          }
        );
      }
    });
  }, []);

  return (
    <>
      <AnimatePresence>
        {activeService && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/60"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <motion.div
          data-aos="flip-left" data-aos-duration="1000"

              className="w-[96vw] max-w-[30rem] md:max-w-[62rem] relative  max-h-[90vh] bg-white rounded-lg shadow-xl overflow-hidden"
              initial={{ scale: 0.85, opacity: 0, y: 40 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.85, opacity: 0, y: 40 }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 30,
                duration: 0.35,
              }}
              onWheel={(e) => e.stopPropagation()}
            >
              <div
                onClick={() => setActiveService(null)}
                className="absolute flex items-center justify-center bg-red-100 rounded-md shadow-lg cursor-pointer z-1 w-9 h-9 top-1 right-1"
              >
                <IconX className="w-6 h-6 text-red-500" />
              </div>
              <div className="flex flex-col h-full md:flex-row lg:gap-4">
                <div className="sticky top-0 flex-shrink-0 w-full h-[15rem] md:w-[45%] lg:w-[27rem] md:h-[23rem]">
                  <img
                    src={activeService.image?.url}
                    alt={activeService.title}
                    className="w-full h-[15rem] md:h-[23rem] object-cover"
                  />
                </div>
                <div
                  className="flex-1 p-4 overflow-y-auto md:py-10 md:pr-8 lg:pr-15"
                  style={{
                    maxHeight: "23rem",
                    msOverflowStyle: "none",
                  }}
                  onWheel={(e) => e.stopPropagation()}
                >
                  <style>
                    {`
                            .no-scrollbar::-webkit-scrollbar {
                            display: none;
                            }
                        `}
                  </style>
                  <h2 className="mb-4 text-2xl font-bold md:text-3xl">
                    {activeService.title}
                  </h2>
                  <p
                    dangerouslySetInnerHTML={{
                      __html: activeService.detail || "",
                    }}
                  ></p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {portfolioData?.otherDetails?.services?.serviceList &&
        portfolioData?.otherDetails?.services?.serviceList?.length > 0 && (
          <div
            className="w-full max-w-screen-xl px-4 pt-6 mx-auto md:px-10"
            id="service"
          >
            <h2 data-aos="flip-left" data-aos-duration="1000" className="my-8 text-center ">
              <SparklesText
                sparklesCount={3}
                text={
                  portfolioData?.otherDetails?.services?.tagline ||
                  "Our Services"
                }
              />
            </h2>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {portfolioData?.otherDetails?.services?.serviceList?.map(
                (service, index) => (
                  <div
                    key={index}
                    ref={(el) => {
                      if (el) servicesRef.current[index] = el;
                    }}
                    className="flex flex-col justify-between h-full overflow-hidden transition-shadow duration-300 border border-gray-300 rounded-lg shadow-md hover:shadow-lg"
                  >
                    <img
                      src={service?.image?.url}
                      alt={service?.title}
                      className="aspect-[4/2.3] w-full object-cover"
                    />
                    <div className="flex flex-col items-start justify-between h-full px-4 py-2">
                      <h2 className="text-xl font-bold md:text-2xl line-clamp-2">
                        {service?.title || ""}
                      </h2>
                      <p
                        className="text-sm md:text-base line-clamp-4"
                        dangerouslySetInnerHTML={{
                          __html: service?.detail || "",
                        }}
                      ></p>
                    </div>
                    <button
                      onClick={() => setActiveService(service)}
                      className="bg-[#0891B2] m-3 mt-2  p-2 text-white font-semibold cursor-pointer rounded"
                    >
                      Learn More
                    </button>
                  </div>
                )
              )}
            </div>
          </div>
        )}
    </>
  );
};

export default Services;
