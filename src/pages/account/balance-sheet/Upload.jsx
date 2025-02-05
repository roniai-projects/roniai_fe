import React from "react";
import Sidebar from "../../../components/Sidebar";
import { Link } from "react-router-dom";

function Upload() {
  return (
    <div className="flex flex-row bg-gray-50 h-screen">
      <Sidebar />
      <div className={layout}>
        {/* Title */}
        <h3 className={title}>
          <Link
            to={"/balance-sheet"}
            className="text-gray-600 hover:text-black transform ease-in duration-150"
          >
            Balance Sheet
          </Link>
          {" >"} Upload
        </h3>
      </div>
    </div>
  );
}

export default Upload;

// Styles

const title = "font-semibold mt-2";

const layout =
  "w-full px-5 py-8 overflow-y-auto h-screen bg-gray-50 flex flex-col space-y-8";
