import React from "react";
import Sidebar from "../../../components/Sidebar";

export default function Dashboard() {
  return (
    <div className="flex flex-row bg-gray-50 h-screen">
      <Sidebar />
      <div className={layout}>
        <h3 className={title}>Dashboard</h3>
        <div className="flex flex-1 ">
          This is the diary of your business.
        </div>
      </div>
    </div>
  );
}

const title = "font-semibold mt-2";
const layout =
  "w-full px-5 py-8 overflow-y-auto h-screen bg-gray-50 flex flex-col space-y-8";
