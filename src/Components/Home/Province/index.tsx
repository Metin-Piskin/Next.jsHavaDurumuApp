"use client";

import React, { useState } from "react";
import { useGetIllerQuery } from "@/Redux/services/Iller";
import ProvinceCard from "./ProvinceCard";

const Provinces = () => {
  const { data, error, isLoading } = useGetIllerQuery("");
  const [filter, setFilter] = useState("");

  return (
    <div>
      <div className="flex items-center justify-center">
        <input
          type="text"
          placeholder="Şehir Ara..."
          className="w-1/2 h-10 p-2 rounded-md m-3 outline-none bg-gray-600 text-white"
          value={filter}
          onChange={(e: any) => setFilter(e.target.value)}
        />
      </div>
      <div className="flex flex-wrap gap-8 justify-between items-center  p-5">
        {data
          ?.filter((e: any) =>
            e.il_adi.toLowerCase().includes(filter.toLowerCase())
          )
          .map((e: any) => {
            return (
              <ProvinceCard
                provincename={e.il_adi}
                key={e.plaka}
                id={e.plaka}
                name={e.il_adi}
              />
            );
          })}
      </div>
    </div>
  );
};

export default Provinces;
