import { lazy, Suspense, useEffect, useState } from "react"
import { Route, Routes } from "react-router-dom"
import Catalogue1 from "./Catalogue/Page/Catalogue1"
import Catalogue1Cart from "./Catalogue/Page/Catalogue1Cart"
import Catalogue1Dashboard from "./Catalogue/Catalogue1Dashboard"
const Home = lazy(() => import("./Pages/Home"))
const Template1 = lazy(() => import("./Templates/templatePages/Template1"))

function App() {

  const [metaDetails, setMetaDetails] = useState()

  useEffect(() => {
    if (metaDetails?.favIcon?.url) {
      const favicon = document.querySelector("link[rel='icon']") as HTMLLinkElement;
      if (favicon) {
        favicon.href = metaDetails.favIcon.url;
      } else {
        const newFavicon = document.createElement("link");
        newFavicon.rel = "icon";
        newFavicon.href = metaDetails.favIcon.url;
        document.head.appendChild(newFavicon);
      }
    }
  }, [metaDetails])

  return (
    <>
      <title>{`${metaDetails?.title ? `${metaDetails?.title} | Profile Genie` : "Profile Genie"}`}</title>
      <meta name="author" content="Profile Genie | Akash Kumar Singh" />
      <meta name="description" content={metaDetails?.description} />
      <meta name="keywords" content={metaDetails?.keywords} />

      <meta property="og:type" content="website" />
      <meta property="og:title" content={`${metaDetails?.title} | Profile Genie`} />
      <meta property="og:description" content={metaDetails?.description} />
      <meta property="og:image" content={"routeImage"} />
      <meta property="og:url" content={"routeUrl"} />
      <meta property="og:site_name" content="Profile Genie" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={`${metaDetails?.title} | Profile Genie`} />
      <meta name="twitter:description" content={metaDetails?.description} />
      <meta name="twitter:image" content={"routeImage"} />
      <meta name="twitter:site" content="@yourTwitterHandle" />
      <meta name="twitter:creator" content="@yourTwitterHandle" />

      <meta name="viewport" content="width=device-width, initial-scale=1" />

      <link rel="canonical" href={"http://localhost:5173/"} />

      <meta name="robots" content="index, follow" />

      <link rel="icon" href="/favicon.ico" sizes="any" />
      <link rel="icon" href={metaDetails?.favIcon?.url} />

      <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      <link rel="manifest" href="/manifest.json" />

      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <meta name="theme-color" content="#FFFFFF" />
      <meta name="rating" content="General" />

      <meta property="og:locale" content="en_US" />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <Suspense fallback={<div>loading</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile/1/:username" element={<Template1 setMetaDetails={setMetaDetails} />} />
          <Route path="/catalogue/1/:userName/*" element={<Catalogue1Dashboard setMetaDetails={setMetaDetails} />} />
        </Routes>
      </Suspense>
    </>
  )
}

export default App

