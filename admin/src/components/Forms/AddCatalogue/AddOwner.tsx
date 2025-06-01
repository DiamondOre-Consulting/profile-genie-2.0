import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import { Controller, useFieldArray, useForm } from 'react-hook-form'
import { z } from 'zod'

import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { IconPlus, IconSquareRoundedArrowLeftFilled, IconSquareRoundedArrowRightFilled, IconWhirl, IconX } from '@tabler/icons-react'


import PhoneInput from 'react-phone-input-2'
import { addCatalogueOwnerSchema } from '@/validations/CatalogueValidation'
import { useAddCatalogueOwnerMutation } from '@/Redux/API/CatalogueApi'

type catalogueOwnerSchema = z.infer<typeof addCatalogueOwnerSchema>

interface apiRes {
    success: boolean
    message: string,
    CatalogueOwner: { _id: string, contactDetail: catalogueOwnerSchema }
}


const AddOwner = ({ currentStep, stepsLength, setCurrentStep, setOwnerId }: { currentStep: number, stepsLength: number, setCurrentStep: React.Dispatch<React.SetStateAction<number>>, setOwnerId: React.Dispatch<React.SetStateAction<string>> }) => {

    const [addCatalogueOwner] = useAddCatalogueOwnerMutation()

    const { register, handleSubmit, setValue, control, formState: { errors, isSubmitting } } = useForm<catalogueOwnerSchema>({
        resolver: zodResolver(addCatalogueOwnerSchema),
        defaultValues: {
            address: [{ title: "", detail: "" }],
            emailList: [{ email: "" }],
            phoneList: [{ phone: undefined }],
        }
    })


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

    const onSubmit = async (data: catalogueOwnerSchema) => {
        console.log(2)

        const response = await addCatalogueOwner({ data }) as { data: apiRes }

        if (response?.data?.success) {
            setOwnerId(response?.data?.CatalogueOwner?._id)
            setCurrentStep(currentStep + 1)
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div>
                <div className='grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2'>
                    <div>
                        <Label htmlFor={`fullName`} className="text-neutral-300 ">
                            Full Name <span className="text-main">*</span>
                        </Label>
                        <Input {...register(`fullName`)} placeholder="Enter owner full name..." type="text" className={`${errors.fullName && "border-[#E11D48] "} py-[0.45rem] text-neutral-200`} />
                        {errors.fullName && <p className="text-main tracking-wide text-sm font-semibold">{errors.fullName.message}</p>}
                    </div>
                    <div>
                        <Label htmlFor={`email`} className="text-neutral-300 ">
                            Register email <span className="text-main">*</span>
                        </Label>
                        <Input {...register(`email`)} placeholder="Enter register email..." type="text" className={`${errors.email && "border-[#E11D48] "} py-[0.45rem] text-neutral-200`} />
                        {errors.email && <p className="text-main tracking-wide text-sm font-semibold">{errors.email.message}</p>}
                    </div>
                    <div>
                        <Label htmlFor={`password`} className="text-neutral-300 ">
                            Password <span className="text-main">*</span>
                        </Label>
                        <Input {...register(`password`)} placeholder="Enter password..." type="text" className={`${errors.password && "border-[#E11D48] "} py-[0.45rem] text-neutral-200`} />
                        {errors.password && <p className="text-main tracking-wide text-sm font-semibold">{errors.password.message}</p>}
                    </div>

                    <div>
                        <Label className="text-neutral-300 ">
                            Whatsapp No <span className="text-main">*</span>
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
                        {errors?.whatsappNo && <p className="text-main tracking-wide text-sm font-semibold">{errors?.whatsappNo?.message}</p>}
                    </div>
                </div>
                <div>
                    <Label htmlFor={"serviceTagline"} className="text-neutral-300 ">
                        Map Iframe link <span className="text-main">*</span>
                    </Label>
                    <Input {...register("mapLink")} placeholder="Enter service tagline..." type="text" className={`${errors.mapLink && "border-[#E11D48] "} py-[0.45rem] text-neutral-200`} />
                    {errors.mapLink && <p className="text-main tracking-wide text-sm font-semibold">{errors.mapLink.message}</p>}
                </div>
                <div className='grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2'>
                    {emailFields?.map((_, ind) => {
                        return <div className='space-y-2  p-2 my-3 rounded bg-[#ff17a21b] border border-rose-800' key={ind}>
                            <div>
                                <Label htmlFor={`emailList.${ind}.email`} className="text-neutral-300 ">
                                    Email <span className="text-main">*</span>
                                </Label>
                                <Input {...register(`emailList.${ind}.email`)} placeholder="Enter service name..." type="text" className={`${errors.emailList?.[ind]?.email && "border-[#E11D48] "} py-[0.45rem] text-neutral-200`} />
                                {errors.emailList?.[ind]?.email && <p className="text-main tracking-wide text-sm font-semibold">{errors.emailList?.[ind]?.email.message}</p>}
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
                                            className='flex w-full gap-2 items-center justify-center bg-main text-white px-2 rounded'><IconX className='size-4' /> {emailFields.length !== 1 ? "Remove" : "Clear"}
                                        </button>
                                    )
                                }
                            </div>
                        </div>
                    })}

                    <button type='button' className='bg-main flex items-center justify-center cursor-pointer gap-2 my-3 p-2 px-4 rounded text-white' onClick={() => emailAppend({ email: "" })}>
                        <IconPlus className='size-4.5' /> Add more
                    </button>
                </div>
                <div className='grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2'>
                    {phoneFields?.map((_, ind) => {
                        return <div className='space-y-2  p-2 my-3 rounded bg-[#ff17a21b] border border-rose-800' key={ind}>
                            <div>
                                <Label htmlFor={`services.${ind}.serviceName`} className="text-neutral-300 ">
                                    Phone Number <span className="text-main">*</span>
                                </Label>

                                <Controller
                                    name={`phoneList.${ind}.phone`}
                                    control={control}
                                    rules={{
                                        required: "Phone number is required",
                                        validate: (value) => (!isNaN(value) && value > 0) || "Invalid phone number"
                                    }}
                                    render={({ field: { onChange, value, ref } }) => (
                                        <PhoneInput
                                            country="in"
                                            placeholder="Enter phone number"
                                            inputProps={{
                                                name: `phoneList.${ind}.phone`,
                                                required: true,
                                                ref: (elm: HTMLElement | null) => {
                                                    if (ref) {
                                                        ref(elm instanceof HTMLElement ? elm : null);
                                                    }
                                                }
                                            }}
                                            containerStyle={{ backgroundColor: "#171717", color: "#ffffff" }}
                                            buttonStyle={{ backgroundColor: "#2D2D2D", color: "#000000", border: "none" }}
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
                                            value={value ? value.toString() : ""}
                                            onChange={(phone) => onChange(phone ? Number(phone) : 0)}
                                        />
                                    )}
                                />
                                {errors.phoneList?.[ind]?.phone && <p className="text-main tracking-wide text-sm font-semibold">{errors.phoneList?.[ind]?.phone.message}</p>}
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
                                            className='flex w-full gap-2 items-center justify-center bg-main text-white px-2 rounded'><IconX className='size-4' /> {phoneFields.length !== 1 ? "Remove" : "Clear"}
                                        </button>
                                    )
                                }
                            </div>
                        </div>
                    })}

                    <button type='button' className='bg-main flex items-center justify-center cursor-pointer gap-2 my-3 p-2 px-4 rounded text-white' onClick={() => phoneAppend({ phone: 0 })}>
                        <IconPlus className='size-4.5' /> Add more
                    </button>
                </div>
                <div className='grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2'>
                    {addressFields?.map((_, ind) => {
                        return <div className='space-y-2  p-2 my-3 rounded bg-[#ff17a21b] border border-rose-800' key={ind}>
                            <div>
                                <Label htmlFor={`address.${ind}.title`} className="text-neutral-300 ">
                                    Address type
                                </Label>
                                <Input {...register(`address.${ind}.title`)} placeholder="Enter service name..." type="text" className={`${errors.address?.[ind]?.title && "border-[#E11D48] "} py-[0.45rem] text-neutral-200`} />
                                {errors.address?.[ind]?.title && <p className="text-main tracking-wide text-sm font-semibold">{errors.address?.[ind]?.title.message}</p>}
                            </div>
                            <div>
                                <Label htmlFor={`address.${ind}.detail`} className="text-neutral-300 ">
                                    Full address
                                </Label>
                                <Input {...register(`address.${ind}.detail`)} placeholder="Enter service name..." type="text" className={`${errors.address?.[ind]?.detail && "border-[#E11D48] "} py-[0.45rem] text-neutral-200`} />
                                {errors.address?.[ind]?.detail && <p className="text-main tracking-wide text-sm font-semibold">{errors.address?.[ind]?.detail.message}</p>}
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
                                            className='flex w-full gap-2 items-center justify-center bg-main text-white px-2 rounded'><IconX className='size-4' /> {addressFields.length !== 1 ? "Remove" : "Clear"}
                                        </button>
                                    )
                                }
                            </div>
                        </div>
                    })}

                    <button type='button' className='bg-main flex items-center justify-center cursor-pointer gap-2 my-3 p-2 px-4 rounded text-white' onClick={() => addressAppend({ title: "", detail: "" })}>
                        <IconPlus className='size-4.5' /> Add more
                    </button>
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

export default AddOwner
