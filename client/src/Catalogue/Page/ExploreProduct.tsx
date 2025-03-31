import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Marquee from "react-fast-marquee";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Autoplay } from "swiper/modules";
import { AnimatePresence, motion } from "framer-motion";
import AnimateNumber from "../components/AnimateNumber";
import { useNavigate } from "react-router-dom";
import { IconPlus, IconMinus } from "@tabler/icons-react";
import { SparklesText } from "@/components/ui/sparkles-text";

const ProductItem = ({ product, cart, setCart }) => {
    const { userName } = useParams()

    const [quantity, setQuantity] = useState([{ id: '', quantity: 0 }]);
    const navigate = useNavigate()

    const updateCartInLocalStorage = (newCart) => {
        localStorage.setItem("cart", JSON.stringify(newCart));
    };

    useEffect(() => {
        const cartItem = cart.find((item) => (item._id || item.id) === (product?._id || product?.id));
        setQuantity(
            cartItem
                ? [{ id: (product._id || product.id), quantity: cartItem.quantity }]
                : [{ id: (product._id || product.id), quantity: 0 }]
        );
    }, [product?._id, product?.id, cart]);


    const addToCart = (newQuantity: number, id: string) => {
        const existingItem = cart.find((item) => (item._id || item.id) === id);

        if (existingItem) {
            const updatedCart = cart.map((item) =>
                (item._id || item?.id) === (product?._id || product?.id) ? { ...item, quantity: newQuantity } : item
            );
            setCart(updatedCart);
            updateCartInLocalStorage(updatedCart);
        } else {
            const updatedCart = [...cart, { ...product, quantity: newQuantity }];
            setCart(updatedCart);
            updateCartInLocalStorage(updatedCart);
        }
    };


    const removeFromCart = (id: string) => {
        const updatedCart = cart.filter((item) => (item._id || item.id) !== id);
        setQuantity((prevQuantity) =>
            prevQuantity.map((item) =>
                item.id === id ? { ...item, quantity: 0 } : item
            )
        );
        setCart(updatedCart);
        updateCartInLocalStorage(updatedCart);
    };

    const increaseQuantity = (id: string) => {
        console.log(id)
        setQuantity((prevQuantity) =>
            prevQuantity.map((item) =>
                item.id === id ? { ...item, quantity: item.quantity + 1 } : item
            )
        );

        const updatedItem = quantity.find((item) => item.id === id);
        console.log(updatedItem)
        if (updatedItem) {
            addToCart(updatedItem.quantity + 1, id);
        }
    };

    const decreaseQuantity = (id: string) => {
        setQuantity((prevQuantity) =>
            prevQuantity.map((item) =>
                item.id === id && item.quantity > 0 ? { ...item, quantity: item.quantity - 1 } : item
            )
        );

        const updatedItem = quantity.find((item) => item.id === id);
        if (updatedItem && updatedItem.quantity > 1) {
            addToCart(updatedItem.quantity - 1, id);
        } else {
            removeFromCart(id);
        }
    };



    return (
        <div onClick={(e) => {
            e.stopPropagation()
            navigate(`/catalogue/1/${userName}/product/${(product?._id || product?.id)}`)
        }
        }
            className={`p-1 mx-6 select-none ${product.stock ? "opacity-100" : "opacity-80 grayscale pointer-events-none"} shadow-md rounded-xl max-w-[22rem] mx-auto bg-white border border-gray-200 relative overflow-hidden`}>

            {!product?.stock && <div className="absolute left-1/2 top-38 transform -translate-x-1/2 bg-black/90 text-white py-1 px-2 text-sm z-40 w-[150%] tracking-wide text-[1.3rem] uppercase -rotate-30"><p>Out Of Stock</p></div>}
            <div className=" shadow-md bg-emerald-50 rounded-xl relative h-full">

                <div className="h-[200px] bg-emerald-50 rounded-xl flex justify-center items-center w-full">
                    <Swiper
                        loop={true}
                        autoplay={{
                            delay: 3000,
                            disableOnInteraction: false,
                        }}
                        modules={[Navigation, Autoplay]}
                        className="w-full h-full"
                    >
                        {product.image.map((image, index) => (
                            <SwiperSlide key={index}>
                                <img
                                    src={image?.url}
                                    alt={`Slide ${index}`}
                                    className="w-full mx-auto rounded-md h-80 object-cover"
                                />
                            </SwiperSlide>
                        ))}
                    </Swiper>


                </div>

                <div className="p-3 text-start">
                    <a href="#!">
                        <h5 className="text-[1.2rem] font-medium line-clamp-1">{product.name}</h5>
                    </a>
                    <p className="line-clamp-3 text-sm leading-[20px]">{product?.description}</p>
                    <div className="flex mt-4 w-full gap-4 items-center ">
                        <div className="flex items-start flex-col min-w-[30%]">
                            <h5 className="text-blue-600 font-semibold leading-none text-[1.1rem]">
                                &#x20B9; {product.price.toLocaleString('en-IN')}
                            </h5>
                            {product?.stock && <div className="text-[0.6rem] font-semibold bg-green-100 border border-green-600 text-green-600  px-2 mt-1 w-fit rounded-full">In Stock</div>}
                        </div>
                        <div className="flex gap-2 w-full items-center">

                            <motion.div
                                className={`text-sm  w-full h-[2.4rem]  flex items-center justify-between animate transform duration-300 text-white bg-blue-600 border border-blue-600 rounded-md py-[0.54rem] font-semibold`}
                            >
                                {(quantity.find((item) => item.id === (product.id || product._id))?.quantity ?? 0) < 1
                                    ? (
                                        <motion.button
                                            className="text-center cursor-pointer h-[2.4rem] w-full"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                increaseQuantity(product.id || product._id)
                                            }
                                            }
                                        >
                                            Add to Cart
                                        </motion.button>
                                    ) : (
                                        <div className="flex w-full items-center justify-between font-semibold text-white bg-blue-600  h-[2.4rem] rounded-md py-[0.54rem]">
                                            <div
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    const qty = quantity.find((item) => item.id === (product.id || product._id))?.quantity ?? 0;
                                                    return qty === 1 ? removeFromCart(product.id || product._id) : decreaseQuantity(product.id || product._id);
                                                }}
                                                className=" pr-4 pl-3  h-[2.4rem] flex items-center justify-center cursor-pointer"
                                            >
                                                <IconMinus />
                                            </div>
                                            <div className="h-[2.4rem]  flex  items-center justify-center">
                                                <AnimateNumber
                                                    value={quantity.find((item) => item.id === (product.id || product._id))?.quantity || 0}
                                                />
                                            </div>

                                            <div
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    increaseQuantity(product.id || product._id)
                                                }
                                                }
                                                className=" pl-4  h-[2.4rem] flex items-center justify-center pr-3 cursor-pointer"
                                            >
                                                <IconPlus />
                                            </div>
                                        </div>
                                    )
                                }

                            </motion.div>


                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

const ExploreProduct = ({ cart, setCart, exploreProduct }) => {



    return (
        <div className=" py-10 overflow-hidden">
            <h1 className=" mx-auto mb-2 text-4xl text-center mf font-semibold" data-aos="fade-left">
                <SparklesText text="Explore Products" />

            </h1>
            <div className="w-20 h-1 mx-auto mb-10 bg-dark md:w-60" data-aos="fade-left"></div>
            <Marquee className="overflow-hidden h-fit" pauseOnHover={true}>
                <div className="flex mx-3 gap-6 overflow-hidden" data-aos="fade-up">
                    {[...exploreProduct?.flatMap((item: ExploreProductItem) => item?.products ?? [])].concat([...exploreProduct?.flatMap((item: ExploreProductItem) => item?.products ?? [])]).map((product, index) => {
                        return (
                            <ProductItem product={product} cart={cart} setCart={setCart} />
                        );
                    })}
                </div>
            </Marquee>
        </div>
    );
};

export default ExploreProduct;