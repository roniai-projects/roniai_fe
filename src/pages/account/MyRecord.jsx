import React from "react";
import Sidebar from "../../components/Sidebar";

const MyRecord = () => {
  return (
    <div className="flex flex-row bg-gray-50 h-screen">
      <Sidebar />
      <div className={layout}>
        {/* Title */}
        <h3 className={title}>My Records</h3>
        <div className="flex flex-1 items-center justify-center">
            No data
        </div>
      </div>
    </div>
  );
};

export default MyRecord;

// Styles

const title = "font-semibold mt-2";

const layout =
  "w-full px-5 py-8 overflow-y-auto h-screen bg-gray-50 flex flex-col space-y-8";
