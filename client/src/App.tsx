import { lazy, Suspense, useEffect, useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { metaDetails } from "./validations/CatalogueValidation";
import Loader from "./components/Loader";
const Home = lazy(() => import("./Pages/Home"));
const Template1 = lazy(() => import("./Templates/templatePages/Template1"));
const Template2 = lazy(() => import("./Templates/templatePages/Template2"));
const Template3 = lazy(() => import("./Templates/templatePages/Template3"));
const Catalogue1Dashboard = lazy(
  () => import("./Catalogue/Catalogue1Dashboard")
);
import logo from "./assets/logo.png";

import AOS from "aos";
import "aos/dist/aos.css";
import UserStats from "./Pages/UserStats";

function App() {
  const location = useLocation();
  const [metaDetails, setMetaDetails] = useState<metaDetails>();

  useEffect(() => {
    if (metaDetails?.favIcon?.url) {
      const favicon = document.querySelector(
        "link[rel='icon']"
      ) as HTMLLinkElement;
      if (favicon) {
        favicon.href = metaDetails.favIcon.url;
      } else {
        const newFavicon = document.createElement("link");
        newFavicon.rel = "icon";
        newFavicon.href = metaDetails.favIcon.url;
        document.head.appendChild(newFavicon);
      }
    }
  }, [metaDetails]);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [location.pathname]);

  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <>
      {metaDetails ? (
        <>
          <title>{`${metaDetails.title} | Profile Genie`}</title>
          <meta name="author" content="Profile Genie | Akash Kumar Singh" />
          <meta name="description" content={metaDetails.description} />
          <meta name="keywords" content={metaDetails.keywords} />

          <meta property="og:type" content="website" />
          <meta
            property="og:title"
            content={`${metaDetails.title} | Profile Genie`}
          />
          <meta property="og:description" content={metaDetails.description} />
          <meta property="og:image" content={metaDetails?.favIcon?.url} />
          <meta
            property="og:url"
            content={`https://profilegenie.in${location.pathname}`}
          />
          <meta
            property="og:site_name"
            content={`${metaDetails?.title} | Profile Genie`}
          />
          <link
            rel="canonical"
            href={`https://profilegenie.in${location.pathname}`}
          />

          <meta name="twitter:card" content="summary_large_image" />
          <meta
            name="twitter:title"
            content={`${metaDetails.title} | Profile Genie`}
          />
          <meta name="twitter:description" content={metaDetails.description} />
          <meta name="twitter:image" content={metaDetails?.favIcon?.url} />
          <meta name="twitter:site" content="@yourTwitterHandle" />
          <meta name="twitter:creator" content="@yourTwitterHandle" />
        </>
      ) : (
        <>
          <title>Profile Genie - Create Professional Digital Profiles</title>
          <meta name="author" content="Profile Genie | Akash Kumar Singh" />
          <meta
            name="description"
            content="Create and manage your professional digital presence with Profile Genie. Build stunning profiles and catalogues to showcase your work."
          />
          <meta
            name="keywords"
            content="profile genie, digital profile, professional profile, online portfolio, digital catalogue, landing page"
          />

          <meta property="og:type" content="website" />
          <meta
            property="og:title"
            content="Profile Genie - Create Professional Digital Profiles"
          />
          <link rel="canonical" href="https://profilegenie.in" />

          <meta
            property="og:description"
            content="Create and manage your professional digital presence with Profile Genie"
          />
          <meta property="og:image" content={logo} />
          <meta property="og:url" content="https://profilegenie.in" />
          <meta property="og:site_name" content="Profile Genie" />

          <meta name="twitter:card" content="summary_large_image" />
          <meta
            name="twitter:title"
            content="Profile Genie - Create Professional Digital Profiles"
          />
          <meta
            name="twitter:description"
            content="Create and manage your professional digital presence with Profile Genie"
          />
          <meta name="twitter:image" content={logo} />
          <meta name="twitter:site" content="@yourTwitterHandle" />
          <meta name="twitter:creator" content="@yourTwitterHandle" />
        </>
      )}

      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="robots" content="index, follow" />
      <link rel="icon" href={metaDetails?.favIcon?.url} sizes="any" />
      {/* <link rel="manifest" href="/manifest.json" /> */}
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <meta name="theme-color" content="#FFFFFF" />
      <meta name="rating" content="General" />
      <meta property="og:locale" content="en_US" />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/demo" element={<Home />} />
          <Route
            path="/profile/1/:username"
            element={<Template2 setMetaDetails={setMetaDetails} />}
          />
          <Route path="/profile/1/:username/stats" element={<UserStats />} />
          <Route
            path="/profile/9510/:username"
            element={<Template1 setMetaDetails={setMetaDetails} />}
          />
          <Route
            path="/catalogue/1/:userName/*"
            element={<Catalogue1Dashboard setMetaDetails={setMetaDetails} />}
          />
          <Route
            path="/dynamic-catalogue/1/Ishan_Niyor_Perfumes"
            element={
              <iframe
                src="https://profile-genie-2-0-niyor.onrender.com/1/Ishan_Niyor_Perfumes"
                title="Niyor home page"
                style={{ width: "100%", minHeight: "100vh", border: "none" }}
              />
            }
          />
          <Route
            path="/dynamic-catalogue/admin-login/1"
            element={
              <iframe
                src="https://profile-genie-2-0-niyor.onrender.com/admin-login/1"
                title="Niyor admin login"
                style={{ width: "100%", minHeight: "100vh", border: "none" }}
              />
            }
          />
          <Route
            path="/dynamic-catalogue/admin/1/Ishan_Niyor_Perfumes"
            element={
              <iframe
                src="https://profile-genie-2-0-niyor.onrender.com/admin/1/Ishan_Niyor_Perfumes"
                title="Niyor home page"
                style={{ width: "100%", minHeight: "100vh", border: "none" }}
              />
            }
          />

          <Route path="/template3" element={<Template3 />} />
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
