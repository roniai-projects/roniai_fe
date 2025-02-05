import { useState } from "react";
import growth from "../../assets/growth.png";
import SuccessModal from "../SuccessModal";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const data = [
  {
    month: "Jan 31",
    cashDeficit: -163514,
    recommendation: -163514,
  },
  {
    month: "Feb 28",
    cashDeficit: -142949,
    recommendation: 20565,
  },
  {
    month: "Mar 31",
    cashDeficit: -116494,
    recommendation: 26455,
  },
  {
    month: "Apr 30",
    cashDeficit: -182129,
    recommendation: -65635,
  },
  {
    month: "May 31",
    cashDeficit: -165981,
    recommendation: 16148,
  },
  {
    month: "Jun 30",
    cashDeficit: -137759,
    recommendation: 28222,
  },
  {
    month: "Jul 31",
    cashDeficit: -105414,
    recommendation: 32345,
  },
  {
    month: "Aug 31",
    cashDeficit: -93683,
    recommendation: 11730,
  },
  {
    month: "Sep 30",
    cashDeficit: -62516,
    recommendation: 31167,
  },
  {
    month: "Oct 31",
    cashDeficit: -27226,
    recommendation: 35290,
  },
  {
    month: "Nov 30",
    cashDeficit: 11009,
    recommendation: 38235,
  },
  {
    month: "Dec 31",
    cashDeficit: -118977,
    recommendation: -129985,
  },
];

export default function IncomeOverview() {
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isHovered2, setIsHovered2] = useState(false);
  const [isLenderASelected, setIsLenderASelected] = useState(false);
  const [isLenderBSelected, setIsLenderBSelected] = useState(false);

  const handleCheckboxChange = (checkboxIndex, value) => {
    if (checkboxIndex === 1) {
      setIsLenderASelected(value);
    } else if (checkboxIndex === 2) {
      setIsLenderBSelected(value);
    }
  };
  return (
    <>
      <SuccessModal isOpen={isOpen} setIsOpen={setIsOpen} />
      <div className="p-4 bg-white rounded shadow flex justify-center items-center flex-col text-xs font-semibold space-y-4">
        <h2 className="border-b border-black pb-2 w-full text-sm">
          Forecast for Excess Cash/Cash Deficit in 2023
        </h2>
        <LineChart
          width={window.innerWidth > 768 ? 700 : window.innerWidth - 32}
          height={300}
          data={data}
        >
          <CartesianGrid strokeDasharray="1 1" />
          <XAxis dataKey="month" padding={{ left: 30, right: 30 }} />
          {/* <YAxis /> */}
          <YAxis tickFormatter={(value) => `${(value / 1000).toFixed(2)}K`} />
          <Tooltip
            formatter={(value) => new Intl.NumberFormat("en-US").format(value)}
            labelFormatter={(label) => `Month: ${label}`}
          />
          <Legend verticalAlign="top" />
          <Line
            type="monotone"
            dataKey="cashDeficit"
            stroke="#9f738c"
            activeDot={{ r: 6 }}
            name="Cash Excess/Deficit"
          />
          {/* <Line
            type="monotone"
            dataKey="recommendation"
            stroke="#9f738c"
            activeDot={{ r: 6 }}
            name="Recommendation"
          /> */}
        </LineChart>
      </div>

      <div className="p-4 bg-white rounded shadow flex justify-center items-center flex-col text-xs font-semibold">
        <h2 className="border-b border-black pb-2 w-full text-sm">
          Recommendation
        </h2>
        <div className="grid gap-4 md:gap-0 md:grid-cols-3 w-full items-baseline ">
          <div className="text-center space-y-1 flex flex-col items-center">
            <h2 className="text-sm w-full mt-6 mb-4">Date</h2>
            <p className="w-full px-2 py-1 odd:bg-slate-100">January 1, 2023</p>
            <p className="w-full px-2 py-1 odd:bg-slate-100">
              February 1, 2023
            </p>
            <p className="w-full px-2 py-1 odd:bg-slate-100">March 1, 2023</p>
            <p className="w-full px-2 py-1 odd:bg-slate-100">April 1, 2023</p>
            <p className="w-full px-2 py-1 odd:bg-slate-100">May 1, 2023</p>
            <p className="w-full px-2 py-1 odd:bg-slate-100">June 1, 2023</p>
            <p className="w-full px-2 py-1 odd:bg-slate-100">July 1, 2023</p>
            <p className="w-full px-2 py-1 odd:bg-slate-100">August 1, 2023</p>
            <p className="w-full px-2 py-1 odd:bg-slate-100">
              September 1, 2023
            </p>
            <p className="w-full px-2 py-1 odd:bg-slate-100">October 1, 2023</p>
            <p className="w-full px-2 py-1 odd:bg-slate-100">
              November 1, 2023
            </p>
            <p className="w-full px-2 py-1 odd:bg-slate-100">
              December 1, 2023
            </p>
          </div>

          <div className="text-center space-y-1 flex flex-col items-center">
            <h2 className="text-sm w-full mt-6 mb-4">Action Plan</h2>
            <p className="w-full px-2 py-1 text-[#9f738c] odd:bg-slate-100">
              Borrow
            </p>
            <p className="w-full px-2 py-1 odd:bg-slate-100">Payback</p>
            <p className="w-full px-2 py-1 odd:bg-slate-100">Payback</p>
            <p className="w-full px-2 py-1 text-[#9f738c] odd:bg-slate-100">
              Borrow
            </p>
            <p className="w-full px-2 py-1 odd:bg-slate-100">Payback</p>
            <p className="w-full px-2 py-1 odd:bg-slate-100">Payback</p>
            <p className="w-full px-2 py-1 odd:bg-slate-100">Payback</p>
            <p className="w-full px-2 py-1 odd:bg-slate-100">Payback</p>
            <p className="w-full px-2 py-1 odd:bg-slate-100">Payback</p>
            <p className="w-full px-2 py-1 odd:bg-slate-100">Payback</p>
            <p className="w-full px-2 py-1 odd:bg-slate-100">Payback</p>
            <p className="w-full px-2 py-1 text-[#9f738c] odd:bg-slate-100">
              Borrow
            </p>
          </div>

          <div className="text-center space-y-1 flex flex-col items-center">
            <h2 className="text-sm w-full mt-6 mb-4">Amount</h2>
            <p className="w-full px-2 py-1 odd:bg-slate-100">163,514</p>
            <p className="w-full px-2 py-1 odd:bg-slate-100">20,565</p>
            <p className="w-full px-2 py-1 odd:bg-slate-100">26,455</p>
            <p className="w-full px-2 py-1 odd:bg-slate-100">65,635</p>
            <p className="w-full px-2 py-1 odd:bg-slate-100">16,148</p>
            <p className="w-full px-2 py-1 odd:bg-slate-100">28,222</p>
            <p className="w-full px-2 py-1 odd:bg-slate-100">32,345</p>
            <p className="w-full px-2 py-1 odd:bg-slate-100">11,730</p>
            <p className="w-full px-2 py-1 odd:bg-slate-100">31,167</p>
            <p className="w-full px-2 py-1 odd:bg-slate-100">35,290</p>
            <p className="w-full px-2 py-1 odd:bg-slate-100">38,235</p>
            <p className="w-full px-2 py-1 odd:bg-slate-100">129,985</p>
          </div>
        </div>
        <div className="flex flex-row items-center justify-between mt-8 w-full">
          <div className="flex flex-row gap-3">
            <div className="flex flex-row gap-1 relative">
              <input
                className="cursor-pointer"
                type="checkbox"
                name="lenderA"
                id="lenderA"
                onChange={(e) => handleCheckboxChange(1, e.target.checked)}
              />
              <label
                htmlFor="lenderA"
                className="cursor-pointer"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                Lender A
              </label>
              <span
                className={`absolute -top-12 left-6 py-1 px-2 rounded-xl shadow bg-[#CDB6D6] w-32 rounded-bl-none text-[0.7rem] ${
                  isHovered ? "opacity-100" : "opacity-0 pointer-events-none"
                } transition-opacity duration-300`}
              >
                <p>12% per annum</p>
                <p>1-month grace period</p>
              </span>
            </div>
            <div className="flex flex-row gap-1 relative">
              <input
                className="cursor-pointer"
                type="checkbox"
                name="lenderB"
                id="lenderB"
                onChange={(e) => handleCheckboxChange(2, e.target.checked)}
              />
              <label
                htmlFor="lenderB"
                className="cursor-pointer"
                onMouseEnter={() => setIsHovered2(true)}
                onMouseLeave={() => setIsHovered2(false)}
              >
                Lender B
              </label>
              <span
                className={`absolute -top-12 left-6 py-1 px-2 rounded-xl shadow bg-[#CDB6D6] w-32 rounded-bl-none text-[0.7rem] ${
                  isHovered2 ? "opacity-100" : "opacity-0 pointer-events-none"
                } transition-opacity duration-300`}
              >
                <p>14% per annum</p>
                <p>3-month grace period</p>
              </span>
            </div>
          </div>
          <button
            onClick={() => setIsOpen(true)}
            disabled={!isLenderASelected && !isLenderBSelected}
            className={`flex flex-row items-center gap-2 font-semibold px-3 py-2 ${
              isLenderASelected || isLenderBSelected
                ? "bg-gradient-to-r from-[#EDC6D7] via-[#CDB6D6] to-[#B0A7D4] hover:opacity-90"
                : "bg-gray-300 cursor-not-allowed"
            } rounded-xl text-slate-700 ease-in transform transition duration-150 w-fit text-xs`}
          >
            <img src={growth} alt="growth icon" className="h-6 w-6" />
            Apply for a loan
          </button>
        </div>
      </div>
    </>
  );
}
