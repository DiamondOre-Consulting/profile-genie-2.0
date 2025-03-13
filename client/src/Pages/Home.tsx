import Contact from '@/components/Contact'
import { FeaturesSectionDemo } from '@/components/Features'
import Hero from '@/components/Hero'
import Preview from '@/components/Preview'
import Testimonial from '@/components/Testimonial'
import HomeLayout from '@/Layout/HomeLayout'

const Home = () => {
    return (

        <HomeLayout>
            <Hero />
            <Preview />
            <FeaturesSectionDemo />
            <Contact />
            <Testimonial />

        </HomeLayout>
    )
}

export default Home
