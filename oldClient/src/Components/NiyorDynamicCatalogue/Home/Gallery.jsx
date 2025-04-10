import React, { useState } from "react";

const Gallery = ({ myprofile }) => {
  // Safely access gallery items
  const galleryItems = myprofile?.gallery || [];
  console.log(galleryItems);

  // State to track muted state of each video
  const [mutedVideos, setMutedVideos] = useState(
    galleryItems.map((item) => item.type === "video" && item.muted)
  );

  const toggleMute = (index) => {
    setMutedVideos((prev) => {
      const newMutedVideos = [...prev];
      newMutedVideos[index] = !newMutedVideos[index];
      return newMutedVideos;
    });
  };

  const isVideo = (url) => {
    const videoFormats = ["mp4", "mov", "avi", "wmv", "flv"];
    const extension = url?.split(".").pop();
    return videoFormats.includes(extension);
  };

  return (
    <div className="py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl sm:text-6xl font-bold text-center npf">
          Our Gallery
        </h1>
        <div className="w-40 h-1 bg-c1 mx-auto mb-12"></div>

        {/* Grid container for images and videos */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 auto-rows-[minmax(150px, 1fr)]">
          {galleryItems.map((item, index) => (
            <div
              key={index}
              className={`relative flex justify-center items-center rounded-xl  
                ${
                  index === 0
                    ? "md:col-span-2 md:row-span-2"
                    : index === 1
                    ? "md:row-span-2"
                    : index === 10
                    ? "md:col-span-2 md:row-span-2"
                    : "h-40"
                } h-full`}
            >
              {item ? (
                isVideo(item) ? (
                  <div className="relative w-full h-full">
                    <video
                      src={item}
                      className="w-full h-[500px] object-cover rounded-xl"
                      muted={mutedVideos[index]}
                      controls
                      loop
                      playsInline
                      onClick={() => toggleMute(index)}
                    />
                    {/* Toggle Mute Button */}
                    {/* <button
                      onClick={() => toggleMute(index)}
                      className="absolute top-2 right-2 bg-gray-800 bg-opacity-75 text-white rounded-full p-2"
                    >
                      {mutedVideos[index] ? (
                        <svg
                          className="h-6 w-6"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                          <line x1="23" y1="9" x2="17" y2="15" />
                          <line x1="17" y1="9" x2="23" y2="15" />
                        </svg>
                      ) : (
                        <svg
                          className="h-6 w-6"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"
                          />
                        </svg>
                      )}
                    </button> */}
                  </div>
                ) : (
                  <img
                    src={item}
                    alt={`Gallery ${index}`}
                    className="w-full h-60 object-cover rounded-xl"
                  />
                )
              ) : (
                <svg
                  className="h-16 w-16 text-gray-400 group-hover:text-gray-600 transition-colors duration-300"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 4v16m8-8H4"
                  />
                </svg>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Gallery;
