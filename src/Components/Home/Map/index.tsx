"use client";

import React from "react";
import TurkeyMap from "turkey-map-react";
import { useRouter } from "next/navigation";

const Map = () => {
  const routerRed = useRouter();
  return (
    <TurkeyMap
      hoverable={true}
      onClick={({ plateNumber, name, path, id }) =>
        routerRed.push(`/provincedetail?provincename=${name}`)
      }
      customStyle={{
        hoverColor: "#3833D7",
        idleColor: "gray",
      }}
      showTooltip
    />
  );
};

export default Map;
