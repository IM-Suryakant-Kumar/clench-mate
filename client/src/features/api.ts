import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BASE_URL,
    credentials: "include"
  }),
  tagTypes: ["Auth", "User", "Post", "Comment", "Like", "Save"],
  endpoints: () => ({}),
})