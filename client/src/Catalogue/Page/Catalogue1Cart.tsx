import { IconMinus, IconPlus, IconSalad, IconShoppingBag, IconTrash } from "@tabler/icons-react";
import React, { Fragment, useState } from "react";
import AnimateNumber from "../components/AnimateNumber";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { quoteFormResponse, quoteFormSchema } from "@/validations/PortfolioValidation";
import PhoneInput from "react-phone-input-2";
import { Textarea } from "@/components/ui/textarea";
import { Link, useParams } from "react-router-dom";
import { useSendQuotationMutation } from "@/Redux/API/CatalogueApi";

const lightenColor = (color, percent) => {
    const num = parseInt(color?.slice(1), 16),
        amt = Math.round(2.55 * percent * 100),
        r = (num >> 16) + amt,
        g = ((num >> 8) & 0x00ff) + amt,
        b = (num & 0x0000ff) + amt;

    return `rgb(${Math.min(255, r)}, ${Math.min(255, g)}, ${Math.min(255, b)})`;
};


const SideBar = ({ bgColor, cart, setCart, data: catalogueData }) => {
    const [sendQuotation] = useSendQuotationMutation()
    const { register, handleSubmit, setValue, reset, watch, control, getValues, formState: { errors, isSubmitting } } = useForm<quoteFormResponse>({
        resolver: zodResolver(quoteFormSchema)
    })

    const onSubmit = async (data: quoteFormResponse) => {
        console.log(data)

        await sendQuotation({ data: { ...data, products: cart }, ownerId: catalogueData?.data?._id })
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="p-2 relative lg:sticky lg:top-28 pt-12 border border-gray-300 rounded-md overflow-hidden shadow-md">
            <div style={{ backgroundColor: lightenColor(bgColor, -0.35) }} className=" text-white text-center py-2 w-full top-0 absolute left-0">
                <p className="font-semibold">
                    Quote me for {cart.length} items
                </p>
            </div>
            <div className="space-y-1">
                <Label htmlFor={"fullName"} className="text-neutral-700 font-semibold ">
                    Name <span className="text-[#ff3f69]">*</span>
                </Label>
                <Input {...register("fullName")} placeholder="Enter full name..." type="text" className={`${errors.fullName && "border-[#E11D48] "} text-black bg-gray-50 border-gray-300 py-[0.45rem]  `} />
                {errors.fullName && <p className="text-[#ff3f69] tracking-wide text-sm font-semibold">{errors.fullName.message}</p>}
            </div>
            <div className="space-y-1">
                <Label htmlFor={"email"} className="text-neutral-700 font-semibold ">
                    Email <span className="text-[#ff3f69]">*</span>
                </Label>
                <Input {...register("email")} placeholder="Enter email..." type="email" className={`${errors.email && "border-[#E11D48] "} text-black py-[0.45rem]  bg-gray-50 border-gray-300`} />
                {errors.email && <p className="text-[#ff3f69] tracking-wide text-sm font-semibold">{errors.email.message}</p>}
            </div>
            <div>
                <Label className="text-neutral-700 font-semibold ">
                    Whatsapp No <span className="text-[#ff3f69]">*</span>
                </Label>
                <Controller
                    name="phone"
                    control={control}
                    rules={{ required: "Phone number is required" }}
                    render={({ field }) => (
                        <PhoneInput
                            {...field}
                            country="in"
                            placeholder="Enter phone number"
                            containerStyle={{
                                backgroundColor: "#99A1AF",
                                color: "#ffffff",
                                borderRadius: "4.5px",
                                border: "1px solid #D4D4D8"
                            }}
                            buttonStyle={{
                                backgroundColor: "#FFDCE3",
                                color: "#000000",
                                border: "none",
                            }}
                            inputStyle={{
                                width: "100%",
                                border: "1px solid #F5F5F5",
                                fontSize: "12px",
                                paddingTop: "8px",
                                paddingBottom: "8px",
                                height: "34px",
                                borderRadius: "4px",
                                backgroundColor: "#F5F5F5",
                                color: "#000"
                            }}
                            value={field?.value?.toString() || ""}
                            onChange={(phone) => field.onChange(Number(phone))}
                        />
                    )}
                />
                {errors?.phone && <p className="text-[#ff3f69] tracking-wide text-sm font-semibold">{errors?.phone?.message}</p>}
            </div>
            <div className="mt-1">
                <Label
                    htmlFor={"message"}
                    className="text-neutral-700 font-semibold"
                >
                    Hero Description (150-200 Characters) <span className="text-[#ff3f69]">*</span>
                </Label>
                <Textarea {...register("message")} placeholder="Enter meta keyword..." className={`${errors.message && "border-[#E11D48] "} py-[0.45rem]  bg-gray-50 text-black border-gray-300 h-[8rem]`} />

                {errors.message && (
                    <p className="text-[#ff3f69] tracking-wide text-sm font-semibold">
                        {errors.message.message}
                    </p>
                )}
            </div>
            <button style={{ backgroundColor: lightenColor(bgColor, -0.3) }} type="submit" className=" text-white py-2 px-4 rounded w-full mt-2">Quote me!</button>
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
                        <p className="leading-5 text-sm line-clamp-3">{product?.description}</p>
                    </div>
                    <div>
                        <h3 style={{ color: lightenColor(bgColor, -0.3) }} className="text-xl font-bold ">Rs. {product?.price.toLocaleString("en-IN")}</h3>
                        <div className="flex items-center gap-3 mt-4">
                            <div>
                                <button onClick={() => removeFromCart(product.id || product._id)} className="size-9.5 border cursor-pointer bg-red-100 border-red-400 shadow-md text-red-600 inline-flex justify-center items-center rounded-md">
                                    <IconTrash />
                                </button>
                            </div>
                            <div style={{ backgroundColor: lightenColor(bgColor, -0.3) }} className="flex w-full items-center justify-between font-semibold text-white  h-[2.4rem] rounded-md py-[0.54rem]">
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

const Catalogue1Cart = ({ cart, setCart, bgColor, data }) => {
    const { userName } = useParams()

    return (
        <section className="ezy__epcart2 light  bg-white dark:bg-[#0b1727] text-zinc-900 dark:text-white  ">
            <div className="container px-4 max-w-[80rem] mx-auto">
                {cart?.length > 0 ?
                    <div className="flex py-14 md:py-24 flex-col lg:flex-row gap-6">
                        <div style={{ backgroundColor: lightenColor(bgColor, 0.95) }} className="  rounded-xl shadow-lg border border-gray-200 w-full h-fit lg:w-2/3">
                            {cart.map((item, i) => (
                                <Fragment key={i}>
                                    {!!i && <hr className="my-4 border-slate-300" />}
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

                        <div className="w-full lg:w-[35%]">
                            <SideBar bgColor={bgColor} cart={cart} setCart={setCart} data={data} />
                        </div>
                    </div> :
                    <div className="flex flex-col items-center min-h-[90vh] justify-start p-4">
                        <iframe className="w-full h-[18rem]" src="https://lottie.host/embed/e194a074-06ca-4f43-9edb-e6fe8b9bba21/QEigxWcyX0.lottie"></iframe>
                        <h2 style={{ color: lightenColor(bgColor, -0.3) }} className="text-4xl font-bold text-blue-700 mt-6">OOPS! Your Cart is Empty</h2>
                        <p className="text-gray-700 max-w-[25rem] mx-auto mt-3 text-center">Looks like you haven't added anything to your cart yet. Let's change that! Explore our products and add something to your cart.</p>
                        <Link style={{ backgroundColor: lightenColor(bgColor, -0.3) }}
                            to={`/catalogue/1/${userName}`}
                            className=" text-white px-6 py-2 rounded-md shadow-lg transition transform hover:scale-105 mt-2"
                        >
                            Explore Products
                        </Link>
                    </div>
                }
            </div>
        </section>
    );
};

export default Catalogue1Cart;