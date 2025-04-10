import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import axios from "axios";
import { useParams } from "react-router-dom";

const socialMediaIcons = {
  facebook: "https://img.icons8.com/fluent/30/000000/facebook-new.png",
  twitter: "https://img.icons8.com/fluent/30/000000/twitter.png",
  linkedin: "https://img.icons8.com/fluent/30/000000/linkedin.png",
  instagram: "https://img.icons8.com/fluent/30/000000/instagram-new.png",
  website: "https://img.icons8.com/?size=100&id=9918&format=png&color=000000",
  google: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFwAAABcCAMAAADUMSJqAAABJlBMVEX///8Aqkv/QDEAhvn/vQAAffipy/wAhPhTmvn1+v8iifgAh/j/twD/Oyr/ugAAqEb/r6oApTwAojT/9PL/pqH/ZVv/Lxv/IwX/vbr/OCX/s6//KRH/+ev/wwD//fP/7Mb/3pj/y1r/viv/xDn/ykzj8+kurFOd2bf/z83/dGv/WU//Rz3/bGX/nZj/6+n/393/gHn/iYL/bG//9dn/mgD/z27/UzD/cyb/MTP/4af/lh3/k43/rBD/ZSr/hB3/v2zo8f3/57YAdPeRvPt4qvpHk/lno/qGs/rdy3Gasi7F2/1arETXuBm2tyV8yZZ6sDrG59HrvAjFsgBTvoHY5vyS0aZEsWMAnnYAi94AqzEAlbuz3b4Ano8AqFwAh+kAj80AlJhqw3oIki7+AAADCElEQVRoge2WaXeaQBSGoczEbDhCFURiuiQB45amadp0T2OT7jatlTa16///Ex0QZUDB60hOe055vuSD5OH6zr13FISMjIyMjP+Oq5TL0NaKu/XGFVm+0qg3W7UUX9EulHTdoGIPWTZMvV5sp6Leu2WYvjdA1ozdvYXV7V3diJqHGHpzQX0rTu2Vr7cWKbuhxatdtAZ39GVtIuvJ7Gt87oI+S+2icwXfArnNAo+7CKuby12edMuGRjHYc9ArPO52tE1k06zvFyuVwn7JHM8UX91CI9wnstYsB/uk3By2EV/dQitcuFmKtMReyeQ9S6EdClw2p1RYMTkzEW6zMy83pnZyjdN9cOeIdad7Pxyi/N2RXpbTWdwjNvIIVe/5dpNzd8Rxn8pR9YFn1x6m6xa2kUv1kZdKyu7NdTSk+vhI42yJWK6N5Kj65CjtXxLX82hsfxr5bGUpnmOI/MbYjdafReU5HMfJEkS+xcg3ovLVnBQD7kDkNwN5PvpZgjz3HODeDCJHW3D5Wm4ZIN9g5NvzyE//tpw7Foic80Bhmc9oxbhmkXJnEHniEK3lwjDyFxA5M/7oZVS+HOY0iAWDJjRYXOiVuJP87BJeG9nxa4h8vHLRG1Gxk589C3LBxxC5f1mgtyKFJD65gqVx5asg9/CaQ+9ct6h0k57sBHLQahH8GX1veXJRPU8sXJovcsph/oOvdoOJP1MmcQmvAOUHH8UAYsXZO0GrgFOh9Ahrj+nHDhOKdPIJLN9RRdauTmnIzTOmbgm2WHz6CmsXVSd6rDb5zO4wDC+cYhExXLwzYL5Y31KJIn4Z5QLciMH/h4Jx9YrqdPu2bXd7oqq4ryYXX0d2cKv4DKJ2aiMKhQTf6eIb9qKB7SwWe9I+gfL9B7Vj0LIN0wfYifITY9AtwVO7ePFrvsMcM1DITLn6m89Ne8ZSktVT5wtMX00qfnK45iy+F6tXZt1TID2Z4ieqtbja09uOSqfSHx/6V1FJd7FAwv7zfs+xqJdYjtMdzPhRwPmOnUvRZmRkZGT82/wBKkFOoNs0eYQAAAAASUVORK5CYII=",
  link1: "https://img.icons8.com/?size=100&id=9918&format=png&color=000000",
  link2: "https://img.icons8.com/?size=100&id=9918&format=png&color=000000",
  link3: "https://img.icons8.com/?size=100&id=9918&format=png&color=000000",

};

const PortfolioForm = () => {
  const { templateId } = useParams();
  // const templateId = "2";
  const [popup, setPopUp] = useState(false);
  const [services, setServices] = useState([]);
  const [links, setLinks] = useState([])
  const [products, setProducts] = useState([]);
  const [socialMediaLinks, setSocialMediaLinks] = useState({});
  const [testimonials, setTestimonials] = useState([]);
  const [profileImage, setProfileImage] = useState(null);
  const [websiteLogo, setWebsiteLogo] = useState(null);
  const [link1Logo, setLink1Logo] = useState(null);
  const [link2Logo, setLink2Logo] = useState(null);
  const [link3Logo, setLink3Logo] = useState(null);
  const navigate = useNavigate();
  const [showLoader, setShowLoader] = useState(false);
  const [paragraphs, setParagraphs] = useState([{ id: 1, content: "" }]);

  const addParagraph = () => {
    setParagraphs([
      ...paragraphs,
      { id: paragraphs.length + 1, content: "" }
    ]);
  };

  const handleInputChange = (id, value) => {
    setParagraphs((prev) =>
      prev.map((para) =>
        para.id === id ? { ...para, content: value } : para
      )
    );
  };

  // console.log(links)

  // Function to get default colors based on condition
  const getDefaultColors = () => {
    if (templateId === "1") {
      return {
        backgroundColor: "#EDE9FE",
        primaryTextColor: "#6B7280",
        secondaryTextColor: "#F43F5E",
        buttonBgColor: "#0891B2",
      };
    } else if (templateId === "3") {
      return {

        backgroundColor: "#000000",
        primaryTextColor: "#EAB308",
        secondaryTextColor: "#1A1A1A",
        // buttonBgColor: "#f97316",
      };
    } else {
      return {
        backgroundColor: "#FF00FF",
        primaryTextColor: "#FFFF00",
        secondaryTextColor: "#FF0000",
        buttonBgColor: "#0000FF",
      };
    }
  };

  // Initialize state with default colors
  const {
    backgroundColor: initialBgColor,
    primaryTextColor: initialPrimaryTextColor,
    secondaryTextColor: initialSecondaryTextColor,
    buttonBgColor: initialButtonBgColor,
  } = getDefaultColors();

  const [backgroundColor, setBackgroundColor] = useState(initialBgColor);
  const [primaryTextColor, setPrimaryTextColor] = useState(
    initialPrimaryTextColor
  );
  const [secondaryTextColor, setSecondaryTextColor] = useState(
    initialSecondaryTextColor
  );
  const [buttonBgColor, setButtonBgColor] = useState(initialButtonBgColor);

  const getTemplateDetails = (id) => {
    switch (id) {
      case "1":
        return "Template 1 Details";
      case "2":
        return "Template 2 Details";
      case "3":
        return "Template 3 Details";
      default:
        return "Unknown Template";
    }
  };

  const handleProfileImageUpload = async (file) => {
    try {
      const formData = new FormData();
      formData.append("myFileImage", file);
      const response = await axios.post(
        "https://api.profilegenie.in/api/admin/upload-profile-pic",
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

      return response.data;
    } catch (error) {
      console.error("Error uploading profile image:", error);
      return null;
    }
  };

  const handleProductImageUpload = async (file) => {
    try {
      const formData = new FormData();
      formData.append("myProductImage", file);
      const response = await axios.post(
        "https://api.profilegenie.in/api/admin/upload-product-image",
        formData
      );

      if (!response.data) {
        throw new Error("Error uploading product image");
      }

      return response.data; // Return the URL of the uploaded image
    } catch (error) {
      console.error("Error uploading product image:", error);
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

    let websiteLogoUrl = null;
    if (websiteLogo) {
      websiteLogoUrl = await handleProfileImageUpload(websiteLogo);
    }

    let link1LogoUrl = null;
    if (link1Logo) {
      link1LogoUrl = await handleProfileImageUpload(link1Logo);
    }

    let link2LogoUrl = null
    if (link2Logo) {
      link2LogoUrl = await handleProfileImageUpload(link2Logo);
    }

    let link3LogoUrl = null
    if (link3Logo) {
      link3LogoUrl = await handleProfileImageUpload(link3Logo);
    }

    const updatedProducts = await Promise.all(
      products.map(async (product) => {
        let productImageUrl = product.image;
        if (product.image && product.image instanceof File) {
          productImageUrl = await handleProductImageUpload(product.image);
        }
        return {
          productName: product.productName,
          productDescription: product.productDescription,
          productImage: productImageUrl,
        };
      })
    );

    // Handle brand image uploads
    const updatedBrands = brands.map((brand) => ({
      brandName: brand.brandName,
      brandImage: brand.brandImage,
    }));

    const payload = {
      name: formData.get("full-name"),
      uniqueUserName: formData.get("userName"),
      tagline: formData.get("tagline"),
      aboutHead: formData.get("aboutHead"),
      serviceTagline: formData.get("serviceTagline"),
      aboutContent: paragraphs,
      profileImage: profileImageUrl,
      websiteLogo: websiteLogoUrl,
      link1Logo: link1LogoUrl,
      link2Logo: link2LogoUrl,
      link3Logo: link3LogoUrl,
      services: services,
      bulkLinks: links,
      products: updatedProducts, // Ensure products array contains productName, productDescription, and productImage
      email: formData.get("email"),
      phone: formData.get("phone"),
      address: formData.get("address"),
      aboutMeBrands: updatedBrands,
      testimonials: testimonials,
      facebook: socialMediaLinks.facebook,
      twitter: socialMediaLinks.twitter,
      linkedin: socialMediaLinks.linkedin,
      instagram: socialMediaLinks.instagram,
      website: socialMediaLinks.website,
      google: socialMediaLinks.google,
      link1: socialMediaLinks.link1,
      link2: socialMediaLinks.link2,
      link3: socialMediaLinks.link3,
      bgColor: backgroundColor,
      primaryTextColor: primaryTextColor,
      secondaryTextColor: secondaryTextColor,
      buttonColor: buttonBgColor,
      portfolioId: templateId,
      googleMapLink: formData.get("googleMapLink"),
      documentGoogleDriveLink: formData.get("documentGoogleDriveLink")
    };


    try {

      console.log(payload)

      const token = localStorage.getItem("token");
      const response = await axios.post(
        "https://api.profilegenie.in/api/admin/create-portfolio",
        payload,
        {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          },
        }
      );

      console.log("portfolio created successfully", response.data);

      setPopUp(true);
      setShowLoader(false);
    } catch (error) {
      console.error("Error:", error);
      setShowLoader(false);
    }
  };

  const handleBackgroundColorChange = (e) => {
    setBackgroundColor(e.target.value);
  };

  const addService = () => {
    setServices([...services, { heading: "", description: "" }]);
  };

  const addLinks = () => {
    setLinks([...links, { heading: "", description: "" }]);
  }


  const handleServiceChange = (index, field, value) => {
    const updatedServices = [...services];
    updatedServices[index][field] = value;
    setServices(updatedServices);
  };

  const handleLinkChange = (index, field, value) => {
    const updatedLinks = [...links];
    updatedLinks[index] = {
      ...updatedLinks[index],
      [field]: value,
    };
    setLinks(updatedLinks);

  }

  const handlePrimaryTextColorChange = (e) => {
    setPrimaryTextColor(e.target.value);
  };

  const handleSecondaryTextColorChange = (e) => {
    setSecondaryTextColor(e.target.value);
  };

  const handleButtonBgColor = (e) => {
    setButtonBgColor(e.target.value);
  };

  const handleSocialMediaLinkChange = (platform, value) => {
    setSocialMediaLinks({
      ...socialMediaLinks,
      [platform]: value,
    });
  };

  const removeService = (index) => {
    const updatedServices = [...services];
    updatedServices.splice(index, 1);
    setServices(updatedServices);
  };

  const removelink = (index) => {
    const updatedLinks = [...links];
    updatedLinks.splice(index, 1)
    setLinks(updatedLinks)

  }

  const addProduct = () => {
    setProducts([...products, { heading: "", description: "", image: null }]);
  };

  const handleProductChange = (index, field, value) => {
    const updatedProducts = [...products];
    updatedProducts[index] = {
      ...updatedProducts[index],
      [field]: value,
    };
    setProducts(updatedProducts);
  };

  const handleProductImageChange = (index, e) => {
    const file = e.target.files[0];
    const updatedProducts = [...products];
    updatedProducts[index].image = file;
    setProducts(updatedProducts);
  };

  const removeProduct = (index) => {
    const updatedProducts = [...products];
    updatedProducts.splice(index, 1);
    setProducts(updatedProducts);
  };

  const handleProfileImageChange = (e) => {
    const file = e.target.files[0];
    setProfileImage(file);
  };

  const handleWebsiteLogoChange = (e) => {
    const file = e.target.files[0];
    setWebsiteLogo(file);
  };

  const handleLinkLogoChange = (link, e) => {
    const file = e.target.files[0];
    if (link === "link1") {
      setLink1Logo(file);
    }

    if (link === "link2") {
      setLink2Logo(file);
    }

    if (link === "link3") {
      setLink3Logo(file);
    }
  };

  const addTestimonial = () => {
    setTestimonials([...testimonials, { clientName: "", mainTestimonial: "" }]);
  };

  const handleTestimonialChange = (index, field, value) => {
    const updatedTestimonials = [...testimonials];
    updatedTestimonials[index][field] = value;
    setTestimonials(updatedTestimonials);
  };

  const removeTestimonial = (index) => {
    const updatedTestimonials = [...testimonials];
    updatedTestimonials.splice(index, 1);
    setTestimonials(updatedTestimonials);
  };

  // our brands

  const [brands, setBrands] = useState([{ brandName: "", brandImage: "" }]);

  const handleImageUpload = async (index, file) => {
    const imageUrl = await handleProfileImageUpload(file);
    if (imageUrl) {
      const newBrands = [...brands];
      newBrands[index].brandImage = imageUrl;
      setBrands(newBrands);
    }
  };

  const handleBrandChange = (index, field, value) => {
    const newBrands = [...brands];
    newBrands[index][field] = value;
    setBrands(newBrands);
  };

  const addBrand = () => {
    setBrands([...brands, { brandName: "", brandImage: null }]);
  };

  const removeBrand = (index) => {
    const newBrands = brands.filter((_, i) => i !== index);
    setBrands(newBrands);
  };




  return (
    <>

      <h1>Form is from {templateId}</h1>
      <div className="">
        <div className="relative m-4 bg-white border rounded-lg shadow md:m-10 col-span-full md:col-span-full w-3/3">
          <div className="flex items-start justify-between p-5 border-b rounded-t w-full bg-[#2C1E4A]">
            <h3 className="mx-auto text-2xl font-semibold text-center text-gray-100 uppercase">Create Profile</h3>
            {/*    <h1 className="py-4 text-2xl font-bold text-center">
              Create Portfolio for {getTemplateDetails(templateId)}
            </h1>
            */}
          </div>
          <div className="p-6 space-y-6">
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-6 gap-6">
                <div className="col-span-6 sm:col-span-3">
                  <label
                    htmlFor="full-name"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="full-name"
                    id="full-name"
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                  />
                </div>
                <div className="col-span-6 sm:col-span-3">
                  <label
                    htmlFor="full-name"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    UserName
                  </label>
                  <input
                    type="text"
                    name="userName"
                    id="useName"
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                  />
                </div>
                <div className="col-span-6 sm:col-span-3">
                  <label
                    htmlFor="person-image"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Upload Your Image
                  </label>
                  <input
                    type="file"
                    name="image"
                    id="image"
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                    onChange={handleProfileImageChange}
                  />
                </div>
                <div className="col-span-full">
                  <label
                    htmlFor="tagline"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Tagline
                  </label>
                  <input
                    type="text"
                    name="tagline"
                    id="tagline"
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                  />
                </div>

                <div className="col-span-full">
                  <h4 className="block mb-2 text-lg font-medium text-gray-900">
                    About
                  </h4>
                  <div className="mb-2 col-span-full">
                    <label
                      htmlFor="aboutHead"
                      className="block mb-2 text-sm font-medium text-gray-900"
                    >
                      About Head
                    </label>
                    <input
                      type="text"
                      name="aboutHead"
                      placeholder="Enter about head..."
                      id="aboutHead"
                      className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                    />
                  </div>
                  <div>
                    {paragraphs.map((para) => (
                      <div key={para.id} className="mb-4">
                        <label
                          htmlFor={`para-${para.id}`}
                          className="block mb-2 text-sm font-medium text-gray-900"
                        >
                          About Para {para.id}
                        </label>
                        <textarea
                          id={`para-${para.id}`}
                          name={`aboutPara${para.id}`}
                          rows="6"
                          value={para.content}
                          onChange={(e) => handleInputChange(para.id, e.target.value)}
                          className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-sm focus:ring-cyan-600 focus:border-cyan-600"
                          placeholder={`Summary for Para ${para.id}`}
                        ></textarea>
                      </div>
                    ))}

                    <button
                      type="button"
                      onClick={addParagraph}
                      className="px-4 py-2 text-white rounded-lg bg-cyan-600 hover:bg-cyan-700 focus:ring-4 focus:ring-cyan-300"
                    >
                      Add Paragraph
                    </button>
                  </div>

                </div>

                <div className="col-span-full">
                  <h4 className="block mb-2 text-lg font-medium text-gray-900">
                    About Me Brands
                  </h4>
                  {brands.map((brand, index) => (
                    <div key={index} className="mb-4 space-y-4">
                      <input
                        type="text"
                        value={brand.brandName}
                        onChange={(e) =>
                          handleBrandChange(index, "brandName", e.target.value)
                        }
                        placeholder="Brand Name"
                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                      />
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) =>
                          handleImageUpload(index, e.target.files[0])
                        }
                        className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
                      />
                      <button
                        type="button"
                        onClick={() => removeBrand(index)}
                        className="text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:ring-cyan-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                      >
                        Remove Brand
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={addBrand}
                    className="text-white bg-[#2C1E4A] focus:ring-4 focus:ring-cyan-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                  >
                    Add Brand
                  </button>
                </div>

                <div className="col-span-full">
                  <h4 className="block mb-2 text-lg font-medium text-gray-900">
                    Bulk Links
                  </h4>
                  {links.map((link, index) => (
                    <div key={index} className="mb-4 space-y-4">
                      <input
                        type="text"
                        value={link.heading}
                        onChange={(e) =>
                          handleLinkChange(index, "heading", e.target.value)
                        }
                        placeholder="Link Name"
                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                      />
                      <textarea
                        value={link.description}
                        onChange={(e) =>
                          handleLinkChange(
                            index,
                            "description",
                            e.target.value
                          )
                        }
                        rows="4"
                        placeholder="Link Url"
                        className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-sm focus:ring-cyan-600 focus:border-cyan-600"
                      ></textarea>
                      <button
                        type="button"
                        onClick={() => removelink(index)}
                        className="text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:ring-cyan-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                      >
                        Remove Bulk Links
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={addLinks}
                    className="text-white bg-[#2C1E4A]  focus:ring-4 focus:ring-cyan-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                  >
                    Add Bulk Links
                  </button>
                </div>



                <div className="col-span-full">
                  <h4 className="block mb-2 text-lg font-medium text-gray-900">
                    Services
                  </h4>
                  <div className="mb-3 col-span-full">
                    <label
                      htmlFor="serviceTagline"
                      className="block mb-2 text-sm font-medium text-gray-900"
                    >
                      Service Tagline
                    </label>
                    <input
                      type="text"
                      name="serviceTagline"
                      id="serviceTagline"
                      placeholder="Enter service tagline"
                      className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                    />
                  </div>
                  {services.map((service, index) => (
                    <div key={index} className="mb-4 space-y-4">
                      <input
                        type="text"
                        value={service.heading}
                        onChange={(e) =>
                          handleServiceChange(index, "heading", e.target.value)
                        }
                        placeholder="Service Heading"
                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                      />
                      <textarea
                        value={service.description}
                        onChange={(e) =>
                          handleServiceChange(
                            index,
                            "description",
                            e.target.value
                          )
                        }
                        rows="4"
                        placeholder="Service Description"
                        className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-sm focus:ring-cyan-600 focus:border-cyan-600"
                      ></textarea>
                      <button
                        type="button"
                        onClick={() => removeService(index)}
                        className="text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:ring-cyan-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                      >
                        Remove Service
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={addService}
                    className="text-white bg-[#2C1E4A]  focus:ring-4 focus:ring-cyan-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                  >
                    Add Service
                  </button>
                </div>

                <div className="col-span-full">
                  <h4 className="block mb-2 text-lg font-medium text-gray-900">
                    Products
                  </h4>
                  {products.map((product, index) => (
                    <div key={index} className="mb-4 space-y-4">
                      <input
                        type="text"
                        value={product.productName || ""}
                        onChange={(e) =>
                          handleProductChange(
                            index,
                            "productName",
                            e.target.value
                          )
                        }
                        placeholder="Product Name"
                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                      />
                      <textarea
                        value={product.productDescription || ""}
                        onChange={(e) =>
                          handleProductChange(
                            index,
                            "productDescription",
                            e.target.value
                          )
                        }
                        rows="4"
                        placeholder="Product Description"
                        className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-sm focus:ring-cyan-600 focus:border-cyan-600"
                      ></textarea>
                      <input
                        type="file"
                        onChange={(e) => handleProductImageChange(index, e)}
                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                      />
                      <button
                        type="button"
                        onClick={() => removeProduct(index)}
                        className="text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:ring-cyan-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                      >
                        Remove Product
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={addProduct}
                    className="text-white bg-[#2C1E4A] focus:ring-4 focus:ring-cyan-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                  >
                    Add Product
                  </button>
                </div>

                <div className="col-span-full">
                  <h4 className="block mb-2 text-lg font-medium text-gray-900">
                    Testimonials
                  </h4>
                  {testimonials.map((testimonial, index) => (
                    <div key={index} className="mb-4 space-y-4">
                      <input
                        type="text"
                        value={testimonial.clientName}
                        onChange={(e) =>
                          handleTestimonialChange(
                            index,
                            "clientName",
                            e.target.value
                          )
                        }
                        placeholder="Client Name"
                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                      />
                      <textarea
                        value={testimonial.mainTestimonial}
                        onChange={(e) =>
                          handleTestimonialChange(
                            index,
                            "mainTestimonial",
                            e.target.value
                          )
                        }
                        rows="4"
                        placeholder="Testimonial Message"
                        className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-sm focus:ring-cyan-600 focus:border-cyan-600"
                      ></textarea>
                      <button
                        type="button"
                        onClick={() => removeTestimonial(index)}
                        className="text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:ring-cyan-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                      >
                        Remove Testimonial
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={addTestimonial}
                    className="text-white bg-[#2C1E4A]  focus:ring-4 focus:ring-cyan-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                  >
                    Add Testimonial
                  </button>
                </div>

                <div className="col-span-full">
                  <h4 className="block mb-2 text-lg font-medium text-gray-900">
                    Social Media Links
                  </h4>
                  <div className="col-span-6 sm:col-span-3">
                    <label
                      htmlFor="person-image"
                      className="block mb-2 text-sm font-medium text-gray-900"
                    >
                      Upload Website Logo
                    </label>
                    <input
                      type="file"
                      name="image"
                      id="image"
                      className="shadow-sm mb-4 bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                      onChange={handleWebsiteLogoChange}
                    />
                  </div>
                  {Object.keys(socialMediaIcons).map((platform) => (
                    <div key={platform} className="flex flex-col mb-4">
                      {['link1', 'link2', 'link3'].includes(platform) ? (
                        <div>
                          <label
                            htmlFor={`${platform}-logo`}
                            className="block mb-2 text-sm font-medium text-gray-900"
                          >
                            Upload {platform.charAt(0).toUpperCase() + platform.slice(1)} Logo
                          </label>
                          <div className="flex items-center">
                            <img
                              src={socialMediaIcons[platform]}
                              alt={`${platform} icon`}
                              className="w-10 mr-2"
                            />
                            <input
                              type="file"
                              id={`${platform}-logo`}
                              name={`${platform}-logo`}
                              onChange={(e) => handleLinkLogoChange(platform, e)}
                              accept="image/*"
                              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                            />
                          </div>
                          <input
                            type="text"
                            name={`social-media-link-${platform}`}
                            value={socialMediaLinks[platform] || ""}
                            onChange={(e) =>
                              handleSocialMediaLinkChange(platform, e.target.value)
                            }
                            placeholder={`${platform.charAt(0).toUpperCase() + platform.slice(1)} url`}
                            className="shadow-sm bg-gray-50 border w-full mt-2 border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 flex-grow p-2.5"
                          />
                        </div>
                      ) : (
                        <div className="flex items-center">
                          <img
                            src={socialMediaIcons[platform]}
                            alt={`${platform} icon`}
                            className="w-10 mr-2"
                          />
                          <input
                            type="text"
                            name={`social-media-link-${platform}`}
                            value={socialMediaLinks[platform] || ""}
                            onChange={(e) =>
                              handleSocialMediaLinkChange(platform, e.target.value)
                            }
                            placeholder={`${platform.charAt(0).toUpperCase() + platform.slice(1)} Link`}
                            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 flex-grow p-2.5"
                          />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
                <div className="col-span-full">
                  <h4 className="block mb-2 text-lg font-medium text-gray-900">
                    Contact Us
                  </h4>
                  <div className="mb-4">
                    <label
                      htmlFor="address"
                      className="block mb-2 text-sm font-medium text-gray-900"
                    >
                      Address
                    </label>
                    <input
                      type="text"
                      name="address"
                      id="address"
                      className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                    />
                  </div>

                  <div className="mb-4 col-span-full">
                    <label
                      htmlFor="googleMapLink"
                      className="block mb-2 text-sm font-medium text-gray-900"
                    >
                      googleMapLink
                    </label>
                    <input
                      type="text"
                      name="googleMapLink"
                      id="googleMapLink"
                      className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                    />
                  </div>

                  <div className="mb-4">
                    <label
                      htmlFor="email"
                      className="block mb-2 text-sm font-medium text-gray-900"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor="phone"
                      className="block mb-2 text-sm font-medium text-gray-900"
                    >
                      Phone
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      id="phone"
                      className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                    />
                  </div>
                  <div className="mb-4 col-span-full">
                    <label
                      htmlFor="documentGoogleDriveLink"
                      className="block mb-2 text-sm font-medium text-gray-900"
                    >
                      Drive Link
                    </label>
                    <input
                      type="text"
                      name="documentGoogleDriveLink"
                      id="documentGoogleDriveLink"
                      className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                    />
                  </div>

                  <div className="mb-4">
                    <label
                      htmlFor="backgroundColor"
                      className="block mb-2 text-sm font-medium text-gray-900"
                    >
                      Select Background Color
                    </label>
                    <input
                      type="color"
                      id="backgroundColor"
                      name="backgroundColor"
                      value={backgroundColor}
                      onChange={handleBackgroundColorChange}
                      className="cursor-pointer"
                    />
                  </div>

                  <div className="mb-4">
                    <label
                      htmlFor="primaryTextColor"
                      className="block mb-2 text-sm font-medium text-gray-900"
                    >
                      Select Primary Text Color
                    </label>
                    <input
                      type="color"
                      id="primaryTextColor"
                      name="primaryTextColor"
                      value={primaryTextColor}
                      onChange={handlePrimaryTextColorChange}
                      className="cursor-pointer"
                    />
                  </div>

                  <div className="mb-4">
                    <label
                      htmlFor="secondaryTextColor"
                      className="block mb-2 text-sm font-medium text-gray-900"
                    >
                      Select Secondary Text Color
                    </label>
                    <input
                      type="color"
                      id="secondaryTextColor"
                      name="secondaryTextColor"
                      value={secondaryTextColor}
                      onChange={handleSecondaryTextColorChange}
                      className="cursor-pointer"
                    />
                  </div>

                  <div className="mb-4">
                    <label
                      htmlFor="secondaryTextColor"
                      className="block mb-2 text-sm font-medium text-gray-900"
                    >
                      Select Button Colors
                    </label>
                    <input
                      type="color"
                      id="buttonBgColor"
                      name="buttonBgColor"
                      value={buttonBgColor}
                      onChange={handleButtonBgColor}
                      className="cursor-pointer"
                    />
                  </div>
                </div>
              </div>
              <div className="p-6 border-t border-gray-200 rounded-b">
                <button
                  className="text-white bg-[#2C1E4A] focus:ring-4 w-full focus:ring-cyan-200 font-medium rounded-lg text-sm px-5 py-3 text-center"
                  type="submit"
                  disabled={showLoader}
                >
                  {showLoader ? (
                    <svg
                      aria-hidden="true"
                      className="inline w-4 h-4 text-gray-200 animate-spin fill-blue-600"
                      viewBox="0 0 100 101"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                        fill="currentColor"
                      />
                      <path
                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                        fill="currentFill"
                      />
                    </svg>
                  ) : (
                    <span className="relative z-10">Submit</span>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
        {/* <div className="mt-10 ml-10 mr-10 md:ml-0">
                    <img src={img} alt="Portfolio" />
                </div> */}
      </div>

      {popup && (
        <div id="YOUR_ID" className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>

            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
              &#8203;
            </span>

            <div
              className="inline-block px-4 pt-5 pb-4 overflow-hidden text-left align-bottom transition-all transform bg-white rounded-lg shadow-xl sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6"
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-headline"
            >
              <div className="absolute top-0 right-0 hidden pt-4 pr-4 sm:block">
                <button
                  onClick={() => setPopUp(false)}
                  type="button"
                  data-behavior="cancel"
                  className="text-gray-400 bg-white rounded-md hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  <span className="sr-only">Close</span>
                  <svg
                    className="w-6 h-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
              <div className="sm:flex sm:items-start">
                <div className="flex items-center justify-center flex-shrink-0 w-12 h-12 mx-auto bg-blue-100 rounded-full sm:mx-0 sm:h-10 sm:w-10">
                  <svg
                    className="w-6 h-6 text-blue-600"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                    />
                  </svg>
                </div>
                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                  <h3
                    className="text-lg font-medium leading-6 text-gray-900"
                    id="modal-headline"
                  >
                    Portfolio has been created sucessfully
                  </h3>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">Thank you!!</p>
                  </div>
                </div>
              </div>
              <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  data-behavior="commit"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-[#2C1E4A] text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={() => setPopUp(false)}
                >
                  okk
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PortfolioForm;
