import { portfolioResponse } from "@/validations/PortfolioValidation";
import { Link } from "react-router-dom";

const Footer = ({ portfolioData }: { portfolioData: portfolioResponse }) => {
  return (
    <>
      <footer className="flex flex-col items-center justify-center space-y-4 ">
        {portfolioData?.contactData?.social && (
          <div className="flex flex-wrap items-center justify-center gap-5 mt-4 ml-10 mr-10 ">
            {portfolioData?.contactData?.social?.facebook && (
              <Link
              className="w-10 h-10"

                to={portfolioData?.contactData?.social?.facebook}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src="https://img.icons8.com/?size=100&id=uLWV5A9vXIPu&format=png&color=000000"
                  alt="Facebook"
                  className="w-10 h-10"

                />
              </Link>
            )}
            {portfolioData?.contactData?.social?.linkedin && (
              <Link
              className="w-10 h-10"

                to={portfolioData?.contactData?.social?.linkedin}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src="https://img.icons8.com/?size=100&id=xuvGCOXi8Wyg&format=png&color=000000"
                  alt="LinkedIn"
                  className="w-10 h-10"

                />
              </Link>
            )}
            {portfolioData?.contactData?.social?.instagram && (
              <Link
              className="w-10 h-10"

                to={portfolioData?.contactData?.social?.instagram}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src="https://img.icons8.com/?size=100&id=BrU2BBoRXiWq&format=png&color=000000"
                  alt="Instagram"
                  className="w-10 h-10"

                />
              </Link>
            )}
            {portfolioData?.contactData?.social?.twitter && (
              <Link
              className="w-10 h-10"
                to={portfolioData?.contactData?.social?.twitter}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src="https://img.icons8.com/?size=100&id=phOKFKYpe00C&format=png&color=000000"
                  alt="Twitter"
                  className="w-10 h-10"

                />
              </Link>
            )}
            {portfolioData?.contactData?.social?.youtube && (
              <Link
              className="w-10 h-10"

                to={portfolioData?.contactData?.social?.youtube}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src="https://img.icons8.com/?size=100&id=omVNNE6wkyP7&format=png&color=000000"
                  alt="Youtube"
                  className="w-10 h-10"

                />
              </Link>
            )}
            {portfolioData?.contactData?.social?.googleLink && (
              <Link
              className="w-10 h-10"

                to={portfolioData?.contactData?.social?.googleLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src="https://img.icons8.com/?size=100&id=17949&format=png&color=000000"
                  alt="Google"
                  className="w-10 h-10"

                />
              </Link>
            )}
            {
              portfolioData?.contactData?.social?.otherSocialList?.map((social,index) => (
                <Link
              className="w-10 h-10"

                key={social?.uniqueId|| index}
                  to={social?.link as string}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src={social?.img?.url}
                    alt={social?.img?.publicId}
                    className="w-10 h-10"

                  />
                </Link>
              ))
            }


          </div>
        )}
        <div>
          <p
            className="hidden pt-2 font-medium text-center sm:block"

          >
            Designed and Developed by{" "}
            <Link
              to={"https://profilegenie.in/"}
              className="text-blue-600 underline"
              target="_blank"
            >
              profilegenie.in
            </Link>
          </p>
          <p className="hidden pb-4 mt-2 font-medium text-center md:block ">
            Contact us on +91 7838738916
          </p>
          {/* This will display on small screens (e.g., mobile) */}
          <p
            className="block py-4 pt-2 text-xs font-medium text-center sm:hidden"

          >
            Designed and Developed by{" "}
            <Link
              to={"https://profilegenie.in/"}
              className="mr-1 text-blue-600 underline"
              target="_blank"
            >
              profilegenie.in
            </Link>{" "}
            (+91 7838738916)
          </p>
        </div>
      </footer>
    </>
  );
};

export default Footer;
