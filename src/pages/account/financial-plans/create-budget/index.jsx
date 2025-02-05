import { CloseOutlined } from "@ant-design/icons";
import React from "react";
import { Link } from "react-router-dom";

function index() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center h-screen bg-gray-100 relative gap-6">
  
      <h2 className="text-2xl md:text-4xl font-semibold text-center">
        Is this for a new or an existing business?
      </h2>
      <div className="flex flex-row gap-6 text-center">
        <Link
          to={"./new-business"}
          className="font-semibold px-3 py-2 bg-gradient-to-r from-[#EDC6D7] via-[#CDB6D6] to-[#B0A7D4] rounded-full text-slate-700 hover:opacity-90 ease-in transform transition duration-150 w-36"
        >
          New
        </Link>
        <Link
          to={"./existing-business"}
          className="font-semibold px-3 py-2 bg-gradient-to-r from-[#EDC6D7] via-[#CDB6D6] to-[#B0A7D4] rounded-full text-slate-700 hover:opacity-90 ease-in transform transition duration-150 w-36"
        >
          Existing
        </Link>
      </div>
      <Link
        to={"/financial-plans"}
        className="absolute top-6 right-6 hover:opacity-90 ease-in transform transition duration-150"
      >
        <CloseOutlined style={{ fontSize: "2rem" }} />
      </Link>
    </div>
  );
}

export default index;
