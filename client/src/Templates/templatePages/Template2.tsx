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
import { RadioGroup } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { SparklesText } from "@/components/ui/sparkles-text";
import callGIF from "../../assets/call.gif";
import { IconX } from "@tabler/icons-react";
import PhoneNumberDisplay from "@/components/FormatPhoneNumber";
import NotFoundPage from "@/components/page-not-found";

const Template2 = ({
  setMetaDetails,
}: {
  setMetaDetails: React.Dispatch<React.SetStateAction<metaDetails | undefined>>;
}) => {
  const { username } = useParams();
  const [shouldQuery, setShouldQuery] = useState(false);
  const [sosActive, setSosActive] = useState(false);
  const [isActive, setIsActive] = useState(false);

  // Trigger SOS action
  const handleSOS = () => {
    setIsActive(true);

    // Optional: Trigger device vibration (if supported)
    if ("vibrate" in navigator) {
      navigator.vibrate([200, 100, 200, 100, 200]); // Vibrate pattern: SOS in Morse (... --- ...)
    }

    // Auto-reset after 3 seconds
    setTimeout(() => setIsActive(false), 3000);
  };
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

  // Remove this useEffect, handle error rendering in the return statement instead

  return (
    <>
      {isLoading || isFetching ? (
        <Loader />
      ) : error && !isFetching && !isLoading ? (
        <div className="flex items-center justify-center w-full h-screen">
          <NotFoundPage />
        </div>
      ) : (
        profileData && (
          <div className="bg-[#fefbff] w-full  overflow-x-hidden">
            {sosActive && (
              <div className="fixed inset-0 top-0 left-0 bg-black/50 backdrop-blur-sm z-[1000] flex items-center justify-center">
                <RadioGroup
                  className="gap-2 p-4 w-full max-w-[23rem] cursor-pointer pt-2 border-2 rounded-xl border-zinc-600  bg-zinc-300 relative "
                  defaultValue="1"
                >
                  <div
                    onClick={() => setSosActive(false)}
                    className="absolute top-2 right-2"
                  >
                    <IconX />
                  </div>
                  <SparklesText
                    className="mb-3 text-2xl text-center sm:text-3xl"
                    sparklesCount={1}
                    text={"SOS"}
                  />

                  {profileData?.SOS?.map((data, i) => {
                    return (
                      <a
                        key={i}
                        href={`tel:${data?.phoneNumber}`}
                        className="relative flex items-start w-full gap-2 p-3 border rounded-md shadow-md outline-none bg-zinc-100 border-zinc-400"
                      >
                        <div className="flex items-center gap-3 grow">
                          <div className="p-1 bg-green-100 border border-green-500 rounded">
                            <img src={callGIF} className="size-8" alt="" />
                          </div>
                          <div className="grid gap-1 grow">
                            <Label>{data?.fullName}</Label>
                            <PhoneNumberDisplay
                              phoneNumber={data?.phoneNumber?.toString()}
                            />
                          </div>
                        </div>
                      </a>
                    );
                  })}
                </RadioGroup>
              </div>
            )}
            {profileData?.SOS.length >= 1 &&
              profileData?.SOS[0]?.phoneNumber && (
                <button
                  className="fixed  bottom-6 right-6 z-[10000]"
                  onClick={() => setSosActive(true)}
                >
                  <div className="sos-container ">
                    <div
                      className={`sos-button shadow-md flex items-center justify-center ${
                        isActive ? "active" : ""
                      }`}
                      onClick={handleSOS}
                    >
                      <span>SOS</span>
                    </div>

                    <>
                      <div className="ripple-ring ring-1"></div>
                      <div className="ripple-ring ring-2"></div>
                      <div className="ripple-ring ring-3"></div>
                    </>
                  </div>
                </button>
              )}
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
