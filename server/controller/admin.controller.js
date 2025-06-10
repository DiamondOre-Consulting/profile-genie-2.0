import { asyncHandler } from "../utils/asyncHandler.js";
import Portfolio from "../model/portfolioModel/portfolio.model.js";

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
    .limit(5);

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

export { getAdminDashboardData };
