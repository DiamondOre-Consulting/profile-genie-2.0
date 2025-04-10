import React from 'react'
import ATSHero from '../../Components/PortfoliosComponent/ATSComponents/ATSHero'
import UMNav from '../../Components/PortfoliosComponent/ATSComponents/UMNav'
import UMAbout from '../../Components/PortfoliosComponent/ATSComponents/UMAbout'
import AboutmeBrands from '../../Components/PortfoliosComponent/ATSComponents/AboutMeBrands'
import UMServices from '../../Components/PortfoliosComponent/ATSComponents/UMServices'
import Testimonials from '../../Components/PortfoliosComponent/ATSComponents/Testimonials'
import ContactUs from '../../Components/PortfoliosComponent/ATSComponents/ContactUs'
import Footer from '../../Components/PortfoliosComponent/ATSComponents/Footer'

const ATSMainPortfolio = () => {
  return (
    <>
    <UMNav/>
    <ATSHero/>
    <UMAbout/>
    <AboutmeBrands/>
    <UMServices/>
    <Testimonials/>
    <ContactUs/>
    <Footer/>
    </>
  )
}

export default ATSMainPortfolio