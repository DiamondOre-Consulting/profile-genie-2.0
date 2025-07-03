import { createApi } from "@reduxjs/toolkit/query/react";
import axiosBaseQuery from "../../Helper/axiosBaseQuery";

export const portfolioApi = createApi({
  reducerPath: "portfolioApi",
  baseQuery: axiosBaseQuery,
  tagTypes: ["PORTFOLIO"],
  endpoints: (builder) => ({
    getSinglePortfolio: builder.query({
      query: ({ username }) => ({
        url: `/portfolio/${username}`,
        method: "GET",
        data: {},
      }),
      providesTags: (result) =>
        result ? [{ type: "PORTFOLIO" as const }] : [],
    }),
    sendPortfolioStatsOTP: builder.query({
      query: ({ username }) => ({
        url: `/portfolio/${username}/send-otp`,
        method: "GET",
        data: {},
      }),
      providesTags: (result) =>
        result ? [{ type: "PORTFOLIO" as const }] : [],
    }),
    verifyPortfolioStatsOTP: builder.mutation({
      query: ({ email, otp, username }) => ({
        url: `/portfolio/${username}/verify-otp`,
        method: "POST",
        data: { email, otp },
      }),
    }),
  }),
});

export const {
  useGetSinglePortfolioQuery,
  useSendPortfolioStatsOTPQuery,
  useVerifyPortfolioStatsOTPMutation,
} = portfolioApi;
