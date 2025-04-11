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
            <h2 className="mb-3 font-semibold text-white">
                Dashboard
            </h2>
            <main className="relative h-screen overflow-hidden rounded-2xl">
                <div className="flex items-start justify-between">

                    <div className="flex flex-col w-full pl-0 md:p-4 md:space-y-4">

                        <div className="grid grid-cols-1 gap-4 p-6 text-white sm:grid-cols-2 md:grid-cols-4">
                            {stats.map((stat, index) => (
                                <div key={index} className="bg-[#0c0c0c] border-neutral-700 shadow-md shadow-[#88090025] border p-4 rounded-md w-full">
                                    <div className="flex items-center justify-between">
                                        <h3 className="text-sm font-semibold text-gray-400">{stat.title}</h3>
                                        <div className={`p-2 rounded-lg ${stat.bgColor}`}>{stat.icon}</div>
                                    </div>
                                    <p className="mt-2 text-2xl font-semibold">{stat.value}</p>
                                    <p className={`mt-1 text-sm font-semibold ${stat.textColor}`}>{stat.change} <span className="font-normal text-gray-400">{stat.description}</span></p>
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
