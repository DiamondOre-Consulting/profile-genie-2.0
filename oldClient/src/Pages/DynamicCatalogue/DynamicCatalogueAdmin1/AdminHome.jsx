// AdminHome.js
import React, { useEffect, useState } from 'react';
import Admin1Home from '../../../Components/DynamicCatalogue/DynamicCatalogueAdmin1/Admin1Home';
import Admin1Nav from '../../../Components/DynamicCatalogue/DynamicCatalogueAdmin1/Admin1Nav';
import axios from 'axios';
import { Routes, Route, useParams } from 'react-router-dom';
import Admin1AllDistributors from '../../../Components/DynamicCatalogue/DynamicCatalogueAdmin1/Admin1AllDistributors';

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
      <Admin1Nav logo={logo} myprofile={myprofile} />
      <Routes>
        <Route path="/" element={<Admin1Home />} />
        <Route path="admin-all-distributors" element={<Admin1AllDistributors />} />
      </Routes>
    </div>
  );
};

export default AdminHome;
