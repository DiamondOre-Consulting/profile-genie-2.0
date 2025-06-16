import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  IconCamera,
  IconRosetteDiscountCheckFilled,
  IconSquareRoundedArrowLeftFilled,
  IconSquareRoundedArrowRightFilled,
  IconTrash,
  IconWhirl,
  IconX,
} from "@tabler/icons-react";
import React, { useEffect, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { Textarea } from "@/components/ui/textarea";
import {
  addProductSchema,
  categorisedProductResponse,
  productDetail,
  uncategorisedProductResponse,
  uncategrisedProduct,
} from "@/validations/CatalogueValidation";
import {
  useGetAllCategoryQuery,
  useAddProductMutation,
  useGetAllCategoryProductsQuery,
  useDeleteProductMutation,
  useEditProductMutation,
} from "@/Redux/API/CatalogueApi";
import { v4 as uuidv4 } from "uuid";
import { SelectNative } from "@/components/ui/select-native";
import { AnimatePresence } from "framer-motion";
import { motion } from "framer-motion";

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.3 } },
};

const modalVariants = {
  hidden: { opacity: 0, y: "-50px", scale: 0.8 },
  visible: {
    opacity: 1,
    y: "0",
    scale: 1,
    transition: {
      duration: 0.4,
      type: "spring" as const,
      stiffness: 300,
    },
  },
  exit: { opacity: 0, y: "50px", scale: 0.8, transition: { duration: 0.3 } },
};

const EditCatalogueProducts = ({
  setCurrentStep,
  userName,
  ownerId,
  currentStep,
}: {
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
  userName: string | undefined;
  currentStep: number;
  ownerId: string;
}) => {
  const [addProduct] = useAddProductMutation();
  const [editProduct] = useEditProductMutation();
  const { data: category } = useGetAllCategoryQuery({ ownerId });
  const { data: allProduct, refetch } = useGetAllCategoryProductsQuery({
    userName,
  });
  const [deleteProduct, { isLoading: deleteLoading }] =
    useDeleteProductMutation();
  const {
    register,
    handleSubmit,
    reset,
    control,
    setValue,
    watch,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm<productDetail>({
    resolver: zodResolver(addProductSchema),
    defaultValues: {
      image: [{ uniqueId: "", publicId: "", url: "" }],
    },
  });

  const [addOpen, setAddOpen] = useState(false);
  const [deleteId, setDeleteId] = useState("");
  const [editId, setEditId] = useState("");
  const [editOpen, setEditOpen] = useState(false);
  console.log(editOpen);

  useEffect(() => {
    setValue("ownerId", ownerId);
  }, [ownerId, editOpen, addOpen]);

  const [files, setFiles] = useState<File[]>([]);
  console.log(getValues("image"));
  const onSubmit = async (data: productDetail) => {
    try {
      console.log(data);
      console.log(JSON.stringify(data));
      const formData = new FormData();
      formData.append("formData", JSON.stringify(data));
      files.forEach((file) => formData.append("image", file));

      if (!editOpen) {
        const res = await addProduct({ formData });

        if (res?.data?.success) {
          refetch();
          setAddOpen(false);
          reset({
            image: [{ uniqueId: "", publicId: "", url: "" }],
            ownerId: ownerId,
          });
        }
      } else {
        const res = await editProduct({ formData: formData, id: editId });

        if (res?.data?.success) {
          refetch();
          setEditOpen(false);
          reset({
            image: [{ uniqueId: "", publicId: "", url: "" }],
            ownerId: ownerId,
          });
        }
      }
    } catch (error) {
      toast.error("Error submitting form");
    }
  };

  const { fields, append, remove } = useFieldArray({
    control,
    name: "image",
  });

  const removeImage = (ind: number) => {
    setFiles((prevFiles: File[] | null) => {
      const newFiles = [...(prevFiles || [])];
      newFiles.splice(ind, 1);
      return newFiles;
    });

    if (fields.length === 1) {
      setValue(`image.${ind}`, { uniqueId: "", url: "", publicId: "" });
    } else {
      remove(ind);
    }
  };

  const getUniqueCode = (): string => {
    return uuidv4().slice(0, 10);
  };

  const getFileExtension = (fileName: string) => {
    return fileName.split(".").pop();
  };

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement> | null,
    ind: number
  ) => {
    const selectedFile = e?.target?.files?.[0];
    if (selectedFile) {
      const uniqueCode = getUniqueCode();
      const fileExtension = getFileExtension(selectedFile.name);
      if (!getValues(`image.${ind}.uniqueId`)) {
        const fileName = `${uniqueCode}.${fileExtension}`;
        setValue(`image.${ind}.uniqueId`, uniqueCode);
        setValue(`image.${ind}.url`, URL.createObjectURL(selectedFile));

        setFiles((prevFiles: File[] | null) => {
          const newFiles = [...(prevFiles || [])];
          newFiles[ind] = new File([selectedFile], fileName, {
            type: selectedFile.type,
          });
          return newFiles;
        });
      } else {
        const uniqueId = getValues(`image.${ind}.uniqueId`);
        const fileName = `${uniqueId}.${fileExtension}`;
        setValue(`image.${ind}.uniqueId`, uniqueId);
        setValue(`image.${ind}.url`, URL.createObjectURL(selectedFile));

        setFiles((prevFiles: File[] | null) => {
          const newFiles = [...(prevFiles || [])];
          newFiles[ind] = new File([selectedFile], fileName, {
            type: selectedFile.type,
          });
          return newFiles;
        });
      }
    }
  };

  const [deleteModalActive, setDeleteModalActive] = useState(false);

  console.log(deleteId);

  const handleDelete = async () => {
    const res = await deleteProduct({ id: deleteId }).unwrap();
    if (res?.success) {
      refetch();
      setDeleteModalActive(false);
    }
  };

  console.log(isSubmitting);
  return (
    <div className="relative">
      {(addOpen || editOpen) && (
        <div className="absolute w-full h-full bg-black z-80 ">
          <form
            className="flex bg-black flex-col gap-4 p-4 max-w-[50rem] w-full"
            onSubmit={handleSubmit(onSubmit)}
            noValidate
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2">
              <div className="">
                <Label className="text-neutral-300 text-[0.8rem]">
                  Select category{" "}
                  <span className="text-red-500 dark:text-red-900">*</span>
                </Label>
                <SelectNative
                  onChange={(e) => {
                    const selectedIndex = e.target.selectedIndex;
                    const selectedOption = e.target.options[selectedIndex];

                    setValue("category", [
                      { id: selectedOption.id, text: e.target.value },
                    ]);
                  }}
                >
                  <option value="" id="">
                    Uncategorised
                  </option>
                  {category?.allCategories?.map(
                    (item: { id: string; text: string }) => (
                      <option
                        key={item.id}
                        value={item.text}
                        id={item.id}
                        selected={item.text === watch("category")?.[0]?.text}
                      >
                        {item.text}
                      </option>
                    )
                  )}
                </SelectNative>
              </div>
              <div
                onClick={() => setValue("stock", !getValues("stock"))}
                className="relative flex w-full items-center p-3 gap-2 rounded-lg border border-red-500  shadow-sm shadow-black/5 has-[[data-state=checked]]:border-green-600 "
              >
                <Switch className="order-1 h-4 w-6 after:absolute after:inset-0 [&_span]:size-3 [&_span]:data-[state=checked]:translate-x-2 rtl:[&_span]:data-[state=checked]:-translate-x-2" />
                <div className="flex items-center gap-2 grow">
                  <IconRosetteDiscountCheckFilled className="w-8 h-8 text-green-500" />
                  <div className="grid gap-1 grow">
                    <Label className="text-white">In Stock</Label>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400">
                      {watch("stock")
                        ? "Product is in stock!"
                        : "Click to make in stock!"}
                    </p>
                  </div>
                </div>
              </div>
              <div className="space-y-1">
                <Label htmlFor={"HSNCode"} className="text-neutral-300 ">
                  HSN Code <span className="text-main">*</span>
                </Label>
                <Input
                  {...register("HSNCode")}
                  placeholder="Enter full name..."
                  type="text"
                  className={`${
                    errors.HSNCode && "border-[#E11D48] "
                  } py-[0.45rem]  text-neutral-200`}
                />
                {errors.HSNCode && (
                  <p className="text-sm font-semibold tracking-wide text-main">
                    {errors.HSNCode.message}
                  </p>
                )}
              </div>
              <div className="grid grid-cols-2 gap-x-1">
                <div className="space-y-1">
                  <Label htmlFor={"moq"} className="text-neutral-300 ">
                    MOQ <span className="text-main">*</span>
                  </Label>
                  <Input
                    {...register("moq")}
                    placeholder="Enter moq..."
                    type="text"
                    className={`${
                      errors.moq && "border-[#E11D48] "
                    } py-[0.45rem]  text-neutral-200`}
                  />
                  {errors.moq && (
                    <p className="text-sm font-semibold tracking-wide text-main">
                      {errors.moq.message}
                    </p>
                  )}
                </div>
                <div className="space-y-1">
                  <Label htmlFor={"price"} className="text-neutral-300 ">
                    Price <span className="text-main">*</span>
                  </Label>
                  <Input
                    {...register("price", { valueAsNumber: true })}
                    placeholder="Enter price..."
                    type="number"
                    className={`${
                      errors.price && "border-[#E11D48] "
                    } py-[0.45rem] text-neutral-200`}
                  />
                  {errors.price && (
                    <p className="text-sm font-semibold tracking-wide text-main">
                      {errors.price.message}
                    </p>
                  )}
                </div>
              </div>
            </div>
            <div className="space-y-1">
              <Label htmlFor={"name"} className="text-neutral-300 ">
                Product name <span className="text-main">*</span>
              </Label>
              <Input
                {...register("name")}
                placeholder="Enter product name..."
                type="text"
                className={`${
                  errors.name && "border-[#E11D48] "
                } py-[0.45rem]  text-neutral-200`}
              />
              {errors.name && (
                <p className="text-sm font-semibold tracking-wide text-main">
                  {errors.name.message}
                </p>
              )}
            </div>
            <div className="mt-1">
              <Label htmlFor={"description"} className="text-neutral-300">
                Product Description (150-200 Characters){" "}
                <span className="text-main">*</span>
              </Label>
              <Textarea
                {...register("description")}
                placeholder="Enter meta keyword..."
                className={`${
                  errors.description && "border-[#E11D48] "
                } py-[0.45rem]  text-neutral-200 h-[6rem]`}
              />

              {errors.description && (
                <p className="text-sm font-semibold tracking-wide text-main">
                  {errors.description.message}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor={"description"} className="text-neutral-300">
                Select Image <span className="text-main">*</span>
              </Label>
              <div className="flex flex-wrap gap-3">
                {fields?.map((_, ind) => {
                  return (
                    <div className="size-24 relative group border border-dashed border-[#E11D48] rounded overflow-hidden">
                      {fields?.length > 1 && (
                        <div
                          onClick={() => removeImage(ind)}
                          className="absolute right-0 text-white bg-red-700 cursor-pointer w-fit z-15"
                        >
                          <IconX className="size-5" />
                        </div>
                      )}
                      <input
                        type="file"
                        onChange={(e) => handleFileChange(e, ind)}
                        name="image"
                        className="absolute inset-0 z-10 w-full h-full opacity-0 cursor-pointer"
                      />
                      {getValues(`image.${ind}.url`) ? (
                        <img
                          src={getValues(`image.${ind}.url`)}
                          alt="Preview"
                          className="object-contain w-full h-full"
                        />
                      ) : (
                        <div className="flex items-center justify-center w-full h-full bg-neutral-950">
                          <p className="text-sm text-center text-gray-400">
                            Select Image
                          </p>
                        </div>
                      )}
                      <div className="absolute inset-0 items-center justify-center hidden transition-all duration-300 bg-black/80 group-hover:flex">
                        <IconCamera className="text-5xl text-white" />
                      </div>
                      <label
                        htmlFor="image"
                        className="absolute inset-0 cursor-pointer"
                      ></label>
                    </div>
                  );
                })}

                <div
                  onClick={() =>
                    append({ url: "", uniqueId: "", publicId: "" })
                  }
                  className="relative flex items-center justify-center overflow-hidden text-sm text-white border border-dashed rounded size-24 group bg-main"
                >
                  Add more
                </div>
              </div>
            </div>

            <div className="flex justify-between mt-6 space-x-4">
              <button
                className={`bg-[#1c1c1c] border border-[#565656]   text-white flex items-center gap-3 py-1.5 text-sm px-4 rounded ${
                  currentStep === 1
                    ? "blur-[1px] cursor-not-allowed"
                    : "cursor-pointer"
                }`}
                onClick={() => {
                  setAddOpen(false);
                  setEditOpen(false);
                }}
                disabled={isSubmitting}
              >
                <IconSquareRoundedArrowLeftFilled />
                Close
              </button>
              <button
                type="submit"
                className="bg-main cursor-pointer text-white flex items-center gap-3 py-1.5 text-sm px-4 rounded"
                disabled={isSubmitting}
              >
                {editOpen ? "Update" : "Add"} Product{" "}
                {isSubmitting ? (
                  <IconWhirl className="animate-spin" />
                ) : (
                  <IconSquareRoundedArrowRightFilled />
                )}
              </button>
            </div>
          </form>
        </div>
      )}
      <AnimatePresence>
        {deleteModalActive && (
          <motion.div
            className="fixed inset-0 z-50 flex items-start justify-center bg-black/50 backdrop-blur-sm pt-30"
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            <motion.div
              className="relative w-full max-w-[35rem] rounded-sm  bg-gradient-to-b from-gray-900 via-gray-950 to-black p-4 text-white border border-[#DC0030]/20 shadow-lg"
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <button
                className="absolute text-gray-400 transition top-3 right-3 hover:text-white"
                onClick={() => setDeleteModalActive(false)}
              >
                <IconX size={24} />
              </button>
              <div className="flex items-center gap-3 mb-4">
                <IconTrash className="text-[#E11D48] text-2xl" />
                <h2 className="text-lg font-semibold">
                  You’re about to delete this product
                </h2>
              </div>
              <p className="mb-2 text-gray-100">
                Before you delete it permanently, there’s some things you should
                know:
              </p>
              <ul className="pl-6 text-gray-300 list-disc">
                <li>
                  If you delete a product, it will be deleted permanently!
                </li>
              </ul>
              <div className="flex justify-end gap-4 mt-6">
                <button
                  onClick={() => setDeleteModalActive(false)}
                  className="text-gray-300 hover:text-white px-4 py-1.5 rounded bg-neutral-900 transition"
                >
                  Cancel
                </button>
                <button
                  disabled={deleteLoading}
                  onClick={() => handleDelete()}
                  className="bg-[#dc0030] flex items-center gap-2 cursor-pointer hover:bg-[#dc0030e1] text-white w-[6.3rem] px-3 py-1.5 rounded transition"
                >
                  {deleteLoading ? (
                    <IconWhirl className="animate-spin" />
                  ) : (
                    <>
                      <IconTrash />
                      <span>Delete</span>
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <div className="flex flex-col gap-2 min-h-[50rem]">
        {allProduct?.categorisedProducts?.map(
          (product: categorisedProductResponse) => {
            return (
              <div
                key={product?.id}
                className="text-white  w-full p-2 border relative border-[#E11D48] rounded-md"
              >
                <div
                  onClick={() => {
                    reset({
                      category: [{ id: product?.id, text: product?.text }],
                    });
                    setAddOpen(true);
                  }}
                  className="absolute top-0 right-0 px-2 py-1 text-sm text-white rounded-bl-md bg-main"
                >
                  + Add Product
                </div>
                <div className="space-y-1">
                  <Label htmlFor={"moq"} className="text-neutral-300 ">
                    Category <span className="text-main">*</span>
                  </Label>
                  <Input
                    value={product?.text}
                    placeholder="Enter category..."
                    type="text"
                    className={`${
                      errors.category && "border-[#E11D48] "
                    } py-[0.45rem]  text-neutral-200`}
                  />
                  {errors.category && (
                    <p className="text-sm font-semibold tracking-wide text-main">
                      {errors.category.message}
                    </p>
                  )}
                </div>
                {product?.products?.map((product: productDetail) => {
                  return (
                    <article className="rounded-lg relative text-white border-2 mt-2 border-gray-800 bg-[#010101]">
                      <div className="flex items-start gap-3">
                        <a href="#" className="block shrink-0">
                          <img
                            alt=""
                            src={`${product?.image?.[0]?.url}`}
                            className="object-cover rounded-lg size-16"
                          />
                        </a>

                        <div className="min-h-[5rem]">
                          <h3 className="font-medium sm:text-lg">
                            <a href="#" className="hover:underline">
                              {" "}
                              {product?.name}
                            </a>
                          </h3>

                          <p className="text-sm text-gray-300 line-clamp-1">
                            Lorem ipsum dolor, sit amet consectetur adipisicing
                            elit. Accusamus, accusantium temporibus iure
                            delectus ut totam natus nesciunt ex? Ducimus, enim.
                          </p>
                          <span className="whitespace-nowrap rounded-full border border-green-500 bg-green-900/20 px-2 text-[0.7rem] font-semibold text-green-700">
                            In stock!
                          </span>
                        </div>
                      </div>
                      <div
                        onClick={() => {
                          reset(product);
                          setEditId(product?.id ?? "");
                          setEditOpen(true);
                        }}
                        className="flex absolute w-[5.2rem]  -top-0.5 -right-0.5 items-center gap-1 rounded-tr-lg rounded-bl-lg bg-yellow-500 px-3 py-1.5 text-white"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="size-4"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                          />
                        </svg>

                        <span className="text-[10px] font-medium sm:text-xs">
                          Edit!
                        </span>
                      </div>
                      <strong
                        onClick={() => {
                          setDeleteId(product?.id ?? "");
                          setDeleteModalActive(true);
                        }}
                        className=" absolute -right-0.5 -bottom-0.5 cursor-pointer  inline-flex items-center gap-1 rounded-ss-lg rounded-ee-lg bg-red-600 px-3 py-1.5 text-white"
                      >
                        <IconTrash className="text-white size-5" />

                        <span className="text-[10px] font-medium sm:text-xs">
                          Delete!
                        </span>
                      </strong>
                    </article>
                  );
                })}
              </div>
            );
          }
        )}
        {allProduct?.uncategorisedProducts?.map(
          (product: uncategorisedProductResponse) => {
            return (
              <div
                key={product?.id}
                className="text-white  w-full p-2 border relative border-[#E11D48] rounded-md"
              >
                <div
                  onClick={() => {
                    setValue("category", [{ id: "", text: "" }]);
                    setAddOpen(true);
                  }}
                  className="absolute top-0 right-0 px-2 py-1 text-sm text-white rounded-bl-md bg-main"
                >
                  + Add Product
                </div>
                <div className="space-y-1">
                  <Label htmlFor={"moq"} className="text-neutral-300 ">
                    Category <span className="text-main">*</span>
                  </Label>
                  <Input
                    value={product?.text}
                    placeholder="Enter category..."
                    type="text"
                    className={`${
                      errors.category && "border-[#E11D48] "
                    } py-[0.45rem]  text-neutral-200`}
                  />
                  {errors.category && (
                    <p className="text-sm font-semibold tracking-wide text-main">
                      {errors.category.message}
                    </p>
                  )}
                </div>
                {product?.products?.map((product: uncategrisedProduct) => {
                  return (
                    <div key={product?.id}>
                      {product?.productDetails && (
                        <article className="rounded-lg relative text-white border-2 mt-2 border-gray-800 bg-[#010101]">
                          <div className="flex items-start gap-3">
                            <a href="#" className="block shrink-0">
                              <img
                                alt=""
                                src={`${product?.productDetails?.image?.[0]?.url}`}
                                className="object-cover rounded-lg size-16"
                              />
                            </a>

                            <div className="min-h-[5rem]">
                              <h3 className="font-medium sm:text-lg">
                                <a href="#" className="hover:underline">
                                  {product?.productDetails?.name}
                                </a>
                              </h3>

                              <p className="text-sm text-gray-300 line-clamp-1">
                                {product?.productDetails?.description}
                              </p>
                              <span className="whitespace-nowrap rounded-full border border-green-500 bg-green-900/20 px-2 text-[0.7rem] font-semibold text-green-700">
                                In stock!
                              </span>
                            </div>
                          </div>
                          <div
                            onClick={() => {
                              reset(product.productDetails);
                              setEditId(product?.productDetails?._id ?? "");
                              setEditOpen(true);
                            }}
                            className="flex absolute w-[5.2rem]  -top-0.5 -right-0.5 items-center gap-1 rounded-tr-lg rounded-bl-lg bg-yellow-500 px-3 py-1.5 text-white"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="size-4"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              strokeWidth="2"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                              />
                            </svg>

                            <span className="text-[10px] font-medium sm:text-xs">
                              Edit!
                            </span>
                          </div>
                          <strong
                            onClick={() => {
                              setDeleteId(product?.productDetails?._id ?? "");
                              setDeleteModalActive(true);
                            }}
                            className=" absolute cursor-pointer -right-0.5 -bottom-0.5  inline-flex items-center gap-1 rounded-ss-lg rounded-ee-lg bg-red-600 px-3 py-1.5 text-white"
                          >
                            <IconTrash className="text-white" />

                            <span className="text-[10px] font-medium sm:text-xs">
                              Delete!
                            </span>
                          </strong>
                        </article>
                      )}
                    </div>
                  );
                })}
              </div>
            );
          }
        )}
        <div className="flex justify-between mt-6 space-x-4">
          <button
            className={`bg-[#1c1c1c] border border-[#565656]   text-white flex items-center gap-3 py-1.5 text-sm px-4 rounded ${
              currentStep === 1
                ? "blur-[1px] cursor-not-allowed"
                : "cursor-pointer"
            }`}
            onClick={() => {
              setAddOpen(false);
              setEditOpen(false);
              setCurrentStep(currentStep - 1);
            }}
          >
            <IconSquareRoundedArrowLeftFilled />
            Close
          </button>
          <button
            onClick={() => setCurrentStep(currentStep + 1)}
            type="submit"
            className="bg-main cursor-pointer text-white flex items-center gap-3 py-1.5 text-sm px-4 rounded"
            disabled={isSubmitting}
          >
            Next
            <IconSquareRoundedArrowRightFilled />
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditCatalogueProducts;
