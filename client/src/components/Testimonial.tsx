import { RadioGroupItem } from "@/components/ui/radio-group"
import { RadioGroup } from "@radix-ui/react-radio-group"
import { RiStarFill } from "@remixicon/react"
import Marquee from "react-fast-marquee"

const Testimonial = () => {

    const testimonials = {
        tagline: "Testimonials",
        testimonialList: [
            {
                uniqueId: 1,
                name: "Amit Sharma",
                star: 5,
                detail: "The best landing page experience! Our business saw exponential growth with the easy setup."
            },
            {
                uniqueId: 2,
                name: "Priya Kumari",
                star: 4,
                detail: "Fantastic platform! The best place for business growth with seamless integration."
            },
            {
                uniqueId: 3,
                name: "Rahul Verma",
                star: 4,
                detail: "A game-changer for our business. Easy setup and outstanding results."
            },
            {
                uniqueId: 4,
                name: "Sneha Patel",
                star: 5,
                detail: "Highly recommend for business growth. The landing page is top-notch."
            },
            {
                uniqueId: 5,
                name: "Vikram Joshi",
                star: 5,
                detail: "Effortless setup and significant growth. The best platform for entrepreneurs."
            },
            {
                uniqueId: 6,
                name: "Neha Singh",
                star: 5,
                detail: "Transformative experience! Our business flourished with this intuitive platform."
            },
            {
                uniqueId: 7,
                name: "Arjun Desai",
                star: 5,
                detail: "Incredible growth and easy to use. The best landing page we've used."
            },
            {
                uniqueId: 8,
                name: "Pooja Nair",
                star: 4,
                detail: "Our go-to platform for business expansion. Setup was swift and simple."
            },
            {
                uniqueId: 9,
                name: "Saurabh Mehta",
                star: 5,
                detail: "Best decision for our business. Seamless setup and excellent growth."
            },
            {
                uniqueId: 10,
                name: "Kavita Menon",
                star: 4,
                detail: "An exceptional platform for business growth. Easy to set up and use."
            }
        ]
    }

    return (
        <section className="relative z-10 py-20">
            <div className="mx-auto flex max-w-container flex-col items-center gap-4 text-center ">
                <div className="flex flex-col items-center gap-4 px-4 sm:gap-8">
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6  tracking-tight bg-clip-text inline-block leading-tight text-transparent bg-gradient-to-b from-white to-white/70">
                        {testimonials?.tagline}
                    </h1>
                </div>

                <div className="relative flex w-full flex-col items-center justify-center overflow-hidden">
                    <Marquee pauseOnHover loop={0} direction="left" speed={30}>
                        {(testimonials?.testimonialList.length > 1) && testimonials?.testimonialList?.map((testimonial, i) => (
                            <div key={i} className="w-[19rem] min-h-[10rem] border border-neutral-700 text-white p-4 text-left h-full rounded-lg bg-gradient-to-t from-[#6738e7]/80 via-[#4826A7]/20  to-transparent mx-1.5 ">
                                <div className=" flex items-center gap-2 ">
                                    <div className="text-2xl rounded-full  size-12 flex items-center justify-center bg-[#F43F5E]">
                                        {testimonial?.name.split("")[0]}
                                    </div>
                                    <div className="text-start">
                                        <h2 className="pl-1">{testimonial?.name}</h2>
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
                                    </div>
                                </div>
                                <p className="mt-2 text-sm text-neutral-200">{testimonial?.detail}</p>
                            </div>
                        ))
                        }
                    </Marquee>

                    <div className="pointer-events-none z-10 absolute inset-y-0 left-0 hidden w-1/4 bg-gradient-to-r from-[#0C0D17] sm:block" />
                    <div className="pointer-events-none absolute z-10 inset-y-0 right-0 hidden w-1/4 bg-gradient-to-l from-[#0C0D17] sm:block" />
                </div>
            </div>
        </section>
    )
}

export default Testimonial
