import { FaLink } from "react-icons/fa";

function LinkButtonComponent2({ linkName, linkUrl }: { linkName: string, linkUrl: string }) {
  return (
    <>
      <a href={linkUrl} target="_black" className="">
        <div className="flex items-center">
          <div className="flex-shrink-0 ">
            <div
              className="flex items-center justify-center  w-12 h-12 text-white  bg-[#2EAAC1] rounded-md"
            // style={{ backgroundColor: buttonBgColor }}
            >
              <FaLink />
            </div>
          </div>

          <div className="ml-4">
            <dt
              className="text-lg font-medium leading-6"
            // style={{ color: primaryTextColor }}
            >
              {linkName}
            </dt>
          </div>
        </div>
      </a>
      {/* <a href={linkUrl}>
                <button
                className="overflow-hidden  p-2  bg-[#2EAAC1] text-white border-none rounded-md text-lg font-bold cursor-pointer relative z-10 group"
                >
                {linkName}
             
                
                </button>

        </a>       */}
    </>
  );
}

export default LinkButtonComponent2;