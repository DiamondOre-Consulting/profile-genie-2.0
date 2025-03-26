import { IconArrowLeft, IconArrowRight, IconHeart, IconMinus, IconPlus, IconShoppingBag, IconStar } from "@tabler/icons-react";
import React, { useEffect, useRef, useState } from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Autoplay } from "swiper/modules";

const products = [
    {
        img: "https://cdn.easyfrontend.com/pictures/products/couch3.png",
        title: "Modern Lounge Chair with Ottoman Classic Designer Chair",
        price: "864.00",
        rating: "4.6",
    },
    {
        img: "https://cdn.easyfrontend.com/pictures/products/bag3.png",
        title: "Luxury Tassel Small Messenger Bag For Women Lingge Embroidery",
        price: "390.00",
        rating: "4.6",
    },
    {
        img: "https://cdn.easyfrontend.com/pictures/ecommerce/headphone.png",
        title: "New Classic Copper Alloy Smooth Metal Hoop Earrings For Woman",
        price: "245.00",
        rating: "4.5",
    },
    {
        img: "https://cdn.easyfrontend.com/pictures/products/sbag1.png",
        title: "Luxury Tassel Small Messenger Bag For Women Lingge Embroidery",
        price: "145.00",
        rating: "4.6",
    },
    {
        img: "https://cdn.easyfrontend.com/pictures/products/tshirt2.png",
        title: "Spring Autumn Kids Thin Sweater Boys Girls Clothes Cute Dinosaur",
        price: "2120.00",
        rating: "4.6",
    },
    {
        img: "https://cdn.easyfrontend.com/pictures/products/watch2.png",
        title: "Spring Autumn Kids Thin Sweater Boys Girls Clothes Cute Dinosaur",
        price: "2540.00",
        rating: "4.6",
    },
    {
        img: "https://cdn.easyfrontend.com/pictures/products/shoe1.png",
        title: "LAOCHRA White Shoes For Men Sneakers Leather Korean Style",
        price: "1050.00",
        rating: "4.6",
    },
    {
        img: "https://cdn.easyfrontend.com/pictures/products/sofa2.png",
        title: "Modern Lounge Chair with Ottoman Classic Designer Chair",
        price: "350.00",
        rating: "4.5",
    },
    {
        img: "https://cdn.easyfrontend.com/pictures/products/lamp4.png",
        title: "Touch Rechargeable Bud Table Lamps LED Creative Mushroom",
        price: "250.00",
        rating: "4.6",
    },
    {
        img: "https://cdn.easyfrontend.com/pictures/products/chair2.png",
        title: "Side Chair Back Chair Fabric Upholstered Seat Chairs",
        price: "846.00",
        rating: "4.6",
    },
    {
        img: "https://cdn.easyfrontend.com/pictures/products/perfume1.png",
        title: "Men's Perfumes Sauvage Eau De Parfum Perfumes",
        price: "825.00",
        rating: "4.5",
    },
    {
        img: "https://cdn.easyfrontend.com/pictures/products/glass2.png",
        title: "ZUEE Retro Small Rectangle Sunglasses Women Vintage",
        price: "135.00",
        rating: "4.6",
    },
];

const ProductItem = ({ product, cart, setCart }) => {
    const [quantity, setQuantity] = useState([{ id: (product?._id || product.id), quantity: 0 }]);
    console.log(quantity)
    const updateCartInLocalStorage = (newCart) => {
        localStorage.setItem("cart", JSON.stringify(newCart));
    };

    useEffect(() => {
        const cartItem = cart.find((item) => (item._id || item.id) === (product?._id || product?.id));
        setQuantity(
            cartItem
                ? [{ id: (product?._id || product.id), quantity: cartItem.quantity }]
                : [{ id: (product?._id || product.id), quantity: 0 }]
        );
    }, [product?._id, product?.id, cart]);


    const addToCart = (newQuantity, id) => {
        console.log("dhdh")
        const existingItem = cart.find((item) => (item._id || item.id) === id);

        console.log(existingItem)

        if (existingItem) {
            const updatedCart = cart.map((item) =>
                item._id === product?._id ? { ...item, quantity: newQuantity } : item
            );
            console.log("esis", updatedCart)
            setCart(updatedCart);
            updateCartInLocalStorage(updatedCart);
        } else {
            const updatedCart = [...cart, { ...product, quantity: newQuantity }];
            console.log("non", updatedCart)

            setCart(updatedCart);
            updateCartInLocalStorage(updatedCart);
        }
    };


    const removeFromCart = (id) => {
        const updatedCart = cart.filter((item) => (item._id || item.id) !== id);
        setQuantity((prevQuantity) =>
            prevQuantity.map((item) =>
                item.id === id ? { ...item, quantity: 0 } : item
            )
        );
        setCart(updatedCart);
        updateCartInLocalStorage(updatedCart);
    };

    const increaseQuantity = (id) => {
        setQuantity((prevQuantity) =>
            prevQuantity.map((item) =>
                item.id === id ? { ...item, quantity: item.quantity + 1 } : item
            )
        );

        const updatedItem = quantity.find((item) => item.id === id);
        if (updatedItem) {
            addToCart(updatedItem.quantity + 1, id);
        }
    };

    const decreaseQuantity = (id) => {
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


    const prevRef = useRef(null);
    const nextRef = useRef(null);
    console.log(product)
    return (
        <div className={`p-2 ${product.stock ? "opacity-100" : "opacity-70 grayscale pointer-events-none"} shadow-lg rounded-xl  bg-white border border-gray-300 relative overflow-hidden`}>

            {!product?.stock && <div className="absolute left-1/2 top-38 transform -translate-x-1/2 bg-black/90 text-white py-1 px-2 text-sm z-40 w-[150%] tracking-wide text-[1.3rem] uppercase -rotate-30"><p>Out Of Stock</p></div>}
            <div className=" bg-emerald-50 rounded-xl relative h-full">

                <div className="h-[250px] bg-emerald-50 rounded-xl flex justify-center items-center w-full">
                    <Swiper
                        loop={true}
                        autoplay={{
                            delay: 3000,
                            disableOnInteraction: false,
                        }}
                        navigation={{
                            prevEl: prevRef.current,
                            nextEl: nextRef.current,
                        }}
                        onBeforeInit={(swiper) => {
                            swiper.params.navigation.prevEl = prevRef.current;
                            swiper.params.navigation.nextEl = nextRef.current;
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

                    <div className="absolute flex items-center gap-2 right-6 top-2">
                        <div
                            ref={prevRef}
                            className="z-10 shadow-md flex items-center justify-center w-8 h-8 text-black bg-white rounded-full cursor-pointer custom-prev"
                        >
                            <IconArrowLeft />
                        </div>
                        <div
                            ref={nextRef}
                            className="z-10 flex shadow-md items-center justify-center w-8 h-8 text-black bg-white rounded-full cursor-pointer custom-next"
                        >
                            <IconArrowRight />
                        </div>
                    </div>
                </div>

                <div className="p-4 lg:p-6 text-start">
                    <a href="#!">
                        <h5 className="text-base font-medium line-clamp-2">{product.name}</h5>
                    </a>
                    <div className="flex justify-between items-center my-3">
                        <h5 className="text-blue-600 text-base font-medium leading-none">
                            &#x20B9; {product.price}
                        </h5>
                        {product?.stock && <div className="text-xs font-semibold bg-green-100 border border-green-600 text-green-600 py-0.3 px-2 rounded-full">In Stock</div>}
                    </div>
                    <div className="flex justify-between items-center">

                        <div
                            className="flex items-center justify-start gap-4 mt-6"
                            data-aos-offset="10"
                        >
                            <div className="min-w-[11rem] actions" data-aos-offset="10">
                                {(quantity.find((item) => item.id === (product.id || product._id))?.quantity ?? 0) < 1
                                    ? (
                                        <button
                                            onClick={() => increaseQuantity(product.id || product._id)}
                                            className="w-full px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700"
                                        >
                                            Add to Cart
                                        </button>
                                    ) : (
                                        <div className="flex items-center justify-between font-semibold text-white bg-blue-700 rounded-md">
                                            <div
                                                onClick={() => {
                                                    const qty = quantity.find((item) => item.id === (product.id || product._id))?.quantity ?? 0;
                                                    return qty === 1 ? removeFromCart(product.id || product._id) : decreaseQuantity(product.id || product._id);
                                                }}
                                                className="p-3 px-5 cursor-pointer"
                                            >
                                                <IconMinus />
                                            </div>
                                            <span className="text-[1.2rem]">{quantity.find((item) => item.id === (product.id || product._id))?.quantity || 0}</span>
                                            <div
                                                onClick={() => increaseQuantity(product.id || product._id)}
                                                className="p-3 px-5 cursor-pointer"
                                            >
                                                <IconPlus />
                                            </div>
                                        </div>
                                    )
                                }

                            </div>
                        </div>
                        <a href="#!">
                            <h5 className="hover:text-blue-600">
                                <IconShoppingBag />
                            </h5>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};


const Product = ({ categorisedProducts, uncategorisedProducts, cart, setCart }) => {

    console.log(uncategorisedProducts);

    return (
        <section className="ezy__epgrid5 light py-14 md:py-24 bg-white dark:bg-[#0b1727] text-zinc-900  relative overflow-hidden z-10">
            {uncategorisedProducts && <div className="container lg:max-w-[80rem] xl:max-w-[90rem] px-4 mx-auto">
                <h2 className="text-2xl font-bold leading-none md:text-[40px] text-center">
                    Our Products
                </h2>
                <div className="grid grid-cols-12 gap-3 text-center mt-">
                    {uncategorisedProducts[0]?.products.map((product, i) => (
                        <>
                            {product?.productDetails && <div
                                className="col-span-12 sm:col-span-6 lg:col-span-4 xl:col-span-3 px-2 my-4"
                                key={i}
                            >
                                <ProductItem product={product?.productDetails} cart={cart} setCart={setCart} />
                            </div>}
                        </>
                    ))}
                </div>
            </div>}
            {categorisedProducts && categorisedProducts.map((category, i) => (
                <>
                    {category?.products?.length >= 1 &&
                        <div className="container lg:max-w-[80rem] xl:max-w-[90rem] px-4 mx-auto">
                            <h2 className="text-2xl font-bold leading-none md:text-[40px] text-center">
                                {category?.text}
                            </h2>
                            <div className="grid grid-cols-12 gap-3 text-center mt-">
                                {category?.products.map((product, i) => (
                                    <>
                                        <div
                                            className="col-span-12 sm:col-span-6 lg:col-span-4 xl:col-span-3 px-2 my-4"
                                            key={i}
                                        >
                                            <ProductItem product={product} cart={cart} setCart={setCart} />
                                        </div>
                                    </>
                                ))}
                            </div>
                        </div>
                    }
                </>
            ))}
        </section>
    );
};

export default Product;
