import { HomeLayout } from "@/Layout/HomeLayout";
import {
  useDeletePortfolioMutation,
  useGetRecycledPortfolioQuery,
  useRestorePortfolioMutation,
} from "@/Redux/API/PortfolioApi";
import {
  IconArrowsExchange,
  IconBrandWhatsapp,
  IconClock,
  IconEdit,
  IconMail,
  IconPhone,
  IconRestore,
  IconTrash,
  IconWhirl,
  IconX,
} from "@tabler/icons-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { BoltIcon, CircleUserRoundIcon, Layers2Icon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { apiRes } from "@/validations/PortfolioValidation";

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.3 } },
};

const modalVariants = {
  hidden: { opacity: 0, y: "-50px", scale: 0.8 },
  visible: {
    opacity: 1,
    y: "0",
    scale: 1,
    transition: {
      duration: 0.4,
      type: "spring" as const,
      stiffness: 300,
    },
  },
  exit: { opacity: 0, y: "50px", scale: 0.8, transition: { duration: 0.3 } },
};

const RecycledPortfolio = () => {
  const navigate = useNavigate();
  const [restoreModalActive, setRestoreModalActive] = useState(false);
  const [deleteModalActive, setDeleteModalActive] = useState(false);
  const [id, setId] = useState("");
  const [restorePortfolio, { isLoading: restoreLoading }] =
    useRestorePortfolioMutation();
  const [deletePortfolio, { isLoading: deleteLoading }] =
    useDeletePortfolioMutation();
  // const [debouncedSearchValue, setDebouncedSearchValue] = useState('')
  // const [filterValue, setFilterValue] = useState('')
  const { data, isLoading } = useGetRecycledPortfolioQuery({});

  console.log(data);

  const handleRestore = async (id: string) => {
    const res = (await restorePortfolio({ id }).unwrap()) as apiRes;
    if (res?.success) {
      setRestoreModalActive(false);
      setId("");
    }
  };

  const handleDelete = async (id: string) => {
    const res = (await deletePortfolio({ id }).unwrap()) as apiRes;
    if (res?.success) {
      setDeleteModalActive(false);
      setId("");
    }
  };

  // const getPortfolio = async () => {
  //     await refetch()
  // }

  // useEffect(() => {
  //     getPortfolio()
  // }, [debouncedSearchValue, filterValue])

  return (
    <HomeLayout pageName="Recycled Portfolio">
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
                <h2 className="text-lg font-semibold">
                  You’re about to delete this page
                </h2>
              </div>
              <p className="mb-2 text-gray-100">
                Before you delete it permanently, there’s some things you should
                know:
              </p>
              <ul className="pl-6 text-gray-300 list-disc">
                <li>
                  If you delete a page, it will be moved to the &quot;Recycle
                  bin&quot;.
                </li>
              </ul>
              <div className="flex justify-end gap-4 mt-6">
                <button
                  onClick={() => setDeleteModalActive(false)}
                  className="text-gray-300 hover:text-white px-4 py-1.5 rounded bg-neutral-900 transition"
                >
                  Cancel
                </button>
                <button
                  disabled={deleteLoading}
                  onClick={() => handleDelete(id)}
                  className="bg-[#dc0030] flex items-center gap-2 cursor-pointer hover:bg-[#dc0030e1] text-white w-[6.3rem] px-3 py-1.5 rounded transition"
                >
                  {deleteLoading ? (
                    <IconWhirl className="animate-spin" />
                  ) : (
                    <>
                      <IconTrash />
                      <span>Delete</span>
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {restoreModalActive && (
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
                onClick={() => setRestoreModalActive(false)}
              >
                <IconX size={24} />
              </button>
              <div className="flex items-center gap-3 mb-4">
                <IconRestore className="text-[#34D399] text-2xl" />
                <h2 className="text-lg font-semibold">
                  You’re about to restore this page
                </h2>
              </div>
              <p className="mb-2 text-gray-100">
                Before you restore it, there’s some things you should know:
              </p>
              <ul className="pl-6 text-gray-300 list-disc">
                <li>
                  The page will be restored to its original state and will be
                  marked as active.
                </li>
              </ul>
              <div className="flex justify-end gap-4 mt-6">
                <button
                  onClick={() => setRestoreModalActive(false)}
                  className="text-gray-300 hover:text-white px-4 py-1.5 rounded bg-neutral-900 transition"
                >
                  Cancel
                </button>
                <button
                  disabled={restoreLoading}
                  onClick={() => handleRestore(id)}
                  className="bg-[#00a838] flex items-center gap-2 cursor-pointer hover:bg-[#00a838e1] text-white px-3 py-1.5 rounded transition"
                >
                  {restoreLoading ? (
                    <IconWhirl className="animate-spin" />
                  ) : (
                    <>
                      <IconRestore />
                      <span>Restore</span>
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <div className="grid grid-cols-1 gap-6 mx-auto md:grid-cols-2 lg:grid-cols-3">
        {isLoading
          ? Array.from({ length: 12 }).map((_, index) => {
              return (
                <div
                  key={index}
                  className="group relative max-w-[40rem] mx-auto w-full animate-pulse"
                >
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
                      {Array(5)
                        .fill(0)
                        .map((_, i) => (
                          <div
                            key={i}
                            className="relative flex items-center justify-center bg-gray-700 rounded-full size-10"
                          ></div>
                        ))}
                    </div>
                  </div>
                </div>
              );
            })
          : data?.data.map((item: any) => (
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
                  key={item._id}
                  className="group relative max-w-[40rem] mx-auto w-full"
                >
                  <div className="absolute rounded- bg-gradient-to-r from-[#E11D48] via-[#E11D48] to-orange-500 opacity-10 blur-sm transition-all duration-500 group-hover:opacity-80 group-hover:blur-lg"></div>
                  <div className="relative w-full p-3 border shadow-md rounded-xl border-white/20 bg-gradient-to-b from-gray-900 via-gray-950 to-black">
                    <div className="absolute inset-x-0 h-px transition-opacity duration-500 opacity-0 top-px bg-gradient-to-r from-transparent via-rose-500 to-transparent group-hover:opacity-100"></div>
                    <div className="absolute inset-x-0 h-px transition-opacity duration-500 opacity-0 bottom-px bg-gradient-to-r from-transparent via-orange-500 to-transparent group-hover:opacity-100"></div>
                    <div className="relative flex items-center justify-between gap-6">
                      <div className="flex items-center gap-4">
                        <div className="relative flex items-center justify-center w-12 h-12">
                          <div className="absolute inset-0 transition-transform duration-1000 border rounded-full border-rose-500/20 border-t-rose-500 group-hover:rotate-180"></div>
                          <img
                            src={item.image.url}
                            alt="Portfolio profile image"
                            className="object-cover w-full h-full rounded-full"
                          />
                          {/* <div className="absolute inset-[3px] rounded-full bg-gray-950"></div>
                                        <span className="relative text-sm font-bold text-rose-500">L24</span> */}
                        </div>

                        <div className="flex flex-col gap-1">
                          <div className="flex flex-col items-start">
                            <div className="flex items-center gap-2">
                              <h2 className="text-base font-bold leading-4 text-white">
                                {item?.fullName}
                              </h2>
                              <div className="h-1.5 w-1.5 rounded-full bg-green-500 shadow-lg shadow-green-500/50"></div>
                            </div>
                            {/* <p className="text-sm text-white">{item?.tagline}</p> */}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="flex flex-col items-center gap-1">
                          <div className="flex gap-1">
                            <div
                              className={`h-2 w-2 rounded-full  transition-all duration-300 ${
                                item?.isActive ? "bg-red-500/20" : "bg-red-500"
                              }`}
                            ></div>
                            <div
                              className={`h-2 w-2 rounded-full  transition-all duration-300 ${
                                item?.isPaid
                                  ? "bg-orange-500/20"
                                  : "bg-orange-500"
                              }`}
                            ></div>
                            <div
                              className={`h-2 w-2 rounded-full  transition-all duration-300 ${
                                !item?.isActive
                                  ? "bg-green-500/20"
                                  : "bg-green-500"
                              }`}
                            ></div>
                          </div>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button
                                size="icon"
                                className="bg-[#010205] "
                                aria-label="Open account menu"
                              >
                                <CircleUserRoundIcon
                                  size={16}
                                  aria-hidden="true"
                                />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="max-w-38">
                              <DropdownMenuLabel className="flex items-start gap-3">
                                <div className="flex flex-col min-w-0">
                                  <span className="text-sm font-medium truncate text-zinc-50">
                                    Update Status
                                  </span>
                                  <span className="text-xs font-normal truncate text-zinc-500 dark:text-zinc-400">
                                    @{item?.userName}
                                  </span>
                                </div>
                              </DropdownMenuLabel>
                              <DropdownMenuSeparator />
                              <DropdownMenuGroup>
                                <DropdownMenuItem className="cursor-pointer hover:bg-neutral-950">
                                  <BoltIcon
                                    size={16}
                                    className="opacity-60"
                                    aria-hidden="true"
                                  />
                                  <span>
                                    Mark as{" "}
                                    {item?.isActive ? "Inactive" : "Active"}
                                  </span>
                                </DropdownMenuItem>
                                <DropdownMenuItem className="cursor-pointer hover:bg-neutral-950">
                                  <Layers2Icon
                                    size={16}
                                    className="opacity-60"
                                    aria-hidden="true"
                                  />
                                  <span>
                                    Mark as {item?.isPaid ? "Unpaid" : "Paid"}
                                  </span>
                                </DropdownMenuItem>
                              </DropdownMenuGroup>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col gap-2 mt-4 ml-1 text-white">
                      <div className="flex flex-col justify-between gap-2 sm:flex-row md:flex-col">
                        <div
                          onClick={() => window.open(`mailto:${item.email}`)}
                          className="flex items-center gap-2 cursor-pointer"
                        >
                          <div className="relative flex h-8 w-8 items-center justify-center rounded bg-[#FBBC04]/20">
                            <IconMail className="text-[#FBBC04]" />
                          </div>
                          <span className="text-sm font-semibold">
                            {item.email}
                          </span>
                        </div>
                        <div
                          onClick={() => window.open(`tel:${item.phoneNumber}`)}
                          className="flex items-center gap-2 cursor-pointer"
                        >
                          <div className="flex items-center gap-2">
                            <div className="relative flex items-center justify-center w-8 h-8 rounded bg-purple-700/20">
                              <IconPhone className="text-purple-600" />
                            </div>
                            <span className="text-sm font-semibold">
                              {item.phoneNumber}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div
                        onClick={() => window.open(`tel:${item.phoneNumber}`)}
                        className="flex items-center gap-2 cursor-pointer"
                      >
                        <div className="relative flex items-center justify-center h-8 rounded min-w-8 bg-purple-700/20">
                          <IconClock className="text-purple-600" />
                        </div>
                        <div className="flex items-center justify-between w-full gap-1">
                          <span className="text-sm font-semibold text-white">
                            {new Intl.DateTimeFormat("en-US", {
                              day: "numeric",
                              month: "short",
                              year: "numeric",
                            }).format(new Date(item?.paidDate.split("T")[0]))}
                          </span>

                          <IconArrowsExchange />

                          <span className="text-sm font-semibold text-white">
                            {new Intl.DateTimeFormat("en-US", {
                              day: "numeric",
                              month: "short",
                              year: "numeric",
                            }).format(
                              new Date(
                                new Date(
                                  item?.paidDate.split("T")[0]
                                ).setFullYear(
                                  new Date(
                                    item?.paidDate.split("T")[0]
                                  ).getFullYear() + 1
                                )
                              )
                            )}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 mt-4 justify-evenly ">
                      <div
                        onClick={() =>
                          window.open(
                            `https://wa.me/${Number(item?.whatsappNo)}`,
                            "_blank"
                          )
                        }
                        className="relative flex items-center justify-center cursor-pointer size-10 group/inner"
                      >
                        <div className="absolute inset-0 transition-transform duration-1000 border rounded-full border-green-500/20 border-t-green-500 group-hover/inner:rotate-180"></div>
                        <div className="absolute inset-[3px] rounded-full bg-gray-950"></div>
                        <span className="relative text-sm font-bold text-green-500">
                          <IconBrandWhatsapp />
                        </span>
                      </div>

                      <div
                        onClick={() => {
                          setId(item._id);
                          setRestoreModalActive(true);
                        }}
                        className="relative flex items-center justify-center cursor-pointer size-10 group/inner"
                      >
                        <div className="absolute inset-0 transition-transform duration-1000 border rounded-full border-amber-400/20 border-t-amber-400 group-hover/inner:rotate-180"></div>
                        <div className="absolute inset-[3px] rounded-full bg-gray-950"></div>
                        <span className="relative text-sm font-bold text-amber-400">
                          <IconRestore />
                        </span>
                      </div>
                      <div
                        onClick={() => {
                          setId(item._id);
                          setDeleteModalActive(true);
                        }}
                        className="relative flex items-center justify-center cursor-pointer size-10 group/inner"
                      >
                        <div className="absolute inset-0 rounded-full border border-[#E11D48]/20 border-t-[#E11D48] transition-transform duration-1000 group-hover/inner:rotate-180"></div>
                        <div className="absolute inset-[3px] rounded-full bg-gray-950"></div>
                        <span className="relative text-sm font-bold text-[#E11D48]">
                          <IconTrash />
                        </span>
                      </div>
                      {/* <div onClick={() => navigate(`/edit-portfolio/${item?.userName}`)} className="relative flex items-center justify-center cursor-pointer size-10 group/inner">
                                            <div
                                                className="absolute inset-0 transition-transform duration-1000 border rounded-full border-amber-400/20 border-t-purple-400 group-hover/inner:rotate-180"
                                            >
                                            </div>
                                            <div className="absolute inset-[3px] rounded-full bg-gray-950"></div>
                                            <span className="relative text-sm font-bold text-purple-400"><IconEye /></span>
                                        </div> */}

                      <div
                        onClick={() =>
                          navigate(`/edit-portfolio/${item?.userName}`)
                        }
                        className="relative flex items-center justify-center cursor-pointer size-10 group/inner"
                      >
                        <div className="absolute inset-0 transition-transform duration-1000 border rounded-full border-amber-400/20 border-t-purple-400 group-hover/inner:rotate-180"></div>
                        <div className="absolute inset-[3px] rounded-full bg-gray-950"></div>
                        <span className="relative text-sm font-bold text-purple-400">
                          <IconEdit />
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            ))}
      </div>
    </HomeLayout>
  );
};

export default RecycledPortfolio;
