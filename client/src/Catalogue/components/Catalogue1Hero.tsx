import { Link } from "react-scroll";
import { lightenColor } from "../Hooks/calculations";
import { catalogueApiRes } from "@/validations/CatalogueValidation";

const Catalogue1Hero = ({
  catalogueDetail,
}: {
  catalogueDetail: catalogueApiRes["data"]["data"];
}) => {
  if (!catalogueDetail) return <div>Loading...</div>;

  return (
    <section
      className="ezy__header21 light py-12 lg:py-20 min-h-[80vh] flex items-center justify-center relative overflow-hidden text-indigo-900"
      style={{
        backgroundImage: `linear-gradient(-180deg, ${lightenColor(
          catalogueDetail?.backgroundColor,
          0.85
        )}, #fff)`,
      }}
    >
      <div className="container lg:max-w-[80rem] gap-10 px-4 mx-auto relative flex flex-col lg:flex-row items-center  justify-between">
        <div className=" text-center lg:w-[48%]  lg:text-start">
          <div className="">
            <h2
              style={{
                color: lightenColor(catalogueDetail?.backgroundColor, -0.3),
              }}
              className="sm:text-4xl text-3xl md:text-[55px] md:leading-[65px] mb-4 font-semibold"
            >
              {catalogueDetail?.tagline}
            </h2>
            <p className="leading-normal text-black text-md sm:text-lg opacity-90">
              {catalogueDetail?.description}
            </p>
            <Link
              to="product"
              spy={true}
              duration={500}
              smooth={true}
              style={{
                backgroundColor: lightenColor(
                  catalogueDetail?.backgroundColor,
                  -0.3
                ),
              }}
              className="inline-flex px-8 py-2 mt-4 font-semibold text-white duration-300 rounded cursor-pointer hover:bg-opacity-90 md:mt-6"
            >
              View Products!
            </Link>
          </div>
        </div>
        <div className="  lg:w-[37%] w-full sm:w-[85%] shadow-md rounded-xl text-center">
          <img
            src={catalogueDetail?.heroImage?.url}
            alt=""
            className="w-full h-auto shadow-md rounded-xl "
          />
        </div>
      </div>
    </section>
  );
};

export default Catalogue1Hero;
