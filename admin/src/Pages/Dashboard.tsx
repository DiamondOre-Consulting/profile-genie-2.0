import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { HomeLayout } from "@/Layout/HomeLayout";
import { useGetAllAdminDashboardDataQuery } from "@/Redux/API/PortfolioApi";
import { ArrowUpRight, ArrowDownRight, LinkIcon } from "lucide-react";

interface stats {
  difference: number | string;
  title: string;
  count: number | string;
  percentageChange: number | string;
}

interface portfolioStat {
  _id: string;
  fullName: string;
  email: string;
  views: number;
  userName: string;
}

const iconUp = <ArrowUpRight className="text-green-500" />;

const iconDown = <ArrowDownRight className="text-red-500" />;

const Dashboard = () => {
  const { data } = useGetAllAdminDashboardDataQuery({});
  return (
    <HomeLayout>
      <h2 className="mb-3 font-semibold text-white">Dashboard</h2>
      <main className="relative h-screen overflow-hidden rounded-2xl">
        <div className="flex items-start justify-between">
          <div className="flex flex-col w-full pl-0 md:p-4 md:space-y-4">
            <div className="grid grid-cols-1 gap-4 text-white sm:grid-cols-2 md:grid-cols-4">
              {data?.stats.map((stat: stats, index: number) => (
                <div
                  key={index}
                  className="bg-[#0c0c0c] border-neutral-700 shadow-md shadow-[#88090025] border p-4 rounded-md w-full"
                >
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-semibold text-gray-400">
                      {stat.title}
                    </h3>
                    <div
                      className={`p-2 rounded-lg  ${
                        Number(stat?.difference) >= 0
                          ? "bg-green-500/20"
                          : "bg-red-500/20"
                      }`}
                    >
                      {Number(stat?.difference) >= 0 ? iconUp : iconDown}
                    </div>
                  </div>
                  <p className="my-1 text-2xl font-semibold sm:text-3xl">
                    {stat?.count}
                  </p>
                  <p
                    className={`mt-1 text-sm font-semibold ${
                      Number(stat?.difference) >= 0
                        ? "text-green-500"
                        : "text-red-500"
                    }`}
                  >
                    {stat.percentageChange}%{" "}
                    <span className="font-normal text-gray-400">
                      ({stat?.difference}){" "}
                      {Number(stat?.difference) >= 0 ? "Increase" : "Decrease"}{" "}
                      compared to last month
                    </span>
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 p-4 md:grid-cols-2">
          <div className="w-full overflow-hidden border rounded-md border-neutral-600 bg-[#0C0C0C]">
            <h2 className="p-3 text-xl text-center text-zinc-100">
              Top Portfolios
            </h2>
            <Table>
              <TableHeader>
                <TableRow className="text-gray-100 bg-neutral-900">
                  <TableHead className="py-2 h-9">Name</TableHead>
                  <TableHead className="py-2 h-9">Email</TableHead>
                  <TableHead className="py-2 h-9">Views</TableHead>
                  <TableHead className="py-2 h-9">Visit</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody className="text-white">
                {data?.top5Portfolio?.map((stat: portfolioStat) => (
                  <TableRow key={stat._id}>
                    <TableCell className="py-2 font-medium">
                      {stat.fullName}
                    </TableCell>
                    <TableCell className="py-2">{stat.email}</TableCell>
                    <TableCell className="py-2">{stat.views}</TableCell>
                    <TableCell className="py-2">
                      <a
                        target="_blank"
                        href={`https://profilegenie.in/profile/1/${stat?.userName}`}
                      >
                        <LinkIcon />
                      </a>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </main>
    </HomeLayout>
  );
};

export default Dashboard;
