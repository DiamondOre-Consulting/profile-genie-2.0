import { RadioGroupItem } from "@/components/ui/radio-group";
import { portfolioResponse } from "@/validations/PortfolioValidation";
import { RadioGroup } from "@radix-ui/react-radio-group";
import { RiStarFill } from "@remixicon/react";
import Marquee from "react-fast-marquee";

const Testimonial = ({
  testimonials,
}: {
  testimonials: portfolioResponse["contactData"]["testimonial"];
}) => {
  return (
    <section className="relative z-10">
      <div className="flex flex-col items-center gap-4 mx-auto text-center max-w-container sm:gap-8">
        <div className="flex flex-col items-center gap-4 px-4 sm:gap-8">
          <h2 className="max-w-[720px] text-3xl font-semibold leading-tight sm:text-5xl sm:leading-tight">
            {testimonials?.tagline}
          </h2>
        </div>

        <div className="relative flex flex-col items-center justify-center w-full overflow-hidden">
          <Marquee pauseOnHover loop={0} direction="left" speed={30}>
            {testimonials?.testimonialList.length > 1 &&
              Array.from({ length: 10 }).map(() =>
                testimonials?.testimonialList?.map((testimonial, i) => (
                  <div
                    key={i}
                    className="w-[19rem] border text-white p-4 text-left h-full rounded-lg bg-[#101828] mx-1.5 "
                  >
                    <div className="flex items-center gap-2 ">
                      <div className="text-2xl rounded-full  size-12 flex items-center justify-center bg-[#F43F5E]">
                        {testimonial?.name.split("")[0]}
                      </div>
                      <div className="text-start">
                        <h2 className="pl-1">{testimonial?.name}</h2>
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
                      </div>
                    </div>
                    <p className="mt-2 text-sm text-neutral-200">
                      {testimonial?.detail}
                    </p>
                  </div>
                ))
              )}
          </Marquee>

          <div className="absolute inset-y-0 left-0 hidden w-1/3 pointer-events-none bg-gradient-to-r from-background sm:block" />
          <div className="absolute inset-y-0 right-0 hidden w-1/3 pointer-events-none bg-gradient-to-l from-background sm:block" />
        </div>
      </div>
    </section>
  );
};

export default Testimonial;
