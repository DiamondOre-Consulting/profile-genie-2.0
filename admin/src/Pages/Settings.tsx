import LiveSiteHealthDashboard from "@/components/HealthDashboard";
import { Input } from "@/components/ui/input";
import { socket } from "@/Helper/axiosInstance";
import { HomeLayout } from "@/Layout/HomeLayout";
import { HealthData } from "@/validations/AuthValidation";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { Label } from "react-aria-components";

const Settings = () => {
  const [data, setData] = useState<HealthData | null>(null);
  console.log(data);
  useEffect(() => {
    const handleHealthData = (health: HealthData) => {
      setData(health);
    };

    socket.on("health-data", handleHealthData);

    return () => {
      socket.off("health-data", handleHealthData); // 🧼 Cleanup to prevent duplicates
    };
  }, []);

  return (
    <HomeLayout pageName="Settings">
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
      {data && <LiveSiteHealthDashboard data={data} />}
    </HomeLayout>
  );
};

export default Settings;
