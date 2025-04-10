import React, { useState, useEffect } from "react";
import axios from "axios";

const AdminGallery = ({ myprofile }) => {
  const [mutedVideos, setMutedVideos] = useState([true, true, true]);
  const [gallery, setGallery] = useState([]); // Store uploaded media URLs
  const [editPopUp, setEditPopUp] = useState(false); // For displaying popup
  const [selectedFiles, setSelectedFiles] = useState(null); // Store selected files
  const [currentEditIndex, setCurrentEditIndex] = useState(null); // Track the index being edited
  const [showLoader, setShowLoader] = useState(false);

  // Get gallery from profile
  useEffect(() => {
    if (myprofile?.gallery) {
      setGallery(myprofile.gallery);
    }
  }, [myprofile]);

  // Toggle mute function for videos
  const toggleMute = (index) => {
    setMutedVideos((prev) => {
      const newMutedVideos = [...prev];
      newMutedVideos[index] = !newMutedVideos[index];
      return newMutedVideos;
    });
  };

  // Handle file selection
  const handleFileChange = (event) => {
    setSelectedFiles(event.target.files);
  };

  // Function to handle media upload and update
  const handleProfileImagesUpload = async () => {
    setShowLoader(true);
    if (!selectedFiles || currentEditIndex === null) return;

    try {
      // Upload selected files
      const formData = new FormData();
      formData.append("myFile", selectedFiles[0]); // Uploading only the first file for simplicity

      const uploadResponse = await axios.post(
        "https://api.profilegenie.in/api/client/upload-brand-media",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const newUrl = uploadResponse.data; // Assume the URL of the uploaded file is returned

      // Send PUT request to update the specific index in the gallery
      const token = localStorage.getItem("token");
      const response = await axios.put(
        `https://api.profilegenie.in/api/client/edit-media/${currentEditIndex}`,
        { newUrl },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        // Update the local gallery state to reflect changes
        const updatedGallery = [...gallery];
        updatedGallery[currentEditIndex] = newUrl;
        setGallery(updatedGallery);

        setEditPopUp(false); // Close the popup after successful upload
        setShowLoader(false);
        setSelectedFiles(null); // Clear selected files
        setCurrentEditIndex(null); // Clear index after upload
      }
    } catch (error) {
      console.error(
        "Error updating media:",
        error.response ? error.response.data : error.message
      );
    }
  };

  // Function to check if the URL is a video
  const isVideo = (url) => {
    const videoFormats = ["mp4", "mov", "avi", "wmv", "flv"];
    const extension = url?.split(".").pop();
    return videoFormats.includes(extension);
  };

  // Fill gallery with empty grid cells if less than 13 images
  const filledGallery = [...gallery];
  while (filledGallery.length < 13) {
    filledGallery.push(null); // Add empty entries to ensure at least 13 items
  }

  return (
    <div className="py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl sm:text-6xl font-bold text-center">Edit Gallery</h1>
        <div className="w-40 h-1 bg-c1 mx-auto mb-12"></div>

        {/* Grid container for images or plus icons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 auto-rows-[minmax(150px, 1fr)]">
          {filledGallery.map((item, index) => (
            <div
              key={index}
              onClick={() => {
                setCurrentEditIndex(index);
                setEditPopUp(true);
              }}
              className={`relative flex justify-center items-center border border-2   rounded-xl  
                ${index === 0 ? "md:col-span-2 md:row-span-2" : index === 1 ? "md:row-span-2  " : index === 10 ? "md:col-span-2 md:row-span-2 " : "h-40"} h-full`}
            >
              {item ? (
                isVideo(item) ? (
                  <video
                    src={item}
                    className="w-full h-[470px] object-cover  rounded-xl "
                    controls
                    muted={mutedVideos[index]}
                    onClick={() => toggleMute(index)}
                  />
                ) : (
                  <img
                    src={item}
                    alt={`Gallery ${index}`}
                    className="w-full h-52 object-cover rounded-xl"
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
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                </svg>
              )}
            </div>
          ))}
        </div>

        {/* Popup for file upload */}
        {editPopUp && (
          <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h2 className="text-xl font-bold mb-4">Upload New Media</h2>
              <input
                type="file"
                accept="image/*, video/*"
                onChange={handleFileChange}
                className="mb-4"
              />
              <button
                className="bg-black text-white px-4 py-2 rounded"
                onClick={handleProfileImagesUpload}
              >
                {showLoader ? "Uploading.." : "Upload"}
              </button>
              <button
                className="ml-4 bg-gray-300 px-4 py-2 rounded"
                onClick={() => setEditPopUp(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminGallery;
