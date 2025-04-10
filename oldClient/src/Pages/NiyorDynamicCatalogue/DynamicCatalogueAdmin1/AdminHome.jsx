// AdminHome.js
import React, { useEffect, useState } from 'react';
import Admin1Home from '../../../Components/NiyorDynamicCatalogue/DynamicCatalogueAdmin1/Admin1Home';
import Admin1Nav from '../../../Components/NiyorDynamicCatalogue/DynamicCatalogueAdmin1/Admin1Nav';
import axios from 'axios';
import { Routes, Route, useParams } from 'react-router-dom';
import AdminGallery from '../../../Components/NiyorDynamicCatalogue/DynamicCatalogueAdmin1/AdminGalllery';


const AdminHome = () => {
  const { userName } = useParams();
  const [myprofile, setMyProfile] = useState(null);

  useEffect(() => {
    const handleGetProfile = async () => {
      try {
        const response = await axios.get(`https://api.profilegenie.in/api/client/my-profile/${userName}`);
        if (response.status === 200) {
          setMyProfile(response.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    handleGetProfile();
  }, [userName]);

  const logo = myprofile?.brand?.brandLogo;

  return (
    <div>
      <Admin1Nav logo={logo} />
      <Admin1Home myprofile={myprofile} />
      <AdminGallery myprofile={myprofile} />
    </div>
  );
};

export default AdminHome;
