import React from "react";
import Sidebar from "../../../components/Sidebar";
import { Link } from "react-router-dom";
import invoice from "../../../assets/record_operations/invoice.svg";
import onlineBanking from "../../../assets/record_operations/online_banking.svg";
import books from "../../../assets/record_operations/books.svg";
import transferMoney from "../../../assets/record_operations/transfer_money.svg";
import projectComplete from "../../../assets/record_operations/project_complete.svg";
import calculator from "../../../assets/record_operations/calculator.svg";
import purchase from "../../../assets/record_operations/purchase.svg";

export default function index() {
  return (
    <div className="flex flex-row bg-gray-50 h-screen">
      <Sidebar />
      <div className={layout}>
        <h3 className={title}>Record Operations</h3>
        <div className="grid grid-cols-3 gap-6">
          <div className="rounded-xl bg-white p-4 text-center shadow text-sm flex flex-col items-center justify-center space-y-4">
            <h2 className="border-b border-black uppercase font-semibold pb-1 w-full">
              create an invoice
            </h2>
            <img src={invoice} alt="wallet" className="max-h-36" />
            <Link
              to={"./invoice"}
              className="self-center font-semibold px-3 py-2 bg-gradient-to-r from-[#EDC6D7] via-[#CDB6D6] to-[#B0A7D4] rounded text-slate-700 hover:opacity-90 ease-in transform transition duration-150 w-fit"
            >
              Let's go
            </Link>
          </div>

          <div className="rounded-xl bg-white p-4 text-center shadow text-sm flex flex-col items-center justify-center space-y-4">
            <h2 className="border-b border-black uppercase font-semibold pb-1 w-full">
              Record sales manually per day
            </h2>
            <img src={books} alt="wallet" className="max-h-36" />

            <Link
              // to={"./invoice"}
              className="self-center font-semibold px-3 py-2 bg-gradient-to-r from-[#EDC6D7] via-[#CDB6D6] to-[#B0A7D4] rounded text-slate-700 hover:opacity-90 ease-in transform transition duration-150 w-fit"
            >
              Let's go
            </Link>
          </div>

          <div className="rounded-xl bg-white p-4 text-center shadow text-sm flex flex-col items-center justify-center space-y-4">
            <h2 className="border-b border-black uppercase font-semibold pb-1 w-full">
              Upload excel file of sales
            </h2>
            <img src={transferMoney} alt="wallet" className="max-h-36" />

            <Link
              // to={"./invoice"}
              className="self-center font-semibold px-3 py-2 bg-gradient-to-r from-[#EDC6D7] via-[#CDB6D6] to-[#B0A7D4] rounded text-slate-700 hover:opacity-90 ease-in transform transition duration-150 w-fit"
            >
              Let's go
            </Link>
          </div>

          <div className="rounded-xl bg-white p-4 text-center shadow text-sm flex flex-col items-center justify-center space-y-4">
            <h2 className="border-b border-black uppercase font-semibold pb-1 w-full">
              Record expenses
            </h2>
            <img src={projectComplete} alt="wallet" className="max-h-36" />

            <Link
              // to={"./invoice"}
              className="self-center font-semibold px-3 py-2 bg-gradient-to-r from-[#EDC6D7] via-[#CDB6D6] to-[#B0A7D4] rounded text-slate-700 hover:opacity-90 ease-in transform transition duration-150 w-fit"
            >
              Let's go
            </Link>
          </div>
          <div className="rounded-xl bg-white p-4 text-center shadow text-sm flex flex-col items-center justify-center space-y-4">
            <h2 className="border-b border-black uppercase font-semibold pb-1 w-full">
              Upload bank statement
            </h2>
            <img src={onlineBanking} alt="wallet" className="max-h-36" />

            <Link
              // to={"./invoice"}
              className="self-center font-semibold px-3 py-2 bg-gradient-to-r from-[#EDC6D7] via-[#CDB6D6] to-[#B0A7D4] rounded text-slate-700 hover:opacity-90 ease-in transform transition duration-150 w-fit"
            >
              Let's go
            </Link>
          </div>

          <div className="rounded-xl bg-white p-4 text-center shadow text-sm flex flex-col items-center justify-center space-y-4">
            <h2 className="border-b border-black uppercase font-semibold pb-1 w-full">
              Payroll
            </h2>
            <img src={calculator} alt="wallet" className="max-h-36" />

            <Link
              to={"./payroll"}
              className="self-center font-semibold px-3 py-2 bg-gradient-to-r from-[#EDC6D7] via-[#CDB6D6] to-[#B0A7D4] rounded text-slate-700 hover:opacity-90 ease-in transform transition duration-150 w-fit"
            >
              Let's go
            </Link>
          </div>
       
          <div className="rounded-xl bg-white p-4 text-center shadow text-sm flex flex-col items-center justify-center space-y-4">
            <h2 className="border-b border-black uppercase font-semibold pb-1 w-full">
              Purchase Requisition Form
            </h2>
            <img src={purchase} alt="wallet" className="max-h-36" />

            <Link
              to={"./purchase-requisition-form"}
              className="self-center font-semibold px-3 py-2 bg-gradient-to-r from-[#EDC6D7] via-[#CDB6D6] to-[#B0A7D4] rounded text-slate-700 hover:opacity-90 ease-in transform transition duration-150 w-fit"
            >
              Let's go
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
