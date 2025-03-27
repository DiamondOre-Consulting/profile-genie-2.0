import { IconMinus, IconPlus, IconTrash } from "@tabler/icons-react";
import React, { Fragment, useState } from "react";

const productList = [
    {
        img: "https://cdn.easyfrontend.com/pictures/portfolio/portfolio14.jpg",
        title:
            "ABUK Home Appliance Surge Protector Voltage Brownout Plug Outlet Power Strip Surge Protector With Pass Button",
        price: "158",
        qty: 2,
    },
    {
        img: "https://cdn.easyfrontend.com/pictures/portfolio/portfolio20.jpg",
        title:
            "Forsining 3d Logo Design Hollow Engraving Black Gold Case Leather Skeleton Mechanical Watches Men Luxury Brand Heren Horloge",
        price: "7,390",
        qty: 2,
    },
    {
        img: "https://cdn.easyfrontend.com/pictures/portfolio/portfolio19.jpg",
        title:
            "Factory Brand Wholesale 5# Zinc Accessories Custom Hook Slider Metal #5 For Clothing garment jacket",
        price: "21,452",
        qty: 2,
    },
    {
        img: "https://cdn.easyfrontend.com/pictures/portfolio/portfolio15.jpg",
        title:
            "Factory Direct Sales Stainless Steel Heat Resistant Custom Compression Spring Manufacturer Spring Steel",
        price: "17,652",
        qty: 2,
    },
];

const SideBar = () => (
    <div className="bg-blue-50 dark:bg-slate-800 rounded-xl flex flex-col gap-6 p-4 md:p-6">
        <div className="">
            <h6 className="font-medium mb-6 opacity-75">Order Summary</h6>

            <div className="flex justify-between items-center">
                <span>Sub total</span>
                <span className="font-bold">$2099</span>
            </div>
            <hr className="my-4 dark:border-slate-700" />
            <div className="flex justify-between items-center">
                <span>Shipping Fee</span>
                <span className="font-bold">$99</span>
            </div>
            <hr className="my-4 dark:border-slate-700" />
            <div className="flex justify-between items-center">
                <span>Tax</span>
                <span className="font-bold">$168</span>
            </div>
            <hr className="my-4 dark:border-slate-700" />
            <div className="flex justify-between items-center">
                <span className="fs-5 font-bold">Total</span>
                <span className="font-bold">$2238</span>
            </div>
        </div>
        <div className="">
            <button className="w-full bg-blue-600 rounded-md text-white hover:bg-opacity-90 py-2.5">
                BUY (13)
            </button>
        </div>
    </div>
);


const ProductItem = ({ product, index, setCart, cart }) => {

    const updateCartInLocalStorage = (newCart) => {
        localStorage.setItem("cart", JSON.stringify(newCart));
    };

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
        setCart(updatedCart);
        updateCartInLocalStorage(updatedCart);
    };

    const increaseQuantity = (id: string) => {
        const updatedItem = cart.find((item) => (item.id || item._id) === id);
        console.log(updatedItem)
        if (updatedItem) {
            addToCart(updatedItem.quantity + 1, id);
        }
    };

    const decreaseQuantity = (id: string) => {
        const updatedItem = cart.find((item) => (item.id || item._id) === id);
        if (updatedItem && updatedItem.quantity > 1) {
            addToCart(updatedItem.quantity - 1, id);
        } else {
            removeFromCart(id);
        }
    };
    return (
        <div className="flex flex-row items-start p-2 md:p-6 mb-4">
            <div className="w-full lg:max-w-[140px] rounded-xl mr-4 md:mr-6 mb-4 lg:mb-0">
                <a href="#!">
                    <img
                        src={product?.image[0]?.url}
                        alt={product?.name}
                        className="max-w-full h-auto rounded-xl mx-auto"
                    />
                </a>
            </div>

            <div className="flex">
                {/* product details */}
                <div>
                    <div className="text-base md:text-lg hover:text-blue-600 mb-4">
                        <h2 className="text-[1.2rem] font-semibold">{product?.name}</h2>
                        <p className="leading-5 line-clamp-3">{product?.description}</p>
                    </div>
                    <div>
                        <h3 className="text-xl font-bold text-blue-600">Rs. {product?.price.toLocaleString("en-IN")}</h3>
                        <div className="flex items-center gap-3 mt-4">
                            <div>
                                <button onClick={() => removeFromCart(product.id || product._id)} className="size-9.5 border cursor-pointer bg-red-100 border-red-600 text-red-600 inline-flex justify-center items-center rounded-md">
                                    <IconTrash />
                                </button>
                            </div>
                            <div className="flex w-full items-center justify-between font-semibold text-white bg-blue-600  h-[2.4rem] rounded-md py-[0.54rem]">
                                <div
                                    onClick={() => {
                                        const qty = product.quantity === 1 ? removeFromCart(product.id || product._id) : decreaseQuantity(product.id || product._id);

                                        return qty
                                    }}
                                    className=" pr-4 pl-3  h-[2.6rem] flex items-center justify-center cursor-pointer"
                                >
                                    <IconMinus />
                                </div>
                                <span className="">{product?.quantity}</span>
                                <div
                                    onClick={() => increaseQuantity(product.id || product._id)}
                                    className=" pl-4  h-[2.6rem] flex items-center justify-center pr-3 cursor-pointer"
                                >
                                    <IconPlus />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* delete button  */}

            </div>
        </div>
    );
};



const Catalogue1Cart = ({ cart, setCart }) => {




    return (
        <section className="ezy__epcart2 light py-14 md:py-24 bg-white dark:bg-[#0b1727] text-zinc-900 dark:text-white  overflow-hidden ">
            <div className="container px-4 mx-auto">
                <div className="flex flex-col lg:flex-row gap-6">
                    <div className="bg-blue-50 dark:bg-slate-800 rounded-xl w-full lg:w-2/3">
                        {cart.map((item, i) => (
                            <Fragment key={i}>
                                {!!i && <hr className="my-4 dark:border-slate-700" />}
                                <ProductItem
                                    product={item}
                                    index={i}
                                    setCart={setCart}
                                    cart={cart}
                                    key={i}
                                />
                            </Fragment>
                        ))}
                    </div>

                    <div className="w-full lg:w-1/3">
                        <SideBar />
                    </div>
                </div>
            </div>
        </section>
    );
};


export default Catalogue1Cart;