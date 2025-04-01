import { IconMinus, IconPlus, IconTrash } from "@tabler/icons-react";
import React, { Fragment, useState } from "react";
import AnimateNumber from "../components/AnimateNumber";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { quoteFormResponse, quoteFormSchema } from "@/validations/PortfolioValidation";

const lightenColor = (color, percent) => {
    const num = parseInt(color?.slice(1), 16),
        amt = Math.round(2.55 * percent * 100),
        r = (num >> 16) + amt,
        g = ((num >> 8) & 0x00ff) + amt,
        b = (num & 0x0000ff) + amt;

    return `rgb(${Math.min(255, r)}, ${Math.min(255, g)}, ${Math.min(255, b)})`;
};



const SideBar = () => {

    const { register, handleSubmit, setValue, reset, watch, getValues, formState: { errors, isSubmitting } } = useForm<quoteFormResponse>({
        resolver: zodResolver(quoteFormSchema)
    })

    return (
        <form>
            <div className="space-y-1">
                <Label htmlFor={"fullName"} className="text-neutral-700 font-semibold ">
                    Name <span className="text-[#ff3f69]">*</span>
                </Label>
                <Input {...register("fullName")} placeholder="Enter full name..." type="text" className={`${errors.fullName && "border-[#E11D48] "} py-[0.45rem]  `} />
                {errors.fullName && <p className="text-[#ff3f69] tracking-wide text-sm font-semibold">{errors.fullName.message}</p>}
            </div>
        </form>
    )
}


const ProductItem = ({ product, index, setCart, cart, bgColor }) => {

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
            <div className="w-full lg:max-w-[140px] sm:max-w-[80px] max-w-[60px] md:max-w-[100px] rounded-xl mr-4 md:mr-6 mb-4 lg:mb-0">
                <a href="#!">
                    <img
                        src={product?.image[0]?.url}
                        alt={product?.name}
                        className="max-w-full h-auto rounded-lg mx-auto"
                    />
                </a>
            </div>

            <div className="flex">

                <div>
                    <div className="text-base md:text-lg  mb-4">
                        <h2 className="text-[1.2rem] font-semibold">{product?.name}</h2>
                        <p className="leading-5 line-clamp-3">{product?.description}</p>
                    </div>
                    <div>
                        <h3 style={{ color: lightenColor(bgColor, -0.3) }} className="text-xl font-bold text-blue-600">Rs. {product?.price.toLocaleString("en-IN")}</h3>
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
                                <div className="h-[2.6rem]  flex  items-center justify-center">
                                    <AnimateNumber
                                        value={product?.quantity}
                                    />
                                </div>
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


            </div>
        </div>
    );
};



const Catalogue1Cart = ({ cart, setCart, bgColor }) => {




    return (
        <section className="ezy__epcart2 light py-14 md:py-24 bg-white dark:bg-[#0b1727] text-zinc-900 dark:text-white  overflow-hidden ">
            <div className="container px-4 mx-auto">
                <div className="flex flex-col lg:flex-row gap-6">
                    <div style={{ backgroundColor: lightenColor(bgColor, 0.95) }} className="  rounded-xl shadow-lg border border-gray-200 w-full lg:w-2/3">
                        {cart.map((item, i) => (
                            <Fragment key={i}>
                                {!!i && <hr className="my-4 dark:border-slate-700" />}
                                <ProductItem
                                    product={item}
                                    bgColor={bgColor}
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