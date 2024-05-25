"use client";

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const illerApi = createApi({
  reducerPath: "illerApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000/" }),
  endpoints: (builder) => ({
    getIller: builder.query({
      query: () => 'api/Iller',
    }),
  }),
});

export const { useGetIllerQuery } = illerApi;
