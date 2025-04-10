import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
    return (
        <>
            <footer class="flex flex-col  justify-center bg-[#2C1E4A]">

                <nav class="flex justify-center flex-wrap gap-6 pt-4 pb-2 text-gray-100 font-medium ">
                    <a class="hover:text-gray-300 cursor-pointer" hre="#hone">Home</a>
                    <a class="hover:text-gray-300 cursor-pointer" href="#about">About</a>
                    <a class="hover:text-gray-300 cursor-pointer" href="#service">Services</a>
                    <a class="hover:text-gray-300 cursor-pointer" href="#testi">Testimonial</a>
                    <a class="hover:text-gray-300 cursor-pointer" href="#contact">Contact Us</a>
                    <Link to={'/admin-login'} class="hover:text-gray-300 cursor-pointer" href="#">Admin login</Link>
                </nav>

                {/* <p class="text-center text-gray-300 font-medium">&copy; 2022 Company Ltd. All rights reservered.</p> */}
            </footer>

        </>
    )
}

export default Footer