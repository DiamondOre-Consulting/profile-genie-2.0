import Hero from '../Components/Template1/Hero'
import About from '../Components/Template1/About'
import Testimonial from '../Components/Template1/Testimonial'
import Template1Layout from '../Components/Template1/Layout/Template1Layout'
import Service from '../Components/Template1/Service'
import Contact from '../Components/Template1/Contact'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useGetSinglePortfolioQuery } from '@/Redux/API/PortfolioApi'
import { Product } from '../Components/Template1/Product'
import { portfolioResponse } from '@/validations/PortfolioValidation'
import loading from "../../../assets/loading.webm"

const Template1 = () => {
    const { username } = useParams()

    const [profileData, setProfileData] = useState<portfolioResponse>()

    const { data, isFetching, isLoading, error } = useGetSinglePortfolioQuery({ username })

    useEffect(() => {
        if (!isFetching && !isLoading) setProfileData(data?.data)
    }, [isFetching, data, isLoading])

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    if (!profileData && !isFetching && !isLoading) {
        if (error) {

            return (
                <div>
                    <h1>No portfolio found</h1>
                </div>
            )
        }
    }

    return (
        <div className='relative'>
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
                (!profileData?.isActive || !profileData?.isPaid) ? <div className='relative z-100'>Not active</div> :
                    <Template1Layout>
                        <Hero portfolio={profileData} />
                        <div id='about'>
                            <About about={profileData?.about} brands={profileData?.otherDetails?.brands} />
                        </div>
                        {profileData?.otherDetails?.services && <Service services={profileData?.otherDetails?.services} />}
                        {profileData?.otherDetails?.products && <Product products={profileData?.otherDetails?.products} />}
                        <Contact contact={profileData?.contactData} />
                        {profileData?.contactData?.testimonial && <Testimonial testimonials={profileData?.contactData?.testimonial} />}
                    </Template1Layout>
            }
        </div>
    )
}

export default Template1
