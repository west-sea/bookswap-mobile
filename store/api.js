import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl = process.env.EXPO_PUBLIC_API_BASE_URL;

export const api = createApi({
  reducerPath: "api",
  tagTypes: ["user", "exchanges"],
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers, { getState }) => {
      const { auth } = getState();
      if (auth.token) {
        headers.set("Authorization", `Bearer ${auth.token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (body) => ({
        url: "auth/login",
        method: "POST",
        body,
      }),
      invalidatesTags: ["user"],
    }),
    board: builder.mutation({
      query: (body) => ({
        headers: {
          "Content-Type": "multipart/form-data",
        },
        url: "auth/board",
        method: "POST",
        body,
      }),
      invalidatesTags: ["user"],
    }),
    getMe: builder.query({
      query: () => "auth/me",
      providesTags: ["user"],
    }),
    editProfile: builder.mutation({
      query: (body) => ({
        headers: {
          "Content-Type": "multipart/form-data",
        },
        url: "auth/modify",
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["user"],
    }),
    getMyExchanges: builder.query({
      query: () => "exchanges/my",
      providesTags: ["exchanges"],
    }),
  }),
});
