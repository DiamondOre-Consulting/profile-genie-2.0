import { createApi } from "@reduxjs/toolkit/query/react"
import axiosBaseQuery from "../../Helper/axiosBaseQuery"

interface formProps {
    formData: FormData;
}

export const catalogueApi = createApi({
    reducerPath: "catalogueApi",
    baseQuery: axiosBaseQuery,
    tagTypes: ['CATALOGUE'],
    endpoints: (builder) => ({
        addCatalogueOwner: builder.mutation({
            query: ({ data }) => ({
                url: "/catalogue",
                method: "POST",
                data: data,
            }),
            invalidatesTags: (result) => result ? [{ type: "CATALOGUE" as const }] : [],
        }),
        createCatalogue: builder.mutation({
            query: ({ formData }) => ({
                url: "/catalogue/create-catalogue",
                method: "POST",
                data: formData,
            }),
            invalidatesTags: (result) => result ? [{ type: "CATALOGUE" as const }] : [],
        }),
        getAllCategory: builder.query({
            query: ({ ownerId }) => ({
                url: `/catalogue/category/${ownerId}`,
                method: "GET",
                data: {}
            })
        })
    }),
})

export const { useAddCatalogueOwnerMutation, useCreateCatalogueMutation, useGetAllCategoryQuery
} = catalogueApi