import React from 'react'
import { Link } from 'react-router-dom'
import { Badge } from './ui/badge'

const Service = () => {
    return (
        <div className="w-full py-20 relative z-10 lg:py-40">
            <div className="container mx-auto w-fit max-w-[75rem]">
                <div className="flex flex-col gap-10">
                    <div className="flex gap-4 flex-col items-start">
                        <div>
                            <Badge>Services</Badge>
                        </div>
                        <div className="flex gap-2 flex-col">
                            <h2 className="text-3xl md:text-5xl tracking-tighter max-w-xl font-regular text-left">
                                Our Services
                            </h2>
                            <p className="text-lg max-w-xl lg:max-w-lg leading-relaxed tracking-tight text-zinc-500  text-left dark:text-zinc-400">
                                Managing a small business today is already tough.
                            </p>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6  mx-auto items-center justify-center">
                        {Array.from({ length: 6 }).map((_, i) => (
                            <Link key={i} to={""} className="block">
                                <div className="w-full max-w-md bg-gray-900 text-white rounded-2xl overflow-hidden shadow-lg">
                                    <img
                                        src={"https://aceternity.com/images/products/thumbnails/new/pixelperfect.png"}
                                        alt={"Pixel Perfect"}
                                        className="w-full h-56 object-cover"
                                    />
                                    <div className="p-6">
                                        <h2 className="text-2xl font-semibold">{"Pixel Perfect"}</h2>
                                        <p className="text-gray-300 mt-2 text-sm">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quis eaque ex blanditiis quasi eius corrupti quas consectetur suscipit. Mollitia optio suscipit accusamus, commodi excepturi voluptatibus, ipsam facere aliquid distinctio consectetur perferendis nulla placeat.</p>
                                    </div>
                                </div>
                            </Link>
                        ))}

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Service
