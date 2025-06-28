import { createApi } from "@reduxjs/toolkit/query/react";
import axiosBaseQuery from "../../Helper/axiosBaseQuery";

export const templateApi = createApi({
  reducerPath: "templateApi",
  baseQuery: axiosBaseQuery,
  tagTypes: ["TEMPLATE"],
  endpoints: (builder) => ({
    getSingleTemplate: builder.query({
      query: (id) => ({
        url: `/template/${id}`,
        method: "GET",
        data: {},
      }),
      providesTags: (result) => (result ? [{ type: "TEMPLATE" as const }] : []),
    }),
    getAllTemplate: builder.query({
      query: () => ({
        url: `/template`,
        method: "GET",
        data: {},
      }),
      providesTags: (result) => (result ? [{ type: "TEMPLATE" as const }] : []),
    }),
    createTemplate: builder.mutation({
      query: (data) => ({
        url: `/template`,
        method: "POST",
        data: data,
      }),
    }),
    metaFileUpload: builder.mutation({
      query: (data) => ({
        url: `/template/meta/upload-media`,
        method: "POST",
        data: data,
      }),
    }),
  }),
});

export const {
  useGetAllTemplateQuery,
  useGetSingleTemplateQuery,
  useCreateTemplateMutation,
  useMetaFileUploadMutation,
} = templateApi;
