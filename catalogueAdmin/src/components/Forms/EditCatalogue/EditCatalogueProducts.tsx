import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { IconCamera, IconEdit, IconRosetteDiscountCheckFilled, IconSquareRoundedArrowLeftFilled, IconSquareRoundedArrowRightFilled, IconTrash, IconWhirl, IconX } from '@tabler/icons-react'
import React, { useEffect, useState } from 'react'
import { useFieldArray, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Switch } from '@/components/ui/switch'
import { toast } from 'sonner'
import { Textarea } from '@/components/ui/textarea'
import { addProductSchema, productDetail, productResponse, uncategorisedProductResponse } from '@/validations/CatalogueValidation'
import { useGetAllCategoryQuery, useAddProductMutation, useGetAllCategoryProductsQuery, useDeleteProductMutation, useEditProductMutation } from '@/Redux/API/CatalogueApi'
import { v4 as uuidv4 } from 'uuid'
import { SelectNative } from '@/components/ui/select-native'
import { AnimatePresence } from 'framer-motion'
import { motion } from 'framer-motion'
import { HomeLayout } from '@/Layout/HomeLayout'


const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.3 } },
};

const modalVariants = {
    hidden: { opacity: 0, y: "-50px", scale: 0.8 },
    visible: { opacity: 1, y: "0", scale: 1, transition: { duration: 0.4, type: "spring", stiffness: 300 } },
    exit: { opacity: 0, y: "50px", scale: 0.8, transition: { duration: 0.3 } },
};



const EditCatalogueProducts = ({ userName, ownerId }: { userName: string | undefined, currentStep: number, ownerId: string }) => {

    const [addProduct] = useAddProductMutation()
    const [editProduct] = useEditProductMutation()
    const { data: category } = useGetAllCategoryQuery({ ownerId })
    const { data: allProduct, refetch } = useGetAllCategoryProductsQuery({ userName })
    const [deleteProduct, { isLoading: deleteLoading }] = useDeleteProductMutation()
    const { register, handleSubmit, reset, control, setValue, watch, getValues, formState: { errors, isSubmitting } } = useForm<productDetail>({
        resolver: zodResolver(addProductSchema),
        defaultValues: {
            image: [{ uniqueId: "", publicId: "", url: "" }],
        }
    })

    const [addOpen, setAddOpen] = useState(false)
    const [deleteId, setDeleteId] = useState("")
    const [editId, setEditId] = useState("")
    const [editOpen, setEditOpen] = useState(false)
    console.log(editOpen)

    useEffect(() => {
        setValue("ownerId", ownerId)
    }, [ownerId, editOpen, addOpen])

    const [files, setFiles] = useState<File[]>([]);
    console.log(getValues("image"))
    const onSubmit = async (data: productDetail) => {
        try {
            console.log(data)
            console.log(JSON.stringify(data))
            const formData = new FormData()
            formData.append("formData", JSON.stringify(data))
            files.forEach((file) => formData.append("image", file))

            if (!editOpen) {
                const res = await addProduct({ formData })

                if (res?.data?.success) {
                    refetch()
                    setAddOpen(false)
                    reset({
                        image: [{ uniqueId: "", publicId: "", url: "" }],
                        ownerId: ownerId,
                    });
                }
            } else {
                const res = await editProduct({ formData: formData, id: editId })

                if (res?.data?.success) {
                    refetch()
                    setEditOpen(false)
                    reset({
                        image: [{ uniqueId: "", publicId: "", url: "" }],
                        ownerId: ownerId,
                    });
                }
            }
        } catch (error) {
            toast.error("Error submitting form")
        }
    }

    const { fields, append, remove } = useFieldArray({
        control,
        name: 'image'
    })
    console.log(errors)
    const removeImage = (ind: number) => {
        setFiles((prevFiles: File[] | null) => {
            const newFiles = [...(prevFiles || [])];
            newFiles.splice(ind, 1);
            return newFiles;
        })

        if (fields.length === 1) {
            setValue(`image.${ind}`, { uniqueId: "", url: "", publicId: "" })
        } else {
            remove(ind)
        }
    }

    const getUniqueCode = (): string => {
        return uuidv4().slice(0, 10);
    }

    const getFileExtension = (fileName: string) => {
        return fileName.split('.').pop()
    }

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement> | null, ind: number) => {
        const selectedFile = e?.target?.files?.[0]
        if (selectedFile) {
            const uniqueCode = getUniqueCode()
            const fileExtension = getFileExtension(selectedFile.name)
            if (!getValues(`image.${ind}.uniqueId`)) {

                const fileName = `${uniqueCode}.${fileExtension}`
                setValue(`image.${ind}.uniqueId`, uniqueCode)
                setValue(`image.${ind}.url`, URL.createObjectURL(selectedFile))

                setFiles((prevFiles: File[] | null) => {
                    const newFiles = [...(prevFiles) || []]
                    newFiles[ind] = new File([selectedFile], fileName, { type: selectedFile.type })
                    return newFiles
                })
            } else {
                const uniqueId = getValues(`image.${ind}.uniqueId`);
                const fileName = `${uniqueId}.${fileExtension}`;
                setValue(`image.${ind}.uniqueId`, uniqueId);
                setValue(`image.${ind}.url`, URL.createObjectURL(selectedFile));

                setFiles((prevFiles: File[] | null) => {
                    const newFiles = [...(prevFiles || [])];
                    newFiles[ind] = new File([selectedFile], fileName, { type: selectedFile.type });
                    return newFiles;
                })
            }
        }
    }

    const [deleteModalActive, setDeleteModalActive] = useState(false)

    console.log(deleteId)

    const handleDelete = async () => {
        const res = await deleteProduct({ id: deleteId }).unwrap()
        if (res?.success) {
            refetch()
            setDeleteModalActive(false)
        }
    }

    console.log(getValues("stock"))
    return (
        <HomeLayout>
            <h1 className='text-2xl font-semibold mb-3 text-center text-neutral-700'>Products</h1>
            <div className='relative my-6'>
                {(addOpen || editOpen) &&
                    <div className='absolute w-full h-full bg-white/0 backdrop-blur-2xl z-80 '>
                        <form className='flex border border-gray-300 rounded-md mx-auto bg-white shadow-lg flex-col gap-4 p-4 max-w-[50rem] w-full' onSubmit={handleSubmit(onSubmit)} noValidate >
                            <div className='grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2'>
                                <div className="">
                                    <Label className='text-neutral-700 font-semibold text-[0.8rem]'>
                                        Select category <span className="text-red-500 dark:text-red-900">*</span>
                                    </Label>
                                    <SelectNative
                                        className='bg-gray-50 text-neutral-900 border-gray-300'
                                        onChange={(e) => {
                                            const selectedIndex = e.target.selectedIndex;
                                            const selectedOption = e.target.options[selectedIndex];

                                            setValue("category", [{ id: selectedOption.id, text: e.target.value }]);
                                        }}
                                    >
                                        <option value="" id="">Uncategorised</option>
                                        {category?.allCategories?.map((item: { id: string; text: string }) => (
                                            <option
                                                key={item.id}
                                                value={item.text}
                                                id={item.id}
                                                selected={item.text === watch("category")?.[0]?.text}
                                            >
                                                {item.text}
                                            </option>
                                        ))}
                                    </SelectNative>

                                </div>
                                <div onClick={() => setValue("stock", !getValues("stock"))} className="relative flex w-full items-center p-3 gap-2 rounded-lg border border-red-500  shadow-sm shadow-black/5 has-[[data-state=checked]]:border-green-600 ">
                                    <Switch
                                        defaultChecked={watch("stock")}
                                        className="order-1 h-4 w-6 after:absolute after:inset-0 [&_span]:size-3 [&_span]:data-[state=checked]:translate-x-2 rtl:[&_span]:data-[state=checked]:-translate-x-2"
                                    />
                                    <div className="flex grow items-center gap-2">
                                        <IconRosetteDiscountCheckFilled className='w-8 h-8 text-green-500' />
                                        <div className="grid grow gap-1">
                                            <Label className='text-neutral-700'>
                                                In Stock
                                            </Label>
                                            <p className="text-xs text-zinc-500 dark:text-zinc-400">
                                                {watch("stock") ? "Product is in stock!" : "Click to make in stock!"}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="space-y-1">
                                    <Label htmlFor={"HSNCode"} className="text-neutral-700 font-semibold">
                                        HSN Code <span className="text-[#ff3f69]">*</span>
                                    </Label>
                                    <Input {...register("HSNCode")} placeholder="Enter full name..." type="text" className={`${errors.HSNCode && "border-[#E11D48] "} py-[0.45rem]  text-neutral-900`} />
                                    {errors.HSNCode && <p className="text-[#ff3f69] tracking-wide text-sm font-semibold">{errors.HSNCode.message}</p>}
                                </div>
                                <div className='grid grid-cols-2 gap-x-1'>
                                    <div className="space-y-1">
                                        <Label htmlFor={"moq"} className="text-neutral-700 font-semibold">
                                            MOQ <span className="text-[#ff3f69]">*</span>
                                        </Label>
                                        <Input {...register("moq")} placeholder="Enter moq..." type="text" className={`${errors.moq && "border-[#E11D48] "} py-[0.45rem]  text-neutral-900`} />
                                        {errors.moq && <p className="text-[#ff3f69] tracking-wide text-sm font-semibold">{errors.moq.message}</p>}
                                    </div>
                                    <div className="space-y-1">
                                        <Label htmlFor={"price"} className="text-neutral-700 font-semibold">
                                            Price <span className="text-[#ff3f69]">*</span>
                                        </Label>
                                        <Input
                                            {...register("price", { valueAsNumber: true })}
                                            placeholder="Enter price..."
                                            type="number"
                                            className={`${errors.price && "border-[#E11D48] "} py-[0.45rem] text-neutral-900`}
                                        />
                                        {errors.price && <p className="text-[#ff3f69] tracking-wide text-sm font-semibold">{errors.price.message}</p>}
                                    </div>
                                </div>
                            </div>
                            <div className="space-y-1">
                                <Label htmlFor={"name"} className="text-neutral-700 font-semibold">
                                    Product name <span className="text-[#ff3f69]">*</span>
                                </Label>
                                <Input {...register("name")} placeholder="Enter product name..." type="text" className={`${errors.name && "border-[#E11D48] "} py-[0.45rem]  text-neutral-900`} />
                                {errors.name && <p className="text-[#ff3f69] tracking-wide text-sm font-semibold">{errors.name.message}</p>}
                            </div>
                            <div className="mt-1">
                                <Label
                                    htmlFor={"description"}
                                    className="text-neutral-700 font-semibold"
                                >
                                    Product Description (150-200 Characters) <span className="text-[#ff3f69]">*</span>
                                </Label>
                                <Textarea {...register("description")} placeholder="Enter meta keyword..." className={`${errors.description && "border-[#E11D48] "} py-[0.45rem]  text-neutral-900 border-gray-300 h-[6rem] bg-gray-50`} />

                                {errors.description && (
                                    <p className="text-[#ff3f69] tracking-wide text-sm font-semibold">
                                        {errors.description.message}
                                    </p>
                                )}
                            </div>



                            <div>
                                <Label
                                    htmlFor={"description"}
                                    className="text-neutral-700 font-semibold"
                                >
                                    Select Image <span className="text-[#ff3f69]">*</span>
                                </Label>
                                <div className='flex gap-3 flex-wrap'>
                                    {fields?.map((_, ind) => {
                                        return <div className="size-24 relative group border border-dashed border-[#E11D48] rounded overflow-hidden">
                                            {fields?.length > 1 && <div onClick={() => removeImage(ind)} className='bg-red-700 right-0 text-white w-fit absolute z-15 cursor-pointer'>
                                                <IconX className='size-5' />
                                            </div>}
                                            <input
                                                type="file"
                                                onChange={(e) => handleFileChange(e, ind)}
                                                name='image'
                                                className="absolute z-10 inset-0 w-full h-full opacity-0 cursor-pointer"
                                            />
                                            {getValues(`image.${ind}.url`) ? (
                                                <img
                                                    src={getValues(`image.${ind}.url`)}
                                                    alt="Preview"
                                                    className="w-full h-full object-contain"
                                                />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center bg-neutral-950">
                                                    <p className="text-gray-300 text-center text-sm">Select Image</p>
                                                </div>
                                            )}
                                            <div className="absolute inset-0  bg-black/80 hidden group-hover:flex items-center justify-center transition-all duration-300">
                                                <IconCamera className="text-white text-5xl" />
                                            </div>
                                            <label htmlFor="image" className="cursor-pointer absolute inset-0"></label>
                                        </div>
                                    })}

                                    <div onClick={() => append({ url: "", uniqueId: "", publicId: "" })} className="size-24 relative group border border-dashed bg-[#E11D48] rounded overflow-hidden  flex items-center justify-center text-white text-sm">
                                        Add more
                                    </div>
                                </div>
                            </div>

                            <div className="flex mt-6 justify-between space-x-4">
                                <button
                                    className={`bg-[#1c1c1c] border border-[#565656]  cursor-pointer text-white flex items-center gap-3 py-1.5 text-sm px-4 rounded }`}
                                    onClick={() => {
                                        setAddOpen(false)
                                        setEditOpen(false)
                                    }}
                                    disabled={isSubmitting}
                                >

                                    <IconSquareRoundedArrowLeftFilled />
                                    Close
                                </button>
                                <button
                                    type='submit'
                                    className="bg-[#E11D48] cursor-pointer text-white flex items-center gap-3 py-1.5 text-sm px-4 rounded"
                                    disabled={isSubmitting}
                                >
                                    {editOpen ? "Update" : "Add"} Product {
                                        isSubmitting ? (
                                            <IconWhirl className="animate-spin" />
                                        ) :
                                            <IconSquareRoundedArrowRightFilled />
                                    }
                                </button>
                            </div>
                        </form>
                    </div>
                }
                <AnimatePresence>
                    {deleteModalActive && (
                        <motion.div
                            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-start pt-30 justify-center"
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
                                    className="absolute top-3 right-3 text-gray-400 hover:text-white transition"
                                    onClick={() => setDeleteModalActive(false)}
                                >
                                    <IconX size={24} />
                                </button>
                                <div className="flex items-center gap-3 mb-4">
                                    <IconTrash className="text-[#E11D48] text-2xl" />
                                    <h2 className="text-lg font-semibold">You’re about to delete this product</h2>
                                </div>
                                <p className="text-gray-100 mb-2">
                                    Before you delete it permanently, there’s some things you should know:
                                </p>
                                <ul className="text-gray-300 list-disc pl-6">
                                    <li>If you delete a product, it will be deleted permanently!</li>
                                </ul>
                                <div className="mt-6 flex justify-end gap-4">
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
                                        {deleteLoading ? <IconWhirl className="animate-spin" /> : <>
                                            <IconTrash />
                                            <span>Delete</span>
                                        </>}
                                    </button>
                                </div>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
                <div className='flex flex-col max-w-[70rem] mx-auto gap-4 min-h-[50rem]'>
                    {allProduct?.categorisedProducts?.map((product: productResponse) => {
                        return <div key={product?.id} className='text-white  w-full border relative border-[#000]  shadow-[0px_0px_15px_#AAAAAA] rounded-md'>

                            <div className="space-y-1 bg-[#000000] p-2 rounded-t-md">
                                {/* <Label htmlFor={"moq"} className="text-neutral-700 font-semibold">
                                    Category <span className="text-[#ff3f69]">*</span>
                                </Label> */}
                                <Input value={product?.text} placeholder="Enter category..." type="text" className={`${errors.category && "border-[#E11D48] "} py-[0.45rem]  text-neutral-800`} />
                                {errors.category && <p className="text-[#ff3f69] tracking-wide text-sm font-semibold">{errors.category.message}</p>}
                            </div>
                            <div className='p-2 bg-[#F9FAFB] rounded-b-md'>
                                {(product?.products?.length >= 1) ? product?.products?.map((product: productDetail) => {
                                    return <article className="rounded-lg relative text-white border mt-2 border-gray-300 bg-[#F9FAFB]">
                                        <div className="flex items-start gap-3">
                                            <a href="#" className="block shrink-0">
                                                <img
                                                    alt=""
                                                    src={`${product?.image?.[0]?.url}`}
                                                    className="size-16 rounded-lg object-cover"
                                                />
                                            </a>

                                            <div className='min-h-[5rem]'>
                                                <h3 className="font-medium sm:text-lg">
                                                    <a href="#" className="hover:underline text-black"> {product?.name}</a>
                                                </h3>

                                                <p className="line-clamp-1 text-sm text-gray-700">
                                                    {product?.description}
                                                </p>
                                                {product?.stock ?
                                                    <span
                                                        className="whitespace-nowrap rounded-full border border-green-700 bg-green-50 px-2 text-[0.7rem] font-semibold text-green-700"
                                                    >
                                                        In stock!
                                                    </span> :
                                                    <span
                                                        className="whitespace-nowrap rounded-full border border-red-700 bg-red-50 px-2 text-[0.7rem] font-semibold text-red-700"
                                                    >
                                                        Out of Stock!
                                                    </span>}

                                            </div>
                                        </div>
                                        <div
                                            onClick={() => {
                                                reset(product)
                                                setEditId(product?.id)
                                                setEditOpen(true)
                                            }}
                                            className="flex absolute w-[5rem] justify-center -top-[0.08rem] -right-[0.08rem] items-center gap-1 rounded-tr-lg rounded-bl-lg bg-yellow-400 px-2 py-1 text-black"

                                        >
                                            <IconEdit className='text-black size-4' />

                                            <span className="text-[10px] font-medium sm:text-xs">Edit!</span>
                                        </div>
                                        <strong onClick={() => {
                                            setDeleteId(product?.id)
                                            setDeleteModalActive(true)
                                        }}
                                            className="flex absolute w-[5rem] justify-center -bottom-0.5 -right-0.5 items-center gap-1 rounded-br-lg rounded-tl-lg bg-red-500 px-2 py-1 text-black"

                                        >
                                            <IconTrash className='text-white size-4' />

                                            <span className="text-[10px] text-white font-medium sm:text-xs">Delete!</span>
                                        </strong>
                                    </article>
                                }) : <div><p className='
                            text-neutral-600 text-center text-sm font-semibold'>No product found for this category</p>

                                </div>}
                                <div onClick={() => {
                                    reset({ category: [{ id: product?.id, text: product?.text }] })
                                    setAddOpen(true)
                                }} className=' rounded-md cursor-pointer mt-3 w-fit mx-auto bg-[#E11D48] text-white px-2 py-1 text-sm'>+ Add Product</div>
                            </div>
                        </div>
                    })}
                    {allProduct?.uncategorisedProducts?.map((product: uncategorisedProductResponse) => {
                        return <div key={product?.id} className='text-white  w-full border relative border-[#000] rounded-md'>

                            <div className="space-y-1 bg-[#000000] p-2 rounded-t-md">
                                {/* <Label htmlFor={"moq"} className="text-neutral-700 font-semibold">
                                    Category <span className="text-[#ff3f69]">*</span>
                                </Label> */}
                                <Input value={product?.text} placeholder="Enter category..." type="text" className={`${errors.category && "border-[#E11D48] "} py-[0.45rem]  text-neutral-800`} />
                                {errors.category && <p className="text-[#ff3f69] tracking-wide text-sm font-semibold">{errors.category.message}</p>}
                            </div>
                            <div className='p-2 bg-[#F9FAFB] rounded-b-md'>
                                {(product?.products.length >= 1) ? product?.products?.map((product) => {
                                    return <div key={product?.id}>
                                        {product?.productDetails &&
                                            <article className="rounded-lg relative text-white border mt-2 border-gray-300 bg-[#F9FAFB]">
                                                <div className="flex items-start gap-3">
                                                    <a href="#" className="block shrink-0">
                                                        <img
                                                            alt=""
                                                            src={`${product?.productDetails?.image?.[0]?.url}`}
                                                            className="size-16 rounded-lg object-cover"
                                                        />
                                                    </a>

                                                    <div className='min-h-[5rem]'>
                                                        <h3 className="font-medium sm:text-lg text-black">
                                                            <a href="#" className="hover:underline">{product?.productDetails?.name}</a>
                                                        </h3>

                                                        <p className="line-clamp-1 text-sm text-gray-700">
                                                            {product?.productDetails?.description}
                                                        </p>
                                                        {product?.productDetails?.stock ?
                                                            <span
                                                                className="whitespace-nowrap rounded-full border border-green-700 bg-green-50 px-2 text-[0.7rem] font-semibold text-green-700"
                                                            >
                                                                In stock!
                                                            </span> :
                                                            <span
                                                                className="whitespace-nowrap rounded-full border border-red-700 bg-red-50 px-2 text-[0.7rem] font-semibold text-red-700"
                                                            >
                                                                Out of Stock!
                                                            </span>}

                                                    </div>
                                                </div>
                                                <div onClick={() => {
                                                    reset(product.productDetails)
                                                    setEditId(product?.productDetails?._id)
                                                    setEditOpen(true)
                                                }}

                                                    className="flex absolute w-[5rem] justify-center top-0 right-0 items-center gap-1 rounded-tr-lg rounded-bl-lg bg-yellow-400 px-2 py-1 text-black"
                                                >
                                                    <IconEdit className='text-black size-4' />

                                                    <span className="text-[10px] font-medium sm:text-xs">Edit!</span>
                                                </div>
                                                <strong onClick={() => {
                                                    setDeleteId(product?.productDetails?._id)
                                                    setDeleteModalActive(true)
                                                }}
                                                    className="flex absolute w-[5rem] justify-center bottom-0 right-0 items-center gap-1 rounded-br-lg rounded-tl-lg bg-red-500 px-2 py-1 text-black"

                                                >
                                                    <IconTrash className='text-white size-4' />

                                                    <span className="text-[10px] text-white font-medium sm:text-xs">Delete!</span>
                                                </strong>
                                            </article>
                                        }
                                    </div>
                                }) : <p className='
                            text-neutral-600 text-center text-sm font-semibold'>No product found for this category</p>
                                }
                                <div onClick={() => {
                                    setValue("category", [{ id: "", text: "" }])
                                    setAddOpen(true)
                                }} className=' rounded-md cursor-pointer mt-3 w-fit mx-auto bg-[#E11D48] text-white px-2 py-1 text-sm'>+ Add Product</div>
                            </div>
                        </div>

                    })}

                </div>
            </div>
        </HomeLayout>
    )
}

export default EditCatalogueProducts