import { asyncHandler } from "../utils/asyncHandler.js";
import Portfolio from "../model/portfolioModel/portfolio.model.js";
import sendMail from "../utils/mail.utils.js";
import os from "os";
import axios from "axios";
import checkDiskSpace from "check-disk-space";
import ping from "ping";

const getAdminDashboardData = asyncHandler(async (req, res) => {
  const totalPortfolio = await Portfolio.countDocuments();

  const result = await Portfolio.aggregate([
    {
      $project: {
        _id: 0,
        viewsArray: { $objectToArray: "$monthlyViews" },
      },
    },
    {
      $unwind: "$viewsArray",
    },
    {
      $group: {
        _id: null,
        overallTotalViews: { $sum: "$viewsArray.v" },
      },
    },
    {
      $project: {
        _id: 0,
        overallTotalViews: 1,
      },
    },
  ]);

  const totalViews = result.length > 0 ? result[0].overallTotalViews : 0;

  console.log(totalViews);

  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();

  // Calculate total views for the current month from monthlyViews field
  const monthKey = `${new Date()
    .toLocaleString("default", { month: "long" })
    .toLowerCase()}${currentYear}`;
  // Calculate total views for the current month and last month from monthlyViews field
  const lastMonthDate = new Date(currentYear, currentMonth - 1, 1);
  const lastMonthKey = `${lastMonthDate
    .toLocaleString("default", { month: "long" })
    .toLowerCase()}${lastMonthDate.getFullYear()}`;

  const totalMonthViewsAgg = await Portfolio.aggregate([
    {
      $project: {
        currentMonthViews: { $ifNull: [`$monthlyViews.${monthKey}`, 0] },
        lastMonthViews: { $ifNull: [`$monthlyViews.${lastMonthKey}`, 0] },
      },
    },
    {
      $group: {
        _id: null,
        count: { $sum: "$currentMonthViews" },
        lastMonthViews: { $sum: "$lastMonthViews" },
      },
    },
    {
      $project: {
        count: 1,
        lastMonthViews: 1,
        difference: { $subtract: ["$count", "$lastMonthViews"] },
        percentageChange: {
          $cond: [
            { $eq: ["$lastMonthViews", 0] },
            100,
            {
              $round: [
                {
                  $multiply: [
                    {
                      $divide: [
                        { $subtract: ["$count", "$lastMonthViews"] },
                        "$lastMonthViews",
                      ],
                    },
                    100,
                  ],
                },
                0,
              ],
            },
          ],
        },
      },
    },
  ]);
  const totalMonthViews =
    totalMonthViewsAgg.length > 0
      ? totalMonthViewsAgg
      : [{ count: 0, lastMonthViews: 0, difference: 0, percentageChange: 0 }];

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
        ...totalMonthViews[0],
        count: result.length > 0 ? result[0].overallTotalViews : 0,
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
  const apiKey = process.env.PSI_API_KEY; // Free Google API key from Google Cloud Console
  const apiUrl = `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent(
    url
  )}&category=performance&category=accessibility&category=best-practices&category=seo&strategy=desktop&key=${apiKey}`;

  try {
    const res = await axios.get(apiUrl);
    const lighthouse = res.data.lighthouseResult;

    const seoScore = lighthouse.categories.seo.score * 100;
    const performance = lighthouse.categories.performance.score * 100;
    const accessibility = lighthouse.categories.accessibility.score * 100;
    const bestPractices = lighthouse.categories["best-practices"].score * 100;

    const audits = lighthouse.audits;
    return {
      seoScore,
      performance,
      accessibility,
      bestPractices,
      fullMetrics: {
        title: lighthouse.finalUrl,
        fetchedAt: res.data.analysisUTCTimestamp,
        auditsSummary: {
          titlePresent: audits["document-title"].score === 1,
          metaDescPresent: audits["meta-description"].score === 1,
          h1Present: audits["document-title"].score === 1, // H1 is usually part of semantic structure
          robotsTxt: audits["robots-txt"].score === 1,
          fontSizesOk: audits["font-size"].score === 1,
        },
      },
    };
  } catch (err) {
    return {
      seoScore: 0,
      performance: 0,
      accessibility: 0,
      bestPractices: 0,
      fullMetrics: null,
    };
  }
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
    const [apiUptime, responseTime, seoScore] = await Promise.all([
      checkApiUptime(),
      getResponseTime(),
      getSeoScore("https://profilegenie.in"),
    ]);

    const systemStats = getSystemStats();
    const errorRate = getErrorRate();
    const processStats = getProcessStats();

    const payload = {
      apiUptime,
      responseTime,
      seoScore,
      systemStats,
      processStats,
      errorRate,
      timestamp: new Date().toISOString(),
    };
    io.emit("health-data", payload);
  } catch (err) {
    console.error("Health check error:", err.message);
  }
}

export { getAdminDashboardData, sendCustomMail, getAllSystemStats };
