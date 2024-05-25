"use client";
import React from "react";
import { Blocks } from "react-loader-spinner";

const Loading = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <Blocks
        height="140"
        width="140"
        color="#4fa94d"
        ariaLabel="blocks-loading"
        wrapperStyle={{}}
        wrapperClass="blocks-wrapper"
        visible={true}
      />
    </div>
  );
};

export default Loading;
