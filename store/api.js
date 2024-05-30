import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl = process.env.EXPO_PUBLIC_API_BASE_URL;

export const api = createApi({
  reducerPath: "api",
  tagTypes: ["user", "exchanges", "books", "chats", "notifications"],
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers, { getState, endpoint, extra }) => {
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
      providesTags: ["exchanges", "books"],
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
      providesTags: ["books", "exchanges"],
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
    searchBooks: builder.query({
      query: (text) => ({
        url: "books/search",
        params: {
          text,
        },
        method: "GET",
      }),
      providesTags: ["books"],
    }),
    requestBook: builder.mutation({
      query: (bookId) => ({
        url: `exchanges/request`,
        method: "POST",
        body: {
          bookId,
        },
      }),
      invalidatesTags: ["books", "exchanges", "notifications"],
    }),
    getBookExchanges: builder.query({
      query: (id) => `exchanges/${id}`,
      providesTags: ["books", "exchanges"],
    }),
    getUserBookshelf: builder.query({
      query: (id) => `books/bookshelf/${id}`,
      providesTags: ["books"],
    }),
    acceptRequest: builder.mutation({
      query: ({ bookId, exchangeId }) => ({
        url: `exchanges/accept`,
        method: "POST",
        body: {
          bookId,
          exchangeId,
        },
      }),
      invalidatesTags: ["books", "exchanges", "notifications"],
    }),
    getChats: builder.query({
      query: () => `chats`,
      providesTags: ["chats", "exchanges"],
    }),
    getChat: builder.query({
      query: (id) => `chats/${id}`,
      providesTags: ["chats", "exchanges"],
    }),
    completeSwap: builder.mutation({
      query: (exchangeId) => ({
        url: `exchanges/swap`,
        method: "POST",
        body: {
          exchangeId,
        },
      }),
      invalidatesTags: ["exchanges", "chats", "notifications"],
    }),
    getNotifications: builder.query({
      query: () => "/notifications/my",
      providesTags: ["notifications"],
    }),
  }),
});
