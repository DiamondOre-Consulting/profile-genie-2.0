import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { portfolioResponse } from "@/validations/PortfolioValidation";
import { IconX } from "@tabler/icons-react";
import { AnimatePresence, motion } from "framer-motion";

gsap.registerPlugin(ScrollTrigger);

interface Gallery {
  image?: {
    url?: string;
  };
  brandName?: string;
}

const AboutmeBrands = ({
  portfolioData,
}: {
  portfolioData: portfolioResponse;
}) => {
  const brandsRef = useRef([]);

  const [activeGallery, setActiveGallery] = useState<Gallery | null>(null);

  useEffect(() => {
    brandsRef.current.forEach((el, index) => {
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
    });
  }, []);

  return (
    <div>
      <AnimatePresence>
        {activeGallery && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/60"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <motion.div
              data-aos="flip-left"
              data-aos-duration="1000"
              className="w-[96vw] max-w-[27rem] relative  max-h-[90vh] bg-white rounded-lg shadow-xl overflow-hidden"
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
                onClick={() => setActiveGallery(null)}
                className="absolute flex items-center justify-center bg-red-100 rounded-md shadow-lg cursor-pointer z-1 w-9 h-9 top-1 right-1"
              >
                <IconX className="w-6 h-6 text-red-500" />
              </div>
              <div className="flex flex-col h-full ">
                <div className="sticky top-0 flex-shrink-0 w-full  md:w-[27rem]">
                  <img
                    src={activeGallery?.image?.url}
                    alt={activeGallery?.brandName}
                    className="w-full h-[15rem] md:h-[23rem] object-cover"
                  />
                </div>
                <div
                  className="flex-1 p-4 overflow-y-auto "
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

                  <p
                    dangerouslySetInnerHTML={{
                      __html: activeGallery?.brandName || "",
                    }}
                  ></p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {portfolioData?.otherDetails?.brands?.brandList && (
        <div className="max-w-[75rem] mx-auto  ">
          <div className="flex flex-wrap items-start justify-center gap-8 text-gray-500 ">
            {portfolioData?.otherDetails?.brands?.brandList?.map(
              (brand, index) => (
                <a key={index} className="flex items-center justify-center">
                  <div className="flex flex-col items-center w-40 sm:w-52">
                    <img
                      className="object-cover w-40 h-40 bg-gray-200 rounded-md hover:text-gray-900 sm:w-52"
                      src={brand?.image?.url}
                    />

                    <p
                      className="mt-2 text-center text-gray-900 line-clamp-1"
                      dangerouslySetInnerHTML={{
                        __html: brand?.brandName as string,
                      }}
                    ></p>
                    <button
                      onClick={() => setActiveGallery(brand)}
                      className="text-sm text-[#2EAAC1] cursor-pointer"
                    >
                      Read more
                    </button>
                  </div>
                </a>
              )
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AboutmeBrands;
