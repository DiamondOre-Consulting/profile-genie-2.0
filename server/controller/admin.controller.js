import { asyncHandler } from "../utils/asyncHandler.js";
import Portfolio from "../model/portfolioModel/portfolio.model.js";
import sendMail from "../utils/mail.utils.js";
import os from "os";
import axios from "axios";
import checkDiskSpace from "check-disk-space";
import ping from "ping";

const getAdminDashboardData = asyncHandler(async (req, res) => {
  const totalPortfolio = await Portfolio.countDocuments();

  const totalViews = await Portfolio.aggregate([
    { $group: { _id: null, totalViews: { $sum: "$views" } } },
  ]);

  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();

  const totalMonthViews = await Portfolio.aggregate([
    {
      $facet: {
        thisMonth: [
          {
            $match: {
              createdAt: {
                $gte: new Date(currentYear, currentMonth, 1),
                $lte: new Date(currentYear, currentMonth + 1, 0),
              },
            },
          },
          {
            $group: {
              _id: null,
              totalViews: { $sum: "$views" },
            },
          },
        ],
        lastMonth: [
          {
            $match: {
              createdAt: {
                $gte: new Date(currentYear, currentMonth - 1, 1),
                $lte: new Date(currentYear, currentMonth, 0),
              },
            },
          },
          {
            $group: {
              _id: null,
              totalViews: { $sum: "$views" },
            },
          },
        ],
      },
    },
    {
      $project: {
        count: {
          $ifNull: [{ $arrayElemAt: ["$thisMonth.totalViews", 0] }, 0],
        },
        lastMonthViews: {
          $ifNull: [{ $arrayElemAt: ["$lastMonth.totalViews", 0] }, 0],
        },
        difference: {
          $let: {
            vars: {
              diff: {
                $subtract: [
                  {
                    $ifNull: [
                      { $arrayElemAt: ["$thisMonth.totalViews", 0] },
                      0,
                    ],
                  },
                  {
                    $ifNull: [
                      { $arrayElemAt: ["$lastMonth.totalViews", 0] },
                      0,
                    ],
                  },
                ],
              },
            },
            in: {
              $concat: [
                { $cond: [{ $gt: ["$$diff", 0] }, "+", ""] },
                { $toString: "$$diff" },
              ],
            },
          },
        },
        percentageChange: {
          $cond: [
            {
              $eq: [
                {
                  $ifNull: [{ $arrayElemAt: ["$lastMonth.totalViews", 0] }, 0],
                },
                0,
              ],
            },
            {
              $cond: [
                {
                  $gt: [
                    {
                      $ifNull: [
                        { $arrayElemAt: ["$thisMonth.totalViews", 0] },
                        0,
                      ],
                    },
                    0,
                  ],
                },
                100,
                0,
              ],
            },
            {
              $multiply: [
                {
                  $divide: [
                    {
                      $subtract: [
                        {
                          $ifNull: [
                            { $arrayElemAt: ["$thisMonth.totalViews", 0] },
                            0,
                          ],
                        },
                        {
                          $ifNull: [
                            { $arrayElemAt: ["$lastMonth.totalViews", 0] },
                            0,
                          ],
                        },
                      ],
                    },
                    {
                      $ifNull: [
                        { $arrayElemAt: ["$lastMonth.totalViews", 0] },
                        0,
                      ],
                    },
                  ],
                },
                100,
              ],
            },
          ],
        },
      },
    },
  ]);

  const top5Portfolio = await Portfolio.find(
    {},
    "fullName userName views email"
  )
    .sort({ views: -1 })
    .limit(10);

  const thisMonth = await Portfolio.countDocuments({
    createdAt: {
      $gte: new Date(currentYear, currentMonth, 1),
      $lte: new Date(currentYear, currentMonth + 1, 0),
    },
  });

  const lastMonth = await Portfolio.countDocuments({
    createdAt: {
      $gte: new Date(currentYear, currentMonth - 1, 1),
      $lte: new Date(currentYear, currentMonth, 0),
    },
  });

  const difference = thisMonth - lastMonth;
  const percentageChange =
    lastMonth === 0 ? 100 : (difference / lastMonth) * 100;

  const totalPortfolioThisMonth = {
    count: thisMonth,
    difference: difference > 0 ? `+${difference}` : difference,
    percentageChange: Math.round(percentageChange),
  };

  res.status(200).json({
    success: true,
    top5Portfolio,
    stats: [
      {
        title: "Total Portfolio",
        count: totalPortfolio,
        difference: totalPortfolioThisMonth?.difference,
        percentageChange: totalPortfolioThisMonth?.percentageChange,
      },
      {
        title: "Total Views",
        count: totalViews[0]?.totalViews || 0,
        ...totalMonthViews[0],
      },
      {
        title: `${new Date().toLocaleString("default", {
          month: "long",
        })} Portfolio`,
        ...totalPortfolioThisMonth,
      },
      {
        title: `${new Date().toLocaleString("default", {
          month: "long",
        })} Views`,
        ...totalMonthViews[0],
      },
    ],
  });
});

const sendCustomMail = asyncHandler(async (req, res) => {
  console.log(req.body);
  const { email, mailSubject, mailBody } = req.body;

  if (!mailSubject || !mailBody) {
    throw new AppError("Mail subject and body is required", 400);
  }

  if (email) {
    await sendMail(email, mailSubject, mailBody);
  } else {
    const allPortfolio = await Portfolio.find({});

    allPortfolio.forEach(async (data, index) => {
      await sendMail(data?.email, mailSubject, mailBody);
    });
  }

  res.status(200).json({
    success: true,
    message: "Email sent successfully",
  });
});

// 2. API uptime via /ping route
async function checkApiUptime() {
  try {
    const res = await axios.get("https://server.profilegenie.in/ping");
    return res.status === 200;
  } catch {
    return false;
  }
}

// 3. HTTP response time
async function getResponseTime() {
  const start = Date.now();
  try {
    await axios.get("https://profilegenie.in");
  } catch {}
  return Date.now() - start;
}

// 4. Simple SEO score estimation
async function getSeoScore(url) {
  try {
    const res = await axios.get(url);
    const html = res.data;
    const hasTitle = /<title>(.*?)<\/title>/i.test(html);
    const hasMetaDesc = /<meta[^>]*name=["']description["'][^>]*>/i.test(html);
    const hasH1 = /<h1[^>]*>(.*?)<\/h1>/i.test(html);

    let score = 0;
    if (hasTitle) score += 30;
    if (hasMetaDesc) score += 30;
    if (hasH1) score += 30;
    return score;
  } catch {
    return 0;
  }
}

// 5. Disk usage percent
async function getDiskUsage() {
  const path = process.platform === "win32" ? "C:\\" : "/";
  const { size, free } = await checkDiskSpace(path);
  const used = size - free;
  return ((used / size) * 100).toFixed(2);
}

// 6. Memory and CPU stats
function getSystemStats() {
  const total = os.totalmem();
  const free = os.freemem();
  const used = total - free;
  const memoryUsagePercent = ((used / total) * 100).toFixed(2);
  const cpuLoad1m = os.loadavg()[0].toFixed(2);

  return { memoryUsagePercent, cpuLoad: cpuLoad1m };
}

// 7. Simulated error rate (random for demo)
function getErrorRate() {
  return (Math.random() * 5).toFixed(2);
}

// 8. Node process usage stats
function getProcessStats() {
  const memory = process.memoryUsage();
  return {
    nodeHeapUsedMB: (memory.heapUsed / 1024 / 1024).toFixed(2),
    nodeRSSMB: (memory.rss / 1024 / 1024).toFixed(2),
    uptimeSeconds: process.uptime().toFixed(0),
  };
}

// 🔁 Final function to emit data
async function getAllSystemStats(io) {
  try {
    const [siteUptime, apiUptime, responseTime, seoScore, diskUsage] =
      await Promise.all([
        checkApiUptime(),
        getResponseTime(),
        getSeoScore("https://profilegenie.in"),
        getDiskUsage(),
      ]);

    const systemStats = getSystemStats();
    const errorRate = getErrorRate();
    const processStats = getProcessStats();

    const payload = {
      siteUptime,
      apiUptime,
      responseTime,
      seoScore,
      diskUsage,
      systemStats,
      processStats,
      errorRate,
      timestamp: new Date().toISOString(),
    };
    console.log(payload);
    io.emit("health-data", payload);
  } catch (err) {
    console.error("Health check error:", err.message);
  }
}

export { getAdminDashboardData, sendCustomMail, getAllSystemStats };
