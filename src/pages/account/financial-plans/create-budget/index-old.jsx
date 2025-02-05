import { Link } from "react-router-dom";
import Sidebar from "../../../../components/Sidebar";
import { useState } from "react";
import { MinusCircleOutlined } from "@ant-design/icons";

const CreateBudget = () => {
  const [selectedBusinessType, setSelectedBusinessType] = useState("");

  // Employee
  const [employees, setEmployees] = useState([{ value: "", id: 0 }]);

  const handleAddEmployee = () => {
    const newId = employees.length;
    const newEmployees = [...employees, { value: "", id: newId }];
    setEmployees(newEmployees);
  };

  const handleEmployeeChange = (index, newValue) => {
    const updatedEmployees = [...employees];
    updatedEmployees[index].value = newValue;
    setEmployees(updatedEmployees);
  };

  const handleRemoveEmployee = (index) => {
    const updatedEmployees = employees.filter((_, i) => i !== index);
    setEmployees(updatedEmployees);
  };

  // purchases
  const [purchases, setPurchases] = useState([{ value: "", id: 0 }]);

  const handleAddPurchase = () => {
    const newId = purchases.length;
    const newPurchases = [...purchases, { value: "", id: newId }];
    setPurchases(newPurchases);
  };

  const handlePurchaseChange = (index, newValue) => {
    const updatedPurchases = [...purchases];
    updatedPurchases[index].value = newValue;
    setPurchases(updatedPurchases);
  };

  const handleRemovePurchase = (index) => {
    const updatedPurchases = purchases.filter((_, i) => i !== index);
    setPurchases(updatedPurchases);
  };

  // products
  const [products, setProducts] = useState([{ value: "", id: 0 }]);

  const handleAddProduct = () => {
    const newId = products.length;
    const newProducts = [...products, { value: "", id: newId }];
    setProducts(newProducts);
  };

  const handleProductChange = (index, newValue) => {
    const updatedProducts = [...products];
    updatedProducts[index].value = newValue;
    setProducts(updatedProducts);
  };

  const handleRemoveProduct = (index) => {
    const updatedProducts = products.filter((_, i) => i !== index);
    setProducts(updatedProducts);
  };

  return (
    <div className="flex flex-row bg-gray-50 h-screen">
      <Sidebar />
      <div className={layout}>
        {/* Title */}
        <h3 className={title}>
          <Link
            to={"/financial-plans"}
            className="text-gray-600 hover:text-black transform ease-in duration-150"
          >
            Financial Plans
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

                <label className="font-semibold" htmlFor="employee_list">
                  Upload or list down your current employees’ roles and salary
                  per month
                  <span className="text-red-500">*</span>
                </label>
                <input type="file" id="employee_list" className="text-xs" />
                <div />

                <label className="font-semibold" htmlFor="productOrServices">
                What do you sell?  How much do you sell it for?
                </label>
                {/* <input
                  type="text"
                  id="productOrServices"
                  placeholder="Furnitures"
                  className="text-xs"
                /> */}
                <div className="mt-8 flex flex-col">
                  {products.map((product, index) => (
                    <div
                      key={product.id}
                      className="flex gap-2 items-center mb-2"
                    >
                      <p className="text-xs font-semibold flex flex-row gap-1">
                        Product <span>{index + 1 + ":"} </span>
                      </p>
                      <input
                        type="text"
                        placeholder="Furniture, Price"
                        className="text-xs w-full"
                        value={product.value}
                        onChange={(e) =>
                          handleProductChange(index, e.target.value)
                        }
                      />
                      <button
                        onClick={() => handleRemoveProduct(index)}
                        className="p-2 bg-slate-500 text-white text-xs rounded flex items-center justify-center hover:opacity-90 ease-in transform transition duration-150
                        "
                      >
                        <MinusCircleOutlined style={{ fontSize: "1rem" }} />
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={handleAddProduct}
                    className="px-3 py-2 bg-[#CDB6D6] text-slate-700 font-semibold text-xs rounded hover:opacity-90 ease-in transform transition duration-150 w-fit self-end"
                  >
                    Add Product
                  </button>
                  <div />
                </div>
                <div />

                <label className="font-semibold" htmlFor="growth_rate">
                  How much more do you want to sell next year compared to what
                  you're selling this year? Usual answer is 10%-20%, if you're
                  growing normally, and 100%, if you want to grow very quickly.{" "}
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
                  How do you plan to get there? Check all that apply.
                  <span className="text-red-500">*</span>
                </label>
                <div className="flex items-center gap-1 text-xs">
                  <input
                    type="checkbox"
                    id="strategy1"
                    name="strategy1"
                    value="New product line"
                  />
                  <label htmlFor="strategy1">New product line</label>
                </div>
                <div className="flex items-center gap-1 text-xs">
                  <input
                    type="checkbox"
                    id="strategy2"
                    name="strategy2"
                    value="New branch"
                  />
                  <label htmlFor="strategy2">New branch</label>
                </div>
                <div className="flex items-center gap-1 text-xs">
                  <input
                    type="checkbox"
                    id="strategy3"
                    name="strategy3"
                    value="Add a salesperson"
                  />
                  <label htmlFor="strategy3">Add a salesperson</label>
                </div>
                <div className="flex items-center gap-1 text-xs">
                  <input
                    type="checkbox"
                    id="other_strategy"
                    name="other_strategy"
                    value="Others"
                  />
                  <label htmlFor="other_strategy">Others</label>
                </div>
                <div />

                <label className="font-semibold" htmlFor="hiring_strategy">
                  Do you need extra hands to run your business next year? What’s
                  the role, salary and when do you plan to hire?
                </label>
                {/* <input
                  type="text"
                  id="hiring_strategy"
                  placeholder="Role, Salary, Month"
                  className="text-xs"
                /> */}
                <div className="mt-8 flex flex-col">
                  {employees.map((employee, index) => (
                    <div
                      key={employee.id}
                      className="flex gap-2 items-center mb-2"
                    >
                      <p className="text-xs font-semibold flex flex-row gap-1">
                        Employee <span>{index + 1 + ":"} </span>
                      </p>
                      <input
                        type="text"
                        placeholder="Role, Salary, Month"
                        className="text-xs w-full"
                        value={employee.value}
                        onChange={(e) =>
                          handleEmployeeChange(index, e.target.value)
                        }
                      />
                      <button
                        onClick={() => handleRemoveEmployee(index)}
                        className="p-2 bg-slate-500 text-white text-xs rounded flex items-center justify-center hover:opacity-90 ease-in transform transition duration-150
                        "
                      >
                        <MinusCircleOutlined style={{ fontSize: "1rem" }} />
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={handleAddEmployee}
                    className="px-3 py-2 bg-[#CDB6D6] text-slate-700 font-semibold text-xs rounded hover:opacity-90 ease-in transform transition duration-150 w-fit self-end"
                  >
                    Add Employee
                  </button>
                </div>
                <div />

                <label className="font-semibold" htmlFor="capital_expenditure">
                  What are the big purchases that will help you grow next year?
                  For example, a sewing machine or a cutting machine. How much
                  do you think it will be, when do you plan to buy it, and how
                  many years do you think you can use it for?
                </label>
                {/* <input
                  type="text"
                  id="capital_expenditure"
                  placeholder=" Capital expenditure, Amount, Month, 5 years"
                  className="text-xs"
                /> */}
                <div className="mt-8 flex flex-col">
                  {purchases.map((purchase, index) => (
                    <div
                      key={purchase.id}
                      className="flex gap-2 items-center mb-2"
                    >
                      <p className="text-xs font-semibold flex flex-row gap-1">
                        Purchase <span>{index + 1 + ":"} </span>
                      </p>
                      <input
                        type="text"
                        placeholder="Big purchase, Amount, Month, 5 years"
                        className="text-xs w-full"
                        value={purchase.value}
                        onChange={(e) =>
                          handlePurchaseChange(index, e.target.value)
                        }
                      />
                      <button
                        onClick={() => handleRemovePurchase(index)}
                        className="p-2 bg-slate-500 text-white text-xs rounded flex items-center justify-center hover:opacity-90 ease-in transform transition duration-150
                        "
                      >
                        <MinusCircleOutlined style={{ fontSize: "1rem" }} />
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={handleAddPurchase}
                    className="px-3 py-2 bg-[#CDB6D6] text-slate-700 font-semibold text-xs rounded hover:opacity-90 ease-in transform transition duration-150 w-fit self-end"
                  >
                    Add Purchase
                  </button>
                </div>
                <div />

                <Link
                  to={"/cashflow-overview/1"}
                  className="self-center font-semibold px-3 py-2 bg-gradient-to-r from-[#EDC6D7] via-[#CDB6D6] to-[#B0A7D4] rounded text-slate-700 hover:opacity-90 ease-in transform transition duration-150 w-fit text-sm"
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
                  How do you plan to make sales? Check all that apply.
                  <span className="text-red-500">*</span>
                </label>
                <div className="flex items-center gap-1 text-xs">
                  <input
                    type="checkbox"
                    id="new_strategy1"
                    name="new_strategy1"
                    value="Sell a product"
                  />
                  <label htmlFor="new_strategy1">Sell a product</label>
                </div>
                <div className="flex items-center gap-1 text-xs">
                  <input
                    type="checkbox"
                    id="new_strategy2"
                    name="new_strategy2"
                    value="Open a shop"
                  />
                  <label htmlFor="new_strategy2">Open a shop</label>
                </div>
                <div className="flex items-center gap-1 text-xs">
                  <input
                    type="checkbox"
                    id="new_strategy3"
                    name="new_strategy3"
                    value="Hire a salesperson"
                  />
                  <label htmlFor="new_strategy3">Hire a salesperson</label>
                </div>
                <div className="flex items-center gap-1 text-xs">
                  <input
                    type="checkbox"
                    id="new_other_strategy"
                    name="new_other_strategy"
                    value="Others"
                  />
                  <label htmlFor="new_other_strategy">Others</label>
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

                <label
                  className="font-semibold"
                  htmlFor="new_capital_expenditure"
                >
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
                  className="self-center font-semibold px-3 py-2 bg-gradient-to-r from-[#EDC6D7] via-[#CDB6D6] to-[#B0A7D4] rounded text-slate-700 hover:opacity-90 ease-in transform transition duration-150 w-fit text-sm"
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
