import React, { useEffect, useState } from 'react'
import Hero from '../../Components/WhiteLabellingDynamicCatalogue/Home/Hero';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ContactUs from '../../Components/NiyorDynamicCatalogue/Home/ContactUs';
import Footer from '../../Components/NiyorDynamicCatalogue/Home/Footer';
import Categories from '../../Components/WhiteLabellingDynamicCatalogue/Home/Categories';
import Gallery from '../../Components/NiyorDynamicCatalogue/Home/Gallery';

const WhiteLabellingMainHome = () => {
  const { userName } = useParams();
  const { templateId } = useParams();
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
          console.log("while lebelling ", response.data);
          setMyProfile(response.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    handleGetProfile();
  }, []);

  return (
    <div>
      <Hero myprofile={myprofile} allproducts={productsinfo} />
      <Categories allproducts={productsinfo} myprofile={myprofile} />
      <Gallery myprofile={myprofile} />
      <ContactUs myprofile={myprofile} className="z-20" />
      <Footer myprofile={myprofile} />
    </div>
  )
}

export default WhiteLabellingMainHome
