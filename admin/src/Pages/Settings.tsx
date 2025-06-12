import { Input } from "@/components/ui/input";
import { socket } from "@/Helper/axiosInstance";
import { HomeLayout } from "@/Layout/HomeLayout";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { Label } from "react-aria-components";

type HealthData = {
  siteUptime: boolean;
  apiUptime: boolean;
  responseTime: number;
  seoScore: number;
  diskUsage: string;
  systemStats: {
    memoryUsagePercent: string;
    cpuLoad: string;
  };
  processStats: {
    nodeHeapUsedMB: string;
    nodeRSSMB: string;
    uptimeSeconds: string;
  };
  errorRate: string;
  timestamp: string;
};

const Settings = () => {
  const [data, setData] = useState<HealthData | null>(null);
  console.log(data);
  useEffect(() => {
    socket.on("health-data", (health: HealthData) => {
      setData(health);
    });
  }, []);

  return (
    <HomeLayout>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
        <AnimatePresence>
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
            className="relative w-full mx-auto group"
          >
            <div className="absolute rounded- bg-gradient-to-r from-[#E11D48] via-[#E11D48] to-orange-500 opacity-10 blur-sm transition-all duration-500 group-hover:opacity-80 group-hover:blur-lg"></div>
            <div className="relative w-full p-2 border shadow-md rounded-xl border-white/20 bg-gradient-to-b from-black/80 via-gray-950 to-black">
              <div className="absolute inset-x-0 h-px transition-opacity duration-500 opacity-0 top-px bg-gradient-to-r from-transparent via-rose-500 to-transparent group-hover:opacity-100"></div>
              <div className="absolute inset-x-0 h-px transition-opacity duration-500 opacity-0 bottom-px bg-gradient-to-r from-transparent via-orange-500 to-transparent group-hover:opacity-100"></div>

              <div className="flex flex-col items-center justify-center p-3 pt-2 space-y-4">
                <h2 className="mb-4 text-[1.5rem] text-center font-semibold text-white">
                  Schedule Maintenance
                </h2>
                <div className="flex items-center gap-4">
                  <div className="flex flex-col items-center justify-center">
                    <Label
                      htmlFor="days"
                      className="block mb-1 text-sm text-gray-400"
                    >
                      Days
                    </Label>
                    <Input
                      type="number"
                      id="days"
                      min="0"
                      className="p-2 text-2xl text-center text-white rounded-lg size-14 focus:outline-none focus:border-rose-500"
                      placeholder="00"
                    />
                  </div>
                  <div className="flex flex-col items-center">
                    <Label
                      htmlFor="hours"
                      className="block mb-1 text-sm text-gray-400"
                    >
                      Hours
                    </Label>
                    <Input
                      type="number"
                      id="hours"
                      min="0"
                      max="23"
                      className="p-2 text-2xl text-center text-white rounded-lg size-14 focus:outline-none focus:border-rose-500"
                      placeholder="00"
                    />
                  </div>

                  <div className="flex flex-col items-center justify-center">
                    <Label
                      htmlFor="minutes"
                      className="block mb-1 text-sm text-gray-400"
                    >
                      Minutes
                    </Label>
                    <Input
                      type="number"
                      id="minutes"
                      min="0"
                      max="59"
                      className="p-2 text-2xl text-center text-white rounded-lg size-14 focus:outline-none focus:border-rose-500"
                      placeholder="00"
                    />
                  </div>
                </div>
                <button className="px-6 py-2  text-white transition-opacity rounded-lg bg-[#E11D48] hover:opacity-90">
                  Schedule and send mail
                </button>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
        <AnimatePresence>
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
            className="relative w-full mx-auto group"
          >
            <div className="absolute rounded- bg-gradient-to-r from-[#E11D48] via-[#E11D48] to-orange-500 opacity-10 blur-sm transition-all duration-500 group-hover:opacity-80 group-hover:blur-lg"></div>
            <div className="relative w-full p-2 border shadow-md rounded-xl border-white/20 bg-gradient-to-b from-black/80 via-gray-950 to-black">
              <div className="absolute inset-x-0 h-px transition-opacity duration-500 opacity-0 top-px bg-gradient-to-r from-transparent via-rose-500 to-transparent group-hover:opacity-100"></div>
              <div className="absolute inset-x-0 h-px transition-opacity duration-500 opacity-0 bottom-px bg-gradient-to-r from-transparent via-orange-500 to-transparent group-hover:opacity-100"></div>

              <div className="flex flex-col items-center justify-center p-3 pt-2 space-y-4">
                <h2 className="mb-4 text-[1.5rem] text-center font-semibold text-white">
                  Go Live
                </h2>
                <p className="px-4 text-sm text-center text-gray-400">
                  If everything is working as expected, click "Go live" to
                  notify all portfolio members via email about the system's
                  availability.
                </p>
                <button className="px-6 py-2  text-white transition-opacity rounded-lg bg-[#E11D48] hover:opacity-90">
                  Go live and send mail
                </button>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
        <AnimatePresence>
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
            className="relative w-full mx-auto group"
          >
            <div className="absolute rounded- bg-gradient-to-r from-[#E11D48] via-[#E11D48] to-orange-500 opacity-10 blur-sm transition-all duration-500 group-hover:opacity-80 group-hover:blur-lg"></div>
            <div className="relative w-full p-2 border shadow-md rounded-xl border-white/20 bg-gradient-to-b from-black/80 via-gray-950 to-black">
              <div className="absolute inset-x-0 h-px transition-opacity duration-500 opacity-0 top-px bg-gradient-to-r from-transparent via-rose-500 to-transparent group-hover:opacity-100"></div>
              <div className="absolute inset-x-0 h-px transition-opacity duration-500 opacity-0 bottom-px bg-gradient-to-r from-transparent via-orange-500 to-transparent group-hover:opacity-100"></div>

              <div className="flex flex-col items-center justify-center p-3 pt-2 space-y-4">
                <h2 className="mb-4 text-[1.5rem] text-center font-semibold text-white">
                  Schedule Maintenance
                </h2>
                <div className="flex items-center gap-4">
                  <div className="flex flex-col items-center justify-center">
                    <Label
                      htmlFor="days"
                      className="block mb-1 text-sm text-gray-400"
                    >
                      Days
                    </Label>
                    <Input
                      type="number"
                      id="days"
                      min="0"
                      className="p-2 text-2xl text-center text-white rounded-lg size-14 focus:outline-none focus:border-rose-500"
                      placeholder="00"
                    />
                  </div>
                  <div className="flex flex-col items-center">
                    <Label
                      htmlFor="hours"
                      className="block mb-1 text-sm text-gray-400"
                    >
                      Hours
                    </Label>
                    <Input
                      type="number"
                      id="hours"
                      min="0"
                      max="23"
                      className="p-2 text-2xl text-center text-white rounded-lg size-14 focus:outline-none focus:border-rose-500"
                      placeholder="00"
                    />
                  </div>

                  <div className="flex flex-col items-center justify-center">
                    <Label
                      htmlFor="minutes"
                      className="block mb-1 text-sm text-gray-400"
                    >
                      Minutes
                    </Label>
                    <Input
                      type="number"
                      id="minutes"
                      min="0"
                      max="59"
                      className="p-2 text-2xl text-center text-white rounded-lg size-14 focus:outline-none focus:border-rose-500"
                      placeholder="00"
                    />
                  </div>
                </div>
                <button className="px-6 py-2  text-white transition-opacity rounded-lg bg-[#E11D48] hover:opacity-90">
                  Schedule and send mail
                </button>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
      <div className="max-w-lg p-4 mx-auto bg-white shadow-lg rounded-xl">
        <h2 className="mb-4 text-2xl font-semibold text-center text-indigo-700">
          🔍 Live Site Health
        </h2>

        {data ? (
          <div className="space-y-3 text-sm text-gray-800">
            <div>
              🌐 Site Uptime:{" "}
              <span
                className={data.siteUptime ? "text-green-600" : "text-red-600"}
              >
                <strong>{data.siteUptime ? "✅ Up" : "❌ Down"}</strong>
              </span>
            </div>

            <div>
              🛠 API Uptime:{" "}
              <span
                className={data.apiUptime ? "text-green-600" : "text-red-600"}
              >
                <strong>{data.apiUptime ? "✅ Up" : "❌ Down"}</strong>
              </span>
            </div>

            <div>
              ⚡ Response Time:{" "}
              <strong className="text-blue-600">{data?.responseTime} ms</strong>
            </div>

            <div>
              📈 SEO Score:{" "}
              <strong className="text-green-700">{data?.seoScore}/90</strong>
            </div>

            <div>
              💾 Disk Usage:{" "}
              <strong className="text-orange-700">{data?.diskUsage}%</strong>
            </div>

            <div>
              🧠 Memory Usage:{" "}
              <strong className="text-purple-600">
                {data.systemStats?.memoryUsagePercent}%
              </strong>
            </div>

            <div>
              🧮 CPU Load (1m):{" "}
              <strong className="text-pink-600">
                {data.systemStats?.cpuLoad}
              </strong>
            </div>

            <div>
              ❗ Error Rate:{" "}
              <strong className="text-red-500">{data?.errorRate}%</strong>
            </div>

            <div>
              🔧 Node Heap Used:{" "}
              <strong className="text-teal-600">
                {data.processStats?.nodeHeapUsedMB} MB
              </strong>
            </div>

            <div>
              📦 Node RSS:{" "}
              <strong className="text-indigo-500">
                {data.processStats?.nodeRSSMB} MB
              </strong>
            </div>

            <div>
              ⏱ Server Uptime:{" "}
              <strong className="text-gray-700">
                {Math.floor(
                  Number(data?.processStats?.uptimeSeconds || 0) / 60
                )}{" "}
                min {Number(data?.processStats?.uptimeSeconds || 0) % 60} sec
              </strong>
            </div>

            <p className="text-xs text-right text-gray-400">
              Last Updated: {new Date(data.timestamp).toLocaleTimeString()}
            </p>
          </div>
        ) : (
          <p className="text-center text-gray-500 animate-pulse">
            Waiting for data...
          </p>
        )}
      </div>
    </HomeLayout>
  );
};

export default Settings;
