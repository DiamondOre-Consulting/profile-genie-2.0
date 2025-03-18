import Contact from '@/components/Contact'
import { FeaturesSectionDemo } from '@/components/Features'
import Hero from '@/components/Hero'
import Preview from '@/components/Preview'
import Testimonial from '@/components/Testimonial'
import VideoSection from '@/components/VideoSection'
import HomeLayout from '@/Layout/HomeLayout'

const Home = () => {
    return (

        <HomeLayout>
            <Hero />
            <Preview />
            <FeaturesSectionDemo />
            <VideoSection />
            <Contact />
            <Testimonial />

        </HomeLayout>
    )
}

export default Home
