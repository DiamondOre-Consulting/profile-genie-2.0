import { createApi } from "@reduxjs/toolkit/query/react"
import axiosBaseQuery from "../../Helper/axiosBaseQuery"

export const catalogueApi = createApi({
    reducerPath: "catalogueApi",
    baseQuery: axiosBaseQuery,
    tagTypes: ['CATALOGUE', 'CATEGORY', 'PRODUCT'],
    endpoints: (builder) => ({
        addCatalogueOwner: builder.mutation({
            query: ({ data }) => ({
                url: "/catalogue/owner",
                method: "POST",
                data: data,
            }),
            invalidatesTags: (result) => result ? [{ type: "CATALOGUE" as const }] : [],
        }),
        editCatalogueOwner: builder.mutation({
            query: ({ formData, ownerId }) => ({
                url: `/catalogue/owner/${ownerId}`,
                method: "PUT",
                data: formData
            }),
            invalidatesTags: (result) => result ? [{ type: "CATALOGUE" as const }] : [],
        }),
        editCatalogue: builder.mutation({
            query: ({ formData, id }) => ({
                url: `/catalogue/edit-catalogue/${id}`,
                method: "PUT",
                data: formData
            })
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
            }),
            providesTags: (result) => result ? [{ type: "CATEGORY" as const }, { type: "CATALOGUE" as const }] : [],
        }),
        addProduct: builder.mutation({
            query: ({ formData }) => ({
                url: "/catalogue/add-product",
                method: "POST",
                data: formData,
            }),
            invalidatesTags: (result) => result ? [{ type: "CATALOGUE" as const }] : [],
        }),
        getAllCategoryProducts: builder.query({
            query: ({ userName }) => ({
                url: `/catalogue/all-products/${userName}`,
                method: "GET",
                data: {}
            }),
            providesTags: (result) => result ? [{ type: "CATEGORY" as const }, { type: "CATALOGUE" as const }] : [],
        }),
        deleteProduct: builder.mutation({
            query: ({ id }) => ({
                url: `/catalogue/delete-product/${id}`,
                method: "DELETE",
                data: {}
            }),
            invalidatesTags: (result) => result ? [{ type: "PRODUCT" as const }] : [],
        }),
        editProduct: builder.mutation({
            query: ({ formData, id }) => ({
                url: `/catalogue/edit-product/${id}`,
                method: "PUT",
                data: formData
            }),
            invalidatesTags: (result) => result ? [{ type: "PRODUCT" as const }] : [],
        }),
        addMetaDetails: builder.mutation({
            query: ({ formData, id }) => ({
                url: `/catalogue/meta/${id}`,
                method: "POST",
                data: formData
            }),
            invalidatesTags: (result) => result ? [{ type: "CATALOGUE" as const }] : []
        }),
        updateMetaDetails: builder.mutation({
            query: ({ formData, id }) => ({
                url: `/catalogue/meta/${id}`,
                method: "PUT",
                data: formData,
            }),
            invalidatesTags: (result) => result ? [{ type: "CATALOGUE" as const }] : []
        }),
        getSingleCatalogue: builder.query({
            query: ({ authId }) => ({
                url: `/catalogue/single/${authId}`,
                method: "GET",
                data: {}
            }),
            providesTags: (result) => result ? [{ type: "CATALOGUE" as const }, { type: "CATEGORY" as const }, { type: "PRODUCT" as const }] : []

        }),
        getAllCatalogues: builder.query({
            query: ({ search, filter }) => ({
                url: `/catalogue/owner?search=${search}&filter=${filter}`,
                method: "GET",
                data: {}
            }),
            providesTags: (result) => result ? [{ type: "CATALOGUE" as const }] : []
        }),
        editCategory: builder.mutation({
            query: ({ userName, data }) => ({
                url: `/catalogue/category/${userName}`,
                method: "PUT",
                data: data
            }),
            invalidatesTags: (result) => result ? [{ type: "CATALOGUE" as const }] : []
        })
    })
})

export const {
    useAddCatalogueOwnerMutation,
    useGetAllCategoryProductsQuery,
    useAddProductMutation,
    useCreateCatalogueMutation,
    useGetAllCategoryQuery,
    useDeleteProductMutation,
    useEditProductMutation,
    useAddMetaDetailsMutation,
    useUpdateMetaDetailsMutation,
    useGetAllCataloguesQuery,
    useGetSingleCatalogueQuery,
    useEditCatalogueOwnerMutation,
    useEditCatalogueMutation,
    useEditCategoryMutation,
} = catalogueApi