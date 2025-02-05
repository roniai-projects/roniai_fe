import { Link } from "react-router-dom";
import Sidebar from "../../../../components/Sidebar";
import { useState } from "react";

const CreateBudget = () => {
  const [selectedBusinessType, setSelectedBusinessType] = useState("");
  return (
    <div className="flex flex-row bg-gray-50 h-screen">
      <Sidebar />
      <div className={layout}>
        {/* Title */}
        <h3 className={title}>
          <Link
            to={"/financial-performance"}
            className="text-gray-600 hover:text-black transform ease-in duration-150"
          >
            Financial Performance
          </Link>
          {" >"} Create a Budget
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
            <div className="flex items-center gap-1">
              <input
                type="radio"
                id="existing-business"
                name="business_type"
                value="existing business"
                onChange={() => setSelectedBusinessType("existing")}
              />
              <label htmlFor="existing-business">Existing business</label>
            </div>
            <div className="flex items-center gap-1">
              <input
                type="radio"
                id="new-business"
                name="business_type"
                value="new business"
                onChange={() => setSelectedBusinessType("new")}
              />
              <label htmlFor="new-business">New business</label>
            </div>
               
            {selectedBusinessType === "existing" && (
              <div className="flex flex-col space-y-2 w-full">
                <label className="font-semibold" htmlFor="financial_statement">
                  Upload your latest Financial Statements, including income
                  statement, balance sheet, and cash flows
                  <span className="text-red-500">*</span>
                </label>
                <input
                  type="file"
                  id="financial_statement"
                  className="text-xs"
                />
                <div />

                <label className="font-semibold" htmlFor="monthly_revenues">
                  Upload your monthly revenues for the past year
                  <span className="text-red-500">*</span>
                </label>
                <input type="file" id="monthly_revenues" className="text-xs" />
                <div />

                <label className="font-semibold" htmlFor="assumption_sheet">
                  Upload your assumption sheet for the budget, if you have it
                  <span className="text-red-500">*</span>
                </label>
                <input type="file" id="assumption_sheet" className="text-xs" />
                <div />

                <label className="font-semibold" htmlFor="employee_list">
                  Upload or list down your current employees’ roles and salary
                  per month
                  <span className="text-red-500">*</span>
                </label>
                <input type="file" id="employee_list" className="text-xs" />
                <div />

                <label className="font-semibold" htmlFor="earning-method">
                  How does your company make money?
                </label>
                <input
                  type="text"
                  id="earning-method"
                  placeholder="Online services"
                  className="text-xs"
                />
                <div />

                <label className="font-semibold" htmlFor="growth_rate">
                  What is your growth target for the this year? How about the
                  year after that? Usual answer would be 10% or 20% for
                  nonstartups, and 100% for startups.{" "}
                  <span className="text-red-500">*</span>
                </label>
                <select name="growth_rate" id="growth_rate" className="text-xs">
                  <option value="10%">10%</option>
                  <option value="20%">20%</option>
                  <option value="30%">30%</option>
                  <option value="40%">40%</option>
                  <option value="50%">50%</option>
                  <option value="60%">60%</option>
                  <option value="70%">70%</option>
                  <option value="80%">80%</option>
                  <option value="90%">90%</option>
                  <option value="100%">100%</option>
                  <option value="150%">150%</option>
                  <option value="200%">200%</option>
                </select>
                <div />

                <label className="font-semibold" htmlFor="strategy">
                  How do you plan to achieve this growth? Check all that
                  applies.
                  <span className="text-red-500">*</span>
                </label>
                <div className="flex items-center gap-1">
                  <input
                    type="checkbox"
                    id="strategy1"
                    name="strategy1"
                    value="New product line"
                  />
                  <label for="strategy1">New product line</label>
                </div>
                <div className="flex items-center gap-1">
                  <input
                    type="checkbox"
                    id="strategy2"
                    name="strategy2"
                    value="New branch"
                  />
                  <label for="strategy2">New branch</label>
                </div>
                <div className="flex items-center gap-1">
                  <input
                    type="checkbox"
                    id="strategy3"
                    name="strategy3"
                    value="Add a salesperson"
                  />
                  <label for="strategy3">Add a salesperson</label>
                </div>
                <div className="flex items-center gap-1">
                  <input
                    type="checkbox"
                    id="other_strategy"
                    name="other_strategy"
                    value="Others"
                  />
                  <label for="other_strategy">Others</label>
                </div>
                <div />

                <label className="font-semibold" htmlFor="hiring_strategy">
                  Do you plan to hire employees this year? What’s the role,
                  salary and when do you plan to hire?
                </label>
                <input
                  type="text"
                  id="hiring_strategy"
                  placeholder="Role, Salary, Month"
                  className="text-xs"
                />
                <div />

                <label className="font-semibold" htmlFor="capital_expenditure">
                  Are you planning any capital expenditure this year? How much
                  and when?
                </label>
                <input
                  type="text"
                  id="capital_expenditure"
                  placeholder=" Capital expenditure, Amount, Month"
                  className="text-xs"
                />

                <label
                  className="font-semibold"
                  htmlFor="capital_expenditure_date"
                >
                  How long are you planning to use them?
                </label>
                <input
                  type="text"
                  id="capital_expenditure_date"
                  placeholder=" Capital expenditure, Useful life"
                  className="text-xs"
                />
                <div />

                <Link
                  to={"/financial-performance"}
                  className="uppercase font-semibold px-3 py-2 bg-gradient-to-r from-[#EDC6D7] via-[#CDB6D6] to-[#B0A7D4] rounded text-slate-700 hover:opacity-90 ease-in transform transition duration-150 w-fit text-xs"
                >
                  Submit
                </Link>
              </div>
            )}
            {selectedBusinessType === "new" && (
              <div className="flex flex-col space-y-2 w-full">
                <label
                  className="font-semibold"
                  htmlFor="new_financial_statement"
                >
                  Upload your assumption sheet for the budget, if you have it
                </label>
                <input
                  type="file"
                  id="new_financial_statement"
                  className="text-xs"
                />
                <div />

                <label className="font-semibold" htmlFor="new_earning_method">
                  How does your company make money?
                </label>
                <input
                  type="text"
                  id="new_earning_method"
                  placeholder="Online services"
                  className="text-xs"
                />
                <div />

                <label className="font-semibold" htmlFor="sales_target">
                  What is your sales target for this year?
                </label>
                <input
                  type="text"
                  id="sales_target"
                  placeholder="10 million sales"
                  className="text-xs"
                />
                <div />


                <label className="font-semibold" htmlFor="new_strategy">
                How do you plan to make sales? Check all that applies.
                  <span className="text-red-500">*</span>
                </label>
                <div className="flex items-center gap-1">
                  <input
                    type="checkbox"
                    id="new_strategy1"
                    name="new_strategy1"
                    value="Sell a product"
                  />
                  <label for="new_strategy1">Sell a product</label>
                </div>
                <div className="flex items-center gap-1">
                  <input
                    type="checkbox"
                    id="new_strategy2"
                    name="new_strategy2"
                    value="Open a shop"
                  />
                  <label for="new_strategy2">Open a shop</label>
                </div>
                <div className="flex items-center gap-1">
                  <input
                    type="checkbox"
                    id="new_strategy3"
                    name="new_strategy3"
                    value="Hire a salesperson"
                  />
                  <label for="new_strategy3">Hire a salesperson</label>
                </div>
                <div className="flex items-center gap-1">
                  <input
                    type="checkbox"
                    id="new_other_strategy"
                    name="new_other_strategy"
                    value="Others"
                  />
                  <label for="new_other_strategy">Others</label>
                </div>
                <div />

                <label className="font-semibold" htmlFor="new_hiring_strategy">
                  Do you plan to hire employees this year? What’s the role,
                  salary and when do you plan to hire?
                </label>
                <input
                  type="text"
                  id="new_hiring_strategy"
                  placeholder="Role, Salary, Month"
                  className="text-xs"
                />
                <div />

                <label className="font-semibold" htmlFor="new_capital_expenditure">
                  Are you planning any capital expenditure this year? How much
                  and when?
                </label>
                <input
                  type="text"
                  id="new_capital_expenditure"
                  placeholder=" Capital expenditure, Amount, Month"
                  className="text-xs"
                />

                <label
                  className="font-semibold"
                  htmlFor="new_capital_expenditure_date"
                >
                  How long are you planning to use them?
                </label>
                <input
                  type="text"
                  id="new_capital_expenditure_date"
                  placeholder=" Capital expenditure, Useful life"
                  className="text-xs"
                />
                <div />

                <Link
                  to={"/financial-performance"}
                  className="uppercase font-semibold px-3 py-2 bg-gradient-to-r from-[#EDC6D7] via-[#CDB6D6] to-[#B0A7D4] rounded text-slate-700 hover:opacity-90 ease-in transform transition duration-150 w-fit text-xs"
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

export default CreateBudget;

// Styles

const title = "font-semibold mt-2";

const layout =
  "w-full px-5 py-8 overflow-y-auto h-screen bg-gray-50 flex flex-col space-y-8";
