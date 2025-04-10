import React, { useEffect, useState } from 'react'
import Navbar from '../../Components/PortfoliosComponent/Portfoliotemp2/Navbar'
import Hero from '../../Components/PortfoliosComponent/Portfoliotemp2/Hero'
import About from '../../Components/PortfoliosComponent/Portfoliotemp2/About'
import OurBrands from '../../Components/PortfoliosComponent/Portfoliotemp2/OurBrands'
import Services from '../../Components/PortfoliosComponent/Portfoliotemp2/Services'
import OurProducts from '../../Components/PortfoliosComponent/Portfoliotemp2/OurProducts'
import Contact from '../../Components/PortfoliosComponent/Portfoliotemp2/Contact'
import vedio1 from "../../assets/1.mp4";
import vedio2 from "../../assets/2.mp4";
import vedio3 from "../../assets/3.mp4";
import vedio4 from "../../assets/4.mp4";
import vedio5 from "../../assets/5.mp4";
import axios from 'axios'
import Testimonials from '../../Components/PortfoliosComponent/Portfoliotemp2/Testimonials'
import Footer from '../../Components/PortfoliosComponent/Portfoliotemp2/Footer'

const MainPortfoliotemp2 = ({ uniqueUserName }) => {

  const [portfolioData, setPortfolioData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  console.log("data", portfolioData)
  useEffect(() => {
    const fetchPortfolioData = async () => {
      try {
        const response = await axios.get(
          `https://api.profilegenie.in/api/admin/portfolio/${uniqueUserName}`
        );

        if (response.status === 200) {
          const data = response.data;
          console.log("response", response.data)
          setPortfolioData(data);
        } else {
          setError(response.message);
          console.log(error)
        }
      } catch (error) {
        setError(error.message);
        console.log(error)
      } finally {
        setLoading(false);
      }
    };

    fetchPortfolioData();
  }, [uniqueUserName]);


  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-center text-2xl">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <video src={vedio1} className="w-full" autoPlay muted loop></video>
        <video src={vedio2} className="w-full" autoPlay muted loop></video>
        <video src={vedio3} className="w-full" autoPlay muted loop></video>
        <video src={vedio4} className="w-full" autoPlay muted loop></video>
        <video src={vedio5} className="w-full" autoPlay muted loop></video>

      </div>
    );
  }
  const backgroundColor = portfolioData.bgColor || "#000000";

  return (
    <div style={{ backgroundColor }}>
      <Navbar portfolioData={portfolioData} />
      <Hero portfolioData={portfolioData} />
      <About portfolioData={portfolioData} />
      <OurBrands portfolioData={portfolioData} />
      <Services portfolioData={portfolioData} />
      <OurProducts portfolioData={portfolioData} />
      <Testimonials portfolioData={portfolioData} />
      <Contact portfolioData={portfolioData} />
      <Footer portfolioData={portfolioData} />


    </div>
  )
}

export default MainPortfoliotemp2
