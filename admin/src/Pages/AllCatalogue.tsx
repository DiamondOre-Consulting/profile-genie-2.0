import { HomeLayout } from "@/Layout/HomeLayout"
import { IconArrowsExchange, IconBrandWhatsapp, IconClock, IconEdit, IconEye, IconFidgetSpinner, IconLink, IconMail, IconPhone, IconTrash, IconWhirl, IconX } from "@tabler/icons-react"
import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { BoltIcon, CircleUserRoundIcon, Layers2Icon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Search from "@/components/search";
import Filter from "@/components/Filter";
import { useGetAllCataloguesQuery, useRecycleCatalogueMutation, useUpdateActiveStatusMutation, useUpdatePaidStatusMutation } from "@/Redux/API/CatalogueApi";

const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.3 } },
};

const modalVariants = {
    hidden: { opacity: 0, y: "-50px", scale: 0.8 },
    visible: { opacity: 1, y: "0", scale: 1, transition: { duration: 0.4, type: "spring", stiffness: 300 } },
    exit: { opacity: 0, y: "50px", scale: 0.8, transition: { duration: 0.3 } },
};

const AllCatalogue = () => {
    const navigate = useNavigate()
    const [debouncedSearchValue, setDebouncedSearchValue] = useState('')
    const [filterValue, setFilterValue] = useState('')
    const { data, isLoading, refetch } = useGetAllCataloguesQuery({ search: debouncedSearchValue, filter: filterValue })
    const [deleteModalActive, setDeleteModalActive] = useState(false)
    const [recycleId, setRecycleId] = useState('')
    const [updateActiveStatus, { isLoading: activeLoading }] = useUpdateActiveStatusMutation()
    const [updatePaidStatus, { isLoading: paidLoading }] = useUpdatePaidStatusMutation()
    const [recycleCatalogue, { isLoading: recycleLoading }] = useRecycleCatalogueMutation()

    const handleRecycle = async (id: string) => {
        const res = await recycleCatalogue({ id }).unwrap()
        if (res?.success) {
            setDeleteModalActive(false)
            setRecycleId('')
        }
    }

    const getPortfolio = async () => {
        await refetch()
    }

    useEffect(() => {
        getPortfolio()
    }, [debouncedSearchValue, filterValue])

    const handleUpdateStatus = async (id: string, type: string) => {
        if (type === "isActive") {
            await updateActiveStatus({ id }).unwrap()
        } else if (type === "isPaid") {
            await updatePaidStatus({ id }).unwrap()
        }
    }

    return (
        <HomeLayout>
            <h2 className="mb-3 font-semibold text-white">
                All Catalogue
            </h2>

            <div className="flex items-center justify-center gap-1 my-2 ">
                <Search setDebouncedSearchValue={setDebouncedSearchValue} />
                <Filter setFilterValue={setFilterValue} />
            </div>

            <AnimatePresence>
                {deleteModalActive && (
                    <motion.div
                        className="fixed inset-0 z-50 flex items-start justify-center bg-black/50 backdrop-blur-sm pt-30"
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
                                className="absolute text-gray-400 transition top-3 right-3 hover:text-white"
                                onClick={() => setDeleteModalActive(false)}
                            >
                                <IconX size={24} />
                            </button>
                            <div className="flex items-center gap-3 mb-4">
                                <IconTrash className="text-[#E11D48] text-2xl" />
                                <h2 className="text-lg font-semibold">You’re about to delete this page</h2>
                            </div>
                            <p className="mb-2 text-gray-100">
                                Before you delete it permanently, there’s some things you should know:
                            </p>
                            <ul className="pl-6 text-gray-300 list-disc">
                                <li>If you delete a page, it will be moved to the &quot;Recycle bin&quot;.</li>
                            </ul>
                            <div className="flex justify-end gap-4 mt-6">
                                <button
                                    disabled={recycleLoading}
                                    onClick={() => setDeleteModalActive(false)}
                                    className="text-gray-300 hover:text-white px-4 py-1.5 rounded bg-neutral-900 transition"
                                >
                                    Cancel
                                </button>
                                <button
                                    disabled={recycleLoading}
                                    onClick={() => handleRecycle(recycleId)}
                                    className="bg-[#dc0030] flex items-center gap-2 cursor-pointer hover:bg-[#dc0030e1] text-white w-[6.3rem] px-3 py-1.5 rounded transition"
                                >
                                    {recycleLoading ? <IconWhirl className="animate-spin" /> : <>
                                        <IconTrash />
                                        <span>Delete</span>
                                    </>}
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="grid grid-cols-1 gap-6 mx-auto md:grid-cols-2 lg:grid-cols-3">
                {isLoading ?
                    Array.from({ length: 12 }).map((_, index) => {
                        return (<div key={index} className="group relative max-w-[40rem] mx-auto w-full animate-pulse">
                            <div className="absolute rounded-xl bg-gradient-to-r from-[#E11D48] via-[#E11D48] to-orange-500 opacity-10 blur-sm"></div>
                            <div className="relative w-full p-3 border shadow-md rounded-xl border-white/20 bg-gradient-to-b from-gray-900 via-gray-950 to-black">
                                <div className="relative flex items-center justify-between gap-6">
                                    <div className="flex items-center gap-4">
                                        <div className="relative flex items-center justify-center w-12 h-12">
                                            <div className="absolute inset-0 border rounded-full border-rose-500/20 border-t-rose-500"></div>
                                            <div className="w-12 h-12 bg-gray-700 rounded-full"></div>
                                        </div>

                                        <div className="flex flex-col gap-1">
                                            <div className="w-32 h-4 bg-gray-700 rounded"></div>
                                            <div className="w-20 h-3 bg-gray-700 rounded"></div>
                                        </div>
                                    </div>

                                    <div className="flex gap-2">
                                        <div className="w-2 h-2 bg-gray-700 rounded-full"></div>
                                        <div className="w-2 h-2 bg-gray-700 rounded-full"></div>
                                        <div className="w-2 h-2 bg-gray-700 rounded-full"></div>
                                    </div>
                                </div>

                                {/* Contact Details */}
                                <div className="flex flex-col gap-2 mt-4 ml-1">
                                    <div className="flex flex-col justify-between gap-2 sm:flex-row md:flex-col">
                                        <div className="flex gap-2">
                                            <div className="w-8 h-8 bg-gray-700 rounded"></div>
                                            <div className="h-4 bg-gray-700 rounded w-28"></div>
                                        </div>
                                        <div className="flex gap-2">
                                            <div className="w-8 h-8 bg-gray-700 rounded"></div>
                                            <div className="h-4 bg-gray-700 rounded w-28"></div>
                                        </div>
                                    </div>

                                    {/* Date Range */}
                                    <div className="flex items-center justify-between w-full gap-1">
                                        <div className="w-20 h-4 bg-gray-700 rounded"></div>
                                        <div className="w-6 h-4 bg-gray-700 rounded"></div>
                                        <div className="w-20 h-4 bg-gray-700 rounded"></div>
                                    </div>
                                </div>

                                {/* Action Buttons */}
                                <div className="flex items-center gap-4 mt-4 justify-evenly">
                                    {Array(5).fill(0).map((_, i) => (
                                        <div key={i} className="relative flex items-center justify-center bg-gray-700 rounded-full size-10"></div>
                                    ))}
                                </div>
                            </div>
                        </div>)
                    }) :
                    data?.data.map((item: any) => (
                        <AnimatePresence key={item?._id}>
                            <motion.div
                                layout
                                initial={{ opacity: 0, scale: 0.95, y: 50 }}
                                animate={{
                                    opacity: 1,
                                    scale: 1,
                                    y: 0,
                                    transition: { type: "spring", stiffness: 150, damping: 20 },
                                }}
                                exit={{
                                    opacity: 0,
                                    y: -20,
                                    scale: 0.95,
                                    transition: { duration: 0.3, ease: "easeInOut" },
                                }}
                                key={item._id} className="group relative max-w-[40rem] mx-auto w-full">
                                <div
                                    className="absolute rounded- bg-gradient-to-r from-[#E11D48] via-[#E11D48] to-orange-500 opacity-10 blur-sm transition-all duration-500 group-hover:opacity-80 group-hover:blur-lg"
                                ></div>
                                <div
                                    className="relative w-full p-3 border shadow-md rounded-xl border-white/20 bg-gradient-to-b from-gray-900 via-gray-950 to-black"
                                >
                                    <div
                                        className="absolute inset-x-0 h-px transition-opacity duration-500 opacity-0 top-px bg-gradient-to-r from-transparent via-rose-500 to-transparent group-hover:opacity-100"
                                    ></div>
                                    <div
                                        className="absolute inset-x-0 h-px transition-opacity duration-500 opacity-0 bottom-px bg-gradient-to-r from-transparent via-orange-500 to-transparent group-hover:opacity-100"
                                    ></div>
                                    <div className="relative flex items-center justify-between gap-6">
                                        <div className="flex items-center gap-4">
                                            <div className="relative flex items-center justify-center w-12 h-12">
                                                <div
                                                    className="absolute inset-0 transition-transform duration-1000 border rounded-full border-rose-500/20 border-t-rose-500 group-hover:rotate-180"
                                                >
                                                </div>
                                                <img src={item?.logo?.url} alt="Portfolio profile image" className="object-cover w-full h-full rounded-full" />
                                                {/* <div className="absolute inset-[3px] rounded-full bg-gray-950"></div>
                                        <span className="relative text-sm font-bold text-rose-500">L24</span> */}
                                            </div>

                                            <div className="flex flex-col gap-1">
                                                <div className="flex flex-col items-start">
                                                    <div className="flex items-center gap-2">
                                                        <h2 className="text-base font-bold leading-4 text-white">{item?.ownerDetails?.authAccountDetails?.fullName}</h2>
                                                        <div
                                                            className="h-1.5 w-1.5 rounded-full bg-green-500 shadow-lg shadow-green-500/50"
                                                        ></div>
                                                    </div>
                                                    <p className="text-neutral-300 text-sm w-[10rem] truncate">{item?.name}</p>
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
                                                            {(activeLoading || paidLoading) ? <IconFidgetSpinner className="animate-spin" /> : <CircleUserRoundIcon size={16} aria-hidden="true" />}
                                                        </Button>
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent className="max-w-38">
                                                        <DropdownMenuLabel className="flex items-start gap-3">

                                                            <div className="flex flex-col min-w-0">
                                                                <span className="text-sm font-medium truncate text-zinc-50">Update Status</span>
                                                                <span className="text-xs font-normal truncate text-zinc-500 dark:text-zinc-400">
                                                                    @{item?.userName}
                                                                </span>
                                                            </div>
                                                        </DropdownMenuLabel>
                                                        <DropdownMenuSeparator />
                                                        <DropdownMenuGroup>
                                                            <DropdownMenuItem onClick={() => handleUpdateStatus(item?._id, "isActive")} className="cursor-pointer hover:bg-neutral-950">
                                                                <BoltIcon size={16} className="opacity-60" aria-hidden="true" />
                                                                <span>Mark as {item?.isActive ? "Inactive" : "Active"}</span>
                                                            </DropdownMenuItem>
                                                            {!item.isPaid && <DropdownMenuItem onClick={() => handleUpdateStatus(item?._id, "isPaid")} className="cursor-pointer hover:bg-neutral-950">

                                                                <Layers2Icon size={16} className="opacity-60" aria-hidden="true" />
                                                                <span>Mark as Paid</span>
                                                            </DropdownMenuItem>}

                                                        </DropdownMenuGroup>
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex flex-col gap-2 mt-4 ml-1 text-white">
                                        <div className="flex flex-col justify-between gap-2 sm:flex-row md:flex-col">
                                            <div onClick={() => window.open(`mailto:${item.email}`)} className="flex items-center gap-2 cursor-pointer">
                                                <div
                                                    className="relative flex h-8 w-8 items-center justify-center rounded bg-[#FBBC04]/20"
                                                >
                                                    <IconMail className="text-[#FBBC04]" />
                                                </div>
                                                <span className="text-sm font-semibold">{item?.ownerDetails?.authAccountDetails?.email}</span>
                                            </div>
                                            <div onClick={() => window.open(`tel:${item?.phoneNumber}`)} className="flex items-center gap-2 cursor-pointer">
                                                <div className="flex items-center gap-2">
                                                    <div
                                                        className="relative flex items-center justify-center w-8 h-8 rounded bg-purple-700/20"
                                                    >
                                                        <IconPhone className="text-purple-600" />
                                                    </div>
                                                    <span className="text-sm font-semibold">+ {item.ownerDetails?.phoneList[0]?.phone}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div onClick={() => window.open(`tel:${item.phoneNumber}`)} className="flex items-center gap-2 cursor-pointer">
                                            <div
                                                className="relative flex items-center justify-center h-8 rounded min-w-8 bg-purple-700/20"
                                            >
                                                <IconClock className="text-purple-600" />
                                            </div>
                                            <div className="flex items-center justify-between w-full gap-1">
                                                <span className="text-sm font-semibold text-white">
                                                    {new Intl.DateTimeFormat('en-US', { day: 'numeric', month: 'short', year: 'numeric' }).format(new Date(item?.paidDate))}
                                                </span>

                                                <IconArrowsExchange />

                                                <span className="text-sm font-semibold text-white">
                                                    {new Intl.DateTimeFormat('en-US', { day: 'numeric', month: 'short', year: 'numeric' }).format(new Date(new Date(item?.paidDate).setFullYear(new Date(item?.paidDate).getFullYear() + 1)))}
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-4 mt-4 justify-evenly ">
                                        <div onClick={() => window.open(`https://wa.me/${Number(item?.ownerDetails?.whatsappNo)}`, '_blank')} className="relative flex items-center justify-center cursor-pointer size-10 group/inner">
                                            <div className="absolute inset-0 transition-transform duration-1000 border rounded-full border-green-500/20 border-t-green-500 group-hover/inner:rotate-180">
                                            </div>
                                            <div className="absolute inset-[3px] rounded-full bg-gray-950"></div>
                                            <span className="relative text-sm font-bold text-green-500"><IconBrandWhatsapp /></span>
                                        </div>

                                        <div onClick={() => window.open(`https://test.profilegenie.in/catalogue/1/${item?.userName}`)} className="relative flex items-center justify-center cursor-pointer size-10 group/inner">
                                            <div
                                                className="absolute inset-0 transition-transform duration-1000 border rounded-full border-amber-400/20 border-t-amber-400 group-hover/inner:rotate-180"
                                            >
                                            </div>
                                            <div className="absolute inset-[3px] rounded-full bg-gray-950"></div>
                                            <span className="relative text-sm font-bold text-amber-400"><IconLink /></span>
                                        </div>
                                        <div onClick={() => {
                                            setRecycleId(item._id)
                                            setDeleteModalActive(true)
                                        }} className="relative flex items-center justify-center cursor-pointer size-10 group/inner">
                                            <div
                                                className="absolute inset-0 rounded-full border border-[#E11D48]/20 border-t-[#E11D48] transition-transform duration-1000 group-hover/inner:rotate-180"
                                            >
                                            </div>
                                            <div className="absolute inset-[3px] rounded-full bg-gray-950"></div>
                                            <span className="relative text-sm font-bold text-[#E11D48]"><IconTrash /></span>
                                        </div>
                                        <div onClick={() => window.open(`https://test.profilegenie.in/catalogue/1/${item?.userName}`)} className="relative flex items-center justify-center cursor-pointer size-10 group/inner">
                                            <div
                                                className="absolute inset-0 transition-transform duration-1000 border rounded-full border-amber-400/20 border-t-purple-400 group-hover/inner:rotate-180"
                                            >
                                            </div>
                                            <div className="absolute inset-[3px] rounded-full bg-gray-950"></div>
                                            <span className="relative text-sm font-bold text-purple-400"><IconEye /></span>
                                        </div>

                                        <div onClick={() => navigate(`/edit-catalogue/${item?.userName}`)} className="relative flex items-center justify-center cursor-pointer size-10 group/inner">
                                            <div className="absolute inset-0 transition-transform duration-1000 border rounded-full border-amber-400/20 border-t-purple-400 group-hover/inner:rotate-180">
                                            </div>
                                            <div className="absolute inset-[3px] rounded-full bg-gray-950"></div>
                                            <span className="relative text-sm font-bold text-purple-400"><IconEdit /></span>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    ))
                }
            </div>


        </HomeLayout>
    )
}

export default AllCatalogue
