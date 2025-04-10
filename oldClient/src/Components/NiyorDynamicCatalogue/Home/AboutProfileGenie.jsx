import React from "react";
import logo from "../../../assets/QR~Genie logo.png";
import { Link } from "react-router-dom";

const AboutProfileGenie = () => {
  return (
    <div>
      <div className="w-full bg-c1 h-0.5"></div>
      <div className="grid md:grid-cols-9 gap-5  py-10 px-10">
        <div className="col-span-5">
          <p className="text-4xl font-bold">Profile-Genie</p>
          <p className="text-lg mt-4">
            adipisicing elit. Placeat beatae voluptate ratione accusamus
            deserunt. Maiores tempora at accusantium harum sunt veniam similique
            neque voluptatibus, deleniti tenetur? Ducimus facilis ipsam tempore?
          </p>
          <div className="flex items-center mt-2">
            <svg
              class="h-8 w-8 text-c1 mr-2"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              stroke-width="2"
              stroke="currentColor"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              {" "}
              <path stroke="none" d="M0 0h24v24H0z" />{" "}
              <path d="M5 4h4l2 5l-2.5 1.5a11 11 0 0 0 5 5l1.5 -2.5l5 2v4a2 2 0 0 1 -2 2a16 16 0 0 1 -15 -15a2 2 0 0 1 2 -2" />
            </svg>{" "}
            +91 8750315743
          </div>

          <div className="flex items-center mt-2">
            <svg
              class="h-8 w-8 text-c1 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
            tech@doclabz.com
          </div>
        </div>

        <div className="col-span-4 flex flex-col justify-center items-center">
          <div className="flex justify-between items-center">
            <img src={logo} alt="" className="w-20 md:w-40 mr-6 rounded-full" />
           <a href="https://www.instagram.com/profile_genie_1/" target="_blank">
           <svg
              class="h-20 w-20 text-c1 mr-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              {" "}
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />{" "}
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />{" "}
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
            </svg>
           
           </a>
           
            <svg
              class="h-20 w-20 text-c1"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              {" "}
              <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutProfileGenie;
