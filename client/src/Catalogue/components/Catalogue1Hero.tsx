import React from 'react'

const Catalogue1Hero = ({ catalogueDetail }) => {
    console.log(catalogueDetail)

    if (!catalogueDetail) return <div>Loading...</div>
    return (
        <section
            className="ezy__header21 light py-14  relative overflow-hidden text-indigo-900"
            style={{ backgroundImage: "linear-gradient(-180deg, #fedddc, #fff)" }}
        >
            <div className="container lg:max-w-[80rem] px-4 mx-auto relative flex flex-col lg:flex-row items-center justify-between">

                <div className=" text-center lg:w-[52%] lg:text-start">
                    <div className="pb-14 lg:pb-36">
                        <h2 className="sm:text-4xl text-3xl md:text-[55px] md:leading-[65px] mb-4 font-semibold">
                            {catalogueDetail?.tagline}
                        </h2>
                        <p className="text-md sm:text-lg md:text-xl leading-normal opacity-80">
                            {catalogueDetail?.description}
                        </p>
                        <div>
                            <a
                                href="#!"
                                className="bg-blue-600 rounded py-3 px-8 hover:bg-opacity-90 duration-300 text-white text-xl inline-flex mt-6 md:mt-12"
                            >
                                Try Now
                            </a>
                        </div>
                    </div>
                </div>
                <div className=" flex items-end lg:w-[40%] justify-center">
                    <div className="bg-white dark:bg-slate-800 rounded-t-[200px] rounded-bl-[100px] text-center px-6">
                        <img
                            src={catalogueDetail?.heroImage?.url}
                            alt=""
                            className="rounded max-w-full h-auto mt-4"
                        />
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Catalogue1Hero
