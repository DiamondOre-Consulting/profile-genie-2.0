import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { addMetaDetailsSchema } from '@/validations/PortfolioValidation'
import { IconCamera, IconSquareRoundedArrowLeftFilled, IconSquareRoundedArrowRightFilled, IconWhirl } from '@tabler/icons-react'
import React, { useEffect, useState } from 'react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Textarea } from '@/components/ui/textarea'
import { useUpdateMetaDetailsMutation } from '@/Redux/API/CatalogueApi'

type metaDetails = z.infer<typeof addMetaDetailsSchema>

interface apiRes {
    success: boolean
    message: string,
    data: { _id: string, metaDetail: metaDetails }
}


const EditMetaDetails = ({ setCurrentStep, currentStep, stepsLength, catalogueId, metaDetails }: { setCurrentStep: React.Dispatch<React.SetStateAction<number>>, currentStep: number, stepsLength: number, metaDetails: metaDetails, catalogueId: string }) => {


    const [updateMetaDetails] = useUpdateMetaDetailsMutation()

    const { register, handleSubmit, setValue, getValues, reset, formState: { errors, isSubmitting } } = useForm<metaDetails>({
        resolver: zodResolver(addMetaDetailsSchema),
        defaultValues: metaDetails
    })

    useEffect(() => {
        reset(metaDetails)
    }, [reset, metaDetails])


    const [files, setFiles] = useState<File | null>(null);
    console.log(files)
    const handleFileChange = (fieldName: keyof metaDetails, file?: File) => {
        if (file) {
            setFiles(file)
            const previewUrl = URL.createObjectURL(file);
            if (fieldName === "favIcon") {
                setValue(`${fieldName}.url`, previewUrl);
            }
        }
    };

    const onSubmit = async (data: metaDetails) => {
        console.log("object")
        console.log(JSON.stringify(data))
        const formData = new FormData()
        formData.append("formData", JSON.stringify(data))
        formData.append("favIcon", files as File)

        const res = await updateMetaDetails({ formData, id: catalogueId }).unwrap() as { data: apiRes }

        if (res?.data?.success) {
            console.log("success")
        }
        console.log(res)
    }


    return (
        <form className='' onSubmit={handleSubmit(onSubmit)} noValidate >
            <div className='grid grid-cols-1 gap-x-6 gap-y-2'>

                <div className="space-y-1">
                    <Label htmlFor={"title"} className="text-neutral-300 ">
                        Title <span className="text-[#ff3f69]">*</span>
                    </Label>
                    <Input {...register("title")} placeholder="Enter full name..." type="text" className={`${errors.title && "border-[#E11D48] "} py-[0.45rem]  text-neutral-200`} />
                    {errors.title && <p className="text-[#ff3f69] tracking-wide text-sm font-semibold">{errors.title.message}</p>}
                </div>
                <div className="space-y-1">
                    <Label htmlFor={"description"} className="text-neutral-300 ">
                        Description <span className="text-[#ff3f69]">*</span>
                    </Label>
                    <Textarea {...register("description")} placeholder="Enter description..." className={`${errors.description && "border-[#E11D48] "} py-[0.45rem]  text-neutral-200`} />
                    {errors.description && <p className="text-[#ff3f69] tracking-wide text-sm font-semibold">{errors.description.message}</p>}
                </div>

                <div className="space-y-1">
                    <Label htmlFor={"keywords"} className="text-neutral-300 ">
                        Keyword <span className="text-[#ff3f69]">*</span>
                    </Label>
                    <Textarea {...register("keywords")} placeholder="Enter meta keyword..." className={`${errors.keywords && "border-[#E11D48] "} py-[0.45rem]  text-neutral-200`} />
                    {errors.keywords && <p className="text-[#ff3f69] tracking-wide text-sm font-semibold">{errors.keywords.message}</p>}
                </div>


                <div>
                    <Label htmlFor={"canonical"} className="text-neutral-300 ">
                        Tagline/title <span className="text-[#ff3f69]">*</span>
                    </Label>
                    <Input {...register("canonical")} placeholder="Enter canonical..." type="text" className={`${errors.canonical && "border-[#E11D48] "} py-[0.45rem] text-neutral-200`} />
                    {errors.canonical && <p className="text-[#ff3f69] tracking-wide text-sm font-semibold">{errors.canonical.message}</p>}
                </div>

            </div>

            <div className='flex flex-col items-center justify-center gap-3 my-4 mt-5 sm:flex-row'>
                <div className="size-30 relative group border border-dashed border-[#E11D48] rounded overflow-hidden">
                    <h1 className='text-white relative z-10 uppercase text-[0.8rem] bg-[#E11D48] font-semibold text-center py-0.5'>Image</h1>
                    <input
                        type="file"
                        onChange={(e) => handleFileChange("favIcon", e.target.files?.[0])}
                        name='favIcon'
                        className="absolute inset-0 z-10 w-full h-full opacity-0 cursor-pointer"
                    />
                    {getValues("favIcon.url") ? (
                        <img
                            src={getValues("favIcon.url")}
                            alt="Preview"
                            className="object-contain w-full h-full"
                        />
                    ) : (
                        <div className="flex items-center justify-center w-full h-full bg-neutral-950">
                            <p className="text-center text-gray-400">Select Image</p>
                        </div>
                    )}
                    <div className="absolute inset-0 items-center justify-center hidden transition-all duration-300 bg-black/80 group-hover:flex">
                        <IconCamera className="text-5xl text-white" />
                    </div>
                    <label htmlFor="favIcon" className="absolute inset-0 cursor-pointer"></label>
                </div>

            </div>

            <div className="flex justify-between mt-6 space-x-4">
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
                    Add Portfolio   {
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

export default EditMetaDetails
