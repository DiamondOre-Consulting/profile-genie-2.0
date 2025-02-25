import { createApi } from "@reduxjs/toolkit/query/react"
import axiosBaseQuery from "../../Helper/axiosBaseQuery"

interface AddAccessoriesProps {
    formData: FormData;
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
        updatePortfolio: builder.mutation({
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
        getSinglePortfolio: builder.query({
            query: ({ id }) => ({
                url: `/portfolio/${id}`,
                method: "GET",
                data: {}
            })
        }),
        addOtherDetails: builder.mutation({
            query: ({ formData, id }) => ({
                url: `/portfolio/others/${id}`,
                method: "POST",
                data: formData
            }),
            invalidatesTags: (result) => result ? [{ type: "PORTFOLIO" as const }] : [],
        }),
        addContactDetails: builder.mutation({
            query: ({ formData, id }) => ({
                url: `/portfolio/contact/${id}`,
                method: "POST",
                data: formData
            })
        }),
        addMetaDetails: builder.mutation({
            query: ({ formData, id }) => ({
                url: `/portfolio/meta/${id}`,
                method: "POST",
                data: formData
            })
        })


    }),
})

export const { useAddPortfolioMutation, useAddContactDetailsMutation, useAddMetaDetailsMutation, useAddOtherDetailsMutation, useUpdatePortfolioMutation, useDeletePortfolioMutation, useGetAllPortfolioQuery, useGetSinglePortfolioQuery } = portfolioApi