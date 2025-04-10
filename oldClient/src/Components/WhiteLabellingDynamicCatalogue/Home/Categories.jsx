import React, { useState } from "react";

const Categories = ({ allproducts }) => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [currentProductIndex, setCurrentProductIndex] = useState(0);

  const handleCategoryClick = (categoryIndex) => {
    if (categoryIndex >= 0 && categoryIndex < allproducts.length) {
      const selectedCategoryData = allproducts[categoryIndex];
      const firstProduct = selectedCategoryData.products[0];

      if (firstProduct && !firstProduct.productName) {
        window.open(
          "https://www.profilegenie.in/dynamic-catalogue/1/Ishan_Niyor_Perfumes",
          "_blank"
        );
      } else {
        setSelectedCategory(categoryIndex);
        setCurrentProductIndex(1);
      }
    }
  };

  const closePopup = () => {
    setSelectedCategory(null);
  };

  const nextProduct = () => {
    setCurrentProductIndex((prevIndex) => {
      const selectedCategoryData = allproducts[selectedCategory];
      const maxIndex = selectedCategoryData.products.length - 1;
      const nextIndex = (prevIndex + 1) % selectedCategoryData.products.length;
  
      // Ensure we skip index 0 by setting to 1 if it wraps to 0
      return nextIndex === 0 ? 1 : nextIndex;
    });
  };
  
  const prevProduct = () => {
    setCurrentProductIndex((prevIndex) => {
      const selectedCategoryData = allproducts[selectedCategory];
      const maxIndex = selectedCategoryData.products.length - 1;
      const prevIndexAdjusted = (prevIndex - 1 + selectedCategoryData.products.length) % selectedCategoryData.products.length;
  
      // Ensure we skip index 0 by setting to maxIndex if it wraps to 0
      return prevIndexAdjusted === 0 ? maxIndex : prevIndexAdjusted;
    });
  };
  

  const selectedCategoryData =
    selectedCategory !== null ? allproducts[selectedCategory] : null;
  const currentProduct = selectedCategoryData
    ? selectedCategoryData.products[currentProductIndex]
    : null;

  return (
    <div className="py-6">
      <h1 className="text-3xl md:text-5xl text-center font-semibold mb-2 head">
        All Categories
      </h1>
      <div className="mx-auto w-40 h-1 bg-black mb-12"></div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-6 md:px-10 mt-10">
        {allproducts
          ?.filter(
            (category) => category.products && category.products.length > 0
          ) // Filter out categories with no products
          .map((category, index) => (
            <div
              key={category._id}
              className="relative group mx-auto cursor-pointer w-full h-96 rounded-md overflow-hidden"
              onClick={() => handleCategoryClick(index)}
              style={{
                backgroundImage: `url(${category.products[0]?.productImage1})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              }}
            >
              <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-80 h-16 flex items-center justify-center rounded-b-md">
                <h2 className="text-white text-xl font-bold text-center uppercase head">
                  {category.categoryName || "Unknown Category"}
                </h2>
              </div>
            </div>
          ))}
      </div>

      {/* Popup Modal */}
      {selectedCategory !== null && selectedCategoryData && (
        <div
          className="fixed top-0 left-0 w-full h-full z-20 bg-black bg-opacity-50 flex justify-center items-center"
          onClick={closePopup}
        >
          <div
            className="bg-white w-11/12 md:w-3/4 lg:w-4/3 md:h-5/6 relative flex flex-col md:flex-row"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Left side: Image slider */}

            <div
              className={`${
                currentProduct?.productImage1 ? "w-full md:w-1/2 " : "w-full"
              }relative`}
            >
              {currentProduct && (
                <>
                  {currentProduct?.productImage1 && (
                    <img
                      src={currentProduct.productImage1}
                      alt="Category Product"
                      className="w-full h-60 md:h-full object-cover"
                    />
                  )}

                  <button
                    className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-black text-white p-2"
                    onClick={prevProduct}
                  >
                    &#10094;
                  </button>
                  <button
                    className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-black text-white p-2"
                    onClick={nextProduct}
                  >
                    &#10095;
                  </button>
                </>
              )}
            </div>

            {/* Right side: Content description */}
            <div
              className={`${
                currentProduct?.productImage1
                  ? "w-full md:w-1/2 justify-center py-6 md:px-4 "
                  : " justify-start w-full py-2"
              }  flex flex-col  items-center`}
            >
              {/* {currentProduct?.productName &&  currentProduct.productImage1 &&( */}
              <h2
                className={` ${
                  currentProduct?.productImage1 ? "mb-8" : "mb-2"
                } text-xl md:text-4xl text-center  font-bold head`}
              >
                {currentProduct?.productName}{" "}
              </h2>
              {/* )} */}

              {currentProduct?.productDesc && (
                <p className="text-sm md:text-xl text-center  npf">
                  {currentProduct?.productDesc}
                </p>
              )}

              {currentProduct?.quantityAndPrice &&
                currentProduct?.quantityAndPrice?.length > 0 &&
                currentProduct?.quantityAndPrice?.some(
                  (qtyItem) =>
                    qtyItem.qty ||
                    qtyItem.platinum ||
                    qtyItem.gold ||
                    qtyItem.silver
                ) && (
                  <div className="w-full flex items-center justify-center  ">
                    <div
                      className={` ${
                        currentProduct?.productImage1
                          ? "h-60 md:h-96 w-full md:max-w-lg"
                          : "h-96 w-full px-2"
                      } overflow-y-auto  md:w-full  md:px-4 text-center`}
                    >
                      <table className=" table-auto w-full border-separate border-spacing-y-2 text-[#4e3d28]">
                        <thead className="bg-gray-200">
                          <tr>
                            <th className="p-2 border-b-2 border-[#4e3d28] text-lg md:text-2xl head ">
                              Qty.
                            </th>
                            <th className="p-2 border-b-2 border-[#4e3d28] text-lg md:text-2xl head ">
                              Platinum
                            </th>
                            <th className="p-2 border-b-2 border-[#4e3d28] text-lg md:text-2xl head ">
                              Gold
                            </th>
                            <th className="p-2 border-b-2 border-[#4e3d28] text-lg md:text-2xl head ">
                              Silver
                            </th>
                          </tr>
                        </thead>
                        <tbody className="text-[#4e3d28]">
                          {currentProduct?.quantityAndPrice?.map((qtyItem) => (
                            <tr key={qtyItem._id}>
                              <td className="md:p-2 p-1 text-xs md:text-lg">
                                {qtyItem.qty || "-"}
                              </td>
                              <td className="md:p-2 text-xs md:text-lg">
                                ₹ {qtyItem.platinum || "-"}
                              </td>
                              <td className="md:p-2 text-xs md:text-lg ">
                                ₹ {qtyItem.gold || "-"}
                              </td>

                              <td className="md:p-2 text-xs md:text-lg">
                                ₹ {qtyItem.silver || "-"}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

              {/* <button
                className="mt-auto self-end bg-red-500 text-white px-4 py-2 rounded"
                onClick={closePopup}
              >
                Close
              </button> */}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Categories;
