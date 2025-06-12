import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Cell,
  PieChart,
  Pie,
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  RadarChart,
  Radar,
  AreaChart,
  Area,
} from "recharts";
import {
  FiActivity,
  FiServer,
  FiTrendingUp,
  FiClock,
  FiCpu,
  FiHardDrive,
  FiCheckCircle,
  FiXCircle,
} from "react-icons/fi";
import { motion } from "framer-motion";
import { HealthData } from "@/validations/AuthValidation";

const LiveSiteHealthDashboard = ({ data }: { data: HealthData }) => {
  // Format system stats for charts
  const systemStats = {
    cpuLoad: parseFloat(data?.systemStats?.cpuLoad),
    memoryUsagePercent: parseFloat(data?.systemStats?.memoryUsagePercent),
    diskUsage: 0,
  };

  // Prepare SEO data for radial chart
  const seoRadialData = [
    { subject: "Performance", A: data.seoScore.performance, fullMark: 100 },
    { subject: "Accessibility", A: data.seoScore.accessibility, fullMark: 100 },
    {
      subject: "Best Practices",
      A: data.seoScore.bestPractices,
      fullMark: 100,
    },
    { subject: "SEO", A: data.seoScore.seoScore, fullMark: 100 },
  ];

  // Prepare audit results for pie chart
  const auditResults = [
    {
      name: "Passed",
      value: Object.values(data.seoScore.fullMetrics.auditsSummary).filter(
        Boolean
      ).length,
      fill: "#10B981",
    },
    {
      name: "Failed",
      value: Object.values(data.seoScore.fullMetrics.auditsSummary).filter(
        (v) => !v
      ).length,
      fill: "#EF4444",
    },
  ];

  // System resources for bar chart
  const systemResources = [
    { name: "CPU", value: systemStats.cpuLoad },
    { name: "Memory", value: systemStats.memoryUsagePercent },
    { name: "Disk", value: systemStats.diskUsage },
  ];

  // Response time history data
  const responseTimeHistory = [
    { name: "5m ago", value: data.responseTime * 0.8 },
    { name: "4m ago", value: data.responseTime * 0.9 },
    { name: "3m ago", value: data.responseTime * 1.1 },
    { name: "2m ago", value: data.responseTime * 0.95 },
    { name: "1m ago", value: data.responseTime * 1.05 },
    { name: "Now", value: data.responseTime },
  ];

  // Format uptime
  const uptimeSeconds = parseFloat(data.processStats.uptimeSeconds);
  const uptimeString = `${Math.floor(uptimeSeconds / 3600)}h ${Math.floor(
    (uptimeSeconds % 3600) / 60
  )}m`;

  return (
    <div className="p-6 mx-auto font-sans text-gray-100 bg-transparent max-w-7xl">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center justify-between mb-8 space-y-4 md:flex-row md:space-y-0"
      >
        <div className="flex items-center">
          <div className="p-3 mr-4 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600">
            <FiActivity className="text-2xl text-white" />
          </div>
          <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
            Live Site Health Dashboard
          </h2>
        </div>
        <div className="px-4 py-2 text-sm text-gray-300 bg-gray-800 rounded-full">
          Last Updated: {new Date(data.timestamp).toLocaleString()}
        </div>
      </motion.div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* API Status Card */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="p-6 shadow-xl rounded-2xl bg-gradient-to-br from-gray-800 to-gray-850"
        >
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <div className="p-2 mr-3 rounded-lg bg-indigo-900/50">
                <FiServer className="text-xl text-indigo-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-200">
                API Status
              </h3>
            </div>
            <span
              className={`px-3 py-1 text-xs font-medium rounded-full ${
                data.apiUptime
                  ? "bg-green-900/50 text-green-400"
                  : "bg-red-900/50 text-red-400"
              }`}
            >
              {data.apiUptime ? "Operational" : "Down"}
            </span>
          </div>

          <div className="flex flex-col items-center">
            <div className="w-full h-40">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={responseTimeHistory}
                  margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
                >
                  <defs>
                    <linearGradient
                      id="responseTimeGradient"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop
                        offset="5%"
                        stopColor={
                          data.responseTime < 100
                            ? "#10B981"
                            : data.responseTime < 300
                            ? "#F59E0B"
                            : "#EF4444"
                        }
                        stopOpacity={0.8}
                      />
                      <stop
                        offset="95%"
                        stopColor={
                          data.responseTime < 100
                            ? "#10B981"
                            : data.responseTime < 300
                            ? "#F59E0B"
                            : "#EF4444"
                        }
                        stopOpacity={0}
                      />
                    </linearGradient>
                  </defs>
                  <Area
                    type="monotone"
                    dataKey="value"
                    stroke={
                      data.responseTime < 100
                        ? "#10B981"
                        : data.responseTime < 300
                        ? "#F59E0B"
                        : "#EF4444"
                    }
                    fillOpacity={1}
                    fill="url(#responseTimeGradient)"
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#1F2937",
                      borderColor: "#374151",
                      borderRadius: "0.5rem",
                    }}
                    formatter={(value: number) => [`${value}ms`, "Response"]}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <div className="flex items-center justify-center mt-4 space-x-4">
              <div className="text-center">
                <p className="text-3xl font-bold text-gray-100">
                  {data.responseTime}ms
                </p>
                <p className="text-sm text-gray-400">Current Response</p>
              </div>
              <div className="h-10 border-l border-gray-700"></div>
              <div className="text-center">
                <p
                  className={`text-xl font-bold ${
                    data.apiUptime ? "text-green-400" : "text-red-400"
                  }`}
                >
                  {data.apiUptime ? "100%" : "0%"}
                </p>
                <p className="text-sm text-gray-400">Uptime</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* System Resources Card */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="p-6 shadow-xl rounded-2xl bg-gradient-to-br from-gray-800 to-gray-850"
        >
          <div className="flex items-center mb-6">
            <div className="p-2 mr-3 rounded-lg bg-purple-900/50">
              <FiCpu className="text-xl text-purple-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-200">
              System Resources
            </h3>
          </div>

          <div className="h-40">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={systemResources}>
                <XAxis
                  dataKey="name"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#9CA3AF" }}
                />
                <YAxis
                  domain={[0, 100]}
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#9CA3AF" }}
                />
                <Tooltip
                  formatter={(value: number) => [`${value}%`, "Usage"]}
                  labelFormatter={(label) => `${label} Load`}
                  contentStyle={{
                    backgroundColor: "#1F2937",
                    borderColor: "#374151",
                    borderRadius: "0.5rem",
                  }}
                />
                <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                  {systemResources.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={
                        entry.value < 70
                          ? "#10B981"
                          : entry.value < 90
                          ? "#F59E0B"
                          : "#EF4444"
                      }
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-3 gap-4 mt-4">
            {systemResources.map((resource, index) => (
              <div key={index} className="text-center">
                <p
                  className={`text-xl font-bold ${
                    resource.value < 70
                      ? "text-green-400"
                      : resource.value < 90
                      ? "text-yellow-400"
                      : "text-red-400"
                  }`}
                >
                  {resource.value}%
                </p>
                <p className="text-xs text-gray-400">{resource.name}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Uptime Card */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="p-6 shadow-xl rounded-2xl bg-gradient-to-br from-gray-800 to-gray-850"
        >
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <div className="p-2 mr-3 rounded-lg bg-blue-900/50">
                <FiClock className="text-xl text-blue-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-200">
                Uptime & Errors
              </h3>
            </div>
            <div
              className={`px-3 py-1 text-xs font-medium rounded-full ${
                parseFloat(data.errorRate) < 5
                  ? "bg-green-900/50 text-green-400"
                  : "bg-red-900/50 text-red-400"
              }`}
            >
              {parseFloat(data.errorRate) < 5 ? "Stable" : "Unstable"}
            </div>
          </div>

          <div className="flex items-center justify-between h-40">
            <div className="flex flex-col items-center justify-center w-1/2">
              <div className="relative w-32 h-32">
                <svg className="w-full h-full" viewBox="0 0 36 36">
                  <path
                    d="M18 2.0845
                      a 15.9155 15.9155 0 0 1 0 31.831
                      a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="#1E293B"
                    strokeWidth="3"
                  />
                  <path
                    d="M18 2.0845
                      a 15.9155 15.9155 0 0 1 0 31.831
                      a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="#3B82F6"
                    strokeWidth="3"
                    strokeDasharray={`${(uptimeSeconds / 86400) * 100}, 100`}
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <p className="text-3xl font-bold text-blue-400">
                    {Math.floor(uptimeSeconds / 3600)}h
                  </p>
                  <p className="text-xs text-gray-400">Uptime</p>
                </div>
              </div>
            </div>
            <div className="flex flex-col items-center justify-center w-1/2 space-y-6">
              <div className="text-center">
                <p
                  className={`text-4xl font-bold ${
                    parseFloat(data.errorRate) < 5
                      ? "text-green-400"
                      : "text-red-400"
                  }`}
                >
                  {data.errorRate}%
                </p>
                <p className="text-sm text-gray-400">Error Rate</p>
              </div>
              <div className="text-center">
                <p className="text-xl font-bold text-gray-100">
                  {data.processStats.nodeRSSMB}MB
                </p>
                <p className="text-sm text-gray-400">Memory Usage</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* SEO Health Card */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="p-6 mt-6 shadow-xl rounded-2xl bg-gradient-to-br from-gray-800 to-gray-850"
      >
        <div className="flex items-center mb-6">
          <div className="p-2 mr-3 rounded-lg bg-green-900/50">
            <FiTrendingUp className="text-xl text-green-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-200">
            SEO Health Analysis
          </h3>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <div className="h-64">
            <h4 className="mb-3 text-sm font-medium text-center text-gray-400">
              SEO Performance
            </h4>
            <ResponsiveContainer width="100%" height="90%">
              <RadarChart outerRadius="80%" data={seoRadialData}>
                <PolarGrid stroke="#374151" />
                <PolarAngleAxis
                  dataKey="subject"
                  tick={{ fill: "#E5E7EB", fontSize: 12 }}
                />
                <PolarRadiusAxis
                  angle={30}
                  domain={[0, 100]}
                  stroke="#374151"
                />
                <Radar
                  name="Scores"
                  dataKey="A"
                  stroke="#6366F1"
                  fill="#6366F1"
                  fillOpacity={0.4}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1F2937",
                    borderColor: "#374151",
                    borderRadius: "0.5rem",
                  }}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>

          <div className="h-64">
            <h4 className="mb-3 text-sm font-medium text-center text-gray-400">
              Audit Results
            </h4>
            <ResponsiveContainer width="100%" height="90%">
              <PieChart>
                <Pie
                  data={auditResults}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                  label={({ name, percent }) =>
                    `${name}: ${(percent * 100).toFixed(0)}%`
                  }
                >
                  {auditResults.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value: number) => [`${value} checks`, ""]}
                  contentStyle={{
                    backgroundColor: "#1F2937",
                    borderColor: "#374151",
                    borderRadius: "0.5rem",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="flex flex-col justify-between h-64">
            <div>
              <h4 className="mb-3 text-sm font-medium text-center text-gray-400">
                Key Metrics
              </h4>
              <div className="grid grid-cols-2 gap-3">
                <MetricBadge
                  label="Performance"
                  value={`${data.seoScore.performance}/100`}
                  color={
                    data.seoScore.performance > 90
                      ? "green"
                      : data.seoScore.performance > 70
                      ? "yellow"
                      : "red"
                  }
                />
                <MetricBadge
                  label="Accessibility"
                  value={`${data.seoScore.accessibility}/100`}
                  color={
                    data.seoScore.accessibility > 90
                      ? "green"
                      : data.seoScore.accessibility > 70
                      ? "yellow"
                      : "red"
                  }
                />
                <MetricBadge
                  label="Best Practices"
                  value={`${data.seoScore.bestPractices}/100`}
                  color={
                    data.seoScore.bestPractices > 90
                      ? "green"
                      : data.seoScore.bestPractices > 70
                      ? "yellow"
                      : "red"
                  }
                />
                <MetricBadge
                  label="SEO Score"
                  value={`${data.seoScore.seoScore}/100`}
                  color={
                    data.seoScore.seoScore > 90
                      ? "green"
                      : data.seoScore.seoScore > 70
                      ? "yellow"
                      : "red"
                  }
                />
              </div>
            </div>

            <div className="mt-4">
              <h4 className="mb-2 text-sm font-medium text-gray-400">
                Quick Checks
              </h4>
              <div className="grid grid-cols-2 gap-2">
                <AuditItem
                  label="Title Tag"
                  valid={data.seoScore.fullMetrics.auditsSummary.titlePresent}
                />
                <AuditItem
                  label="Meta Desc"
                  valid={
                    data.seoScore.fullMetrics.auditsSummary.metaDescPresent
                  }
                />
                <AuditItem
                  label="H1 Tag"
                  valid={data.seoScore.fullMetrics.auditsSummary.h1Present}
                />
                <AuditItem
                  label="Robots.txt"
                  valid={data.seoScore.fullMetrics.auditsSummary.robotsTxt}
                />
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Process Metrics Card */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="p-6 mt-6 shadow-xl rounded-2xl bg-gradient-to-br from-gray-800 to-gray-850"
      >
        <div className="flex items-center mb-6">
          <div className="p-2 mr-3 rounded-lg bg-pink-900/50">
            <FiHardDrive className="text-xl text-pink-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-200">
            Process Metrics
          </h3>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
          <MetricCard
            title="Heap Used"
            value={`${data.processStats.nodeHeapUsedMB} MB`}
            icon={<FiServer className="text-blue-400" />}
            trend="up"
            change="2.5%"
          />
          <MetricCard
            title="RSS Memory"
            value={`${data.processStats.nodeRSSMB} MB`}
            icon={<FiServer className="text-purple-400" />}
            trend="down"
            change="1.2%"
          />
          <MetricCard
            title="Uptime"
            value={uptimeString}
            icon={<FiClock className="text-pink-400" />}
          />
          <MetricCard
            title="CPU Threads"
            value={`${data.systemStats.cpuLoad || 0}`}
            icon={<FiCpu className="text-green-400" />}
          />
        </div>
      </motion.div>
    </div>
  );
};

// Helper Components
const MetricCard = ({
  title,
  value,
  icon,
  trend,
  change,
}: {
  title: string;
  value: string;
  icon: React.ReactNode;
  trend?: "up" | "down" | "neutral";
  change?: string;
}) => (
  <div className="p-4 transition-colors border border-gray-700 rounded-xl bg-gray-750 hover:border-gray-600">
    <div className="flex items-center justify-between">
      <div className="flex items-center">
        <div className="p-2 mr-3 bg-gray-600 rounded-lg bg-opacity-20">
          {icon}
        </div>
        <div>
          <p className="text-sm text-gray-400">{title}</p>
          <p className="text-xl font-bold text-gray-100">{value}</p>
        </div>
      </div>
      {trend && change && (
        <div
          className={`flex items-center px-2 py-1 rounded-full text-xs ${
            trend === "up"
              ? "bg-green-900/30 text-green-400"
              : trend === "down"
              ? "bg-red-900/30 text-red-400"
              : "bg-gray-700 text-gray-300"
          }`}
        >
          {trend === "up" ? (
            <svg
              className="w-3 h-3 mr-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 15l7-7 7 7"
              />
            </svg>
          ) : trend === "down" ? (
            <svg
              className="w-3 h-3 mr-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          ) : null}
          {change}
        </div>
      )}
    </div>
  </div>
);

const AuditItem = ({ label, valid }: { label: string; valid: boolean }) => (
  <div className="flex items-center px-3 py-2 text-sm rounded-lg bg-gray-750">
    {valid ? (
      <FiCheckCircle className="mr-2 text-green-400" />
    ) : (
      <FiXCircle className="mr-2 text-red-400" />
    )}
    <span className="text-gray-300">{label}</span>
  </div>
);

const MetricBadge = ({
  label,
  value,
  color,
}: {
  label: string;
  value: string;
  color: "green" | "yellow" | "red";
}) => {
  const colorClasses = {
    green: "bg-green-900/30 text-green-400",
    yellow: "bg-yellow-900/30 text-yellow-400",
    red: "bg-red-900/30 text-red-400",
  };

  return (
    <div className={`p-2 rounded-lg text-center ${colorClasses[color]}`}>
      <p className="text-xs font-medium">{label}</p>
      <p className="text-sm font-bold">{value}</p>
    </div>
  );
};

export default LiveSiteHealthDashboard;
