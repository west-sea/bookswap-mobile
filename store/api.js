import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl = process.env.EXPO_PUBLIC_API_BASE_URL;

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers, { getState }) => {
      const { auth } = getState();
      console.log(auth);
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
    }),
    getMe: builder.query({
      query: () => "auth/me",
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
    }),
  }),
});
