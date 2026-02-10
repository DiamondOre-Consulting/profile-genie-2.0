import axios from "axios";
import React, { useEffect, useState } from "react";

const Admin1Home = () => {
  const [deleteProductPopup, setDeleteProductPopUp] = useState(false);
  const [addProductPopup, setAddProductPopup] = useState(false);
  const [showLoader, setShowLoader] = useState(false);
  const [productForm, setProductForm] = useState({
    categoryName: "",
    productName: "",
    hsnCode: "",
    minOrderQty: "",
    price: "",
    stock: "",
    description: "",
    productImage: null,
  });

  const handleProfileImageUpload = async (file) => {
    try {
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

      if (!response.data) {
        throw new Error("Error uploading profile image");
      }
      console.log("response.data", response.data);

      return response.data; // Return URL of the uploaded image
    } catch (error) {
      console.error("Error uploading profile image:", error);
      return null;
    }
  };

  const handleAddProductSubmit = async () => {
    try {
      const token = localStorage.getItem("token");
      let productImageUrl = "";

      setShowLoader(true);
      if (productForm.productImage) {
        productImageUrl = await handleProfileImageUpload(
          productForm.productImage
        );
        if (!productImageUrl) {
          throw new Error("Error uploading product image");
        }
      }

      // Prepare product data
      const productData = {
        productName: productForm.productName,
        productHSIN: productForm.hsnCode,
        productImage: productImageUrl,
        productDesc: productForm.description,
        productCost: parseFloat(productForm.price),
        productMOQ: parseInt(productForm.minOrderQty, 10),
        stock: parseInt(productForm.stock, 10),
      };

      // Prepare category data
      console.log("productData", productData);
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
        console.log("Product added successfully:", response.data);
        setProductForm({
          categoryName: "",
          productName: "",
          hsnCode: "",
          minOrderQty: "",
          price: "",
          stock: "",
          description: "",
          productImage: null,
        });
        setAddProductPopup(false);
        setShowLoader(false);
      }
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  const handleAddProductClick = () => {
    setAddProductPopup(true);
  };

  const handleAddProductToCategory = (categoryName) => {
    setProductForm((prev) => ({
      ...prev,
      categoryName: categoryName,
    }));
    setAddProductPopup(true);
  };

  const handleProductFormChange = (e) => {
    const { name, value } = e.target;
    setProductForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleProductImageChange = (e) => {
    setProductForm((prev) => ({
      ...prev,
      productImage: e.target.files[0],
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
        console.log("Product deleted successfully");
        setDeleteProductPopUp(false);
        // Optionally, refresh the product list after deletion
        handleGetProducts();
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
    hsnCode: "",
    minOrderQty: "",
    price: "",
    stock: "",
    description: "",
    productImage: null,
  });

  const handleEditProductFormChange = (e) => {
    const { name, value } = e.target;
    setEditProductForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleEditProductImageChange = (e) => {
    setEditProductForm((prev) => ({
      ...prev,
      productImage: e.target.files[0],
    }));
  };

  const handleEditProductSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submit action
    try {
      const token = localStorage.getItem("token");
      let productImageUrl = "";

      setShowLoader(true);

      // Check if product image is being updated
      console.log("editProductForm.productImage", editProductForm.productImage);
      if (editProductForm.productImage) {
        productImageUrl = await handleProfileImageUpload(
          editProductForm.productImage
        );
        if (!productImageUrl) {
          throw new Error("Error uploading product image");
        }
      }

      // Prepare product data to send in the request body
      const updatedProductData = {
        productName: editProductForm.productName,
        productHSIN: editProductForm.hsnCode,
        productImage: productImageUrl || undefined, // Keep undefined if no image is uploaded
        productDesc: editProductForm.description,
        productCost: parseFloat(editProductForm.price),
        productMOQ: parseInt(editProductForm.minOrderQty, 10),
        stock: parseInt(editProductForm.stock, 10),
      };

      // Send a PUT request to the backend API to update the product
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
        console.log("Product updated successfully:", response.data);
        // Reset the form and close the popup
        setEditProductPopUp(false);
        setShowLoader(false);
      }
    } catch (error) {
      console.error("Error updating product:", error);
      setShowLoader(false);
    }
  };

  const handleEditProductClick = (productId) => {
    setEditProductId(productId);
    setEditProductPopUp(true);
  };

  return (
    <div>
      <div className="flex items-center justify-between px-10 py-4 text-gray-900">
        <p className="text-5xl font-bold">Welcome Admin</p>
      </div>

      <div className="px-10 py-10 border">
        <div className="flex items-center justify-between mb-6">
          <div className="relative">
            <input
              type="text"
              className="block py-2 pt-2 text-sm text-gray-900 border border-gray-300 rounded-lg ps-10 w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Search for items"
            />
          </div>

          <button
            className="px-10 py-4 text-gray-100 bg-black cursor-pointer"
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
                <th className="px-6 py-3 border">HSIN Code</th>
                <th className="px-6 py-3 border">Product Name</th>
                <th className="px-6 py-3 border">Stock</th>
                <th className="px-6 py-3 border">Description</th>
                <th className="px-6 py-3 border">Price</th>
                <th className="px-6 py-3 border">Edit</th>
                <th className="px-6 py-3 border">Delete</th>
              </tr>
            </thead>
            <tbody>
              {products.allProductsInfo &&
                products.allProductsInfo.length > 0 ? (
                products.allProductsInfo.map(
                  (category) =>
                    // Check if the category contains products before rendering
                    category.products.length > 0 && (
                      <React.Fragment key={category._id}>
                        <tr>
                          <td
                            colSpan="8"
                            className="px-6 py-3 text-lg font-semibold bg-gray-300 border"
                          >
                            Category : - {category.categoryName}
                            <span
                              className="ml-10 font-semibold text-red-500 underline cursor-pointer text-md"
                              onClick={() =>
                                handleEditproductClick(category?.categoryName)
                              }
                            >
                              Edit
                            </span>
                            <span
                              className="ml-5 font-semibold text-green-500 underline cursor-pointer text-md"
                              onClick={() =>
                                handleAddProductToCategory(category.categoryName)
                              }
                            >
                              Add
                            </span>
                          </td>
                        </tr>
                        {category.products.map((product) => (
                          <tr
                            key={product._id}
                            className="border-b odd:bg-white even:bg-gray-50"
                          >
                            <td>
                              <img
                                src={product?.productImage}
                                alt="Product"
                                className="w-full h-28"
                              />
                            </td>
                            <td className="px-6 py-4 font-medium text-gray-900">
                              {product?.productHSIN}
                            </td>
                            <td className="px-6 py-4">
                              {product?.productName}
                            </td>
                            <td className="px-6 py-4">{product?.stock}</td>
                            <td className="px-6 py-4">
                              {product?.productDesc}
                            </td>
                            <td className="px-6 py-4">
                              INR {product?.productCost?.toFixed(2)}
                            </td>
                            <td>
                              <button
                                className="text-blue-600 hover:text-blue-800"
                                onClick={() =>
                                  handleEditProductClick(product?._id)
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
                  <td colSpan="8" className="px-6 py-4 text-center">
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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="w-full max-w-2xl p-6 bg-white rounded-lg shadow-lg">
            <h3 className="mb-4 text-lg font-semibold">Add New Product</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-900">
                  Category Name
                </label>
                <input
                  type="text"
                  name="categoryName"
                  value={productForm.categoryName}
                  onChange={handleProductFormChange}
                  className="block w-full p-2 mt-1 border border-gray-300 rounded-lg"
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
                  className="block w-full p-2 mt-1 border border-gray-300 rounded-lg"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-900">
                  HSN Code
                </label>
                <input
                  type="text"
                  name="hsnCode"
                  value={productForm.hsnCode}
                  onChange={handleProductFormChange}
                  className="block w-full p-2 mt-1 border border-gray-300 rounded-lg"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-900">
                  Minimum Order Quantity
                </label>
                <input
                  type="number"
                  name="minOrderQty"
                  value={productForm.minOrderQty}
                  onChange={handleProductFormChange}
                  className="block w-full p-2 mt-1 border border-gray-300 rounded-lg"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-900">
                  Price
                </label>
                <input
                  type="number"
                  name="price"
                  value={productForm.price}
                  onChange={handleProductFormChange}
                  className="block w-full p-2 mt-1 border border-gray-300 rounded-lg"
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
                  className="block w-full p-2 mt-1 border border-gray-300 rounded-lg"
                />
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-900">
                Description
              </label>
              <textarea
                name="description"
                value={productForm.description}
                onChange={handleProductFormChange}
                className="block w-full p-2 mt-1 border border-gray-300 rounded-lg"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-900">
                Product Image
              </label>
              <input
                type="file"
                onChange={handleProductImageChange}
                className="block w-full mt-1"
              />
            </div>
            <div className="flex justify-end">
              <button
                onClick={handleAddProductSubmit}
                className="px-4 py-2 text-white bg-black rounded-lg"
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
                className="px-4 py-2 ml-4 bg-gray-300 rounded-lg"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Product Popup */}
      {deleteProductPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="w-full max-w-lg p-6 bg-white rounded-lg shadow-lg">
            <h3 className="mb-4 text-lg font-semibold">Delete Product</h3>
            <p className="mb-4">
              Are you sure you want to delete this product?
            </p>
            <div className="flex justify-end">
              <button
                className="px-4 py-2 text-white bg-red-600 rounded-lg"
                onClick={deleteProducts}
              >
                Delete
              </button>
              <button
                onClick={handleCloseDeletePopup}
                className="px-4 py-2 ml-4 bg-gray-300 rounded-lg"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {editproductcategorypopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="w-full max-w-2xl p-6 bg-white rounded-lg shadow-lg">
            <h3 className="mb-4 text-lg font-semibold">Edit Product</h3>
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
                  className="block w-full p-2 mt-1 border border-gray-300 rounded-lg"
                />
              </div>
            </div>

            <div className="flex justify-end">
              <button
                onClick={handleEditCategory}
                className="px-4 py-2 text-white bg-black rounded-lg"
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
                className="px-4 py-2 ml-4 bg-gray-300 rounded-lg"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Product Form */}
      {editProductPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="w-full max-w-3xl p-8 bg-white rounded-lg shadow-lg">
            <h3 className="mb-4 text-xl font-bold text-gray-800">
              Edit Product
            </h3>
            <form onSubmit={handleEditProductSubmit} className="space-y-4">
              <div className="flex items-center justify-between space-x-4">
                <div>
                  <label className="block font-medium text-gray-700">
                    Product Name
                  </label>
                  <input
                    type="text"
                    name="productName"
                    placeholder="Product Name"
                    value={editProductForm.productName}
                    onChange={handleEditProductFormChange}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block font-medium text-gray-700">
                    HSN Code
                  </label>
                  <input
                    type="text"
                    name="hsnCode"
                    placeholder="HSN Code"
                    value={editProductForm.hsnCode}
                    onChange={handleEditProductFormChange}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block font-medium text-gray-700">
                    Min Order Qty
                  </label>
                  <input
                    type="number"
                    name="minOrderQty"
                    placeholder="Min Order Qty"
                    value={editProductForm.minOrderQty}
                    onChange={handleEditProductFormChange}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="flex space-x-4 tems-center ">
                <div>
                  <label className="block font-medium text-gray-700">
                    Price
                  </label>
                  <input
                    type="number"
                    name="price"
                    placeholder="Price"
                    value={editProductForm.price}
                    onChange={handleEditProductFormChange}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block font-medium text-gray-700">
                    Stock
                  </label>
                  <input
                    type="number"
                    name="stock"
                    placeholder="Stock"
                    value={editProductForm.stock}
                    onChange={handleEditProductFormChange}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block font-medium text-gray-700">
                  Description
                </label>
                <textarea
                  name="description"
                  placeholder="Description"
                  value={editProductForm.description}
                  onChange={handleEditProductFormChange}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows="4"
                />
              </div>
              <div>
                <label className="block font-medium text-gray-700">
                  Product Image
                </label>
                <input
                  type="file"
                  name="productImage"
                  onChange={handleEditProductImageChange}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={showLoader}
                  className={`px-6 py-2 rounded-lg bg-black text-white font-bold ${showLoader
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:bg-black"
                    }`}
                >
                  {showLoader ? "Updating..." : "Update Product"}
                </button>

                <button
                  className="px-4 py-2 ml-3 text-black bg-gray-300 rounded-md"
                  onClick={() => setEditProductPopUp(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Admin1Home;
