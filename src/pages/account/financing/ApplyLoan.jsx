import React, { useState } from "react";
import { Link } from "react-router-dom";
import Sidebar from "../../../components/Sidebar";

const ApplyLoan = () => {
  const [selectedBusinessType, setSelectedBusinessType] = useState("");

  return (
    <div className="flex flex-row bg-gray-50 h-screen">
      <Sidebar />
      <div className={layout}>
        {/* Title */}
        <h3 className={title}>
          <Link
            to={"/financing"}
            className="text-gray-600 hover:text-black transform ease-in duration-150"
          >
            Financing
          </Link>
          {" >"} Apply a Loan
        </h3>
        <div className="rounded-xl bg-white p-4 text-center shadow text-sm flex flex-col items-center justify-center space-y-4">
          <h2 className="border-b border-black uppercase font-semibold pb-1 w-full text-left">
            please answer these questions
          </h2>
          <form className="text-left self-start space-y-4 text-sm w-full">
            <p className="font-semibold">
              Is this for a new or an existing business?{" "}
              <span className="text-red-500">*</span>
            </p>
            <div className="flex items-center gap-1 text-xs">
              <input
                type="radio"
                id="existing-business"
                name="business_type"
                value="existing business"
                onChange={() => setSelectedBusinessType("existing")}
              />
              <label htmlFor="existing-business">Existing business</label>
            </div>
            <div className="flex items-center gap-1 text-xs">
              <input
                type="radio"
                id="new-business"
                name="business_type"
                value="new business"
                onChange={() => setSelectedBusinessType("new")}
              />
              <label htmlFor="new-business">New business</label>
            </div>
               
            {selectedBusinessType === "new" && (
              <div className="flex flex-col space-y-4 w-full">
                <p className="text-red-500 text-xs">
                  You need to be in operations for at least 6 months.
                </p>
                <Link
                  to={"/financing"}
                  className="self-center font-semibold px-3 py-2 bg-gradient-to-r from-[#EDC6D7] via-[#CDB6D6] to-[#B0A7D4] rounded text-slate-700 hover:opacity-90 ease-in transform transition duration-150 w-fit text-xs"
                >
                  Cancel
                </Link>
              </div>
            )}
            {selectedBusinessType === "existing" && (
              <div className="flex flex-col space-y-2 w-full">
                <label className="font-semibold" htmlFor="loan">
                  How much do you want to borrow?{" "}
                  <span className="text-red-500">*</span>
                </label>
                <select name="loan" id="loan" className="text-xs">
                  <option value="5,000">5,000 PHP</option>
                  <option value="10,000">10,000 PHP</option>
                  <option value="15,000">15,000 PHP</option>
                  <option value="20,000">20,000 PHP</option>
                </select>
                <div />

                <label className="font-semibold" htmlFor="term">
                  How long is the term of the loan?{" "}
                  <span className="text-red-500">*</span>
                </label>
                <select name="term" id="term" className="text-xs">
                  <option value="1_month">1 month</option>
                  <option value="3_months">3 months</option>
                  <option value="6_months">6 months</option>
                  <option value="12_months">12 months</option>
                  <option value="1_year">1 year</option>
                  <option value="3_years">3 years</option>
                  <option value="5_years">5 years</option>
                </select>
                <div />

                <label className="font-semibold" htmlFor="reason">
                  What is it for? <span className="text-red-500">*</span>
                </label>
                <select name="reason" id="reason" className="text-xs">
                  <option value="capital_expenditure">
                    Capital expenditure
                  </option>
                  <option value="working_capital">Working capital</option>
                  <option value="refinance_an_existing_loan">
                    Refinance an existing loan
                  </option>
                  <option value="other_reason">Others</option>
                </select>
                <div />

                <label className="font-semibold" htmlFor="capital_expendature">
                  If capital expenditure, what exactly will you spend it on?
                  Examples are Equipment, Renovation, Land. How much is it and
                  when do you want to purchase it?
                </label>
                <input
                  type="text"
                  id="capital_expendature"
                  placeholder="Type, Amount, Month"
                  className="text-xs"
                />
                <div />

                <label className="font-semibold" htmlFor="useful_life">
                  What is the useful life of equipment, building, renovation, if
                  any.
                </label>
                <input
                  type="text"
                  id="useful_life"
                  placeholder="5 years"
                  className="text-xs"
                />
                <div />

                <label className="font-semibold" htmlFor="financial_statement">
                  Upload your latest Financial Statements, including income
                  statement, balance sheet, and cash flows - if not yet uploaded
                </label>
                <input
                  type="file"
                  id="financial_statement"
                  className="text-xs"
                />
                <div />

                <label className="font-semibold" htmlFor="monthly_reveneus">
                  Upload your monthly revenues for the past year - if not yet
                  uploaded
                </label>
                <input type="file" id="monthly_reveneus" className="text-xs" />
                <div />

                <label className="font-semibold" htmlFor="employee_list">
                Upload or list down your current employees’ roles and salary per month - if not yet uploaded
                </label>
                <input type="file" id="employee_list" className="text-xs" />
                <div />

                <label className="font-semibold" htmlFor="explanation">
                  How will this increase your sales? <span className="text-red-500">*</span>
                </label>

                <textarea
                  id="explanation"
                  name="explanation"
                  rows="4"
                  cols="50"
                  className="text-xs"
                  placeholder="Explain how the loan can help you increase your sales."
                ></textarea>
                <div />

                <Link
                  to={"/financing"}
                  className="self-center font-semibold px-3 py-2 bg-gradient-to-r from-[#EDC6D7] via-[#CDB6D6] to-[#B0A7D4] rounded text-slate-700 hover:opacity-90 ease-in transform transition duration-150 w-fit text-xs"
                >
                  Submit
                </Link>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default ApplyLoan;

// Styles

const title = "font-semibold mt-2";

const layout =
  "w-full px-5 py-8 overflow-y-auto h-screen bg-gray-50 flex flex-col space-y-8";
