import { addOthersDetailSchema } from '@/validations/PortfolioValidation'
import { zodResolver } from '@hookform/resolvers/zod'
import React, { useState } from 'react'
import { useFieldArray, useForm } from 'react-hook-form'
import { z } from 'zod'
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { AtSign, Command, Eclipse, Zap } from "lucide-react";
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { IconCamera, IconPlus, IconSquareRoundedArrowLeftFilled, IconSquareRoundedArrowRightFilled, IconWhirl, IconX } from '@tabler/icons-react'
import { v4 as uuidv4 } from 'uuid'
import { Textarea } from '@/components/ui/textarea'


type othersProfileDetail = z.infer<typeof addOthersDetailSchema>

const AddOthersDetail = ({ currentStep, stepsLength, setCurrentStep }: { currentStep: number, stepsLength: number, setCurrentStep: React.Dispatch<React.SetStateAction<number>> }) => {

    const { register, handleSubmit, getValues, setValue, control, formState: { errors, isSubmitting } } = useForm<othersProfileDetail>({
        resolver: zodResolver(addOthersDetailSchema),
        defaultValues: {
            brands: [{ uniqueId: "", brandName: "", image: { publicId: "", url: "" } }],
            bulkLink: [{ linkName: "", link: "" }],
            services: [{ uniqueId: "", title: "", detail: "", image: { publicId: "", url: "" } }],
            products: [{ uniqueId: "", title: "", detail: "", image: { publicId: "", url: "" } }],
        }
    })

    const [brandsFiles, setBrandsFiles] = useState<File[] | null>(null)
    const [servicesFiles, setServicesFiles] = useState<File[] | null>(null)
    const [productsFiles, setProductsFiles] = useState<File[] | null>(null)

    const getUniqueCode = (): string => {
        return uuidv4().slice(0, 10);
    }

    const getFileExtension = (fileName: string) => {
        return fileName.split('.').pop()
    }

    const handleBrandsFileChange = (e: React.ChangeEvent<HTMLInputElement> | null, ind: number) => {
        const selectedFile = e?.target?.files?.[0]
        if (selectedFile) {
            const uniqueCode = getUniqueCode()
            const fileExtension = getFileExtension(selectedFile.name)
            if (!getValues(`brands.${ind}.uniqueId`)) {

                const fileName = `${uniqueCode}.${fileExtension}`
                setValue(`brands.${ind}.uniqueId`, uniqueCode)
                setValue(`brands.${ind}.image.url`, URL.createObjectURL(selectedFile))

                setBrandsFiles((prevFiles: File[] | null) => {
                    const newFiles = [...(prevFiles) || []]
                    newFiles[ind] = new File([selectedFile], fileName, { type: selectedFile.type })
                    return newFiles
                })
            } else {
                const uniqueId = getValues(`brands.${ind}.uniqueId`);
                const fileName = `${uniqueId}.${fileExtension}`;
                setValue(`brands.${ind}.uniqueId`, uniqueId);
                setValue(`brands.${ind}.image.url`, URL.createObjectURL(selectedFile));

                setBrandsFiles((prevFiles: File[] | null) => {
                    const newFiles = [...(prevFiles || [])];
                    newFiles[ind] = new File([selectedFile], fileName, { type: selectedFile.type });
                    return newFiles;
                })
            }
        }
    }

    const { fields: brandsFields, append: brandsAppend, remove: brandsRemove } = useFieldArray({
        control,
        name: 'brands'
    })

    const removeBrand = (ind: number) => {
        setBrandsFiles((prevFiles: File[] | null) => {
            const newFiles = [...(prevFiles || [])];
            newFiles.splice(ind, 1);
            return newFiles;
        })

        if (brandsFields.length === 1) {
            setValue(`brands.${ind}`, { uniqueId: "", brandName: "", image: { url: "", publicId: "" } })
        } else {
            brandsRemove(ind)
        }
    }

    const { fields: linkFields, append: linkAppend, remove: linkRemove } = useFieldArray({
        control,
        name: 'bulkLink'
    })

    const handleServiceFileChange = (e: React.ChangeEvent<HTMLInputElement> | null, ind: number) => {
        const selectedFile = e?.target?.files?.[0]
        if (selectedFile) {
            const uniqueCode = getUniqueCode()
            const fileExtension = getFileExtension(selectedFile.name)
            if (!getValues(`services.${ind}.uniqueId`)) {

                const fileName = `${uniqueCode}.${fileExtension}`
                setValue(`services.${ind}.uniqueId`, uniqueCode)
                setValue(`services.${ind}.image.url`, URL.createObjectURL(selectedFile))

                setServicesFiles((prevFiles: File[] | null) => {
                    const newFiles = [...(prevFiles) || []]
                    newFiles[ind] = new File([selectedFile], fileName, { type: selectedFile.type })
                    return newFiles
                })
            } else {
                const uniqueId = getValues(`services.${ind}.uniqueId`);
                const fileName = `${uniqueId}.${fileExtension}`;
                setValue(`services.${ind}.uniqueId`, uniqueId);
                setValue(`services.${ind}.image.url`, URL.createObjectURL(selectedFile));

                setServicesFiles((prevFiles: File[] | null) => {
                    const newFiles = [...(prevFiles || [])];
                    newFiles[ind] = new File([selectedFile], fileName, { type: selectedFile.type });
                    return newFiles;
                })
            }
        }
    }

    const { fields: serviceFields, append: serviceAppend, remove: serviceRemove } = useFieldArray({
        control,
        name: 'services'
    })

    const removeService = (ind: number) => {
        setServicesFiles((prevFiles: File[] | null) => {
            const newFiles = [...(prevFiles || [])];
            newFiles.splice(ind, 1);
            return newFiles;
        })

        if (serviceFields.length === 1) {
            setValue(`services.${ind}`, { uniqueId: "", title: "", image: { url: "", publicId: "" }, detail: "" })
        } else {
            serviceRemove(ind)
        }
    }

    const handleProductFileChange = (e: React.ChangeEvent<HTMLInputElement> | null, ind: number) => {
        const selectedFile = e?.target?.files?.[0]
        if (selectedFile) {
            const uniqueCode = getUniqueCode()
            const fileExtension = getFileExtension(selectedFile.name)
            if (!getValues(`products.${ind}.uniqueId`)) {

                const fileName = `${uniqueCode}.${fileExtension}`
                setValue(`products.${ind}.uniqueId`, uniqueCode)
                setValue(`products.${ind}.image.url`, URL.createObjectURL(selectedFile))

                setProductsFiles((prevFiles: File[] | null) => {
                    const newFiles = [...(prevFiles) || []]
                    newFiles[ind] = new File([selectedFile], fileName, { type: selectedFile.type })
                    return newFiles
                })
            } else {
                const uniqueId = getValues(`products.${ind}.uniqueId`);
                const fileName = `${uniqueId}.${fileExtension}`;
                setValue(`products.${ind}.uniqueId`, uniqueId);
                setValue(`products.${ind}.image.url`, URL.createObjectURL(selectedFile));

                setProductsFiles((prevFiles: File[] | null) => {
                    const newFiles = [...(prevFiles || [])];
                    newFiles[ind] = new File([selectedFile], fileName, { type: selectedFile.type });
                    return newFiles;
                })
            }
        }
    }

    const { fields: productsFields, append: productsAppend, remove: productsRemove } = useFieldArray({
        control,
        name: 'products'
    })

    const removeProducts = (ind: number) => {
        setProductsFiles((prevFiles: File[] | null) => {
            const newFiles = [...(prevFiles || [])];
            newFiles.splice(ind, 1);
            return newFiles;
        })

        if (productsFields.length === 1) {
            setValue(`products.${ind}`, { uniqueId: "", title: "", image: { url: "", publicId: "" }, detail: "" })
        } else {
            productsRemove(ind)
        }
    }

    const onSubmit = (data: othersProfileDetail) => {
        const formData = new FormData()

        formData.append('data', JSON.stringify(data))

        brandsFiles?.forEach((img) => {
            formData.append('brands', img)
        })

        servicesFiles?.forEach((img) => {
            formData.append('services', img)
        })

        productsFiles?.forEach((img) => {
            formData.append('products', img)
        })

        setCurrentStep(currentStep + 1)

    }

    const items = [
        {
            id: "1",
            icon: Command,
            title: "Brands",
            content:
                <div>
                    <div>
                        <Label htmlFor={"tagline"} className="text-neutral-300 ">
                            Brand Tagline <span className="text-[#ff3f69]">*</span>
                        </Label>
                        <Input {...register("brandTagline")} placeholder="Enter tagline..." type="text" className={`${errors.brandTagline && "border-[#E11D48] "} py-[0.45rem] text-neutral-200`} />
                        {errors.brandTagline && <p className="text-[#ff3f69] tracking-wide text-sm font-semibold">{errors.brandTagline.message}</p>}
                    </div>
                    <div className='grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2'>
                        {brandsFields?.map((_, ind) => {
                            return <div className='space-y-2  p-2 my-3 rounded bg-[#ff17a21b] border border-rose-800' key={ind}>
                                <div>
                                    <Label htmlFor={`brands.${ind}.brandName`} className="text-neutral-300 ">
                                        Brand name <span className="text-[#ff3f69]">*</span>
                                    </Label>
                                    <Input {...register(`brands.${ind}.brandName`)} placeholder="Enter brand name..." type="text" className={`${errors.brands?.[ind]?.brandName && "border-[#E11D48] "} py-[0.45rem] text-neutral-200`} />
                                    {errors.brands?.[ind]?.brandName && <p className="text-[#ff3f69] tracking-wide text-sm font-semibold">{errors.brands?.[ind]?.brandName.message}</p>}
                                </div>
                                <div className='flex  justify-evenly'>
                                    <div className="h-24  w-24 relative group border border-dashed border-[#E11D48] rounded overflow-hidden">

                                        <input
                                            type="file"
                                            onChange={(e) => handleBrandsFileChange(e, ind)}
                                            name='imageImage'
                                            className="absolute z-10 inset-0 w-full h-full opacity-0 cursor-pointer"
                                        />
                                        {getValues(`brands.${ind}.image.url`) ? (
                                            <img
                                                src={getValues(`brands.${ind}.image.url`)}
                                                alt="Preview"
                                                className="w-full h-full object-contain"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center bg-neutral-950">
                                                <p className="text-gray-400 text-center">Select image</p>
                                            </div>
                                        )}
                                        <div className="absolute inset-0  bg-black/80 hidden group-hover:flex items-center justify-center transition-all duration-300">
                                            <IconCamera className="text-white text-5xl" />
                                        </div>
                                        <label htmlFor="image" className="cursor-pointer absolute inset-0"></label>
                                    </div>

                                    {
                                        brandsFields.length && (
                                            <button type='button' onClick={() => removeBrand(ind)} className='flex size-24 gap-2 items-center justify-center bg-[#E11D48] text-white p-1 px-2 rounded'><IconX className='size-4' /> {brandsFields.length !== 1 ? "Remove" : "Clear"}</button>
                                        )
                                    }
                                </div>
                            </div>
                        })}

                        <button type='button' className='bg-[#E11D48] flex items-center justify-center cursor-pointer gap-2 my-3 p-2 px-4 rounded text-white' onClick={() => brandsAppend({ uniqueId: "", brandName: "", image: { publicId: "", url: "" } })}>
                            <IconPlus className='size-4.5' /> Add more
                        </button>
                    </div>
                </div>,
        },
        {
            id: "2",
            icon: Eclipse,
            title: "Bulk Link",
            content:
                <div>
                    <div>
                        <Label htmlFor={"bulkLinkTagline"} className="text-neutral-300 ">
                            Bulk link Tagline <span className="text-[#ff3f69]">*</span>
                        </Label>
                        <Input {...register("bulkLinkTagline")} placeholder="Enter bulk link tagline..." type="text" className={`${errors.bulkLinkTagline && "border-[#E11D48] "} py-[0.45rem] text-neutral-200`} />
                        {errors.bulkLinkTagline && <p className="text-[#ff3f69] tracking-wide text-sm font-semibold">{errors.bulkLinkTagline.message}</p>}
                    </div>
                    <div className='grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2'>
                        {linkFields?.map((_, ind) => {
                            return <div className='space-y-2  p-2 my-3 rounded bg-[#ff17a21b] border border-rose-800' key={ind}>
                                <div>
                                    <Label htmlFor={`bulkLink.${ind}.linkName`} className="text-neutral-300 ">
                                        Link name <span className="text-[#ff3f69]">*</span>
                                    </Label>
                                    <Input {...register(`bulkLink.${ind}.linkName`)} placeholder="Enter brand name..." type="text" className={`${errors.bulkLink?.[ind]?.linkName && "border-[#E11D48] "} py-[0.45rem] text-neutral-200`} />
                                    {errors.bulkLink?.[ind]?.linkName && <p className="text-[#ff3f69] tracking-wide text-sm font-semibold">{errors.bulkLink?.[ind]?.linkName.message}</p>}
                                </div>
                                <div>
                                    <Label htmlFor={`bulkLink.${ind}.link`} className="text-neutral-300 ">
                                        Link <span className="text-[#ff3f69]">*</span>
                                    </Label>
                                    <Input {...register(`bulkLink.${ind}.link`)} placeholder="Enter link ..." type="text" className={`${errors.bulkLink?.[ind]?.link && "border-[#E11D48] "} py-[0.45rem] text-neutral-200`} />
                                    {errors.bulkLink?.[ind]?.link && <p className="text-[#ff3f69] tracking-wide text-sm font-semibold">{errors.bulkLink?.[ind]?.link.message}</p>}
                                </div>
                                <div className='flex gap-2 justify-evenly mt-3'>

                                    <div className='size-9 px-5 border border-[#E11D48] flex items-center justify-center rounded bg-[#010101]'>
                                        {ind + 1}
                                    </div>
                                    {
                                        linkFields.length && (
                                            <button type='button'
                                                onClick={() => {
                                                    if (linkFields.length === 1) {
                                                        setValue(`bulkLink.${ind}`, { link: "", linkName: "" });
                                                    } else {
                                                        linkRemove(ind);
                                                    }
                                                }}
                                                className='flex w-full gap-2 items-center justify-center bg-[#E11D48] text-white px-2 rounded'><IconX className='size-4' /> {linkFields.length !== 1 ? "Remove" : "Clear"}
                                            </button>
                                        )
                                    }
                                </div>
                            </div>
                        })}

                        <button type='button' className='bg-[#E11D48] flex items-center justify-center cursor-pointer gap-2 my-3 p-2 px-4 rounded text-white' onClick={() => linkAppend({ linkName: "", link: "" })}>
                            <IconPlus className='size-4.5' /> Add more
                        </button>
                    </div>
                </div >,
        },
        {
            id: "3",
            icon: Zap,
            title: "Services",
            content:
                <div>
                    <div>
                        <Label htmlFor={"serviceTagline"} className="text-neutral-300 ">
                            Service Tagline <span className="text-[#ff3f69]">*</span>
                        </Label>
                        <Input {...register("serviceTagline")} placeholder="Enter service tagline..." type="text" className={`${errors.serviceTagline && "border-[#E11D48] "} py-[0.45rem] text-neutral-200`} />
                        {errors.serviceTagline && <p className="text-[#ff3f69] tracking-wide text-sm font-semibold">{errors.serviceTagline.message}</p>}
                    </div>
                    <div className='grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2'>
                        {serviceFields?.map((_, ind) => {
                            return <div className='space-y-2  p-2 my-3 rounded bg-[#ff17a21b] border border-rose-800' key={ind}>
                                <div>
                                    <Label htmlFor={`services.${ind}.serviceName`} className="text-neutral-300 ">
                                        Service title <span className="text-[#ff3f69]">*</span>
                                    </Label>
                                    <Input {...register(`services.${ind}.title`)} placeholder="Enter service name..." type="text" className={`${errors.services?.[ind]?.title && "border-[#E11D48] "} py-[0.45rem] text-neutral-200`} />
                                    {errors.services?.[ind]?.title && <p className="text-[#ff3f69] tracking-wide text-sm font-semibold">{errors.services?.[ind]?.title.message}</p>}
                                </div>
                                <div>
                                    <Label htmlFor={`services.${ind}.detail`} className="text-neutral-300 ">
                                        Service description <span className="text-[#ff3f69]">*</span>
                                    </Label>
                                    <Textarea {...register(`services.${ind}.detail`)} placeholder="Enter service detail..." className={`${errors.services?.[ind]?.detail && "border-[#E11D48] "} py-[0.45rem] text-neutral-200`} />
                                    {errors.services?.[ind]?.detail && <p className="text-[#ff3f69] tracking-wide text-sm font-semibold">{errors.services?.[ind]?.detail.message}</p>}
                                </div>
                                <div className='flex  justify-evenly'>
                                    <div className="h-24  w-24 relative group border border-dashed border-[#E11D48] rounded overflow-hidden">

                                        <input
                                            type="file"
                                            onChange={(e) => handleServiceFileChange(e, ind)}
                                            name='imageImage'
                                            className="absolute z-10 inset-0 w-full h-full opacity-0 cursor-pointer"
                                        />
                                        {getValues(`services.${ind}.image.url`) ? (
                                            <img
                                                src={getValues(`services.${ind}.image.url`)}
                                                alt="Preview"
                                                className="w-full h-full object-contain"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center bg-neutral-950">
                                                <p className="text-gray-400 text-center">Select image</p>
                                            </div>
                                        )}
                                        <div className="absolute inset-0  bg-black/80 hidden group-hover:flex items-center justify-center transition-all duration-300">
                                            <IconCamera className="text-white text-5xl" />
                                        </div>
                                        <label htmlFor="image" className="cursor-pointer absolute inset-0"></label>
                                    </div>

                                    {
                                        brandsFields.length && (
                                            <button type='button' onClick={() => removeService(ind)} className='flex size-24 gap-2 items-center justify-center bg-[#E11D48] text-white p-1 px-2 rounded'><IconX className='size-4' /> {serviceFields.length !== 1 ? "Remove" : "Clear"}</button>
                                        )
                                    }
                                </div>
                            </div>
                        })}

                        <button type='button' className='bg-[#E11D48] flex items-center justify-center cursor-pointer gap-2 my-3 p-2 px-4 rounded text-white' onClick={() => serviceAppend({ uniqueId: "", title: "", image: { publicId: "", url: "" }, detail: "" })}>
                            <IconPlus className='size-4.5' /> Add more
                        </button>
                    </div>
                </div>,
        },
        {
            id: "4",
            icon: AtSign,
            title: "Products",
            content:
                <div>
                    <div>
                        <Label htmlFor={"productTagline"} className="text-neutral-300 ">
                            Product Tagline <span className="text-[#ff3f69]">*</span>
                        </Label>
                        <Input {...register("productTagline")} placeholder="Enter service tagline..." type="text" className={`${errors.productTagline && "border-[#E11D48] "} py-[0.45rem] text-neutral-200`} />
                        {errors.productTagline && <p className="text-[#ff3f69] tracking-wide text-sm font-semibold">{errors.productTagline.message}</p>}
                    </div>
                    <div className='grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2'>
                        {productsFields?.map((_, ind) => {
                            return <div className='space-y-2  p-2 my-3 rounded bg-[#ff17a21b] border border-rose-800' key={ind}>
                                <div>
                                    <Label htmlFor={`products.${ind}.serviceName`} className="text-neutral-300 ">
                                        Product title <span className="text-[#ff3f69]">*</span>
                                    </Label>
                                    <Input {...register(`products.${ind}.title`)} placeholder="Enter service name..." type="text" className={`${errors.products?.[ind]?.title && "border-[#E11D48] "} py-[0.45rem] text-neutral-200`} />
                                    {errors.products?.[ind]?.title && <p className="text-[#ff3f69] tracking-wide text-sm font-semibold">{errors.products?.[ind]?.title.message}</p>}
                                </div>
                                <div>
                                    <Label htmlFor={`products.${ind}.detail`} className="text-neutral-300 ">
                                        Product description <span className="text-[#ff3f69]">*</span>
                                    </Label>
                                    <Textarea {...register(`products.${ind}.detail`)} placeholder="Enter service detail..." className={`${errors.products?.[ind]?.detail && "border-[#E11D48] "} py-[0.45rem] text-neutral-200`} />
                                    {errors.products?.[ind]?.detail && <p className="text-[#ff3f69] tracking-wide text-sm font-semibold">{errors.products?.[ind]?.detail.message}</p>}
                                </div>
                                <div className='flex  justify-evenly'>
                                    <div className="h-24  w-24 relative group border border-dashed border-[#E11D48] rounded overflow-hidden">

                                        <input
                                            type="file"
                                            onChange={(e) => handleProductFileChange(e, ind)}
                                            name='imageImage'
                                            className="absolute z-10 inset-0 w-full h-full opacity-0 cursor-pointer"
                                        />
                                        {getValues(`products.${ind}.image.url`) ? (
                                            <img
                                                src={getValues(`products.${ind}.image.url`)}
                                                alt="Preview"
                                                className="w-full h-full object-contain"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center bg-neutral-950">
                                                <p className="text-gray-400 text-center">Select image</p>
                                            </div>
                                        )}
                                        <div className="absolute inset-0  bg-black/80 hidden group-hover:flex items-center justify-center transition-all duration-300">
                                            <IconCamera className="text-white text-5xl" />
                                        </div>
                                        <label htmlFor="image" className="cursor-pointer absolute inset-0"></label>
                                    </div>

                                    {
                                        brandsFields.length && (
                                            <button type='button' onClick={() => removeProducts(ind)} className='flex size-24 gap-2 items-center justify-center bg-[#E11D48] text-white p-1 px-2 rounded'><IconX className='size-4' /> {productsFields.length !== 1 ? "Remove" : "Clear"}</button>
                                        )
                                    }
                                </div>
                            </div>
                        })}

                        <button type='button' className='bg-[#E11D48] flex items-center justify-center cursor-pointer gap-2 my-3 p-2 px-4 rounded text-white' onClick={() => productsAppend({ uniqueId: "", title: "", image: { publicId: "", url: "" }, detail: "" })}>
                            <IconPlus className='size-4.5' /> Add more
                        </button>
                    </div>
                </div>,
        },
    ];

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Accordion type="single" className="w-full" defaultValue="1">
                {items.map((item) => (
                    <AccordionItem value={item.id} key={item.id} className="py-2">
                        <AccordionTrigger className="py-2 text-[15px] leading-6 hover:no-underline">
                            <span className="flex items-center gap-3">
                                <item.icon
                                    size={16}
                                    strokeWidth={2}
                                    className="shrink-0 opacity-60"
                                    aria-hidden="true"
                                />
                                <span>{item.title}</span>
                            </span>
                        </AccordionTrigger>
                        <AccordionContent className="pb-2 ps-7 text-zinc-500 dark:text-zinc-400">
                            <form action="">
                                {item.content}
                            </form>
                        </AccordionContent>
                    </AccordionItem>
                ))}
            </Accordion>
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
        </form>
    )
}

export default AddOthersDetail
