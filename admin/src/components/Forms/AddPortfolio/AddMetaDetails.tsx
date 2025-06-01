import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { addMetaDetailsSchema } from '@/validations/PortfolioValidation'
import { IconCamera, IconSquareRoundedArrowLeftFilled, IconSquareRoundedArrowRightFilled, IconWhirl } from '@tabler/icons-react'
import { useState } from 'react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Textarea } from '@/components/ui/textarea'
import { useAddMetaDetailsMutation } from '@/Redux/API/PortfolioApi'

type metaDetails = z.infer<typeof addMetaDetailsSchema>

interface apiRes {
    success: boolean
    message: string,
    data: { _id: string, metaDetail: metaDetails }
}


const AddMetaDetails = ({ currentStep, stepsLength, portfolioId }: { currentStep: number, stepsLength: number, portfolioId: string }) => {

    const [addMetaDetails] = useAddMetaDetailsMutation()

    const { register, handleSubmit, setValue, getValues, formState: { errors, isSubmitting } } = useForm<metaDetails>({
        resolver: zodResolver(addMetaDetailsSchema)
    })


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

        const res = await addMetaDetails({ formData, id: portfolioId }).unwrap() as { data: apiRes }

        if (res?.data?.success) {
            console.log("success")
        }
        console.log(res)
    }


    return (
        <form className='' onSubmit={handleSubmit(onSubmit)} noValidate >
            <div className='grid grid-cols-1  gap-x-6 gap-y-2'>

                <div className="space-y-1">
                    <Label htmlFor={"title"} className="text-neutral-300 ">
                        Title <span className="text-main">*</span>
                    </Label>
                    <Input {...register("title")} placeholder="Enter full name..." type="text" className={`${errors.title && "border-[#E11D48] "} py-[0.45rem]  text-neutral-200`} />
                    {errors.title && <p className="text-main tracking-wide text-sm font-semibold">{errors.title.message}</p>}
                </div>
                <div className="space-y-1">
                    <Label htmlFor={"description"} className="text-neutral-300 ">
                        Description <span className="text-main">*</span>
                    </Label>
                    <Textarea {...register("description")} placeholder="Enter description..." className={`${errors.description && "border-[#E11D48] "} py-[0.45rem]  text-neutral-200`} />
                    {errors.description && <p className="text-main tracking-wide text-sm font-semibold">{errors.description.message}</p>}
                </div>

                <div className="space-y-1">
                    <Label htmlFor={"keywords"} className="text-neutral-300 ">
                        Keyword <span className="text-main">*</span>
                    </Label>
                    <Textarea {...register("keywords")} placeholder="Enter meta keyword..." className={`${errors.keywords && "border-[#E11D48] "} py-[0.45rem]  text-neutral-200`} />
                    {errors.keywords && <p className="text-main tracking-wide text-sm font-semibold">{errors.keywords.message}</p>}
                </div>


                <div>
                    <Label htmlFor={"canonical"} className="text-neutral-300 ">
                        Tagline/title <span className="text-main">*</span>
                    </Label>
                    <Input {...register("canonical")} placeholder="Enter canonical..." type="text" className={`${errors.canonical && "border-[#E11D48] "} py-[0.45rem] text-neutral-200`} />
                    {errors.canonical && <p className="text-main tracking-wide text-sm font-semibold">{errors.canonical.message}</p>}
                </div>

            </div>

            <div className='flex gap-3 sm:flex-row flex-col my-4 mt-5 items-center justify-center'>
                <div className="size-30 relative group border border-dashed border-[#E11D48] rounded overflow-hidden">
                    <h1 className='text-white relative z-10 uppercase text-[0.8rem] bg-main font-semibold text-center py-0.5'>Image</h1>
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

            <div className="flex mt-6 justify-between space-x-4">
                <button
                    className={`bg-[#1c1c1c] border border-[#565656]   text-white flex items-center gap-3 py-1.5 text-sm px-4 rounded ${currentStep === 1 ? "blur-[1px] cursor-not-allowed" : "cursor-pointer"}`}
                    disabled={true}
                >

                    <IconSquareRoundedArrowLeftFilled />
                    Prev
                </button>
                <button
                    type='submit'
                    className="bg-main cursor-pointer text-white flex items-center gap-3 py-1.5 text-sm px-4 rounded"
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

export default AddMetaDetails
