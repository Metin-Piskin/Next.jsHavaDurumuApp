import Link from "next/link";
import React, { FC } from "react";

interface ProvinceCardProps {
  id: string;
  name: string;
  provincename: string;
}

const ProvinceCard: FC<ProvinceCardProps> = ({ id, name, provincename }) => {
  return (
    <Link
      href={{
        pathname: "/provincedetail",
        query: {
          provincename: provincename,
        },
      }}
      className="flex bg-[#1D1C22] w-1/5 p-2 justify-between cursor-pointer items-center rounded-full"
    >
      <div className="bg-[#3833D7] py-2 px-4 rounded-full text-white">{id}</div>
      <div className=" text-white">{name}</div>
      <div className="opacity-0">{id}</div>
    </Link>
  );
};

export default ProvinceCard;
