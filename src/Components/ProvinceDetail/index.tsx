"use client";

import React, { useState } from "react";
import { useSearchParams } from "next/navigation";
import { useGetWeatherForecastQuery } from "@/Redux/services/WeatherForecast";
import dayjs from "dayjs";

import Loading from "@/app/loading";
import Graph from "@/Components/ProvinceDetail/Graph";
import CategoryValue from "@/Components/ProvinceDetail/CategoryValue";
import CategoryButton from "@/Components/ProvinceDetail/CategoryButton";
import Info from "@/Components/ProvinceDetail/Info";
import WeeklyCards from "@/Components/ProvinceDetail/WeeklyCards";
import ProvinceDetailHeader from "@/Components/ProvinceDetail/ProvinceDetailHeader";

const page = () => {
  const searchParams: any = useSearchParams();
  const provincename = searchParams.get("provincename");

  const [state, setState] = useState("Sıcaklık");

  const { data, error, isLoading } = useGetWeatherForecastQuery({
    cityName: provincename,
  });

  const kelvinToCelsius = (kelvin: any) => (kelvin - 273.15).toFixed(0);

  const dayNames = [
    "Pazar",
    "Pazartesi",
    "Salı",
    "Çarşamba",
    "Perşembe",
    "Cuma",
    "Cumartesi",
  ];
  const seenDates = new Set();
  const weekDays: Array<any> = [];

  for (let i = 0; i < data?.list.length; i++) {
    const date = dayjs(data.list[i].dt_txt).format("YYYY-MM-DD");
    if (!seenDates.has(date)) {
      seenDates.add(date);
      const dayNumber = dayjs(data.list[i].dt_txt).day();
      weekDays.push(dayNames[dayNumber]);
    }

    if (weekDays.length === 7) break;
  }

  return (
    <div>
      {isLoading ? (
        <Loading />
      ) : (
        <div>
          <ProvinceDetailHeader/>
          <div className="flex justify-between px-10 py-5">
            <div>
              <CategoryValue
                iconId={parseInt(
                  data?.list.map((e: any) => e.weather[0]?.id)[0],
                  10
                )}
                night={
                  data?.list
                    .map((e: any) => e.dt_txt)[0]
                    .split(" ")[1]
                    .split(":")[0] >= 18
                    ? true
                    : false
                }
                heat={data?.list
                  .map((e: any) => kelvinToCelsius(e.main.temp))
                  .slice(0, 1)}
              />
              <div className="flex gap-3 mt-4">
                <CategoryButton
                  CategoryButtonText={"Sıcaklık"}
                  Press={state === "Sıcaklık" ? true : false}
                  onClick={() => setState("Sıcaklık")}
                />
                <CategoryButton
                  CategoryButtonText={"Hissedilen"}
                  Press={state === "Hissedilen" ? true : false}
                  onClick={() => setState("Hissedilen")}
                />
                <CategoryButton
                  CategoryButtonText={"Nem"}
                  Press={state === "Nem" ? true : false}
                  onClick={() => setState("Nem")}
                />
                <CategoryButton
                  CategoryButtonText={"Rüzgar"}
                  Press={state === "Rüzgar" ? true : false}
                  onClick={() => setState("Rüzgar")}
                />
              </div>
            </div>
            <Info
              ProvinceName={provincename}
              Day={weekDays[0]}
              Time={data?.list
                .map((e: any) => e.dt_txt.split(" ")[1].slice(0, -3))
                .slice(0, 1)}
              info={data?.list.map((e: any) => e.weather)[0][0].description}
            />
          </div>
          <Graph
            STATE={state}
            LABELS={data?.list
              .map((e: any) => e.dt_txt.split(" ")[1].slice(0, -3))
              .slice(0, 8)}
            COLOR={parseInt(
              data?.list.map((e: any) => e.weather[0]?.id)[0],
              10
            )}
            DATA={
              state === "Sıcaklık"
                ? [
                    data?.list
                      .map((e: any) => kelvinToCelsius(e.main.temp))
                      .slice(0, 8),
                  ]
                : state === "Hissedilen"
                ? [
                    data?.list
                      .map((e: any) => kelvinToCelsius(e.main.feels_like))
                      .slice(0, 8),
                  ]
                : state === "Nem"
                ? [data?.list.map((e: any) => e.main.humidity).slice(0, 8)]
                : state === "Rüzgar"
                ? [data?.list.map((e: any) => e.wind.gust).slice(0, 8)]
                : []
            }
          />
          <div className="mx-24 flex gap-5 items-center my-12">
            {data?.list.slice(0, 6).map((e: any, i: any) => {
              return (
                <WeeklyCards
                  key={i}
                  i={i}
                  day={weekDays[i]}
                  iconId={e.weather[0].id}
                  night={
                    data?.list
                      .map((e: any) => e.dt_txt)[0]
                      .split(" ")[1]
                      .split(":")[0] >= 18
                      ? true
                      : false
                  }
                  heat={kelvinToCelsius(e.main.temp)}
                  heatmin={kelvinToCelsius(e.main.temp_min)}
                />
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default page;
