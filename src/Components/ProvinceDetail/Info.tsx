import React, { FC } from "react";

interface InfoProps {
  ProvinceName: string;
  Day: any;
  Time: any;
  info: any;
}

const Info: FC<InfoProps> = ({ ProvinceName, Day, Time, info }) => {
  return (
    <div className="text-white">
      <h4 className="text-5xl font-mono">{ProvinceName}</h4>
      <p className="">
        {Day} - {Time}
      </p>
      <p>{info}</p>
    </div>
  );
};

export default Info;
