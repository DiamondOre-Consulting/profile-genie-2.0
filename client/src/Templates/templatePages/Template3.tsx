import {
  IconBrandFacebook,
  IconBrandInstagram,
  IconBrandLinkedin,
  IconBrandWhatsapp,
  IconBrandYoutube,
  IconLink,
  IconMail,
  IconPhone,
  IconShare3,
} from "@tabler/icons-react";
import { DIcons } from "dicons";
import { ArrowRightCircle } from "lucide-react";
import { useEffect, useState } from "react";
import PhoneInput from "react-phone-input-2";
import { Link } from "react-router-dom";

const Template3 = () => {
  const [whatsAppNumber, setWhatsAppNumber] = useState<number | null>(null);

  const portfolioUrl = window.location.href;
  const message = `Hello, find my portfolio here:\n\n${portfolioUrl}\n\n📌 Click the link above to view my portfolio!`;
  const encodedMessage = encodeURIComponent(message);

  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 60);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div>
      <div className="min-h-screen w-full max-w-[25rem] text-white bg-black">
        <div className="relative p-4 capitalize">
          <div
            className={`relative transition-all flex bg-gradient-to-b from-black via-black/80 to-black/50 backdrop-blur-xs z-100 items-center justify-center duration-500  w-full text-center ${
              isScrolled ? " sticky top-0 pt-4  flex-col" : "h-[25rem]"
            }`}
          >
            <img
              src="https://profilegenie.in/assets/umimage-BvQZn4lg.png"
              alt={"Utsav Mathur"}
              loading="lazy"
              className={`transition-all duration-500 object-cover object-top ${
                isScrolled
                  ? "w-[4.5rem] h-[4.5rem] border-3 border-gray-200 rounded-full overflow-hidden"
                  : "h-[25rem] w-full"
              }`}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50"></div>
            <div
              className={`${
                isScrolled ? "pb-2" : "absolute pb-4"
              } bottom-0 left-0 right-0  w-full transition-all duration-500 `}
            >
              <h1
                className={`mt-1 ${
                  isScrolled ? "text-lg" : "text-3xl"
                } font-semibold`}
              >
                Utsav Mathur
              </h1>
              <div className="flex items-center justify-center gap-2 mt-2">
                <Link
                  to={""}
                  className={`flex flex-col items-center justify-center w-full p-2  rounded-lg bg-neutral-800`}
                >
                  <IconBrandWhatsapp className={`${isScrolled && "size-5"}`} />
                  <span className="text-xs">whatsapp</span>
                </Link>
                <Link
                  to={""}
                  className="flex flex-col items-center justify-center w-full p-2 rounded-lg bg-neutral-800"
                >
                  <IconPhone className={`${isScrolled && "size-5"}`} />
                  <span className="text-xs">call</span>
                </Link>

                <div className="flex flex-col items-center justify-center w-full p-2 rounded-lg bg-neutral-800">
                  <IconMail className={`${isScrolled && "size-5"}`} />
                  <span className="text-xs">mail</span>
                </div>
                <div
                  onClick={async () => {
                    try {
                      await navigator.share({
                        title: "Utsav Mathur",
                        text: "Check out my profile",
                        url: window.location.href,
                      });
                    } catch (error) {
                      return error;
                    }
                  }}
                  className="flex flex-col items-center justify-center w-full p-2 rounded-lg cursor-pointer bg-neutral-800"
                >
                  <IconShare3 className={`${isScrolled && "size-5"}`} />
                  <span className="text-xs">share</span>
                </div>
              </div>
            </div>
          </div>
          {isScrolled && (
            <div className="flex items-center justify-center gap-2">
              <Link
                to={""}
                className="flex flex-col items-center justify-center w-full p-2 mt-2 rounded-lg bg-neutral-800"
              >
                <IconBrandWhatsapp />
                <span className="text-xs">whatsapp</span>
              </Link>
              <Link
                to={""}
                className="flex flex-col items-center justify-center w-full p-2 mt-2 rounded-lg bg-neutral-800"
              >
                <IconPhone />
                <span className="text-xs">call</span>
              </Link>

              <div className="flex flex-col items-center justify-center w-full p-2 mt-2 rounded-lg bg-neutral-800">
                <IconMail />
                <span className="text-xs">mail</span>
              </div>
              <div
                onClick={async () => {
                  try {
                    await navigator.share({
                      title: "Utsav Mathur",
                      text: "Check out my profile",
                      url: window.location.href,
                    });
                  } catch (error) {
                    return error;
                  }
                }}
                className="flex flex-col items-center justify-center w-full p-2 mt-2 rounded-lg cursor-pointer bg-neutral-800"
              >
                <IconShare3 />
                <span className="text-xs">share</span>
              </div>
            </div>
          )}
          <div className="p-2 px-4 rounded-md bg-neutral-900">
            <p className="text-sm tracking-wide text-neutral-300">about</p>
            <p className="mt-1 text-sm">
              DIRECTOR - DIAMONDORe CONSULTING PVT. LTD.
            </p>
          </div>

          <div className="p-2 px-4 mt-2 rounded-md bg-neutral-900">
            <p className="text-sm tracking-wide text-neutral-300">phone</p>
            <div className="flex flex-wrap gap-2 mt-1">
              <Link
                to={""}
                className="p-1 px-2 text-sm text-blue-400 rounded bg-neutral-800 w-fit"
              >
                +91 1234567890
              </Link>
              <Link
                to={""}
                className="p-1 px-2 text-sm text-blue-400 rounded bg-neutral-800 w-fit"
              >
                +91 1234567890
              </Link>
            </div>
          </div>
          <div className="p-2 px-4 mt-2 rounded-md bg-neutral-900">
            <p className="text-sm tracking-wide text-neutral-300">email</p>
            <div className="flex flex-wrap gap-2 mt-1 lowercase">
              <Link
                to=""
                className="p-1 px-2 text-sm text-blue-400 rounded bg-neutral-800 w-fit"
              >
                itsakash1806@gmail.com
              </Link>
              <Link
                to={""}
                className="p-1 px-2 text-sm text-blue-400 rounded bg-neutral-800 w-fit"
              >
                itsakash1806@gmail.com
              </Link>
            </div>
          </div>

          <div className="p-2 px-4 mt-2 rounded-md bg-neutral-900">
            <p className="text-sm tracking-wide ">
              address
              <span className="ml-2 text-xs text-gray-300 bg-neutral-800 p-0.5 px-2 rounded">
                Work
              </span>
            </p>
            <p className="mt-1 text-sm text-blue-400 lowercase">
              123, Street Name, City, State, Country
            </p>
          </div>
          <div className="flex items-center justify-center gap-2 mt-2 text-sm">
            <div className="w-full p-2 px-4 text-center rounded-md bg-neutral-900">
              Save Contacts
            </div>
            <div className="w-full p-2 px-4 text-center rounded-md bg-neutral-900">
              Download Brochure
            </div>
          </div>
          <div className="p-2 px-4 mt-2 rounded-md bg-neutral-900">
            <p className="mb-1 text-sm tracking-wide text-neutral-300">
              Share on whatsapp
            </p>
            <div className="flex items-center justify-between gap-1">
              <PhoneInput
                country={"in"}
                buttonStyle={{
                  border: "none",
                  backgroundColor: "#262626",
                  color: "#000",
                }}
                inputStyle={{
                  width: "100%",
                  border: "none",
                  fontSize: "15px",
                  paddingTop: "8px",
                  paddingBottom: "8px",
                  height: "40px",
                  borderRadius: "4px",
                  backgroundColor: "#262626",
                  color: "#fff",
                }}
                dropdownStyle={{
                  backgroundColor: "#fff",
                  color: "#000",

                  border: "1px solid #fff",
                }}
                value={whatsAppNumber?.toString()}
                onChange={(phone) =>
                  setWhatsAppNumber(phone ? Number(phone) : null)
                }
              />
              <Link
                target="_blank"
                to={`https://wa.me/${whatsAppNumber}?text=${encodedMessage}`}
                className="flex items-center justify-center p-[6.8px] px-2 text-sm text-white bg-blue-600 rounded hover:bg-blue-700"
              >
                <ArrowRightCircle />
              </Link>
            </div>
          </div>
          <iframe
            className="w-full my-2 h-[10rem] rounded-md bg-neutral-900"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d57970.58020086255!2d84.33714724949792!3d24.75565941718616!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x398cfc35b57ffe31%3A0xffea2031cb937478!2sAurangabad%2C%20Bihar!5e0!3m2!1sen!2sin!4v1748941785612!5m2!1sen!2sin"
          ></iframe>

          <div className="p-2 px-4 mt-2 rounded-md bg-neutral-900">
            <p className="text-sm tracking-wide ">Social</p>
            <Link
              to={""}
              className="flex items-center gap-2 py-3 border-b border-gray-700"
            >
              <IconBrandLinkedin />

              <span className="text-sm text-blue-400 lowercase">
                linkedin.com/in/utsav-mathur
              </span>
            </Link>
            <Link
              to={""}
              className="flex items-center gap-2 py-3 border-b border-gray-700"
            >
              <IconBrandInstagram />

              <span className="text-sm text-blue-400 lowercase">
                instagram.com/in/utsav-mathur
              </span>
            </Link>
            <Link
              to={""}
              className="flex items-center gap-2 py-3 border-b border-gray-700"
            >
              <IconBrandFacebook />

              <span className="text-sm text-blue-400 lowercase">
                facebook.com/in/utsav-mathur
              </span>
            </Link>
            <Link
              to={""}
              className="flex items-center gap-2 py-3 border-b border-gray-700"
            >
              <IconBrandYoutube />

              <span className="text-sm text-blue-400 lowercase">
                youtube.com/in/utsav-mathur
              </span>
            </Link>
          </div>
          <div className="p-2 px-4 mt-2 rounded-md bg-neutral-900">
            <p className="text-sm tracking-wide ">Bulk Link</p>
            <Link
              to={""}
              className="flex items-center gap-2 py-3 border-b border-gray-700 cursor-pointer"
            >
              <IconLink />

              <span className="text-sm text-blue-400 lowercase">
                linkedin.com/in/utsav-mathur
              </span>
            </Link>
            <Link
              to={""}
              className="flex items-center gap-2 py-3 border-b border-gray-700"
            >
              <IconBrandInstagram />

              <span className="text-sm text-blue-400 lowercase">
                instagram.com/in/utsav-mathur
              </span>
            </Link>
            <Link
              to=""
              className="flex items-center gap-2 py-3 border-b border-gray-700 cursor-pointer"
            >
              <IconBrandFacebook />

              <span className="text-sm text-blue-400 lowercase">
                facebook.com/in/utsav-mathur
              </span>
            </Link>
            <Link
              to={""}
              className="flex items-center gap-2 py-3 border-b border-gray-700 cursor-pointer"
            >
              <IconBrandYoutube />

              <span className="text-sm text-blue-400 lowercase">
                youtube.com/in/utsav-mathur
              </span>
            </Link>
          </div>
        </div>
        <div className="flex flex-row items-center justify-center gap-1 py-3 mt-4 bg-neutral-900 text-slate-400">
          <span> © </span>
          <span>{new Date().getFullYear()}</span>
          <span>Made with</span>
          <DIcons.Heart className="w-4 h-4 mx-1 text-red-600 animate-pulse" />
          <span> by </span>
          <span className="text-white cursor-pointer hover:text-neutral-100">
            <Link
              aria-label="Logo"
              className=""
              to="https://www.instagram.com/aliimam.in/"
              target="_blank"
            >
              PROFILE GENIE
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Template3;
