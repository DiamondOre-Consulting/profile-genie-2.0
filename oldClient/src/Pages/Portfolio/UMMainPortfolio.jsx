import React from 'react'
import UMNav from '../../Components/PortfoliosComponent/UtsavMathurPortfolioComponent/UMNav'
import UMHero from '../../Components/PortfoliosComponent/UtsavMathurPortfolioComponent/UMHero'
import UMAbout from '../../Components/PortfoliosComponent/UtsavMathurPortfolioComponent/UMAbout'
import UMContact from '../../Components/PortfoliosComponent/UtsavMathurPortfolioComponent/UMContact'
import UMTestimonial from '../../Components/PortfoliosComponent/UtsavMathurPortfolioComponent/UMTestimonial'
import UMServices from '../../Components/PortfoliosComponent/UtsavMathurPortfolioComponent/UMServices'
import Testimonials from '../../Components/PortfoliosComponent/UtsavMathurPortfolioComponent/Testimonials'
import UMFooter from '../../Components/PortfoliosComponent/UtsavMathurPortfolioComponent/UMFooter'

const UMMainPortfolio = () => {
  return (
    <>
    <UMNav/>
    <UMHero/>
    <UMAbout/>
   <UMServices/>
   <Testimonials/>
    <UMContact/>
    <UMFooter/>
    </>
  )
}

export default UMMainPortfolio