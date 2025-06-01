import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { IconCamera, IconRosetteDiscountCheckFilled, IconSquareRoundedArrowLeftFilled, IconSquareRoundedArrowRightFilled, IconWhirl } from '@tabler/icons-react'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Switch } from '@/components/ui/switch'
import { toast } from 'sonner'
import { Textarea } from '@/components/ui/textarea'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { format } from 'date-fns'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { CalendarIcon } from 'lucide-react'
import { Calendar } from '@/components/ui/calendar'
import { addCatalogueSchema, catalogueDetail } from '@/validations/CatalogueValidation'
import { HexColorPicker } from "react-colorful"
import { useCreateCatalogueMutation } from '@/Redux/API/CatalogueApi'
import { Tag, TagInput } from 'emblor'

const AddCatalogueDetail = ({ setCurrentStep, ownerId, currentStep, stepsLength, setUserName }: { setCurrentStep: React.Dispatch<React.SetStateAction<number>>, currentStep: number, ownerId: string, stepsLength: number, setUserName: React.Dispatch<React.SetStateAction<string>> }) => {

    const [createCatalogue] = useCreateCatalogueMutation()

    const { register, handleSubmit, setValue, watch, getValues, formState: { errors, isSubmitting } } = useForm<catalogueDetail>({
        resolver: zodResolver(addCatalogueSchema)
    })

    const [files, setFiles] = useState<File[]>([]);

    const handleFileChange = (fieldName: keyof catalogueDetail, file?: File) => {
        if (file) {
            const extension = file.name.split(".").pop();
            const updatedFile = new File([file], `${fieldName}.${extension}`, { type: file.type });

            setFiles((prev) => [...prev.filter((f) => f.name !== updatedFile.name), updatedFile]);

            const previewUrl = URL.createObjectURL(updatedFile);
            if (fieldName === "heroImage" || fieldName === "logo") {
                setValue(`${fieldName}.url`, previewUrl);
            }
        }
    };

    useEffect(() => {
        setValue("catalogueOwner", ownerId)
    }, [ownerId])

    const onSubmit = async (data: catalogueDetail) => {
        try {
            console.log(JSON.stringify(data))
            const formData = new FormData()
            formData.append("formData", JSON.stringify(data))
            files.forEach((file) => formData.append("files", file))

            const res = await createCatalogue({ formData })
            console.log(res)
            if (res?.data?.success) {
                setUserName(res?.data?.data?.userName)
                setCurrentStep((prev) => prev + 1)
            }
        } catch (error) {
            toast.error("Error submitting form")
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
                <div onClick={() => setValue("isActive", !getValues("isActive"))} className="relative flex w-full items-start gap-2 rounded-lg border border-red-500 p-3 shadow-sm shadow-black/5 has-[[data-state=checked]]:border-green-600 ">
                    <Switch
                        className="order-1 h-4 w-6 after:absolute after:inset-0 [&_span]:size-3 [&_span]:data-[state=checked]:translate-x-2 rtl:[&_span]:data-[state=checked]:-translate-x-2"
                    />
                    <div className="flex grow items-center gap-2">
                        <IconRosetteDiscountCheckFilled className='w-8 h-8 text-green-500' />
                        <div className="grid grow gap-1">
                            <Label className='text-white'>

                                Active

                            </Label>
                            <p className="text-xs text-zinc-500 dark:text-zinc-400">
                                {watch("isActive") ? "Link is active!" : "Click to activate link!"}
                            </p>
                        </div>
                    </div>
                </div>
                <div className="space-y-1">
                    <Label htmlFor={"paidDate"} className="text-neutral-300 ">
                        Paid Date <span className="text-main">*</span>
                    </Label>
                    <Popover open={open} onOpenChange={setOpen}>
                        <PopoverTrigger asChild>
                            <Button
                                variant="outline"
                                className={cn(
                                    "w-full justify-start text-left bg-transparent border-[#333333] text-white font-normal",
                                    !watch("paidDate") && "text-white"
                                )}
                                onClick={() => setOpen(!open)}
                            >
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {watch("paidDate") ? format(watch("paidDate"), "PPP") : "Pick a date"}
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent align='start' className="w-auto p-0">
                            <Calendar
                                mode="single"
                                onSelect={(date) => {
                                    if (date) {
                                        setValue("paidDate", date.toDateString());
                                    }
                                    setOpen(false)
                                }}
                                initialFocus
                            />
                        </PopoverContent>
                    </Popover>
                    {errors.paidDate && <p className="text-main tracking-wide text-sm font-semibold">{errors.paidDate.message}</p>}

                </div>
                <div className="flex bg-[#171717] border-neutral-800 flex-col items-center space-y-2 p-4 py-1 border rounded-lg shadow-lg">
                    <p className='text-white'>Background Color</p>
                    <HexColorPicker color={watch("backgroundColor")} onChange={(color) => setValue("backgroundColor", color.toUpperCase())} />
                    <div style={{ backgroundColor: watch("backgroundColor") }} className='flex border border-[#5a5a5a] items-center gap-2  p-0.5 w-full rounded-sm pl-10'>
                        <Input
                            type="text"
                            value={watch("backgroundColor")}
                            onChange={(e) => setValue("backgroundColor", e.target.value)}
                            className="text-white rounded-l-none"
                            maxLength={7}
                        />
                    </div>
                </div>
                <div className="flex bg-[#171717] border-neutral-800 flex-col items-center space-y-2 p-4 py-1 border rounded-lg shadow-lg">
                    <p className='text-white text-sm'>Text Color</p>

                    <HexColorPicker color={watch("textColor")} onChange={(color) => setValue("textColor", color.toUpperCase())} />
                    <div style={{ backgroundColor: watch("textColor") }} className='flex border border-[#5a5a5a] items-center gap-2  p-0.5 w-full rounded-sm pl-10'>
                        <Input
                            type="text"
                            value={watch("textColor")}
                            onChange={(e) => setValue("textColor", e.target.value)}
                            className="text-white rounded-l-none"
                            maxLength={7}
                        />
                    </div>

                </div>
                <div className="space-y-1">
                    <Label htmlFor={"fullName"} className="text-neutral-300 ">
                        Name <span className="text-main">*</span>
                    </Label>
                    <Input {...register("name")} placeholder="Enter full name..." type="text" className={`${errors.name && "border-[#E11D48] "} py-[0.45rem]  text-neutral-200`} />
                    {errors.name && <p className="text-main tracking-wide text-sm font-semibold">{errors.name.message}</p>}
                </div>
                <div className="space-y-1">
                    <Label htmlFor={"userName"} className="text-neutral-300 ">
                        Username <span className="text-main">*</span>
                    </Label>
                    <Input {...register("userName")} placeholder="Enter username..." type="text" className={`${errors.userName && "border-[#E11D48] "} py-[0.45rem]  text-neutral-200`} />
                    {errors.userName && <p className="text-main tracking-wide text-sm font-semibold">{errors.userName.message}</p>}
                </div>
            </div>
            <div className="space-y-1">
                <Label htmlFor={"tagline"} className="text-neutral-300 ">
                    Hero Tagline <span className="text-main">*</span>
                </Label>
                <Input {...register("tagline")} placeholder="Enter tagline..." type="text" className={`${errors.tagline && "border-[#E11D48] "} py-[0.45rem]  text-neutral-200`} />
                {errors.tagline && <p className="text-main tracking-wide text-sm font-semibold">{errors.tagline.message}</p>}
            </div>
            <div className="mt-1">
                <Label
                    htmlFor={"about.body"}
                    className="text-neutral-300"
                >
                    Hero Description (150-200 Characters) <span className="text-main">*</span>
                </Label>
                <Textarea {...register("description")} placeholder="Enter meta keyword..." className={`${errors.description && "border-[#E11D48] "} py-[0.45rem]  text-neutral-200 h-[12rem]`} />

                {errors.description && (
                    <p className="text-main tracking-wide text-sm font-semibold">
                        {errors.description.message}
                    </p>
                )}
            </div>



            <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                <div className='flex gap-3 sm:flex-row flex-col my-4 mt-5 items-center justify-center'>
                    <div className='flex items-center gap-3 justify-between'>
                        <div className="size-30 relative group border border-dashed border-[#E11D48] rounded overflow-hidden">
                            <h1 className='text-white relative z-10 uppercase text-[0.8rem] bg-main font-semibold text-center py-0.5'>Hero Image</h1>
                            <input
                                type="file"
                                onChange={(e) => handleFileChange("heroImage", e.target.files?.[0])}
                                name='heroImage'
                                className="absolute z-10 inset-0 w-full h-full opacity-0 cursor-pointer"
                            />
                            {getValues("heroImage.url") ? (
                                <img
                                    src={getValues("heroImage.url")}
                                    alt="Preview"
                                    className="w-full h-full object-contain"
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center bg-neutral-950">
                                    <p className="text-gray-400 text-center">Select Image</p>
                                </div>
                            )}
                            <div className="absolute inset-0  bg-black/80 hidden group-hover:flex items-center justify-center transition-all duration-300">
                                <IconCamera className="text-white text-5xl" />
                            </div>
                            <label htmlFor="image" className="cursor-pointer absolute inset-0"></label>
                        </div>
                        <div className="size-30 relative group border border-dashed border-[#E11D48] rounded overflow-hidden">
                            <h1 className='text-white relative z-10 uppercase text-[0.8rem] bg-main font-semibold text-center py-0.5'>Logo</h1>
                            <input
                                type="file"
                                onChange={(e) => handleFileChange("logo", e.target.files?.[0])}
                                name='logo'
                                className="absolute z-10 inset-0 w-full h-full opacity-0 cursor-pointer"
                            />
                            {getValues("logo.url") ? (
                                <img
                                    src={getValues("logo.url")}
                                    alt="Preview"
                                    className="w-full h-full object-contain"
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center bg-neutral-950">
                                    <p className="text-gray-400 text-center">Select Logo</p>
                                </div>
                            )}
                            <div className="absolute inset-0  bg-black/80 hidden group-hover:flex items-center justify-center transition-all duration-300">
                                <IconCamera className="text-white text-5xl" />
                            </div>
                            <label htmlFor="image" className="cursor-pointer absolute inset-0"></label>
                        </div>
                    </div>

                </div>
                <div className="border py-2">
                    <Label htmlFor="category" className='text-neutral-300'>Enter Category</Label>
                    <TagInput
                        id='category'
                        tags={categoryTags}
                        setTags={(newTags) => {
                            setCategoryTags(newTags);
                        }}
                        placeholder="Add category"

                        styleClasses={{
                            tagList: {
                                container: "gap-1",
                            },
                            input:
                                "rounded-sm transition-[color,box-shadow]  bg-[#171717] outline-none border border-neutral-800 text-white placeholder:text-zinc-400/70 h-8.5 ",
                            tag: {
                                body: "relative h-7 text-white  rounded-sm font-medium text-xs ps-2 pe-7 bg-[#171717] border-zinc-800",
                                closeButton:
                                    "absolute -inset-y-px -end-px p-0 rounded-s-none rounded-e-md flex size-7 transition-[color,box-shadow] outline-none  focus-visible:ring-[3px]  focus-visible:border-zinc-300 focus-visible:ring-zinc-300/50 text-zinc-400/80 hover:text-zinc-50",
                            },
                        }}
                        activeTagIndex={activeTagIndex}
                        setActiveTagIndex={setActiveTagIndex}
                        inlineTags={false}
                        inputFieldPosition="bottom"
                    />
                    {errors.category && <p className="text-red-500">{errors.category.message}</p>}
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
                    className="bg-main cursor-pointer text-white flex items-center gap-3 py-1.5 text-sm px-4 rounded"
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

export default AddCatalogueDetail
