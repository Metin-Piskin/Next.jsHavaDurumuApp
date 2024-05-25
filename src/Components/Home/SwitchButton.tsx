import React, { FC } from "react";

interface SwitchButtonProps {
  ProvinceSwitchClick: () => void;
  MapSwitchClick: () => void;
  Value: string;
}

const SwitchButton: FC<SwitchButtonProps> = ({
  ProvinceSwitchClick,
  MapSwitchClick,
  Value,
}) => {
  return (
    <div className="flex  items-center justify-center py-2">
      <div className="flex bg-[#1D1C22] rounded-xl w-1/5  justify-between p-2 gap-2">
        <button
          onClick={ProvinceSwitchClick}
          className={`${
            Value === "Province" && "bg-[#3833D7]"
          } p-2 w-1/2 rounded-lg text-white`}
        >
          Şehir Listesi
        </button>
        <button
          onClick={MapSwitchClick}
          className={`${
            Value === "Map" && "bg-[#3833D7]"
          } p-2 w-1/2 rounded-lg text-white`}
        >
          Harita
        </button>
      </div>
    </div>
  );
};

export default SwitchButton;
