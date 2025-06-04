import { useGetSinglePortfolioQuery } from "@/Redux/API/PortfolioApi";
import {
  metaDetails,
  portfolioResponse,
} from "@/validations/PortfolioValidation";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Nav from "../Components/Template2/Nav";
import Hero from "../Components/Template2/Hero";
import About from "../Components/Template2/About";
import AboutmeBrands from "../Components/Template2/AboutmeBrands";
import Services from "../Components/Template2/Services";
import Products from "../Components/Template2/Products";
import Testimonials from "../Components/Template2/Testimonials";
import ContactUs from "../Components/Template2/ContactUs";
import Footer from "../Components/Template2/Footer";

const Template2 = ({
  setMetaDetails,
}: {
  setMetaDetails: React.Dispatch<React.SetStateAction<metaDetails | undefined>>;
}) => {
  const { username } = useParams();

  const [profileData, setProfileData] = useState<portfolioResponse>();
  const { data, isFetching, isLoading, error } = useGetSinglePortfolioQuery({
    username,
  });

  useEffect(() => {
    if (!isFetching && !isLoading) {
      setProfileData(data?.data);
      setMetaDetails(data?.data?.metaDetails);
    }
  }, [isFetching, data, isLoading]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!profileData && !isFetching && !isLoading) {
    if (error) {
      return (window.location.href = "https://profilegenie.in");
    }
  }

  return (
    <>
      {profileData && (
        <div className="bg-[#fefbff] w-full  overflow-x-hidden">
          <div id="home" className="bg-template2mainBg">
            <Nav portfolioData={profileData} />
            <Hero portfolioData={profileData} />
          </div>
          <About portfolioData={profileData} />
          <AboutmeBrands portfolioData={profileData} />
          <Services portfolioData={profileData} />
          <Products portfolioData={profileData} />
          <Testimonials portfolioData={profileData} />
          <ContactUs portfolioData={profileData} />
          <Footer portfolioData={profileData} />
        </div>
      )}
    </>
  );
};

export default Template2;
