import { createApi } from "@reduxjs/toolkit/query/react"
import axiosBaseQuery from "../../Helper/axiosBaseQuery"


export const portfolioApi = createApi({
    reducerPath: "portfolioApi",
    baseQuery: axiosBaseQuery,
    tagTypes: ['PORTFOLIO'],
    endpoints: (builder) => ({
        getSinglePortfolio: builder.query({
            query: ({ username }) => ({
                url: `/portfolio/${username}`,
                method: "GET",
                data: {}
            }),
            providesTags: (result) => result ? [{ type: "PORTFOLIO" as const }] : [],
        }),

    }),
})

export const {
    useGetSinglePortfolioQuery,
} = portfolioApi