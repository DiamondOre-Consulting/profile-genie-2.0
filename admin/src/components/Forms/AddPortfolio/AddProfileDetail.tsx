import TextEditor from '../../TextEditor'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { addProfileDetailSchema, profileDetail } from '@/validations/PortfolioValidation'
import { IconCamera, IconRosetteDiscountCheckFilled, IconSquareRoundedArrowLeftFilled, IconSquareRoundedArrowRightFilled, IconWhirl } from '@tabler/icons-react'
import React, { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Switch } from '@/components/ui/switch'
import { useAddPortfolioMutation } from '@/Redux/API/PortfolioApi'
import { toast } from 'sonner'
import { Textarea } from '@/components/ui/textarea'
import PhoneInput from 'react-phone-input-2'
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

interface apiRes {
    success: boolean
    message: string,
    data: { _id: string, profileDetail: profileDetail }
}

const AddProfileDetail = ({ setCurrentStep, template, currentStep, stepsLength, setId }: { setCurrentStep: React.Dispatch<React.SetStateAction<number>>, template: string, currentStep: number, stepsLength: number, setId: React.Dispatch<React.SetStateAction<string>> }) => {

    const [addPortfolio] = useAddPortfolioMutation()

    const { register, handleSubmit, control, setValue, trigger, watch, getValues, formState: { errors, isSubmitting } } = useForm<profileDetail>({
        resolver: zodResolver(addProfileDetailSchema)
    })

    const [files, setFiles] = useState<File[]>([]);

    const handleFileChange = (fieldName: keyof profileDetail, file?: File) => {
        if (file) {
            const extension = file.name.split(".").pop();
            const updatedFile = new File([file], `${fieldName}.${extension}`, { type: file.type });

            setFiles((prev) => [...prev.filter((f) => f.name !== updatedFile.name), updatedFile]);

            const previewUrl = URL.createObjectURL(updatedFile);
            if (fieldName === "image" || fieldName === "backgroundImage" || fieldName === "logo") {
                setValue(`${fieldName}.url`, previewUrl);
            }
        }
    };

    const onSubmit = async (data: profileDetail) => {
        try {
            console.log(JSON.stringify(data))
            const formData = new FormData()
            formData.append("formData", JSON.stringify(data))
            files.forEach((file) => formData.append("files", file))
            formData.append("template", template)

            const res = await addPortfolio({ formData }) as { data: apiRes }
            console.log(res)
            if (res?.data?.success) {
                setId(res?.data?.data?._id)
                setCurrentStep((prev) => prev + 1)
            }
        } catch (error) {
            toast.error("Error submitting form")
        }
    }

    const [open, setOpen] = useState(false)

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
                        Paid Date <span className="text-[#ff3f69]">*</span>
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
                    {errors.paidDate && <p className="text-[#ff3f69] tracking-wide text-sm font-semibold">{errors.paidDate.message}</p>}

                </div>
                <div className="space-y-1">
                    <Label htmlFor={"fullName"} className="text-neutral-300 ">
                        Your Name <span className="text-[#ff3f69]">*</span>
                    </Label>
                    <Input {...register("fullName")} placeholder="Enter full name..." type="text" className={`${errors.fullName && "border-[#E11D48] "} py-[0.45rem]  text-neutral-200`} />
                    {errors.fullName && <p className="text-[#ff3f69] tracking-wide text-sm font-semibold">{errors.fullName.message}</p>}
                </div>
                <div className="space-y-1">
                    <Label htmlFor={"userName"} className="text-neutral-300 ">
                        Username <span className="text-[#ff3f69]">*</span>
                    </Label>
                    <Input {...register("userName")} placeholder="Enter username..." type="text" className={`${errors.userName && "border-[#E11D48] "} py-[0.45rem]  text-neutral-200`} />
                    {errors.userName && <p className="text-[#ff3f69] tracking-wide text-sm font-semibold">{errors.userName.message}</p>}
                </div>

                <div className="space-y-1">
                    <Label htmlFor={"phoneNumber"} className="text-neutral-300 ">
                        Phone Number <span className="text-[#ff3f69]">*</span>
                    </Label>
                    <Controller
                        name="phoneNumber"
                        control={control}
                        rules={{ required: "Phone number is required" }}
                        render={({ field }) => (
                            <PhoneInput
                                {...field}
                                country="in"
                                placeholder="Enter phone number"
                                containerStyle={{
                                    backgroundColor: "#171717",
                                    color: "#ffffff"
                                }}
                                buttonStyle={{
                                    backgroundColor: "#2D2D2D",
                                    color: "#000000",
                                    border: "none",
                                }}
                                inputStyle={{
                                    width: "100%",
                                    border: "1px solid #01010100",
                                    fontSize: "12px",
                                    paddingTop: "8px",
                                    paddingBottom: "8px",
                                    height: "34px",
                                    borderRadius: "4px",
                                    backgroundColor: "#171717",
                                    color: "#ffffff"
                                }}
                                value={field?.value?.toString() || ""}
                                onChange={(phone) => field.onChange(Number(phone))}
                            />
                        )}
                    />

                    {errors.phoneNumber && <p className="text-[#ff3f69] tracking-wide text-sm font-semibold">{errors.phoneNumber.message}</p>}
                </div>

                <div className="space-y-1">
                    <Label htmlFor={"email"} className="text-neutral-300 ">
                        Your Email <span className="text-[#ff3f69]">*</span>
                    </Label>
                    <Input {...register("email")} placeholder="Enter email..." type="email" className={`${errors.email && "border-[#E11D48] "} py-[0.45rem]  text-neutral-200`} />
                    {errors.email && <p className="text-[#ff3f69] tracking-wide text-sm font-semibold">{errors.email.message}</p>}
                </div>
                <div>
                    <Label htmlFor={"tagline"} className="text-neutral-300 ">
                        Tagline/title <span className="text-[#ff3f69]">*</span>
                    </Label>
                    <Input {...register("tagline")} placeholder="Enter tagline..." type="text" className={`${errors.tagline && "border-[#E11D48] "} py-[0.45rem] text-neutral-200`} />
                    {errors.tagline && <p className="text-[#ff3f69] tracking-wide text-sm font-semibold">{errors.tagline.message}</p>}
                </div>
                <div>
                    <Label htmlFor={"about.head"} className="text-neutral-300 ">
                        About Heading <span className="text-[#ff3f69]">*</span>
                    </Label>
                    <Input {...register("about.head")} placeholder="Enter heading..." type="text" className={`${errors.about?.head && "border-[#E11D48] "} py-[0.45rem] text-neutral-200`} />
                    {errors.about?.head && <p className="text-[#ff3f69] tracking-wide text-sm font-semibold">{errors.about?.head.message}</p>}
                </div>
            </div>

            <div className='mt-3'>
                <div className="mt-3">
                    <Label
                        htmlFor={"about.body"}
                        className="text-neutral-300 "
                    >
                        Short Description (150-200 Characters) <span className="text-[#ff3f69]">*</span>
                    </Label>
                    <Textarea {...register("shortDescription")} placeholder="Enter meta keyword..." className={`${errors.shortDescription && "border-[#E11D48] "} py-[0.45rem]  text-neutral-200`} />

                    {errors.shortDescription && (
                        <p className="text-[#ff3f69] tracking-wide text-sm font-semibold">
                            {errors.shortDescription.message}
                        </p>
                    )}
                </div>
                <div className="mt-3">
                    <Label
                        htmlFor={"about.body"}
                        className="text-neutral-300 "
                    >
                        About Body <span className="text-[#ff3f69]">*</span>
                    </Label>
                    <div
                        className={`${errors.about?.body ? "border-[#E11D48] border" : ""
                            } rounded`}
                    >
                        <TextEditor
                            value={getValues("about.body")}
                            handleBlur={(value) => {
                                setValue("about.body", value, { shouldValidate: true });
                                trigger("about.body");
                            }}
                        />
                    </div>
                    {errors.about?.body && (
                        <p className="text-[#ff3f69] tracking-wide text-sm font-semibold">
                            {errors.about?.body.message}
                        </p>
                    )}
                </div>

            </div>
            <div className='flex gap-3 sm:flex-row flex-col my-4 mt-5 items-center justify-center'>
                <div className='flex items-center gap-3 justify-between'>
                    <div className="size-30 relative group border border-dashed border-[#E11D48] rounded overflow-hidden">
                        <h1 className='text-white relative z-10 uppercase text-[0.8rem] bg-[#E11D48] font-semibold text-center py-0.5'>Image</h1>
                        <input
                            type="file"
                            onChange={(e) => handleFileChange("image", e.target.files?.[0])}
                            name='image'
                            className="absolute z-10 inset-0 w-full h-full opacity-0 cursor-pointer"
                        />
                        {getValues("image.url") ? (
                            <img
                                src={getValues("image.url")}
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
                        <h1 className='text-white relative z-10 uppercase text-[0.8rem] bg-[#E11D48] font-semibold text-center py-0.5'>Logo</h1>
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
                <div className="h-30  w-64 relative group border border-dashed border-[#E11D48] rounded overflow-hidden">
                    <h1 className='text-white relative z-10 uppercase text-[0.8rem] bg-[#E11D48] font-semibold text-center py-0.5'>Background</h1>
                    <input
                        type="file"
                        onChange={(e) => handleFileChange("backgroundImage", e.target.files?.[0])}
                        name='backgroundImage'
                        className="absolute z-10 inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                    {getValues("backgroundImage.url") ? (
                        <img
                            src={getValues("backgroundImage.url")}
                            alt="Preview"
                            className="w-full h-full object-contain"
                        />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center bg-neutral-950">
                            <p className="text-gray-400 text-center">Select Background</p>
                        </div>
                    )}
                    <div className="absolute inset-0  bg-black/80 hidden group-hover:flex items-center justify-center transition-all duration-300">
                        <IconCamera className="text-white text-5xl" />
                    </div>
                    <label htmlFor="image" className="cursor-pointer absolute inset-0"></label>
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
        </form>
    )
}

export default AddProfileDetail
