"use client";

import { DIcons } from "dicons";
import { Link } from "react-router-dom";



const navigation = {
  categories: [
    {
      id: "women",
      name: "Women",

      sections: [
        {
          id: "about",
          name: "About",
          items: [
            { name: "About", to: "/about" },
            { name: "Works", to: "/agency/works" },
            { name: "Pricing", to: "/pricing" },
          ],
        },
        {
          id: "features",
          name: "Features",
          items: [
            { name: "Products", to: "/products" },
            { name: "Agency", to: "/agency" },
            { name: "Dashboard", to: "/dashboard" },
          ],
        },
        {
          id: "products",
          name: "Products",
          items: [
            { name: "DIcons", to: "/products/dicons" },
            { name: "DShapes", to: "/products/dshapes" },
            { name: "Graaadients", to: "/products/graaadients" },
          ],
        },
        {
          id: "designs",
          name: "Designs",
          items: [
            { name: "Design", to: "/designs" },
            { name: "Components", to: "/components" },
            { name: "Blogs", to: "/blogs" },
          ],
        },
        {
          id: "other",
          name: "Others",
          items: [
            { name: "Graphic", to: "/graphic" },
            { name: "3D Icons", to: "/products/3dicons" },
            { name: "Colors", to: "/products/colors/generate" },
          ],
        },
        {
          id: "company",
          name: "Company",
          items: [
            { name: "Contact", to: "/contact" },
            { name: "Terms", to: "/terms" },
            { name: "Privacy", to: "/privacy" },
          ],
        },
      ],
    },
  ],
};

const Underline = `hover:-translate-y-1 border border-neutral-700 bg-neutral-900 rounded-xl p-2.5 transition-transform `;

export function Footer() {
  return (
    <footer className="border-neutral-100/20 :px-4 mx-auto w-full border-b   border-t  px-2">
      <div className="relative mx-auto grid  max-w-7xl items-center justify-center gap-6 p-10 pb-0 md:flex ">
        <Link to="/">
          <p className="flex items-center justify-center rounded-full  ">
            <DIcons.Designali className="w-8 text-red-600" />
          </p>
        </Link>
        <p className="bg-transparent text-center text-xs leading-4 text-neutral-300 md:text-left">
          Welcome to Designali, where creativity meets strategy to bring your
          vision to life. I am passionate about transforming ideas into
          compelling visual experiences. I specialize in crafting unique brand
          identities, immersive digital experiences, and engaging content that
          resonates with your audience. My mission is to empower businesses and
          brands to stand out in a crowded market. I believe in the power of
          design to tell stories, evoke emotions, and drive meaningful
          connections. I believe in quality, not quantity. Designali is actually
          an agency of one. This means you'll work directly with me, founder of
          Designali.
        </p>
      </div>

      <div className="mx-auto max-w-7xl px-6 py-10">
        <div className="border-b border-dotted"> </div>
        <div className="py-10">
          {navigation.categories.map((category) => (
            <div
              key={category.name}
              className="grid grid-cols-3 flex-row justify-between gap-6 leading-6 md:flex"
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
                          className="text-sm  text-slate-400 hover:text-white md:text-xs"
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
      </div>

      <div className="flex flex-wrap justify-center gap-y-6">
        <div className="flex flex-wrap items-center justify-center gap-6 gap-y-4 px-6">
          <Link
            aria-label="Logo"
            to="mailto:contact@designali.in"
            rel="noreferrer"
            target="_blank"
            className={Underline}
          >
            <DIcons.Mail strokeWidth={1.5} className="h-5 w-5" />
          </Link>
          <Link
            aria-label="Logo"
            to="https://x.com/designali_in"
            rel="noreferrer"
            target="_blank"
            className={Underline}
          >
            <DIcons.X className="h-5 w-5 text-neutral-400 hover:text-white" />
          </Link>
          <Link
            aria-label="Logo"
            to="https://www.instagram.com/designali.in/"
            rel="noreferrer"
            target="_blank"
            className={Underline}
          >
            <DIcons.Instagram className="h-5 w-5" />
          </Link>

          <Link
            aria-label="Logo"
            to="https://chat.whatsapp.com/LWsNPcz5BlWDVOha41vzuh"
            rel="noreferrer"
            target="_blank"
            className={Underline}
          >
            <DIcons.WhatsApp className="h-5 w-5" />
          </Link>

          <Link
            aria-label="Logo"
            to="https://www.facebook.com/designali.agency"
            rel="noreferrer"
            target="_blank"
            className={Underline}
          >
            <DIcons.Facebook className="h-5 w-5" />
          </Link>
          <Link
            aria-label="Logo"
            to="https://www.linkedin.com/company/designali"
            rel="noreferrer"
            target="_blank"
            className={Underline}
          >
            <DIcons.LinkedIn className="h-5 w-5" />
          </Link>
          <Link
            aria-label="Logo"
            to="https://www.youtube.com/@designali-in"
            rel="noreferrer"
            target="_blank"
            className={Underline}
          >
            <DIcons.YouTube className="h-5 w-5" />
          </Link>
        </div>
        {/* <ThemeToogle /> */}
      </div>

      <div className="mx-auto mb-10 mt-10 flex flex-col justify-between text-center text-xs md:max-w-7xl">
        <div className="flex flex-row items-center justify-center gap-1 text-slate-400">
          <span> © </span>
          <span>{new Date().getFullYear()}</span>
          <span>Made with</span>
          <DIcons.Heart className="text-red-600 mx-1 h-4 w-4 animate-pulse" />
          <span> by </span>
          <span className="hover:text-neutral-100 cursor-pointer text-white">
            <Link
              aria-label="Logo"
              className="font-bold"
              to="https://www.instagram.com/aliimam.in/"
              target="_blank"
            >
              DOC LABZ
            </Link>
          </span>

        </div>
      </div>
    </footer>
  );
}
