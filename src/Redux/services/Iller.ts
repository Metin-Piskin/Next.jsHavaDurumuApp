"use client";

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const illerApi = createApi({
  reducerPath: "illerApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://next-js-hava-durumu-app.vercel.app/" }),
  endpoints: (builder) => ({
    getIller: builder.query({
      query: () => 'api/Iller',
    }),
  }),
});

export const { useGetIllerQuery } = illerApi;
