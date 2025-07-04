import Contact from "@/components/Contact";
import { FeaturesSectionDemo } from "@/components/Features";
import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
// import Preview from "@/components/Preview";
import Testimonial from "@/components/Testimonial";
// import VideoSection from "@/components/VideoSection";
import HomeLayout from "@/Layout/HomeLayout";

const Home = () => {
  return (
    <div className="bg-[#010101] ">
      <HomeLayout>
        <Hero />
        {/* <Preview /> */}
        <HowItWorks />
        <FeaturesSectionDemo />
        {/* <VideoSection /> */}
        <Contact />
        <Testimonial />
      </HomeLayout>
    </div>
  );
};

export default Home;
