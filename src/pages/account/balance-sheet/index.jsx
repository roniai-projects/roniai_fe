import React, { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../../../components/Loader";
import Sidebar from "../../../components/Sidebar";
import { Link } from "react-router-dom";
import balance from "../../../assets/balance.svg";
import { useCompanyContext } from "../../../context/CompanyProvider";

const API_BASE_URL2 = import.meta.env.VITE_API_BASE_URL2;

export default function BalanceSheet() {
  const token = localStorage.getItem("jwtToken");

  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { selectedCompany, updateSelectedCompany } = useCompanyContext();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);

        const response = await axios.get(
          `${API_BASE_URL2}/company/${selectedCompany}/balance-sheet`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              Accept: "application/json",
            },
          }
        );

        setData(response.data);
        console.log(response.data);
      } catch (error) {
        setData(null);
        console.error("Error fetching balance sheet:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [selectedCompany, token]);

  const handleCompanyChange = (e) => {
    const newSelectedCompany = e.target.value;
    updateSelectedCompany(newSelectedCompany);
  };

  // assets

  const cashOnHand = data && parseFloat(data.cash_on_hand || 0);

  const cashInBank =
    data && Array.isArray(JSON.parse(data.cib_rows))
      ? JSON.parse(data.cib_rows).reduce(
          (total, row) => total + parseFloat(row.amount || 0),
          0
        )
      : 0;

  const totalCash = cashOnHand + cashInBank;

  const accountsReceivable =
    data && Array.isArray(JSON.parse(data.client_rows))
      ? JSON.parse(data.client_rows).reduce(
          (total, row) => total + parseFloat(row.amount || 0),
          0
        )
      : 0;

  const inventory =
    data &&
    (Array.isArray(JSON.parse(data.inventory_rows))
      ? JSON.parse(data.inventory_rows).reduce(
          (total, row) =>
            total +
            parseFloat(row.costPerItem || 0) *
              (row.numberOfItems ? parseFloat(row.numberOfItems) : 1),
          0
        )
      : 0);

  const currentAssets = data && totalCash + accountsReceivable + inventory;

  const investment =
    data &&
    (Array.isArray(JSON.parse(data.loan_rows))
      ? JSON.parse(data.loan_rows).reduce(
          (total, row) => total + parseFloat(row.amount || 0),
          0
        )
      : 0);

  const ppe =
    data &&
    (Array.isArray(JSON.parse(data.building_rows))
      ? JSON.parse(data.building_rows).reduce(
          (total, row) => total + parseFloat(row.cost || 0),
          0
        )
      : 0);

  const rentDeposits =
    data &&
    (Array.isArray(JSON.parse(data.cash_advance_rows))
      ? JSON.parse(data.cash_advance_rows).reduce(
          (total, row) => total + parseFloat(row.amount || 0),
          0
        )
      : 0);

  const nonCurrentAssets = data && investment + ppe + rentDeposits;

  const totalAssets = data && currentAssets + nonCurrentAssets;

  // liabilities

  const accountsPayable =
    data &&
    (Array.isArray(JSON.parse(data.supplier_rows))
      ? JSON.parse(data.supplier_rows).reduce(
          (total, row) => total + parseFloat(row.amount || 0),
          0
        )
      : 0);

  const bankLoan =
    data &&
    (Array.isArray(JSON.parse(data.other_loan_rows))
      ? JSON.parse(data.other_loan_rows).reduce(
          (total, row) => total + parseFloat(row.amount || 0),
          0
        )
      : 0);

  const totalLiabilities = data && accountsPayable + bankLoan;

  // owner's equity
  const commonStock =
    data &&
    (Array.isArray(JSON.parse(data.investment_rows))
      ? JSON.parse(data.investment_rows).reduce(
          (total, row) => total + parseFloat(row.amount || 0),
          0
        )
      : 0);

  const retainedEarnings = data && totalAssets - totalLiabilities - commonStock;

  const totalEquity = data && commonStock + retainedEarnings;

  const totalLiabilitiesAndEquity =
    data && parseFloat(totalLiabilities) + parseFloat(totalEquity);

  return (
    <div className="flex flex-row bg-gray-50 h-screen">
      <Sidebar />
      <div className={layout}>
        <h3 className={title}>
          Balance Sheet{" "}
          {data && <>as of {new Date(data.date).toLocaleDateString()}</>}
        </h3>

        {isLoading ? (
          <div className="flex flex-1 items-center justify-center">
            <Loader />
          </div>
        ) : data ? (
          <>
            <div>
              <div className="border border-black flex-row flex justify-between">
                <div className="w-full indent-2">
                  <h3 className="bg-[#b395a5] p-2 font-semibold text-gray-50 border-b border-black">
                    ASSETS
                  </h3>
                  <ul className="flex flex-row justify-between p-2 mt-2 text-sm px-3 italic">
                    <li>Current Assets</li>
                  </ul>
                  <ul className="flex flex-row justify-between p-2 mt-2 text-sm px-3">
                    <li>Cash</li>
                    <li>{parseFloat(totalCash).toLocaleString()}</li>
                  </ul>
                  <ul className="flex flex-row justify-between p-2 mt-2 text-sm px-3">
                    <li>Accounts Receivable</li>
                    <li>{parseFloat(accountsReceivable).toLocaleString()}</li>
                  </ul>
                  <ul className="flex flex-row justify-between p-2 mt-2 text-sm px-3">
                    <li>Inventory</li>
                    <li>{parseFloat(inventory).toLocaleString()}</li>
                  </ul>
                  <ul className="flex flex-row justify-between p-2 mt-2 text-sm px-3 font-semibold">
                    <li>Total Current Assets</li>
                    <li>{parseFloat(currentAssets).toLocaleString()}</li>
                  </ul>
                  <ul className="flex flex-row justify-between p-2 mt-2 text-sm px-3 italic">
                    <li>Noncurrent Assets</li>
                  </ul>
                  <ul className="flex flex-row justify-between p-2 mt-2 text-sm px-3">
                    <li>Investment</li>
                    <li>{parseFloat(investment).toLocaleString()}</li>
                  </ul>
                  <ul className="flex flex-row justify-between p-2 mt-2 text-sm px-3">
                    <li>Property, Plant and Equipment</li>
                    <li>{parseFloat(ppe).toLocaleString()}</li>
                  </ul>
                  <ul className="flex flex-row justify-between p-2 text-sm px-3 my-2">
                    <li>Rent Deposit</li>
                    <li>{parseFloat(rentDeposits).toLocaleString()}</li>
                  </ul>
                  <ul className="flex flex-row justify-between p-2 mt-2 text-sm px-3 font-semibold">
                    <li>Total Noncurrent Assets</li>
                    <li>{parseFloat(nonCurrentAssets).toLocaleString()}</li>
                  </ul>
                </div>
                <div className="w-full border-l border-black">
                  <h3 className="bg-[#b395a5] p-2 font-semibold text-gray-50 border-b border-black">
                    LIABILITIES
                  </h3>
                  <ul className="flex flex-row justify-between p-2 mt-2 text-sm px-3 italic">
                    <li>Current Liabilities</li>
                  </ul>
                  <ul className="flex flex-row justify-between pt-2 mt-2 text-sm px-3">
                    <li>Accounts Payable</li>
                    <li>{parseFloat(accountsPayable).toLocaleString()}</li>
                  </ul>
                  <ul className="flex flex-row justify-between p-2 mt-2 text-sm px-3 font-semibold">
                    <li>Total Current Liabilities</li>
                    <li>{parseFloat(accountsPayable).toLocaleString()}</li>
                  </ul>
                  <ul className="flex flex-row justify-between p-2 mt-2 text-sm px-3 italic">
                    <li>Noncurrent Liabilities</li>
                  </ul>
                  <ul className="flex flex-row justify-between pt-2 mt-2 text-sm px-3">
                    <li>Bank Loan</li>
                    <li>{parseFloat(bankLoan).toLocaleString()}</li>
                  </ul>
                  <ul className="flex flex-row justify-between p-2 mt-2 text-sm px-3 font-semibold">
                    <li>Total Noncurrent Liabilities</li>
                    <li>{parseFloat(bankLoan).toLocaleString()}</li>
                  </ul>
                  <ul className="flex flex-row justify-between pt-2 my-2 text-sm px-3 font-semibold">
                    <li>Total Liabilities</li>
                    <li>{parseFloat(totalLiabilities).toLocaleString()}</li>
                  </ul>
                  <h3 className="bg-[#b395a5] p-2 font-semibold text-gray-50 border-y border-black my-3">
                    STOCKHOLDER'S EQUITY
                  </h3>
                  <ul className="flex flex-row justify-between pt-2 mt-2 text-sm px-3">
                    <li>Common Stock</li>
                    <li>{parseFloat(commonStock).toLocaleString()}</li>
                  </ul>
                  {parseFloat(retainedEarnings) !== 0 && (
                    <ul className="flex flex-row justify between pt-1 mt-2 text-sm px-3">
                      <li>Retained Earnings</li>
                      <li className="ml-auto">
                        {parseFloat(retainedEarnings).toLocaleString()}
                      </li>
                    </ul>
                  )}
                  <ul className="flex flex-row justify-between pt-2 my-2 text-sm px-3 font-semibold">
                    <li>Total Stockholder's Equity</li>
                    <li>{parseFloat(totalEquity).toLocaleString()}</li>
                  </ul>
                </div>
              </div>
              <div className="border border-black border-t-0 flex-row flex justify-between indent-2">
                <div className="bg-[#a28092] p-2 font-semibold text-gray-50 w-full flex flex-row justify-between px-3">
                  <h3>TOTAL ASSETS</h3>
                  <p>{parseFloat(totalAssets).toLocaleString()}</p>
                </div>
                <div className="bg-[#a28092] p-2 font-semibold text-gray-50 w-full border-l border-black flex flex-row justify-between px-3">
                  <h3>TOTAL LIABILITIES & STOCKHOLDER'S EQUITY</h3>
                  <p>{totalLiabilitiesAndEquity.toLocaleString()}</p>
                </div>
              </div>
            </div>
            <div className="flex flex-row gap-4 items-center">
              <p className="flex-grow font-semibold">
                Need to update your balance sheet?
              </p>

              <Link
                to={"./edit-balance-sheet"}
                className="self-center font-semibold px-3 py-2 bg-gradient-to-r from-[#EDC6D7] via-[#CDB6D6] to-[#B0A7D4] rounded text-slate-700 hover:opacity-90 ease-in transform transition duration-150 w-fit"
              >
                Edit
              </Link>
            </div>
          </>
        ) : (
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
                to={"./prepare-my-balance-sheet"}
                className="self-center font-semibold px-3 py-2 bg-gradient-to-r from-[#EDC6D7] via-[#CDB6D6] to-[#B0A7D4] rounded text-slate-700 hover:opacity-90 ease-in transform transition duration-150 w-fit"
              >
                Prepare my balance sheet
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

const title = "font-semibold mt-2";
const layout =
  "w-full px-5 py-8 overflow-y-auto h-screen bg-gray-50 flex flex-col space-y-8";

// bg-[#b395a5]
