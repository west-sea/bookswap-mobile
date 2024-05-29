import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl = process.env.EXPO_PUBLIC_API_BASE_URL;

export const api = createApi({
  reducerPath: "api",
  tagTypes: ["user", "exchanges", "books"],
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers, { getState, endpoint, extra }) => {
      const { auth } = getState();
      console.log(endpoint, extra);
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
    uploadBook: builder.mutation({
      query: (body) => ({
        headers: {
          "Content-Type": "multipart/form-data",
        },
        url: "books/upload",
        method: "POST",
        body,
      }),
      invalidatesTags: ["books"],
    }),
    getMyBookshelf: builder.query({
      query: () => "books/bookshelf/my",
      providesTags: ["books"],
    }),
    deleteBook: builder.mutation({
      query: (id) => ({
        url: `books/${id}/delete`,
        method: "DELETE",
      }),
      invalidatesTags: ["books"],
    }),
    getBook: builder.query({
      query: (id) => `books/${id}`,
      providesTags: ["books"],
    }),
    editBook: builder.mutation({
      query: ({ id, body }) => ({
        headers: {
          "Content-Type": "multipart/form-data",
        },
        url: `books/${id}/edit`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["books"],
    }),
    searchUsers: builder.mutation({
      query: (text) => ({
        url: `users/search`,
        params: {
          text,
        },
        method: "GET",
      }),
    }),
    getFeed: builder.query({
      query: () => "books/feed",
      providesTags: ["books"],
    }),
  }),
});
