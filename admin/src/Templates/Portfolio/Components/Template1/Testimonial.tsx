import { RadioGroupItem } from "@/components/ui/radio-group"
import { RadioGroup } from "@radix-ui/react-radio-group"
import { RiStarFill } from "@remixicon/react"
import { IconStar } from "@tabler/icons-react"
import Marquee from "react-fast-marquee"

const Testimonial = () => {

    const testimonials = [
        {
            author: {
                name: "Emma Thompson",
                handle: "@emmaai",
                avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face"
            },
            rate: "3",

            text: "Using this AI platform has transformed how we handle data analysis. The speed and accuracy are unprecedented.",
            href: "https://twitter.com/emmaai"
        },
        {
            author: {
                name: "David Park",
                handle: "@davidtech",
                avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
            },
            rate: "4",

            text: "The API integration is flawless. We've reduced our development time by 60% since implementing this solution.",
            href: "https://twitter.com/davidtech"
        },
        {
            author: {
                name: "Sofia Rodriguez",
                handle: "@sofiaml",
                avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face"
            },
            rate: "4",
            text: "Finally, an AI tool that actually understands context! The accuracy in natural language processing is impressive."
        }
    ]

    return (
        <section className="relative z-10">
            <div className="mx-auto flex max-w-container flex-col items-center gap-4 text-center sm:gap-8">
                <div className="flex flex-col items-center gap-4 px-4 sm:gap-8">
                    <h2 className="max-w-[720px] text-3xl font-semibold leading-tight sm:text-5xl sm:leading-tight">
                        Trusted by developers worldwide
                    </h2>

                </div>

                <div className="relative flex w-full flex-col items-center justify-center overflow-hidden">
                    <Marquee pauseOnHover loop={0} direction="left" speed={30}>
                        {
                            [...testimonials, ...testimonials].map((testimonial, i) => (
                                <div className="w-[19rem] border text-white p-4 text-left h-full rounded-lg bg-[#101828] mx-1.5 ">
                                    <div className=" flex items-center gap-2 ">
                                        <div className="text-2xl rounded-full  size-12 flex items-center justify-center bg-[#F43F5E]">
                                            {testimonial?.author?.name.split("")[0]}
                                        </div>
                                        <div className="text-start">
                                            <h2 className="pl-1">{testimonial.author.name}</h2>
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
                                                                className={`transition-all ${parseInt(testimonial.rate) >= parseInt(value) ? "text-amber-500" : "text-input"
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
                                    <p className="mt-2 text-sm text-neutral-200">{testimonial.text}</p>
                                </div>
                            ))
                        }
                    </Marquee>

                    <div className="pointer-events-none absolute inset-y-0 left-0 hidden w-1/3 bg-gradient-to-r from-background sm:block" />
                    <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-1/3 bg-gradient-to-l from-background sm:block" />
                </div>
            </div>
        </section>
    )
}

export default Testimonial
