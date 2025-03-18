import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { IconCamera, IconRosetteDiscountCheckFilled, IconSquareRoundedArrowLeftFilled, IconSquareRoundedArrowRightFilled, IconWhirl, IconX } from '@tabler/icons-react'
import React, { useEffect, useState } from 'react'
import { useFieldArray, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Switch } from '@/components/ui/switch'
import { toast } from 'sonner'
import { Textarea } from '@/components/ui/textarea'
import { addProductSchema, productDetail } from '@/validations/CatalogueValidation'
import { useCreateCatalogueMutation, useGetAllCategoryQuery } from '@/Redux/API/CatalogueApi'
import { Tag, TagInput } from 'emblor'
import { SelectNative } from '@/components/ui/select-native'
import { v4 as uuidv4 } from 'uuid'
import MultipleSelector from '@/components/ui/multiselect'

const AddCatalogueProducts = ({ setCurrentStep, ownerId, currentStep, stepsLength, setId }: { setCurrentStep: React.Dispatch<React.SetStateAction<number>>, currentStep: number, ownerId: string, stepsLength: number, setId: React.Dispatch<React.SetStateAction<string>> }) => {

    const [createCatalogue] = useCreateCatalogueMutation()
    const { data: category } = useGetAllCategoryQuery({ ownerId })
    console.log(category)
    const { register, handleSubmit, control, setValue, watch, getValues, formState: { errors, isSubmitting } } = useForm<productDetail>({
        resolver: zodResolver(addProductSchema),
        defaultValues: {
            image: [{ uniqueId: "", publicId: "", url: "" }],
        }
    })

    const [files, setFiles] = useState<File[]>([]);

    const onSubmit = async (data: productDetail) => {
        try {
            console.log(JSON.stringify(data))
            const formData = new FormData()
            formData.append("formData", JSON.stringify(data))
            files.forEach((file) => formData.append("files", file))

            const res = await createCatalogue({ formData })
            console.log(res)
            if (res?.data?.success) {
                setId(res?.data?.data?._id)
                setCurrentStep((prev) => prev + 1)
            }
        } catch (error) {
            toast.error("Error submitting form")
        }
    }

    const { fields, append, remove } = useFieldArray({
        control,
        name: 'image'
    })

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



    console.log(watch("category"))

    const [open, setOpen] = useState(false)

    const [categoryTags, setCategoryTags] = useState<Tag[]>([]);
    const [activeTagIndex, setActiveTagIndex] = useState<number | null>(null);
    console.log(categoryTags)

    useEffect(() => {
        setValue("category", categoryTags)
    }, [categoryTags]);

    return (
        <form className='' onSubmit={handleSubmit(onSubmit)} noValidate >
            <div className='grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2'>
                <div className="flex flex-col gap-1">
                    <Label htmlFor={"category"} className="text-neutral-300 ">
                        Category <span className="text-[#ff3f69]">*</span>
                    </Label>
                    <MultipleSelector
                        commandProps={{
                            label: "Select frameworks",
                        }}
                        value={category?.allCategory.slice(0, 2)}
                        defaultOptions={category?.allCategory}
                        placeholder="Select frameworks"
                        hideClearAllButton
                        hidePlaceholderWhenSelected
                        emptyIndicator={<p className="text-center text-sm text-red-700">No results found</p>}
                    />

                </div>
                <div onClick={() => setValue("stock", !getValues("stock"))} className="relative flex w-full items-center p-3 gap-2 rounded-lg border border-red-500  shadow-sm shadow-black/5 has-[[data-state=checked]]:border-green-600 ">
                    <Switch
                        className="order-1 h-4 w-6 after:absolute after:inset-0 [&_span]:size-3 [&_span]:data-[state=checked]:translate-x-2 rtl:[&_span]:data-[state=checked]:-translate-x-2"
                    />
                    <div className="flex grow items-center gap-2">
                        <IconRosetteDiscountCheckFilled className='w-8 h-8 text-green-500' />
                        <div className="grid grow gap-1">
                            <Label className='text-white'>
                                In Stock
                            </Label>
                            <p className="text-xs text-zinc-500 dark:text-zinc-400">
                                {watch("stock") ? "Product is in stock!" : "Click to make in stock!"}
                            </p>
                        </div>
                    </div>
                </div>
                <div className="space-y-1">
                    <Label htmlFor={"HSNCode"} className="text-neutral-300 ">
                        HSN Code <span className="text-[#ff3f69]">*</span>
                    </Label>
                    <Input {...register("HSNCode")} placeholder="Enter full name..." type="text" className={`${errors.HSNCode && "border-[#E11D48] "} py-[0.45rem]  text-neutral-200`} />
                    {errors.HSNCode && <p className="text-[#ff3f69] tracking-wide text-sm font-semibold">{errors.HSNCode.message}</p>}
                </div>
                <div className='grid grid-cols-2 gap-x-1'>
                    <div className="space-y-1">
                        <Label htmlFor={"moq"} className="text-neutral-300 ">
                            MOQ <span className="text-[#ff3f69]">*</span>
                        </Label>
                        <Input {...register("moq")} placeholder="Enter moq..." type="text" className={`${errors.moq && "border-[#E11D48] "} py-[0.45rem]  text-neutral-200`} />
                        {errors.moq && <p className="text-[#ff3f69] tracking-wide text-sm font-semibold">{errors.moq.message}</p>}
                    </div>
                    <div className="space-y-1">
                        <Label htmlFor={"price"} className="text-neutral-300 ">
                            Price <span className="text-[#ff3f69]">*</span>
                        </Label>
                        <Input {...register("price")} placeholder="Enter price..." type="text" className={`${errors.price && "border-[#E11D48] "} py-[0.45rem]  text-neutral-200`} />
                        {errors.price && <p className="text-[#ff3f69] tracking-wide text-sm font-semibold">{errors.price.message}</p>}
                    </div>
                </div>
            </div>
            <div className="space-y-1">
                <Label htmlFor={"name"} className="text-neutral-300 ">
                    Product name <span className="text-[#ff3f69]">*</span>
                </Label>
                <Input {...register("name")} placeholder="Enter product name..." type="text" className={`${errors.name && "border-[#E11D48] "} py-[0.45rem]  text-neutral-200`} />
                {errors.name && <p className="text-[#ff3f69] tracking-wide text-sm font-semibold">{errors.name.message}</p>}
            </div>
            <div className="mt-1">
                <Label
                    htmlFor={"description"}
                    className="text-neutral-300"
                >
                    Product Description (150-200 Characters) <span className="text-[#ff3f69]">*</span>
                </Label>
                <Textarea {...register("description")} placeholder="Enter meta keyword..." className={`${errors.description && "border-[#E11D48] "} py-[0.45rem]  text-neutral-200 h-[6rem]`} />

                {errors.description && (
                    <p className="text-[#ff3f69] tracking-wide text-sm font-semibold">
                        {errors.description.message}
                    </p>
                )}
            </div>



            <div>
                <Label
                    htmlFor={"description"}
                    className="text-neutral-300"
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
                                    <p className="text-gray-400 text-center text-sm">Select Image</p>
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
                    className={`bg-[#1c1c1c] border border-[#565656]   text-white flex items-center gap-3 py-1.5 text-sm px-4 rounded ${currentStep === 1 ? "blur-[1px] cursor-not-allowed" : "cursor-pointer"}`}
                    onClick={() => setCurrentStep((prev) => prev - 1)}
                    disabled={currentStep === 1}
                >

                    <IconSquareRoundedArrowLeftFilled />
                    Prev
                </button>
                <button
                    type='submit'
                    className="bg-[#E11D48] cursor-pointer text-white flex items-center gap-3 py-1.5 text-sm px-4 rounded"
                    disabled={isSubmitting || currentStep > stepsLength}
                >
                    Next   {
                        isSubmitting ? (
                            <IconWhirl className="animate-spin" />
                        ) :
                            <IconSquareRoundedArrowRightFilled />
                    }
                </button>
            </div>
        </form >
    )
}

export default AddCatalogueProducts
