import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { useGetSingleProductQuery } from "@/Redux/API/CatalogueApi";
import { IconMinus, IconPlus, IconShare } from "@tabler/icons-react";
import ExploreProduct from "./ExploreProduct";
import AnimateNumber from "../components/AnimateNumber";

const ProductDetail = ({ cart, setCart, productData }) => {
    const { productId } = useParams();
    const { data, isLoading, refetch } = useGetSingleProductQuery({ productId })
    const [product, setProduct] = useState()
    console.log("cdhcj", productData)
    const [mainImage, setMainImage] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        refetch()
    }, [productId])

    useEffect(() => {
        if (data) {
            setMainImage(data?.data?.image[0]?.url);

            const cartItem = cart.find((item) => (item.id || item._id) === productId);
            if (cartItem) {
                setProduct({ ...data?.data, quantity: cartItem.quantity });
            } else {
                setProduct({ ...data?.data, quantity: 0 });
            }
        }
    }, [productId, cart, isLoading, data]);

    const updateCartInLocalStorage = (newCart) => {
        localStorage.setItem("cart", JSON.stringify(newCart));
    };

    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    }, [productId]);

    const addToCart = (newQuantity: number, id: string) => {
        const existingItem = cart.find((item) => (item._id || item.id) === id)

        if (existingItem) {
            const updatedCart = cart.map((item) =>
                (item._id || item?.id) === (product?._id || product?.id) ? { ...item, quantity: newQuantity } : item
            );
            setCart(updatedCart)
            updateCartInLocalStorage(updatedCart)
        } else {
            const updatedCart = [...cart, { ...product, quantity: newQuantity }]
            setCart(updatedCart);
            updateCartInLocalStorage(updatedCart);
        }
    };


    const removeFromCart = () => {
        console.log(cart)
        const updatedCart = cart.filter((item) => (item._id || item.id) !== product?._id);
        setCart(updatedCart)
        updateCartInLocalStorage(updatedCart)
    };

    const increaseQuantity = () => {
        console.log(cart)
        const updatedItem = cart.find((item) => (item.id || item._id) === product?._id);
        console.log(updatedItem)
        if (updatedItem) {
            addToCart(updatedItem?.quantity + 1, product?._id);
        }
        else {
            addToCart(1, product?._id);
        }

    };

    const decreaseQuantity = () => {
        const updatedItem = cart.find((item) => (item.id || item._id) === product?._id);
        if (updatedItem && updatedItem.quantity > 1) {
            addToCart(updatedItem.quantity - 1, product?._id);
        } else {
            removeFromCart();
        }
    };

    if (!product) {
        return <div>Product not found!</div>;
    }

    const isInCart = cart.some((item) => (item.id || item._id) === product?._id);

    const buyButton = () => {
        if (isInCart) {
            navigate("/cart");
        } else {
            const updatedItem = cart.find((item) => (item.id || item._id) === product?._id);
            console.log(updatedItem)
            if (updatedItem) {
                addToCart(updatedItem.quantity + 1, product?._id);
            }
            navigate("/cart");
        }
    };


    const ProductPreviews = ({ images }) => {
        const [selectedImage, setSelectedImage] = useState(0);
        const [videoActive, setVideoActive] = useState(false);
        const [isZoomed, setIsZoomed] = useState(false);

        const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

        console.log(images);
        return (
            <div className="flex flex-col bg-gray-200 p-2 rounded-md sm:flex-row-reverse items-center gap-4">
                <div className="flex w-full space-x-2 top-10">

                    <div
                        className="relative overflow-hidden w-full h-[50vh] lg:h-[25rem]"
                        onMouseEnter={() => setIsZoomed(true)}
                        onMouseLeave={() => setIsZoomed(false)}
                        onMouseMove={(e) => {
                            const { left, top, width, height } =
                                e.target.getBoundingClientRect();
                            const x = ((e.clientX - left) / width) * 100;
                            const y = ((e.clientY - top) / height) * 100;
                            setMousePosition({ x, y });
                        }}
                    >
                        <img
                            src={product?.image[selectedImage].url}
                            alt={`Preview ${selectedImage + 1}`}
                            className={` w-full mx-auto h-[50vh] object-center lg:h-[25rem] lg:w-[34rem] object-cover rounded-md transition-transform duration-200 ${isZoomed ? "scale-[2]" : "scale-100"
                                }`}
                            style={{
                                transformOrigin: `${mousePosition.x}% ${mousePosition.y}%`,
                            }}
                        />
                    </div>

                </div>
                <div className="flex gap-4 top-10 sm:flex-col">
                    {product?.image.map((image, index) => (
                        <button
                            key={index}
                            onClick={() => {
                                setSelectedImage(index);
                                setVideoActive(false);
                            }}
                            className={`w-20 h-20  ${selectedImage === index
                                ? " border-blue-500"
                                : " border-gray-600"
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



    return (
        <div className="overflow-hidden bg-white overflow-x-hidden">

            <div className="w-full py-10 md:py-16 max-w-[80rem] p-4 px-4 sm:px-10 mx-auto  md:px-20 lg:px-6">

                <div className="grid items-center grid-cols-1 gap-6 mt-4 lg:grid-cols-2 md:gap-0">
                    <div data-aos="zoom-in" className=" top-0 w-full mx-auto sm:w-[90%] ">
                        <ProductPreviews images={product.previews} />
                    </div>

                    <div className=" lg:w-[90%]">
                        <div className="mb-6 lg:mb-12">
                            <h1 className="text-2xl leading-none md:text-4xl font-medium mb-4">
                                {product.name}
                            </h1>

                            <p className="opacity-70 lg:mr-16 xl:mr-20 my-4">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates eligendi quam veniam libero eius asperiores iusto cupiditate suscipit quidem rerum nobis non corporis ea sit ipsum repudiandae ex labore nostrum consequatur, illo velit nam odio animi! Enim est, earum saepe quae eum quod praesentium labore aliquam voluptates esse illo cum nesciunt, qui libero fugit eligendi suscipit laborum quis ad voluptatem, perferendis dolor ni
                            </p>
                            <h3 className="text-2xl text-blue-600 font-medium">
                                Rs. {product.price}
                            </h3>
                        </div>


                        <div
                            className="flex items-center justify-start gap-4 mt-6"
                            data-aos-offset="10"
                        >
                            <div className="flex gap-2 w-full items-center">

                                <motion.div
                                    className={`text-sm  w-full h-[2.5rem]  flex items-center justify-between animate transform duration-300 text-white bg-blue-600 border border-blue-600 rounded-md py-[0.54rem] font-semibold`}
                                >
                                    {(product?.quantity ?? 0) < 1
                                        ? (
                                            <motion.button
                                                className="text-center cursor-pointer h-[2.5rem] w-full"
                                                onClick={() => increaseQuantity()}

                                            >
                                                Add to Cart
                                            </motion.button>
                                        ) : (
                                            <div className="flex w-full items-center justify-between font-semibold text-white bg-blue-600  h-[2.4rem] rounded-md py-[0.54rem]">
                                                <div
                                                    onClick={() => {
                                                        product.quantity === 1 ? removeFromCart() : decreaseQuantity();
                                                    }}
                                                    className=" pr-4 pl-3  h-[2.5rem] flex items-center justify-center cursor-pointer"
                                                >
                                                    <IconMinus />
                                                </div>
                                                <div className="h-[2.4rem]  flex  items-center justify-center">
                                                    <AnimateNumber
                                                        value={product.quantity ?? 0}
                                                    />
                                                </div>

                                                <div
                                                    onClick={() => increaseQuantity()}
                                                    className=" pl-4  h-[2.5rem] flex items-center justify-center pr-3 cursor-pointer"
                                                >
                                                    <IconPlus />
                                                </div>
                                            </div>
                                        )
                                    }

                                </motion.div>


                            </div>
                            <div
                                data-aos-offset="10"
                                onClick={() => buyButton()}
                                className="w-full px-4 py-2 text-center text-white rounded bg-dark cursor-pointer bg-red-500 hover:bg-[#1d8883]"
                            >
                                Quote me
                            </div>
                        </div>


                    </div>
                </div>
            </div>

            {/* <div>
                <RelatedProducts
                    cart={cart}
                    setCart={setCart}
                    category={product.category}
                    itemCode={product.itemCode}
                />
            </div> */}

            <div className="mb-10">
                <ExploreProduct cart={cart} setCart={setCart} exploreProduct={productData?.categorisedProducts?.filter(category => category.products.length > 0)} />
            </div>
        </div>
    );
};

export default ProductDetail;