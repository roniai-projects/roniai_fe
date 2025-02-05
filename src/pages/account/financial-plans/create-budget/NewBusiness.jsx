import {
  ArrowLeftOutlined,
  ArrowRightOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import constants from "../../../../constants";
import { useState } from "react";

const questionnaires = constants.newBusinessQuestions;

const NewBusiness = () => {
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const [showInput, setShowInput] = useState(false);
  const [strategy1Checked, setStrategy1Checked] = useState(false);
  const [otherStrategyChecked, setOtherStrategyChecked] = useState(false);

  const handleStrategy1Change = () => {
    setStrategy1Checked(!strategy1Checked);
    setShowInput(!showInput);
  };

  const handleOtherStrategyChange = () => {
    setOtherStrategyChecked(!otherStrategyChecked);
    setShowInput(!showInput);
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

  const [productRows, setProductRows] = useState([
    { product: "", price: "", units: "" },
  ]);

  const addProductRow = () => {
    const newProductRow = { product: "", price: "", units: "" };
    setProductRows((prevProductRows) => [...prevProductRows, newProductRow]);
  };

  const deleteProductRow = (index) => {
    const updatedProductRows = [...productRows];
    updatedProductRows.splice(index, 1);
    setProductRows(updatedProductRows);
  };

  const [employeeRows, setEmployeeRows] = useState([
    { role: "", salary: "", month: "" },
  ]);

  const addEmployeeRow = () => {
    const newEmployeeRow = { role: "", salary: "", month: "" };
    setEmployeeRows((prevEmployeeRows) => [
      ...prevEmployeeRows,
      newEmployeeRow,
    ]);
  };

  const deleteEmployeeRow = (index) => {
    const updatedEmployeeRows = [...employeeRows];
    updatedEmployeeRows.splice(index, 1);
    setEmployeeRows(updatedEmployeeRows);
  };

  const [fundingSourceRows, setFundingSourceRows] = useState([
    { role: "", salary: "", month: "" },
  ]);

  const addFundingRow = () => {
    const newFundingSourceRow = { source: "", amount: "" };
    setFundingSourceRows((prevFundingSourceRows) => [
      ...prevFundingSourceRows,
      newFundingSourceRow,
    ]);
  };

  const deleteFundingSourceRow = (index) => {
    const updatedEmployeeRows = [...fundingSourceRows];
    updatedEmployeeRows.splice(index, 1);
    setFundingSourceRows(updatedEmployeeRows);
  };

  const [purchaseRows, setPurchaseRows] = useState([
    { purchase: "", amount: "", month: "", lifespan: "" },
  ]);

  const addPurchaseRow = () => {
    const newPurchaseRow = {
      purchase: "",
      amount: "",
      month: "",
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
              </h2>

              {/* uploads and inputs */}
              {questionnaire.type !== null && (
                <input
                  type={questionnaire.type}
                  required={questionnaire.required}
                  placeholder={questionnaire.placeholder}
                />
              )}

              {questionnaire.select && (
                <select name="growth_rate" id="growth_rate">
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
                      />
                    )}
                  </div>
                  <div className="flex items-center gap-1">
                    <input
                      type="checkbox"
                      id="strategy2"
                      name="strategy2"
                      value="New branch"
                    />
                    <label htmlFor="strategy2">New branch</label>
                  </div>
                  <div className="flex items-center gap-1">
                    <input
                      type="checkbox"
                      id="strategy3"
                      name="strategy3"
                      value="Add a salesperson"
                    />
                    <label htmlFor="strategy3">Add a salesperson</label>
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
                        <th className="border border-black px-3 py-1">
                          Number of units to sell
                        </th>
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
                          <td className="p-0 border border-black">
                            <input
                              type="number"
                              placeholder="100,000"
                              className="w-full h-full border-0"
                              value={productRow.units}
                              onChange={(e) => {
                                const updatedProductRows = [...productRows];
                                updatedProductRows[index].units =
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
                <div className=" overflow-y-scroll max-h-60">
                  <table className="self-start w-3/5 text-left">
                    <thead>
                      <tr className="bg-[#b395a5] text-white">
                        <th className="border border-black px-3 py-1">Role</th>
                        <th className="border border-black px-3 py-1">
                          Salary
                        </th>
                        <th className="border border-black px-3 py-1">Month</th>
                        <th className="border border-black px-3 py-1">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {employeeRows.map((employeeRow, index) => (
                        <tr key={index}>
                          <td className="p-0 border border-black">
                            <input
                              className="w-full h-full border-0"
                              type="text"
                              placeholder="Executive Assistant"
                              value={employeeRow.role}
                              onChange={(e) => {
                                const updatedEmployeeRows = [...employeeRows];
                                updatedEmployeeRows[index].role =
                                  e.target.value;
                                setEmployeeRows(updatedEmployeeRows);
                              }}
                            />
                          </td>
                          <td className="p-0 border border-black">
                            <input
                              type="number"
                              placeholder="35,000"
                              className="w-full h-full border-0"
                              value={employeeRow.salary}
                              onChange={(e) => {
                                const updatedEmployeeRows = [...employeeRows];
                                updatedEmployeeRows[index].salary =
                                  e.target.value;
                                setEmployeeRows(updatedEmployeeRows);
                              }}
                            />
                          </td>
                          <td className="p-0 border border-black">
                            <input
                              className="w-full h-full border-0"
                              type="text"
                              placeholder="October"
                              value={employeeRow.month}
                              onChange={(e) => {
                                const updatedEmployeeRows = [...employeeRows];
                                updatedEmployeeRows[index].month =
                                  e.target.value;
                                setEmployeeRows(updatedEmployeeRows);
                              }}
                            />
                          </td>
                          <td className="p-0 border border-black bg-black text-white">
                            <button
                              className="w-full h-full border-0 text-center "
                              onClick={(e) => {
                                e.preventDefault();
                                deleteEmployeeRow(index);
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
                      addEmployeeRow();
                    }}
                    className="rounded-full mt-8 bg-gradient-to-r from-[#EDC6D7] via-[#CDB6D6] to-[#B0A7D4] px-4 py-1.5"
                  >
                    Add Row
                  </button>
                </div>
              )}

              {questionnaire.fundingSource && (
                <div className=" overflow-y-scroll max-h-60">
                  <table className="self-start w-3/5 text-left">
                    <thead>
                      <tr className="bg-[#b395a5] text-white">
                        <th className="border border-black px-3 py-1">
                          Source
                        </th>
                        <th className="border border-black px-3 py-1">
                          Amount
                        </th>
                        <th className="border border-black px-3 py-1">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {fundingSourceRows.map((fundingSourceRow, index) => (
                        <tr key={index}>
                          <td className="p-0 border border-black">
                            <select
                              className="w-full h-full border-0"
                              value={fundingSourceRow.role}
                              onChange={(e) => {
                                const updatedFundingSourceRows = [
                                  ...fundingSourceRows,
                                ];
                                updatedFundingSourceRows[index] = {
                                  ...updatedFundingSourceRows[index],
                                  role: e.target.value,
                                };
                                setFundingSourceRows(updatedFundingSourceRows);
                              }}
                            >
                              <option value="">Select a funding source</option>
                              <option value="Own money">Own money</option>
                              <option value="Family and friends">
                                Family and friends
                              </option>
                              <option value="Angel investors">
                                Angel investors
                              </option>
                              <option value="Lenders">Lenders</option>
                              <option value="VCs">VCs</option>
                            </select>
                          </td>
                          <td className="p-0 border border-black">
                            <input
                              type="number"
                              placeholder="35,000"
                              className="w-full h-full border-0"
                              value={fundingSourceRow.salary}
                              onChange={(e) => {
                                const updatedFundingSourceRows = [
                                  ...fundingSourceRows,
                                ];
                                updatedFundingSourceRows[index] = {
                                  ...updatedFundingSourceRows[index],
                                  salary: e.target.value,
                                };
                                setFundingSourceRows(updatedFundingSourceRows);
                              }}
                            />
                          </td>
                          <td className="p-0 border border-black bg-black text-white">
                            <button
                              className="w-full h-full border-0 text-center"
                              onClick={() => deleteFundingSourceRow(index)}
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
                      addFundingRow();
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
                              className="w-full h-full border-0"
                              type="text"
                              placeholder="October"
                              value={purchaseRow.month}
                              onChange={(e) => {
                                const updatedPurchaseRows = [...purchaseRows];
                                updatedPurchaseRows[index].month =
                                  e.target.value;
                                setPurchaseRows(updatedPurchaseRows);
                              }}
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
                  <Link
                    to={"/cashflow-overview/1"}
                    className="w-fit px-4 py-1.5 flex items-center
                   justify-center bg-gradient-to-r from-[#EDC6D7] via-[#CDB6D6] to-[#B0A7D4] rounded ml-auto uppercase"
                  >
                    submit
                  </Link>
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

export default NewBusiness;
