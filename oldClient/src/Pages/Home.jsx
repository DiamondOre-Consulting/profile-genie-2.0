import React from 'react'
import Navbar from '../Components/CommonComponents/Navbar'
import Hero from '../Components/HomeComponent/Hero'
import Aboutus from '../Components/HomeComponent/Aboutus'
import Services from '../Components/HomeComponent/Services'
import Testimonials from '../Components/HomeComponent/Testimonials'
import ContactUs from '../Components/HomeComponent/ContactUs'
import Footer from '../Components/CommonComponents/Footer'

const Home = () => {
  return (
    <>
    <Navbar/>
    <Hero/>
    <Aboutus/>
    <Services/>
    <Testimonials/>
    <ContactUs/>
    <Footer/>
    </>
  )
}

export default Home