import React, { useState, useEffect } from "react";
import axios from "axios";

const EditProductPopUp = ({ productId, closePopup, handleClose }) => {
  const [editProductForm, setEditProductForm] = useState({
    productName: "",
    productQuantity: "",
    productHSIN: "",
    minOrderQty: "",
    price: "",
    stock: "",
    productDesc: "",
    quoteStatus: false,
    productImages: [null, null, null, null],
    quantityAndPrice: [
      { qty: "", platinum: "", gold: "", silver: "" }, // Include _id if needed
    ],
  });
  const [showLoader, setShowLoader] = useState(false);

  // Fetch product data on popup open
  useEffect(() => {
    const fetchProduct = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await axios.get(
          `https://api.profilegenie.in/api/client/product/${productId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const product = response.data;
        setEditProductForm({
          productName: product.productName,
          productQuantity: product.productQuantity,
          productHSIN: product.productHSIN,
          minOrderQty: product.productMOQ,
          price: product.productCost,
          stock: product.stock,
          productDesc: product.productDesc,
          productImages: [
            product.productImage1,
            product.productImage2,
            product.productImage3,
            product.productImage4,
          ],
          quantityAndPrice: product.quantityAndPrice || [
            { qty: "", platinum: "", gold: "" },
          ],
        });
      } catch (error) {
        console.error("Error fetching product data:", error);
      }
    };
    fetchProduct();
  }, [productId]);

  const handleProfileImagesUpload = async (files) => {
    const uploadPromises = files.map(async (file) => {
      if (file) {
        const formData = new FormData();
        formData.append("myFile", file);
        const response = await axios.post(
          "https://api.profilegenie.in/api/client/upload-brand-media",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        return response.data || null; // Ensure this returns the expected URL
      }
      return null; // Return null if no file is present
    });
    return Promise.all(uploadPromises);
  };

  // Handle form changes
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setEditProductForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleQuantityAndPriceChange = (index, field, value) => {
    const updatedQAP = [...editProductForm.quantityAndPrice];
    updatedQAP[index][field] = parseFloat(value) || 0; // Convert to number
    setEditProductForm((prev) => ({
      ...prev,
      quantityAndPrice: updatedQAP,
    }));
  };

  const handleEditProductImageChange = async (e, index) => {
    const file = e.target.files[0];
    const updatedImages = [...editProductForm.productImages];

    if (file) {
      // Handle file upload and get the URL
      const uploadedUrl = await handleProfileImagesUpload([file]);
      if (uploadedUrl && uploadedUrl.length > 0) {
        updatedImages[index] = uploadedUrl[0]; // Replace the URL in the correct index
      }
    } else {
      updatedImages[index] = null; // Reset if no file is selected
    }

    setEditProductForm((prev) => ({
      ...prev,
      productImages: updatedImages,
    }));
  };

  // Submit updated product data
  const handleUpdateProduct = async () => {
    try {
      setShowLoader(true);

      const uploadedImageUrls = await handleProfileImagesUpload(
        editProductForm.productImages.map((image) =>
          image instanceof File ? image : null
        ) // Send only File objects
      );

      const productDataToUpdate = {
        ...editProductForm,
        productQuantity:
          editProductForm.productQuantity.trim() === " "
            ? null
            : editProductForm.productQuantity,
        productHSIN:
          editProductForm.productHSIN.trim() === " "
            ? null
            : editProductForm.productHSIN,
        productDesc:
          editProductForm.productDesc.trim() === " "
            ? null
            : editProductForm.productDesc,
        productImage1: uploadedImageUrls[0] || editProductForm.productImages[0],
        productImage2: uploadedImageUrls[1] || editProductForm.productImages[1],
        productImage3: uploadedImageUrls[2] || editProductForm.productImages[2],
        productImage4: uploadedImageUrls[3] || editProductForm.productImages[3],
        quantityAndPrice: editProductForm.quantityAndPrice.map((qap) => ({
          qty: qap.qty,
          platinum: qap.platinum,
          gold: qap.gold,
          silver: qap.silver,
        })),
      };

      console.log("Product Form Data:", productDataToUpdate);

      const token = localStorage.getItem("token");
      const response = await axios.put(
        `https://api.profilegenie.in/api/client/edit/product/${productId}`,
        productDataToUpdate,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        alert(
          `Product "${productDataToUpdate.productName}" has been updated successfully!`
        );
        console.log("Product updated successfully:", response.data);
        handleClose(); // Close popup after success
        window.location.reload();
      }
    } catch (error) {
      console.error("Error updating product:", error);
    } finally {
      setShowLoader(false);
    }
  };

  const handleAddQuantityPrice = () => {
    setEditProductForm((prev) => ({
      ...prev,
      quantityAndPrice: [
        ...prev.quantityAndPrice,
        { qty: "", platinum: "", gold: "", _id: "" },
      ],
    }));
  };

  const handleRemoveQuantityPrice = (index) => {
    const updatedQAP = [...editProductForm.quantityAndPrice];
    updatedQAP.splice(index, 1);
    setEditProductForm((prev) => ({
      ...prev,
      quantityAndPrice: updatedQAP,
    }));
  };

  //  delete product image

  // Function to delete a specific product image

  const handleDeleteProductImage = async (imageField, index) => {
    console.log(imageField, productId)
    const token = localStorage.getItem("token");

    try {
      const response = await axios.delete(
        `https://api.profilegenie.in/api/client/delete/product-image/${productId}/${imageField}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        alert("Product image deleted successfully");

        const updatedImages = [...editProductForm.productImages];
        updatedImages[index] = null; // Set the deleted image slot to null
        setEditProductForm((prev) => ({
          ...prev,
          productImages: updatedImages,
        }));
        handleClose();
      }
    } catch (error) {
      console.error("Error deleting product image:", error);
      alert("Failed to delete product image");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-900 bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-6xl p-8 h-screen overflow-y-scroll">
        <h2 className="text-2xl font-semibold mb-6">Edit Product</h2>
        <form className="space-y-4">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <div>
              <label className="block font-medium">Product Name</label>
              <input
                type="text"
                name="productName"
                value={editProductForm.productName}
                onChange={handleFormChange}
                className="w-full border border-gray-300 rounded-lg p-2"
              />
            </div>

            <div>
              <label className="block font-medium">Quantity</label>
              <input
                type="text"
                name="productQuantity"
                value={editProductForm.productQuantity}
                onChange={handleFormChange}
                className="w-full border border-gray-300 rounded-lg p-2"
              />
            </div>

            <div>
              <label className="block font-medium">HSN Code</label>
              <input
                type="text"
                name="productHSIN"
                value={editProductForm.productHSIN}
                onChange={handleFormChange}
                className="w-full border border-gray-300 rounded-lg p-2"
              />
            </div>

            <div>
              <label className="block font-medium">Price</label>
              <input
                type="text"
                name="price"
                value={editProductForm.price}
                onChange={handleFormChange}
                className="w-full border border-gray-300 rounded-lg p-2"
              />
            </div>

            <div>
              <label className="block font-medium">Stock</label>
              <input
                type="text"
                name="stock"
                value={editProductForm.stock}
                onChange={handleFormChange}
                className="w-full border border-gray-300 rounded-lg p-2"
              />
            </div>
          </div>

          <div>
            <label className="block font-medium">productDesc</label>
            <textarea
              name="productDesc"
              value={editProductForm.productDesc}
              onChange={handleFormChange}
              className="w-full border border-gray-300 rounded-lg p-2"
            ></textarea>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-2">Product Images</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {[0, 1, 2, 3].map((i) => (
                <div key={i} className="space-y-2">
                  <input
                    type="file"
                    onChange={(e) => handleEditProductImageChange(e, i)}
                  />
                  {editProductForm.productImages[i] && (
                    <>
                      <img
                        src={editProductForm.productImages[i]}
                        alt={`product-img-${i}`}
                        className="w-24 h-24 object-cover rounded-lg"
                      />
                      <button
                        onClick={(e) => {
                          e.preventDefault(); // Prevent page reload
                          handleDeleteProductImage(`productImage${i + 1}`, i);
                        }}
                        className="text-red-500 underline mt-1"
                      >
                        Delete Image
                      </button>
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-2">Quantity and Price</h3>

            <div className="grid grid-cols-5 pt-2 uppercase text-xs md:text-lg font-bold items-center justify-center text-center">
              <p>Quantity</p>
              <p>Platinum</p>
              <p>Gold</p>
              <p>Silver</p>
            </div>
            <hr></hr>
            {Array.isArray(editProductForm.quantityAndPrice) &&
              editProductForm.quantityAndPrice.length > 0 ? (
              editProductForm.quantityAndPrice.map((qap, index) => (
                <div key={index} className="grid grid-cols-5 gap-4 mb-2 mt-2 ">
                  <input
                    type="number"
                    placeholder="Quantity"
                    value={qap.qty}
                    onChange={(e) =>
                      handleQuantityAndPriceChange(index, "qty", e.target.value)
                    }
                    className="border border-gray-300 rounded-lg p-2"
                  />
                  <input
                    type="number"
                    placeholder="Platinum Price"
                    value={qap.platinum}
                    onChange={(e) =>
                      handleQuantityAndPriceChange(
                        index,
                        "platinum",
                        e.target.value
                      )
                    }
                    className="border border-gray-300 rounded-lg p-2"
                  />
                  <input
                    type="number"
                    placeholder="Gold Price"
                    value={qap.gold}
                    onChange={(e) =>
                      handleQuantityAndPriceChange(
                        index,
                        "gold",
                        e.target.value
                      )
                    }
                    className="border border-gray-300 rounded-lg p-2"
                  />

                  <input
                    type="number"
                    placeholder="Silver Price"
                    value={qap.silver}
                    onChange={(e) =>
                      handleQuantityAndPriceChange(
                        index,
                        "silver",
                        e.target.value
                      )
                    }
                    className="border border-gray-300 rounded-lg p-2"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveQuantityPrice(index)}
                    className="bg-red-500 text-white p-2 rounded-lg"
                  >
                    Remove
                  </button>
                </div>
              ))
            ) : (
              <p>No quantity and price data available</p>
            )}
            <button
              type="button"
              onClick={handleAddQuantityPrice}
              className="bg-blue-500 text-white p-2 rounded-lg mt-2"
            >
              Add More
            </button>
          </div>

          <div className="flex justify-end">
            <button
              type="button"
              onClick={handleUpdateProduct}
              className="bg-black text-white py-2 px-4 rounded-lg"
            >
              {showLoader ? "Updating..." : "Update Product"}
            </button>
            <button
              type="button"
              onClick={handleClose}
              className="ml-2 border border-gray-300 py-2 px-4 rounded-lg"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProductPopUp;
