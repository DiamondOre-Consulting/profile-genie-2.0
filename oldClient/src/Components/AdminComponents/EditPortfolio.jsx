import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const EditPortfolio = () => {
  const { uniqueUserName } = useParams();
  // const [toggleActivate, setToggleActivate] = useState("")
  const navigate = useNavigate();
  const [portfolio, setPortfolio] = useState({
    name: "",
    email: "",
    phone: "",
    tagline: "",
    aboutMe: "",
    aboutHead: "About me",
    aboutContent: [],
    uniqueUserName: "",
    profileImage: "",
    services: [], // Initialized as an empty array
    products: [], // Initialized as an empty array
    contact: {
      address: "",
    },
    socialMedias: {
      // Initialize socialMedias here
      facebook: "",
      twitter: "",
      linkedin: "",
      instagram: "",
      website: "",
      google: "",
      link1: "",
      link2: "",
      link3: "",
    },
    websiteLogo: "",
    primaryTextColor: "",
    secondaryTextColor: "",
    bgColor: "",
    buttonColor: "",
    googleMapLink: "",
    serviceTagline: "",
    documentGoogleDriveLink: "",
    testimonials: [], // Initialized as an empty array
    aboutMeBrands: [], // Initialized as an empty array
    bulkLinks: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [popup, setPopup] = useState(false);
  const [showLoader, setShowLoader] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const [websiteLogo, setWebsiteLogo] = useState(null);
  const [link1Logo, setLink1Logo] = useState(null);
  const [link2Logo, setLink2Logo] = useState(null);
  const [link3Logo, setLink3Logo] = useState(null);
  const [paragraphs, setParagraphs] = useState([]);




  // Handle input changes for paragraphs

  const handleInputChange = (id, value) => {
    setParagraphs((prev) =>
      prev.map((para) => (para.id === id ? { ...para, content: value } : para))
    );

    // Update portfolio.aboutContent directly
    setPortfolio((prev) => ({
      ...prev,
      aboutContent: paragraphs.map((para) =>
        para.id === id ? { id: para.id, content: value } : para
      ),
    }));
  };


  console.log(portfolio)

  // Update portfolio.aboutContent when paragraphs change
  const updatePortfolio = () => {
    setPortfolio((prev) => ({
      ...prev,
      aboutContent: paragraphs.map((para) => para),
    }));
  };

  // Add a new paragraph
  const addParagraph = () => {
    const newParagraph = { id: paragraphs.length + 1, content: "" };

    // Update paragraphs state
    setParagraphs((prev) => [...prev, newParagraph]);

    // Safely update portfolio.aboutContent
    setPortfolio((prev) => ({
      ...prev,
      aboutContent: Array.isArray(prev.aboutContent)
        ? [...prev.aboutContent, newParagraph]
        : [newParagraph], // Initialize as array if undefined
    }));
  };


  useEffect(() => {
    if (portfolio?.aboutContent && portfolio.aboutContent.length > 0) {
      setParagraphs([...portfolio.aboutContent]);
    } else if (portfolio.aboutMe) {
      setPortfolio((prev) => ({
        ...prev,
        aboutContent: [{ id: 1, content: portfolio.aboutMe }],
      }));
      setParagraphs([{ id: 1, content: portfolio.aboutMe }]);
    }
  }, [portfolio]);


  console.log(portfolio)


  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        const response = await axios.get(
          `https://api.profilegenie.in/api/admin/portfolio/${uniqueUserName}`
        );
        console.log(response)
        setPortfolio({
          name: response?.data?.name,
          email: response?.data?.email,
          phone: response?.data?.phone,
          tagline: response?.data?.tagline,
          aboutMe: response?.data?.aboutMe,
          aboutHead: response?.data?.aboutMe?.aboutHead || "About Me",
          aboutContent: response?.data?.aboutMe?.aboutContent,
          uniqueUserName: response?.data?.uniqueUserName,
          profileImage: response?.data?.profileImage,
          services: response?.data?.services, // Initialized as an empty array
          products: response?.data?.products, // Initialized as an empty array
          contact: {
            address: response?.data?.contact?.address,
          },
          socialMedias: {
            // Initialize socialMedias here
            facebook: response?.data?.socialMedias?.facebook,
            twitter: response?.data?.socialMedias?.twitter,
            linkedin: response?.data?.socialMedias?.linkedin,
            instagram: response?.data?.socialMedias?.instagram,
            website: response?.data?.socialMedias?.website,
            google: response?.data?.socialMedias?.google,
            link1: response?.data?.socialMedias?.link1,
            link2: response?.data?.socialMedias?.link2,
            link3: response?.data?.socialMedias?.link3,
          },
          primaryTextColor: response?.data?.primaryTextColor,
          secondaryTextColor: response?.data?.secondaryTextColor,
          bgColor: response?.data?.bgColor,
          buttonColor: response?.data?.buttonColor,
          serviceTagline: response?.data?.serviceTagline,
          googleMapLink: response?.data?.googleMapLink,
          documentGoogleDriveLink: response?.data?.documentGoogleDriveLink,
          testimonials: response?.data?.testimonials, // Initialized as an empty array
          aboutMeBrands: response?.data?.aboutMeBrands, // Initialized as an empty array
          bulkLinks: response?.data?.bulkLinks,
          websiteLogo: response?.data?.websiteLogo,
          link1Logo: response?.data?.link1Logo,
          link2Logo: response?.data?.link2Logo,
          link3Logo: response?.data?.link3Logo,
        })

        console.log(response)

        setLoading(false);
      } catch (error) {
        console.log(error)
        setError("Error fetching portfolio data", error);
        setLoading(false);
      }
    };

    fetchPortfolio();
  }, [uniqueUserName]);

  console.log(portfolio)

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

      return response.data; //  Return the URL of the uploaded image
    } catch (error) {
      console.error("Error uploading product image:", error);
      return null;
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "address") {
      setPortfolio((prev) => ({
        ...prev,
        contact: {
          ...prev.contact,
          address: value,
        },
      }));
    } else {
      setPortfolio((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSocialChange = (e) => {
    const { name, value } = e.target;
    setPortfolio((prev) => ({
      ...prev,
      socialMedias: {
        ...prev.socialMedias,
        [name]: value,
      },
    }));
  };

  const handleProfileImageChange = (e) => {
    const file = e.target.files[0];
    setProfileImage(file);
  };

  const handleWebsiteLogoChange = (e) => {
    const file = e.target.files[0];
    setWebsiteLogo(file);
  };

  const handleLink1LogoChange = (e) => {
    const file = e.target.files[0];
    setLink1Logo(file);
  };

  const handleLink2LogoChange = (e) => {
    const file = e.target.files[0];
    setLink2Logo(file);
  };

  const handleLink3LogoChange = (e) => {
    const file = e.target.files[0];
    setLink3Logo(file);
  };

  const handleServiceChange = (index, e) => {
    const { name, value } = e.target;
    const updatedServices = [...portfolio.services];
    updatedServices[index] = { ...updatedServices[index], [name]: value };
    setPortfolio({ ...portfolio, services: updatedServices });
  };

  const handleActivateDeactivate = () => {

    setPortfolio(prevDetails => ({
      ...prevDetails,
      toggleActivate: !prevDetails.toggleActivate
    }))

    console.log(portfolio)


  }
  const handleBulkLinks = (index, e) => {

    const { name, value } = e.target;
    const updatedBulkLinks = [...portfolio.bulkLinks];
    updatedBulkLinks[index] = { ...updatedBulkLinks[index], [name]: value };
    setPortfolio({ ...portfolio, bulkLinks: updatedBulkLinks })
    console.log(portfolio.bulkLinks)

  }

  const handleProductChange = (index, e) => {
    const { name, value } = e.target;
    if (name === "productImage") {
      handleProductImageChange(index, e);
    } else {
      const updatedProducts = [...portfolio.products];
      updatedProducts[index] = { ...updatedProducts[index], [name]: value };
      setPortfolio({ ...portfolio, products: updatedProducts });
    }
  };

  const handleProductImageChange = async (index, e) => {
    const file = e.target.files[0];
    if (file) {
      const productImageUrl = await handleProductImageUpload(file);
      const updatedProducts = [...portfolio.products];
      updatedProducts[index] = {
        ...updatedProducts[index],
        productImage: productImageUrl,
      };
      setPortfolio({ ...portfolio, products: updatedProducts });
    }
  };

  const handleBrandChange = (index, e) => {
    const { name, value } = e.target;
    const updatedBrands = [...portfolio.aboutMeBrands];
    updatedBrands[index] = { ...updatedBrands[index], [name]: value };
    setPortfolio({ ...portfolio, aboutMeBrands: updatedBrands });
  };

  const handleTestimonialChange = (index, e) => {
    const { name, value } = e.target;
    const updatedTestimonials = [...portfolio.testimonials];
    updatedTestimonials[index] = {
      ...updatedTestimonials[index],
      [name]: value,
    };
    setPortfolio({ ...portfolio, testimonials: updatedTestimonials });
  };

  const handleAddService = () => {
    setPortfolio({
      ...portfolio,
      services: [...portfolio.services, { heading: "", description: "" }],
    });
  };

  const handleAddBulkLinks = () => {
    setPortfolio({
      ...portfolio,
      bulkLinks: [...portfolio.bulkLinks, { linkName: "", linkUrl: "" }],
    });
    console.log(portfolio)
  }

  const handleRemoveService = (index) => {
    setPortfolio({
      ...portfolio,
      services: portfolio.services.filter((_, i) => i !== index),
    });
  };

  const handleRemoveBulklinks = (index) => {
    setPortfolio({
      ...portfolio,
      bulkLinks: portfolio.bulkLinks.filter((_, i) => i !== index),
    });

  }

  const handleAddProduct = () => {
    setPortfolio({
      ...portfolio,
      products: [
        ...portfolio.products,
        { productName: "", productDescription: "", productImage: "" },
      ],
    });
  };

  const handleRemoveProduct = (index) => {
    setPortfolio({
      ...portfolio,
      products: portfolio.products.filter((_, i) => i !== index),
    });
  };

  const handleAddBrand = () => {
    setPortfolio({
      ...portfolio,
      aboutMeBrands: [
        ...portfolio.aboutMeBrands,
        { brandName: "", brandImage: "" },
      ],
    });
  };

  const handleRemoveBrand = (index) => {
    setPortfolio({
      ...portfolio,
      aboutMeBrands: portfolio.aboutMeBrands.filter((_, i) => i !== index),
    });
  };

  const handleAddTestimonial = () => {
    setPortfolio({
      ...portfolio,
      testimonials: [
        ...portfolio.testimonials,
        { clientName: "", mainTestimonial: "" },
      ],
    });
  };

  const handleRemoveTestimonial = (index) => {
    setPortfolio({
      ...portfolio,
      testimonials: portfolio.testimonials.filter((_, i) => i !== index),
    });
  };

  const handleBrandImageChange = async (index, e) => {
    const file = e.target.files[0];
    if (file) {
      const brandImageUrl = await handleProfileImageUpload(file);
      const updatedBrands = [...portfolio.aboutMeBrands];
      updatedBrands[index] = {
        ...updatedBrands[index],
        brandImage: brandImageUrl,
      };
      setPortfolio({ ...portfolio, aboutMeBrands: updatedBrands });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setShowLoader(true);

    try {
      // Upload profile image if updated
      let profileImageUrl = portfolio.profileImage;
      if (profileImage instanceof File) {
        profileImageUrl = await handleProfileImageUpload(profileImage);
      }

      let websiteLogoUrl = portfolio.websiteLogo;
      if (websiteLogo instanceof File) {
        websiteLogoUrl = await handleProfileImageUpload(websiteLogo);
      }

      let link1LogoUrl = portfolio.link1Logo;
      if (link1Logo instanceof File) {
        link1LogoUrl = await handleProfileImageUpload(link1Logo);
      }

      let link2LogoUrl = portfolio.link2Logo;
      if (link2Logo instanceof File) {
        link2LogoUrl = await handleProfileImageUpload(link2Logo);
      }

      let link3LogoUrl = portfolio.link3Logo;
      if (link3Logo instanceof File) {
        link3LogoUrl = await handleProfileImageUpload(link3Logo);
      }

      console.log(websiteLogoUrl, link1LogoUrl, link2LogoUrl, link3LogoUrl);


      console.log(websiteLogoUrl)

      // Ensure products and brands are arrays and prepare updated data
      const updatedProducts = await Promise.all(
        portfolio.products.map(async (product) => {
          let productImageUrl = product.productImage;
          if (productImageUrl instanceof File) {
            productImageUrl = await handleProductImageUpload(productImageUrl);
          }
          return { ...product, productImage: productImageUrl };
        })
      );

      const updatedBrands = await Promise.all(
        portfolio.aboutMeBrands.map(async (brand) => {
          let brandImageUrl = brand.brandImage;
          if (brandImageUrl instanceof File) {
            brandImageUrl = await handleProfileImageUpload(brandImageUrl);
          }
          return { ...brand, brandImage: brandImageUrl };
        })
      );

      // Prepare payload with updated data
      const payload = {
        ...portfolio,
        profileImage: profileImageUrl,
        websiteLogo: websiteLogoUrl,
        link1Logo: link1LogoUrl,
        link2Logo: link2LogoUrl,
        link3Logo: link3LogoUrl,
        products: updatedProducts,
        aboutMeBrands: updatedBrands, // Corrected to match your backend key
        contact: { address: portfolio.contact.address },
        socialMedias: {
          facebook: portfolio.socialMedias.facebook || "",
          twitter: portfolio.socialMedias.twitter || "",
          linkedin: portfolio.socialMedias.linkedin || "",
          instagram: portfolio.socialMedias.instagram || "",
          website: portfolio.socialMedias.website || "",
          google: portfolio.socialMedias.google || "",
          link1: portfolio.socialMedias.link1 || "",
          link2: portfolio.socialMedias.link2 || "",
          link3: portfolio.socialMedias.link3 || "",
        },
      };

      // Make the PUT   request
      const token = localStorage.getItem("token");
      const response = await axios.put(
        `https://api.profilegenie.in/api/admin/edit-portfolio/${uniqueUserName}`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        console.log("Update successful:", response.data);
        setPopup(true);
      }
    } catch (error) {
      console.error("Error updating portfolio:", error.message);
      setError("Error updating portfolio");
    } finally {
      setShowLoader(false);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;




  return (
    <div className="container mx-auto p-4 md:w-[70vw]">
      <h1 className="text-4xl font-bold text-center ">Edit Profile</h1>
      <div className="mx-auto w-20 h-1 rounded-full bg-[#2C1E4A]"></div>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col w-full gap-4 px-8 py-6 mx-auto shadow-xl"
      >
        {/* General Information */}
        <div className="flex flex-col gap-2">
          <label className="font-bold">Name</label>
          <input
            type="text"
            name="name"
            value={portfolio.name}
            onChange={handleChange}
            className="p-2 border rounded"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="font-bold">uniqueUserName</label>
          <input
            type="text"
            name="uniqueUserName"
            value={portfolio.uniqueUserName}
            onChange={handleChange}
            className="p-2 border rounded"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="font-bold">Email</label>
          <input
            type="email"
            name="email"
            value={portfolio.email}
            onChange={handleChange}
            className="p-2 border rounded"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="font-bold">Phone</label>
          <input
            type="tel"
            name="phone"
            value={portfolio.phone}
            onChange={handleChange}
            placeholder="Phone"
            className="w-full p-2 border rounded"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="font-bold">TagLine</label>
          <input
            type="text"
            name="tagline"
            value={portfolio.tagline}
            onChange={handleChange}
            placeholder="Tagline"
            className="w-full p-2 border rounded"
          />
        </div>

        {portfolio?.aboutContent && portfolio.aboutContent.length > 0 ? (
          <div className="flex flex-col gap-4">
            {/* About Head Input */}
            <div className="flex flex-col gap-2">
              <label className="font-bold">About Head</label>
              <input
                type="text"
                name="aboutHead"
                value={portfolio.aboutHead}
                onChange={(e) =>
                  setPortfolio((prev) => ({
                    ...prev,
                    aboutHead: e.target.value,
                  }))
                }
                className="p-2 border rounded"
                placeholder="Enter About Head"
              />
            </div>

            {/* About Content Inputs */}
            <div className="flex flex-col gap-2">
              <label className="font-bold">About Content</label>
              {paragraphs.map((para) => (
                <div key={para.id} className="flex flex-col gap-2">
                  <label className="font-medium">Paragraph {para.id}</label>
                  <textarea
                    rows={4}
                    id={`para-${para.id}`}
                    name={`aboutPara${para.id}`}
                    value={para.content}
                    onChange={(e) => handleInputChange(para.id, e.target.value)}
                    className="p-2 border rounded"
                    placeholder={`Enter content for Paragraph ${para.id}`}
                  />
                </div>
              ))}
              {/* Add Paragraph Button */}
              <button
                type="button"
                onClick={addParagraph}
                className="px-4 py-2 mt-2 text-white bg-blue-500 rounded hover:bg-blue-600"
              >
                Add Paragraph
              </button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {/* About Head Input */}
            <div className="flex flex-col gap-2">
              <label className="font-bold">About Head</label>
              <input
                type="text"
                name="aboutHead"
                value={portfolio.aboutHead || ""}
                onChange={(e) =>
                  setPortfolio((prev) => ({
                    ...prev,
                    aboutHead: e.target.value,
                  }))
                }
                className="p-2 border rounded"
                placeholder="Enter About Head"
              />
            </div>

            {/* Dynamic Paragraph Inputs */}
            <div className="flex flex-col gap-2">
              <label className="font-bold">About Content</label>
              {paragraphs.map((para) => (
                <div key={para.id} className="flex flex-col gap-2">
                  <label className="font-medium">Paragraph {para.id}</label>
                  <textarea
                    rows={4}
                    id={`para-${para.id}`}
                    name={`aboutPara${para.id}`}
                    value={para.content}
                    onChange={(e) => handleInputChange(para.id, e.target.value)}
                    className="p-2 border rounded"
                    placeholder={`Enter content for Paragraph ${para.id}`}
                  />
                </div>
              ))}
              {/* Add Paragraph Button */}
              <button
                type="button"
                onClick={addParagraph}
                className="px-4 py-2 mt-2 text-white bg-blue-500 rounded hover:bg-blue-600"
              >
                Add Paragraph
              </button>
            </div>
          </div>
        )}


        {/* <div className="flex flex-col gap-2">
          <label className="font-bold">About Me</label>
          <textarea
            rows={8}
            type="text"
            name="aboutMe"
            value={portfolio.aboutMe}
            onChange={handleChange}
            className="p-2 border rounded"
          />
        </div> */}

        {/* Profile Image Upload */}
        <div className="flex flex-col gap-2">
          <label className="font-bold">Profile Image</label>
          {portfolio.profileImage && (
            <img
              src={portfolio.profileImage}
              alt="Profile"
              className="object-cover w-32 h-32 mb-2"
            />
          )}
          <input
            type="file"
            name="profileImage"
            onChange={handleProfileImageChange}
            className="p-2 border rounded"
          />
        </div>
        {/* Services */}
        <div>
          <h3 className="mt-4 mb-2 text-2xl font-semibold">Bulk Links</h3>
          {portfolio.bulkLinks && portfolio.bulkLinks.length > 0 ? (
            portfolio.bulkLinks.map((bulkLinks, index) => (
              <div key={index} className="p-4 mb-2 border rounded">
                <div className="flex items-center justify-between">
                  <h4 className="text-2xl font-bold">Link {index + 1}</h4>
                  <button
                    type="button"
                    onClick={() => handleRemoveBulklinks(index)}
                    className="text-red-500"
                  >
                    Remove
                  </button>
                </div>
                <div className="flex flex-col gap-2 mb-4">
                  <label>Link name</label>
                  <input
                    type="text"
                    name="linkName"
                    value={bulkLinks.linkName}
                    onChange={(e) => handleBulkLinks(index, e)}
                    className="p-2 border rounded"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label>Link Url</label>
                  <textarea
                    name="linkUrl"
                    value={bulkLinks.linkUrl}
                    onChange={(e) => handleBulkLinks(index, e)}
                    className="p-2 border rounded"
                  />
                </div>
              </div>
            ))
          ) : (
            <p>No links added yet.</p>
          )}
          <button
            type="button"
            onClick={handleAddBulkLinks}
            className="bg-[#2C1E4A] text-white p-2 rounded mt-2"
          >
            Add Links
          </button>
        </div>

        {/* Products */}
        <div>
          <h3 className="mt-4 mb-2 text-2xl font-semibold">Products</h3>
          {portfolio.products && portfolio.products.length > 0 ? (
            portfolio.products.map((product, index) => (
              <div key={index} className="p-4 mb-2 border rounded">
                <div className="flex items-center justify-between">
                  <h4 className="text-2xl font-bold">Product {index + 1}</h4>
                  <button
                    type="button"
                    onClick={() => handleRemoveProduct(index)}
                    className="text-red-500"
                  >
                    Remove
                  </button>
                </div>
                <div className="flex flex-col gap-2 mb-4">
                  <label>Product Name</label>
                  <input
                    type="text"
                    name="productName"
                    value={product.productName}
                    onChange={(e) => handleProductChange(index, e)}
                    className="p-2 border rounded"
                  />
                </div>
                <div className="flex flex-col gap-2 mb-4">
                  <label>Product Description</label>
                  <textarea
                    name="productDescription"
                    value={product.productDescription}
                    onChange={(e) => handleProductChange(index, e)}
                    className="p-2 border rounded"
                  />
                </div>
                <div className="flex flex-col gap-2 mt-2">
                  <label>Product Image</label>
                  {product.productImage && (
                    <img
                      src={product.productImage}
                      alt={`Product ${index + 1}`}
                      className="object-cover w-32 h-32 mb-2"
                    />
                  )}
                  <input
                    type="file"
                    name="productImage"
                    onChange={(e) => handleProductChange(index, e)}
                    className="p-2 border rounded"
                  />
                </div>
              </div>
            ))
          ) : (
            <p>No products added yet.</p>
          )}
          <button
            type="button"
            onClick={handleAddProduct}
            className="bg-[#2C1E4A] text-white p-2 rounded mt-2"
          >
            Add Product
          </button>
        </div>

        {/* Services */}


        <div>
          <h3 className="mt-4 mb-2 text-2xl font-semibold">Services</h3>
          <div className="flex flex-col gap-2 mb-3">
            <label className="font-bold">Service tagline</label>
            <input
              type="text"
              name="serviceTagline"
              value={portfolio.serviceTagline}
              onChange={handleChange}
              className="p-2 border rounded"
              placeholder="Enter service tagline"
            />
          </div>

          {portfolio.services && portfolio.services.length > 0 ? (
            portfolio.services.map((service, index) => (
              <div key={index} className="p-4 mb-2 border rounded">
                <div className="flex items-center justify-between">
                  <h4 className="text-2xl font-bold">Service {index + 1}</h4>
                  <button
                    type="button"
                    onClick={() => handleRemoveService(index)}
                    className="text-red-500"
                  >
                    Remove
                  </button>
                </div>
                <div className="flex flex-col gap-2 mb-4">
                  <label>Heading</label>
                  <input
                    type="text"
                    name="heading"
                    value={service.heading}
                    onChange={(e) => handleServiceChange(index, e)}
                    className="p-2 border rounded"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label>Description</label>
                  <textarea
                    name="description"
                    value={service.description}
                    onChange={(e) => handleServiceChange(index, e)}
                    className="p-2 border rounded"
                  />
                </div>
              </div>
            ))
          ) : (
            <p>No services added yet.</p>
          )}
          <button
            type="button"
            onClick={handleAddService}
            className="bg-[#2C1E4A] text-white p-2 rounded mt-2"
          >
            Add Service
          </button>
        </div>

        {/* Brands */}
        <div>
          <h3 className="mt-4 mb-2 text-2xl font-semibold">Brands</h3>
          {portfolio.aboutMeBrands && portfolio.aboutMeBrands.length > 0 ? (
            portfolio.aboutMeBrands.map((brand, index) => (
              <div key={index} className="p-4 mb-2 border rounded">
                <div className="flex items-center justify-between">
                  <h4 className="text-2xl font-bold">Brand {index + 1}</h4>
                  <button
                    type="button"
                    onClick={() => handleRemoveBrand(index)}
                    className="text-red-500"
                  >
                    Remove
                  </button>
                </div>
                <div className="flex flex-col gap-2 mb-4">
                  <label>Brand Name</label>
                  <input
                    type="text"
                    name="brandName"
                    value={brand.brandName}
                    onChange={(e) => handleBrandChange(index, e)}
                    className="p-2 border rounded"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label>Brand Image</label>
                  {brand.brandImage && (
                    <img
                      src={brand.brandImage}
                      alt={`Brand ${index + 1}`}
                      className="object-cover w-32 h-32 mb-2"
                    />
                  )}
                  <input
                    type="file"
                    name="brandImage"
                    onChange={(e) => handleBrandImageChange(index, e)}
                    className="p-2 border rounded"
                  />
                </div>
              </div>
            ))
          ) : (
            <p>No brands added yet.</p>
          )}
          <button
            type="button"
            onClick={handleAddBrand}
            className="bg-[#2C1E4A] text-white p-2 rounded mt-2"
          >
            Add Brand
          </button>
        </div>

        {/* Testimonials */}
        <div>
          <h3 className="mt-4 mb-2 text-2xl font-semibold">Testimonials</h3>
          {portfolio.testimonials && portfolio.testimonials.length > 0 ? (
            portfolio.testimonials.map((testimonial, index) => (
              <div key={index} className="p-4 mb-2 border rounded">
                <div className="flex items-center justify-between">
                  <h4 className="text-2xl font-bold">
                    Testimonial {index + 1}
                  </h4>
                  <button
                    type="button"
                    onClick={() => handleRemoveTestimonial(index)}
                    className="text-red-500"
                  >
                    Remove
                  </button>
                </div>
                <div className="flex flex-col gap-2 mb-4">
                  <label>Client Name</label>
                  <input
                    type="text"
                    name="clientName"
                    value={testimonial.clientName}
                    onChange={(e) => handleTestimonialChange(index, e)}
                    className="p-2 border rounded"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label>Testimonial</label>
                  <textarea
                    name="mainTestimonial"
                    value={testimonial.mainTestimonial}
                    onChange={(e) => handleTestimonialChange(index, e)}
                    className="p-2 border rounded"
                  />
                </div>
              </div>
            ))
          ) : (
            <p>No testimonials added yet.</p>
          )}
          <button
            type="button"
            onClick={handleAddTestimonial}
            className="bg-[#2C1E4A] text-white p-2 rounded mt-2"
          >
            Add Testimonial
          </button>
        </div>

        {/* Additional Fields */}
        <div className="flex flex-col gap-4">
          <label className="font-bold">Address</label>
          <input
            type="text"
            name="address"
            value={portfolio.contact?.address || ""}
            onChange={handleChange}
            placeholder="Address"
            className="w-full p-2 border rounded"
          />
        </div>

        <div className="flex flex-col gap-4">
          <label className="font-bold">Website</label>
          <div className="flex flex-col gap-2">
            <label className="font-bold">Website Logo</label>
            {portfolio.websiteLogo && (
              <img
                src={portfolio.websiteLogo}
                alt="Profile"
                className="object-cover w-32 h-32 mb-2"
              />
            )}
            <input
              type="file"
              name="websiteLogo"
              onChange={handleWebsiteLogoChange}
              className="p-2 border rounded"
            />
          </div>
          <input
            type="text"
            name="website"
            value={portfolio.socialMedias?.website || ""}
            onChange={handleSocialChange}
            placeholder="Website"
            className="w-full p-2 border rounded"
          />
        </div>

        <input
          type="text"
          name="facebook"
          value={portfolio.socialMedias?.facebook || ""}
          onChange={handleSocialChange}
          placeholder="Facebook URL"
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          name="twitter"
          value={portfolio.socialMedias?.twitter || ""}
          onChange={handleSocialChange}
          placeholder="Twitter URL"
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          name="linkedin"
          value={portfolio.socialMedias?.linkedin || ""}
          onChange={handleSocialChange}
          placeholder="LinkedIn URL"
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          name="instagram"
          value={portfolio.socialMedias?.instagram || ""}
          onChange={handleSocialChange}
          placeholder="Instagram URL"
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          name="google"
          value={portfolio.socialMedias?.google || ""}
          onChange={handleSocialChange}
          placeholder="Google URL"
          className="w-full p-2 border rounded"
        />

        <div className="flex flex-col gap-4">
          <label className="font-bold">Link 1</label>
          <div className="flex flex-col gap-2">
            <label className="font-bold">Link 1 Logo</label>
            {portfolio.link1Logo && (
              <img
                src={portfolio.link1Logo}
                alt="link1Logo"
                className="object-cover w-32 h-32 mb-2"
              />
            )}
            <input
              type="file"
              name="link1Logo"
              onChange={handleLink1LogoChange}
              className="p-2 border rounded"
            />
          </div>
          <input
            type="text"
            name="link1"
            value={portfolio.socialMedias?.link1 || ""}
            onChange={handleSocialChange}
            placeholder="link1"
            className="w-full p-2 border rounded"
          />
        </div>

        <div className="flex flex-col gap-4">
          <label className="font-bold">Link 2</label>
          <div className="flex flex-col gap-2">
            <label className="font-bold">Link 2 Logo</label>
            {portfolio.link2Logo && (
              <img
                src={portfolio.link2Logo}
                alt="link2Logo"
                className="object-cover w-32 h-32 mb-2"
              />
            )}
            <input
              type="file"
              name="link2Logo"
              onChange={handleLink2LogoChange}
              className="p-2 border rounded"
            />
          </div>
          <input
            type="text"
            name="link2"
            value={portfolio.socialMedias?.link2 || ""}
            onChange={handleSocialChange}
            placeholder="link2"
            className="w-full p-2 border rounded"
          />
        </div>

        <div className="flex flex-col gap-4">
          <label className="font-bold">Link 3</label>
          <div className="flex flex-col gap-2">
            <label className="font-bold">Link 3 Logo</label>
            {portfolio.link3Logo && (
              <img
                src={portfolio.link3Logo}
                alt="link3Logo"
                className="object-cover w-32 h-32 mb-2"
              />
            )}
            <input
              type="file"
              name="link3Logo"
              onChange={handleLink3LogoChange}
              className="p-2 border rounded"
            />
          </div>
          <input
            type="text"
            name="link3"
            value={portfolio.socialMedias?.link3 || ""}
            onChange={handleSocialChange}
            placeholder="link3"
            className="w-full p-2 border rounded"
          />
        </div>

        <div className="flex flex-col gap-4">
          <label className="font-bold">Primary Text Color</label>
          <input
            type="text"
            name="primaryTextColor"
            value={portfolio.primaryTextColor}
            onChange={handleChange}
            placeholder="Primary Text Color"
            className="w-full p-2 border rounded"
          />
        </div>

        <div className="flex flex-col gap-4 ">
          <label className="font-bold">Secondary TextColor</label>
          <input
            type="text"
            name="secondaryTextColor"
            value={portfolio.secondaryTextColor}
            onChange={handleChange}
            placeholder="Secondary Text Color"
            className="w-full p-2 border rounded"
          />
        </div>

        <div className="flex flex-col gap-4">
          <lable className="font-bold ">Bg Color</lable>

          <input
            type="text"
            name="bgColor"
            value={portfolio.bgColor}
            onChange={handleChange}
            placeholder="Background Color"
            className="w-full p-2 border rounded"
          />
        </div>

        <div className="flex flex-col gap-4">
          <lable className="font-bold ">Button Color</lable>
          <input
            type="text"
            name="buttonColor"
            value={portfolio.buttonColor}
            onChange={handleChange}
            placeholder="Button Color"
            className="w-full p-2 border rounded"
          />
        </div>

        <div className="flex flex-col gap-4">
          <lable className="font-bold ">Google Map Link</lable>

          <input
            type="text"
            name="googleMapLink"
            value={portfolio.googleMapLink}
            onChange={handleChange}
            placeholder="Google Map Link"
            className="w-full p-2 border rounded"
          />
        </div>

        {/* Drive Link */}

        <div className="flex flex-col gap-4">
          <lable className="font-bold ">Drive Link</lable>

          <input
            type="text"
            name="documentGoogleDriveLink"
            value={portfolio.documentGoogleDriveLink}
            onChange={handleChange}
            placeholder="Google Map Link"
            className="w-full p-2 border rounded"
          />
        </div>



        {/* Submit Button */}
        <button
          type="submit"
          className="bg-[#2C1E4A] text-white p-2 rounded mt-4"
        >
          {showLoader ? "Saving..." : "Save Changes"}
        </button>
      </form>
      <button
        onClick={handleActivateDeactivate}
        className="bg-[#2C1E4A] text-white p-2 rounded mt-4"
      >
        {portfolio.toggleActivate ? "Deactivate" : "Activate"}
      </button>


      {/* Popup Message */}
      {popup && (
        <div className="fixed top-0 left-0 flex items-center justify-center w-full h-full bg-gray-700 bg-opacity-50">
          <div className="p-4 bg-white rounded shadow-md">
            <p>Portfolio updated successfully!</p>
            <button
              onClick={() => setPopup(false)}
              className="mt-2 bg-[#2C1E4A] text-white p-2 rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditPortfolio;
