import Hero from '../Components/Template1/Hero'
import About from '../Components/Template1/About'
import Testimonial from '../Components/Template1/Testimonial'
import Template1Layout from '../Components/Template1/Layout/Template1Layout'
import Service from '../Components/Template1/Service'
import Contact from '../Components/Template1/Contact'
import { Link, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useGetSinglePortfolioQuery } from '@/Redux/API/PortfolioApi'
import { Product } from '../Components/Template1/Product'
import { portfolioResponse } from '../../validations/PortfolioValidation'
import loading from "../../assets/loading.webm"
import { IconAlertTriangle } from '@tabler/icons-react'

const Template1 = () => {
    const { username } = useParams()

    const [profileData, setProfileData] = useState<portfolioResponse>()

    const { data, isFetching, isLoading, error } = useGetSinglePortfolioQuery({ username })

    useEffect(() => {
        if (!isFetching && !isLoading) {
            setProfileData(data?.data)
        }

        if (data?.data?.metaDetails?.favIcon?.url) {
            const favicon = document.querySelector("link[rel='icon']") as HTMLLinkElement;
            if (favicon) {
                favicon.href = data?.data?.metaDetails.favIcon.url;
            } else {
                const newFavicon = document.createElement("link");
                newFavicon.rel = "icon";
                newFavicon.href = data?.data?.metaDetails.favIcon.url;
                document.head.appendChild(newFavicon);
            }
        }
    }, [isFetching, data, isLoading])

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    if (!profileData && !isFetching && !isLoading) {
        if (error) {
            console.log("hello")
            return (
                <div className='relative z-100'>
                    <h1>No portfolio found</h1>
                </div>
            )
        }
    }

    console.log(profileData)

    return (
        <>
            <title>{`${profileData?.metaDetails?.title} | Profile Genie`}</title>
            <meta name="author" content="Profile Genie | Akash Kumar Singh" />
            <meta name="description" content={profileData?.metaDetails?.description} />
            <meta name="keywords" content={profileData?.metaDetails?.keywords} />

            <meta property="og:type" content="website" />
            <meta property="og:title" content={`${profileData?.metaDetails?.title} | Profile Genie`} />
            <meta property="og:description" content={profileData?.metaDetails?.description} />
            <meta property="og:image" content={"routeImage"} />
            <meta property="og:url" content={"routeUrl"} />
            <meta property="og:site_name" content="Profile Genie" />

            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={`${profileData?.metaDetails?.title} | Profile Genie`} />
            <meta name="twitter:description" content={profileData?.metaDetails?.description} />
            <meta name="twitter:image" content={"routeImage"} />
            <meta name="twitter:site" content="@yourTwitterHandle" />
            <meta name="twitter:creator" content="@yourTwitterHandle" />

            <meta name="viewport" content="width=device-width, initial-scale=1" />

            <link rel="canonical" href={"http://localhost:5173/"} />

            <meta name="robots" content="index, follow" />

            <link rel="icon" href="/favicon.ico" sizes="any" />
            <link rel="icon" href={profileData?.metaDetails?.favIcon?.url} />

            <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
            <link rel="manifest" href="/manifest.json" />

            <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
            <meta name="theme-color" content="#FFFFFF" />
            <meta name="rating" content="General" />

            <meta property="og:locale" content="en_US" />
            <meta property="og:image:width" content="1200" />
            <meta property="og:image:height" content="630" />
            <div style={{
                backgroundColor: 'hsla(0, 0%, 100%, 1)',
                backgroundImage: `
      radial-gradient(at 40% 51%, hsla(244, 78%, 78%, 0.23) 0px, transparent 50%),
      radial-gradient(at 99% 2%, hsla(168, 83%, 73%, 0.56) 0px, transparent 50%),
      radial-gradient(at 100% 100%, hsla(305, 92%, 90%, 1) 0px, transparent 50%),
      radial-gradient(at 34% 3%, hsla(261, 93%, 90%, 1) 0px, transparent 50%),
      radial-gradient(at 0% 100%, hsla(336, 97%, 86%, 0.57) 0px, transparent 50%)`
            }} className="   h-screen w-screen fixed top-0 left-0">
            </div>
            {(!profileData) ? <div className='h-screen w-screen flex items-center justify-center relative z-100'><video src={loading} playsInline autoPlay loop muted></video></div> :
                (!profileData?.isActive || !profileData?.isPaid) ? <div className="flex flex-col relative z-100 items-center justify-center min-h-screen bg-transparent text-white px-6">
                    <div className="text-center max-w-[32rem] w-[96vw]">
                        <IconAlertTriangle className="size-16 text-red-600 mx-auto mb-4" />
                        <h1 className="text-4xl font-bold text-red-500">Profile Not Active</h1>
                        <p className="mt-3 text-gray-900">
                            It looks like the profile you are trying to access is currently inactive. Please try again later or contact the profile owner for more information.
                        </p>
                        <div className="mt-6 flex justify-center gap-4">
                            <Link
                                to="/"
                                className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-md transition"
                            >
                                Go Home
                            </Link>
                            <Link
                                to="/contact"
                                className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-md transition"
                            >
                                Contact Support
                            </Link>
                        </div>
                    </div>
                </div> :
                    <Template1Layout>
                        <div id='home'>
                            <Hero portfolio={profileData} />
                        </div>
                        <div id='about'>
                            <About about={profileData?.about} brands={profileData?.otherDetails?.brands} />
                        </div>
                        <div id='services'>
                            {profileData?.otherDetails?.services && <Service services={profileData?.otherDetails?.services} />}
                        </div>
                        <div id='product'>
                            {profileData?.otherDetails?.products && <Product products={profileData?.otherDetails?.products} />}
                        </div>
                        <div id='contact'>
                            <Contact contact={profileData?.contactData} bulkLinks={profileData?.otherDetails?.bulkLink} fullName={profileData?.fullName} />
                        </div>
                        {profileData?.contactData?.testimonial && <Testimonial testimonials={profileData?.contactData?.testimonial} />}
                    </Template1Layout>
            }
        </>
    )
}

export default Template1
