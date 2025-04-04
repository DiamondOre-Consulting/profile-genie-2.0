import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect } from 'react'
import { Controller, useFieldArray, useForm } from 'react-hook-form'
import { z } from 'zod'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { IconSquareRoundedArrowRightFilled, IconWhirl } from '@tabler/icons-react'
import PhoneInput from 'react-phone-input-2'
import { addCatalogueOwnerSchema, catalogueResponse } from '@/validations/CatalogueValidation'
import { useEditCatalogueOwnerMutation } from '@/Redux/API/CatalogueApi'
import { HomeLayout } from '@/Layout/HomeLayout'

type catalogueOwnerSchema = z.infer<typeof addCatalogueOwnerSchema>

const EditOwner = ({ catalogueOwner }: { catalogueOwner: catalogueResponse["data"]["catalogueOwner"] }) => {

    const [editCatalogueOwner] = useEditCatalogueOwnerMutation()
    console.log(catalogueOwner)
    const { register, handleSubmit, getValues, setValue, reset, control, formState: { errors, isSubmitting } } = useForm<catalogueOwnerSchema>({
        resolver: zodResolver(addCatalogueOwnerSchema),
        defaultValues: {
            ...catalogueOwner,
            fullName: catalogueOwner?.authAccount?.fullName,
            emailList: catalogueOwner?.emailList,
            phoneList: catalogueOwner?.phoneList,
            address: catalogueOwner?.address
        }
    })

    useEffect(() => {
        if (catalogueOwner) {
            reset(catalogueOwner);
            setValue("fullName", catalogueOwner?.authAccount?.fullName)
            setValue("email", catalogueOwner?.authAccount?.email)
        }
    }, [catalogueOwner, reset])


    const { fields: emailFields, append: emailAppend } = useFieldArray({
        control,
        name: 'emailList'
    });

    useEffect(() => {
        if (emailFields.length === 1) {
            emailAppend({ email: '' });
        }
    }, [emailFields, emailAppend, catalogueOwner]);

    const { fields: phoneFields, append: phoneAppend } = useFieldArray({
        control,
        name: 'phoneList'
    })

    useEffect(() => {
        if (phoneFields.length === 1) {
            phoneAppend({ phone: +91 });
        }
    }, [phoneFields, phoneAppend, catalogueOwner]);

    const { fields: addressFields, append: addressAppend } = useFieldArray({
        control,
        name: 'address'
    })

    useEffect(() => {
        if (addressFields.length === 1) {
            addressAppend({ title: "", detail: "" });
        }
    }, [addressFields, addressAppend, catalogueOwner]);


    const onSubmit = async (data: catalogueOwnerSchema) => {
        await editCatalogueOwner({ formData: data, ownerId: catalogueOwner?._id })
    }

    console.log(getValues())

    return (
        <HomeLayout>
            <h1 className='text-2xl font-semibold mb-3 text-center text-neutral-700'>Profile</h1>
            <form className='max-w-[70rem] my-6 mx-auto' onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <div className='grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2'>
                        <div>
                            <Label htmlFor={`fullName`} className="text-neutral-700 font-semibold ">
                                Full Name <span className="text-[#ff3f69]">*</span>
                            </Label>
                            <Input {...register(`fullName`)} placeholder="Enter owner full name..." readOnly type="text" className={`${errors.fullName && "border-[#E11D48] "} py-[0.45rem] cursor-not-allowed select-none`} />
                            {errors.fullName && <p className="text-[#ff3f69] tracking-wide text-sm font-semibold ">{errors.fullName.message}</p>}
                        </div>
                        <div>
                            <Label htmlFor={`email`} className="text-neutral-700 font-semibold ">
                                Register email <span className="text-[#ff3f69]">*</span>
                            </Label>
                            <Input value={getValues("email")} readOnly placeholder="Enter register email..." type="text" className={`${errors.email && "border-[#E11D48] "} py-[0.45rem] cursor-not-allowed select-none`} />
                        </div>
                        <div>
                            <Label htmlFor={`password`} className="text-neutral-700 font-semibold ">
                                Password <span className="text-[#ff3f69]">*</span>
                            </Label>
                            <Input {...register(`password`)} placeholder="Enter password..." type="text" className={`${errors.password && "border-[#E11D48] "} py-[0.45rem] `} />
                            {errors.password && <p className="text-[#ff3f69] tracking-wide text-sm font-semibold">{errors.password.message}</p>}
                        </div>

                        <div>
                            <Label className="text-neutral-700 font-semibold ">
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
                                            backgroundColor: "#99A1AF",
                                            color: "#ffffff",
                                            borderRadius: "4.5px",
                                            border: "1px solid #D4D4D8"
                                        }}
                                        buttonStyle={{
                                            backgroundColor: "#FFDCE3",
                                            color: "#000000",
                                            border: "none",
                                        }}
                                        inputStyle={{
                                            width: "100%",
                                            border: "1px solid #F5F5F5",
                                            fontSize: "12px",
                                            paddingTop: "8px",
                                            paddingBottom: "8px",
                                            height: "34px",
                                            borderRadius: "4px",
                                            backgroundColor: "#F5F5F5",
                                            color: "#000"
                                        }}
                                        value={field?.value?.toString() || ""}
                                        onChange={(phone) => field.onChange(Number(phone))}
                                    />
                                )}
                            />
                            {errors?.whatsappNo && <p className="text-[#ff3f69] tracking-wide text-sm font-semibold">{errors?.whatsappNo?.message}</p>}
                        </div>
                    </div>
                    <div>
                        <Label htmlFor={"serviceTagline"} className="text-neutral-700 font-semibold ">
                            Map Iframe link <span className="text-[#ff3f69]">*</span>
                        </Label>
                        <Input {...register("mapLink")} placeholder="Enter service tagline..." type="text" className={`${errors.mapLink && "border-[#E11D48] "} py-[0.45rem] `} />
                        {errors.mapLink && <p className="text-[#ff3f69] tracking-wide text-sm font-semibold">{errors.mapLink.message}</p>}
                    </div>
                    <div className='space-y-2  p-2 my-3 rounded bg-[#7f092307] border border-rose-900/10' >
                        <Label htmlFor={`phoneList`} className="text-neutral-700 font-semibold ">
                            Phone Number <span className="text-[#ff3f69]">*</span>
                        </Label>
                        <div className='flex items-center flex-col sm:flex-row justify-center gap-2'>

                            {emailFields?.map((_, ind) => {
                                return <div className=' w-full  rounded' key={ind}>

                                    <Input {...register(`emailList.${ind}.email`)} placeholder="Enter contact email..." type="text" className={`${errors.emailList?.[ind]?.email && "border-[#E11D48] "} py-[0.45rem] bg-white`} />
                                    {errors.emailList?.[ind]?.email && <p className="text-[#ff3f69] tracking-wide text-sm font-semibold">{errors.emailList?.[ind]?.email.message}</p>}

                                </div>
                            })}
                        </div>
                    </div>


                    <div className='space-y-2  p-2 my-3 rounded bg-[#7f092307] border border-rose-900/10' >
                        <Label htmlFor={`phoneList`} className="text-neutral-700 font-semibold ">
                            Phone Number <span className="text-[#ff3f69]">*</span>
                        </Label>
                        <div className='flex items-center flex-col sm:flex-row justify-center gap-2'>

                            {phoneFields?.map((_, ind) => {
                                return <div key={ind} className='w-full'>

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
                                                containerStyle={{
                                                    backgroundColor: "#99A1AF",
                                                    color: "#ffffff",
                                                    borderRadius: "4.5px",
                                                    border: "1px solid #D4D4D8"
                                                }}
                                                buttonStyle={{
                                                    backgroundColor: "#FFDCE3",
                                                    color: "#000000",
                                                    border: "none",
                                                }}
                                                inputStyle={{
                                                    width: "100%",
                                                    border: "1px solid #F5F5F5",
                                                    fontSize: "12px",
                                                    paddingTop: "8px",
                                                    paddingBottom: "8px",
                                                    height: "34px",
                                                    borderRadius: "4px",
                                                    backgroundColor: "#ffffff",
                                                    color: "#000"
                                                }}
                                                value={value ? value.toString() : ""}
                                                onChange={(phone) => onChange(phone ? Number(phone) : 0)}
                                            />
                                        )}
                                    />
                                    {errors.phoneList?.[ind]?.phone && <p className="text-[#ff3f69] tracking-wide text-sm font-semibold">{errors.phoneList?.[ind]?.phone.message}</p>}
                                </div>

                            })}
                        </div>
                    </div>


                    <div className='grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2'>
                        {addressFields?.map((_, ind) => {
                            return <div className='space-y-2  p-2 my-3 rounded bg-[#7f092307] border border-rose-900/10' key={ind}>
                                <div>
                                    <Label htmlFor={`address.${ind}.title`} className="text-neutral-700 font-semibold ">
                                        Address type
                                    </Label>
                                    <Input {...register(`address.${ind}.title`)} placeholder="Enter service name..." type="text" className={`${errors.address?.[ind]?.title && "border-[#E11D48] "} py-[0.45rem] bg-white`} />
                                    {errors.address?.[ind]?.title && <p className="text-[#ff3f69] tracking-wide text-sm font-semibold">{errors.address?.[ind]?.title.message}</p>}
                                </div>
                                <div>
                                    <Label htmlFor={`address.${ind}.detail`} className="text-neutral-700 font-semibold ">
                                        Full address
                                    </Label>
                                    <Input {...register(`address.${ind}.detail`)} placeholder="Enter service name..." type="text" className={`${errors.address?.[ind]?.detail && "border-[#E11D48] "} py-[0.45rem] bg-white `} />
                                    {errors.address?.[ind]?.detail && <p className="text-[#ff3f69] tracking-wide text-sm font-semibold">{errors.address?.[ind]?.detail.message}</p>}
                                </div>

                            </div>
                        })}


                    </div>

                </div>

                <button
                    type='submit'
                    className="bg-[#E11D48] cursor-pointer text-white flex items-center gap-3 w-full justify-center py-1.5 text-sm px-4 rounded"
                    disabled={isSubmitting}
                >
                    Update Profile   {
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

export default EditOwner