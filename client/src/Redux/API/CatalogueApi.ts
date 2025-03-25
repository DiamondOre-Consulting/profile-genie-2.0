import { createApi } from "@reduxjs/toolkit/query/react"
import axiosBaseQuery from "../../Helper/axiosBaseQuery"

export const catalogueApi = createApi({
    reducerPath: "catalogueApi",
    baseQuery: axiosBaseQuery,
    tagTypes: ['CATALOGUE'],
    endpoints: (builder) => ({
        getSingleCatalogue: builder.query({
            query: ({ username }) => ({
                url: `/catalogue/single/${username}`,
                method: "GET",
                data: {}
            }),
            providesTags: (result) => result ? [{ type: "CATALOGUE" as const }] : [],
        }),

    }),
})

export const {
    useGetSingleCatalogueQuery,
} = catalogueApi