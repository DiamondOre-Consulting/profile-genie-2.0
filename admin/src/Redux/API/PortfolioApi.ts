import { createApi } from "@reduxjs/toolkit/query/react";
import axiosBaseQuery from "../../Helper/axiosBaseQuery";

interface AddAccessoriesProps {
  formData: FormData;
}

export const portfolioApi = createApi({
  reducerPath: "portfolioApi",
  baseQuery: axiosBaseQuery,
  tagTypes: ["PORTFOLIO"],
  endpoints: (builder) => ({
    getAllPortfolio: builder.query({
      query: ({ search, filter }) => ({
        url: `/portfolio?search=${search}&filter=${filter}`,
        method: "GET",
        data: {},
      }),
      providesTags: (result) =>
        result ? [{ type: "PORTFOLIO" as const }] : [],
    }),
    addPortfolio: builder.mutation<object, AddAccessoriesProps>({
      query: ({ formData }) => ({
        url: "/portfolio",
        method: "POST",
        data: formData,
      }),
      invalidatesTags: (result) =>
        result ? [{ type: "PORTFOLIO" as const }] : [],
    }),
    updatePortfolio: builder.mutation({
      query: ({ formData, id }) => ({
        url: `/portfolio/${id}`,
        method: "PUT",
        data: formData,
      }),
      invalidatesTags: (result) =>
        result ? [{ type: "PORTFOLIO" as const }] : [],
    }),
    updateOtherDetails: builder.mutation({
      query: ({ formData, id }) => ({
        url: `/portfolio/others/${id}`,
        method: "PUT",
        data: formData,
      }),
      invalidatesTags: (result) =>
        result ? [{ type: "PORTFOLIO" as const }] : [],
    }),
    updateContactDetails: builder.mutation({
      query: ({ formData, id }) => ({
        url: `/portfolio/contact/${id}`,
        method: "PUT",
        data: formData,
      }),
      invalidatesTags: (result) =>
        result ? [{ type: "PORTFOLIO" as const }] : [],
    }),
    updateMetaDetails: builder.mutation({
      query: ({ formData, id }) => ({
        url: `/portfolio/meta/${id}`,
        method: "PUT",
        data: formData,
      }),
      invalidatesTags: (result) =>
        result ? [{ type: "PORTFOLIO" as const }] : [],
    }),
    deletePortfolio: builder.mutation({
      query: ({ id }) => ({
        url: `/portfolio/${id}`,
        method: "DELETE",
        data: {},
      }),
      invalidatesTags: (result) =>
        result ? [{ type: "PORTFOLIO" as const }] : [],
    }),
    getSinglePortfolio: builder.query({
      query: ({ username }) => ({
        url: `/portfolio/${username}?admin=true`,
        method: "GET",
        data: {},
      }),
      providesTags: (result) =>
        result ? [{ type: "PORTFOLIO" as const }] : [],
    }),
    addOtherDetails: builder.mutation({
      query: ({ formData, id }) => ({
        url: `/portfolio/others/${id}`,
        method: "POST",
        data: formData,
      }),
      invalidatesTags: (result) =>
        result ? [{ type: "PORTFOLIO" as const }] : [],
    }),
    addContactDetails: builder.mutation({
      query: ({ formData, id }) => ({
        url: `/portfolio/contact/${id}`,
        method: "POST",
        data: formData,
      }),
    }),
    addMetaDetails: builder.mutation({
      query: ({ formData, id }) => ({
        url: `/portfolio/meta/${id}`,
        method: "POST",
        data: formData,
      }),
    }),
    restorePortfolio: builder.mutation({
      query: ({ id }) => ({
        url: `/portfolio/restore/${id}`,
        method: "PUT",
        data: {},
      }),
      invalidatesTags: (result) =>
        result ? [{ type: "PORTFOLIO" as const }] : [],
    }),
    recyclePortfolio: builder.mutation({
      query: ({ id }) => ({
        url: `/portfolio/recycle/${id}`,
        method: "PUT",
        data: {},
      }),
      invalidatesTags: (result) =>
        result ? [{ type: "PORTFOLIO" as const }] : [],
    }),
    getRecycledPortfolio: builder.query({
      query: () => ({
        url: `/portfolio/recycle/all-portfolio`,
        method: "GET",
        data: {},
      }),
      providesTags: (result) =>
        result ? [{ type: "PORTFOLIO" as const }] : [],
    }),
    updateActiveStatus: builder.mutation({
      query: ({ id }) => ({
        url: `/portfolio/update-active-status/${id}`,
        method: "PUT",
        data: {},
      }),
      invalidatesTags: (result) =>
        result ? [{ type: "PORTFOLIO" as const }] : [],
    }),
    updatePaidStatus: builder.mutation({
      query: ({ id }) => ({
        url: `/portfolio/update-paid-status/${id}`,
        method: "PUT",
        data: {},
      }),
      invalidatesTags: (result) =>
        result ? [{ type: "PORTFOLIO" as const }] : [],
    }),
  }),
});

export const {
  useAddPortfolioMutation,
  useAddContactDetailsMutation,
  useUpdateOtherDetailsMutation,
  useAddMetaDetailsMutation,
  useAddOtherDetailsMutation,
  useUpdatePortfolioMutation,
  useDeletePortfolioMutation,
  useGetAllPortfolioQuery,
  useGetSinglePortfolioQuery,
  useUpdateContactDetailsMutation,
  useUpdateMetaDetailsMutation,
  useRestorePortfolioMutation,
  useRecyclePortfolioMutation,
  useGetRecycledPortfolioQuery,
  useUpdateActiveStatusMutation,
  useUpdatePaidStatusMutation,
} = portfolioApi;
