import { HomeLayout } from "@/Layout/HomeLayout"
import { useGetAllPortfolioQuery, useGetRecycledPortfolioQuery, useRecyclePortfolioMutation } from "@/Redux/API/PortfolioApi"
import { IconArrowsExchange, IconBrandWhatsapp, IconClock, IconEdit, IconEye, IconLink, IconMail, IconPhone, IconTrash, IconX } from "@tabler/icons-react"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { BoltIcon, CircleUserRoundIcon, Layers2Icon } from "lucide-react";
import { useNavigate } from "react-router-dom";

const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.3 } },
};

const modalVariants = {
    hidden: { opacity: 0, y: "-50px", scale: 0.8 },
    visible: { opacity: 1, y: "0", scale: 1, transition: { duration: 0.4, type: "spring", stiffness: 300 } },
    exit: { opacity: 0, y: "50px", scale: 0.8, transition: { duration: 0.3 } },
};

const RecycledPortfolio = () => {
    const navigate = useNavigate()
    const { data } = useGetRecycledPortfolioQuery({})
    const [deleteModalActive, setDeleteModalActive] = useState(false)
    const [recycleId, setRecycleId] = useState('')
    const [recyclePortfolio, { isLoading }] = useRecyclePortfolioMutation()

    const handleRecycle = async (id: string) => {
        const res = await recyclePortfolio({ id }).unwrap()
        console.log(res)
    }

    console.log(data)

    return (
        <HomeLayout>
            <div>
                Recycled portfolio
            </div>

            <AnimatePresence>
                {deleteModalActive && (
                    <motion.div
                        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-start pt-30 justify-center"
                        variants={backdropVariants}
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                    >
                        <motion.div
                            className="relative w-full max-w-[35rem] rounded-sm  bg-gradient-to-b from-gray-900 via-gray-950 to-black p-4 text-white border border-[#DC0030]/20 shadow-lg"
                            variants={modalVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                        >
                            <button
                                className="absolute top-3 right-3 text-gray-400 hover:text-white transition"
                                onClick={() => setDeleteModalActive(false)}
                            >
                                <IconX size={24} />
                            </button>
                            <div className="flex items-center gap-3 mb-4">
                                <IconTrash className="text-[#E11D48] text-2xl" />
                                <h2 className="text-lg font-semibold">You’re about to delete this page</h2>
                            </div>
                            <p className="text-gray-100 mb-2">
                                Before you delete it permanently, there’s some things you should know:
                            </p>
                            <ul className="text-gray-300 list-disc pl-6">
                                <li>If you delete a page, it will be moved to the &quot;Recycle bin&quot;.</li>
                            </ul>
                            <div className="mt-6 flex justify-end gap-4">
                                <button
                                    onClick={() => setDeleteModalActive(false)}
                                    className="text-gray-300 hover:text-white px-4 py-1.5 rounded bg-neutral-900 transition"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={() => handleRecycle(recycleId)}
                                    className="bg-[#dc0030] flex items-center gap-2 cursor-pointer hover:bg-[#dc0030e1] text-white px-3 py-1.5 rounded transition"
                                >
                                    <IconTrash />
                                    Delete
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mx-auto">
                {
                    data?.data.map((item: any) => (
                        <div key={item._id} className="group relative max-w-[40rem] mx-auto w-full">
                            <div
                                className="absolute rounded- bg-gradient-to-r from-[#E11D48] via-[#E11D48] to-orange-500 opacity-10 blur-sm transition-all duration-500 group-hover:opacity-80 group-hover:blur-lg"
                            ></div>
                            <div
                                className="relative rounded-xl w-full border border-white/20 bg-gradient-to-b from-gray-900 via-gray-950 to-black p-3 shadow-md"
                            >
                                <div
                                    className="absolute inset-x-0 top-px h-px bg-gradient-to-r from-transparent via-rose-500 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                                ></div>
                                <div
                                    className="absolute inset-x-0 bottom-px h-px bg-gradient-to-r from-transparent via-orange-500 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                                ></div>
                                <div className="relative flex items-center justify-between gap-6">
                                    <div className="flex items-center gap-4">
                                        <div className="relative flex h-12 w-12 items-center justify-center">
                                            <div
                                                className="absolute inset-0 rounded-full border border-rose-500/20 border-t-rose-500 transition-transform duration-1000 group-hover:rotate-180"
                                            >
                                            </div>
                                            <img src={item.image.url} alt="Portfolio profile image" className="h-full w-full rounded-full object-cover" />
                                            {/* <div className="absolute inset-[3px] rounded-full bg-gray-950"></div>
                                        <span className="relative text-sm font-bold text-rose-500">L24</span> */}
                                        </div>

                                        <div className="flex flex-col gap-1">
                                            <div className="flex flex-col items-start">
                                                <div className="flex items-center gap-2">
                                                    <h2 className="text-base leading-4 font-bold text-white">{item?.fullName}</h2>
                                                    <div
                                                        className="h-1.5 w-1.5 rounded-full bg-green-500 shadow-lg shadow-green-500/50"
                                                    ></div>
                                                </div>
                                                <p className="text-white text-sm">{item?.tagline}</p>
                                            </div>

                                            <div className="h-1 w-32 overflow-hidden rounded-full bg-gray-800">
                                                <div
                                                    className="h-full w-2/3 rounded-full bg-gradient-to-r from-green-700 to-green-400 transition-all duration-300 group-hover:w-full"
                                                ></div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-3">
                                        <div className="flex flex-col items-center gap-1">
                                            <div className="flex gap-1">
                                                <div
                                                    className={`h-2 w-2 rounded-full  transition-all duration-300 ${(item?.isActive) ? "bg-red-500/20" : "bg-red-500"}`}
                                                ></div>
                                                <div
                                                    className={`h-2 w-2 rounded-full  transition-all duration-300 ${(item?.isPaid) ? "bg-orange-500/20" : "bg-orange-500"}`}
                                                ></div>
                                                <div
                                                    className={`h-2 w-2 rounded-full  transition-all duration-300 ${!(item?.isActive) ? "bg-green-500/20" : "bg-green-500"}`}
                                                ></div>
                                            </div>
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button size="icon" className="bg-[#010205] " aria-label="Open account menu">
                                                        <CircleUserRoundIcon size={16} aria-hidden="true" />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent className="max-w-38">
                                                    <DropdownMenuLabel className="flex items-start gap-3">

                                                        <div className="flex min-w-0 flex-col">
                                                            <span className=" truncate text-sm font-medium text-zinc-50">Update Status</span>
                                                            <span className="text-zinc-500 truncate text-xs font-normal dark:text-zinc-400">
                                                                @{item?.userName}
                                                            </span>
                                                        </div>
                                                    </DropdownMenuLabel>
                                                    <DropdownMenuSeparator />
                                                    <DropdownMenuGroup>
                                                        <DropdownMenuItem className="hover:bg-neutral-950 cursor-pointer">
                                                            <BoltIcon size={16} className="opacity-60" aria-hidden="true" />
                                                            <span>Mark as {item?.isActive ? "Inactive" : "Active"}</span>
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem className="hover:bg-neutral-950 cursor-pointer">

                                                            <Layers2Icon size={16} className="opacity-60" aria-hidden="true" />
                                                            <span>Mark as {item?.isPaid ? "Unpaid" : "Paid"}</span>
                                                        </DropdownMenuItem>

                                                    </DropdownMenuGroup>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </div>
                                    </div>
                                </div>

                                <div className="text-white flex flex-col gap-2 ml-1 mt-4">
                                    <div className="flex sm:flex-row flex-col md:flex-col  gap-2 justify-between">
                                        <div onClick={() => window.open(`mailto:${item.email}`)} className="items-center cursor-pointer flex gap-2">
                                            <div
                                                className="relative flex h-8 w-8 items-center justify-center rounded bg-[#FBBC04]/20"
                                            >
                                                <IconMail className="text-[#FBBC04]" />
                                            </div>
                                            <span className="text-sm font-semibold">{item.email}</span>
                                        </div>
                                        <div onClick={() => window.open(`tel:${item.phoneNumber}`)} className="items-center flex gap-2 cursor-pointer">
                                            <div className="items-center flex gap-2">
                                                <div
                                                    className="relative flex h-8 w-8 items-center justify-center rounded bg-purple-700/20"
                                                >
                                                    <IconPhone className="text-purple-600" />
                                                </div>
                                                <span className="text-sm font-semibold">{item.phoneNumber}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div onClick={() => window.open(`tel:${item.phoneNumber}`)} className="items-center flex gap-2 cursor-pointer">
                                        <div
                                            className="relative flex h-8 min-w-8 items-center justify-center rounded bg-purple-700/20"
                                        >
                                            <IconClock className="text-purple-600" />
                                        </div>
                                        <div className="flex items-center justify-between w-full gap-1">
                                            <span className="text-sm font-semibold text-white">
                                                {new Intl.DateTimeFormat('en-US', { day: 'numeric', month: 'short', year: 'numeric' }).format(new Date(item?.paidDate.split("T")[0]))}
                                            </span>

                                            <IconArrowsExchange />

                                            <span className="text-sm font-semibold text-white">
                                                {new Intl.DateTimeFormat('en-US', { day: 'numeric', month: 'short', year: 'numeric' }).format(new Date(new Date(item?.paidDate.split("T")[0]).setFullYear(new Date(item?.paidDate.split("T")[0]).getFullYear() + 1)))}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center justify-evenly gap-4 mt-4 ">
                                    <div onClick={() => window.open(`https://wa.me/${Number(item?.whatsappNo)}`, '_blank')} className="relative cursor-pointer flex size-10 items-center justify-center group/inner">
                                        <div className="absolute inset-0 rounded-full border border-green-500/20 border-t-green-500 transition-transform duration-1000 group-hover/inner:rotate-180">
                                        </div>
                                        <div className="absolute inset-[3px] rounded-full bg-gray-950"></div>
                                        <span className="relative text-sm font-bold text-green-500"><IconBrandWhatsapp /></span>
                                    </div>

                                    <div onClick={() => window.open(``)} className="relative cursor-pointer flex size-10 items-center justify-center group/inner">
                                        <div
                                            className="absolute inset-0 rounded-full border border-amber-400/20 border-t-amber-400 transition-transform duration-1000 group-hover/inner:rotate-180"
                                        >
                                        </div>
                                        <div className="absolute inset-[3px] rounded-full bg-gray-950"></div>
                                        <span className="relative text-sm font-bold text-amber-400"><IconLink /></span>
                                    </div>
                                    <div onClick={() => {
                                        setRecycleId(item._id)
                                        setDeleteModalActive(true)
                                    }} className="relative cursor-pointer flex size-10 items-center justify-center group/inner">
                                        <div
                                            className="absolute inset-0 rounded-full border border-[#E11D48]/20 border-t-[#E11D48] transition-transform duration-1000 group-hover/inner:rotate-180"
                                        >
                                        </div>
                                        <div className="absolute inset-[3px] rounded-full bg-gray-950"></div>
                                        <span className="relative text-sm font-bold text-[#E11D48]"><IconTrash /></span>
                                    </div>
                                    <div onClick={() => navigate(`/edit-portfolio/${item?.userName}`)} className="relative cursor-pointer flex size-10 items-center justify-center group/inner">
                                        <div
                                            className="absolute inset-0 rounded-full border border-amber-400/20 border-t-purple-400 transition-transform duration-1000 group-hover/inner:rotate-180"
                                        >
                                        </div>
                                        <div className="absolute inset-[3px] rounded-full bg-gray-950"></div>
                                        <span className="relative text-sm font-bold text-purple-400"><IconEye /></span>
                                    </div>

                                    <div className="relative cursor-pointer flex size-10 items-center justify-center group/inner">
                                        <div
                                            className="absolute inset-0 rounded-full border border-amber-400/20 border-t-purple-400 transition-transform duration-1000 group-hover/inner:rotate-180"
                                        >
                                        </div>
                                        <div className="absolute inset-[3px] rounded-full bg-gray-950"></div>
                                        <span className="relative text-sm font-bold text-purple-400"><IconEdit /></span>
                                    </div>
                                </div>
                            </div>


                        </div>
                    ))
                }
            </div>


        </HomeLayout>
    )
}

export default RecycledPortfolio
