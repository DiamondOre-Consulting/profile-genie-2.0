import { createApi } from "@reduxjs/toolkit/query/react"
import axiosBaseQuery from "../../Helper/axiosBaseQuery"

interface AddAccessoriesProps {
    formData: FormData;
    id: string;
}

export const portfolioApi = createApi({
    reducerPath: "portfolioApi",
    baseQuery: axiosBaseQuery,
    tagTypes: ['PORTFOLIO'],
    endpoints: (builder) => ({
        getAllPortfolio: builder.query({
            query: () => ({
                url: `/portfolio`,
                method: "GET",
                data: {},
            }),
            providesTags: (result) => result ? [{ type: "PORTFOLIO" as const }] : [],
        }),
        addPortfolio: builder.mutation<object, AddAccessoriesProps>({
            query: ({ formData }) => ({
                url: "/portfolio",
                method: "POST",
                data: formData,
            }),
            invalidatesTags: (result) => result ? [{ type: "PORTFOLIO" as const }] : [],
        }),
        updatePortfolio: builder.mutation<object, AddAccessoriesProps>({
            query: ({ formData, id }) => ({
                url: `/portfolio/${id}`,
                method: "PUT",
                data: formData,
            }),
            invalidatesTags: (result) => result ? [{ type: "PORTFOLIO" as const }] : [],
        }),
        deletePortfolio: builder.mutation({
            query: ({ id }) => ({
                url: `/portfolio/${id}`,
                method: "DELETE",
                data: {},
            }),
            invalidatesTags: (result) => result ? [{ type: "PORTFOLIO" as const }] : [],
        }),


    }),
})

export const { useAddPortfolioMutation, useUpdatePortfolioMutation, useDeletePortfolioMutation, useGetAllPortfolioQuery } = portfolioApi