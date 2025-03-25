import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { IconCamera, IconRosetteDiscountCheckFilled, IconSquareRoundedArrowRightFilled, IconWhirl } from '@tabler/icons-react'
import { useEffect, useState } from 'react'
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
import { useEditCatalogueMutation } from '@/Redux/API/CatalogueApi'
import { Tag, TagInput } from 'emblor'
import { HomeLayout } from '@/Layout/HomeLayout'

const EditCatalogueDetail = ({ catalogueDetail }: { catalogueDetail: catalogueDetail }) => {

    const [editCatalogue] = useEditCatalogueMutation()

    const { register, handleSubmit, setValue, reset, watch, getValues, formState: { errors, isSubmitting } } = useForm<catalogueDetail>({
        resolver: zodResolver(addCatalogueSchema)
    })

    console.log(catalogueDetail)

    console.log(errors)
    console.log(catalogueDetail)
    useEffect(() => {
        reset(catalogueDetail)
        if (catalogueDetail?.catalogueOwner?._id) {
            setValue("catalogueOwner", catalogueDetail?.catalogueOwner?._id as catalogueDetail["catalogueOwner"])
        }
    }, [reset, catalogueDetail])

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

    const onSubmit = async (data: catalogueDetail) => {
        try {
            console.log('object')
            console.log(JSON.stringify(data))
            const formData = new FormData()
            formData.append("formData", JSON.stringify(data))
            files.forEach((file) => formData.append("files", file))

            await editCatalogue({ formData, id: catalogueDetail?._id })
            console.log("hello")
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
        if (watch("category")) {
            const categoryTags = watch("category").map((category) => ({
                id: category.id ?? "",
                text: category.text ?? "",
            }));
            setCategoryTags(categoryTags);
        }

        if (catalogueDetail?.paidDate) {
            // setValue("paidDate", catalogueDetail?.paidDate);
        }

    }, [catalogueDetail]);

    console.log(errors)

    useEffect(() => {
        setValue("category", categoryTags)
    }, [categoryTags]);

    return (
        <HomeLayout>
            <div className='flex  items-center gap-3 mb-3'>
                <img className='h-12' src={catalogueDetail?.logo?.url} alt="Catalogue logo" />
                <h1 className='text-2xl font-semibold  text-center text-neutral-700'>{catalogueDetail?.name}</h1>
            </div>
            <form className='flex  rounded-md mx-auto my-6  flex-col gap-4 p-4 max-w-[70rem] w-full' onSubmit={handleSubmit(onSubmit)} noValidate>
                <div className='grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2'>
                    <div className="relative flex w-full items-start gap-2 rounded-lg border-2 border-red-500 p-3 shadow-sm shadow-black/5 has-[[data-state=checked]]:border-green-600 ">
                        <Switch
                            defaultChecked={!!getValues("isActive")}
                            checked={!!getValues("isActive")}

                            className="order-1 h-4 w-6 after:absolute after:inset-0 [&_span]:size-3 [&_span]:data-[state=checked]:translate-x-2 rtl:[&_span]:data-[state=checked]:-translate-x-2"
                        />
                        <div className="flex grow items-center gap-2">
                            <IconRosetteDiscountCheckFilled className='w-8 h-8 text-green-500' />
                            <div className="grid grow gap-1">
                                <Label className='text-black font-semibold' htmlFor="isActive">
                                    Active
                                </Label>
                                <p className="text-xs text-zinc-600  font-semibold">
                                    {watch("isActive") ? "Link is active!" : "Click to activate link!"}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="space-y-1">
                        <Label htmlFor={"paidDate"} className="text-neutral-700 font-semibold ">
                            Paid Date <span className="text-[#ff3f69]">*</span>
                        </Label>
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button
                                    variant="outline"
                                    className={cn(
                                        "w-full justify-start text-left bg-transparent border-gray-300 text-neutral-900 font-normal",
                                        !watch("paidDate") && "text-neutral-900"
                                    )}
                                >
                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                    {watch("paidDate") ? format(watch("paidDate"), "PPP") : "Pick a date"}
                                </Button>
                            </PopoverTrigger>

                        </Popover>
                        {errors.paidDate && <p className="text-[#ff3f69] tracking-wide text-sm font-semibold">{errors.paidDate.message}</p>}

                    </div>
                    <div className="flex bg-gray-50 border-neutral-300 flex-col items-center space-y-2 p-4 py-1 border rounded-lg shadow-lg">
                        <p className='text-neutral-700 text-sm font-semibold'>Background Color</p>
                        <HexColorPicker color={watch("backgroundColor")} onChange={(color) => setValue("backgroundColor", color.toUpperCase())} />
                        <div style={{ backgroundColor: watch("backgroundColor") }} className='flex border border-[#5a5a5a] items-center gap-2  p-0.5 w-full rounded-sm pl-10'>
                            <Input
                                type="text"
                                value={watch("backgroundColor")}
                                onChange={(e) => setValue("backgroundColor", e.target.value)}
                                className="text-neutral-900 rounded-l-none"
                                maxLength={7}
                            />
                        </div>
                    </div>
                    <div className="flex bg-gray-50 border-neutral-300 flex-col items-center space-y-2 p-4 py-1 border rounded-lg shadow-lg">
                        <p className='text-neutral-700 text-sm font-semibold'>Text Color</p>

                        <HexColorPicker color={watch("textColor")} onChange={(color) => setValue("textColor", color.toUpperCase())} />
                        <div style={{ backgroundColor: watch("textColor") }} className='flex border border-[#5a5a5a] items-center gap-2  p-0.5 w-full rounded-sm pl-10'>
                            <Input
                                type="text"
                                value={watch("textColor")}
                                onChange={(e) => setValue("textColor", e.target.value)}
                                className="text-neutral-900 rounded-l-none"
                                maxLength={7}
                            />
                        </div>

                    </div>
                    <div className="space-y-1">
                        <Label htmlFor={"fullName"} className="text-neutral-700 font-semibold ">
                            Name <span className="text-[#ff3f69]">*</span>
                        </Label>
                        <Input {...register("name")} placeholder="Enter full name..." type="text" className={`${errors.name && "border-[#E11D48] "} py-[0.45rem]  `} />
                        {errors.name && <p className="text-[#ff3f69] tracking-wide text-sm font-semibold">{errors.name.message}</p>}
                    </div>
                    <div className="space-y-1">
                        <Label htmlFor={"userName"} className="text-neutral-700 font-semibold ">
                            Username <span className="text-[#ff3f69]">*</span>
                        </Label>
                        <Input {...register("userName")} placeholder="Enter username..." type="text" className={`${errors.userName && "border-[#E11D48] "} py-[0.45rem]  `} />
                        {errors.userName && <p className="text-[#ff3f69] tracking-wide text-sm font-semibold">{errors.userName.message}</p>}
                    </div>
                </div>
                <div className="space-y-1">
                    <Label htmlFor={"tagline"} className="text-neutral-700 font-semibold ">
                        Hero Tagline <span className="text-[#ff3f69]">*</span>
                    </Label>
                    <Input {...register("tagline")} placeholder="Enter tagline..." type="text" className={`${errors.tagline && "border-[#E11D48] "} py-[0.45rem]  `} />
                    {errors.tagline && <p className="text-[#ff3f69] tracking-wide text-sm font-semibold">{errors.tagline.message}</p>}
                </div>
                <div className="mt-1">
                    <Label
                        htmlFor={"about.body"}
                        className="text-neutral-700 font-semibold"
                    >
                        Hero Description (150-200 Characters) <span className="text-[#ff3f69]">*</span>
                    </Label>
                    <Textarea {...register("description")} placeholder="Enter meta keyword..." className={`${errors.description && "border-[#E11D48] "} py-[0.45rem]  bg-gray-50 border-gray-300 h-[12rem]`} />

                    {errors.description && (
                        <p className="text-[#ff3f69] tracking-wide text-sm font-semibold">
                            {errors.description.message}
                        </p>
                    )}
                </div>



                <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                    <div className='flex gap-3 sm:flex-row flex-col my-4 mt-5 items-center justify-center'>
                        <div className='flex items-center gap-3 justify-between'>
                            <div className="size-30 relative group border border-dashed border-[#E11D48] rounded overflow-hidden">
                                <h1 className='text-neutral-900 relative z-10 uppercase text-[0.8rem] bg-[#E11D48] font-semibold text-center py-0.5'>Hero Image</h1>
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
                                    <IconCamera className="text-neutral-900 text-5xl" />
                                </div>
                                <label htmlFor="image" className="cursor-pointer absolute inset-0"></label>
                            </div>
                            <div className="size-30 relative group border border-dashed border-[#E11D48] rounded overflow-hidden">
                                <h1 className='text-neutral-900 relative z-10 uppercase text-[0.8rem] bg-[#E11D48] font-semibold text-center py-0.5'>Logo</h1>
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
                                    <IconCamera className="text-neutral-900 text-5xl" />
                                </div>
                                <label htmlFor="image" className="cursor-pointer absolute inset-0"></label>
                            </div>
                        </div>

                    </div>
                    <div className=" py-2">
                        <Label htmlFor="category" className='text-neutral-700 font-semibold'>Enter Category</Label>
                        <TagInput
                            id='category'
                            tags={categoryTags}
                            setTags={(newTags) => {
                                setCategoryTags(newTags as Tag[]);
                            }}
                            placeholder="Add category"

                            styleClasses={{
                                tagList: {
                                    container: "gap-1",
                                },
                                input:
                                    "rounded-sm transition-[color,box-shadow]  bg-gray-100  outline-none border border-gray-300 text-neutral-900 placeholder:text-zinc-500/80 h-8.5 ",
                                tag: {
                                    body: "relative h-7 text-neutral-900  rounded-sm font-medium text-xs ps-2 pe-7 bg-gray-100 border-gray-300",
                                    closeButton:
                                        "absolute -inset-y-px -end-px p-0 rounded-s-none rounded-e-md flex size-7 transition-[color,box-shadow] outline-none  focus-visible:ring-[3px]  focus-visible:border-zinc-300 focus-visible:ring-zinc-300/50 text-red-500 hover:text-red-400",
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

                <button
                    type='submit'
                    className="bg-[#E11D48] w-full justify-center cursor-pointer text-neutral-100 flex items-center gap-3 py-1.5 text-sm px-4 rounded"
                    disabled={isSubmitting}
                >
                    Update   {
                        isSubmitting ? (
                            <IconWhirl className="animate-spin" />
                        ) :
                            <IconSquareRoundedArrowRightFilled />
                    }
                </button>
            </form>
        </HomeLayout>
    )
}

export default EditCatalogueDetail
