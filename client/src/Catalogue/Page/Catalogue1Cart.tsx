import { IconMinus, IconPlus, IconTrash, IconWhirl } from "@tabler/icons-react";
import React, { Fragment } from "react";
import AnimateNumber from "../components/AnimateNumber";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  quoteFormResponse,
  quoteFormSchema,
} from "@/validations/PortfolioValidation";
import PhoneInput from "react-phone-input-2";
import { Textarea } from "@/components/ui/textarea";
import { Link, useParams } from "react-router-dom";
import { useSendQuotationMutation } from "@/Redux/API/CatalogueApi";
import {
  catalogueResponse,
  productDetail,
} from "@/validations/CatalogueValidation";
import { lightenColor } from "../Hooks/calculations";

const SideBar = ({
  bgColor,
  cart,
  setCart,
  data: catalogueData,
}: {
  bgColor: string;
  cart: productDetail[];
  setCart: React.Dispatch<React.SetStateAction<productDetail[]>>;
  data: catalogueResponse;
}) => {
  const [sendQuotation] = useSendQuotationMutation();
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors, isSubmitting },
  } = useForm<quoteFormResponse>({
    resolver: zodResolver(quoteFormSchema),
  });

  const onSubmit = async (data: quoteFormResponse) => {
    const res = await sendQuotation({
      data: { ...data, products: cart },
      ownerId: catalogueData?.data?._id,
    });

    if (res?.data?.success) {
      setCart([]);
      localStorage.setItem("cart", JSON.stringify([]));
      reset();
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="relative p-2 pt-12 overflow-hidden border border-gray-300 rounded-md shadow-md lg:sticky lg:top-28"
    >
      <div
        style={{ backgroundColor: lightenColor(bgColor, -0.35) }}
        className="absolute top-0 left-0 w-full py-2 text-center text-white "
      >
        <p className="font-semibold">Quote me for {cart.length} items</p>
      </div>
      <div className="space-y-1">
        <Label htmlFor={"fullName"} className="font-semibold text-neutral-700 ">
          Name <span className="text-[#ff3f69]">*</span>
        </Label>
        <Input
          {...register("fullName")}
          placeholder="Enter full name..."
          type="text"
          className={`${
            errors.fullName && "border-[#E11D48] "
          } text-black bg-gray-50 border-gray-300 py-[0.45rem]  `}
        />
        {errors.fullName && (
          <p className="text-[#ff3f69] tracking-wide text-sm font-semibold">
            {errors.fullName.message}
          </p>
        )}
      </div>
      <div className="space-y-1">
        <Label htmlFor={"email"} className="font-semibold text-neutral-700 ">
          Email <span className="text-[#ff3f69]">*</span>
        </Label>
        <Input
          {...register("email")}
          placeholder="Enter email..."
          type="email"
          className={`${
            errors.email && "border-[#E11D48] "
          } text-black py-[0.45rem]  bg-gray-50 border-gray-300`}
        />
        {errors.email && (
          <p className="text-[#ff3f69] tracking-wide text-sm font-semibold">
            {errors.email.message}
          </p>
        )}
      </div>
      <div>
        <Label className="font-semibold text-neutral-700 ">
          Phone number <span className="text-[#ff3f69]">*</span>
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
                border: "1px solid #D4D4D8",
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
                color: "#000",
              }}
              value={field?.value?.toString() || ""}
              onChange={(phone) => field.onChange(Number(phone))}
            />
          )}
        />
        {errors?.phone && (
          <p className="text-[#ff3f69] tracking-wide text-sm font-semibold">
            {errors?.phone?.message}
          </p>
        )}
      </div>
      <div className="mt-1">
        <Label htmlFor={"message"} className="font-semibold text-neutral-700">
          Hero Description (150-200 Characters){" "}
          <span className="text-[#ff3f69]">*</span>
        </Label>
        <Textarea
          {...register("message")}
          placeholder="Enter meta keyword..."
          className={`${
            errors.message && "border-[#E11D48] "
          } py-[0.45rem]  bg-gray-50 text-black border-gray-300 h-[8rem]`}
        />

        {errors.message && (
          <p className="text-[#ff3f69] tracking-wide text-sm font-semibold">
            {errors.message.message}
          </p>
        )}
      </div>
      <button
        disabled={isSubmitting}
        style={{ backgroundColor: lightenColor(bgColor, -0.3) }}
        type="submit"
        className="w-full px-4 py-2 mt-2 text-white rounded "
      >
        {isSubmitting ? (
          <IconWhirl className="mx-auto animate-spin w-fit" />
        ) : (
          "Quote me!"
        )}
      </button>
    </form>
  );
};

const ProductItem = ({
  product,
  setCart,
  cart,
  bgColor,
}: {
  product: productDetail;
  setCart: React.Dispatch<React.SetStateAction<productDetail[]>>;
  cart: productDetail[];
  bgColor: string;
}) => {
  const updateCartInLocalStorage = (newCart: productDetail[]) => {
    localStorage.setItem("cart", JSON.stringify(newCart));
  };

  const addToCart = (newQuantity: number, id: string) => {
    const existingItem = cart.find(
      (item: productDetail) => (item._id || item.id) === id
    );

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
      setCart(updatedCart);
      updateCartInLocalStorage(updatedCart);
    }
  };

  const removeFromCart = (id: string) => {
    const updatedCart = cart.filter(
      (item: productDetail) => (item._id || item.id) !== id
    );
    setCart(updatedCart);
    updateCartInLocalStorage(updatedCart);
  };

  const increaseQuantity = (id: string) => {
    const updatedItem = cart.find(
      (item: productDetail) => (item.id || item._id) === id
    );
    if (updatedItem) {
      addToCart((updatedItem?.quantity ?? 0) + 1, id);
    }
  };

  const decreaseQuantity = (id: string) => {
    const updatedItem = cart.find(
      (item: productDetail) => (item.id || item._id) === id
    );
    if (updatedItem && (updatedItem?.quantity ?? 0) > 1) {
      addToCart((updatedItem?.quantity ?? 0) - 1, id);
    } else {
      removeFromCart(id);
    }
  };

  return (
    <div className="flex flex-row items-start p-2 mb-4 md:p-6">
      <div className="w-full lg:max-w-[140px] sm:max-w-[80px] max-w-[60px] md:max-w-[100px] rounded-xl mr-4 md:mr-6 mb-4 lg:mb-0">
        <a href="#!">
          <img
            src={product?.image[0]?.url}
            alt={product?.name}
            className="h-auto max-w-full mx-auto rounded-lg"
          />
        </a>
      </div>

      <div className="flex">
        <div>
          <div className="mb-4 text-base md:text-lg">
            <h2 className="text-[1.2rem] font-semibold">{product?.name}</h2>
            <p className="text-sm leading-5 line-clamp-3">
              {product?.description}
            </p>
          </div>
          <div>
            <h3
              style={{ color: lightenColor(bgColor, -0.3) }}
              className="text-xl font-bold "
            >
              Rs. {product?.price.toLocaleString("en-IN")}
            </h3>
            <div className="flex items-center gap-3 mt-4">
              <div>
                <button
                  onClick={() =>
                    removeFromCart(product?.id || product?._id || "")
                  }
                  className="size-9.5 border cursor-pointer bg-red-100 border-red-400 shadow-md text-red-600 inline-flex justify-center items-center rounded-md"
                >
                  <IconTrash />
                </button>
              </div>
              <div
                style={{ backgroundColor: lightenColor(bgColor, -0.3) }}
                className="flex w-full items-center justify-between font-semibold text-white  h-[2.4rem] rounded-md py-[0.54rem]"
              >
                <div
                  onClick={() => {
                    const qty =
                      product.quantity === 1
                        ? removeFromCart(product?.id || product?._id || "")
                        : decreaseQuantity(product.id || product._id || "");

                    return qty;
                  }}
                  className=" pr-4 pl-3  h-[2.6rem] flex items-center justify-center cursor-pointer"
                >
                  <IconMinus />
                </div>
                <div className="h-[2.6rem]  flex  items-center justify-center">
                  <AnimateNumber value={product?.quantity ?? 0} />
                </div>
                <div
                  onClick={() =>
                    increaseQuantity(product.id || product._id || "")
                  }
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

const Catalogue1Cart = ({
  cart,
  setCart,
  bgColor,
  data,
}: {
  cart: productDetail[];
  setCart: React.Dispatch<React.SetStateAction<productDetail[]>>;
  bgColor: string;
  data: catalogueResponse;
}) => {
  const { userName } = useParams();

  return (
    <section className="ezy__epcart2 light  bg-white dark:bg-[#0b1727] text-zinc-900 dark:text-white  ">
      <div className="container px-4 max-w-[80rem] mx-auto">
        {cart?.length > 0 ? (
          <div className="flex flex-col gap-6 py-14 md:py-24 lg:flex-row">
            <div
              style={{ backgroundColor: lightenColor(bgColor, 0.95) }}
              className="w-full border border-gray-200 shadow-lg rounded-xl h-fit lg:w-2/3"
            >
              {cart.map((item: productDetail, i: number) => (
                <Fragment key={i}>
                  {!!i && <hr className="my-4 border-slate-300" />}
                  <ProductItem
                    product={item}
                    bgColor={bgColor}
                    setCart={setCart}
                    cart={cart}
                    key={i}
                  />
                </Fragment>
              ))}
            </div>

            <div className="w-full lg:w-[35%]">
              <SideBar
                bgColor={bgColor}
                cart={cart}
                setCart={setCart}
                data={data}
              />
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center min-h-[90vh] justify-start p-4">
            <iframe
              className="w-full h-[18rem]"
              src="https://lottie.host/embed/e194a074-06ca-4f43-9edb-e6fe8b9bba21/QEigxWcyX0.lottie"
            ></iframe>
            <h2
              style={{ color: lightenColor(bgColor, -0.3) }}
              className="mt-6 text-4xl font-bold text-blue-700"
            >
              OOPS! Your Cart is Empty
            </h2>
            <p className="text-gray-700 max-w-[25rem] mx-auto mt-3 text-center">
              Looks like you haven't added anything to your cart yet. Let's
              change that! Explore our products and add something to your cart.
            </p>
            <Link
              style={{ backgroundColor: lightenColor(bgColor, -0.3) }}
              to={`/catalogue/1/${userName}`}
              className="px-6 py-2 mt-2 text-white transition transform rounded-md shadow-lg hover:scale-105"
            >
              Explore Products
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default Catalogue1Cart;
