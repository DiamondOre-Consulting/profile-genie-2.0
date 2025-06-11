import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { portfolioResponse } from "@/validations/PortfolioValidation";
import { RadioGroup, RadioGroupItem } from "@radix-ui/react-radio-group";
import { RiStarFill } from "@remixicon/react";
import { FaLink } from "react-icons/fa";
import { SparklesText } from "@/components/ui/sparkles-text";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { IconX } from "@tabler/icons-react";

gsap.registerPlugin(ScrollTrigger);

const Testimonials = ({
  portfolioData,
}: {
  portfolioData: portfolioResponse;
}) => {
  const [activeTestimonial, setActiveTestimonial] = useState<
    | (typeof portfolioData.contactData.testimonial.testimonialList)[number]
    | null
  >(null);

  return (
    <div className="flex flex-col max-w-screen-xl gap-10 px-4 pt-20 mx-auto">
      <AnimatePresence>
        {activeTestimonial && (
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
                onClick={() => setActiveTestimonial(null)}
                className="absolute flex items-center justify-center bg-red-100 rounded-md shadow-lg cursor-pointer z-1 w-9 h-9 top-1 right-1"
              >
                <IconX className="w-6 h-6 text-red-500" />
              </div>
              <ul role="list" className="flex flex-col gap-y-6 sm:gap-y-8">
                <li>
                  <figure className="relative p-6 pt-10 border shadow-xl bg-slate-50 border-slate-200 rounded-2xl shadow-slate-900/10">
                    <svg
                      aria-hidden="true"
                      width="105"
                      height="78"
                      className="absolute left-6 top-6 fill-slate-100"
                    >
                      <path d="M25.086 77.292c-4.821 0-9.115-1.205-12.882-3.616-3.767-2.561-6.78-6.102-9.04-10.622C1.054 58.534 0 53.411 0 47.686c0-5.273.904-10.396 2.712-15.368 1.959-4.972 4.746-9.567 8.362-13.786a59.042 59.042 0 0 1 12.43-11.3C28.325 3.917 33.599 1.507 39.324 0l11.074 13.786c-6.479 2.561-11.677 5.951-15.594 10.17-3.767 4.219-5.65 7.835-5.65 10.848 0 1.356.377 2.863 1.13 4.52.904 1.507 2.637 3.089 5.198 4.746 3.767 2.41 6.328 4.972 7.684 7.684 1.507 2.561 2.26 5.5 2.26 8.814 0 5.123-1.959 9.19-5.876 12.204-3.767 3.013-8.588 4.52-14.464 4.52Zm54.24 0c-4.821 0-9.115-1.205-12.882-3.616-3.767-2.561-6.78-6.102-9.04-10.622-2.11-4.52-3.164-9.643-3.164-15.368 0-5.273.904-10.396 2.712-15.368 1.959-4.972 4.746-9.567 8.362-13.786a59.042 59.042 0 0 1 12.43-11.3C82.565 3.917 87.839 1.507 93.564 0l11.074 13.786c-6.479 2.561-11.677 5.951-15.594 10.17-3.767 4.219-5.65 7.835-5.65 10.848 0 1.356.377 2.863 1.13 4.52.904 1.507 2.637 3.089 5.198 4.746 3.767 2.41 6.328 4.972 7.684 7.684 1.507 2.561 2.26 5.5 2.26 8.814 0 5.123-1.959 9.19-5.876 12.204-3.767 3.013-8.588 4.52-14.464 4.52Z"></path>
                    </svg>
                    <blockquote className="relative">
                      <p
                        className="tracking-tight text-slate-900"
                        dangerouslySetInnerHTML={{
                          __html: activeTestimonial?.detail,
                        }}
                      ></p>
                    </blockquote>
                    <figcaption className="relative flex items-center justify-between pt-6 mt-6 border-t border-slate-100">
                      <div>
                        <div
                          className="text-base font-bold font-display text-slate-900"
                          dangerouslySetInnerHTML={{
                            __html: activeTestimonial?.name,
                          }}
                        ></div>
                      </div>
                    </figcaption>
                    <fieldset className="space-y-4">
                      <RadioGroup className="inline-flex gap-0">
                        {["1", "2", "3", "4", "5"].map((value) => (
                          <label
                            key={value}
                            className="group text-neutral-400 focus-within:border-ring focus-within:ring-ring/50 relative cursor-pointer rounded p-0.5 outline-none focus-within:ring-[3px]"
                          >
                            <RadioGroupItem value={value} className="sr-only" />
                            <RiStarFill
                              size={24}
                              className={`transition-all ${
                                activeTestimonial?.star >= parseInt(value)
                                  ? "text-amber-500"
                                  : "text-input"
                              } group-hover:scale-110`}
                            />
                            <span className="sr-only">
                              {value} star{value === "1" ? "" : "s"}
                            </span>
                          </label>
                        ))}
                      </RadioGroup>
                    </fieldset>
                  </figure>
                </li>
              </ul>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {portfolioData?.contactData?.testimonial?.tagline &&
        portfolioData?.contactData?.testimonial?.testimonialList?.length >
          0 && (
          <div>
            <section
              id="testimonials"
              aria-label="What our customers are saying"
              className="py-20 sm:py-32"
            >
              <div className="px-4 mx-auto sm:px-6 lg:px-8">
                <div className="mx-auto text-center md:text-left">
                  <h2 className="text-3xl font-bold tracking-tight text-center uppercase font-display text-slate-900 sm:text-5xl ">
                    <SparklesText
                      sparklesCount={3}
                      text={
                        portfolioData?.contactData?.testimonial?.tagline ||
                        "Testimonial"
                      }
                    />
                  </h2>
                </div>
                <ul
                  role="list"
                  className="grid max-w-2xl grid-cols-1 gap-6 mx-auto mt-8 sm:gap-8 lg:mt-10 lg:max-w-none lg:grid-cols-3"
                >
                  {portfolioData?.contactData?.testimonial?.testimonialList?.map(
                    (testimonial, index) => (
                      <li key={index}>
                        <ul
                          role="list"
                          className="flex flex-col gap-y-6 sm:gap-y-8"
                        >
                          <li>
                            <figure className="relative p-6 border shadow-xl bg-slate-50 border-slate-200 rounded-2xl shadow-slate-900/10">
                              <svg
                                aria-hidden="true"
                                width="105"
                                height="78"
                                className="absolute left-6 top-6 fill-slate-100"
                              >
                                <path d="M25.086 77.292c-4.821 0-9.115-1.205-12.882-3.616-3.767-2.561-6.78-6.102-9.04-10.622C1.054 58.534 0 53.411 0 47.686c0-5.273.904-10.396 2.712-15.368 1.959-4.972 4.746-9.567 8.362-13.786a59.042 59.042 0 0 1 12.43-11.3C28.325 3.917 33.599 1.507 39.324 0l11.074 13.786c-6.479 2.561-11.677 5.951-15.594 10.17-3.767 4.219-5.65 7.835-5.65 10.848 0 1.356.377 2.863 1.13 4.52.904 1.507 2.637 3.089 5.198 4.746 3.767 2.41 6.328 4.972 7.684 7.684 1.507 2.561 2.26 5.5 2.26 8.814 0 5.123-1.959 9.19-5.876 12.204-3.767 3.013-8.588 4.52-14.464 4.52Zm54.24 0c-4.821 0-9.115-1.205-12.882-3.616-3.767-2.561-6.78-6.102-9.04-10.622-2.11-4.52-3.164-9.643-3.164-15.368 0-5.273.904-10.396 2.712-15.368 1.959-4.972 4.746-9.567 8.362-13.786a59.042 59.042 0 0 1 12.43-11.3C82.565 3.917 87.839 1.507 93.564 0l11.074 13.786c-6.479 2.561-11.677 5.951-15.594 10.17-3.767 4.219-5.65 7.835-5.65 10.848 0 1.356.377 2.863 1.13 4.52.904 1.507 2.637 3.089 5.198 4.746 3.767 2.41 6.328 4.972 7.684 7.684 1.507 2.561 2.26 5.5 2.26 8.814 0 5.123-1.959 9.19-5.876 12.204-3.767 3.013-8.588 4.52-14.464 4.52Z"></path>
                              </svg>
                              <blockquote className="relative">
                                <p
                                  className="tracking-tight line-clamp-5 text-slate-900"
                                  dangerouslySetInnerHTML={{
                                    __html: testimonial?.detail,
                                  }}
                                ></p>
                                <button
                                  onClick={() =>
                                    setActiveTestimonial(testimonial)
                                  }
                                  className="text-[#2EAAC1] text-sm cursor-pointer"
                                >
                                  Read more
                                </button>
                              </blockquote>
                              <figcaption className="relative flex items-center justify-between pt-6 mt-6 border-t border-slate-100">
                                <div>
                                  <div
                                    className="text-base font-bold font-display text-slate-900"
                                    dangerouslySetInnerHTML={{
                                      __html: testimonial?.name,
                                    }}
                                  ></div>
                                </div>
                              </figcaption>
                              <fieldset className="space-y-4">
                                <RadioGroup className="inline-flex gap-0">
                                  {["1", "2", "3", "4", "5"].map((value) => (
                                    <label
                                      key={value}
                                      className="group text-neutral-400 focus-within:border-ring focus-within:ring-ring/50 relative cursor-pointer rounded p-0.5 outline-none focus-within:ring-[3px]"
                                    >
                                      <RadioGroupItem
                                        value={value}
                                        className="sr-only"
                                      />
                                      <RiStarFill
                                        size={24}
                                        className={`transition-all ${
                                          testimonial?.star >= parseInt(value)
                                            ? "text-amber-500"
                                            : "text-input"
                                        } group-hover:scale-110`}
                                      />
                                      <span className="sr-only">
                                        {value} star{value === "1" ? "" : "s"}
                                      </span>
                                    </label>
                                  ))}
                                </RadioGroup>
                              </fieldset>
                            </figure>
                          </li>
                        </ul>
                      </li>
                    )
                  )}
                </ul>
              </div>
            </section>
          </div>
        )}

      {portfolioData?.otherDetails?.bulkLink?.bulkLinkList &&
        portfolioData?.otherDetails?.bulkLink?.bulkLinkList.length > 0 &&
        portfolioData?.otherDetails?.bulkLink?.bulkLinkList[0]?.link !== "" && (
          <div className="">
            <h2 className="my-8 text-center ">
              <SparklesText
                sparklesCount={3}
                text={
                  portfolioData?.otherDetails?.bulkLink?.tagline ||
                  "Useful Links"
                }
              />
            </h2>

            <div
              className={`grid ${
                portfolioData?.otherDetails?.bulkLink?.bulkLinkList.length %
                  2 ===
                0
                  ? "grid-cols-1 md:grid-cols-3"
                  : "grid-cols-1 md:grid-cols-3"
              } w-fit mx-auto place-items-start   gap-y-6 gap-x-6  `}
            >
              {portfolioData?.otherDetails?.bulkLink?.bulkLinkList.map(
                (link, index) => {
                  return (
                    <a
                      key={link?.uniqueId || index}
                      href={link?.link}
                      target="_black"
                      className=""
                    >
                      <div className="flex items-center">
                        <div className="flex-shrink-0 border border-gray-300 rounded-md shadow-md">
                          {link?.image?.url ? (
                            <img
                              src={link?.image?.url}
                              alt={link?.linkName}
                              className="object-cover rounded-md size-12 min-w-12 min-h-12"
                            />
                          ) : (
                            <div
                              className="flex items-center justify-center  w-12 h-12 text-white  bg-[#2EAAC1] rounded-md"
                              // style={{ backgroundColor: buttonBgColor }}
                            >
                              <FaLink />
                            </div>
                          )}
                        </div>

                        <div className="ml-4">
                          <dt
                            className="font-medium leading-6 text-md"
                            // style={{ color: primaryTextColor }}
                          >
                            {link?.linkName}
                          </dt>
                        </div>
                      </div>
                    </a>
                  );
                }
              )}
            </div>
          </div>
        )}
    </div>
  );
};

export default Testimonials;
