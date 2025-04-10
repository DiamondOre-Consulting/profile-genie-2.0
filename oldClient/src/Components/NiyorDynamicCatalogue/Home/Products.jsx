import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import LazyLoad from "react-lazyload";

const Products = ({ allproducts }) => {
  const productsRef = useRef([]);

  // Register ScrollTrigger plugin
  // useEffect(() => {
  //   gsap.registerPlugin(ScrollTrigger);

  //   productsRef.current.forEach((el, index) => {
  //     gsap.fromTo(
  //       el,
  //       { y: 100, opacity: 0 }, // Start state
  //       {
  //         y: 0,
  //         opacity: 1, // End state
  //         duration: 1,
  //         ease: "power4.out",
  //         scrollTrigger: {
  //           trigger: el,
  //           start: "top 80%",
  //           toggleActions: "play none none reverse",
  //         },
  //         delay: index * 0.2,
  //       }
  //     );
  //   });

  //   return () => ScrollTrigger.refresh();
  // }, [allproducts]);

  const cleanDescription = (description) => {
    if (typeof description === "string") {
      return description
        .trim() // Remove leading and trailing spaces
        .replace(/\s+/g, " "); // Replace multiple spaces with a single space
    }
    return description; // In case description is not a string
  };

  return (
    <div id="products">
      <section
        id="Products"
        className="w-fit mx-auto mt-6 mb-5 md:px-0 md:px-0"
      >
        {allproducts && Array.isArray(allproducts) && allproducts.length > 0 ? (
          allproducts
            .filter(
              (category) => category.products && category.products.length > 0
            )
            .map((category) => (
              <div key={category._id} className="mb-10">
                <h2 className=" text-4xl md:text-7xl mb-3 text-gray-800 head text-center">
                  {category.categoryName}
                </h2>
                <div className="w-40 h-1 bg-c1 mb-20 mx-auto"></div>
                <div className="grid grid-cols-1 lg:grid-cols-1 gap-y-10  md:gap-y-20 gap-x-10">
                  {category.products.map((product, i) => (
                    <div key={product._id}>
                      {/* Product Details */}
                      <div
                        ref={(el) => (productsRef.current[i] = el)}
                        className="rounded-xl md:p-4 flex items-center lg:flex-row duration-500"
                      >
                        {/* Left Side: Image */}
                        <div className="relative w-[300px] md:w-[400px] h-[240px] md:h-[600px]  lg:mb-0">
                          <LazyLoad height={600} offset={100}>
                            <div
                              className="absolute inset-0 bg-cover bg-center"
                              style={{
                                backgroundImage: `url(${product.productImage1})`, // Background image
                                height: "100%",
                                width: "100%",
                              }}
                            />
                          </LazyLoad>
                        </div>

                        {/* Right Side: Product Info */}
                        <div className="w-full lg:w-2/3 md:pl-20 pl-10 pr-4 md:pr-0 md:mt-20">
                          <div>
                            {product?.productQuantity && (
                              <span className="block text-sm md:text-2xl  head text-gray-700">
                                {product?.productQuantity}ml
                              </span>
                            )}

                            <span className="block text-sm md:text-2xl text-gray-500">
                              {product.productHSIN}
                            </span>
                            <h3 className="text-[20px] md:text-8xl  mt-2 text-gray-700 head">
                              {product.productName}
                            </h3>
                            <p className="text-[8px] md:text-2xl md:pr-40 pr-12 md:pr-0 text-justify text-gray-800 mt-14 ">
                              {cleanDescription(product.productDesc)}
                            </p>
                          </div>
                          <div className="mt-6">
                            {product.productMOQ && (
                              <p className="text-md font-semibold">
                                MOQ: {product.productMOQ}
                              </p>
                            )}
                            {product.productCost && (
                              <p className="text-3xl font-bold text-black npf">
                                Price: ${product.productCost}
                              </p>
                            )}
                            {product.stock !== undefined && (
                              <p className="text-3xl mt-4 font-bold">
                                {product.stock > 0
                                  ? `Stock: ${product.stock}`
                                  : ""}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Featured Image Section after each product */}
                      <div className="grid grid-cols-1 md:grid-cols-2 ">
                        {product.productImage3 && (
                          <LazyLoad height={600} offset={100}>
                            <div
                              className="w-full h-[600px] bg-cover bg-center "
                              style={{
                                backgroundImage: `url(${product.productImage3})`, // Dynamic featured image
                              }}
                            />
                          </LazyLoad>
                        )}

                        {product.productImage4 && (
                          <LazyLoad height={600} offset={100}>
                            <div
                              className="w-full h-[600px] bg-cover bg-center "
                              style={{
                                backgroundImage: `url(${product.productImage4})`, // Dynamic featured image
                              }}
                            />
                          </LazyLoad>
                        )}
                      </div>

                      {product.productImage2 && (
                        <LazyLoad height={600} offset={100}>
                          <div
                            className="w-full h-[400px] md:h-[600px] bg-cover bg-center "
                            style={{
                              backgroundImage: `url(${product.productImage2})`, // Dynamic featured image
                            }}
                          />
                        </LazyLoad>
                      )}

                      {/* Quantity Table after each product */}
                      {product.quantityAndPrice &&
                        product.quantityAndPrice.length > 0 &&
                        product.quantityAndPrice.some(
                          (qtyItem) =>
                            qtyItem.qty ||
                            qtyItem.platinum ||
                            qtyItem.gold ||
                            qtyItem.silver
                        ) && (
                          <div className="w-full flex items-center justify-center ">
                            <div className="max-w-lg md:w-full md:max-w-6xl md:px-4 text-center">
                              <table className="table-auto w-full border-separate border-spacing-y-2 text-[#4e3d28]">
                                <thead>
                                  <tr>
                                    <th className="p-4 border-b-2 border-[#4e3d28] text-lg md:text-4xl head ">
                                      Qty.
                                    </th>
                                    <th className="p-4 border-b-2 border-[#4e3d28] text-lg md:text-4xl head ">
                                      Platinum
                                    </th>
                                    <th className="p-4 border-b-2 border-[#4e3d28] text-lg md:text-4xl head ">
                                      Gold
                                    </th>
                                    <th className="p-4 border-b-2 border-[#4e3d28] text-lg md:text-4xl head ">
                                      Silver
                                    </th>
                                  </tr>
                                </thead>
                                <tbody className="text-[#4e3d28]">
                                  {product.quantityAndPrice.map((qtyItem) => (
                                    <tr key={qtyItem._id}>
                                      <td className="md:p-4 p-1 text-xs md:text-xl">
                                        {qtyItem.qty || "-"}
                                      </td>
                                      <td className="md:p-4 text-xs md:text-xl">
                                        ₹ {qtyItem.platinum || "-"}
                                      </td>
                                      <td className="md:p-4 text-xs md:text-xl ">
                                        ₹ {qtyItem.gold || "-"}
                                      </td>

                                      <td className="md:p-4 text-xs md:text-xl">
                                        ₹ {qtyItem.silver || "-"}
                                      </td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          </div>
                        )}
                    </div>
                  ))}
                </div>
              </div>
            ))
        ) : (
          <p>No products available</p>
        )}
      </section>
    </div>
  );
};

export default Products;
