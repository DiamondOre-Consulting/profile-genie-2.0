import { useState, useRef } from "react";
import { cn } from "@/lib/utils";
import { Badge } from "@/Templates/Components/Template1/ui/badge";

const HowItWorks = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const videoId = "5q6HgnPtan8";
  const thumbnailUrl = `https://profilegenie.store/cdn/shop/files/THUMBNAILLLLL_1.webp?v=1751544450&width=2000`;

  const handlePlayVideo = () => {
    setIsPlaying(true);

    // Request fullscreen
    if (containerRef.current) {
      if (containerRef.current.requestFullscreen) {
        containerRef.current.requestFullscreen();
      } else if ((containerRef.current as any).webkitRequestFullscreen) {
        /* Safari */
        (containerRef.current as any).webkitRequestFullscreen();
      } else if ((containerRef.current as any).msRequestFullscreen) {
        /* IE11 */
        (containerRef.current as any).msRequestFullscreen();
      }
    }

    // Autoplay the video
    if (iframeRef.current) {
      iframeRef.current.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&enablejsapi=1`;
    }
  };

  return (
    <div
      id="demo"
      className=" mx-auto text-white w-[97.5%] relative overflow-hidden flex flex-col items-center justify-center"
    >
      <div className="absolute top-0 w-full h-[39rem] productBg z-0"></div>
      <div className="relative z-[10] h-full max-w-[65rem] mt-16">
        <div className="flex w-[98%] mx-auto flex-col items-center gap-3 text-center">
          <Badge className="bg-[#1b1638] border border-[#2e2e2e]">
            Still Confused?
          </Badge>
          <h1 className="mb-2 text-3xl font-bold tracking-tight sm:text-5xl md:text-6xl">
            <span
              className={cn(
                "bg-clip-text text-transparent bg-gradient-to-r from-zinc-300 via-white/90 to-rose-300 "
              )}
            >
              Watch How It Works
            </span>
          </h1>

          <p className="text-muted-foreground">
            See how it works and unlock new ways to elevate your portfolio,
            expand your network, and stand out from the crowd.
          </p>

          <div
            ref={containerRef}
            className="relative w-full max-w-[70rem] rounded-lg overflow-hidden mx-auto mt-4 bg-black "
          >
            {!isPlaying ? (
              <div
                onClick={handlePlayVideo}
                className="relative w-full h-full cursor-pointer group"
              >
                <img
                  src={thumbnailUrl}
                  alt="Video thumbnail"
                  className="object-cover w-full h-full"
                />
                <div className="absolute inset-0 flex items-center justify-center transition-all group-hover:bg-opacity-10">
                  <div className="flex items-center justify-center transition-all bg-red-600 rounded-full size-16 opacity-90 group-hover:opacity-100 group-hover:scale-110">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="white"
                      className="w-10 h-10 ml-1"
                    >
                      <path d="M5.536 21.886a1.004 1.004 0 0 0 1.033-.064l13-9a1 1 0 0 0 0-1.644l-13-9A1 1 0 0 0 5 3v18a1 1 0 0 0 .536.886z" />
                    </svg>
                  </div>
                </div>
              </div>
            ) : (
              <iframe
                ref={iframeRef}
                className="w-full h-full"
                src={`https://www.youtube.com/embed/${videoId}?enablejsapi=1`}
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
