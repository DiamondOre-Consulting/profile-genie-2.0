import React, { useEffect, useState } from "react";
import vedio1 from "../../assets/1.mp4";
import vedio2 from "../../assets/2.mp4";
import vedio3 from "../../assets/3.mp4";
import vedio4 from "../../assets/4.mp4";
import vedio5 from "../../assets/5.mp4";
import Nav from "../../Components/PortfoliosComponent/Portfoliotemp1/Nav";
import Hero from "../../Components/PortfoliosComponent/Portfoliotemp1/Hero";
import About from "../../Components/PortfoliosComponent/Portfoliotemp1/About";
import Services from "../../Components/PortfoliosComponent/Portfoliotemp1/Services";
import Products from "../../Components/PortfoliosComponent/Portfoliotemp1/Products";
import ContactUs from "../../Components/PortfoliosComponent/Portfoliotemp1/ContactUs";
import Footer from "../../Components/PortfoliosComponent/Portfoliotemp1/Footer";
import axios from "axios";
import Testimonials from "../../Components/PortfoliosComponent/Portfoliotemp1/Testimonials";
import AboutmeBrands from "../../Components/PortfoliosComponent/Portfoliotemp1/AboutmeBrands";

const MainPortfoliotemp1 = ({ uniqueUserName }) => {
  const [portfolioData, setPortfolioData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [toggleActivate, setToggleActivate] = useState()
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchPortfolioData = async () => {
      try {
        const response = await axios.get(
          `https://api.profilegenie.in/api/admin/portfolio/${uniqueUserName}`
        );

        if (response.status === 200) {
          const data = response.data;
          setPortfolioData(data);
          setToggleActivate(response.data.toggleActivate);
        } else {
          setError(response.message);
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPortfolioData();
  }, [uniqueUserName]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen text-2xl text-center">
        Loading...
      </div>
    );
  }

  if (!toggleActivate) {
    return (
      <div>
        <video src={vedio1} className="w-full" autoPlay muted loop></video>
        <video src={vedio2} className="w-full" autoPlay muted loop></video>
        <video src={vedio3} className="w-full" autoPlay muted loop></video>
        <video src={vedio4} className="w-full" autoPlay muted loop></video>
        <video src={vedio5} className="w-full" autoPlay muted loop></video>
      </div>
    )
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
  console.log("testing")

  const backgroundColor = portfolioData.bgColor || "#000000";

  return (
    <>

      <div style={{ backgroundColor }}>
        <Nav portfolioData={portfolioData} />
        <Hero portfolioData={portfolioData} />
      </div>
      <About portfolioData={portfolioData} />
      <AboutmeBrands portfolioData={portfolioData} />
      <Services portfolioData={portfolioData} />
      <Products portfolioData={portfolioData} />
      <Testimonials portfolioData={portfolioData} />
      <ContactUs portfolioData={portfolioData} />
      <Footer portfolioData={portfolioData} />
    </>
  );
};

export default MainPortfoliotemp1;
