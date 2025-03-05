import { addContactDetailSchema } from '@/validations/PortfolioValidation'
import { zodResolver } from '@hookform/resolvers/zod'
import React, { useId, useState } from 'react'
import { Controller, useFieldArray, useForm } from 'react-hook-form'
import { z } from 'zod'
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { Command, Eclipse, Zap } from "lucide-react";
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { IconCamera, IconPlus, IconSquareRoundedArrowLeftFilled, IconSquareRoundedArrowRightFilled, IconWhirl, IconX } from '@tabler/icons-react'
import { v4 as uuidv4 } from 'uuid'
import { Textarea } from '@/components/ui/textarea'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { RiStarFill } from '@remixicon/react'
import { useAddContactDetailsMutation } from '@/Redux/API/PortfolioApi'
import PhoneInput from 'react-phone-input-2'

type profileContactDetail = z.infer<typeof addContactDetailSchema>

interface apiRes {
    success: boolean
    message: string,
    data: { _id: string, contactDetail: profileContactDetail }
}


const AddContactDetails = ({ currentStep, stepsLength, setCurrentStep, portfolioId }: { currentStep: number, stepsLength: number, setCurrentStep: React.Dispatch<React.SetStateAction<number>>, portfolioId: string }) => {

    const [addContactDetails] = useAddContactDetailsMutation()

    const { register, handleSubmit, getValues, setValue, control, watch, formState: { errors, isSubmitting } } = useForm<profileContactDetail>({
        resolver: zodResolver(addContactDetailSchema),
        defaultValues: {
            testimonial: { testimonialList: [{ uniqueId: "", name: "", detail: "", star: 0 }] },
            address: [{ title: "", detail: "" }],
            emailList: [{ email: "" }],
            phoneList: [{ phone: undefined }],
            social: { otherSocialList: [{ uniqueId: "", img: { publicId: "", url: "" }, link: "" }] }
        }
    })

    const id = useId();
    const [socialFiles, setSocialFiles] = useState<File[] | null>(null)


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
            if (!getValues(`social.otherSocialList.${ind}.uniqueId`)) {

                const fileName = `${uniqueCode}.${fileExtension}`
                setValue(`social.otherSocialList.${ind}.uniqueId`, uniqueCode)
                setValue(`social.otherSocialList.${ind}.img.url`, URL.createObjectURL(selectedFile))

                setSocialFiles((prevFiles: File[] | null) => {
                    const newFiles = [...(prevFiles) || []]
                    newFiles[ind] = new File([selectedFile], fileName, { type: selectedFile.type })
                    return newFiles
                })
            } else {
                const uniqueId = getValues(`social.otherSocialList.${ind}.uniqueId`);
                const fileName = `${uniqueId}.${fileExtension}`;
                setValue(`social.otherSocialList.${ind}.uniqueId`, uniqueId);
                setValue(`social.otherSocialList.${ind}.img.url`, URL.createObjectURL(selectedFile));

                setSocialFiles((prevFiles: File[] | null) => {
                    const newFiles = [...(prevFiles || [])];
                    newFiles[ind] = new File([selectedFile], fileName, { type: selectedFile.type });
                    return newFiles;
                })
            }
        }
    }

    const { fields: socialFields, append: socialAppend, remove: socialRemove } = useFieldArray({
        control,
        name: 'social.otherSocialList'
    })

    const removeSocial = (ind: number) => {
        setSocialFiles((prevFiles: File[] | null) => {
            const newFiles = [...(prevFiles || [])];
            newFiles.splice(ind, 1);
            return newFiles;
        })

        if (socialFields.length === 1) {
            setValue(`social.otherSocialList.${ind}`, { uniqueId: "", link: "", img: { url: "", publicId: "" } })
        } else {
            socialRemove(ind)
        }
    }

    const { fields: testimonialFields, append: testimonialAppend, remove: testimonialRemove } = useFieldArray({
        control,
        name: 'testimonial.testimonialList'
    })

    const removeTestimonial = (ind: number) => {
        if (testimonialFields.length === 1) {
            setValue(`testimonial.testimonialList.${ind}`, { uniqueId: "", name: "", detail: "", star: 0 })
        } else {
            testimonialRemove(ind)
        }
    }

    const { fields: emailFields, append: emailAppend, remove: emailRemove } = useFieldArray({
        control,
        name: 'emailList'
    })

    const { fields: phoneFields, append: phoneAppend, remove: phoneRemove } = useFieldArray({
        control,
        name: 'phoneList'
    })

    const { fields: addressFields, append: addressAppend, remove: addressRemove } = useFieldArray({
        control,
        name: 'address'
    })

    console.log(1)
    console.log(errors)
    const onSubmit = async (data: profileContactDetail) => {
        console.log(2)

        const formData = new FormData()

        formData.append('data', JSON.stringify(data))

        socialFiles?.forEach((img) => {
            formData.append('otherSocial', img)
        })

        const response = await addContactDetails({ formData, id: portfolioId }) as { data: apiRes }

        if (response?.data?.success) {
            setCurrentStep(currentStep + 1)
        }
    }

    const items = [
        {
            id: "1",
            icon: Command,
            title: "Testimonials",
            content:
                <div>
                    <div>
                        <Label htmlFor={"testimonial.tagline"} className="text-neutral-300 ">
                            Testimonial Tagline <span className="text-[#ff3f69]">*</span>
                        </Label>
                        <Input {...register("testimonial.tagline")} placeholder="Enter tagline..." type="text" className={`${errors.testimonial?.tagline && "border-[#E11D48] "} py-[0.45rem] text-neutral-200`} />
                        {errors.testimonial?.tagline && <p className="text-[#ff3f69] tracking-wide text-sm font-semibold">{errors.testimonial.tagline.message}</p>}
                    </div>
                    <div className='grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2'>
                        {testimonialFields?.map((_, ind) => {
                            return <div className='space-y-2  p-2 my-3 rounded bg-[#ff17a21b] border border-rose-800' key={ind}>
                                <div>
                                    <Label htmlFor={`testimonial.${ind}.name`} className="text-neutral-300 ">
                                        Reviewer name <span className="text-[#ff3f69]">*</span>
                                    </Label>
                                    <Input {...register(`testimonial.testimonialList.${ind}.name`)} placeholder="Enter brand name..." type="text" className={`${errors.testimonial?.testimonialList?.[ind]?.name && "border-[#E11D48] "} py-[0.45rem] text-neutral-200`} />
                                    {errors.testimonial?.testimonialList?.[ind]?.name && <p className="text-[#ff3f69] tracking-wide text-sm font-semibold">{errors.testimonial.testimonialList?.[ind]?.name.message}</p>}
                                </div>

                                <div>
                                    <Label htmlFor={`testimonial.${ind}.detail`} className="text-neutral-300 ">
                                        Review description <span className="text-[#ff3f69]">*</span>
                                    </Label>
                                    <Textarea {...register(`testimonial.testimonialList.${ind}.detail`)} placeholder="Enter review detail..." className={`${errors.testimonial?.testimonialList?.[ind]?.detail && "border-[#E11D48] "} py-[0.45rem] h-[5rem] text-neutral-200`} />
                                    {errors.testimonial?.testimonialList?.[ind]?.detail && <p className="text-[#ff3f69] tracking-wide text-sm font-semibold">{errors.testimonial?.testimonialList?.[ind]?.detail.message}</p>}
                                </div>
                                <div className='flex items-center justify-between'>
                                    <fieldset className="space-y-1">
                                        <legend className="text-foreground text-sm leading-none font-medium">
                                            Rate your experience
                                        </legend>
                                        <RadioGroup className="inline-flex gap-0" >
                                            {[1, 2, 3, 4, 5].map((value) => (
                                                <label
                                                    key={value}
                                                    className="group outline-ring/30 dark:outline-ring/40 relative cursor-pointer rounded-lg p-0.5 has-focus-visible:outline-2"
                                                >
                                                    <RadioGroupItem id={`${id}-${value}`} value={value} onClick={() => setValue(`testimonial.testimonialList.${ind}.star`, value)} className="sr-only" />
                                                    <RiStarFill
                                                        size={24}
                                                        className={`transition-all ${(getValues(`testimonial.testimonialList.${ind}.star`) || getValues(`testimonial.testimonialList.${ind}.star`)) >= value ? "text-amber-500" : "text-input"
                                                            } group-hover:scale-110`}
                                                    />
                                                    <span className="sr-only">
                                                        {value} star{(watch(`testimonial.testimonialList.${ind}.star`)) === 1 ? "" : "s"}
                                                    </span>
                                                </label>
                                            ))}
                                        </RadioGroup>
                                    </fieldset>
                                    {
                                        testimonialFields.length && (
                                            <button type='button' onClick={() => removeTestimonial(ind)} className='flex size-8 gap-2 items-center justify-center bg-[#E11D48] text-white p-1 px-2 rounded'><IconX className='size-4' /> {testimonialFields.length !== 1 ? "" : ""}</button>
                                        )
                                    }
                                </div>
                            </div>
                        })}

                        <button type='button' className='bg-[#E11D48] flex items-center justify-center cursor-pointer gap-2 my-3 p-2 px-4 rounded text-white' onClick={() => testimonialAppend({ uniqueId: "", name: "", detail: "", star: 0 })}>
                            <IconPlus className='size-4.5' /> Add more
                        </button>
                    </div>
                </div>,
        },
        {
            id: "2",
            icon: Eclipse,
            title: "Social links",
            content:
                <div>
                    <div className='grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2'>
                        <div>
                            <Label htmlFor={"social.facebook"} className="text-neutral-300 ">
                                Facebook <span className="text-[#ff3f69]">*</span>
                            </Label>
                            <Input {...register("social.facebook")} placeholder="Enter bulk link tagline..." type="text" className={`${errors.social?.facebook && "border-[#E11D48] "} py-[0.45rem] text-neutral-200`} />
                            {errors.social?.facebook && <p className="text-[#ff3f69] tracking-wide text-sm font-semibold">{errors.social?.facebook.message}</p>}
                        </div>
                        <div>
                            <Label htmlFor={"social.instagram"} className="text-neutral-300 ">
                                Instagram <span className="text-[#ff3f69]">*</span>
                            </Label>
                            <Input {...register("social.instagram")} placeholder="Enter bulk link tagline..." type="text" className={`${errors.social?.instagram && "border-[#E11D48] "} py-[0.45rem] text-neutral-200`} />
                            {errors.social?.instagram && <p className="text-[#ff3f69] tracking-wide text-sm font-semibold">{errors.social?.instagram.message}</p>}
                        </div>
                        <div>
                            <Label htmlFor={"social.linkedin"} className="text-neutral-300 ">
                                Linkedin <span className="text-[#ff3f69]">*</span>
                            </Label>
                            <Input {...register("social.linkedin")} placeholder="Enter bulk link tagline..." type="text" className={`${errors.social?.linkedin && "border-[#E11D48] "} py-[0.45rem] text-neutral-200`} />
                            {errors.social?.linkedin && <p className="text-[#ff3f69] tracking-wide text-sm font-semibold">{errors.social?.linkedin.message}</p>}
                        </div>
                        <div>
                            <Label htmlFor={"social.twitter"} className="text-neutral-300 ">
                                Twitter <span className="text-[#ff3f69]">*</span>
                            </Label>
                            <Input {...register("social.twitter")} placeholder="Enter bulk link tagline..." type="text" className={`${errors.social?.twitter && "border-[#E11D48] "} py-[0.45rem] text-neutral-200`} />
                            {errors.social?.twitter && <p className="text-[#ff3f69] tracking-wide text-sm font-semibold">{errors.social?.twitter.message}</p>}
                        </div>
                        <div>
                            <Label htmlFor={"social.youtube"} className="text-neutral-300 ">
                                Youtube <span className="text-[#ff3f69]">*</span>
                            </Label>
                            <Input {...register("social.youtube")} placeholder="Enter bulk link tagline..." type="text" className={`${errors.social?.youtube && "border-[#E11D48] "} py-[0.45rem] text-neutral-200`} />
                            {errors.social?.youtube && <p className="text-[#ff3f69] tracking-wide text-sm font-semibold">{errors.social?.youtube.message}</p>}
                        </div>
                        <div>
                            <Label htmlFor={"social.googleLink"} className="text-neutral-300 ">
                                Google Link <span className="text-[#ff3f69]">*</span>
                            </Label>
                            <Input {...register("social.googleLink")} placeholder="Enter bulk link tagline..." type="text" className={`${errors.social?.googleLink && "border-[#E11D48] "} py-[0.45rem] text-neutral-200`} />
                            {errors.social?.googleLink && <p className="text-[#ff3f69] tracking-wide text-sm font-semibold">{errors.social?.googleLink.message}</p>}
                        </div>
                    </div>
                    <div className='grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2'>
                        {socialFields?.map((_, ind) => {
                            return <div className='space-y-2  p-2 my-3 rounded bg-[#ff17a21b] border border-rose-800' key={ind}>
                                <div className='flex items-end gap-2'>
                                    <div className="h-10  min-w-10 relative group border border-dashed border-[#E11D48] rounded overflow-hidden">

                                        <input
                                            type="file"
                                            onChange={(e) => handleFileChange(e, ind)}
                                            name='imageImage'
                                            className="absolute z-10 inset-0 w-full h-full opacity-0 cursor-pointer"
                                        />
                                        {getValues(`social.otherSocialList.${ind}.img.url`) ? (
                                            <img
                                                src={getValues(`social.otherSocialList.${ind}.img.url`)}
                                                alt="Preview"
                                                className="w-full h-full object-contain"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center bg-neutral-950">
                                                <IconCamera className="text-white text-5xl" />

                                            </div>
                                        )}
                                        <div className="absolute inset-0  bg-black/80 hidden group-hover:flex items-center justify-center transition-all duration-300">
                                            <IconCamera className="text-white text-5xl" />
                                        </div>
                                        <label htmlFor="image" className="cursor-pointer absolute inset-0"></label>
                                    </div>
                                    <div className='w-full'>
                                        <Label htmlFor={`social.otherSocialList.${ind}.link`} className="text-neutral-300 ">
                                            Link  <span className="text-[#ff3f69]">*</span>
                                        </Label>
                                        <Input {...register(`social.otherSocialList.${ind}.link`)} placeholder="Enter brand name..." type="text" className={`${errors.social?.otherSocialList?.[ind]?.link && "border-[#E11D48] "} py-[0.45rem] text-neutral-200`} />
                                        {errors.social?.otherSocialList?.[ind]?.link && <p className="text-[#ff3f69] tracking-wide text-sm font-semibold">{errors.social?.otherSocialList?.[ind]?.link.message}</p>}
                                    </div>

                                </div>
                                <div className='flex gap-2 justify-evenly mt-3'>

                                    <div className='size-9 px-5 border border-[#E11D48] flex items-center justify-center rounded bg-[#010101]'>
                                        {ind + 1}
                                    </div>
                                    {
                                        socialFields.length && (
                                            <button type='button'
                                                onClick={() => {
                                                    if (socialFields.length === 1) {
                                                        setValue(`social.otherSocialList.${ind}`, { link: "", uniqueId: "", img: { url: "", publicId: "" } });
                                                    } else {
                                                        removeSocial(ind);
                                                    }
                                                }}
                                                className='flex w-full gap-2 items-center justify-center bg-[#E11D48] text-white px-2 rounded'><IconX className='size-4' /> {socialFields.length !== 1 ? "Remove" : "Clear"}
                                            </button>
                                        )
                                    }
                                </div>
                            </div>
                        })}

                        <button type='button' className='bg-[#E11D48] flex items-center justify-center cursor-pointer gap-2 my-3 p-2 px-4 rounded text-white' onClick={() => socialAppend({ uniqueId: "", link: "", img: { url: "", publicId: "" } })}>
                            <IconPlus className='size-4.5' /> Add more
                        </button>
                    </div>
                </div >,
        },
        {
            id: "3",
            icon: Zap,
            title: "Contact details",
            content:
                <div>
                    <div>
                        <Label htmlFor={"serviceTagline"} className="text-neutral-300 ">
                            Map Iframe link <span className="text-[#ff3f69]">*</span>
                        </Label>
                        <Input {...register("mapLink")} placeholder="Enter service tagline..." type="text" className={`${errors.mapLink && "border-[#E11D48] "} py-[0.45rem] text-neutral-200`} />
                        {errors.mapLink && <p className="text-[#ff3f69] tracking-wide text-sm font-semibold">{errors.mapLink.message}</p>}
                    </div>
                    <div className='grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2'>
                        {emailFields?.map((_, ind) => {
                            return <div className='space-y-2  p-2 my-3 rounded bg-[#ff17a21b] border border-rose-800' key={ind}>
                                <div>
                                    <Label htmlFor={`emailList.${ind}.email`} className="text-neutral-300 ">
                                        Email <span className="text-[#ff3f69]">*</span>
                                    </Label>
                                    <Input {...register(`emailList.${ind}.email`)} placeholder="Enter service name..." type="text" className={`${errors.emailList?.[ind]?.email && "border-[#E11D48] "} py-[0.45rem] text-neutral-200`} />
                                    {errors.emailList?.[ind]?.email && <p className="text-[#ff3f69] tracking-wide text-sm font-semibold">{errors.emailList?.[ind]?.email.message}</p>}
                                </div>
                                <div className='flex gap-2 justify-evenly mt-3'>

                                    <div className='size-9 px-5 border border-[#E11D48] flex items-center justify-center rounded bg-[#010101]'>
                                        {ind + 1}
                                    </div>
                                    {
                                        emailFields.length && (
                                            <button type='button'
                                                onClick={() => {
                                                    if (emailFields.length === 1) {
                                                        setValue(`emailList.${ind}`, { email: "" });
                                                    } else {
                                                        emailRemove(ind);
                                                    }
                                                }}
                                                className='flex w-full gap-2 items-center justify-center bg-[#E11D48] text-white px-2 rounded'><IconX className='size-4' /> {emailFields.length !== 1 ? "Remove" : "Clear"}
                                            </button>
                                        )
                                    }
                                </div>
                            </div>
                        })}

                        <button type='button' className='bg-[#E11D48] flex items-center justify-center cursor-pointer gap-2 my-3 p-2 px-4 rounded text-white' onClick={() => emailAppend({ email: "" })}>
                            <IconPlus className='size-4.5' /> Add more
                        </button>
                    </div>
                    <div className='grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2'>
                        {phoneFields?.map((_, ind) => {
                            return <div className='space-y-2  p-2 my-3 rounded bg-[#ff17a21b] border border-rose-800' key={ind}>
                                <div>
                                    <Label htmlFor={`services.${ind}.serviceName`} className="text-neutral-300 ">
                                        Phone Number <span className="text-[#ff3f69]">*</span>
                                    </Label>
                                    <Controller
                                        name={`phoneList.${ind}.phone`}
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
                                                    border: "none"
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
                                    {errors.phoneList?.[ind]?.phone && <p className="text-[#ff3f69] tracking-wide text-sm font-semibold">{errors.phoneList?.[ind]?.phone.message}</p>}
                                </div>
                                <div className='flex gap-2 justify-evenly mt-3'>

                                    <div className='size-9 px-5 border border-[#E11D48] flex items-center justify-center rounded bg-[#010101]'>
                                        {ind + 1}
                                    </div>
                                    {
                                        phoneFields.length && (
                                            <button type='button'
                                                onClick={() => {
                                                    if (phoneFields.length === 1) {
                                                        setValue(`phoneList.${ind}`, { phone: 0 });
                                                    } else {
                                                        phoneRemove(ind);
                                                    }
                                                }}
                                                className='flex w-full gap-2 items-center justify-center bg-[#E11D48] text-white px-2 rounded'><IconX className='size-4' /> {phoneFields.length !== 1 ? "Remove" : "Clear"}
                                            </button>
                                        )
                                    }
                                </div>
                            </div>
                        })}

                        <button type='button' className='bg-[#E11D48] flex items-center justify-center cursor-pointer gap-2 my-3 p-2 px-4 rounded text-white' onClick={() => phoneAppend({ phone: 0 })}>
                            <IconPlus className='size-4.5' /> Add more
                        </button>
                    </div>
                    <div className='grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2'>
                        {addressFields?.map((_, ind) => {
                            return <div className='space-y-2  p-2 my-3 rounded bg-[#ff17a21b] border border-rose-800' key={ind}>
                                <div>
                                    <Label htmlFor={`address.${ind}.title`} className="text-neutral-300 ">
                                        Address type <span className="text-[#ff3f69]">*</span>
                                    </Label>
                                    <Input {...register(`address.${ind}.title`)} placeholder="Enter service name..." type="text" className={`${errors.address?.[ind]?.title && "border-[#E11D48] "} py-[0.45rem] text-neutral-200`} />
                                    {errors.address?.[ind]?.title && <p className="text-[#ff3f69] tracking-wide text-sm font-semibold">{errors.address?.[ind]?.title.message}</p>}
                                </div>
                                <div>
                                    <Label htmlFor={`address.${ind}.detail`} className="text-neutral-300 ">
                                        Full address <span className="text-[#ff3f69]">*</span>
                                    </Label>
                                    <Input {...register(`address.${ind}.detail`)} placeholder="Enter service name..." type="text" className={`${errors.address?.[ind]?.detail && "border-[#E11D48] "} py-[0.45rem] text-neutral-200`} />
                                    {errors.address?.[ind]?.detail && <p className="text-[#ff3f69] tracking-wide text-sm font-semibold">{errors.address?.[ind]?.detail.message}</p>}
                                </div>
                                <div className='flex gap-2 justify-evenly mt-3'>

                                    <div className='size-9 px-5 border border-[#E11D48] flex items-center justify-center rounded bg-[#010101]'>
                                        {ind + 1}
                                    </div>
                                    {
                                        addressFields.length && (
                                            <button type='button'
                                                onClick={() => {
                                                    if (addressFields.length === 1) {
                                                        setValue(`address.${ind}`, { title: "", detail: "" });
                                                    } else {
                                                        addressRemove(ind);
                                                    }
                                                }}
                                                className='flex w-full gap-2 items-center justify-center bg-[#E11D48] text-white px-2 rounded'><IconX className='size-4' /> {addressFields.length !== 1 ? "Remove" : "Clear"}
                                            </button>
                                        )
                                    }
                                </div>
                            </div>
                        })}

                        <button type='button' className='bg-[#E11D48] flex items-center justify-center cursor-pointer gap-2 my-3 p-2 px-4 rounded text-white' onClick={() => addressAppend({ title: "", detail: "" })}>
                            <IconPlus className='size-4.5' /> Add more
                        </button>
                    </div>
                    <div className='grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2'>

                        <div>
                            <Label className="text-neutral-300 ">
                                Brochure Tagline <span className="text-[#ff3f69]">*</span>
                            </Label>
                            <Input {...register("brochureLink.tagline")} placeholder="Enter service tagline..." type="text" className={`${errors?.brochureLink?.tagline && "border-[#E11D48] "} py-[0.45rem] text-neutral-200`} />
                            {errors?.brochureLink?.tagline && <p className="text-[#ff3f69] tracking-wide text-sm font-semibold">{errors?.brochureLink?.tagline?.message}</p>}
                        </div>
                        <div>
                            <Label className="text-neutral-300 ">
                                Brochure Link <span className="text-[#ff3f69]">*</span>
                            </Label>
                            <Input {...register("brochureLink.link")} placeholder="Enter service tagline..." type="text" className={`${errors?.brochureLink?.link && "border-[#E11D48] "} py-[0.45rem] text-neutral-200`} />
                            {errors?.brochureLink?.link && <p className="text-[#ff3f69] tracking-wide text-sm font-semibold">{errors?.brochureLink?.link?.message}</p>}
                        </div>
                        <div>
                            <Label className="text-neutral-300 ">
                                Contact CSV <span className="text-[#ff3f69]">*</span>
                            </Label>
                            <Input {...register("contactCSV")} placeholder="Enter contact CSV..." type="text" className={`${errors?.contactCSV && "border-[#E11D48] "} py-[0.45rem] text-neutral-200`} />
                            {errors?.contactCSV && <p className="text-[#ff3f69] tracking-wide text-sm font-semibold">{errors?.contactCSV.message}</p>}
                        </div>
                        <div>
                            <Label className="text-neutral-300 ">
                                Whatsapp No <span className="text-[#ff3f69]">*</span>
                            </Label>
                            <Controller
                                name="whatsappNo"
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
                            {errors?.whatsappNo && <p className="text-[#ff3f69] tracking-wide text-sm font-semibold">{errors?.whatsappNo?.message}</p>}
                        </div>
                    </div>
                </div>,
        }
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

export default AddContactDetails
