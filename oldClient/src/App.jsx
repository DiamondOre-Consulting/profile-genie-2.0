// App.js
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './Pages/Home';
import UMMainPortfolio from './Pages/Portfolio/UMMainPortfolio';
import MainPortofio from './Pages/Portfolio/MainPortofio';
import AdminLogin from './Components/AdminComponents/AdminLogin';
import AdminDashboard from './Pages/Admin/AdminDashboard';
import ATSMainPortfolio from './Pages/Portfolio/ATSMainPortfolio';
import HomeMain from './Pages/YaadeinPage/HomeMain';
import MainHome from './Pages/DynamicCatalogue/MainHome/MainHome';
import MainHomeNiyor from './Pages/NiyorDynamicCatalogue/MainHome/MainHome';
import AdminHome from './Pages/DynamicCatalogue/DynamicCatalogueAdmin1/AdminHome';
import Admin1Login from './Pages/DynamicCatalogue/DynamicCatalogueAdmin1/Admin1Login';
import Admin1AllDistributors from './Components/DynamicCatalogue/DynamicCatalogueAdmin1/Admin1AllDistributors';
import Admin1Home from './Components/NiyorDynamicCatalogue/DynamicCatalogueAdmin1/Admin1Home';
import AdminHomeNiyor from './Pages/NiyorDynamicCatalogue/DynamicCatalogueAdmin1/AdminHome'
import AdminnpLogin from './Pages/NiyorDynamicCatalogue/DynamicCatalogueAdmin1/Admin1Login'
import WhiteLabellingMainHome from './Pages/WhiteLabellingDynamicCatalogue/WhiteLabellingMainHome';
function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/profile/2/UM99" element={<UMMainPortfolio />} /> */}
        {/* <Route path="/profile/:portfolioId/:uniqueUserName" element={<MainPortofio />} /> */}
        {/* <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/admin-dashboard/*" element={<AdminDashboard />} /> */}
        {/* <Route path="/profile/1/ATS690" element={<ATSMainPortfolio />} /> */}
        {/* <Route path="/yaadein/:uniqueUserName" element={<HomeMain />} /> */}
        {/* <Route path="/dynamic-catalogue/:userName" element={<MainHome />} /> */}
        <Route path='/1/:userName' element={<MainHomeNiyor />} />
        {/* <Route path='/dynamic-catalogue/:templateId/:userName' element={<WhiteLabellingMainHome />} /> */}
        {/* <Route path="/dynamic-catalogue/admin-login" element={<Admin1Login />} /> */}
        <Route path="/admin-login/1" element={<AdminnpLogin />} />
        <Route path='/admin/1/:userName/*' element={<AdminHomeNiyor />} />
        {/* <Route path="/dynamic-catalogue/admin/:userName/*" element={<AdminHome />} /> */}
        {/* <Route path="/dynamic-catalogue/admin/:userName/admin-all-distributors" element={<Admin1AllDistributors />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
