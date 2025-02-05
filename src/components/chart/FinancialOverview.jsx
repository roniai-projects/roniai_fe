import { useEffect, useState } from "react";
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

export default function FinancialOverview() {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL2;
  const [data, setData] = useState([]);
  const [data2, setData2] = useState([]);
  const [isError, setIsError] = useState(false);

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
            gross_profit: response.data.margins.gross_profit[index],
            net_income: response.data.margins.net_income[index],
            operating_income: response.data.margins.operating_income[index],
          };
        });

        const updatedDataTwo = response.data.dates.map((date, index) => {
          const parsedDate = new Date(date);
          const month = parsedDate.toLocaleString("en-us", { month: "short" });

          const lastDay = new Date(
            parsedDate.getFullYear(),
            parsedDate.getMonth() + 1,
            0
          ).getDate();

          return {
            month: `${month} ${lastDay}`,
            gross_profit: response.data.derived.gross_profit[index],
            sales: response.data.derived.sales[index],
          };
        });

        setData(updatedData);
        setData2(updatedDataTwo);

        // console.log(response.data);
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
          {" "}
          <div className="p-4 bg-white rounded shadow flex justify-center items-center flex-col text-xs font-semibold space-y-4">
            <h2 className="border-b border-black pb-2 w-full text-sm">
              Revenue and Costs
            </h2>
            <LineChart
              width={window.innerWidth > 768 ? 700 : window.innerWidth - 32}
              height={300}
              data={data2}
            >
              <CartesianGrid strokeDasharray="1 1" />
              <XAxis
                dataKey="month"
                padding={{ left: 30, right: 30 }}
                interval={0}
              />
              <YAxis tickFormatter={(value) => value.toLocaleString()} />

              <Tooltip
                formatter={(value) =>
                  new Intl.NumberFormat("en-US").format(value)
                }
                labelFormatter={(label) => `Month: ${label}`}
              />
              <Legend verticalAlign="top" />
              <Line
                type="monotone"
                dataKey="gross_profit"
                stroke="#9f738c"
                activeDot={{ r: 6 }}
                name="Gross Profit"
              />
              <Line
                type="monotone"
                dataKey="sales"
                stroke="#3E6680"
                activeDot={{ r: 1 }}
                name="Sales"
              />
            </LineChart>
          </div>
          <div className="p-4 bg-white rounded shadow flex justify-center items-center flex-col text-xs font-semibold space-y-4">
            <h2 className="border-b border-black pb-2 w-full text-sm">
              Profit Margins
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
              <YAxis tickFormatter={(value) => `${Math.round(value * 100)}%`} />
              <Tooltip
                // formatter={(value) => new Intl.NumberFormat("en-US").format(value)}
                formatter={(value) => `${(value * 100).toFixed(2)}%`}
                labelFormatter={(label) => `Month: ${label}`}
              />
              <Legend verticalAlign="top" />
              <Line
                type="monotone"
                dataKey="gross_profit"
                stroke="#9f738c"
                activeDot={{ r: 6 }}
                name="Gross Profit Margin"
              />
              <Line
                type="monotone"
                dataKey="net_income"
                stroke="#3E6680"
                activeDot={{ r: 1 }}
                name="Net Income Margin"
              />
              <Line
                type="monotone"
                dataKey="operating_income"
                stroke="#D988B9"
                activeDot={{ r: 1 }}
                name="Operating Income Margin"
              />
            </LineChart>
          </div>
        </>
      )}
    </>
  );
}
