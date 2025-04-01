import React from 'react'
import { Link } from 'react-scroll';

const Catalogue1Hero = ({ catalogueDetail }) => {
    console.log(catalogueDetail)

    if (!catalogueDetail) return <div>Loading...</div>

    const lightenColor = (color, percent) => {
        const num = parseInt(color?.slice(1), 16),
            amt = Math.round(2.55 * percent * 100),
            r = (num >> 16) + amt,
            g = ((num >> 8) & 0x00ff) + amt,
            b = (num & 0x0000ff) + amt;

        return `rgb(${Math.min(255, r)}, ${Math.min(255, g)}, ${Math.min(255, b)})`;
    };

    return (
        <section
            className="ezy__header21 light py-12  relative overflow-hidden text-indigo-900"
            style={{ backgroundImage: `linear-gradient(-180deg, ${lightenColor(catalogueDetail?.backgroundColor, 0.85)}, #fff)` }}
        >
            <div className="container lg:max-w-[80rem] gap-10 px-4 mx-auto relative flex flex-col lg:flex-row items-center  justify-between">

                <div className=" text-center lg:w-[48%]  lg:text-start">
                    <div className="">
                        <h2 style={{ color: lightenColor(catalogueDetail?.backgroundColor, -0.3) }} className="sm:text-4xl text-3xl md:text-[55px] md:leading-[65px] mb-4 font-semibold">
                            {catalogueDetail?.tagline}
                        </h2>
                        <p className="text-md text-black sm:text-lg  leading-normal opacity-90">
                            {catalogueDetail?.description}
                        </p>
                        <Link to="product"
                            spy={true}
                            duration={500}
                            smooth={true}
                            style={{ backgroundColor: lightenColor(catalogueDetail?.backgroundColor, -0.3) }}
                            className="rounded py-2 px-8 hover:bg-opacity-90 duration-300 text-white cursor-pointer font-semibold inline-flex mt-4 md:mt-6"
                        >
                            View Products!
                        </Link>
                    </div>
                </div>
                <div className="  lg:w-[37%]  text-center">
                    <img
                        src={catalogueDetail?.heroImage?.url}
                        alt=""
                        className="rounded-xl shadow-md max-w-full h-auto "
                    />
                </div>
            </div>
        </section >
    )
}

export default Catalogue1Hero
