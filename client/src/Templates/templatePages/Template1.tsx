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
import { metaDetails, portfolioResponse } from '../../validations/PortfolioValidation'
import loading from "../../assets/loading.webm"
import { IconAlertTriangle } from '@tabler/icons-react'

const Template1 = ({ setMetaDetails }: { setMetaDetails: React.Dispatch<React.SetStateAction<metaDetails | undefined>> }) => {
    const { username } = useParams()

    const [profileData, setProfileData] = useState<portfolioResponse>()

    const { data, isFetching, isLoading, error } = useGetSinglePortfolioQuery({ username })

    useEffect(() => {
        if (!isFetching && !isLoading) {
            setProfileData(data?.data)
            setMetaDetails(data?.data?.metaDetails)
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



    return (
        <>

            <div style={{
                backgroundColor: 'hsla(0, 0%, 100%, 1)',
                backgroundImage: `
      radial-gradient(at 40% 51%, hsla(244, 78%, 78%, 0.23) 0px, transparent 50%),
      radial-gradient(at 99% 2%, hsla(168, 83%, 73%, 0.56) 0px, transparent 50%),
      radial-gradient(at 100% 100%, hsla(305, 92%, 90%, 1) 0px, transparent 50%),
      radial-gradient(at 34% 3%, hsla(261, 93%, 90%, 1) 0px, transparent 50%),
      radial-gradient(at 0% 100%, hsla(336, 97%, 86%, 0.57) 0px, transparent 50%)`
            }} className="fixed top-0 left-0 w-screen h-screen ">
            </div>
            {(!profileData) ? <div className='relative flex items-center justify-center w-screen h-screen z-100'><video src={loading} playsInline autoPlay loop muted></video></div> :
                (!profileData.isActive || !profileData.isPaid) ? <div className="relative flex flex-col items-center justify-center min-h-screen px-6 text-white bg-transparent z-100">
                    <div className="text-center max-w-[32rem] w-[96vw]">
                        <IconAlertTriangle className="mx-auto mb-4 text-red-600 size-16" />
                        <h1 className="text-4xl font-bold text-red-500">Profile Not Active</h1>
                        <p className="mt-3 text-gray-900">
                            It looks like the profile you are trying to access is currently inactive. Please try again later or contact the profile owner for more information.
                        </p>
                        <div className="flex justify-center gap-4 mt-6">
                            <Link
                                to="/"
                                className="px-6 py-2 text-white transition bg-blue-500 rounded-md hover:bg-blue-600"
                            >
                                Go Home
                            </Link>
                            <Link
                                to="/contact"
                                className="px-6 py-2 text-white transition bg-red-500 rounded-md hover:bg-red-600"
                            >
                                Contact Support
                            </Link>
                        </div>
                    </div>
                </div> :
                    <Template1Layout fullName={profileData?.fullName}>
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
