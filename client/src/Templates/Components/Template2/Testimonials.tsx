import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import LinkButtonComponent2 from "./LinkButtonComponent2";
import { portfolioResponse } from "@/validations/PortfolioValidation";
import { RadioGroup, RadioGroupItem } from "@radix-ui/react-radio-group";
import { RiStarFill } from "@remixicon/react";



gsap.registerPlugin(ScrollTrigger);

const Testimonials = ({ portfolioData }: { portfolioData: portfolioResponse }) => {
  const testimonialsRef = useRef([]);

  useEffect(() => {
    testimonialsRef.current.forEach((el, index) => {
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
    <>
      {portfolioData?.contactData?.testimonial && portfolioData?.contactData?.testimonial?.testimonialList?.length > 0 && (
        <div>
          <section
            id="testimonials"
            aria-label="What our customers are saying"
            className="py-20 sm:py-32"
          >
            <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
              <div className="mx-auto text-center md:text-leftr">
                <h2 className="text-3xl font-bold tracking-tight uppercase font-display text-slate-900 sm:text-5xl ">
                  Testimonials
                </h2>
              </div>
              <ul
                role="list"
                className="grid max-w-2xl grid-cols-1 gap-6 mx-auto mt-16 sm:gap-8 lg:mt-20 lg:max-w-none lg:grid-cols-3"
              >
                {portfolioData?.contactData?.testimonial?.testimonialList?.map((testimonial, index) => (
                  <li
                    key={index}
                  >
                    <ul
                      role="list"
                      className="flex flex-col gap-y-6 sm:gap-y-8"
                    >
                      <li>
                        <figure className="relative p-6 bg-white shadow-xl rounded-2xl shadow-slate-900/10">
                          <svg
                            aria-hidden="true"
                            width="105"
                            height="78"
                            className="absolute left-6 top-6 fill-slate-100"
                          >
                            <path d="M25.086 77.292c-4.821 0-9.115-1.205-12.882-3.616-3.767-2.561-6.78-6.102-9.04-10.622C1.054 58.534 0 53.411 0 47.686c0-5.273.904-10.396 2.712-15.368 1.959-4.972 4.746-9.567 8.362-13.786a59.042 59.042 0 0 1 12.43-11.3C28.325 3.917 33.599 1.507 39.324 0l11.074 13.786c-6.479 2.561-11.677 5.951-15.594 10.17-3.767 4.219-5.65 7.835-5.65 10.848 0 1.356.377 2.863 1.13 4.52.904 1.507 2.637 3.089 5.198 4.746 3.767 2.41 6.328 4.972 7.684 7.684 1.507 2.561 2.26 5.5 2.26 8.814 0 5.123-1.959 9.19-5.876 12.204-3.767 3.013-8.588 4.52-14.464 4.52Zm54.24 0c-4.821 0-9.115-1.205-12.882-3.616-3.767-2.561-6.78-6.102-9.04-10.622-2.11-4.52-3.164-9.643-3.164-15.368 0-5.273.904-10.396 2.712-15.368 1.959-4.972 4.746-9.567 8.362-13.786a59.042 59.042 0 0 1 12.43-11.3C82.565 3.917 87.839 1.507 93.564 0l11.074 13.786c-6.479 2.561-11.677 5.951-15.594 10.17-3.767 4.219-5.65 7.835-5.65 10.848 0 1.356.377 2.863 1.13 4.52.904 1.507 2.637 3.089 5.198 4.746 3.767 2.41 6.328 4.972 7.684 7.684 1.507 2.561 2.26 5.5 2.26 8.814 0 5.123-1.959 9.19-5.876 12.204-3.767 3.013-8.588 4.52-14.464 4.52Z"></path>
                          </svg>
                          <blockquote className="relative">
                            <p className="text-lg tracking-tight text-slate-900" dangerouslySetInnerHTML={{ __html: testimonial?.detail }} ></p>

                          </blockquote>
                          <figcaption className="relative flex items-center justify-between pt-6 mt-6 border-t border-slate-100">
                            <div>
                              <div className="text-base font-bold font-display text-slate-900" dangerouslySetInnerHTML={{ __html: testimonial?.name }} ></div>
                            </div>
                          </figcaption>
                          <fieldset className="space-y-4">
                            <RadioGroup className="inline-flex gap-0" >
                              {["1", "2", "3", "4", "5"].map((value) => (
                                <label
                                  key={value}
                                  className="group text-neutral-400 focus-within:border-ring focus-within:ring-ring/50 relative cursor-pointer rounded p-0.5 outline-none focus-within:ring-[3px]"
                                >
                                  <RadioGroupItem value={value} className="sr-only" />
                                  <RiStarFill
                                    size={24}
                                    className={`transition-all ${testimonial?.star >= parseInt(value) ? "text-amber-500" : "text-input"
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
                ))}
              </ul>
            </div>
          </section>
        </div>
      )}


      {portfolioData?.otherDetails?.bulkLink?.bulkLinkList && portfolioData?.otherDetails?.bulkLink?.bulkLinkList.length > 0 && (
        <div
          className={`grid ${portfolioData?.otherDetails?.bulkLink?.bulkLinkList.length % 2 === 0 ? "grid-cols-1 md:grid-cols-3" : "grid-cols-1 md:grid-cols-3"
            } w-fit mx-auto place-items-start   gap-y-6 gap-x-6  px-10`}
        >
          {portfolioData?.otherDetails?.bulkLink?.bulkLinkList.map((link) => {
            return (
              <LinkButtonComponent2
                key={link.linkName}
                linkName={link.linkName as string}
                linkUrl={link.link as string}
              />
            );
          })}
        </div>
      )}



    </>
  );
};

export default Testimonials;
