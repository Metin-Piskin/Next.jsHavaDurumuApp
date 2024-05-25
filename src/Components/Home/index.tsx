"use client";

import React, { useState } from "react";
import SwitchButton from "@/Components/Home/SwitchButton";
import Map from "@/Components/Home/Map";
import Province from "@/Components/Home/Province";

const Home = () => {
  const [switchValue, setSwitchValue] = useState("Province");
  const HandleProvinceSwitchClick = () => {
    setSwitchValue("Province");
  };
  const HandleMapSwitchClick = () => {
    setSwitchValue("Map");
  };

  return (
    <div>
      <h1 className="text-white text-6xl text-center my-6">
        Türkiye - İllere Göre Hava Durumu
      </h1>
      <SwitchButton
        Value={switchValue}
        ProvinceSwitchClick={HandleProvinceSwitchClick}
        MapSwitchClick={HandleMapSwitchClick}
      />

      {switchValue === "Province" && <Province />}
      {switchValue === "Map" && <Map />}
    </div>
  );
};

export default Home;
