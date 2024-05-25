import React from "react";
import { TbError404 } from "react-icons/tb";
const NotFound = () => {
  return (
    <div className="text-white flex flex-col h-screen items-center justify-center">
      <TbError404 size={185}/>
      Not Found
    </div>
  );
};

export default NotFound;
