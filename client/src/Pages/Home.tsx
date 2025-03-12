import { FeaturesSectionDemo } from '@/components/Features'
import Hero from '@/components/Hero'
import Preview from '@/components/Preview'
import HomeLayout from '@/Layout/HomeLayout'

const Home = () => {
    return (

        <HomeLayout>
            <Hero />
            <Preview />
            <FeaturesSectionDemo />
        </HomeLayout>
    )
}

export default Home
