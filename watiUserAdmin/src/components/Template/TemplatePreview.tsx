import type { templateSchema } from "@/validations/TemplateValidation";
import { Copy, EllipsisVertical, Info, Phone, Store, Wifi } from "lucide-react";
import { BiSolidImage, BiSolidShare } from "react-icons/bi";
import { FaWhatsapp } from "react-icons/fa";
import { GrShare } from "react-icons/gr";
import { IoArrowBackSharp } from "react-icons/io5";
import { MdBattery5Bar } from "react-icons/md";
import waBg from "../../assets/waBg.webp";

const TemplatePreview = ({
  template,
}: {
  template: templateSchema["component"];
}) => {
  console.log(template);
  console.log(1);
  // Format the message body using component.body.text
  const formatBody = (body: string) => {
    if (!body) return "";
    const lines = body.split("\n");

    return lines
      .map((line: string) =>
        line
          .replace(/\*(.*?)\*/g, "<strong>$1</strong>")
          .replace(/_(.*?)_/g, "<em>$1</em>")
          .replace(/~(.*?)~/g, "<del>$1</del>")
          .replace(
            /\{\{(\d+)\}\}/g,
            '<span class="text-blue-600 font-semibold">$1</span>'
          )
      )
      .join("<br>");
  };

  const renderHeader = () => {
    if (!template?.header?.format || template?.header?.format === "NONE")
      return null;

    if (template.header.format === "TEXT") {
      return (
        <div className="p-1 font-semibold text-black ">
          {template.header.text}
        </div>
      );
    }

    if (template.header.format === "IMAGE" && template.header.media_url) {
      return (
        <div className="rounded">
          <img
            src={template.header.media_url}
            alt="Header"
            className="object-cover w-full h-32 rounded"
          />
        </div>
      );
    }

    if (template.header.format === "VIDEO" && template.header.media_url) {
      return (
        <div className="mb-2 overflow-hidden rounded-md">
          <video
            src={template.header.media_url}
            controls
            className="w-full h-32"
          />
        </div>
      );
    }

    if (template.header.format === "DOCUMENT" && template.header.media_url) {
      return (
        <div className="flex items-center p-2 mb-2 border border-gray-300 rounded-md">
          <div className="p-2 mr-2 bg-gray-100 rounded">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5 text-gray-500"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div className="overflow-hidden">
            <p className="text-sm font-medium truncate">
              {template.header.media_url?.split("/").pop() || "Document"}
            </p>
            <p className="text-xs text-gray-500">Document</p>
          </div>
        </div>
      );
    }

    return (
      <div className="flex items-center justify-center w-full h-32 bg-gray-300 rounded">
        {template?.header?.format === "IMAGE" && (
          <BiSolidImage className="w-full h-full text-gray-300 border" />
        )}
      </div>
    );
  };

  const renderButtons = () => {
    if (!template?.button?.buttons?.length) return null;

    return (
      <div className="">
        {template.button?.buttons.map((button, idx) => {
          if (button.type === "QUICK_REPLY") {
            return (
              <div
                key={idx}
                className="px-3 flex gap-2 items-center border-t justify-center py-1.5 text-sm text-blue-400 bg-blue-50"
              >
                <BiSolidShare className="mt-0.5 size-4" />
                {button.text || "Quick Reply"}
              </div>
            );
          }

          if (button.type === "URL") {
            return (
              <div
                key={idx}
                className="px-3 flex gap-2 items-center border-t justify-center py-1.5 text-sm text-blue-400 bg-blue-50"
              >
                <GrShare className="inline mr-1 text-blue-500 size-3" />
                {button.text || "Visit Link"}
              </div>
            );
          }

          if (button.type === "COPY_CODE") {
            return (
              <div
                key={idx}
                className="px-3 flex gap-2 items-center border-t justify-center py-1.5 text-sm text-blue-400 bg-blue-50"
              >
                <Copy className="inline text-blue-500 size-3.5" />
                Copy Offer Code
              </div>
            );
          }
          if (button.type === "PHONE_NUMBER") {
            return (
              <div
                key={idx}
                className="px-3 flex gap-2 items-center border-t justify-center py-1.5 text-sm text-blue-400 bg-blue-50"
              >
                <Phone className="inline text-blue-500 size-3.5 mt-0.5" />
                {button?.text || "Call us"}
              </div>
            );
          }
          if (button.type === "OTP") {
            return (
              <div
                key={idx}
                className="px-3 flex gap-2 items-center border-t justify-center py-1.5 text-sm text-blue-400 bg-blue-50"
              >
                <Copy className="inline text-blue-500 size-3.5 mt-0.5" />
                {button?.text || "Copy Code"}
              </div>
            );
          }

          return null;
        })}
      </div>
    );
  };

  return (
    <div className="w-full h-full py-2 bg-transparent">
      <h2 className="font-semibold text-center text-md text-neutral-600">
        Preview
      </h2>

      <div className="bg-[#EDE4DB] h-[34rem] relative shadow-md overflow-hidden border-4 border-white mx-auto w-[18rem] rounded-2xl">
        <div className="bg-[#001310] select-none text-white">
          <div className="flex items-center justify-between px-2 py-1">
            <div className="flex items-center gap-2">
              <span className="text-[0.7rem] font-semibold uppercase ">
                {new Date().toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: true,
                })}
              </span>
              <FaWhatsapp className="size-3.5" />
            </div>
            <div className="flex items-center justify-center gap-1">
              <Wifi className="w-3.5 h-3.5 text-white" />
              <div className="flex items-center justify-center text-sm">
                <MdBattery5Bar />
                <span className="text-xs font-semibold text-[0.7rem]">45%</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex bg-[#074e2b] select-none text-white items-center justify-between px-2 py-1.5">
          <div className="flex items-center gap-1">
            <IoArrowBackSharp />
            <img
              className="bg-black border-2 border-gray-700 rounded-full size-8"
              src="https://profilegenie.in/assets/logo-Cdm_DxJa.png"
              alt=""
            />
            <span className="ml-1 text-sm">Genie</span>
          </div>

          <div className="flex items-center gap-2">
            <Store className="w-4 h-4 text-white" />
            <EllipsisVertical className="w-4 h-4 text-white" />
          </div>
        </div>
        <img
          className="absolute object-cover w-full h-[34rem]"
          src={waBg}
          alt="Whatsapp bg"
        />
        <div className=" h-[28rem] relative z-10 pt-2 px-2 hide-scrollbar overflow-y-scroll mt-1 ">
          <div className="p-2 select-none mx-auto text-xs text-gray-600 bg-[#DBF2F1] rounded-md">
            <Info className="inline-block w-4 h-4 mr-1 text-gray-500" />
            This business uses a secure services from meta to manage this chat.
            Tap to <span className="underline">Learn More</span>.
          </div>

          <div className="mt-2 overflow-hidden bg-white rounded-md rounded-tl-none w-[90%]">
            <div className="p-1">{renderHeader()}</div>
            <div
              className="p-2 py-0 text-[0.85rem] text-gray-800 whitespace-pre-wrap"
              dangerouslySetInnerHTML={{
                __html: formatBody(template?.body?.text || ""),
              }}
            />
            <div className="flex items-end justify-center gap-2 p-1 mt-2">
              {template?.footer.text && (
                <div className="py-1 text-xs text-gray-500">
                  {template?.footer.text}
                </div>
              )}
              <div className="text-[0.7rem] w-fit ml-auto  text-gray-500 uppercase ">
                {new Date().toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: true,
                })}
              </div>
            </div>
            {renderButtons()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TemplatePreview;
