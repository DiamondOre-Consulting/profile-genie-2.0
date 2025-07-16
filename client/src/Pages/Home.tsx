// import Chatbot from "@/components/Chatbot";
import Contact from "@/components/Contact";
import { FeaturesSectionDemo } from "@/components/Features";
import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import Faq1 from "@/components/mvpblocks/faq-1";
import ProductSection from "@/components/mvpblocks/pricing-4";
// import Preview from "@/components/Preview";
import Testimonial from "@/components/Testimonial";
// import VideoSection from "@/components/VideoSection";
import HomeLayout from "@/Layout/HomeLayout";

const Home = () => {
  return (
    <div className="bg-[#151515] w-full overflow-x-hidden">
      <HomeLayout>
        <Hero />
        {/* <Chatbot /> */}
        <ProductSection />
        {/* <Preview /> */}
        <HowItWorks />
        <FeaturesSectionDemo />
        {/* <VideoSection /> */}
        <Contact />

        <Faq1 />
        <Testimonial />
      </HomeLayout>
    </div>
  );
};

export default Home;
