import { configureStore } from "@reduxjs/toolkit";

import { setupListeners } from "@reduxjs/toolkit/query";
import { illerApi } from "./services/Iller";
import { dayWeatherForecastApi } from "./services/WeatherForecast";

export const store = configureStore({
  reducer: {
    [illerApi.reducerPath]: illerApi.reducer,
    [dayWeatherForecastApi.reducerPath]: dayWeatherForecastApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(illerApi.middleware)
      .concat(dayWeatherForecastApi.middleware),
});

setupListeners(store.dispatch);
