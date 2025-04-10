import React, { useEffect, useState } from "react";
import axios from "axios";
import EditProductPopup from "../DynamicCatalogueAdmin1/EditproductPopUp";
import p1 from "../../../assets/p1.jpg";
import AdminGalllery from "./AdminGalllery";
import dummyimage from "../../../assets/dummyimg.png";

const Admin1Home = () => {
  const [deleteProductPopup, setDeleteProductPopUp] = useState(false);
  const [addProductPopup, setAddProductPopup] = useState(false);
  const [showLoader, setShowLoader] = useState(false);
  const [deleteloader, setDeleteLoader] = useState(false);
  const [productForm, setProductForm] = useState({
    categoryName: "",
    productName: "",
    productQuantity: "",
    hsnCode: "",
    minOrderQty: "",
    price: "",
    stock: "",
    description: "",
    quoteStatus: false,
    productImages: [null, null, null, null],
    quantityAndPrice: [{ qty: "", platinum: "", gold: "" }],
  });

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

  const handleAddProductSubmit = async () => {
    try {
      const token = localStorage.getItem("token");
      setShowLoader(true);

      // Upload multiple images
      const uploadedImageUrls = await handleProfileImagesUpload(
        productForm.productImages
      );
      console.log("Product Form Data:", productForm);
      console.log("Uploaded Image URLs:", uploadedImageUrls);

      // Prepare product data according to the schema
      const productData = {
        productName: productForm.productName,
        productQuantity: productForm.productQuantity, // Adjust to correct field
        productHSIN: productForm.hsnCode,
        productImage1: uploadedImageUrls[0],
        productImage2: uploadedImageUrls[1],
        productImage3: uploadedImageUrls[2],
        productImage4: uploadedImageUrls[3],
        productDesc: productForm.description,
        productCost: parseFloat(productForm.price),
        productMOQ: parseInt(productForm.minOrderQty, 10),
        stock: parseInt(productForm.stock, 10),
        quoteStatus: productForm.quoteStatus,
        quantityAndPrice: productForm.quantityAndPrice.map((item) => ({
          qty: parseInt(item.qty, 10),
          platinum: parseFloat(item.platinum),
          gold: parseFloat(item.gold),
        })),
      };

      // Send request to add product
      const response = await axios.post(
        "https://api.profilegenie.in/api/client/add-products",
        {
          categoryName: productForm.categoryName,
          products: [productData],
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data) {
        alert(
          `Your product "${productForm.productName}" has been added successfully!`
        );
        window.location.reload();
        console.log("Product added successfully:", response.data);
        setProductForm({
          categoryName: "",
          productName: "",
          hsnCode: "",
          minOrderQty: "",
          price: "",
          stock: "",
          description: "",
          quoteStatus: false,
          productImages: [null, null, null, null],
          quantityAndPrice: [{ qty: "", platinum: "", gold: "" }],
        });
        setAddProductPopup(false);
      }
    } catch (error) {
      console.error("Error adding product:", error);
    } finally {
      setShowLoader(false);
    }
  };

  const handleAddProductClick = () => {
    setAddProductPopup(true);
  };

  const handleProductFormChange = (e) => {
    const { name, value } = e.target;
    setProductForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleProductImageChange = (e, index) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const newImages = [...productForm.productImages];
      newImages[index] = files[0]; // Update with the new file
      setProductForm({ ...productForm, productImages: newImages }); // Update the state
    }
  };

  const handleRemoveImage = (index) => {
    setProductForm((prev) => ({
      ...prev,
      [`productImage${index + 1}`]: null, // Reset the image file for removal
    }));
  };

  const handleQuantityAndPriceChange = (index, field, value) => {
    const updatedQAP = [...productForm.quantityAndPrice];
    updatedQAP[index][field] = value;
    setProductForm((prev) => ({
      ...prev,
      quantityAndPrice: updatedQAP,
    }));
  };

  const addQuantityAndPrice = () => {
    setProductForm((prev) => ({
      ...prev,
      quantityAndPrice: [
        ...prev.quantityAndPrice,
        { qty: "", platinum: "", gold: "" },
      ],
    }));
  };

  const removeQuantityAndPrice = (index) => {
    const updatedQAP = productForm.quantityAndPrice.filter(
      (_, i) => i !== index
    );
    setProductForm((prev) => ({
      ...prev,
      quantityAndPrice: updatedQAP,
    }));
  };

  const handleCloseDeletePopup = () => {
    setDeleteProductPopUp(false);
  };

  const [products, setAllProducts] = useState([]);

  useEffect(() => {
    const handleGetProducts = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await axios.get(
          "https://api.profilegenie.in/api/client/my-products",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.status === 200) {
          console.log("all products", response.data);
          setAllProducts(response.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    handleGetProducts();
  }, []);

  // DELETE PRODUCTS

  const [deleteproductid, setDeleteProductId] = useState("");
  const [categoryname, setCategoryName] = useState("");

  const handleDeleteClick = (categoryName, productId) => {
    setDeleteProductId(productId);
    setCategoryName(categoryName);

    setDeleteProductPopUp(true);
  };

  const deleteProducts = async () => {
    try {
      const token = localStorage.getItem("token");
      setDeleteLoader(true);
      // Log values to check if they are correctly set
      console.log("Category:", categoryname);
      console.log("Product ID:", deleteproductid);

      // Send delete request with category name in URL and product ID in the body
      const response = await axios.delete(
        `https://api.profilegenie.in/api/client/delete-category/${categoryname}`,
        {
          data: { productId: deleteproductid }, // Send productId in the request body
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        setDeleteLoader(false);
        alert(`The product has been deleted successfully!`);
        console.log("Product deleted successfully");
        setDeleteProductPopUp(false);
        // Optionally, refresh the product list after deletion
        window.location.reload();
        handleGetProducts();
        // window.location.reload();
      }
    } catch (e) {
      console.error("Error deleting product:", e);
    }
  };

  // edit cetegory

  const [editproductcategorypopup, setEditProductCategoryPopup] =
    useState(false);

  const handleEditproductClick = (categoryName) => {
    setCategoryName(categoryName);
    setEditProductCategoryPopup(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPortfolio((prev) => ({ ...prev, [name]: value }));
  };

  const [newCategoryName, setnewCategoryName] = useState("");

  const handleEditCategory = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        `https://api.profilegenie.in/api/client/edit/category/${categoryname}`,
        { newCategoryName }, // Use the actual state value
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        alert(`The Category has been updated successfully!`);
        window.location.reload();
        console.log("Category edited successfully");
        setEditProductCategoryPopup(false);
      }
    } catch (e) {
      console.log("Error editing category:", e); // Correct error logging
    }
  };

  // edit products

  const [editProductPopup, setEditProductPopUp] = useState(false);
  const [editProductId, setEditProductId] = useState("");

  const [editProductForm, setEditProductForm] = useState({
    productName: "",
    productQuantity: "",
    hsnCode: "",
    minOrderQty: "",
    price: "",
    stock: "",
    description: "",
    quoteStatus: false,
    productImages: [null, null, null, null],
    quantityAndPrice: [{ qty: "", platinum: "", gold: "", silver: "" }],
  });

  const handleEditProductFormChange = (e) => {
    const { name, value } = e.target;
    setEditProductForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleEditProductImageChange = (e, index) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const newImages = [...editProductForm.productImages];
      newImages[index] = files[0]; // Update with the new file
      setEditProductForm({ ...editProductForm, productImages: newImages }); // Update the state
    }
  };

  const handleEditProductSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      let productImageUrl = "";

      setShowLoader(true);

      const uploadedImageUrls = await handleProfileImagesUpload(
        editProductForm.productImages
      );
      console.log("Product Form Data:", editProductForm);
      console.log("Uploaded Image URLs:", uploadedImageUrls);

      const updatedProductData = {
        productName: editProductForm.productName,
        productQuantity: editProductForm.productQuantity,
        productHSN: editProductForm.hsnCode,
        productImage1: uploadedImageUrls[0],
        productImage2: uploadedImageUrls[1],
        productImage3: uploadedImageUrls[2],
        productImage4: uploadedImageUrls[3],
        productDesc: editProductForm.description,
        productCost: parseFloat(editProductForm.price),
        productMOQ: parseInt(editProductForm.minOrderQty, 10),
        stock: parseInt(editProductForm.stock, 10),
        quoteStatus: editProductForm.quoteStatus,
        quantityAndPrice: editProductForm.quantityAndPrice.map((item) => ({
          qty: parseInt(item.qty, 10),
          platinum: parseFloat(item.platinum),
          gold: parseFloat(item.gold),
        })),
      };

      const response = await axios.put(
        `https://api.profilegenie.in/api/client/edit/product/${editProductId}`,
        updatedProductData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        console.log("Product updated successfully");
        setEditProductForm({
          productName: "",
          productQuantity: "",
          hsnCode: "",
          minOrderQty: "",
          price: "",
          stock: "",
          description: "",
          quoteStatus: false,
          productImages: [null, null, null, null],
          quantityAndPrice: [{ qty: "", platinum: "", gold: "", silver: "" }],
        });
        setEditProductPopUp(false);
      }
      setShowLoader(false);
    } catch (error) {
      console.error("Error updating product:", error);
      setShowLoader(false);
      // Consider displaying an error message to the user here
    }
  };

  // const handleEditProductClick = (productId) => {
  //   setEditProductId(productId);
  //   setEditProductPopUp(true);
  // };
  const [editProductmePopup, setEditProductPopup] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        "https://api.profilegenie.in/api/client/my-products",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setAllProducts(response.data);
    };
    fetchProducts();
  }, []);

  // Handle edit click to open popup with prefilled product data
  const handleEditmyProductClick = (product) => {
    setEditProductId(product._id); // Set the product ID for editing
    console.log("product id is ", editProductId);
    setEditProductForm({
      productName: product.productName,
      productQuantity: product.productQuantity,
      hsnCode: product.productHSN,
      minOrderQty: product.productMOQ,
      price: product.productCost,
      stock: product.stock,
      description: product.productDesc,
      quoteStatus: product.quoteStatus,
      productImages: [
        product.productImage1,
        product.productImage2,
        product.productImage3,
        product.productImage4,
      ],
      quantityAndPrice: product.quantityAndPrice,
    });
    setEditProductPopUp(true); // Open the popup
  };

  return (
    <div>
      <div className="px-10 flex justify-between py-4 text-gray-900 items-center">
        <p className="text-5xl font-bold">Welcome Admin</p>
      </div>

      <div className="px-10 py-10 border">
        <div className="flex justify-end items-center mb-6">
          <button
            className="px-10 py-4 bg-black hover:bg-gray-800 text-gray-100 cursor-pointer rounded-lg"
            onClick={handleAddProductClick}
          >
            Add Products
          </button>
        </div>

        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-center text-gray-500">
            <thead className="text-xs text-gray-100 uppercase bg-black">
              <tr>
                <th className="px-6 py-3 border">Product Image</th>
                {/* <th className="px-6 py-3 border">HSIN Code</th> */}
                <th className="px-6 py-3 border">Product Name</th>
                {/* <th className="px-6 py-3 border">Stock</th> */}
                <th className="px-6 py-3 border">Description</th>
                {/* <th className="px-8 py-3 border">Price</th> */}
                <th className="px-6 py-3 border">Edit</th>
                <th className="px-6 py-3 border">Delete</th>
              </tr>
            </thead>
            <tbody>
              {products?.allProductsInfo &&
                products?.allProductsInfo?.length > 0 ? (
                products?.allProductsInfo.map(
                  (category) =>
                    // Check if the category contains products before rendering
                    category.products.length > 0 && (
                      <React.Fragment key={category._id}>
                        <tr>
                          <td
                            colSpan="8"
                            className="bg-gray-300 text-lg font-semibold px-6 py-3 border"
                          >
                            Category : - {category.categoryName}
                            <span
                              className="font-semibold text-red-500 ml-10 text-md  underline cursor-pointer"
                              onClick={() =>
                                handleEditproductClick(category?.categoryName)
                              }
                            >
                              Edit
                            </span>
                          </td>
                        </tr>
                        {category.products.map((product) => (
                          <tr
                            key={product._id}
                            className="odd:bg-white even:bg-gray-50 border-b"
                          >
                            <td>
                              <img
                                src={product?.productImage1 || dummyimage}
                                alt="Product"
                                className="w-full h-28"
                              />
                            </td>
                            {/* <td className="px-6 py-4 font-medium text-gray-900">
                              {product?.productHSIN}
                            </td> */}
                            <td className="px-6 py-4">
                              {product?.productName || "dummyname"}
                            </td>
                            {/* <td className="px-6 py-4">{product?.stock}</td> */}
                            <td className="px-6 py-4">
                              {product?.productDesc || "dummyDescription"}
                            </td>
                            {/* <td className="px-1 py-4 text-xs text-gray-900">
                              INR {product?.productCost?.toFixed(2)}
                            </td> */}
                            <td>
                              <button
                                className="text-blue-600 hover:text-blue-800"
                                onClick={() =>
                                  handleEditmyProductClick(product)
                                }
                              >
                                Edit
                              </button>
                            </td>
                            <td>
                              <button
                                className="text-red-600 hover:text-red-800"
                                onClick={() =>
                                  handleDeleteClick(
                                    category.categoryName,
                                    product?._id
                                  )
                                }
                              >
                                Delete
                              </button>
                            </td>
                          </tr>
                        ))}
                      </React.Fragment>
                    )
                )
              ) : (
                <tr>
                  <td colSpan="8" className="text-center px-6 py-4">
                    No products available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Product Popup */}
      {addProductPopup && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-900 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-7xl w-full h-screen overflow-y-auto">
            <h3 className="text-lg font-semibold mb-4">Add New Product</h3>
            <div className="grid grid-cols-7 gap-4">
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-900">
                  Category Name
                </label>
                <input
                  type="text"
                  name="categoryName"
                  value={productForm.categoryName}
                  onChange={handleProductFormChange}
                  className="block w-full mt-1 p-2 border border-gray-300 rounded-lg"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-900">
                  Product Name
                </label>
                <input
                  type="text"
                  name="productName"
                  value={productForm.productName}
                  onChange={handleProductFormChange}
                  className="block w-full mt-1 p-2 border border-gray-300 rounded-lg"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-900">
                  HSN Code
                </label>
                <input
                  type="text"
                  name="hsnCode"
                  value={productForm.hsnCode}
                  onChange={handleProductFormChange}
                  className="block w-full mt-1 p-2 border border-gray-300 rounded-lg"
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-900">
                  Product Quantity
                </label>
                <input
                  type="text"
                  name="productQuantity"
                  value={productForm.productQuantity}
                  onChange={handleProductFormChange}
                  className="block w-full mt-1 p-2 border border-gray-300 rounded-lg"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-900">
                  Min Order Quantity
                </label>
                <input
                  type="number"
                  name="minOrderQty"
                  value={productForm.minOrderQty}
                  onChange={handleProductFormChange}
                  className="block w-full mt-1 p-2 border border-gray-300 rounded-lg"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-900">
                  Price
                </label>
                <input
                  type="number"
                  name="price"
                  value={productForm.price}
                  onChange={handleProductFormChange}
                  className="block w-full mt-1 p-2 border border-gray-300 rounded-lg"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-900">
                  Stock
                </label>
                <input
                  type="number"
                  name="stock"
                  value={productForm.stock}
                  onChange={handleProductFormChange}
                  className="block w-full mt-1 p-2 border border-gray-300 rounded-lg"
                />
              </div>
            </div>

            {productForm.quantityAndPrice.map((item, index) => (
              <div
                key={index}
                className="quantity-price-row grid grid-cols-5 gap-6"
              >
                <div>
                  <label>Quantity</label>
                  <input
                    type="number"
                    className="block w-full mt-1 p-2 border border-gray-300 rounded-lg"
                    name="qty"
                    placeholder="Quantity"
                    value={item.qty}
                    onChange={(e) =>
                      handleQuantityAndPriceChange(index, "qty", e.target.value)
                    }
                    required
                  />
                </div>

                <div>
                  <label>Platinum</label>
                  <input
                    type="number"
                    name="platinum"
                    className="block w-full mt-1 p-2 border border-gray-300 rounded-lg"
                    placeholder="Platinum Price"
                    value={item.platinum}
                    onChange={(e) =>
                      handleQuantityAndPriceChange(
                        index,
                        "platinum",
                        e.target.value
                      )
                    }
                    required
                  />
                </div>

                <div>
                  <label>Gold</label>
                  <input
                    type="number"
                    name="gold"
                    className="block w-full mt-1 p-2 border border-gray-300 rounded-lg"
                    placeholder="Gold Price"
                    value={item.gold}
                    onChange={(e) =>
                      handleQuantityAndPriceChange(
                        index,
                        "gold",
                        e.target.value
                      )
                    }
                    required
                  />
                </div>

                <div>
                  <label>Silver</label>
                  <input
                    type="number"
                    name="silver"
                    className="block w-full mt-1 p-2 border border-gray-300 rounded-lg"
                    placeholder="Silver Price"
                    value={item.silver}
                    onChange={(e) =>
                      handleQuantityAndPriceChange(
                        index,
                        "silver",
                        e.target.value
                      )
                    }
                    required
                  />
                </div>
                {index > 0 && (
                  <button
                    type="button"
                    className="bg-red-500 rounded-md mt-4 px-2 py-2 text-gray-100 "
                    onClick={() => removeQuantityAndPrice(index)}
                  >
                    Remove
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              className="bg-gray-700 rounded-md mt-4 px-2 py-2 text-gray-100 "
              onClick={addQuantityAndPrice}
            >
              Add Quantity & Price
            </button>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-900">
                Description
              </label>
              <textarea
                name="description"
                value={productForm.description}
                onChange={handleProductFormChange}
                className="block w-full mt-1 p-2 border border-gray-300 rounded-lg"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-900">
                Product Images
              </label>
              {[...Array(4)].map((_, index) => (
                <div key={index} className="flex items-center mb-2">
                  {productForm.productImages[index] && (
                    <>
                      <img
                        src={URL.createObjectURL(
                          productForm.productImages[index]
                        )}
                        alt={`Product Image ${index + 1}`}
                        className="w-16 h-16 object-cover border border-gray-300 rounded"
                      />

                      <button
                        onClick={() => handleRemoveImage(index)}
                        className="ml-2 text-red-500"
                      >
                        Remove
                      </button>
                    </>
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleProductImageChange(e, index)}
                    className="ml-2"
                  />
                </div>
              ))}
            </div>

            <div className="flex justify-end">
              <button
                onClick={handleAddProductSubmit}
                className="px-4 py-2 bg-black text-white rounded-lg"
              >
                {" "}
                {showLoader ? (
                  <svg
                    aria-hidden="true"
                    class="inline w-4 h-4 text-gray-200 animate-spin  fill-blue-600"
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
                  <span class="relative z-10">Add Product</span>
                )}
              </button>
              <button
                onClick={() => setAddProductPopup(false)}
                className="ml-4 px-4 py-2 bg-gray-300 rounded-lg"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Product Popup */}
      {deleteProductPopup && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-900 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
            <h3 className="text-lg font-semibold mb-4">Delete Product</h3>
            <p className="mb-4">
              Are you sure you want to delete this product?
            </p>
            <div className="flex justify-end">
              <button
                className="px-4 py-2 bg-red-600 text-white rounded-lg"
                onClick={deleteProducts}
              >
                {deleteloader ? (
                  <svg
                    aria-hidden="true"
                    class="inline w-4 h-4 text-gray-200 animate-spin  fill-blue-600"
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
                  <span class="relative z-10"> Delete</span>
                )}
              </button>
              <button
                onClick={handleCloseDeletePopup}
                className="ml-4 px-4 py-2 bg-gray-300 rounded-lg"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {editproductcategorypopup && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-900 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-2xl w-full">
            <h3 className="text-lg font-semibold mb-4">Edit Product</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-900">
                  Category Name
                </label>
                <input
                  type="text"
                  name="newCategoryName"
                  value={newCategoryName}
                  onChange={(e) => setnewCategoryName(e.target.value)} // Update state correctly
                  className="block w-full mt-1 p-2 border border-gray-300 rounded-lg"
                />
              </div>
            </div>

            <div className="flex justify-end">
              <button
                onClick={handleEditCategory}
                className="px-4 py-2 bg-black text-white rounded-lg"
              >
                {" "}
                {showLoader ? (
                  <svg
                    aria-hidden="true"
                    class="inline w-4 h-4 text-gray-200 animate-spin  fill-blue-600"
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
                  <span class="relative z-10">Edit Product</span>
                )}
              </button>
              <button
                onClick={() => setEditProductCategoryPopup(false)}
                className="ml-4 px-4 py-2 bg-gray-300 rounded-lg"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Product Form */}
      {/* {editProductPopup && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-900 bg-opacity-50">
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-5xl w-full">
            <h3 className="text-xl font-bold mb-4 text-gray-800">
              Edit Product
            </h3>
            <form onSubmit={handleEditProductSubmit} className="space-y-4">
              <div className="grid grid-cols-6 items-center gap-4">
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-900">
                    Product Name
                  </label>
                  <input
                    type="text"
                    name="productName"
                    value={editProductForm.productName}
                    onChange={handleEditProductFormChange}
                    className="block w-full mt-1 p-2 border border-gray-300 rounded-lg"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-900">
                    HSN Code
                  </label>
                  <input
                    type="text"
                    name="hsnCode"
                    value={editProductForm.hsnCode}
                    onChange={handleEditProductFormChange}
                    className="block w-full mt-1 p-2 border border-gray-300 rounded-lg"
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-900">
                    Product Quantity
                  </label>
                  <input
                    type="text"
                    name="productQuantity"
                    value={editProductForm.productQuantity}
                    onChange={handleEditProductFormChange}
                    className="block w-full mt-1 p-2 border border-gray-300 rounded-lg"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-900">
                    Min Order Quantity
                  </label>
                  <input
                    type="number"
                    name="minOrderQty"
                    value={editProductForm.minOrderQty}
                    onChange={handleEditProductFormChange}
                    className="block w-full mt-1 p-2 border border-gray-300 rounded-lg"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-900">
                    Price
                  </label>
                  <input
                    type="number"
                    name="price"
                    value={editProductForm.price}
                    onChange={handleEditProductFormChange}
                    className="block w-full mt-1 p-2 border border-gray-300 rounded-lg"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-900">
                    Stock
                  </label>
                  <input
                    type="number"
                    name="stock"
                    value={editProductForm.stock}
                    onChange={handleEditProductFormChange}
                    className="block w-full mt-1 p-2 border border-gray-300 rounded-lg"
                  />
                </div>
              </div>

              {editProductForm.quantityAndPrice.map((item, index) => (
                <div
                  key={index}
                  className="quantity-price-row grid grid-cols-4 gap-6"
                >
                  <input
                    type="number"
                    className="block w-full mt-1 p-2 border border-gray-300 rounded-lg"
                    name="qty"
                    placeholder="Quantity"
                    value={item.qty}
                    onChange={(e) =>
                      handleQuantityAndPriceChange(index, "qty", e.target.value)
                    }
                    required
                  />
                  <input
                    type="number"
                    name="platinum"
                    className="block w-full mt-1 p-2 border border-gray-300 rounded-lg"
                    placeholder="Platinum Price"
                    value={item.platinum}
                    onChange={(e) =>
                      handleQuantityAndPriceChange(
                        index,
                        "platinum",
                        e.target.value
                      )
                    }
                    required
                  />
                  <input
                    type="number"
                    name="gold"
                    className="block w-full mt-1 p-2 border border-gray-300 rounded-lg"
                    placeholder="Gold Price"
                    value={item.gold}
                    onChange={(e) =>
                      handleQuantityAndPriceChange(
                        index,
                        "gold",
                        e.target.value
                      )
                    }
                    required
                  />
                  {index > 0 && (
                    <button
                      type="button"
                      className="bg-red-500 rounded-md mt-4 px-2 py-2 text-gray-100"
                      onClick={() => removeQuantityAndPrice(index)}
                    >
                      Remove
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                className="bg-gray-700 rounded-md mt-4 px-2 py-2 text-gray-100"
                onClick={addQuantityAndPrice}
              >
                Add Quantity & Price
              </button>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-900">
                  Description
                </label>
                <textarea
                  name="description"
                  value={editProductForm.description}
                  onChange={handleEditProductFormChange}
                  className="block w-full mt-1 p-2 border border-gray-300 rounded-lg"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-900">
                  Product Images
                </label>
                {[...Array(4)].map((_, index) => (
                  <div key={index} className="flex items-center mb-2">
                    {editProductForm.productImages[index] && (
                      <>
                        <img
                          src={URL.createObjectURL(
                            editProductForm.productImages[index]
                          )}
                          alt={`Product Image ${index + 1}`}
                          className="w-16 h-16 object-cover border border-gray-300 rounded"
                        />
                        <button
                          onClick={() => handleRemoveImage(index)}
                          className="ml-2 text-red-500"
                        >
                          Remove
                        </button>
                      </>
                    )}
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleEditProductImageChange(e, index)}
                      className="ml-2"
                    />
                  </div>
                ))}
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={showLoader}
                  className={`px-6 py-2 rounded-lg bg-black text-white font-bold ${
                    showLoader
                      ? "opacity-50 cursor-not-allowed"
                      : "hover:bg-black"
                  }`}
                >
                  {showLoader ? "Updating..." : "Update Product"}
                </button>

                <button
                  className="bg-gray-300 px-4 py-2 text-black ml-3 rounded-md"
                  onClick={() => setEditProductPopUp(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )} */}

      {editProductPopup && (
        <EditProductPopup
          productId={editProductId}
          productForm={editProductForm}
          setProductForm={setEditProductForm}
          handleSubmit={handleEditProductSubmit}
          handleClose={() => setEditProductPopUp(false)} // Close popup
        />
      )}

      <div></div>
    </div>
  );
};

export default Admin1Home;


