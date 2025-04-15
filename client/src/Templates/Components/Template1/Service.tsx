
import { portfolioResponse } from '@/validations/PortfolioValidation'

const Service = ({ services }: { services: portfolioResponse['otherDetails']['services'] }) => {
    return (
        <div className="relative z-10 w-full py-6 ">
            <div className=" mx-auto  w-[96vw] max-w-[75rem]">
                <div className="flex flex-col items-center justify-center gap-10">
                    <h1 className="text-2xl font-bold sm:text-5xl md:text-6xl">
                        {services?.tagline}
                    </h1>
                    <div className="grid items-center justify-center grid-cols-1 gap-6 mx-auto sm:grid-cols-2 lg:grid-cols-3">
                        {(services?.serviceList) && services?.serviceList.map((service, i) => (
                            <div key={i} className="w-full h-full max-w-md overflow-hidden text-white bg-gray-900 shadow-lg rounded-2xl">
                                <img
                                    src={service?.image?.url}
                                    alt={"Pixel Perfect"}
                                    className="object-cover w-full h-56"
                                />
                                <div className="p-6">
                                    <h2 className="text-2xl font-semibold">{service?.title}</h2>
                                    <p className="mt-2 text-sm text-gray-300">{service?.detail}</p>
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
