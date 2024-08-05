
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const dayWeatherForecastApi = createApi({
  reducerPath: "dayWeatherForecastApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.openweathermap.org/data/2.5/",
  }),
  endpoints: (builder) => ({
    getWeatherForecast: builder.query({
      query: ({ cityName}) =>
        `forecast?q=${cityName}&appid=${process.env.API_KEY}`,
    }),
  }),
});

export const { useGetWeatherForecastQuery } = dayWeatherForecastApi;
