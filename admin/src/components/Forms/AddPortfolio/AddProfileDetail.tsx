import TextEditor from '../../TextEditor'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { addProfileDetailSchema } from '@/validations/PortfolioValidation'
import { IconCamera, IconSquareRoundedArrowLeftFilled, IconSquareRoundedArrowRightFilled, IconWhirl } from '@tabler/icons-react'
import React, { useEffect, useState } from 'react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

type profileDetail = z.infer<typeof addProfileDetailSchema>

const AddProfileDetail = ({ setCurrentStep, currentStep, stepsLength }: { setCurrentStep: React.Dispatch<React.SetStateAction<number>>, currentStep: number, stepsLength: number }) => {



    const { register, handleSubmit, setValue, trigger, getValues, formState: { errors } } = useForm<profileDetail>({
        resolver: zodResolver(addProfileDetailSchema)
    })
    console.log(errors)

    console.log(getValues("about"))

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


    const onSubmit = (data: profileDetail) => {
        console.log("object")
        console.log(JSON.stringify(data))
        const formData = new FormData()
        formData.append("formData", JSON.stringify(data))

        files.forEach((file) => formData.append("files", file))
    }

    const isLoading = true

    return (
        <form className='' onSubmit={handleSubmit(onSubmit)} noValidate >
            <div className='grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3'>
                <div className="space-y-1">
                    <Label htmlFor={"fullName"} className="text-neutral-400 text-[0.85rem]">
                        Your Name <span className="text-[#ff3f69]">*</span>
                    </Label>
                    <Input {...register("fullName")} placeholder="Enter full name..." type="text" className={`${errors.fullName && "border-[#E11D48] "} py-[0.65rem]  text-neutral-200`} />
                    {errors.fullName && <p className="text-[#ff3f69] tracking-wide text-sm font-semibold">{errors.fullName.message}</p>}
                </div>
                <div className="space-y-1">
                    <Label htmlFor={"userName"} className="text-neutral-400 text-[0.85rem]">
                        Username <span className="text-[#ff3f69]">*</span>
                    </Label>
                    <Input {...register("userName")} placeholder="Enter username..." type="text" className={`${errors.userName && "border-[#E11D48] "} py-[0.65rem]  text-neutral-200`} />
                    {errors.userName && <p className="text-[#ff3f69] tracking-wide text-sm font-semibold">{errors.userName.message}</p>}
                </div>

                <div className="space-y-1">
                    <Label htmlFor={"phoneNumber"} className="text-neutral-400 text-[0.85rem]">
                        Phone Number <span className="text-[#ff3f69]">*</span>
                    </Label>
                    <Input {...register("phoneNumber", { valueAsNumber: true })} placeholder="Enter phone number..." type="number" className={`${errors.phoneNumber && "border-[#E11D48] "} py-[0.65rem]  text-neutral-200`} />
                    {errors.phoneNumber && <p className="text-[#ff3f69] tracking-wide text-sm font-semibold">{errors.phoneNumber.message}</p>}
                </div>

                <div className="space-y-1">
                    <Label htmlFor={"email"} className="text-neutral-400 text-[0.85rem]">
                        Your Email <span className="text-[#ff3f69]">*</span>
                    </Label>
                    <Input {...register("email")} placeholder="Enter email..." type="email" className={`${errors.email && "border-[#E11D48] "} py-[0.65rem]  text-neutral-200`} />
                    {errors.email && <p className="text-[#ff3f69] tracking-wide text-sm font-semibold">{errors.email.message}</p>}
                </div>
            </div>



            <div className='mt-3'>
                <div>
                    <Label htmlFor={"head"} className="text-neutral-400 text-[0.85rem]">
                        About Heading <span className="text-[#ff3f69]">*</span>
                    </Label>
                    <Input {...register("about.head")} placeholder="Enter heading..." type="text" className={`${errors.about?.head && "border-[#E11D48] "} py-[0.65rem] text-neutral-200`} />
                    {errors.about?.head && <p className="text-[#ff3f69] tracking-wide text-sm font-semibold">{errors.about?.head.message}</p>}
                </div>
                <div className="mt-3">
                    <Label
                        htmlFor={"about.body"}
                        className="text-neutral-400 text-[0.85rem]"
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
                            <div className="w-full h-full flex items-center justify-center bg-gray-100">
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
                            <div className="w-full h-full flex items-center justify-center bg-gray-100">
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
                        <div className="w-full h-full flex items-center justify-center bg-gray-100">
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

                // disabled={isLoading || currentStep > stepsLength}
                >
                    Next   {
                        isLoading ? (
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
