"use client";

import { DIcons } from "dicons";
import { Link } from "react-router-dom";
// const navigation = {
//   categories: [
//     {
//       id: "main",
//       name: "Main",
//       sections: [
//         {
//           id: "company",
//           name: "Company",
//           items: [
//             { name: "About Us", to: "about" },
//             { name: "Contact", to: "contact" },
//           ],
//         },
//         {
//           id: "services",
//           name: "Services",
//           items: [
//             { name: "Resume Builder", to: "/services/resume-builder" },
//             { name: "LinkedIn Optimization", to: "/services/linkedin" },
//           ],
//         },
//         {
//           id: "legal",
//           name: "Legal",
//           items: [
//             { name: "Terms of Service", to: "/terms" },
//             { name: "Privacy Policy", to: "/privacy" },
//             { name: "Cookie Policy", to: "/cookies" },
//           ],
//         },
//       ],
//     },
//   ],
// };

const Underline = `hover:-translate-y-1 border border-neutral-700 bg-neutral-900 rounded-xl p-2.5 transition-transform `;

export function Footer() {
  return (
    <footer className="w-full px-2 mx-auto border-t border-b border-neutral-100/20 :px-4">
      <div className="relative grid items-center justify-center gap-6 p-10 pb-0 mx-auto max-w-7xl md:flex ">
        <p className="text-sm leading-5 text-center bg-transparent text-neutral-300 ">
          Welcome to Profile Genie, your all-in-one solution for professional
          profile management. We specialize in helping individuals and
          businesses optimize their online presence and create compelling
          professional profiles. Our platform provides intelligent tools and
          features to enhance your digital identity and make a lasting
          impression in the professional world.
        </p>
      </div>

      {/* <div className="px-6 py-10 mx-auto max-w-7xl">
        <div className="border-b border-dotted"> </div>
        <div className="py-10">
          {navigation.categories.map((category) => (
            <div
              key={category.name}
              className="grid flex-row justify-between grid-cols-3 gap-6 leading-6 md:flex"
            >
              {category.sections.map((section) => (
                <div key={section.name}>
                  <ul
                    role="list"
                    aria-labelledby={`${category.id}-${section.id}-heading-mobile`}
                    className="flex flex-col space-y-2"
                  >
                    {section.items.map((item) => (
                      <li key={item.name} className="flow-root">
                        <Link
                          to={item.to}
                          className="text-sm text-slate-400 hover:text-white md:text-xs"
                        >
                          {item.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          ))}
        </div>
        <div className="border-b border-dotted"> </div>
      </div> */}

      <div className="flex flex-wrap justify-center mt-8 gap-y-6">
        <div className="flex flex-wrap items-center justify-center gap-6 px-6 gap-y-4">
          <Link
            aria-label="Email"
            to="mailto:contact@profilegenie.com"
            rel="noreferrer"
            target="_blank"
            className={Underline}
          >
            <DIcons.Mail strokeWidth={1.5} className="w-5 h-5 text-white" />
          </Link>
          <Link
            aria-label="Twitter"
            to="https://twitter.com/profilegenie"
            rel="noreferrer"
            target="_blank"
            className={Underline}
          >
            <DIcons.X className="w-5 h-5 text-neutral-400 hover:text-white" />
          </Link>
          <Link
            aria-label="LinkedIn"
            to="https://www.linkedin.com/company/profilegenie"
            rel="noreferrer"
            target="_blank"
            className={Underline}
          >
            <DIcons.LinkedIn className="w-5 h-5" />
          </Link>
        </div>
      </div>

      <div className="flex flex-col justify-between mx-auto mt-10 text-xs text-center md:max-w-7xl">
        <div className="flex flex-row items-center justify-center gap-1 text-slate-400">
          <span>©</span>
          <span>{new Date().getFullYear()}</span>
          <span>Profile Genie</span>
          <span>•</span>
          <span>All rights reserved</span>
        </div>
      </div>

      <h2 className=" font-extrabold text-center text-transparent fontFooter text-[10vw] bg-clip-text bg-gradient-to-b from-neutral-100 via-neutral-200 to-neutral-500">
        Profile~Genie
      </h2>
    </footer>
  );
}
