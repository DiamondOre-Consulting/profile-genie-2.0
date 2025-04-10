import React, { useEffect, useState } from 'react'
import Hero from '../../../Components/DynamicCatalogue/Home/Hero'
import Products from '../../../Components/DynamicCatalogue/Home/Products'
import About from '../../../Components/DynamicCatalogue/Home/About'
import AboutProfileGenie from '../../../Components/DynamicCatalogue/Home/AboutProfileGenie'
import Footer from '../../../Components/DynamicCatalogue/Home/Footer'
import ContactUs from '../../../Components/DynamicCatalogue/Home/ContactUs'
import { useParams } from 'react-router-dom'
import axios from 'axios'

const MainHome = () => {
  const { userName } = useParams();
  console.log(userName)
  const [allproducts, setAllProducts] = useState([])
  useEffect(() => {
    const handleGetProducts = async () => {

      try {
        const response = await axios.get(
          `https://api.profilegenie.in/api/client/client-products/${userName}`,



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


  const [myprofile, setMyProfile] = useState([])
  useEffect(() => {
    const handleGetProfile = async () => {

      try {
        const response = await axios.get(
          `https://api.profilegenie.in/api/client/my-profile/${userName}`,


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
    <div className='bg-c2'>
      <Hero myprofile={myprofile} allproducts={productsinfo} />
      <Products allproducts={productsinfo} />
      <About myprofile={myprofile} />
      <ContactUs myprofile={myprofile} />
      {/* <AboutProfileGenie/> */}
      <Footer myprofile={myprofile} />
    </div>
  )
}

export default MainHome
