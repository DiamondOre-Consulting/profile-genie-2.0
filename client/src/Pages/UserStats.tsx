import React, { useState } from "react";
import { useParams } from "react-router-dom";
import {
  FiUser,
  FiPhone,
  FiDollarSign,
  FiActivity,
  FiTrendingDown,
  FiTrendingUp,
  FiAlertTriangle,
} from "react-icons/fi";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  TooltipProps,
} from "recharts";
import logo from "../assets/logo.png";
import {
  useSendPortfolioStatsOTPQuery,
  useVerifyPortfolioStatsOTPMutation,
} from "@/Redux/API/PortfolioApi";
import { OTPInput, SlotProps } from "input-otp";
import { cn } from "@/lib/utils";

// Define types for the API response data
type GraphDataItem = {
  month: string;
  views: number;
  _id: string;
};

type SOSContact = {
  _id: string;
  fullName: string;
  phoneNumber: string;
};

type PortfolioStats = {
  fullName: string;
  email: string;
  phoneNumber: string;
  isPaid: boolean;
  paidDate: string;
  isActive: boolean;
  SOS: SOSContact[];
};

type StatsDataResponse = {
  success: boolean;
  email?: string;
  portfolioStats?: PortfolioStats;
  totalViews?: number;
  currentMonthViews?: number;
  previousMonthViews?: number;
  percentChange?: number;
  graphData?: GraphDataItem[];
};

type ChartDataItem = {
  name: string;
  views: number;
  trend: "up" | "down" | "neutral";
};

const UserStats = () => {
  const { username } = useParams<{ username: string }>();
  const [otp, setOtp] = useState<string>("");
  const { data, refetch } = useSendPortfolioStatsOTPQuery({ username });
  const [verifyPortfolioStatsOTP] = useVerifyPortfolioStatsOTPMutation();

  const [statsData, setStatsData] = useState<StatsDataResponse>();

  const handleVerifyOtp = async () => {
    if (!data?.email) return;

    const otpData = await verifyPortfolioStatsOTP({
      username: username || "",
      otp,
      email: data.email,
    });

    if ("data" in otpData && otpData.data?.success) {
      setStatsData(otpData.data);
    }
  };

  const generateCompleteData = (): ChartDataItem[] => {
    if (!statsData?.graphData) return [];

    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonthIndex = currentDate.getMonth();

    // Create a map of the API data for easy lookup
    const apiDataMap: Record<string, number> = {};
    statsData.graphData.forEach((item) => {
      // Convert to lowercase and remove any whitespace for consistent matching
      const cleanKey = item.month.toLowerCase().trim();
      apiDataMap[cleanKey] = item.views;
    });

    // Create data for last 12 months (starting from oldest to newest)
    const completeData: ChartDataItem[] = [];

    // Start from 11 months ago up to current month
    for (let i = 0; i < 12; i++) {
      const date = new Date(currentYear, currentMonthIndex - (11 - i), 1);
      const monthIndex = date.getMonth();
      const year = date.getFullYear();
      const monthName = monthNames[monthIndex].toLowerCase();

      // Create the month key exactly as it appears in API data (e.g. "may2025")
      const monthKey = `${monthName}${year}`;
      const displayName = `${monthNames[monthIndex]} '${year
        .toString()
        .slice(-2)}`;

      completeData.push({
        name: displayName,
        views: apiDataMap[monthKey] || 0,
        trend: "neutral", // default
      });
    }

    // Calculate trends
    for (let i = 1; i < completeData.length; i++) {
      if (completeData[i].views > completeData[i - 1].views) {
        completeData[i].trend = "up";
      } else if (completeData[i].views < completeData[i - 1].views) {
        completeData[i].trend = "down";
      }
    }

    return completeData;
  };

  const chartData = generateCompleteData();

  // Format phone number
  const formatPhoneNumber = (num: string | number): string => {
    const str = num.toString();
    return `+${str.slice(0, 2)} ${str.slice(2, 7)} ${str.slice(7)}`;
  };

  // Format date
  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Custom tooltip component
  const CustomTooltip = (props: TooltipProps<number, string>) => {
    const { active } = props;
    const label = (props as any).label;
    const payload = (props as any).payload as any[] | undefined;
    if (active && payload && payload.length) {
      const data = payload[0].payload as ChartDataItem;
      return (
        <div className="p-3 bg-gray-700 border border-gray-600 rounded-lg shadow-lg">
          <p className="font-bold">{label}</p>
          <p
            className={`flex items-center ${
              data.trend === "up"
                ? "text-green-400"
                : data.trend === "down"
                ? "text-red-400"
                : "text-gray-400"
            }`}
          >
            {data.trend === "up" ? (
              <FiTrendingUp className="mr-1" />
            ) : data.trend === "down" ? (
              <FiTrendingDown className="mr-1" />
            ) : null}
            {payload[0].value} views
          </p>
          {data.trend !== "neutral" && (
            <p className="mt-1 text-xs text-gray-300">
              {data.trend === "up" ? "Increased" : "Decreased"} from previous
              month
            </p>
          )}
        </div>
      );
    }
    return null;
  };

  function Slot(props: SlotProps) {
    return (
      <div
        className={cn(
          "flex size-13 items-center justify-center text-2xl rounded-md border font-medium shadow-xs transition-[color,box-shadow] border-zinc-600 bg-[#212121] text-zinc-50",
          {
            "border-zinc-950 ring-zinc-500/50 z-10 ring-[2px] dark:border-zinc-300 dark:ring-zinc-300/50":
              props.isActive,
          }
        )}
      >
        {props.char !== null && <div>{props.char}</div>}
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen text-gray-100 bg-[#262626]">
      {data?.success && !statsData?.success && (
        <div className="sm:mx-auto w-[98vw] sm:max-w-[27rem]">
          <div className="flex flex-col items-center justify-center gap-4 mt-8 sm:mx-auto sm:w-full sm:max-w-md">
            <a
              href="#"
              className="flex items-center self-center gap-2 text-2xl font-medium"
            >
              <img src={logo} alt="Logo" className="mr-4 size-14" />
              Profile Genie
            </a>
            <div className="px-4 py-8 bg-[#171717] shadow sm:rounded-lg sm:px-10">
              <div className="flex flex-col items-center justify-center space-y-3">
                <h2 className="mb-8 text-2xl font-semibold text-zinc-100 ">
                  Welcome Back
                </h2>

                <p className="text-center text-gray-400">
                  Enter the OTP sent to your registered email{" "}
                  <span className="font-mono text-zinc-200">
                    {(() => {
                      const email = data?.email || "";
                      const atIndex = email.indexOf("@");
                      if (atIndex === -1) return email;
                      const beforeAt = email.slice(0, atIndex);
                      const afterAt = email.slice(atIndex);
                      const visibleBefore =
                        beforeAt.length > 6 ? beforeAt.slice(-6) : beforeAt;
                      return (
                        <>
                          {"****"}
                          {visibleBefore}
                          {afterAt}
                        </>
                      );
                    })()}
                  </span>{" "}
                  to view your portfolio analytics.
                </p>

                <div className="*:not-first:mt-2">
                  <OTPInput
                    containerClassName="flex items-center gap-3 has-disabled:opacity-50"
                    maxLength={4}
                    onChange={(value) => {
                      setOtp(value);
                    }}
                    value={otp}
                    render={({ slots }) => (
                      <div className="flex items-center gap-0">
                        {slots.map((slot, idx) => (
                          <React.Fragment key={idx}>
                            <Slot {...slot} />
                            {idx < slots.length - 1 && (
                              <span className="mx-2 text-2xl select-none text-zinc-400">
                                -
                              </span>
                            )}
                          </React.Fragment>
                        ))}
                      </div>
                    )}
                  />
                </div>

                <div className="w-full">
                  <button
                    type="submit"
                    onClick={handleVerifyOtp}
                    className="flex justify-center w-[18rem] mt-4 mx-auto px-4 py-2 text-sm font-medium text-zinc-800 bg-[#E5E5E5] border border-transparent rounded-md shadow-sm hover:bg-zinc-100 transition-all duration-300 cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 "
                  >
                    Verify
                  </button>
                </div>
              </div>

              <div className="mt-6">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 text-zinc-300 bg-zinc-800">
                      Still not received the code?{" "}
                      <span
                        onClick={() => refetch()}
                        className="font-medium cursor-pointer text-zinc-100 hover:text-zinc-200"
                      >
                        Resend
                      </span>
                    </span>
                  </div>
                </div>

                <div className="mt-6 text-xs text-center text-gray-500">
                  By clicking continue, you agree to our{" "}
                  <a
                    href="#"
                    className="font-medium text-indigo-600 hover:text-indigo-500"
                  >
                    Terms of Service
                  </a>{" "}
                  and{" "}
                  <a
                    href="#"
                    className="font-medium text-indigo-600 hover:text-indigo-500"
                  >
                    Privacy Policy
                  </a>
                  .
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {statsData?.success && (
        <div className="container px-4 py-8 mx-auto">
          {/* Header */}
          <header className="flex flex-col mb-8 md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white">
                Portfolio Analytics
              </h1>
              <p className="text-gray-400">
                Detailed statistics for {statsData.portfolioStats?.fullName}
              </p>
            </div>
            <div className="mt-4 md:mt-0">
              <span
                className={`inline-flex items-center px-3 py-1 rounded-full ${
                  statsData.portfolioStats?.isActive
                    ? "text-green-300 bg-green-900/40"
                    : "text-red-300 bg-red-900/40"
                }`}
              >
                <span
                  className={`w-1.5 h-1.5 mr-4 animate-ping rounded-full ${
                    statsData.portfolioStats?.isActive
                      ? "bg-green-500"
                      : "bg-red-500"
                  }`}
                ></span>
                {statsData.portfolioStats?.isActive
                  ? "Active Account"
                  : "Inactive Account"}
              </span>
            </div>
          </header>

          {/* Main Grid */}
          <div className="grid gap-6 mb-8 lg:grid-cols-3">
            {/* User Profile Card */}
            <div className="p-6 bg-[#171717] rounded-xl lg:col-span-1">
              <div className="flex items-center mb-6">
                <div className="flex items-center justify-center w-16 h-16 mr-4 text-indigo-400 rounded-full bg-indigo-900/30">
                  <FiUser className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-white">
                    {statsData.portfolioStats?.fullName}
                  </h2>
                  <p className="text-gray-400">
                    {statsData.portfolioStats?.email}
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center">
                  <FiPhone className="w-5 h-5 mr-3 text-gray-400" />
                  <p className="text-gray-300">
                    {formatPhoneNumber(
                      statsData.portfolioStats?.phoneNumber || ""
                    )}
                  </p>
                </div>
                <div className="flex items-center">
                  <FiDollarSign className="w-5 h-5 mr-3 text-gray-400" />
                  <p className="text-gray-300">
                    {statsData.portfolioStats?.isPaid
                      ? "Premium Member"
                      : "Free Account"}{" "}
                    since {formatDate(statsData.portfolioStats?.paidDate || "")}
                  </p>
                </div>
                {statsData.portfolioStats?.isPaid &&
                  statsData.portfolioStats?.paidDate && (
                    <div className="flex items-center">
                      <FiDollarSign className="w-5 h-5 mr-3 text-gray-400" />
                      <p className="text-gray-300">
                        Expiry:{" "}
                        {formatDate(
                          new Date(
                            new Date(
                              statsData.portfolioStats.paidDate
                            ).setFullYear(
                              new Date(
                                statsData.portfolioStats.paidDate
                              ).getFullYear() + 1
                            )
                          ).toISOString()
                        )}
                      </p>
                    </div>
                  )}
              </div>

              {statsData.portfolioStats &&
                statsData.portfolioStats?.SOS?.length > 0 && (
                  <div className="mt-8">
                    <h3 className="mb-4 text-lg font-medium text-white">
                      Emergency Contacts
                    </h3>
                    <div className="space-y-3">
                      {statsData.portfolioStats?.SOS.map((contact) => (
                        <div
                          key={contact._id}
                          className="p-3 transition-colors rounded-lg bg-gray-700/50 hover:bg-gray-700"
                        >
                          <p className="font-medium text-white">
                            {contact.fullName}
                          </p>
                          <p className="text-sm text-gray-400">
                            {formatPhoneNumber(contact.phoneNumber)}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

              <div className="pt-10 bg-[#171717] rounded-xl">
                <div className="flex items-center mb-4">
                  <FiAlertTriangle className="w-5 h-5 mr-2 text-yellow-500" />
                  <h2 className="text-lg font-semibold text-white">
                    Performance Insights
                  </h2>
                </div>

                <div className="prose-sm prose prose-invert max-w-none">
                  <p className="text-gray-300">
                    Your portfolio received{" "}
                    <strong>{statsData.previousMonthViews} views</strong> last
                    month compared to{" "}
                    <strong>{statsData.currentMonthViews} views</strong> this
                    month, representing a{" "}
                    {statsData.percentChange && (
                      <strong
                        className={
                          statsData.percentChange < 0
                            ? "text-red-400"
                            : "text-green-400"
                        }
                      >
                        {Math.abs(statsData.percentChange).toFixed(2)}%{" "}
                        {statsData.percentChange < 0 ? "decrease" : "increase"}
                      </strong>
                    )}
                    .
                  </p>

                  <div className="p-4 mt-4 rounded-lg bg-gray-700/50">
                    <h3 className="mb-2 font-medium text-white">
                      Recommendations
                    </h3>
                    <ul className="pl-5 space-y-2 text-gray-300 list-disc">
                      <li>
                        <strong>Promotion:</strong> Share your portfolio link
                        across professional networks
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Stats Overview */}
            <div className="space-y-6 lg:col-span-2">
              <div className="grid gap-6 sm:grid-cols-3">
                {/* Total Views */}
                <div className="p-5 bg-[#171717] rounded-xl">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-sm font-medium text-gray-400">
                      Total Views
                    </h3>
                    <FiActivity className="w-5 h-5 text-indigo-500" />
                  </div>
                  <p className="text-2xl font-bold text-white">
                    {statsData.totalViews}
                  </p>
                  <p className="mt-1 text-xs text-gray-400">
                    All-time portfolio visits
                  </p>
                </div>

                {/* Current Month */}
                <div className="p-5 bg-[#171717] rounded-xl">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-sm font-medium text-gray-400">
                      Current Month
                    </h3>
                    {statsData.percentChange && statsData.percentChange < 0 ? (
                      <FiTrendingDown className="w-5 h-5 text-red-500" />
                    ) : (
                      <FiTrendingUp className="w-5 h-5 text-green-500" />
                    )}
                  </div>
                  <p className="text-2xl font-bold text-white">
                    {statsData.currentMonthViews}
                  </p>
                  <p className="mt-1 text-xs text-gray-400">
                    {new Date().toLocaleString("default", { month: "long" })}{" "}
                    views
                  </p>
                </div>

                {/* Previous Month */}
                <div className="p-5 bg-[#171717] rounded-xl">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-sm font-medium text-gray-400">
                      Previous Month
                    </h3>
                    <FiTrendingUp className="w-5 h-5 text-green-500" />
                  </div>
                  <p className="text-2xl font-bold text-white">
                    {statsData.previousMonthViews}
                  </p>
                  <p className="mt-1 text-xs text-gray-400">
                    {new Date(
                      new Date().setMonth(new Date().getMonth() - 1)
                    ).toLocaleString("default", { month: "long" })}{" "}
                    views
                  </p>
                </div>
              </div>

              {/* 12-Month Area Chart */}
              <div className="p-6 bg-[#171717] rounded-xl">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-semibold text-white">
                    12-Month View Trend
                  </h2>
                  <div className="flex items-center space-x-2">
                    {statsData.percentChange && (
                      <span
                        className={`inline-flex items-center px-2 py-1 text-xs rounded-full ${
                          statsData.percentChange < 0
                            ? "bg-red-900/30 text-red-400"
                            : "bg-green-900/30 text-green-400"
                        }`}
                      >
                        {statsData.percentChange < 0 ? (
                          <FiTrendingDown className="w-3 h-3 mr-1" />
                        ) : (
                          <FiTrendingUp className="w-3 h-3 mr-1" />
                        )}
                        {Math.abs(statsData.percentChange).toFixed(2)}%
                      </span>
                    )}
                  </div>
                </div>

                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                      data={chartData}
                      margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                    >
                      <defs>
                        <linearGradient
                          id="colorUp"
                          x1="0"
                          y1="0"
                          x2="0"
                          y2="1"
                        >
                          <stop
                            offset="5%"
                            stopColor="#10B981"
                            stopOpacity={0.8}
                          />
                          <stop
                            offset="95%"
                            stopColor="#10B981"
                            stopOpacity={0}
                          />
                        </linearGradient>
                        <linearGradient
                          id="colorDown"
                          x1="0"
                          y1="0"
                          x2="0"
                          y2="1"
                        >
                          <stop
                            offset="5%"
                            stopColor="#EF4444"
                            stopOpacity={0.8}
                          />
                          <stop
                            offset="95%"
                            stopColor="#EF4444"
                            stopOpacity={0}
                          />
                        </linearGradient>
                        <linearGradient
                          id="colorNeutral"
                          x1="0"
                          y1="0"
                          x2="0"
                          y2="1"
                        >
                          <stop
                            offset="5%"
                            stopColor="#6B7280"
                            stopOpacity={0.8}
                          />
                          <stop
                            offset="95%"
                            stopColor="#6B7280"
                            stopOpacity={0}
                          />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                      <XAxis
                        dataKey="name"
                        stroke="#9CA3AF"
                        tickLine={false}
                        axisLine={false}
                      />
                      <YAxis
                        stroke="#9CA3AF"
                        tickLine={false}
                        axisLine={false}
                      />
                      <Tooltip content={<CustomTooltip />} />
                      <Area
                        type="monotone"
                        dataKey="views"
                        stroke="#3B82F6"
                        fillOpacity={1}
                        fill="url(#colorNeutral)"
                        strokeWidth={2}
                        activeDot={{
                          r: 6,
                          stroke: "#3B82F6",
                          strokeWidth: 2,
                          fill: "#1F2937",
                        }}
                      />
                      {chartData.map((entry, index) =>
                        entry.trend === "up" ? (
                          <Area
                            key={`area-up-${index}`}
                            type="monotone"
                            dataKey="views"
                            stackId="1"
                            stroke="#10B981"
                            fill="url(#colorUp)"
                            strokeWidth={2}
                            dot={{
                              stroke: "#10B981",
                              strokeWidth: 2,
                              r: 4,
                              fill: "#1F2937",
                            }}
                            activeDot={{
                              r: 6,
                              stroke: "#10B981",
                              strokeWidth: 2,
                              fill: "#1F2937",
                            }}
                          />
                        ) : entry.trend === "down" ? (
                          <Area
                            key={`area-down-${index}`}
                            type="monotone"
                            dataKey="views"
                            stackId="1"
                            stroke="#EF4444"
                            fill="url(#colorDown)"
                            strokeWidth={2}
                            dot={{
                              stroke: "#EF4444",
                              strokeWidth: 2,
                              r: 4,
                              fill: "#1F2937",
                            }}
                            activeDot={{
                              r: 6,
                              stroke: "#EF4444",
                              strokeWidth: 2,
                              fill: "#1F2937",
                            }}
                          />
                        ) : null
                      )}
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Insights Card */}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserStats;
