import { HomeLayout } from "@/Layout/HomeLayout"
import { ArrowUpRight, ArrowDownRight } from "lucide-react";

const stats = [
    {
        title: "REVENUE",
        value: "$13,456",
        change: "34%",
        description: "increase compared to last month",
        icon: <ArrowUpRight className="text-green-500" />,
        bgColor: "bg-green-500/10",
        textColor: "text-green-500",
    },
    {
        title: "PROFIT",
        value: "$4,145",
        change: "-13%",
        description: "decrease compared to last month",
        icon: <ArrowDownRight className="text-red-500" />,
        bgColor: "bg-red-500/10",
        textColor: "text-red-500",
    },
    {
        title: "COUPONS USAGE",
        value: "745",
        change: "18%",
        description: "increase compared to last month",
        icon: <ArrowUpRight className="text-green-500" />,
        bgColor: "bg-green-500/10",
        textColor: "text-green-500",
    },
    {
        title: "COUPONS USAGE",
        value: "745",
        change: "18%",
        description: "increase compared to last month",
        icon: <ArrowUpRight className="text-green-500" />,
        bgColor: "bg-green-500/10",
        textColor: "text-green-500",
    },
];


const Dashboard = () => {
    return (
        <HomeLayout>

            <main className="relative h-screen overflow-hidden  rounded-2xl">
                <div className="flex items-start justify-between">

                    <div className="flex flex-col w-full pl-0 md:p-4 md:space-y-4">
                        {/* <header className="z-40 items-center w-full h-16 bg-[#171717] shadow-lg  rounded-2xl">
                            <div className="relative z-20 flex flex-col justify-center h-full px-3 mx-auto flex-center">
                                <div className="relative flex items-center w-full pl-1 lg:max-w-68 sm:pr-2 sm:ml-0">
                                    <div className="container relative left-0 z-50 flex w-3/4 h-auto h-full">
                                        <div className="relative flex items-center w-full h-full lg:w-64 group">
                                            <div className="absolute z-50 flex items-center justify-center block w-auto h-10 p-3 pr-2 text-sm text-gray-500 uppercase cursor-pointer sm:hidden">
                                                <svg fill="none" className="relative w-5 h-5" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z">
                                                    </path>
                                                </svg>
                                            </div>
                                            <svg className="absolute left-0 z-20 hidden w-4 h-4 ml-4 text-gray-500 pointer-events-none fill-current group-hover:text-gray-400 sm:block" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                                <path d="M12.9 14.32a8 8 0 1 1 1.41-1.41l5.35 5.33-1.42 1.42-5.33-5.34zM8 14A6 6 0 1 0 8 2a6 6 0 0 0 0 12z">
                                                </path>
                                            </svg>
                                            <input type="text" className="block w-full py-1.5 pl-10 pr-4 leading-normal rounded-2xl focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 ring-opacity-90 bg-gray-100 dark:bg-gray-800 text-gray-400 aa-input" placeholder="Search" />
                                            <div className="absolute right-0 hidden h-auto px-2 py-1 mr-2 text-xs text-gray-400 border border-gray-300 rounded-2xl md:block">
                                                +
                                            </div>
                                        </div>
                                    </div>
                                    <div className="relative flex items-center justify-end w-1/4 p-1 ml-5 mr-4 sm:mr-0 sm:right-auto">
                                        <a href="#" className="relative block">
                                            <img alt="profil" src="/images/person/1.jpg" className="mx-auto object-cover rounded-full h-10 w-10 " />
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </header> */}
                        <div className="grid sm:grid-cols-2 grid-cols-1 md:grid-cols-4 gap-4 p-6  text-white">
                            {stats.map((stat, index) => (
                                <div key={index} className="bg-[#0c0c0c] border-neutral-700 shadow-md shadow-[#88090025] border p-4 rounded-md w-full">
                                    <div className="flex justify-between items-center">
                                        <h3 className="text-sm font-semibold text-gray-400">{stat.title}</h3>
                                        <div className={`p-2 rounded-lg ${stat.bgColor}`}>{stat.icon}</div>
                                    </div>
                                    <p className="text-2xl font-semibold mt-2">{stat.value}</p>
                                    <p className={`mt-1 text-sm font-semibold ${stat.textColor}`}>{stat.change} <span className="text-gray-400 font-normal">{stat.description}</span></p>
                                </div>
                            ))}
                        </div>

                    </div>
                </div>
            </main>

        </HomeLayout>
    )
}

export default Dashboard
