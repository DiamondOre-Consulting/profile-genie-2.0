import { useDispatch } from 'react-redux'
import { toast } from 'sonner'
import { forgotPassword } from '@/Redux/Slice/AuthSlice'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { forgotPasswordSchema, forgotPasswordType } from '@/validations/AuthValidation'
import { IconFidgetSpinner } from '@tabler/icons-react'
import { AtSignIcon } from 'lucide-react'
import { Input } from '@/components/ui/input'

const ForgotPassword = () => {
    const dispatch = useDispatch()

    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<forgotPasswordType>({
        resolver: zodResolver(forgotPasswordSchema),
    })


    const handleSendLink = async (data: forgotPasswordType) => {
        const res = await dispatch(forgotPassword(data) as any)

        if (res?.payload?.success) {
            toast.success(res?.payload?.message)
        }
    }

    return (

        <div className=" bg-[#010101] flex items-center justify-center w-full py-20 h-screen ">


            <div className="relative p-6 max-w-[25rem] mainShadow duration-300 hover:border-[#7715ac] border border-gray-700 bg-[#25144894] rounded-lg shadow">
                <h3 className="text-2xl mb-0.5 font-medium"></h3>
                <p className="mb-4 text-sm font-normal text-white"></p>

                <div className="mb-8 text-center">
                    <p className="mb-3 text-2xl font-semibold leading-5 text-white">
                        Reset Password
                    </p>
                    <p className="mx-4 mt-2 text-sm leading-5 text-slate-300">
                        Enter your registered email address to send reset password link on your email.
                    </p>
                </div>
                <form noValidate className="w-full" onSubmit={handleSubmit(handleSendLink)}>
                    <div className="*:not-first:mt-2">
                        <div className="relative">
                            <Input {...register('email')} className="bg-neutral-900 border-neutral-700 ps-9 h-10 text-white" placeholder="Email" type="email" />
                            <div className="text-black pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 peer-disabled:opacity-50 ">
                                <AtSignIcon size={16} className='text-neutral-400' aria-hidden="true" />
                            </div>
                        </div>
                        {errors.email && <p className='text-red-600 text-sm'>{errors.email.message}</p>}
                    </div>
                    {errors.email && <p className='text-red-600 text-sm'>{errors.email.message}</p>}
                    <button disabled={isSubmitting} type="submit"
                        className="inline-flex mt-6 w-full items-center justify-center rounded-md bg-gradient-to-r from-[#e529a7] via-[#b60aff] to-[#1352ff] p-2 py-[0.7rem] text-sm font-medium text-white outline-none focus:ring-offset-1 disabled:bg-gray-400">
                        {isSubmitting ? <IconFidgetSpinner className='animate-spin w-4.5' /> : 'Send reset link'}</button>
                </form>
            </div>
        </div>
    )
}

export default ForgotPassword
