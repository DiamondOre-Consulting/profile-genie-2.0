// import { HoverBorderGradient } from '@/components/ui/hover-border-gradient'
import { ButtonColorful } from "@/components/ui/button-colorful";
import { Footer } from "@/components/ui/footer";
import { ReactNode } from "react";
import { Link } from "react-router-dom";
import logo from "./../assets/logo.png";

const HomeLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="bg-[#0c0d17]">
      <div className="bg-transparent top-0 z-[1000] fixed  left-1/2 transform -translate-x-1/2 mx-auto flex justify-center items-center py-3">
        <div
          className={
            "bg-neutral-900  backdrop-blur-sm w-fit text-[0.9rem] font-[400] border border-zinc-700 text-white rounded-full p-1 shadow-md "
          }
        >
          <nav className=" w-[95vw] max-w-[28rem] gap-2 mx-auto flex items-center justify-between">
            <Link
              to="/"
              className="transition duration-300 rounded-full hover:bg-lightGray hover:text-gray-200"
            >
              <img src={logo} alt="Profile Genie logo" className="w-10" />
            </Link>

            <Link to={`tel:+${918750316743}`} className="Btn ">
              <ButtonColorful
                className="py-1 rounded-full"
                label="+91 8750316743"
              />
            </Link>
          </nav>
        </div>
      </div>
      <div className="bg-transparent">{children}</div>
      <Footer />
    </div>
  );
};

export default HomeLayout;
