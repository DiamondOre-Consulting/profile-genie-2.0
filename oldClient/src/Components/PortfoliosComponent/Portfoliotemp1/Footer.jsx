import React from "react";
import { Link } from "react-router-dom";

const Footer = ({ portfolioData }) => {
  console.log(portfolioData);
  const primaryTextColor = portfolioData.primaryTextColor;
  // console.log(object)
  return (
    <>
      <footer className="flex flex-col justify-center space-y-4">
        {portfolioData?.socialMedias && (
          <div className="flex items-center justify-center mt-4 ml-10 mr-10 space-x-5">
            {portfolioData?.socialMedias?.facebook && (
              <Link
                to={portfolioData.socialMedias.facebook}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src="https://img.icons8.com/fluent/30/000000/facebook-new.png"
                  alt="Facebook"
                  className="w-10"

                />
              </Link>
            )}
            {portfolioData?.socialMedias?.linkedin && (
              <Link
                to={portfolioData.socialMedias.linkedin}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src="https://img.icons8.com/fluent/30/000000/linkedin-2.png"
                  alt="LinkedIn"
                  className="w-10"

                />
              </Link>
            )}
            {portfolioData?.socialMedias?.google && (
              <Link
                to={portfolioData.socialMedias.google}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFwAAABcCAMAAADUMSJqAAABJlBMVEX///8Aqkv/QDEAhvn/vQAAffipy/wAhPhTmvn1+v8iifgAh/j/twD/Oyr/ugAAqEb/r6oApTwAojT/9PL/pqH/ZVv/Lxv/IwX/vbr/OCX/s6//KRH/+ev/wwD//fP/7Mb/3pj/y1r/viv/xDn/ykzj8+kurFOd2bf/z83/dGv/WU//Rz3/bGX/nZj/6+n/393/gHn/iYL/bG//9dn/mgD/z27/UzD/cyb/MTP/4af/lh3/k43/rBD/ZSr/hB3/v2zo8f3/57YAdPeRvPt4qvpHk/lno/qGs/rdy3Gasi7F2/1arETXuBm2tyV8yZZ6sDrG59HrvAjFsgBTvoHY5vyS0aZEsWMAnnYAi94AqzEAlbuz3b4Ano8AqFwAh+kAj80AlJhqw3oIki7+AAADCElEQVRoge2WaXeaQBSGoczEbDhCFURiuiQB45amadp0T2OT7jatlTa16///Ex0QZUDB60hOe055vuSD5OH6zr13FISMjIyMjP+Oq5TL0NaKu/XGFVm+0qg3W7UUX9EulHTdoGIPWTZMvV5sp6Leu2WYvjdA1ozdvYXV7V3diJqHGHpzQX0rTu2Vr7cWKbuhxatdtAZ39GVtIuvJ7Gt87oI+S+2icwXfArnNAo+7CKuby12edMuGRjHYc9ArPO52tE1k06zvFyuVwn7JHM8UX91CI9wnstYsB/uk3By2EV/dQitcuFmKtMReyeQ9S6EdClw2p1RYMTkzEW6zMy83pnZyjdN9cOeIdad7Pxyi/N2RXpbTWdwjNvIIVe/5dpNzd8Rxn8pR9YFn1x6m6xa2kUv1kZdKyu7NdTSk+vhI42yJWK6N5Kj65CjtXxLX82hsfxr5bGUpnmOI/MbYjdafReU5HMfJEkS+xcg3ovLVnBQD7kDkNwN5PvpZgjz3HODeDCJHW3D5Wm4ZIN9g5NvzyE//tpw7Foic80Bhmc9oxbhmkXJnEHniEK3lwjDyFxA5M/7oZVS+HOY0iAWDJjRYXOiVuJP87BJeG9nxa4h8vHLRG1Gxk589C3LBxxC5f1mgtyKFJD65gqVx5asg9/CaQ+9ct6h0k57sBHLQahH8GX1veXJRPU8sXJovcsph/oOvdoOJP1MmcQmvAOUHH8UAYsXZO0GrgFOh9Ahrj+nHDhOKdPIJLN9RRdauTmnIzTOmbgm2WHz6CmsXVSd6rDb5zO4wDC+cYhExXLwzYL5Y31KJIn4Z5QLciMH/h4Jx9YrqdPu2bXd7oqq4ryYXX0d2cKv4DKJ2aiMKhQTf6eIb9qKB7SwWe9I+gfL9B7Vj0LIN0wfYifITY9AtwVO7ePFrvsMcM1DITLn6m89Ne8ZSktVT5wtMX00qfnK45iy+F6tXZt1TID2Z4ieqtbja09uOSqfSHx/6V1FJd7FAwv7zfs+xqJdYjtMdzPhRwPmOnUvRZmRkZGT82/wBKkFOoNs0eYQAAAAASUVORK5CYII="
                  alt="Google"
                  className="w-10"

                />
              </Link>
            )}
            {portfolioData?.socialMedias?.instagram && (
              <Link
                to={portfolioData.socialMedias.instagram}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src="https://img.icons8.com/fluent/30/000000/instagram-new.png"
                  alt="Instagram"
                  className="w-10"

                />
              </Link>
            )}
            {portfolioData?.socialMedias?.twitter && (
              <Link
                to={portfolioData.socialMedias.twitter}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src="https://img.icons8.com/fluent/30/000000/twitter.png"
                  alt="Twitter"
                  className="w-10"

                />
              </Link>
            )}

            {portfolioData?.socialMedias?.website && (
              <Link
                to={portfolioData?.socialMedias?.website}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src={portfolioData?.websiteLogo || "https://img.icons8.com/?size=100&id=9918&format=png&color=000000"}
                  alt="website"
                  className="w-10 rounded-full"
                />
              </Link>
            )}
            {portfolioData?.socialMedias?.link1 && (
              <Link
                to={portfolioData?.socialMedias?.link1}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src={portfolioData?.link1Logo || "https://img.icons8.com/?size=100&id=9918&format=png&color=000000"}
                  alt="link1"
                  className="w-10 rounded-full"
                />
              </Link>
            )}
            {portfolioData?.socialMedias?.link2 && (
              <Link
                to={portfolioData?.socialMedias?.link2}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src={portfolioData?.link2Logo || "https://img.icons8.com/?size=100&id=9918&format=png&color=000000"}
                  alt="link2"
                  className="w-10 rounded-full"
                />
              </Link>
            )}
            {portfolioData?.socialMedias?.link3 && (
              <Link
                to={portfolioData?.socialMedias?.link3}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src={portfolioData?.link3Logo || "https://img.icons8.com/?size=100&id=9918&format=png&color=000000"}
                  alt="link3"
                  className="w-10 rounded-full"
                />
              </Link>
            )}
          </div>
        )}
        <div>
          {/* This will display on larger screens (e.g., laptop and above) */}
          <p
            className="hidden pt-2 font-medium text-center sm:block"
            style={{ color: primaryTextColor }}
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
            Contact us on +91 8750316743
          </p>
          {/* This will display on small screens (e.g., mobile) */}
          <p
            className="block py-4 pt-2 text-xs font-medium text-center sm:hidden"
            style={{ color: primaryTextColor }}
          >
            Designed and Developed by{" "}
            <Link
              to={"https://profilegenie.in/"}
              className="mr-1 text-blue-600 underline"
              target="_blank"
            >
              profilegenie.in
            </Link>{" "}
            (+91 8750316743)
          </p>
        </div>
      </footer>
    </>
  );
};

export default Footer;
