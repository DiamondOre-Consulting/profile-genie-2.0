import { HomeLayout } from "@/Layout/HomeLayout";
import template1 from "../assets/template1.mp4";
import { IconEye } from "@tabler/icons-react";
import { Link, useNavigate } from "react-router-dom";

const SelectTemplate = () => {
  const navigate = useNavigate();
  return (
    <HomeLayout pageName="Select Template">
      <Link
        to={"/add-portfolio/template1"}
        className="text-white cursor-pointer inline-block overflow-hidden w-fit rounded bg-[#101828] border border-neutral-500"
      >
        <div className="flex items-center justify-between pl-2 font-semibold tracking-wide text-center uppercase">
          <h3>Template 1</h3>
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              navigate("/portfolio/preview/template1/GR17");
            }}
            className="flex items-center justify-center w-12 bg-amber-500 h-9"
          >
            <IconEye />
          </button>
        </div>
        <div>
          <video
            className="max-w-[19rem] rounded-b"
            loop
            onMouseOver={(e) => e.currentTarget.play()}
            onMouseOut={(e) => e.currentTarget.pause()}
            src={template1}
          ></video>
        </div>
      </Link>
    </HomeLayout>
  );
};

export default SelectTemplate;
