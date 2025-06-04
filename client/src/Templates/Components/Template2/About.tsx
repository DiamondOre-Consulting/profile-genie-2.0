import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { portfolioResponse } from "@/validations/PortfolioValidation";
import { SparklesText } from "@/components/ui/sparkles-text";

gsap.registerPlugin(ScrollTrigger);

const About = ({ portfolioData }: { portfolioData: portfolioResponse }) => {
  return portfolioData?.about?.body ? (
    <div className="max-w-screen-xl px-4 mx-auto my-10 md:px-10" id="aboutme">
      <div className="flex flex-col items-center md:flex">
        <h2
          data-aos="flip-left"
          data-aos-duration="1000"
          className="my-8 text-center "
        >
          <SparklesText
            sparklesCount={3}
            text={portfolioData?.about?.head || "About Us"}
          />
        </h2>
        <div
          data-aos="fade-up"
          data-aos-duration="1500"
          className="flex flex-col w-full gap-2"
        >
          <p
            className=""
            dangerouslySetInnerHTML={{ __html: portfolioData?.about?.body }}
          ></p>
        </div>
      </div>
    </div>
  ) : null;
};

export default About;
