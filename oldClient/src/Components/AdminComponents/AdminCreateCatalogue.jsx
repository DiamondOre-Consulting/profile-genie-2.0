import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AdminCreateCatalogue = () => {
  const [popup, setPopUp] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const [showLoader, setShowLoader] = useState(false);
  const navigate = useNavigate();

  const handleProfileImageUpload = async (file) => {

    try {
      const formData = new FormData();
      formData.append("myFile", file); // Use 'myFile' to match the backend key

      const response = await axios.post(
        "https://api.profilegenie.in/api/client/upload-brand-media",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (!response.data) {
        throw new Error("Error uploading profile image");
      }

      return response.data; // URL of the uploaded image
    } catch (error) {
      console.error("Error uploading profile image:", error);
      return null;
    }
  };

  const handleSubmit = async (e) => {
    setShowLoader(true);
    e.preventDefault();

    const formData = new FormData(e.target);
    let profileImageUrl = null;

    if (profileImage) {
      profileImageUrl = await handleProfileImageUpload(profileImage);
    }

    const payload = {
      templateId: formData.get("templateId"),
      name: formData.get("name"),
      userName: formData.get("userName"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      password: formData.get("password"),
      brand: {
        brandName: formData.get("brandName"),
        brandLogo: profileImageUrl, // URL of the uploaded logo
        brandTagline: formData.get("brandTagline"),
        brandDescription: formData.get("brandDescription"),
        brandWebsite: formData.get("brandWebsite"),
        brandAddress: formData.get("brandAddress"),
        brandSocials: {
          instagram: formData.get("brandSocials.instagram"),
          facebook: formData.get("brandSocials.facebook"),
          youtube: formData.get("brandSocials.youtube"),
          twitter: formData.get("brandSocials.twitter"),
          linkedIn: formData.get("brandSocials.linkedIn"),
        },
      },
    };

    try {
      const response = await axios.post(
        // link route change
        "https://api.profilegenie.in/api/client/register-client",
        payload,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Client registered successfully:", response.data);
      setPopUp(true);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setShowLoader(false);
    }
  };

  const handleProfileImageChange = (e) => {
    const file = e.target.files[0];
    setProfileImage(file);
  };

  return (
    <>
      <div className="bg-white border rounded-lg shadow relative m-4 md:m-10 w-[1000px]">
        <div className="flex items-start justify-between p-5 border-b rounded-t w-full bg-[#2C1E4A]">
          <h3 className="text-2xl font-semibold text-center mx-auto uppercase text-gray-100">
            Create Catalogue
          </h3>
        </div>
        <div className="p-6 space-y-6">
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-6 gap-6">
              {/* Template ID */}
              <div className="col-span-6 sm:col-span-3">
                <label htmlFor="templateId" className="text-sm font-medium text-gray-900 block mb-2">
                  Template Id
                </label>
                <input
                  type="text"
                  name="templateId"
                  id="templateId"
                  className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                />
              </div>
              {/* Name */}
              <div className="col-span-6 sm:col-span-3">
                <label htmlFor="name" className="text-sm font-medium text-gray-900 block mb-2">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                />
              </div>
              {/* Username */}
              <div className="col-span-6 sm:col-span-3">
                <label htmlFor="userName" className="text-sm font-medium text-gray-900 block mb-2">
                  Username
                </label>
                <input
                  type="text"
                  name="userName"
                  id="userName"
                  className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                />
              </div>
              {/* Email */}
              <div className="col-span-6 sm:col-span-3">
                <label htmlFor="email" className="text-sm font-medium text-gray-900 block mb-2">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                />
              </div>
              {/* Phone */}
              <div className="col-span-6 sm:col-span-3">
                <label htmlFor="phone" className="text-sm font-medium text-gray-900 block mb-2">
                  Phone
                </label>
                <input
                  type="phone"
                  name="phone"
                  id="phone"
                  className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                />
              </div>
              {/* Password */}
              <div className="col-span-6 sm:col-span-3">
                <label htmlFor="password" className="text-sm font-medium text-gray-900 block mb-2">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                />
              </div>
              {/* Brand Name */}
              <div className="col-span-6 sm:col-span-3">
                <label htmlFor="brandName" className="text-sm font-medium text-gray-900 block mb-2">
                  Brand Name
                </label>
                <input
                  type="text"
                  name="brandName"
                  id="brandName"
                  className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                />
              </div>
              {/* Brand Logo */}
              <div className="col-span-6 sm:col-span-3">
                <label htmlFor="image" className="text-sm font-medium text-gray-900 block mb-2">
                  Upload Brand Image
                </label>
                <input
                  type="file"
                  name="image"
                  id="image"
                  className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                  onChange={handleProfileImageChange}
                />
              </div>
              {/* Brand Tagline */}
              <div className="col-span-6 sm:col-span-3">
                <label htmlFor="brandTagline" className="text-sm font-medium text-gray-900 block mb-2">
                  Brand Tagline
                </label>
                <input
                  type="text"
                  name="brandTagline"
                  id="brandTagline"
                  className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                />
              </div>
              {/* Brand Description */}
              <div className="col-span-6 sm:col-span-3">
                <label htmlFor="brandDescription" className="text-sm font-medium text-gray-900 block mb-2">
                  Brand Description
                </label>
                <input
                  type="text"
                  name="brandDescription"
                  id="brandDescription"
                  className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                />
              </div>
              {/* Brand Website */}
              <div className="col-span-6 sm:col-span-3">
                <label htmlFor="brandWebsite" className="text-sm font-medium text-gray-900 block mb-2">
                  Brand Website
                </label>
                <input
                  type="text"
                  name="brandWebsite"
                  id="brandWebsite"
                  className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                />
              </div>
              {/* Brand Address */}
              <div className="col-span-6 sm:col-span-3">
                <label htmlFor="brandAddress" className="text-sm font-medium text-gray-900 block mb-2">
                  Brand Address
                </label>
                <input
                  type="text"
                  name="brandAddress"
                  id="brandAddress"
                  className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                />
              </div>
              {/* Brand Socials */}
              <div className="col-span-6 sm:col-span-3 space-y-2">
                <label htmlFor="brandSocials" className="text-sm font-medium text-gray-900 block mb-2">
                  Brand Socials
                </label>
                <input
                  type="text"
                  name="brandSocials.instagram"
                  placeholder="Instagram"
                  className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5 mb-2"
                />
                <input
                  type="text"
                  name="brandSocials.facebook"
                  placeholder="Facebook"
                  className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5 mb-2"
                />
                <input
                  type="text"
                  name="brandSocials.youtube"
                  placeholder="YouTube"
                  className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5 mb-2"
                />
                <input
                  type="text"
                  name="brandSocials.twitter"
                  placeholder="Twitter"
                  className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5 mb-2"
                />
                <input
                  type="text"
                  name="brandSocials.linkedIn"
                  placeholder="LinkedIn"
                  className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                />
              </div>
            </div>
            <button
              type="submit"
              className="w-full py-2.5 px-5 mt-8 text-sm font-medium text-center text-white rounded-lg bg-[#2C1E4A] hover:bg-[#4B2A6A] focus:ring-4 focus:ring-cyan-200"
            >
              {showLoader ? (
                <div className="flex justify-center items-center space-x-2">
                  <div className="animate-spin h-5 w-5 border-4 border-t-4 border-cyan-600 rounded-full"></div>
                  <span>Submitting...</span>
                </div>
              ) : (
                "Create Catalogue"
              )}
            </button>
          </form>
        </div>
      </div>

      {popup && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50"
          onClick={() => setPopUp(false)}
        >
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/3 text-center">
            <p className="text-lg font-semibold mb-4">Client Registered Successfully!</p>
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700"

            >
              Ok
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default AdminCreateCatalogue;
