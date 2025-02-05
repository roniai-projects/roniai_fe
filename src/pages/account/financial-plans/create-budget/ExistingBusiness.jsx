import {
  ArrowLeftOutlined,
  ArrowRightOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import constants from "../../../../constants";
import { useState } from "react";
import axios from "axios";

const questionnaires = constants.existingBusinessQuestions;

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const ExistingBusiness = () => {
  const navigate = useNavigate();
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const [showInput, setShowInput] = useState(false);
  const [strategy1Checked, setStrategy1Checked] = useState(false);
  const [strategy2Checked, setStrategy2Checked] = useState(false);
  const [strategy3Checked, setStrategy3Checked] = useState(false);
  const [strategy1Input, setStrategy1Input] = useState("");
  const [otherStrategyChecked, setOtherStrategyChecked] = useState(false);
  const [otherStrategyInput, setOtherStrategyInput] = useState("");
  const [financialStatement, setFinancialStatement] = useState(null);
  const [monthlyRevenues, setMonthlyRevenues] = useState(null);
  const [employeeFiles, setEmployeeFiles] = useState(null);
  const [selectedGrowthRate, setSelectedGrowthRate] = useState("10%");

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const name = e.target.name;
    if (name === "financial_statement") {
      setFinancialStatement(file);
    } else if (name === "monthly_revenues") {
      setMonthlyRevenues(file);
    } else if (name === "hiring_table") {
      setEmployeeFiles(file);
    }
  };

  const handleGrowthRateChange = (e) => {
    setSelectedGrowthRate(e.target.value);
  };

  const handleStrategy1Change = () => {
    setStrategy1Checked(!strategy1Checked);
    setShowInput(!showInput);
  };

  const handleStrategy1InputChange = (e) => {
    setStrategy1Input(e.target.value);
  };

  const handleStrategy2Change = () => {
    setStrategy2Checked(!strategy2Checked);
  };

  const handleStrategy3Change = () => {
    setStrategy3Checked(!strategy3Checked);
  };

  const handleOtherStrategyChange = () => {
    setOtherStrategyChecked(!otherStrategyChecked);
    setShowInput(!showInput);
  };

  const handleOtherStrategyInputChange = (e) => {
    setOtherStrategyInput(e.target.value);
  };

  const handleNextCard = (e) => {
    e.preventDefault();
    setActiveCardIndex((prevIndex) => prevIndex + 1);
  };

  const handlePrevCard = (e) => {
    e.preventDefault();
    setActiveCardIndex((prevIndex) => prevIndex - 1);
  };

  const progress = Math.round(
    Math.min(((activeCardIndex + 1) / questionnaires.length) * 100, 100)
  );

  const [productRows, setProductRows] = useState([{ product: "", price: "" }]);

  const addProductRow = () => {
    const newProductRow = { product: "", price: "" };
    setProductRows((prevProductRows) => [...prevProductRows, newProductRow]);
  };

  const deleteProductRow = (index) => {
    const updatedProductRows = [...productRows];
    updatedProductRows.splice(index, 1);
    setProductRows(updatedProductRows);
  };

  const [operationsEmployeeRows, setOperationsEmployeeRows] = useState([
    { role: "", salary: "", month: "January" },
  ]);

  const addOperationsEmployeeRow = () => {
    const newOperationsEmployeeRow = { role: "", salary: "", month: "January" };
    setOperationsEmployeeRows((prevOperationsEmployeeRows) => [
      ...prevOperationsEmployeeRows,
      newOperationsEmployeeRow,
    ]);
  };

  const deleteOperationsEmployeeRow = (index) => {
    const updatedOperationsEmployeeRows = [...operationsEmployeeRows];
    updatedOperationsEmployeeRows.splice(index, 1);
    setOperationsEmployeeRows(updatedOperationsEmployeeRows);
  };

  const [salesEmployeeRows, setSalesEmployeeRows] = useState([
    { role: "", salary: "", month: "January" },
  ]);

  const addSalesEmployeeRow = () => {
    const newSalesEmployeeRow = { role: "", salary: "", month: "January" };
    setSalesEmployeeRows((prevSalesEmployeeRows) => [
      ...prevSalesEmployeeRows,
      newSalesEmployeeRow,
    ]);
  };

  const deleteSalesEmployeeRow = (index) => {
    const updatedSalesEmployeeRows = [...salesEmployeeRows];
    updatedSalesEmployeeRows.splice(index, 1);
    setSalesEmployeeRows(updatedSalesEmployeeRows);
  };

  const [techEmployeeRows, setTechEmployeeRows] = useState([
    { role: "", salary: "", month: "January" },
  ]);

  const addTechEmployeeRow = () => {
    const newTechEmployeeRow = { role: "", salary: "", month: "January" };
    setTechEmployeeRows((prevTechEmployeeRows) => [
      ...prevTechEmployeeRows,
      newTechEmployeeRow,
    ]);
  };

  const deleteTechEmployeeRow = (index) => {
    const updatedTechEmployeeRows = [...techEmployeeRows];
    updatedTechEmployeeRows.splice(index, 1);
    setTechEmployeeRows(updatedTechEmployeeRows);
  };

  const [purchaseRows, setPurchaseRows] = useState([
    { purchase: "", amount: "", month: "January", lifespan: "" },
  ]);

  const addPurchaseRow = () => {
    const newPurchaseRow = {
      purchase: "",
      amount: "",
      month: "January",
      lifespan: "",
    };
    setPurchaseRows((prevPurchaseRows) => [
      ...prevPurchaseRows,
      newPurchaseRow,
    ]);
  };

  const deletePurchaseRow = (index) => {
    const updatedPurchaseRows = [...purchaseRows];
    updatedPurchaseRows.splice(index, 1);
    setPurchaseRows(updatedPurchaseRows);
  };

  const postData = async (e) => {
    e.preventDefault();
    // if (!financialStatement || !monthlyRevenues || !employeeFiles) {
    //   alert("Please upload all required files.");
    //   return;
    // }
    if (!financialStatement) {
      alert("Please upload your financial statement.");
      return;
    }

    const productRowsJSON = JSON.stringify(productRows);
    const operationsEmployeeRowsJSON = JSON.stringify(operationsEmployeeRows);
    const salesEmployeeRowsJSON = JSON.stringify(salesEmployeeRows);
    const techEmployeeRowsJSON = JSON.stringify(techEmployeeRows);
    const purchaseRowsJSON = JSON.stringify(purchaseRows);

    const formData = new FormData();
    formData.append("financial_statement", financialStatement);
    formData.append("monthly_revenues", monthlyRevenues);
    formData.append("employee_file", employeeFiles);

    formData.append("growth_rate", selectedGrowthRate);

    formData.append("product_table", productRowsJSON);
    formData.append("operations_hiring_table", operationsEmployeeRowsJSON);
    formData.append("sales_marketing_hiring_table", salesEmployeeRowsJSON);
    formData.append("technology_hiring_table", techEmployeeRowsJSON);
    formData.append("ppe_table", purchaseRowsJSON);

    const growthPlan = {
      new_product_line: strategy1Checked ? true : false,
      strategy1Input: strategy1Input ? strategy1Input : false,
      new_branch: strategy2Checked ? true : false,
      add_a_salesperson: strategy3Checked ? true : false,
      other_strategy: otherStrategyChecked ? true : false,
      otherStrategyInput: otherStrategyInput ? otherStrategyInput : false,
    };

    formData.append("growth_plan", JSON.stringify(growthPlan));

    try {
      const response = await axios.post(
        `${API_BASE_URL}/upload_income_statement_workflow`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
          },
        }
      );

      console.log("Form submitted successfully!", response.data);
      // Handle success, update state, or perform any other actions
      navigate("/cashflow-overview");
    } catch (error) {
      console.error("Error submitting form:", error);

      if (error.response && error.response.status === 500) {
        // Internal Server Error occurred
        alert("Internal Server Error. Please try again later.");
        navigate("/financial-plans/create-a-budget");
      } else {
        // Handle other errors
        alert("An error occurred. Please check your inputs and try again.");
        navigate("/financial-plans/create-a-budget");
      }
    }
  };

  return (
    <div className="flex flex-col flex-1 items-center justify-center h-screen bg-gray-100 relative gap-6">
      {questionnaires.map(
        (questionnaire, index) =>
          index === activeCardIndex && ( // Only show the active form
            <form
              key={`${index}-${questionnaire.id}`}
              className="flex w-full px-4 md:px-8 lg:px-12 flex-col md:gap-10"
            >
              <div className="lg:w-1/2 flex flex-col">
                {" "}
                {/* Progress bar */}
                <span className="md:text-lg font-semibold text-slate-500">
                  You are {progress}% complete
                </span>
                <div className="bg-gray-300 h-3 md:h-4 rounded-full">
                  <div
                    className="bg-gradient-to-r from-[#EDC6D7] via-[#CDB6D6] to-[#B0A7D4] h-3 md:h-4 rounded-full"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
              {/* Question */}
              <h2 className="md:text-3xl leading-5 text-left w-full">
                {questionnaire.description}{" "}
                {questionnaire.required && (
                  <span className="text-red-500">*</span>
                )}
                {questionnaire.financialStatement ||
                questionnaire.monthlyRevenues ? (
                  <span className="font-base text-xl">
                    {" "}
                    You can follow this{" "}
                    <a
                      className="text-blue-600 hover:opacity-90 ease-in duration-100"
                      href="/FS_template.xlsx"
                      download
                    >
                      template
                    </a>
                    .
                  </span>
                ) : null}
                {questionnaire.employeeFile ? (
                  <span className="font-base text-xl">
                    {" "}
                    You can follow this{" "}
                    <a
                      className="text-blue-600 hover:opacity-90 ease-in duration-100"
                      href="/employees_list_template.xlsx"
                      download
                    >
                      template
                    </a>
                    .
                  </span>
                ) : null}
              </h2>

              {/* uploads and inputs */}

              {questionnaire.financialStatement === true && (
                <input
                  type="file"
                  name="financial_statement"
                  onChange={handleFileChange}
                  required={questionnaire.required}
                  accept=".xlsx, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                />
              )}

              {questionnaire.monthlyRevenues === true && (
                <input
                  type="file"
                  name="monthly_revenues"
                  onChange={handleFileChange}
                  accept=".xlsx, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                />
              )}

              {questionnaire.employeeFile === true && (
                <input
                  type="file"
                  name="hiring_table"
                  onChange={handleFileChange}
                  accept=".xlsx, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                />
              )}

              {questionnaire.select && (
                <select
                  name="growth_rate"
                  id="growth_rate"
                  value={selectedGrowthRate}
                  onChange={handleGrowthRateChange}
                >
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
              )}

              {questionnaire.checkbox && (
                <div className="space-y-2">
                  <div className="flex items-center gap-1">
                    <input
                      type="checkbox"
                      id="strategy1"
                      name="strategy1"
                      value="New product line"
                      checked={strategy1Checked}
                      onChange={handleStrategy1Change}
                    />
                    <label htmlFor="strategy1">New product line</label>
                    {strategy1Checked && (
                      <input
                        className="text-sm ml-2 border-0 border-b bg-transparent p-0 px-2"
                        type="text"
                        id="strategy1Input"
                        name="strategy1Input"
                        placeholder="Enter product here"
                        value={strategy1Input}
                        onChange={handleStrategy1InputChange}
                      />
                    )}
                  </div>
                  <div className="flex items-center gap-1">
                    <input
                      type="checkbox"
                      id="new_branch"
                      name="new_branch"
                      value="New branch"
                      checked={strategy2Checked}
                      onChange={handleStrategy2Change}
                    />
                    <label htmlFor="new_branch">New branch</label>
                  </div>
                  <div className="flex items-center gap-1">
                    <input
                      type="checkbox"
                      id="add_a_salesperson"
                      name="add_a_salesperson"
                      value="Add a salesperson"
                      checked={strategy3Checked}
                      onChange={handleStrategy3Change}
                    />
                    <label htmlFor="add_a_salesperson">Add a salesperson</label>
                  </div>
                  <div className="flex items-center gap-1">
                    <input
                      type="checkbox"
                      id="other_strategy"
                      name="other_strategy"
                      value="Others"
                      checked={otherStrategyChecked}
                      onChange={handleOtherStrategyChange}
                    />
                    <label htmlFor="other_strategy">Others</label>
                    {otherStrategyChecked && (
                      <input
                        className="text-sm ml-2 border-0 border-b bg-transparent p-0 px-2"
                        type="text"
                        id="otherStrategyInput"
                        name="otherStrategyInput"
                        placeholder="Enter strategy here"
                        value={otherStrategyInput}
                        onChange={handleOtherStrategyInputChange}
                      />
                    )}
                  </div>
                </div>
              )}

              {questionnaire.product && (
                <div className=" overflow-y-scroll max-h-60">
                  <table className="self-start w-3/5 text-left">
                    <thead>
                      <tr className="bg-[#b395a5] text-white">
                        <th className="border border-black px-3 py-1">
                          Product/Service
                        </th>
                        <th className="border border-black px-3 py-1">Price</th>
                        <th className="border border-black px-3 py-1 text-center">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {productRows.map((productRow, index) => (
                        <tr key={index}>
                          <td className="p-0 border border-black">
                            <input
                              className="w-full h-full border-0"
                              type="text"
                              placeholder="Furniture"
                              value={productRow.product}
                              onChange={(e) => {
                                const updatedProductRows = [...productRows];
                                updatedProductRows[index].product =
                                  e.target.value;
                                setProductRows(updatedProductRows);
                              }}
                            />
                          </td>
                          <td className="p-0 border border-black">
                            <input
                              type="number"
                              placeholder="20,000"
                              className="w-full h-full border-0"
                              value={productRow.price}
                              onChange={(e) => {
                                const updatedProductRows = [...productRows];
                                updatedProductRows[index].price =
                                  e.target.value;
                                setProductRows(updatedProductRows);
                              }}
                            />
                          </td>
                          <td className="p-0 border border-black bg-black text-white">
                            <button
                              className="w-full h-full border-0 text-center"
                              onClick={(e) => {
                                e.preventDefault();
                                deleteProductRow(index);
                              }}
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      addProductRow();
                    }}
                    className="rounded-full mt-8 bg-gradient-to-r from-[#EDC6D7] via-[#CDB6D6] to-[#B0A7D4] px-4 py-1.5"
                  >
                    Add Row
                  </button>
                </div>
              )}

              {questionnaire.employee && (
                // <div className=" overflow-y-scroll max-h-60">
                //   <table className="self-start w-3/5 text-left">
                //     <thead>
                //       <tr className="bg-[#b395a5] text-white">
                //         <th className="border border-black px-3 py-1">Role</th>
                //         <th className="border border-black px-3 py-1">
                //           Salary/month
                //         </th>
                //         <th className="border border-black px-3 py-1">
                //           Start Date
                //         </th>
                //         <th className="border border-black px-3 py-1">
                //           Actions
                //         </th>
                //       </tr>
                //     </thead>
                //     <tbody>
                //       {employeeRows.map((employeeRow, index) => (
                //         <tr key={index}>
                //           <td className="p-0 border border-black">
                //             {/* <input
                //               className="w-full h-full border-0"
                //               type="text"
                //               placeholder="Executive Assistant"
                //               value={employeeRow.role}
                //               onChange={(e) => {
                //                 const updatedEmployeeRows = [...employeeRows];
                //                 updatedEmployeeRows[index].role =
                //                   e.target.value;
                //                 setEmployeeRows(updatedEmployeeRows);
                //               }}
                //             /> */}
                //             <select
                //               className="w-full h-full border-0"
                //               value={employeeRow.role} // Set the selected value
                //               onChange={(e) => {
                //                 const updatedEmployeeRows = [...employeeRows];
                //                 updatedEmployeeRows[index].role =
                //                   e.target.value;
                //                 setEmployeeRows(updatedEmployeeRows);
                //               }}
                //             >
                //               <option value="Operations">Operations</option>
                //               <option value="Sales and Marketing">
                //                 Sales and Marketing
                //               </option>
                //               <option value="Technology">Technology</option>
                //             </select>
                //           </td>
                //           <td className="p-0 border border-black">
                //             <input
                //               type="number"
                //               placeholder="35,000"
                //               className="w-full h-full border-0"
                //               value={employeeRow.salary}
                //               onChange={(e) => {
                //                 const updatedEmployeeRows = [...employeeRows];
                //                 updatedEmployeeRows[index].salary =
                //                   e.target.value;
                //                 setEmployeeRows(updatedEmployeeRows);
                //               }}
                //             />
                //           </td>
                //           <td className="p-0 border border-black">
                //             <input
                //               className="w-full h-full border-0 cursor-not-allowed"
                //               type="text"
                //               placeholder="January"
                //               value={employeeRow.month}
                //               onChange={(e) => {
                //                 const updatedEmployeeRows = [...employeeRows];
                //                 updatedEmployeeRows[index].month =
                //                   e.target.value;
                //                 setEmployeeRows(updatedEmployeeRows);
                //               }}
                //               disabled
                //             />
                //           </td>
                //           <td className="p-0 border border-black bg-black text-white">
                //             <button
                //               className="w-full h-full border-0 text-center "
                //               onClick={(e) => {
                //                 e.preventDefault();
                //                 deleteEmployeeRow(index);
                //               }}
                //             >
                //               Delete
                //             </button>
                //           </td>
                //         </tr>
                //       ))}
                //     </tbody>
                //   </table>
                //   <button
                //     onClick={(e) => {
                //       e.preventDefault();
                //       addEmployeeRow();
                //     }}
                //     className="rounded-full mt-8 bg-gradient-to-r from-[#EDC6D7] via-[#CDB6D6] to-[#B0A7D4] px-4 py-1.5"
                //   >
                //     Add Row
                //   </button>
                // </div>

                // updated table - operations
                <div className=" overflow-y-scroll max-h-60 ">
                  <p className="my-4 text-center w-3/5 text-xl font-semibold">
                    Operations
                  </p>
                  <table className="self-start w-3/5 text-left">
                    <thead>
                      <tr className="bg-[#b395a5] text-white">
                        <th className="border border-black px-3 py-1">Role</th>
                        <th className="border border-black px-3 py-1">
                          Salary/month
                        </th>
                        <th className="border border-black px-3 py-1">
                          Start Date
                        </th>
                        <th className="border border-black px-3 py-1">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {operationsEmployeeRows.map((employeeRow, index) => (
                        <tr key={index}>
                          <td className="p-0 border border-black">
                            <input
                              className="w-full h-full border-0"
                              type="text"
                              placeholder="Executive Assistant"
                              value={employeeRow.role}
                              onChange={(e) => {
                                const updatedOperationsEmployeeRows = [
                                  ...operationsEmployeeRows,
                                ];
                                updatedOperationsEmployeeRows[index].role =
                                  e.target.value;
                                setOperationsEmployeeRows(
                                  updatedOperationsEmployeeRows
                                );
                              }}
                            />
                            {/* <select
                              className="w-full h-full border-0"
                              value={employeeRow.role} // Set the selected value
                              onChange={(e) => {
                                const updatedEmployeeRows = [...employeeRows];
                                updatedEmployeeRows[index].role =
                                  e.target.value;
                                setEmployeeRows(updatedEmployeeRows);
                              }}
                            >
                              <option value="Operations">Operations</option>
                              <option value="Sales and Marketing">
                                Sales and Marketing
                              </option>
                              <option value="Technology">Technology</option>
                            </select> */}
                          </td>
                          <td className="p-0 border border-black">
                            <input
                              type="number"
                              placeholder="35,000"
                              className="w-full h-full border-0"
                              value={employeeRow.salary}
                              onChange={(e) => {
                                const updatedOperationsEmployeeRows = [
                                  ...operationsEmployeeRows,
                                ];
                                updatedOperationsEmployeeRows[index].salary =
                                  e.target.value;
                                setOperationsEmployeeRows(
                                  updatedOperationsEmployeeRows
                                );
                              }}
                            />
                          </td>
                          <td className="p-0 border border-black">
                            <input
                              className="w-full h-full border-0 cursor-not-allowed"
                              type="text"
                              placeholder="January"
                              value={employeeRow.month}
                              onChange={(e) => {
                                const updatedOperationsEmployeeRows = [
                                  ...operationsEmployeeRows,
                                ];
                                updatedOperationsEmployeeRows[index].month =
                                  e.target.value;
                                setOperationsEmployeeRows(
                                  updatedOperationsEmployeeRows
                                );
                              }}
                              disabled
                            />
                          </td>
                          <td className="p-0 border border-black bg-black text-white">
                            <button
                              className="w-full h-full border-0 text-center "
                              onClick={(e) => {
                                e.preventDefault();
                                deleteOperationsEmployeeRow(index);
                              }}
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      addOperationsEmployeeRow();
                    }}
                    className="rounded-full mt-8 bg-gradient-to-r from-[#EDC6D7] via-[#CDB6D6] to-[#B0A7D4] px-4 py-1.5"
                  >
                    Add Row
                  </button>

                  {/* updated table - sales and marketing */}
                  <p className="my-4 text-center w-3/5 text-xl font-semibold">
                    Sales and Marketing
                  </p>
                  <table className="self-start w-3/5 text-left mt-6">
                    <thead>
                      <tr className="bg-[#b395a5] text-white">
                        <th className="border border-black px-3 py-1">Role</th>
                        <th className="border border-black px-3 py-1">
                          Salary/month
                        </th>
                        <th className="border border-black px-3 py-1">
                          Start Date
                        </th>
                        <th className="border border-black px-3 py-1">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {salesEmployeeRows.map((employeeRow, index) => (
                        <tr key={index}>
                          <td className="p-0 border border-black">
                            <input
                              className="w-full h-full border-0"
                              type="text"
                              placeholder="Executive Assistant"
                              value={employeeRow.role}
                              onChange={(e) => {
                                const updatedSalesEmployeeRows = [
                                  ...salesEmployeeRows,
                                ];
                                updatedSalesEmployeeRows[index].role =
                                  e.target.value;
                                setSalesEmployeeRows(updatedSalesEmployeeRows);
                              }}
                            />
                            {/* <select
                              className="w-full h-full border-0"
                              value={employeeRow.role} // Set the selected value
                              onChange={(e) => {
                                const updatedEmployeeRows = [...employeeRows];
                                updatedEmployeeRows[index].role =
                                  e.target.value;
                                setEmployeeRows(updatedEmployeeRows);
                              }}
                            >
                              <option value="Operations">Operations</option>
                              <option value="Sales and Marketing">
                                Sales and Marketing
                              </option>
                              <option value="Technology">Technology</option>
                            </select> */}
                          </td>
                          <td className="p-0 border border-black">
                            <input
                              type="number"
                              placeholder="35,000"
                              className="w-full h-full border-0"
                              value={employeeRow.salary}
                              onChange={(e) => {
                                const updatedSalesEmployeeRows = [
                                  ...salesEmployeeRows,
                                ];
                                updatedSalesEmployeeRows[index].salary =
                                  e.target.value;
                                setSalesEmployeeRows(updatedSalesEmployeeRows);
                              }}
                            />
                          </td>
                          <td className="p-0 border border-black">
                            <input
                              className="w-full h-full border-0 cursor-not-allowed"
                              type="text"
                              placeholder="January"
                              value={employeeRow.month}
                              onChange={(e) => {
                                const updatedSalesEmployeeRows = [
                                  ...salesEmployeeRows,
                                ];
                                updatedSalesEmployeeRows[index].month =
                                  e.target.value;
                                setSalesEmployeeRows(updatedSalesEmployeeRows);
                              }}
                              disabled
                            />
                          </td>
                          <td className="p-0 border border-black bg-black text-white">
                            <button
                              className="w-full h-full border-0 text-center "
                              onClick={(e) => {
                                e.preventDefault();
                                deleteSalesEmployeeRow(index);
                              }}
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      addSalesEmployeeRow();
                    }}
                    className="rounded-full mt-8 bg-gradient-to-r from-[#EDC6D7] via-[#CDB6D6] to-[#B0A7D4] px-4 py-1.5"
                  >
                    Add Row
                  </button>

                  {/* updated table - technology */}
                  <p className="my-4 text-center w-3/5 text-xl font-semibold">
                    Technology
                  </p>
                  <table className="self-start w-3/5 text-left mt-6">
                    <thead>
                      <tr className="bg-[#b395a5] text-white">
                        <th className="border border-black px-3 py-1">Role</th>
                        <th className="border border-black px-3 py-1">
                          Salary/month
                        </th>
                        <th className="border border-black px-3 py-1">
                          Start Date
                        </th>
                        <th className="border border-black px-3 py-1">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {techEmployeeRows.map((employeeRow, index) => (
                        <tr key={index}>
                          <td className="p-0 border border-black">
                            <input
                              className="w-full h-full border-0"
                              type="text"
                              placeholder="Executive Assistant"
                              value={employeeRow.role}
                              onChange={(e) => {
                                const updatedTechEmployeeRows = [
                                  ...techEmployeeRows,
                                ];
                                updatedTechEmployeeRows[index].role =
                                  e.target.value;
                                setTechEmployeeRows(updatedTechEmployeeRows);
                              }}
                            />
                            {/* <select
                              className="w-full h-full border-0"
                              value={employeeRow.role} // Set the selected value
                              onChange={(e) => {
                                const updatedEmployeeRows = [...employeeRows];
                                updatedEmployeeRows[index].role =
                                  e.target.value;
                                setTechEmployeeRows(updatedEmployeeRows);
                              }}
                            >
                              <option value="Operations">Operations</option>
                              <option value="Sales and Marketing">
                                Sales and Marketing
                              </option>
                              <option value="Technology">Technology</option>
                            </select> */}
                          </td>
                          <td className="p-0 border border-black">
                            <input
                              type="number"
                              placeholder="35,000"
                              className="w-full h-full border-0"
                              value={employeeRow.salary}
                              onChange={(e) => {
                                const updatedTechEmployeeRows = [
                                  ...techEmployeeRows,
                                ];
                                updatedTechEmployeeRows[index].salary =
                                  e.target.value;
                                setTechEmployeeRows(updatedTechEmployeeRows);
                              }}
                            />
                          </td>
                          <td className="p-0 border border-black">
                            <input
                              className="w-full h-full border-0 cursor-not-allowed"
                              type="text"
                              placeholder="January"
                              value={employeeRow.month}
                              onChange={(e) => {
                                const updatedEmployeeRows = [...employeeRows];
                                updatedEmployeeRows[index].month =
                                  e.target.value;
                                setTechEmployeeRows(updatedEmployeeRows);
                              }}
                              disabled
                            />
                          </td>
                          <td className="p-0 border border-black bg-black text-white">
                            <button
                              className="w-full h-full border-0 text-center "
                              onClick={(e) => {
                                e.preventDefault();
                                deleteTechEmployeeRow(index);
                              }}
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      addTechEmployeeRow();
                    }}
                    className="rounded-full mt-8 bg-gradient-to-r from-[#EDC6D7] via-[#CDB6D6] to-[#B0A7D4] px-4 py-1.5"
                  >
                    Add Row
                  </button>
                </div>
              )}

              {questionnaire.purchase && (
                <div className=" overflow-y-scroll max-h-60">
                  <table className="self-start w-3/5 text-left">
                    <thead>
                      <tr className="bg-[#b395a5] text-white">
                        <th className="border border-black px-3 py-1">
                          Purchase
                        </th>
                        <th className="border border-black px-3 py-1">
                          Amount
                        </th>
                        <th className="border border-black px-3 py-1">Month</th>
                        <th className="border border-black px-3 py-1">
                          Lifespan (years)
                        </th>
                        <th className="border border-black px-3 py-1 text-center">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {purchaseRows.map((purchaseRow, index) => (
                        <tr key={index}>
                          <td className="p-0 border border-black">
                            <input
                              className="w-full h-full border-0"
                              type="text"
                              placeholder="Truck"
                              value={purchaseRow.purchase}
                              onChange={(e) => {
                                const updatedPurchaseRows = [...purchaseRows];
                                updatedPurchaseRows[index].purchase =
                                  e.target.value;
                                setPurchaseRows(updatedPurchaseRows);
                              }}
                            />
                          </td>
                          <td className="p-0 border border-black">
                            <input
                              type="number"
                              placeholder="3,500,000"
                              className="w-full h-full border-0"
                              value={purchaseRow.amount}
                              onChange={(e) => {
                                const updatedPurchaseRows = [...purchaseRows];
                                updatedPurchaseRows[index].amount =
                                  e.target.value;
                                setPurchaseRows(updatedPurchaseRows);
                              }}
                            />
                          </td>
                          <td className="p-0 border border-black">
                            <input
                              className="w-full h-full border-0 cursor-not-allowed"
                              type="text"
                              placeholder="January"
                              value={purchaseRow.month}
                              onChange={(e) => {
                                const updatedPurchaseRows = [...purchaseRows];
                                updatedPurchaseRows[index].month =
                                  e.target.value;
                                setPurchaseRows(updatedPurchaseRows);
                              }}
                              disabled
                            />
                          </td>
                          <td className="p-0 border border-black">
                            <input
                              className="w-full h-full border-0"
                              type="number"
                              placeholder="5"
                              value={purchaseRow.lifespan}
                              onChange={(e) => {
                                const updatedPurchaseRows = [...purchaseRows];
                                updatedPurchaseRows[index].lifespan =
                                  e.target.value;
                                setPurchaseRows(updatedPurchaseRows);
                              }}
                            />
                          </td>
                          <td className="p-0 border border-black bg-black text-white">
                            <button
                              className="w-full h-full border-0 text-center "
                              onClick={(e) => {
                                e.preventDefault();
                                deletePurchaseRow(index);
                              }}
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      addPurchaseRow();
                    }}
                    className="rounded-full mt-8 bg-gradient-to-r from-[#EDC6D7] via-[#CDB6D6] to-[#B0A7D4] px-4 py-1.5"
                  >
                    Add Row
                  </button>
                </div>
              )}

              {/* Buttons */}
              <div className="flex flex-row gap-5">
                {activeCardIndex !== 0 && (
                  <button
                    className="w-fit p-2 flex items-center
                   justify-center text-white bg-black rounded"
                    onClick={handlePrevCard}
                  >
                    <ArrowLeftOutlined />
                  </button>
                )}

                {activeCardIndex !== questionnaires.length - 1 && (
                  <button
                    className="w-fit p-2 flex items-center
                   justify-center text-white bg-black rounded"
                    onClick={handleNextCard}
                  >
                    <ArrowRightOutlined />
                  </button>
                )}
                {activeCardIndex === questionnaires.length - 1 && (
                  <button
                    // to={"/cashflow-overview/1"}
                    onClick={postData}
                    className="w-fit px-4 py-1.5 flex items-center
                   justify-center bg-gradient-to-r from-[#EDC6D7] via-[#CDB6D6] to-[#B0A7D4] rounded ml-auto uppercase"
                  >
                    submit
                  </button>
                  // <Link
                  //   to={"/cashflow-overview/1"}
                  //   className="w-fit px-4 py-1.5 flex items-center
                  //  justify-center bg-gradient-to-r from-[#EDC6D7] via-[#CDB6D6] to-[#B0A7D4] rounded ml-auto uppercase"
                  // >
                  //   submit
                  // </Link>
                )}
              </div>
            </form>
          )
      )}

      <Link
        to={"/financial-plans"}
        className="absolute top-6 right-6 hover:opacity-90 ease-in transform transition duration-150"
      >
        <CloseOutlined style={{ fontSize: "2rem" }} />
      </Link>
    </div>
  );
};

export default ExistingBusiness;
