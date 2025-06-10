import TextEditor from "@/components/TextEditor";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
import { sendMail, sendMailType } from "@/validations/AuthValidation";
import { zodResolver } from "@hookform/resolvers/zod";
import { IconWhirl } from "@tabler/icons-react";
import { ArrowUpRight, ArrowDownRight, LinkIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

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

  const {
    register,
    handleSubmit,
    setValue,
    trigger,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm<sendMailType>({
    resolver: zodResolver(sendMail),
  });

  const onSubmit = async (data: sendMailType) => {
    try {
      console.log(JSON.stringify(data));
      const formData = new FormData();
      formData.append("formData", JSON.stringify(data));
    } catch (error) {
      toast.error("Error submitting form");
    }
  };

  return (
    <HomeLayout>
      <h2 className="mb-3 font-semibold text-white">Dashboard</h2>
      <main className="relative min-h-screen space-y-4 overflow-hidden rounded-2xl">
        <div className="flex items-start justify-between">
          <div className="flex flex-col w-full pl-0 md:p-4 md:space-y-4">
            <div className="grid grid-cols-1 gap-4 text-white sm:grid-cols-2 lg:grid-cols-4">
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
        <div className="grid grid-cols-1 gap-4 pt-0 md:p-4 lg:grid-cols-2">
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
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-full p-3 overflow-hidden border rounded-md border-neutral-600 bg-[#0C0C0C]"
          >
            <h2 className="text-xl text-center text-zinc-100">Send Mail</h2>

            <div className="space-y-1 ">
              <Label htmlFor={"email"} className="text-neutral-300 ">
                Enter Email <span className="text-main">*</span>
              </Label>
              <Input
                {...register("email")}
                placeholder="Enter email..."
                type="email"
                className={`${
                  errors.email && "border-[#E11D48] "
                } py-[0.45rem]  text-neutral-200`}
              />
              {errors.email && (
                <p className="text-sm font-semibold tracking-wide text-main">
                  {errors.email.message}
                </p>
              )}
            </div>
            <div className="space-y-1 ">
              <Label htmlFor={"mailSubject"} className="text-neutral-300 ">
                Subject <span className="text-main">*</span>
              </Label>
              <Input
                {...register("mailSubject")}
                placeholder="Enter subject..."
                type="text"
                className={`${
                  errors.mailSubject && "border-[#E11D48] "
                } py-[0.45rem]  text-neutral-200`}
              />
              {errors.mailSubject && (
                <p className="text-sm font-semibold tracking-wide text-main">
                  {errors.mailSubject.message}
                </p>
              )}
            </div>
            <div className="space-y-1">
              <Label htmlFor={"email"} className="text-neutral-300 ">
                Mail body <span className="text-main">*</span>
              </Label>
              <div className="mt-3">
                <TextEditor
                  height={280}
                  value={getValues("mailBody")}
                  handleBlur={(value) => {
                    setValue("mailBody", value, { shouldValidate: true });
                    trigger("mailBody");
                  }}
                />

                {errors.mailBody && (
                  <p className="text-sm font-semibold tracking-wide text-main">
                    {errors.mailBody.message}
                  </p>
                )}
              </div>
            </div>
            <button
              type="submit"
              className="bg-main cursor-pointer w-full text-center justify-center text-white flex items-center gap-3 py-1.5 mt-3 text-sm px-4 rounded"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  Sending...
                  <IconWhirl className="animate-spin" />
                </>
              ) : (
                "Send Mail"
              )}
            </button>
          </form>
        </div>
      </main>
    </HomeLayout>
  );
};

export default Dashboard;
