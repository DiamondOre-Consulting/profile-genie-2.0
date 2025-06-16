import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { useGetSingleProductQuery } from "@/Redux/API/CatalogueApi";
import { IconMinus, IconPlus } from "@tabler/icons-react";
import ExploreProduct from "./ExploreProduct";
import AnimateNumber from "../components/AnimateNumber";
import {
  catalogueResponse,
  productDetail,
} from "@/validations/CatalogueValidation";

const ProductDetail = ({
  cart,
  setCart,
  productData,
  bgColor,
  userName,
}: {
  cart: productDetail[];
  setCart: React.Dispatch<React.SetStateAction<productDetail[]>>;
  productData: catalogueResponse;
  bgColor: string;
  userName: string;
}) => {
  const { productId } = useParams();
  const { data, isLoading, refetch, isFetching } = useGetSingleProductQuery({
    productId,
  });
  const [product, setProduct] = useState<productDetail>();
  const navigate = useNavigate();

  useEffect(() => {
    refetch();
  }, [productId]);

  useEffect(() => {
    if (data) {
      const cartItem = cart.find(
        (item: productDetail) => (item.id || item._id) === productId
      );
      if (cartItem) {
        setProduct({ ...data?.data, quantity: cartItem.quantity });
      } else {
        setProduct({ ...data?.data, quantity: 0 });
      }
    }
  }, [productId, cart, isLoading, data]);

  const updateCartInLocalStorage = (newCart: productDetail[]) => {
    localStorage.setItem("cart", JSON.stringify(newCart));
  };

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [productId]);

  const addToCart = (newQuantity: number, id: string) => {
    const existingItem = cart.find((item) => (item._id || item.id) === id);

    if (existingItem) {
      const updatedCart = cart.map((item: productDetail) =>
        (item._id || item?.id) === (product?._id || product?.id)
          ? { ...item, quantity: newQuantity }
          : item
      );
      setCart(updatedCart);
      updateCartInLocalStorage(updatedCart);
    } else {
      const updatedCart = [...cart, { ...product, quantity: newQuantity }];
      setCart(updatedCart as productDetail[]);
      updateCartInLocalStorage(updatedCart as productDetail[]);
    }
  };

  const removeFromCart = () => {
    const updatedCart = cart.filter(
      (item) => (item._id || item.id) !== (product?._id || product?.id)
    );
    setCart(updatedCart);
    updateCartInLocalStorage(updatedCart);
  };

  const increaseQuantity = () => {
    const updatedItem = cart.find(
      (item) => (item.id || item._id) === (product?._id || product?.id)
    );
    if (updatedItem) {
      if (product?._id || product?.id) {
        addToCart(
          (updatedItem?.quantity ?? 0) + 1,
          product?._id || product?.id || ""
        );
      }
    } else {
      addToCart(1, product?._id || product?.id || "");
    }
  };

  const decreaseQuantity = () => {
    const updatedItem = cart.find(
      (item) => (item.id || item._id) === product?._id
    );
    if (updatedItem && (updatedItem.quantity ?? 0) > 1) {
      addToCart(
        (updatedItem?.quantity ?? 0) - 1,
        product?._id || product?.id || ""
      );
    } else {
      removeFromCart();
    }
  };

  // if (!product) {
  //     return <div>Product not found!</div>;
  // }

  const isInCart = cart.some(
    (item) => (item.id || item._id) === (product?._id || product?.id)
  );

  const buyButton = () => {
    if (isInCart) {
      navigate(`/catalogue/1/${userName}/cart`);
    } else {
      const updatedItem = cart.find(
        (item) => (item.id || item._id) === (product?._id || product?.id)
      );
      if (updatedItem) {
        addToCart(
          (updatedItem.quantity ?? 0) + 1,
          product?._id || product?.id || ""
        );
      }
      navigate(`/catalogue/1/${userName}/cart`);
    }
  };

  const ProductPreviews = () => {
    const [selectedImage, setSelectedImage] = useState(0);
    const [isZoomed, setIsZoomed] = useState(false);

    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    return (
      <div
        style={{ backgroundColor: lightenColor(bgColor, 0.95) }}
        className="flex flex-col items-center gap-4 p-2 border border-gray-200 rounded-md shadow-lg sm:flex-row-reverse"
      >
        <div className="flex w-full space-x-2 top-10">
          <div
            className="relative overflow-hidden w-full h-[50vh] lg:h-[25rem]"
            onMouseEnter={() => setIsZoomed(true)}
            onMouseLeave={() => setIsZoomed(false)}
            onMouseMove={(e) => {
              const target = e.target as HTMLElement;
              const { left, top, width, height } =
                target.getBoundingClientRect();
              const x = ((e.clientX - left) / width) * 100;
              const y = ((e.clientY - top) / height) * 100;
              setMousePosition({ x, y });
            }}
          >
            <img
              src={product?.image[selectedImage].url}
              alt={`Preview ${selectedImage + 1}`}
              className={` w-full mx-auto h-[50vh] object-center lg:h-[25rem] lg:w-[34rem] object-cover rounded-md transition-transform duration-200 ${
                isZoomed ? "scale-[2]" : "scale-100"
              }`}
              style={{
                transformOrigin: `${mousePosition.x}% ${mousePosition.y}%`,
              }}
            />
          </div>
        </div>
        <div className="flex gap-4 top-10 sm:flex-col">
          {product?.image &&
            product?.image?.length > 1 &&
            product?.image.map((image, index) => (
              <button
                key={index}
                onClick={() => {
                  setSelectedImage(index);
                }}
                className={`w-20 h-20 overflow-hidden object-cover  ${
                  selectedImage === index
                    ? " border-blue-400"
                    : " border-gray-500"
                } border-2 rounded`}
              >
                <img
                  src={image.url}
                  alt={`Thumbnail ${index + 1}`}
                  className="rounded "
                />
              </button>
            ))}
          {/* {productVideo && (
                        <div
                            className="relative"
                            onClick={() => {
                                setVideoActive(true);
                                setSelectedImage(null);
                            }}
                        >
                            <video
                                src={productVideo}
                                controls={false}
                                className={`w-20 h-20  ${videoActive ? "border-2 rounded border-blue-500" : ""
                                    }`}
                            ></video>
                            <FaPlayCircle
                                className="absolute text-gray-500 transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
                                size={40}
                            />
                        </div>
                    )} */}
        </div>
      </div>
    );
  };

  const lightenColor = (color: string, percent: number) => {
    const num = parseInt(color?.slice(1), 16),
      amt = Math.round(2.55 * percent * 100),
      r = (num >> 16) + amt,
      g = ((num >> 8) & 0x00ff) + amt,
      b = (num & 0x0000ff) + amt;

    return `rgb(${Math.min(255, r)}, ${Math.min(255, g)}, ${Math.min(255, b)})`;
  };

  const ProductSkeleton = () => {
    return (
      <div className="w-full py-10 md:py-16 max-w-[80rem] p-4 px-4 sm:px-10 mx-auto md:px-20 lg:px-6">
        <div className="grid items-center grid-cols-1 gap-6 mt-4 lg:grid-cols-2 md:gap-0">
          <div className="top-0 w-full mx-auto sm:w-[90%] animate-pulse">
            <div className="w-full h-[300px] sm:h-[400px] bg-gray-300 rounded-lg"></div>
          </div>

          <div className="lg:w-[90%] animate-pulse">
            <div className="w-3/4 h-8 mb-4 bg-gray-300 rounded"></div>
            <div className="mb-6 space-y-2">
              <div className="w-full h-4 bg-gray-300 rounded"></div>
              <div className="w-5/6 h-4 bg-gray-300 rounded"></div>
              <div className="w-5/6 h-4 bg-gray-300 rounded"></div>
              <div className="w-2/3 h-4 bg-gray-300 rounded"></div>
              <div className="w-2/3 h-4 bg-gray-300 rounded"></div>
              <div className="w-1/2 h-4 bg-gray-300 rounded"></div>
            </div>

            {/* Price + Stock */}
            <div className="flex items-center gap-4 mb-6">
              <div className="w-20 h-6 bg-gray-300 rounded"></div>
              <div className="w-24 h-5 bg-gray-300 rounded"></div>
            </div>

            {/* Quantity Controls */}
            <div className="flex items-center justify-start gap-4 mt-6">
              <div className="flex items-center w-full gap-2">
                <div className="text-sm w-full h-[2.5rem] bg-gray-300 rounded-md"></div>
              </div>
              <div className="w-full h-[2.5rem] bg-gray-300 rounded-md"></div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="overflow-hidden overflow-x-hidden bg-white">
      {isLoading || isFetching || !product ? (
        <ProductSkeleton />
      ) : (
        <div className="w-full py-10 md:py-16 max-w-[80rem] p-4 px-4 sm:px-10 mx-auto  md:px-20 lg:px-6">
          <div className="grid items-center grid-cols-1 gap-6 mt-4 lg:grid-cols-2 md:gap-0">
            <div
              data-aos="zoom-in"
              className=" top-0 w-full mx-auto sm:w-[90%] "
            >
              <ProductPreviews />
            </div>

            <div className=" lg:w-[90%]">
              <div className="mb-6 ">
                <h1
                  style={{ color: lightenColor(bgColor, -0.3) }}
                  className="mb-4 text-2xl font-medium leading-none md:text-4xl"
                >
                  {product.name}
                </h1>

                <p className="my-4 opacity-70 lg:mr-16 xl:mr-20">
                  {product.description}
                </p>
                <div className="flex items-center gap-4">
                  <h3
                    style={{ color: lightenColor(bgColor, -0.35) }}
                    className="text-2xl font-medium text-blue-600"
                  >
                    Rs. {product.price.toLocaleString("en-IN")}
                  </h3>
                  <p className="mt-1">
                    {product?.stock ? (
                      <span className="flex items-center gap-1 px-2 text-xs font-semibold text-green-700 bg-green-100 border border-green-700 rounded-full w-fit">
                        <span className="inline-block bg-green-700 rounded-full size-1 animate-ping"></span>{" "}
                        In Stock
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 px-2 text-xs font-semibold text-red-700 bg-red-100 border border-red-700 rounded-full w-fit">
                        <span className="inline-block bg-red-700 rounded-full size-1 animate-ping"></span>{" "}
                        Out of Stock
                      </span>
                    )}
                  </p>
                </div>
              </div>

              <div
                className="flex items-center justify-start gap-4 mt-6"
                data-aos-offset="10"
              >
                <div className="flex items-center w-full gap-2">
                  <motion.div
                    style={{ backgroundColor: lightenColor(bgColor, -0.3) }}
                    className={`text-sm  w-full h-[2.5rem]  flex items-center justify-between animate transform duration-300 text-white  rounded-md py-[0.54rem] font-semibold`}
                  >
                    {(product?.quantity ?? 0) < 1 ? (
                      <motion.button
                        className="text-center cursor-pointer h-[2.5rem] w-full"
                        onClick={() => increaseQuantity()}
                      >
                        Add to Cart
                      </motion.button>
                    ) : (
                      <div
                        style={{
                          backgroundColor: lightenColor(bgColor, -0.3),
                          color: lightenColor(bgColor, 0.95),
                        }}
                        className="flex w-full items-center justify-between font-semibold    h-[2.4rem] rounded-md py-[0.54rem]"
                      >
                        <div
                          onClick={() => {
                            return product?.quantity === 1
                              ? removeFromCart()
                              : decreaseQuantity();
                          }}
                          className=" pr-4 pl-3  h-[2.5rem] flex items-center justify-center cursor-pointer"
                        >
                          <IconMinus />
                        </div>
                        <div className="h-[2.4rem]  flex  items-center justify-center">
                          <AnimateNumber value={product.quantity ?? 0} />
                        </div>

                        <div
                          onClick={() => increaseQuantity()}
                          className=" pl-4  h-[2.5rem] flex items-center justify-center pr-3 cursor-pointer"
                        >
                          <IconPlus />
                        </div>
                      </div>
                    )}
                  </motion.div>
                </div>
                <div
                  data-aos-offset="10"
                  onClick={() => buyButton()}
                  className="w-full px-4 py-2 text-center text-white rounded bg-dark duration-300 cursor-pointer bg-blue-600 hover:bg-[#1d1d88]"
                >
                  Quote me
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* <div>
                <RelatedProducts
                    cart={cart}
                    setCart={setCart}
                    category={product.category}
                    itemCode={product.itemCode}
                />
            </div> */}

      {productData?.categorisedProducts?.length > 0 && (
        <div className="mb-10">
          <ExploreProduct
            bgColor={bgColor}
            cart={cart}
            setCart={setCart}
            exploreProduct={productData?.categorisedProducts?.filter(
              (category) => category.products.length > 0
            )}
          />
        </div>
      )}
    </div>
  );
};

export default ProductDetail;
