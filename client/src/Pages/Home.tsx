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
    <div className="bg-[#151515] w-full overflow-x-hidden">
      <HomeLayout>
        <Hero />
        <div className="fixed z-[2000]  bottom-0 right-4   overflow-hidden">
          <iframe
            src="https://my.spline.design/greetingrobot-wPb20PaGBuFW6MLjsEHmqAMC/"
            width="165%"
            height="150%"
          ></iframe>
        </div>
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
