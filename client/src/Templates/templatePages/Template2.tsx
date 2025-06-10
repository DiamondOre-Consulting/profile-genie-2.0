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
import Loader from "@/components/Loader";

const Template2 = ({
  setMetaDetails,
}: {
  setMetaDetails: React.Dispatch<React.SetStateAction<metaDetails | undefined>>;
}) => {
  const { username } = useParams();
  const [shouldQuery, setShouldQuery] = useState(false);

  const [profileData, setProfileData] = useState<portfolioResponse>();
  useEffect(() => {
    if (username) {
      setShouldQuery(true);
    }
  }, [username]);

  const { data, isFetching, isLoading, error } = useGetSinglePortfolioQuery(
    { username },
    { skip: !shouldQuery }
  );

  useEffect(() => {
    if (!isFetching && !isLoading && data) {
      setProfileData(data?.data);
      setMetaDetails(data?.data?.metaDetails);
    }
  }, [isFetching, data, isLoading]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (error && !isFetching && !isLoading) {
      window.location.href = "https://profilegenie.in";
    }
  }, [error, isFetching, isLoading]);

  return (
    <>
      {isLoading || isFetching ? (
        <Loader />
      ) : (
        profileData && (
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
        )
      )}
    </>
  );
};

export default Template2;
