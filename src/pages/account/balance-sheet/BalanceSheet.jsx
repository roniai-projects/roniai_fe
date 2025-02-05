import React, { useState } from "react";
import Sidebar from "../../../components/Sidebar";
import { Link } from "react-router-dom";
import balance from "../../../assets/balance.svg";

export default function BalanceSheet() {
  return (
    <div className="flex flex-row bg-gray-50 h-screen">
      <Sidebar />
      <div className={layout}>
        <h3 className={title}>Balance Sheet</h3>

        <div className="rounded-xl bg-white p-4 text-center shadow text-sm flex flex-col items-center justify-center space-y-4">
          <h2 className="border-b border-black uppercase font-semibold pb-1 w-full">
            upload or prepare my balance sheet
          </h2>
          <img src={balance} alt="balance" className="max-h-56" />
          <h1 className="font-semibold text-lg">
            Hi, I can help you with your balance sheet.
          </h1>
          <p>
            The balance sheet is important to know where you currently are,
            upload your latest balance sheet, if you have it.
          </p>
          <div className="flex flex-row gap-4">
            <input
              type="file"
              id="balanceSheet"
              accept=".xls, .xlsx"
              className="hidden"
            />
            <label
              htmlFor="balanceSheet"
              className="cursor-pointer self-center font-semibold px-3 py-2 bg-gradient-to-r from-[#EDC6D7] via-[#CDB6D6] to-[#B0A7D4] rounded text-slate-700 hover:opacity-90 ease-in transform transition duration-150 w-fit"
            >
              Upload
            </label>

            <Link
              to={"/balance-sheet/prepare-my-balance-sheet"}
              className="self-center font-semibold px-3 py-2 bg-gradient-to-r from-[#EDC6D7] via-[#CDB6D6] to-[#B0A7D4] rounded text-slate-700 hover:opacity-90 ease-in transform transition duration-150 w-fit"
            >
              Prepare my balance sheet
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

const title = "font-semibold mt-2";
const layout =
  "w-full px-5 py-8 overflow-y-auto h-screen bg-gray-50 flex flex-col space-y-8";
