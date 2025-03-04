import React from 'react'
import { Link } from 'react-router-dom'
import { Badge } from './ui/badge'

const Service = ({ services }) => {
    return (
        <div className="w-full py-20 relative z-10 lg:py-40">
            <div className="container mx-auto w-fit max-w-[75rem]">
                <div className="flex flex-col gap-10">
                    <div className="flex flex-col items-center">

                        <Badge>Services</Badge>

                        <h2 className="text-3xl md:text-5xl tracking-tighter max-w-xl font-regular text-left">
                            {services?.tagline}
                        </h2>

                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6  mx-auto items-center justify-center">
                        {services?.serviceList.map((service, i) => (
                            <div key={service?._id} className="w-full max-w-md bg-gray-900 text-white rounded-2xl h-full overflow-hidden shadow-lg">
                                <img
                                    src={service?.image?.url}
                                    alt={"Pixel Perfect"}
                                    className="w-full h-56 object-cover"
                                />
                                <div className="p-6">
                                    <h2 className="text-2xl font-semibold">{service?.title}</h2>
                                    <p className="text-gray-300 mt-2 text-sm">{service?.detail}</p>
                                </div>
                            </div>
                        ))}

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Service
