import React, { useState, useEffect } from "react";
import { FaHeart } from "react-icons/fa";
import axios from "axios";
import { useJwt } from "react-jwt";
import { useNavigate, useParams } from "react-router-dom";

const Products = ({ allproducts }) => {
  const [selectedProduct, setSelectedProduct] = useState(null); // Store the selected product
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal state
  const [viewStartTime, setViewStartTime] = useState(null); // Track the start time of the view
  const [token, setToken] = useState(localStorage.getItem("token"));
  const { decodedToken } = useJwt(token);
  const [showLoader, setShowLoader] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setToken(token);
  }, []);

  // Extract distributorId from decoded token
  const distributorId = decodedToken?.userId;
  const navigate = useNavigate();
  const { userName } = useParams();

  //////////////////////////////////////////////////////////////////////////////////////////////////////////
  // committing out the login as distridritor and also a time mail thing commit out aftter this

  const handleProductClick = (product) => {
    // if (token && decodedToken) {
    //   if (decodedToken.role === "distributor") {
    setSelectedProduct(product);
    setIsModalOpen(true);
    // setViewStartTime(Date.now());
    // } else {
    //    alert("Please log in first as a Distributor.");
    //}
  };
  // else {
  //  alert("Please log in first as a Distributor.");
  // navigate(`/dynamic-catalogue/${userName}`)
  // }
  //};

  const closeModal = () => {
    //   if (selectedProduct && viewStartTime) {
    //     const viewEndTime = Date.now();
    //     const viewTime = Math.max((viewEndTime - viewStartTime) / 1000, 0); // Calculate view time in seconds

    //     // Send view data to backend
    //     axios
    //       .post("https://api.profilegenie.in/api/distributor/track-product-view", {
    //         distributorId: distributorId || "default_distributor_id", // Use decoded distributor ID or default
    //         productId: selectedProduct._id,
    //         viewTime,
    //       })
    //       .then((response) => {
    //         console.log("Response Status:", response.status);
    //         console.log("Response Data:", response.data);
    //         // Optionally log specific messages
    //         if (response.status === 200) {
    //           console.log(
    //             "View time tracked successfully:",
    //             response.data.message
    //           );
    //         } else {
    //           console.log("Unexpected response status:", response.status);
    //         }
    //       })
    //       .catch((error) => {
    //         console.error("Error tracking product view:", error.message);
    //       });
    //   }

    setIsModalOpen(false);
    //   setSelectedProduct(null);
    //   setViewStartTime(null);
  };

  ///////////////////////////////////////////////////////////////////////////////////////////////

  // Close modal on clicking outside the content
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  // Send Quote

  const [myprofile, setMyProfile] = useState(null);

  useEffect(() => {
    const handleGetProfile = async () => {
      try {
        const response = await axios.get(
          `https://api.profilegenie.in/api/client/my-profile/${userName}`
        );
        if (response.status === 200) {
          setMyProfile(response.data?._id);
          console.log("manufacture ", response.data?._id);
        }
      } catch (error) {
        console.log(error);
      }
    };
    handleGetProfile();
  }, [userName]);

  const [selectedProductIds, setSelectedProductIds] = useState([]);

  const handleQuoteClick = (productId) => {
    if (selectedProductIds.includes(productId)) {
      // If the product is already selected, remove it
      setSelectedProductIds(
        selectedProductIds.filter((id) => id !== productId)
      );
    } else {
      // Add product to selected list
      setSelectedProductIds([...selectedProductIds, productId]);
    }
    setIsModalOpen(false);
  };

  const handleSendAllQuotes = async () => {
    setShowLoader(true);
    console.log(selectedProductIds);
    try {
      const response = await axios.post(
        "https://api.profilegenie.in/api/distributor/quote-products",
        {
          distributorId: distributorId || "default_distributor_id",
          manufacturerId: myprofile,
          productIds: selectedProductIds,
        }
      );

      if (response.status === 200) {
        console.log(response.data);
        setQoutesConfermation(true);
        setShowLoader(false);
        // alert("Quotes sent successfully!");
      }
    } catch (error) {
      console.error("Error sending quotes:", error);
    }
  };

  const [qoutesconfermation, setQoutesConfermation] = useState(false);

  return (
    <div className="bg-c2" id="products">
      <div className="text-center p-10">
        <h1 className="font-bold text-5xl md:text-6xl mb-4">Our Products</h1>
        <div className="w-40 h-1 bg-c1 mx-auto"></div>
      </div>

      <section id="Products" className="w-fit mx-auto mt-10 mb-5 md:px-0 px-10">
        {allproducts && Array.isArray(allproducts) ? (
          allproducts
            .filter((category) => category.products.length > 0) // Use the length method to check if the category has any products
            .map((category) => (
              <div key={category._id} className="mb-10">
                <h2 className="text-3xl md:text-5xl font-bold mb-2">
                  {category.categoryName}
                </h2>
                <div className="w-40 h-1 bg-c1 mb-20"></div>
                <div className="grid grid-cols-1 cursor-pointer lg:grid-cols-3 md:grid-cols-2 gap-y-20 gap-x-10">
                  {category.products.map((product) => (
                    <div
                      key={product._id}
                      className="bg-white shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl relative"
                      onClick={() => handleProductClick(product)}
                    >
                      <img
                        src={product.productImage1}
                        alt={product.productName}
                        className="h-80 w-96 object-cover rounded-t-xl"
                      />
                      <div className="px-4 py-3 w-full flex justify-between items-center">
                        <div className="flex flex-col">
                          <span className="text-gray-400 mr-3 uppercase text-xs">
                            {product.productHSIN}
                          </span>
                          <p className="text-lg font-bold text-black truncate block capitalize">
                            {product.productName}
                          </p>
                        </div>
                        {product.liked && (
                          <FaHeart className="text-red-500 text-2xl" />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))
        ) : (
          <p>No products available</p>
        )}
      </section>

      {/* Fullscreen Modal */}
      {isModalOpen && selectedProduct && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50"
          onClick={handleBackdropClick}
        >
          <div className="bg-white w-3/4 md:h-3/4 h-auto md:p-10 flex flex-col md:flex-row relative">
            {/* Left Side: Image */}
            <div className="w-full md:w-1/2 h-1/2 md:h-full flex justify-center items-center">
              {selectedProduct.productImage1 && (
                <img
                  src={selectedProduct.productImage1}
                  alt={selectedProduct.productName || "Product Image"}
                  className="w-full h-full object-cover rounded-md"
                />
              )}
            </div>

            {/* Right Side: Details */}
            <div className="md:w-1/2 flex flex-col justify-between p-4 md:pl-10">
              <div>
                {/* Conditionally render HSN code */}
                {selectedProduct.productHSIN && (
                  <span className="bg-gray-200 px-6 py-1 text-gray-900 font-semibold rounded-md">
                    {selectedProduct.productHSIN}
                  </span>
                )}

                <span className="bg-gray-200 px-6 py-1 text-gray-900 font-semibold rounded-md">
                  #3424
                </span>

                {/* Conditionally render Product Name */}
                {selectedProduct.productName && (
                  <h2 className="text-xl md:text-4xl font-bold mb-4 mt-4">
                    {selectedProduct.productName}
                  </h2>
                )}

                {/* Conditionally render Product Description */}
                {selectedProduct.productDesc && (
                  <p className="text-gray-700 text-sm mb-4">
                    {selectedProduct.productDesc}
                  </p>
                )}

                {/* Conditionally render MOQ */}
                {selectedProduct.productMOQ && (
                  <div className="flex items-center">
                    <label className="block text-md text-black font-bold ">
                      MOQ :-
                    </label>
                    <p className="text-gray-700 font-bold text-xl ml-2 ">
                      {selectedProduct.productMOQ}
                    </p>
                  </div>
                )}

                <div className="flex items-center">
                  <label className="block text-md text-black font-bold ">
                    MOQ :-
                  </label>
                  <p className="text-gray-700 font-bold text-xl ml-2 ">40</p>
                </div>

                {/* Conditionally render Price */}
                {selectedProduct.productCost && (
                  <p className="text-xl font-semibold text-black mb-2 md:mb-1">
                    Price :- ${selectedProduct.productCost}
                  </p>
                )}

                <p className="text-xl font-semibold text-black mb-2 md:mb-1">
                  Price :- INR 30,000
                </p>
                {/* Conditionally render Stock */}
                {selectedProduct.stock !== undefined ? (
                  selectedProduct.stock > 0 ? (
                    <p className="text-xl font-semibold">
                      Stock : {selectedProduct.stock}
                    </p>
                  ) : (
                    <p className="text-red-600 font-bold"></p>
                    // <p className="text-red-600 font-bold">Out of Stock</p>
                  )
                ) : null}
              </div>

              <button
                className={`w-full px-4 py-2 mt-3 md:mt-6 text-white rounded-md ${selectedProductIds.includes(selectedProduct._id)
                  ? "bg-red-500"
                  : "bg-c1"
                  }`}
                onClick={() => handleQuoteClick(selectedProduct._id)}
              >
                {selectedProductIds.includes(selectedProduct._id)
                  ? "Cancel"
                  : "Quote Me"}
              </button>
            </div>

            {/* Close Button */}
            <button
              className="absolute top-5 right-5 text-white text-2xl"
              onClick={closeModal}
            >
              &times;
            </button>
          </div>
        </div>
      )}

      {selectedProductIds.length > 0 && (
        <button
          className="fixed bottom-5 right-5 bg-c1 text-white py-2 px-6 rounded-full shadow-lg"
          onClick={handleSendAllQuotes}
        >
          {showLoader ? (
            <div className="flex justify-center items-center space-x-2">
              <div className="animate-spin h-5 w-5 border-4 border-t-4 border-cyan-600 rounded-full"></div>
              <span>Submitting...</span>
            </div>
          ) : (
            "Send All Quotes"
          )}
        </button>
      )}

      {qoutesconfermation && (
        <div class="fixed z-10 inset-0 overflow-y-auto">
          <div class="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
            <div class="fixed inset-0 transition-opacity">
              <div class="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span class="hidden sm:inline-block sm:align-middle sm:h-screen"></span>
            <div class="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
              <div class="sm:flex sm:items-start">
                <div class="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-c1 sm:mx-0 sm:h-10 sm:w-10">
                  <svg
                    class="h-6 w-6 text-white"
                    stroke="currentColor"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M5 13l4 4L19 7"
                    ></path>
                  </svg>
                </div>
                <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                  <h3 class="text-lg leading-6 font-medium text-gray-900">
                    Thank You!
                  </h3>
                  <div class="mt-2">
                    <p class="text-sm leading-5 text-gray-500">
                      Thank you for requesting. We will reach out to you soon!
                    </p>
                  </div>
                </div>
              </div>
              <div class="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                <span class="flex w-full rounded-md shadow-xl sm:ml-3 sm:w-auto">
                  <button
                    type="button"
                    onClick={() => setQoutesConfermation(false)}
                    class="inline-flex justify-center w-full rounded-md border border-transparent px-4 py-2 bg-c1 text-base leading-6 font-medium text-white shadow-sm  focus:outline-none focus:shadow-outline-green transition ease-in-out duration-150 sm:text-sm sm:leading-5"
                  >
                    OK
                  </button>
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Products;
