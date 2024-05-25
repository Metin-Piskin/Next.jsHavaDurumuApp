import React, { FC } from "react";
import "weather-react-icons/lib/css/weather-icons.css";
import { WeatherIcon } from "weather-react-icons";

interface CategoryValueProps {
  iconId: any;
  night: any;
  heat: any;
}

const CategoryValue: FC<CategoryValueProps> = ({ iconId, night, heat }) => {
  return (
    <div className="flex">
      <WeatherIcon
        iconId={iconId}
        name="owm"
        night={night}
        className={`text-5xl
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
      <h1 className="flex text-white text-3xl ml-4">
        {heat} <p className="text-sm ">c°</p>
      </h1>
    </div>
  );
};

export default CategoryValue;
