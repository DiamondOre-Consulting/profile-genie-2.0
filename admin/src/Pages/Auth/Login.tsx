import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { toast } from 'sonner'
import { loginValidation, loginValidationSchema } from '@/validations/PortfolioValidation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { IconBrandGoogle } from '@tabler/icons-react'
import { login } from '@/Redux/Slice/AuthSlice'
import { AtSignIcon, EyeIcon, EyeOffIcon, Lock } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { axiosInstance } from '@/Helper/axiosInstance'

const Login = () => {
    const [showPassword, setShowPassword] = useState(false)
    const dispatch = useDispatch()

    const { register, handleSubmit, formState: { errors } } = useForm<loginValidation>({
        resolver: zodResolver(loginValidationSchema)
    })

    const handleLogin = async (data: string) => {
        try {
            const formData = new FormData()
            const loginData = JSON.parse(data)
            formData.append('email', loginData.email)
            formData.append('password', loginData.password)
            console.log(loginData)
            const res = await dispatch(login(formData) as any)
            if (res?.payload?.success) {

                toast.success('Login Successful')
            }
        } catch (err) {
            console.log(err)
        }

    }

    const handleGoogleLogin = async () => {
        try {
            window.location.href = "http://localhost:8000/api/v1/auth/google";
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div className='flex items-center justify-center w-full py-20 h-screen bg-[#010101] '>
            <div data-aos="flip-left" id="login-popup"
                className="max-w-[25rem] w-full items-center justify-center flex">
                {/* <LoadingBar color='#f11946' ref={ref} /> */}
                <div className="relative w-full p-4 ">
                    <div className="relative mainShadow duration-300 hover:border-[#7715ac] border border-gray-700 bg-[#25144894] rounded-lg shadow">


                        <div className="p-5">
                            <h3 className="text-2xl mb-0.5 font-medium"></h3>
                            <p className="mb-4 text-sm font-normal text-white"></p>

                            <div className="text-center">
                                <p className="mb-3 text-2xl font-semibold leading-5 text-white">
                                    Login to your account
                                </p>
                                {/* <p className="mt-2 text-sm leading-4 text-slate-600">
                                    You must be logged in to perform this action.
                                </p> */}
                            </div>

                            <div className="flex flex-col gap-2 mt-7">



                                <button onClick={handleGoogleLogin}
                                    className="inline-flex h-10 w-full items-center justify-center gap-2 rounded  bg-[#3d1797] hover:bg-[#6C2BFF] p-2 text-sm font-medium text-white outline-none duration-300  disabled:cursor-not-allowed disabled:opacity-60">
                                    <IconBrandGoogle className="h-[18px] w-[18px]" />
                                    Continue with
                                    Google
                                </button>



                            </div>

                            <div className="flex items-center w-full gap-2 py-6 text-sm text-slate-600">
                                <div className="w-full h-px bg-slate-200"></div>
                                OR
                                <div className="w-full h-px bg-slate-200"></div>
                            </div>


                            <form noValidate className="w-full" onSubmit={handleSubmit(handleLogin)}>

                                <div className="*:not-first:mt-2">
                                    {/* <Label htmlFor={id}>Input with start icon</Label> */}
                                    <div className="relative">
                                        <Input className="peer ps-9 h-10 text-white" placeholder="Email" type="email" />
                                        <div className="text-muted-foreground/80 pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 peer-disabled:opacity-50 ">
                                            <AtSignIcon size={16} className='text-white' aria-hidden="true" />
                                        </div>
                                    </div>
                                    {errors.email && <p className='text-red-600 text-sm'>{errors.email.message}</p>}
                                </div>

                                <div className="mt-3">
                                    {/* <Label htmlFor={id}>Show/hide password input</Label> */}
                                    <div className="relative">
                                        <Input
                                            {...register('password')}
                                            className="peer ps-9 pe-9 h-10 text-white"
                                            placeholder="Password"
                                            type={showPassword ? "text" : "password"}
                                        />
                                        <div className="text-muted-foreground/80 pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 peer-disabled:opacity-50 ">
                                            <Lock size={16} className='text-white' aria-hidden="true" />
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
                                <p className='my-2'>
                                    <Link to={"/forgot-password"} className="text-sm text-gray-400 cursor-pointer ">
                                        Reset your password?
                                    </Link>
                                </p>
                                <button type="submit"
                                    className="inline-flex w-full items-center justify-center rounded-md bg-gradient-to-r from-[#e529a7] via-[#b60aff] to-[#1352ff] p-2 py-[0.7rem] text-sm font-medium text-white outline-none focus:ring-offset-1 disabled:bg-gray-400">
                                    LOGIN</button>
                            </form>

                            <div className="mt-6 text-sm text-center text-slate-400">
                                Don&apos;t have an account?
                                <Link to="/signup" className="font-medium pl-2 text-[#4285f4]">Sign up</Link>
                            </div>

                        </div>
                    </div>
                </div>
            </div>

        </div>

    )
}

export default Login
