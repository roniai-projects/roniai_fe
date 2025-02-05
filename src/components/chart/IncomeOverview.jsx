import React, { useEffect, useState } from "react";
import growth from "../../assets/growth.png";
import user from "../../assets/user.png";
import SuccessModal from "../SuccessModal";
import ub from "../../assets/union_bank_nobg.png";
import bpi from "../../assets/bpi.png";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL2;

export default function IncomeOverview() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSolutionASelected, setIsSolutionASelected] = useState(false);
  const [isSolutionBSelected, setIsSolutionBSelected] = useState(false);
  const [isSolutionCSelected, setIsSolutionCSelected] = useState(false);
  const [isSolutionDSelected, setIsSolutionDSelected] = useState(false);
  const [dates, setDates] = useState([]);
  const [borrowPay, setBorrowPay] = useState([]);
  const [cashDiff, setCashDiff] = useState([]);
  const [data, setData] = useState([]);
  const [isError, setIsError] = useState(false);

  const handleCheckboxChange = (checkboxIndex, value) => {
    if (checkboxIndex === 1) {
      setIsSolutionASelected(value);
    } else if (checkboxIndex === 2) {
      setIsSolutionBSelected(value);
    } else if (checkboxIndex === 3) {
      setIsSolutionCSelected(value);
    } else if (checkboxIndex === 4) {
      setIsSolutionDSelected(value);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("jwtToken");
    const url = `${API_BASE_URL}/generate_budget`;

    axios({
      method: "post",
      url: url,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        setDates(response.data.dates);
        setBorrowPay(response.data.borrow_pay);
        setCashDiff(response.data.cash_diff);

        const updatedData = response.data.dates.map((date, index) => {
          const parsedDate = new Date(date);
          const month = parsedDate.toLocaleString("en-us", { month: "short" });

          const lastDay = new Date(
            parsedDate.getFullYear(),
            parsedDate.getMonth() + 1,
            0
          ).getDate();

          return {
            month: `${month} ${lastDay}`,
            cashDeficit: response.data.cash_diff[index],
            recommendation: response.data.borrow_pay[index],
          };
        });

        setData(updatedData);

        // console.log(updatedData, "check");
        console.log("Response:", response.data);
        console.log("Action Plan:", response.data.borrow_pay);
      })
      .catch((error) => {
        console.error(error);
        if (error.response && error.response.status === 500) {
          setIsError(true); // Set isError500 to true for status 500
        }
      });
  }, []);

  return (
    <>
      {isError ? (
        <div className="flex flex-1 items-center justify-center flex-col">
          <h1 className="text-2xl font-bold">Oops!</h1>
          <p>We are currently facing an issue, please come back again later.</p>
        </div>
      ) : (
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
              <XAxis
                dataKey="month"
                padding={{ left: 30, right: 30 }}
                interval={0}
              />
              {/* <YAxis /> */}
              <YAxis tickFormatter={(value) => value.toLocaleString()} />

              <Tooltip
                formatter={(value) => `${value.toLocaleString()}`}
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
            </LineChart>
          </div>
          <div className="p-4 bg-white rounded shadow flex justify-center items-center flex-col text-xs font-semibold">
            <h2 className="border-b border-black pb-2 w-full text-sm">
              Recommendation
            </h2>
            <div className="grid gap-4 md:gap-0 md:grid-cols-3 w-full items-baseline ">
              <div className="text-center space-y-1 flex flex-col items-center">
                <h2 className="text-sm w-full mt-6 mb-4">Date</h2>
                {/* {dates.map((date) => (
                  <p className="w-full px-2 py-1 odd:bg-slate-100">{date}</p>
                ))} */}
                {dates.map((date, index) => (
                  <p key={index} className="w-full px-2 py-1 odd:bg-slate-100">
                    {Array.isArray(borrowPay[index])
                      ? borrowPay[index].map((subItem, subIndex) => (
                          <React.Fragment key={subIndex}>
                            {subIndex !== 0 && <br />}
                            {subIndex === 0 ? date : "\u00A0"}
                          </React.Fragment>
                        ))
                      : date}
                  </p>
                ))}
              </div>

              <div className="text-center space-y-1 flex flex-col items-center">
                <h2 className="text-sm w-full mt-6 mb-4">Action Plan</h2>
                {borrowPay.map((item, index) => (
                  <p
                    key={index}
                    className={`w-full px-2 py-1 capitalize ${
                      Array.isArray(item) && item[0] === "borrow"
                        ? "text-[#9f738c]"
                        : ""
                    } odd:bg-slate-100`}
                  >
                    {Array.isArray(item)
                      ? item.map((subItem, subIndex) => (
                          <React.Fragment key={subIndex}>
                            {subIndex !== 0 && <br />}
                            {subItem.replace(/(\d+\.\d+)/g, (match) =>
                              parseFloat(match)
                                .toLocaleString("en-US")
                                .replace(/(\d+\.\d+)/, (_, number) =>
                                  parseFloat(number).toFixed(2)
                                )
                            )}
                          </React.Fragment>
                        ))
                      : item.replace(/(\d+\.\d+)/g, (match) =>
                          parseFloat(match)
                            .toLocaleString("en-US")
                            .replace(/(\d+\.\d+)/, (_, number) =>
                              parseFloat(number).toFixed(2)
                            )
                        )}
                  </p>
                ))}
              </div>

              <div className="text-center space-y-1 flex flex-col items-center">
                <h2 className="text-sm w-full mt-6 mb-4">Amount</h2>

                {cashDiff.map((amount, index) => (
                  <p key={index} className="w-full px-2 py-1 odd:bg-slate-100">
                    {Array.isArray(borrowPay[index])
                      ? borrowPay[index].map((subItem, subIndex) => (
                          <React.Fragment key={subIndex}>
                            {subIndex !== 0 && <br />}
                            {subIndex === 0
                              ? parseFloat(amount)
                                  .toLocaleString("en-US")
                                  .replace(/(\d+\.\d+)/, (_, number) =>
                                    parseFloat(number).toFixed(2)
                                  )
                              : "\u00A0"}
                          </React.Fragment>
                        ))
                      : parseFloat(amount)
                          .toLocaleString("en-US")
                          .replace(/(\d+\.\d+)/, (_, number) =>
                            parseFloat(number).toFixed(2)
                          )}
                  </p>
                ))}
              </div>
            </div>
          </div>{" "}
          <div className="p-4 bg-white rounded shadow flex justify-center items-center flex-col text-xs font-semibold">
            <h2 className="border-b border-black pb-2 w-full text-sm">
              Solutions
            </h2>

            <div className="flex flex-col gap-6 items-center justify-between mt-8 w-full">
              <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8">
                <div className="flex flex-row w-full justify-around text-sm col-span-4">
                  <h2 className="-translate-x-1">Invest</h2>
                  <h2 className="translate-x-2.5">Borrow</h2>
                </div>
                <label
                  htmlFor="solutionA"
                  className="flex flex-row gap-1 relative p-4 border rounded-xl cursor-pointer
            "
                >
                  <div className="flex flex-col">
                    <img src={bpi} alt="" className="h-16 w-16" />
                    <p className="text-xl">BPI</p>
                    <span>Time deposit</span>
                    <span>0.625% - 1.250% per annum</span>
                  </div>

                  <input
                    className="cursor-pointer border-none bg-slate-200 rounded"
                    type="checkbox"
                    name="solutionA"
                    id="solutionA"
                    onChange={(e) => handleCheckboxChange(1, e.target.checked)}
                  />
                </label>
                <label
                  htmlFor="solutionB"
                  className="flex flex-row gap-1 relative p-4 border rounded-xl cursor-pointer
            "
                >
                  <div className="flex flex-col">
                    <img src={ub} alt="" className="h-16 w-16" />
                    <p className="text-xl">Unionbank</p>
                    <span>Time deposit</span>
                    <span>0.25% - 0.75% per annum</span>
                  </div>
                  <input
                    className="cursor-pointer border-none bg-slate-200 rounded"
                    type="checkbox"
                    name="solutionB"
                    id="solutionB"
                    onChange={(e) => handleCheckboxChange(2, e.target.checked)}
                  />
                </label>

                <label
                  htmlFor="solutionC"
                  className="flex flex-row gap-1 relative p-4 border rounded-xl cursor-pointer
            "
                >
                  <div className="flex flex-col">
                    <img src={bpi} alt="" className="h-16 w-16" />
                    <p className="text-xl">BPI</p>
                    <span>Ka-Negosyo credit line</span>
                    <span>4.5% per 90 days</span>
                  </div>

                  <input
                    className="cursor-pointer border-none bg-slate-200 rounded"
                    type="checkbox"
                    name="solutionC"
                    id="solutionC"
                    onChange={(e) => handleCheckboxChange(3, e.target.checked)}
                  />
                </label>

                <label
                  htmlFor="solutionD"
                  className="flex flex-row gap-1 relative p-4 border rounded-xl cursor-pointer
            "
                >
                  <div className="flex flex-col">
                    <img src={ub} alt="" className="h-16 w-16" />
                    <p className="text-xl">Unionbank</p>
                    <span>Working capital loan</span>
                    <span>3% per month</span>
                  </div>
                  <input
                    className="cursor-pointer border-none bg-slate-200 rounded"
                    type="checkbox"
                    name="solutionD"
                    id="solutionD"
                    onChange={(e) => handleCheckboxChange(4, e.target.checked)}
                  />
                </label>
              </div>
              <button
                onClick={() => setIsOpen(true)}
                disabled={
                  !isSolutionASelected &&
                  !isSolutionBSelected &&
                  !isSolutionCSelected &&
                  !isSolutionDSelected
                }
                className={`flex flex-row items-center gap-2 font-semibold px-3 py-2 ${
                  isSolutionASelected ||
                  isSolutionBSelected ||
                  isSolutionCSelected ||
                  isSolutionDSelected
                    ? "bg-gradient-to-r from-[#EDC6D7] via-[#CDB6D6] to-[#B0A7D4] hover:opacity-90"
                    : "bg-gray-300 cursor-not-allowed"
                } rounded-xl text-slate-700 ease-in transform transition duration-150 w-fit text-xs`}
              >
                <img src={growth} alt="growth icon" className="h-6 w-6" />
                Apply for a solution
              </button>
            </div>
          </div>{" "}
        </>
      )}
    </>
  );
}
