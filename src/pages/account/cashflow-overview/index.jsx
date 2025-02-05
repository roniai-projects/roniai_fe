import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "../../../components/Sidebar";
import IncomeOverview from "../../../components/chart/IncomeOverview";
import Loader from "../../../components/Loader";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const CashflowOverview = () => {
  const token = localStorage.getItem("jwtToken");
  const url = `${API_BASE_URL}/get_income_statement_workflow`;

  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);

        const response = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        });

        setData(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [url, token]);

  return (
    <div className="flex flex-row bg-gray-50 h-screen">
      <Sidebar />
      <div className={layout}>
        {/* Title */}
        <h3 className={title}>Cashflow Overview</h3>
        {isLoading ? (
          <div className="flex flex-1 items-center justify-center">
            <Loader />
          </div>
        ) : data ? (
          <IncomeOverview />
        ) : (
          <div className="flex flex-1 items-center justify-center">No data</div>
        )}
      </div>
    </div>
  );
};

export default CashflowOverview;

// Styles

const title = "font-semibold mt-2";

const layout =
  "w-full px-5 py-8 overflow-y-auto h-screen bg-gray-50 flex flex-col space-y-8";
