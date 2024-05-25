import React, { FC } from "react";
import "weather-react-icons/lib/css/weather-icons.css";
import { WeatherIcon } from "weather-react-icons";

interface WeeklyCardsProps {
  day: any;
  iconId: any;
  night: any;
  heat: any;
  heatmin: any;
  i: any;
}

const WeeklyCards: FC<WeeklyCardsProps> = ({
  day,
  iconId,
  night,
  heat,
  heatmin,
  i,
}) => {
  return (
    <div
      className={`${
        i === 0 ? "bg-[#3833D7]" : "bg-[#1D1C22]"
      } rounded-lg w-full items-center flex flex-col`}
    >
      <div className="text-white pb-6 pt-3">{day}</div>
      <WeatherIcon
        iconId={iconId}
        name="owm"
        night={night}
        className={`text-7xl
        ${
          iconId === 800
            ? "text-yellow-300"
            : iconId === 500
            ? "text-blue-300"
            : iconId === 801
            ? "text-red-300"
            : iconId === 802
            ? "text-red-400"
            : iconId === 803
            ? "text-blue-400"
            : iconId === 804
            ? "text-indigo-400"
            : " text-gray-600"
        }
        `}
      />
      <div className="text-white py-3 flex gap-2 items-center">
        <p>{heat}c°</p> - <p className="text-xs text-gray-400">{heatmin}c°</p>
      </div>
    </div>
  );
};

export default WeeklyCards;
