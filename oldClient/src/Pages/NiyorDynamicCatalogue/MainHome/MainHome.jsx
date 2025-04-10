import React, { useEffect, useState } from "react";
import Hero from "../../../Components/NiyorDynamicCatalogue/Home/Hero";
import Products from "../../../Components/NiyorDynamicCatalogue/Home/Products";
import About from "../../../Components/NiyorDynamicCatalogue/Home/About";
import AboutProfileGenie from "../../../Components/DynamicCatalogue/Home/AboutProfileGenie";
import Footer from "../../../Components/NiyorDynamicCatalogue/Home/Footer";
import ContactUs from "../../../Components/NiyorDynamicCatalogue/Home/ContactUs";
import { useParams } from "react-router-dom";
import axios from "axios";
import Gallery from "../../../Components/NiyorDynamicCatalogue/Home/Gallery";
import Section2 from '../../../Components/NiyorDynamicCatalogue/Home/Section2';
import Section3 from "../../../Components/NiyorDynamicCatalogue/Home/Section3";
import Section4 from "../../../Components/NiyorDynamicCatalogue/Home/Section4";
import Section5 from "../../../Components/NiyorDynamicCatalogue/Home/Section5";
import TravelandLogistic from "../../../Components/NiyorDynamicCatalogue/Home/TravelandLogistic";
import Accommodation from "../../../Components/NiyorDynamicCatalogue/Home/Accommodation";
import PaymentTerms from "../../../Components/NiyorDynamicCatalogue/Home/PaymentTerms";
import Brands from "../../../Components/NiyorDynamicCatalogue/Home/Brands";
import ChangesAndCancellation from "../../../Components/NiyorDynamicCatalogue/Home/ChangesAndCancellation";

const MainHome = () => {
  const { userName } = useParams();
  console.log(userName);
  const [allproducts, setAllProducts] = useState([]);
  useEffect(() => {
    const handleGetProducts = async () => {
      try {
        const response = await axios.get(
          `https://api.profilegenie.in/api/client/client-products/${userName}`
        );

        if (response.status === 200) {
          console.log("all products", response.data);
          setAllProducts(response.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    handleGetProducts();
  }, []);

  const productsinfo = allproducts?.allProductsInfo;

  // profile

  const [myprofile, setMyProfile] = useState([]);
  useEffect(() => {
    const handleGetProfile = async () => {
      try {
        const response = await axios.get(
          `https://api.profilegenie.in/api/client/my-profile/${userName}`
        );

        if (response.status === 200) {
          console.log("my profile", response.data);
          setMyProfile(response.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    handleGetProfile();
  }, []);

  return (

    <div className="bg-c2 ">
      <Hero myprofile={myprofile} allproducts={productsinfo} />
      <Section2 />
      <Products allproducts={productsinfo} />
      <Section3 />
      <Section4 />
      <Brands />
      <Section5 />
      <TravelandLogistic />
      <Accommodation />
      <PaymentTerms />
      <ChangesAndCancellation />
      <Gallery myprofile={myprofile} />
      <About myprofile={myprofile} />
      <ContactUs myprofile={myprofile} className="z-20" />
      {/* <AboutProfileGenie/> */}
      <Footer myprofile={myprofile} />
    </div>
  );
};

export default MainHome;
