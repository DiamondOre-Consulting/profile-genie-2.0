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
import { HomeLayout } from '@/Layout/HomeLayout'

type metaDetails = z.infer<typeof addMetaDetailsSchema>

interface apiRes {
    success: boolean
    message: string,
    data: { _id: string, metaDetail: metaDetails }
}


const EditMetaDetails = ({ setCurrentStep, currentStep, stepsLength, catalogueId, metaDetails }: { setCurrentStep: React.Dispatch<React.SetStateAction<number>>, currentStep: number, stepsLength: number, portfolioId: string, metaDetails: metaDetails, catalogueId: string }) => {


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
        <HomeLayout>
            <h1 className='text-2xl font-semibold mb-3 text-center text-neutral-700'>Meta Details (SEO)</h1>

            <form className='mb-8 mt-4 max-w-[60rem] mx-auto' onSubmit={handleSubmit(onSubmit)} noValidate >
                <div className='grid grid-cols-1  gap-x-6 gap-y-2'>

                    <div className="space-y-1">
                        <Label htmlFor={"title"} className="font-semibold ">
                            Title <span className="text-[#ff3f69]">*</span>
                        </Label>
                        <Input {...register("title")} placeholder="Enter full name..." type="text" className={`${errors.title && "border-[#E11D48] "} py-[0.45rem]  `} />
                        {errors.title && <p className="text-[#ff3f69] tracking-wide text-sm font-semibold">{errors.title.message}</p>}
                    </div>
                    <div className="space-y-1">
                        <Label htmlFor={"description"} className="font-semibold ">
                            Description <span className="text-[#ff3f69]">*</span>
                        </Label>
                        <Textarea {...register("description")} placeholder="Enter description..." className={`${errors.description && "border-[#E11D48] "} bg-[#F9FAFB] border-gray-300 py-[0.45rem]  `} />
                        {errors.description && <p className="text-[#ff3f69] tracking-wide text-sm font-semibold">{errors.description.message}</p>}
                    </div>

                    <div className="space-y-1">
                        <Label htmlFor={"keywords"} className="font-semibold ">
                            Keyword <span className="text-[#ff3f69]">*</span>
                        </Label>
                        <Textarea {...register("keywords")} placeholder="Enter meta keyword..." className={`${errors.keywords && "border-[#E11D48] "} py-[0.45rem] bg-[#F9FAFB] border-gray-300 h-[5rem]`} />
                        {errors.keywords && <p className="text-[#ff3f69] tracking-wide text-sm font-semibold">{errors.keywords.message}</p>}
                    </div>


                    <div>
                        <Label htmlFor={"canonical"} className="font-semibold ">
                            Tagline/title <span className="text-[#ff3f69]">*</span>
                        </Label>
                        <Input {...register("canonical")} placeholder="Enter canonical..." type="text" className={`${errors.canonical && "border-[#E11D48] "} py-[0.45rem] `} />
                        {errors.canonical && <p className="text-[#ff3f69] tracking-wide text-sm font-semibold">{errors.canonical.message}</p>}
                    </div>

                </div>

                <div className='flex gap-3 sm:flex-row flex-col my-4 mt-5 items-center justify-center'>
                    <div className="size-30 relative group border border-dashed border-[#E11D48] rounded overflow-hidden">
                        <h1 className='text-white relative z-10 uppercase text-[0.8rem] bg-[#E11D48] font-semibold text-center py-0.5'>Image</h1>
                        <input
                            type="file"
                            onChange={(e) => handleFileChange("favIcon", e.target.files?.[0])}
                            name='favIcon'
                            className="absolute z-10 inset-0 w-full h-full opacity-0 cursor-pointer"
                        />
                        {getValues("favIcon.url") ? (
                            <img
                                src={getValues("favIcon.url")}
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
                        <label htmlFor="favIcon" className="cursor-pointer absolute inset-0"></label>
                    </div>

                </div>

                <button
                    type='submit'
                    className="bg-[#E11D48] w-full justify-center cursor-pointer text-white flex items-center gap-3 py-1.5 text-sm px-4 rounded"
                    disabled={isSubmitting || currentStep > stepsLength}
                >
                    Add Portfolio   {
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

export default EditMetaDetails
