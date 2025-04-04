import { createApi } from "@reduxjs/toolkit/query/react"
import axiosBaseQuery from "../../Helper/axiosBaseQuery"

export const catalogueApi = createApi({
    reducerPath: "catalogueApi",
    baseQuery: axiosBaseQuery,
    tagTypes: ['CATALOGUE'],
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
            })
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
            })
        }),
        deleteProduct: builder.mutation({
            query: ({ id }) => ({
                url: `/catalogue/delete-product/${id}`,
                method: "DELETE",
                data: {}
            })
        }),
        editProduct: builder.mutation({
            query: ({ formData, id }) => ({
                url: `/catalogue/edit-product/${id}`,
                method: "PUT",
                data: formData
            })
        }),
        addMetaDetails: builder.mutation({
            query: ({ formData, id }) => ({
                url: `/catalogue/meta/${id}`,
                method: "POST",
                data: formData
            })
        }),
        updateMetaDetails: builder.mutation({
            query: ({ formData, id }) => ({
                url: `/catalogue/meta/${id}`,
                method: "PUT",
                data: formData,
            }),
        }),
        getSingleCatalogue: builder.query({
            query: ({ username }) => ({
                url: `/catalogue/single/${username}`,
                method: "GET",
                data: {}
            })
        }),
        getAllCatalogues: builder.query({
            query: ({ search, filter }) => ({
                url: `/catalogue/owner?search=${search}&filter=${filter}`,
                method: "GET",
                data: {}
            }),
            providesTags: (result) => result ? [{ type: "CATALOGUE" as const }] : []
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
    useEditCatalogueMutation
} = catalogueApi