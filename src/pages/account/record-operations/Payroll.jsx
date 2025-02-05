import React, { useState } from "react";
import constants from "../../../constants";
import {
  ArrowLeftOutlined,
  ArrowRightOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const questionnaires = constants.payrollQuestions;

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

function Payroll() {
  const navigate = useNavigate();
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const [cashOnHand, setCashOnHand] = useState("");
  const [emlployeeRows, setEmployeeRows] = useState([
    { name: "", role: "", salary: "" },
  ]);

  const addEmployeeRow = () => {
    const newEmployeeRow = {
      name: "",
      role: "",
      salary: "",
    };
    setEmployeeRows((prevEmployeeRows) => [
      ...prevEmployeeRows,
      newEmployeeRow,
    ]);
  };

  const deleteEmployeeRow = (index) => {
    const updatedEmployeeRows = [...emlployeeRows];
    updatedEmployeeRows.splice(index, 1);
    setEmployeeRows(updatedEmployeeRows);
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

  const handleCashOnHandChange = (e) => {
    setCashOnHand(e.target.value);
  };

  const postData = async (e) => {
    e.preventDefault();

    formData.append("cash_on_hand", cashOnHand);

    try {
      const response = await axios.post(
        `${API_BASE_URL}/update_balance_sheet`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
            "Content-Type": "application/json",
          },
        }
      );
      // console.log("Form submitted successfully!", response.data);
      alert("Form submitted successfully!");
      navigate("/balance-sheet");
    } catch (error) {
      console.error("Error submiting form:", error);

      if (error.response && error.response.status === 500) {
        // Internal Server Error occurred
        alert("Internal Server Error. Please try again later.");
        // navigate("/financial-plans/create-a-budget");
      } else {
        // Handle other errors
        alert("An error occurred. Please check your inputs and try again.");
        // navigate("/financial-plans/create-a-budget");
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
              </h2>

              {questionnaire.employeeList1 && (
                <input
                  type="file"
                  name="financial_statement"
                  accept=".xlsx, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                />
              )}
              {questionnaire.employeeList2 && (
                <div className=" overflow-y-scroll max-h-60">
                  <table className="self-start w-3/5 text-left">
                    <thead>
                      <tr className="bg-[#b395a5] text-white">
                        <th className="border border-black px-3 py-1">
                          Name
                        </th>
                        <th className="border border-black px-3 py-1">
                          Role
                        </th>
                        <th className="border border-black px-3 py-1">Gross Salary</th>
                        <th className="border border-black px-3 py-1 text-center">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {emlployeeRows.map((employeeRow, index) => (
                        <tr key={index}>
                          <td className="p-0 border border-black">
                            <input
                              className="w-full h-full border-0"
                              type="text"
                              placeholder="Connie Tucker"
                              value={employeeRow.name}
                              onChange={(e) => {
                                const updatedEmployeeRows = [...emlployeeRows];
                                updatedEmployeeRows[index].name =
                                  e.target.value;
                                setEmployeeRows(updatedEmployeeRows);
                              }}
                            />
                          </td>
                          <td className="p-0 border border-black">
                            <input
                              type="number"
                              placeholder="Accountant"
                              className="w-full h-full border-0"
                              value={employeeRow.role}
                              onChange={(e) => {
                                const updatedEmployeeRows = [...emlployeeRows];
                                updatedEmployeeRows[index].role =
                                  e.target.value;
                                setEmployeeRows(updatedEmployeeRows);
                              }}
                            />
                          </td>
                          <td className="p-0 border border-black">
                            <input
                              className="w-full h-full border-0"
                              type="number"
                              placeholder="692,585"
                              value={employeeRow.salary}
                              onChange={(e) => {
                                const updatedEmployeeRows = [...emlployeeRows];
                                updatedEmployeeRows[index].salary =
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

              {questionnaire.payday && (
                <select
                  name="payday"
                  id="payday"
                  //   value={selectedGrowthRate}
                  //   onChange={handleGrowthRateChange}
                >
                  <option value="Every 15th and 30th of the month">
                    Every 15th and 30th of the month
                  </option>
                  <option value="Every 5th and 20th of the month">
                    Every 5th and 20th of the month
                  </option>
                  <option value="Every end of the month">
                    Every end of the month
                  </option>
                  <option value="Others">Others</option>
                </select>
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
                    onClick={postData}
                    className="w-fit px-4 py-1.5 flex items-center
                   justify-center bg-gradient-to-r from-[#EDC6D7] via-[#CDB6D6] to-[#B0A7D4] rounded ml-auto uppercase"
                  >
                    submit
                  </button>
                )}
              </div>
            </form>
          )
      )}
      <Link
        to={"/record-operations"}
        className="absolute top-6 right-6 hover:opacity-90 ease-in transform transition duration-150"
      >
        <CloseOutlined style={{ fontSize: "2rem" }} />
      </Link>
    </div>
  );
}

export default Payroll;
