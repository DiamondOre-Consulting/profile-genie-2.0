import { useEffect, useState } from 'react'

import { useDispatch } from 'react-redux'
import { toast } from 'sonner'
import { useNavigate, useParams } from 'react-router-dom'
import { IconFidgetSpinner } from '@tabler/icons-react'
import { resetPassword } from '@/Redux/Slice/AuthSlice'
import { resetPasswordSchema, resetPasswordType } from '@/validations/AuthValidation'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Input } from '@/components/ui/input'
import { AtSignIcon, EyeIcon, EyeOffIcon, Lock } from 'lucide-react'

const ResetPassword = () => {
    const { expiry, email, token } = useParams()
    const [timeLeft, setTimeLeft] = useState({ minutes: 0, seconds: 0 });
    const [showPassword, setShowPassword] = useState(false)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { register, getValues, handleSubmit, formState: { errors, isSubmitting } } = useForm<resetPasswordType>({
        resolver: zodResolver(resetPasswordSchema),
        defaultValues: {
            email: email
        }
    })

    useEffect(() => {
        const updateCountdown = () => {
            if (!expiry) {
                console.error("Expiry date is undefined.");
                return;
            }

            const now = new Date();
            const expiryDate = new Date(expiry); // expiry is now guaranteed to be a string
            const timeDiff = expiryDate.getTime() - now.getTime();

            console.log(now);
            console.log(expiryDate);

            if (timeDiff <= 0) {
                clearInterval(interval);
                setTimeLeft({ minutes: 0, seconds: 0 });
            } else {
                const minutes = Math.floor((timeDiff / 1000 / 60) % 60);
                const seconds = Math.floor((timeDiff / 1000) % 60);
                setTimeLeft({ minutes, seconds });
            }
        };


        const interval = setInterval(updateCountdown, 1000);

        updateCountdown();

        return () => clearInterval(interval);
    }, [expiry]);



    const handleResetPassword = async (data: resetPasswordType) => {
        if (token) {
            const res = await dispatch(resetPassword({ token, newPassword: data }) as any)
            if (res?.payload?.success) {
                toast.success(res?.payload?.message)
                navigate('/login')
            }
        }
    }

    return (
        <div className='flex select-none bg-[#010101] items-center justify-center w-full min-h-screen py-20  '>
            <div data-aos="flip-up" id="login-popup"
                className="max-w-[40rem] w-full  items-center justify-center flex">
                <div className="relative w-full max-w-md p-4 ">
                    <div className="relative mainShadow duration-300 hover:border-[#7715ac] border border-gray-700 bg-[#25144894] rounded-lg shadow">


                        <div className="p-5 pb-10">
                            <h3 className="text-2xl mb-0.5 font-medium"></h3>
                            <p className="mb-4 text-sm font-normal text-white"></p>

                            <div className="mb-8 text-center">
                                <p className="mb-3 text-2xl font-semibold leading-5 text-white">
                                    Reset Password
                                </p>
                                <p className="mx-4 mt-2 text-sm leading-5 text-slate-300">
                                    Expiring in <br /> <div className='flex mx-auto mt-4 items-center justify-center p-2 font-semibold tracking-wide text-white border-2 border-[#252525] rounded-full neu size-12'>{timeLeft.minutes}:{timeLeft.seconds}</div>
                                </p>
                            </div>


                            <form noValidate className="w-full " onSubmit={handleSubmit(handleResetPassword)}>

                                <div className="*:not-first:mt-2">
                                    <div className="relative">
                                        <Input value={getValues('email')} className="bg-neutral-900 border-neutral-700 ps-9 h-10 text-white" placeholder="Email" type="email" />
                                        <div className="text-black pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 peer-disabled:opacity-50 ">
                                            <AtSignIcon size={16} className='text-neutral-400' aria-hidden="true" />
                                        </div>
                                    </div>
                                    {errors.email && <p className='text-red-600 text-sm'>{errors.email.message}</p>}
                                </div>

                                <div className="mt-3">
                                    <div className="relative">
                                        <Input
                                            {...register('password')}
                                            className="peer ps-9 pe-9 bg-neutral-900 border-neutral-700 h-10 text-white"
                                            placeholder="Password"
                                            type={showPassword ? "text" : "password"}
                                        />
                                        <div className="text-muted-foreground/80 pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 peer-disabled:opacity-50 ">
                                            <Lock size={16} className='text-neutral-400' aria-hidden="true" />
                                        </div>
                                        <button
                                            className="text-white hover:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-md transition-[color,box-shadow] outline-none focus:z-10 focus-visible:ring-[3px] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            aria-label={showPassword ? "Hide password" : "Show password"}
                                            aria-pressed={showPassword}
                                            aria-controls="password"
                                        >
                                            {showPassword ? (
                                                <EyeOffIcon size={16} aria-hidden="true" />
                                            ) : (
                                                <EyeIcon size={16} aria-hidden="true" />
                                            )}
                                        </button>
                                    </div>
                                    {errors.password && <span className="text-red-500 text-sm">{errors.password.message}</span>}
                                </div>

                                <div className="mt-3">
                                    <div className="relative">
                                        <Input
                                            {...register('confirmPassword')}
                                            className="peer ps-9 pe-9 bg-neutral-900 border-neutral-700 h-10 text-white"
                                            placeholder="Confirm Password"
                                            type={"password"}
                                        />
                                        <div className="text-muted-foreground/80 pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 peer-disabled:opacity-50 ">
                                            <Lock size={16} className='text-neutral-400' aria-hidden="true" />
                                        </div>

                                    </div>
                                    {errors.confirmPassword && <span className="text-red-500 text-sm">{errors.confirmPassword.message}</span>}
                                </div>

                                <button disabled={isSubmitting} type="submit"
                                    className="inline-flex mt-6 w-full items-center justify-center rounded-md bg-gradient-to-r from-[#e529a7] via-[#b60aff] to-[#1352ff] p-2 py-[0.7rem] text-sm font-medium text-white outline-none focus:ring-offset-1 disabled:bg-gray-400">
                                    {isSubmitting ? <IconFidgetSpinner className='animate-spin w-4.5' /> : 'Reset Password'}</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ResetPassword
