import React from 'react'
import Hero from '../Components/Template1/Hero'
import About from '../Components/Template1/About'
import Service from '../Components/Template1/Service'
import Product from '../Components/Template1/Product'
import Testimonial from '../Components/Template1/Testimonial'
import { Contact } from 'lucide-react'
import Template1Layout from '../Components/Template1/Layout/Template1Layout'

const Template1 = () => {
    return (
        <div>
            <div style={{
                backgroundColor: 'hsla(0, 0%, 100%, 1)',
                backgroundImage: `
      radial-gradient(at 40% 51%, hsla(244, 78%, 78%, 0.23) 0px, transparent 50%),
      radial-gradient(at 99% 2%, hsla(168, 83%, 73%, 0.56) 0px, transparent 50%),
      radial-gradient(at 100% 100%, hsla(305, 92%, 90%, 1) 0px, transparent 50%),
      radial-gradient(at 34% 3%, hsla(261, 93%, 90%, 1) 0px, transparent 50%),
      radial-gradient(at 0% 100%, hsla(336, 97%, 86%, 0.57) 0px, transparent 50%)`
            }} className="   h-screen w-screen fixed top-0 left-0">

            </div>
            <Template1Layout />
            <Hero />
            <About />
            <Service />
            <Product />
            <Testimonial />
            <Contact />
        </div>
    )
}

export default Template1
