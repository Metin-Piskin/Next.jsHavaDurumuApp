import React from "react";
import { useRouter } from "next/navigation";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useGetIllerQuery } from "@/Redux/services/Iller";

const ProvinceDetailHeader = () => {
  const { data, error, isLoading } = useGetIllerQuery("");
  const routerRed = useRouter();

  return (
    <div className="bg-[#1D1C22] h-14 items-center flex justify-between px-9">
      <div onClick={()=> routerRed.push("/")} className="text-white flex items-center justify-center gap-2 cursor-pointer">
        <IoMdArrowRoundBack size={29} />
        <p>Geri dön</p>
      </div>
      <select
        className="border text-sm  rounded-lg block outline-none p-1.5 bg-[#333333] border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
        onChange={(e) =>
          routerRed.push(`/provincedetail?provincename=${e.target.value}`)
        }
      >
        {data?.map((e: any) => {
          return (
            <option key={e.plaka} value={e.il_adi}>
              {e.il_adi}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default ProvinceDetailHeader;
