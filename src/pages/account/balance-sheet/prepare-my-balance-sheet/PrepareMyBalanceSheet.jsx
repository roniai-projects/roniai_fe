import React, { useState, useEffect } from "react";
import constants from "../../../../constants";
import {
  ArrowLeftOutlined,
  ArrowRightOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const questionnaires = constants.balanceSheetQuestions;

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

function PrepareMyBalanceSheet() {
  const navigate = useNavigate();
  const [companies, setCompanies] = useState([]);
  const [company, setCompany] = useState("");
  const token = localStorage.getItem("jwtToken");
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const [cashOnHand, setCashOnHand] = useState("");
  const [date, setDate] = useState("");
  const [cibRows, setCibRows] = useState([{ nameOfBank: "", amount: "" }]);
  const [clientRows, setClientRows] = useState([{ name: "", amount: "" }]);
  const [inventoryRows, setInventoryRows] = useState([
    { productName: "", numberOfItems: "", costPerItem: "" },
  ]);
  const [cashAdvancesRows, setCashAdvancesRows] = useState([
    { typeOfDeposit: "", paidToWhom: "", amount: "" },
  ]);
  const [loansRows, setLoansRows] = useState([
    { typeOfLoan: "", loanedTo: "", amount: "" },
  ]);
  const [buildingsRows, setBuildingsRows] = useState([
    { type: "", cost: "", numberOfYears: "" },
  ]);
  const [suppliersRows, setSuppliersRows] = useState([
    { nameOfSupplier: "", amount: "" },
  ]);
  const [otherLoansRows, setOtherLoansRows] = useState([
    { typeOfLoan: "", lender: "", amount: "" },
  ]);
  const [investmentsRows, setInvestmentsRows] = useState([
    { name: "", typeOfInvestment: "", amount: "" },
  ]);

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

  const handleCompanyChange = (e) => {
    const selectedCompany = e.target.value;
    setCompany(selectedCompany);
  };

  const handleDateChange = (e) => {
    setDate(e.target.value);
  };

  const addCibRow = () => {
    const newCibRows = { nameOfBank: "", amount: "" };
    setCibRows((prevCibRows) => [...prevCibRows, newCibRows]);
  };

  const deleteCibRow = (index) => {
    const updatedCibRows = [...cibRows];
    updatedCibRows.splice(index, 1);
    setCibRows(updatedCibRows);
  };

  const addClientRow = () => {
    const newClientRows = { name: "", amount: "" };
    setClientRows((prevClientRows) => [...prevClientRows, newClientRows]);
  };

  const deleteClientRow = (index) => {
    const updatedClientRows = [...clientRows];
    updatedClientRows.splice(index, 1);
    setClientRows(updatedClientRows);
  };

  const addInventoryRow = () => {
    const newInventoryRows = {
      productName: "",
      numberOfItems: "",
      costPerItem: "",
    };
    setInventoryRows((prevInventoryRows) => [
      ...prevInventoryRows,
      newInventoryRows,
    ]);
  };

  const deleteInventoryRow = (index) => {
    const updatedInventoryRows = [...inventoryRows];
    updatedInventoryRows.splice(index, 1);
    setInventoryRows(updatedInventoryRows);
  };

  const addCashAdvancesRow = () => {
    const newCashAdvancesRows = {
      typeOfDeposit: "",
      paidToWhom: "",
      amount: "",
    };
    setCashAdvancesRows((prevCashAdvancesRows) => [
      ...prevCashAdvancesRows,
      newCashAdvancesRows,
    ]);
  };

  const deleteCashAdvancesRow = (index) => {
    const updatedCashAdvancesRows = [...cashAdvancesRows];
    updatedCashAdvancesRows.splice(index, 1);
    setCashAdvancesRows(updatedCashAdvancesRows);
  };

  const addLoansRow = () => {
    const newLoansRows = {
      typeOfLoan: "",
      loanedTo: "",
      amount: "",
    };
    setLoansRows((prevLoansRows) => [...prevLoansRows, newLoansRows]);
  };

  const deleteLoansRow = (index) => {
    const updatedLoansRows = [...loansRows];
    updatedLoansRows.splice(index, 1);
    setLoansRows(updatedLoansRows);
  };

  const addBuildingsRow = () => {
    const newBuildingsRows = {
      type: "",
      cost: "",
      numberOfYears: "",
    };
    setBuildingsRows((prevBuildingsRows) => [
      ...prevBuildingsRows,
      newBuildingsRows,
    ]);
  };

  const deleteBuildingsRow = (index) => {
    const updatedBuildingsRows = [...buildingsRows];
    updatedBuildingsRows.splice(index, 1);
    setBuildingsRows(updatedBuildingsRows);
  };

  const addSuppliersRow = () => {
    const newSuppliersRows = { name: "", amount: "" };
    setSuppliersRows((prevSuppliersRows) => [
      ...prevSuppliersRows,
      newSuppliersRows,
    ]);
  };

  const deleteSuppliersRow = (index) => {
    const updatedSuppliersRows = [...suppliersRows];
    updatedSuppliersRows.splice(index, 1);
    setSuppliersRows(updatedSuppliersRows);
  };

  const addOtherLoansRow = () => {
    const newOtherLoansRows = {
      typeOfLoan: "",
      lender: "",
      amount: "",
    };
    setOtherLoansRows((prevOtherLoansRows) => [
      ...prevOtherLoansRows,
      newOtherLoansRows,
    ]);
  };

  const deleteOtherLoansRow = (index) => {
    const updatedOtherLoansRows = [...otherLoansRows];
    updatedOtherLoansRows.splice(index, 1);
    setOtherLoansRows(updatedOtherLoansRows);
  };

  const addInvestmentsRow = () => {
    const newInvestmentsRows = {
      name: "",
      typeOfInvestment: "",
      amount: "",
    };
    setInvestmentsRows((prevInvestmentsRows) => [
      ...prevInvestmentsRows,
      newInvestmentsRows,
    ]);
  };

  const deleteInvestmentsRow = (index) => {
    const updatedInvestmentsRows = [...investmentsRows];
    updatedInvestmentsRows.splice(index, 1);
    setInvestmentsRows(updatedInvestmentsRows);
  };

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const response = await axios.get(
          `${API_BASE_URL}/company`,
          {
            headers: {
              Accept: "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setCompanies(response.data);
      } catch (error) {
        console.error("Error fetching companies:", error);
      }
    };

    fetchCompanies();
  }, [token]);

  const postData = async (e) => {
    e.preventDefault();

    const cibRowsJSON = JSON.stringify(cibRows);
    const clientRowsJSON = JSON.stringify(clientRows);
    const inventoryRowsJSON = JSON.stringify(inventoryRows);
    const cashAdvancesRowsJSON = JSON.stringify(cashAdvancesRows);
    const loansRowsJSON = JSON.stringify(loansRows);
    const buildingsRowsJSON = JSON.stringify(buildingsRows);
    const supplierRowsJSON = JSON.stringify(suppliersRows);
    const otherLoansJSON = JSON.stringify(otherLoansRows);
    const investmentsRowsJSON = JSON.stringify(investmentsRows);

    const formData = new FormData();
    formData.append("building_rows", buildingsRowsJSON);
    formData.append("cash_advance_rows", cashAdvancesRowsJSON);
    formData.append("cib_rows", cibRowsJSON);
    formData.append("client_rows", clientRowsJSON);
    formData.append("inventory_rows", inventoryRowsJSON);
    formData.append("investment_rows", investmentsRowsJSON);
    formData.append("loan_rows", loansRowsJSON);
    formData.append("other_loan_rows", otherLoansJSON);
    formData.append("supplier_rows", supplierRowsJSON);

    formData.append("cash_on_hand", cashOnHand);
    formData.append("date", date);
    formData.append("company_id", company);

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

              {questionnaire.company && (
              <select id="companySelect" name="companySelect" onChange={handleCompanyChange} value={company}>
              <option value="">Select a company</option>
              {companies.map((company) => (
                <option key={company.company_id} value={company.company_id}>
                  {company.company_name}
                </option>
              ))}
            </select>
              )}

              {questionnaire.date && (
                <input
                  type="date"
                  name="date"
                  id="date"
                  value={date}
                  onChange={handleDateChange}
                />
              )}

              {questionnaire.cashOnHand && (
                <input
                  type="number"
                  placeholder="1,000,000"
                  value={cashOnHand}
                  onChange={handleCashOnHandChange}
                />
              )}

              {questionnaire.cashInBank && (
                <div className=" overflow-y-scroll max-h-60">
                  <table className="self-start w-3/5 text-left">
                    <thead>
                      <tr className="bg-[#b395a5] text-white">
                        <th className="border border-black px-3 py-1">
                          Name of Bank
                        </th>
                        <th className="border border-black px-3 py-1">
                          Amount
                        </th>
                        <th className="border border-black px-3 py-1 text-center">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {cibRows.map((cibRow, index) => (
                        <tr key={index}>
                          <td className="p-0 border border-black">
                            <input
                              className="w-full h-full border-0"
                              type="text"
                              placeholder="BPI"
                              value={cibRow.nameOfBank}
                              onChange={(e) => {
                                const updatedCibRows = [...cibRows];
                                updatedCibRows[index].nameOfBank =
                                  e.target.value;
                                setCibRows(updatedCibRows);
                              }}
                            />
                          </td>
                          <td className="p-0 border border-black">
                            <input
                              type="number"
                              placeholder="20,000"
                              className="w-full h-full border-0"
                              value={cibRow.amount}
                              onChange={(e) => {
                                const updatedCibRows = [...cibRows];
                                updatedCibRows[index].amount = e.target.value;
                                setCibRows(updatedCibRows);
                              }}
                            />
                          </td>
                          <td className="p-0 border border-black bg-black text-white">
                            <button
                              className="w-full h-full border-0 text-center"
                              onClick={(e) => {
                                e.preventDefault();
                                deleteCibRow(index);
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
                      addCibRow();
                    }}
                    className="rounded-full mt-8 bg-gradient-to-r from-[#EDC6D7] via-[#CDB6D6] to-[#B0A7D4] px-4 py-1.5"
                  >
                    Add Row
                  </button>
                </div>
              )}

              {questionnaire.clientsToPay && (
                <div className=" overflow-y-scroll max-h-60">
                  <table className="self-start w-3/5 text-left">
                    <thead>
                      <tr className="bg-[#b395a5] text-white">
                        <th className="border border-black px-3 py-1">
                          Client Name
                        </th>
                        <th className="border border-black px-3 py-1">
                          Amount
                        </th>
                        <th className="border border-black px-3 py-1 text-center">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {clientRows.map((clientRow, index) => (
                        <tr key={index}>
                          <td className="p-0 border border-black">
                            <input
                              className="w-full h-full border-0"
                              type="text"
                              placeholder="Henry Sy"
                              value={clientRow.name}
                              onChange={(e) => {
                                const updatedClientRows = [...clientRows];
                                updatedClientRows[index].name = e.target.value;
                                setClientRows(updatedClientRows);
                              }}
                            />
                          </td>
                          <td className="p-0 border border-black">
                            <input
                              type="number"
                              placeholder="20,000"
                              className="w-full h-full border-0"
                              value={clientRow.amount}
                              onChange={(e) => {
                                const updatedClientRows = [...clientRows];
                                updatedClientRows[index].amount =
                                  e.target.value;
                                setClientRows(updatedClientRows);
                              }}
                            />
                          </td>
                          <td className="p-0 border border-black bg-black text-white">
                            <button
                              className="w-full h-full border-0 text-center"
                              onClick={(e) => {
                                e.preventDefault();
                                deleteClientRow(index);
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
                      addClientRow();
                    }}
                    className="rounded-full mt-8 bg-gradient-to-r from-[#EDC6D7] via-[#CDB6D6] to-[#B0A7D4] px-4 py-1.5"
                  >
                    Add Row
                  </button>
                </div>
              )}

              {questionnaire.inventory && (
                <div className=" overflow-y-scroll max-h-60">
                  <table className="self-start w-3/5 text-left">
                    <thead>
                      <tr className="bg-[#b395a5] text-white">
                        <th className="border border-black px-3 py-1">
                          Product Name
                        </th>
                        <th className="border border-black px-3 py-1">
                          No. of Items
                        </th>
                        <th className="border border-black px-3 py-1">
                          Cost per item
                        </th>
                        <th className="border border-black px-3 py-1 text-center">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {inventoryRows.map((inventoryRow, index) => (
                        <tr key={index}>
                          <td className="p-0 border border-black">
                            <input
                              className="w-full h-full border-0"
                              type="text"
                              placeholder="Feather"
                              value={inventoryRow.productName}
                              onChange={(e) => {
                                const updatedInventoryRows = [...inventoryRows];
                                updatedInventoryRows[index].productName =
                                  e.target.value;
                                setInventoryRows(updatedInventoryRows);
                              }}
                            />
                          </td>
                          <td className="p-0 border border-black">
                            <input
                              type="number"
                              placeholder="100"
                              className="w-full h-full border-0"
                              value={inventoryRow.numberOfItems}
                              onChange={(e) => {
                                const updatedInventoryRows = [...inventoryRows];
                                updatedInventoryRows[index].numberOfItems =
                                  e.target.value;
                                setInventoryRows(updatedInventoryRows);
                              }}
                            />
                          </td>
                          <td className="p-0 border border-black">
                            <input
                              type="number"
                              placeholder="20"
                              className="w-full h-full border-0"
                              value={inventoryRow.costPerItem}
                              onChange={(e) => {
                                const updatedInventoryRows = [...inventoryRows];
                                updatedInventoryRows[index].costPerItem =
                                  e.target.value;
                                setInventoryRows(updatedInventoryRows);
                              }}
                            />
                          </td>
                          <td className="p-0 border border-black bg-black text-white">
                            <button
                              className="w-full h-full border-0 text-center"
                              onClick={(e) => {
                                e.preventDefault();
                                deleteInventoryRow(index);
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
                      addInventoryRow();
                    }}
                    className="rounded-full mt-8 bg-gradient-to-r from-[#EDC6D7] via-[#CDB6D6] to-[#B0A7D4] px-4 py-1.5"
                  >
                    Add Row
                  </button>
                </div>
              )}

              {questionnaire.cashAdvances && (
                <div className=" overflow-y-scroll max-h-60">
                  <table className="self-start w-3/5 text-left">
                    <thead>
                      <tr className="bg-[#b395a5] text-white">
                        <th className="border border-black px-3 py-1">
                          Type of Deposit
                        </th>
                        <th className="border border-black px-3 py-1">
                          Paid to whom
                        </th>
                        <th className="border border-black px-3 py-1">
                          Amount
                        </th>
                        <th className="border border-black px-3 py-1 text-center">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {cashAdvancesRows.map((cashAdvancesRow, index) => (
                        <tr key={index}>
                          <td className="p-0 border border-black">
                            <input
                              className="w-full h-full border-0"
                              type="text"
                              placeholder="Cash"
                              value={cashAdvancesRow.typeOfDeposit}
                              onChange={(e) => {
                                const updatedCashAdvancesRows = [
                                  ...cashAdvancesRows,
                                ];
                                updatedCashAdvancesRows[index].typeOfDeposit =
                                  e.target.value;
                                setCashAdvancesRows(updatedCashAdvancesRows);
                              }}
                            />
                          </td>
                          <td className="p-0 border border-black">
                            <input
                              type="text"
                              placeholder="Henry Sy"
                              className="w-full h-full border-0"
                              value={cashAdvancesRow.paidToWhom}
                              onChange={(e) => {
                                const updatedCashAdvancesRows = [
                                  ...cashAdvancesRows,
                                ];
                                updatedCashAdvancesRows[index].paidToWhom =
                                  e.target.value;
                                setCashAdvancesRows(updatedCashAdvancesRows);
                              }}
                            />
                          </td>
                          <td className="p-0 border border-black">
                            <input
                              type="number"
                              placeholder="1,000,000"
                              className="w-full h-full border-0"
                              value={cashAdvancesRow.amount}
                              onChange={(e) => {
                                const updatedCashAdvancesRows = [
                                  ...cashAdvancesRows,
                                ];
                                updatedCashAdvancesRows[index].amount =
                                  e.target.value;
                                setCashAdvancesRows(updatedCashAdvancesRows);
                              }}
                            />
                          </td>
                          <td className="p-0 border border-black bg-black text-white">
                            <button
                              className="w-full h-full border-0 text-center"
                              onClick={(e) => {
                                e.preventDefault();
                                deleteCashAdvancesRow(index);
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
                      addCashAdvancesRow();
                    }}
                    className="rounded-full mt-8 bg-gradient-to-r from-[#EDC6D7] via-[#CDB6D6] to-[#B0A7D4] px-4 py-1.5"
                  >
                    Add Row
                  </button>
                </div>
              )}

              {questionnaire.loans && (
                <div className=" overflow-y-scroll max-h-60">
                  <table className="self-start w-3/5 text-left">
                    <thead>
                      <tr className="bg-[#b395a5] text-white">
                        <th className="border border-black px-3 py-1">
                          Type of Deposit
                        </th>
                        <th className="border border-black px-3 py-1">
                          Paid to whom
                        </th>
                        <th className="border border-black px-3 py-1">
                          Amount
                        </th>
                        <th className="border border-black px-3 py-1 text-center">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {loansRows.map((loansRow, index) => (
                        <tr key={index}>
                          <td className="p-0 border border-black">
                            <input
                              className="w-full h-full border-0"
                              type="text"
                              placeholder="Personal loan"
                              value={loansRow.typeOfLoan}
                              onChange={(e) => {
                                const updatedLoansRows = [...loansRows];
                                updatedLoansRows[index].typeOfLoan =
                                  e.target.value;
                                setLoansRows(updatedLoansRows);
                              }}
                            />
                          </td>
                          <td className="p-0 border border-black">
                            <input
                              type="text"
                              placeholder="William Ang"
                              className="w-full h-full border-0"
                              value={loansRow.loanedTo}
                              onChange={(e) => {
                                const updatedLoansRows = [...loansRows];
                                updatedLoansRows[index].loanedTo =
                                  e.target.value;
                                setLoansRows(updatedLoansRows);
                              }}
                            />
                          </td>
                          <td className="p-0 border border-black">
                            <input
                              type="number"
                              placeholder="1,000,000"
                              className="w-full h-full border-0"
                              value={loansRow.amount}
                              onChange={(e) => {
                                const updatedLoansRows = [...loansRows];
                                updatedLoansRows[index].amount = e.target.value;
                                setLoansRows(updatedLoansRows);
                              }}
                            />
                          </td>
                          <td className="p-0 border border-black bg-black text-white">
                            <button
                              className="w-full h-full border-0 text-center"
                              onClick={(e) => {
                                e.preventDefault();
                                deleteLoansRow(index);
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
                      addLoansRow();
                    }}
                    className="rounded-full mt-8 bg-gradient-to-r from-[#EDC6D7] via-[#CDB6D6] to-[#B0A7D4] px-4 py-1.5"
                  >
                    Add Row
                  </button>
                </div>
              )}

              {questionnaire.otherAssets && (
                <div className=" overflow-y-scroll max-h-60">
                  <table className="self-start w-3/5 text-left">
                    <thead>
                      <tr className="bg-[#b395a5] text-white">
                        <th className="border border-black px-3 py-1">Type</th>
                        <th className="border border-black px-3 py-1">
                          Description
                        </th>
                        <th className="border border-black px-3 py-1">
                          Amount
                        </th>
                        <th className="border border-black px-3 py-1 text-center">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {loansRows.map((loansRow, index) => (
                        <tr key={index}>
                          <td className="p-0 border border-black">
                            <input
                              className="w-full h-full border-0"
                              type="text"
                              placeholder="Marketable Securities"
                              // value={loansRow.typeOfLoan}
                              // onChange={(e) => {
                              //   const updatedLoansRows = [...loansRows];
                              //   updatedLoansRows[index].typeOfLoan =
                              //     e.target.value;
                              //   setLoansRows(updatedLoansRows);
                              // }}
                            />
                          </td>
                          <td className="p-0 border border-black">
                            <input
                              type="text"
                              placeholder="Stocks"
                              className="w-full h-full border-0"
                              // value={loansRow.loanedTo}
                              // onChange={(e) => {
                              //   const updatedLoansRows = [...loansRows];
                              //   updatedLoansRows[index].loanedTo =
                              //     e.target.value;
                              //   setLoansRows(updatedLoansRows);
                              // }}
                            />
                          </td>
                          <td className="p-0 border border-black">
                            <input
                              type="number"
                              placeholder="1,000,000"
                              className="w-full h-full border-0"
                              // value={loansRow.amount}
                              // onChange={(e) => {
                              //   const updatedLoansRows = [...loansRows];
                              //   updatedLoansRows[index].amount = e.target.value;
                              //   setLoansRows(updatedLoansRows);
                              // }}
                            />
                          </td>
                          <td className="p-0 border border-black bg-black text-white">
                            <button
                              className="w-full h-full border-0 text-center"
                              onClick={(e) => {
                                e.preventDefault();
                                deleteLoansRow(index);
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
                      addLoansRow();
                    }}
                    className="rounded-full mt-8 bg-gradient-to-r from-[#EDC6D7] via-[#CDB6D6] to-[#B0A7D4] px-4 py-1.5"
                  >
                    Add Row
                  </button>
                </div>
              )}

              {questionnaire.buildings && (
                <div className=" overflow-y-scroll max-h-60">
                  <table className="self-start w-3/5 text-left">
                    <thead>
                      <tr className="bg-[#b395a5] text-white">
                        <th className="border border-black px-3 py-1">Type</th>
                        <th className="border border-black px-3 py-1">Cost</th>
                        <th className="border border-black px-3 py-1">
                          No. of years
                        </th>
                        <th className="border border-black px-3 py-1 text-center">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {buildingsRows.map((buildingsRow, index) => (
                        <tr key={index}>
                          <td className="p-0 border border-black">
                            <input
                              className="w-full h-full border-0"
                              type="text"
                              placeholder="Equipment"
                              value={buildingsRow.type}
                              onChange={(e) => {
                                const updatedBuildingsRows = [...buildingsRows];
                                updatedBuildingsRows[index].type =
                                  e.target.value;
                                setBuildingsRows(updatedBuildingsRows);
                              }}
                            />
                          </td>
                          <td className="p-0 border border-black">
                            <input
                              type="number"
                              placeholder="65,000"
                              className="w-full h-full border-0"
                              value={buildingsRow.cost}
                              onChange={(e) => {
                                const updatedBuildingsRows = [...buildingsRows];
                                updatedBuildingsRows[index].cost =
                                  e.target.value;
                                setBuildingsRows(updatedBuildingsRows);
                              }}
                            />
                          </td>
                          <td className="p-0 border border-black">
                            <input
                              type="number"
                              placeholder="10"
                              className="w-full h-full border-0"
                              value={buildingsRow.numberOfYears}
                              onChange={(e) => {
                                const updatedBuildingsRows = [...buildingsRows];
                                updatedBuildingsRows[index].numberOfYears =
                                  e.target.value;
                                setBuildingsRows(updatedBuildingsRows);
                              }}
                            />
                          </td>
                          <td className="p-0 border border-black bg-black text-white">
                            <button
                              className="w-full h-full border-0 text-center"
                              onClick={(e) => {
                                e.preventDefault();
                                deleteBuildingsRow(index);
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
                      addBuildingsRow();
                    }}
                    className="rounded-full mt-8 bg-gradient-to-r from-[#EDC6D7] via-[#CDB6D6] to-[#B0A7D4] px-4 py-1.5"
                  >
                    Add Row
                  </button>
                </div>
              )}

              {questionnaire.suppliers && (
                <div className=" overflow-y-scroll max-h-60">
                  <table className="self-start w-3/5 text-left">
                    <thead>
                      <tr className="bg-[#b395a5] text-white">
                        <th className="border border-black px-3 py-1">
                          Name of Supllier
                        </th>
                        <th className="border border-black px-3 py-1">
                          Amount
                        </th>
                        <th className="border border-black px-3 py-1 text-center">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {suppliersRows.map((supplierRow, index) => (
                        <tr key={index}>
                          <td className="p-0 border border-black">
                            <input
                              className="w-full h-full border-0"
                              type="text"
                              placeholder="K.K. Trading"
                              value={supplierRow.nameOfSupplier}
                              onChange={(e) => {
                                const updatedSuppliersRows = [...suppliersRows];
                                updatedSuppliersRows[index].nameOfSupplier =
                                  e.target.value;
                                setSuppliersRows(updatedSuppliersRows);
                              }}
                            />
                          </td>
                          <td className="p-0 border border-black">
                            <input
                              type="number"
                              placeholder="20,000"
                              className="w-full h-full border-0"
                              value={supplierRow.amount}
                              onChange={(e) => {
                                const updatedSuppliersRows = [...suppliersRows];
                                updatedSuppliersRows[index].amount =
                                  e.target.value;
                                setSuppliersRows(updatedSuppliersRows);
                              }}
                            />
                          </td>
                          <td className="p-0 border border-black bg-black text-white">
                            <button
                              className="w-full h-full border-0 text-center"
                              onClick={(e) => {
                                e.preventDefault();
                                deleteSuppliersRow(index);
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
                      addSuppliersRow();
                    }}
                    className="rounded-full mt-8 bg-gradient-to-r from-[#EDC6D7] via-[#CDB6D6] to-[#B0A7D4] px-4 py-1.5"
                  >
                    Add Row
                  </button>
                </div>
              )}

              {questionnaire.otherLoans && (
                <div className=" overflow-y-scroll max-h-60">
                  <table className="self-start w-3/5 text-left">
                    <thead>
                      <tr className="bg-[#b395a5] text-white">
                        <th className="border border-black px-3 py-1">
                          Type of Deposit
                        </th>
                        <th className="border border-black px-3 py-1">
                          Paid to whom
                        </th>
                        <th className="border border-black px-3 py-1">
                          Amount
                        </th>
                        <th className="border border-black px-3 py-1 text-center">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {otherLoansRows.map((otherLoansRow, index) => (
                        <tr key={index}>
                          <td className="p-0 border border-black">
                            <input
                              className="w-full h-full border-0"
                              type="text"
                              placeholder="Personal loan"
                              value={otherLoansRow.typeOfLoan}
                              onChange={(e) => {
                                const updatedOtherLoansRows = [
                                  ...otherLoansRows,
                                ];
                                updatedOtherLoansRows[index].typeOfLoan =
                                  e.target.value;
                                setOtherLoansRows(updatedOtherLoansRows);
                              }}
                            />
                          </td>
                          <td className="p-0 border border-black">
                            <input
                              type="text"
                              placeholder="William Ang"
                              className="w-full h-full border-0"
                              value={otherLoansRow.lender}
                              onChange={(e) => {
                                const updatedOtherLoansRows = [
                                  ...otherLoansRows,
                                ];
                                updatedOtherLoansRows[index].lender =
                                  e.target.value;
                                setOtherLoansRows(updatedOtherLoansRows);
                              }}
                            />
                          </td>
                          <td className="p-0 border border-black">
                            <input
                              type="number"
                              placeholder="1,000,000"
                              className="w-full h-full border-0"
                              value={otherLoansRow.amount}
                              onChange={(e) => {
                                const updatedOtherLoansRows = [
                                  ...otherLoansRows,
                                ];
                                updatedOtherLoansRows[index].amount =
                                  e.target.value;
                                setOtherLoansRows(updatedOtherLoansRows);
                              }}
                            />
                          </td>
                          <td className="p-0 border border-black bg-black text-white">
                            <button
                              className="w-full h-full border-0 text-center"
                              onClick={(e) => {
                                e.preventDefault();
                                deleteOtherLoansRow(index);
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
                      addOtherLoansRow();
                    }}
                    className="rounded-full mt-8 bg-gradient-to-r from-[#EDC6D7] via-[#CDB6D6] to-[#B0A7D4] px-4 py-1.5"
                  >
                    Add Row
                  </button>
                </div>
              )}

              {questionnaire.initialInvestment && (
                <div className=" overflow-y-scroll max-h-60">
                  <table className="self-start w-3/5 text-left">
                    <thead>
                      <tr className="bg-[#b395a5] text-white">
                        <th className="border border-black px-3 py-1">Name</th>
                        <th className="border border-black px-3 py-1">
                          Type of Investment
                        </th>
                        <th className="border border-black px-3 py-1">
                          Amount
                        </th>
                        <th className="border border-black px-3 py-1 text-center">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {investmentsRows.map((investmentsRow, index) => (
                        <tr key={index}>
                          <td className="p-0 border border-black">
                            <input
                              className="w-full h-full border-0"
                              type="text"
                              placeholder="Sheldon Cooper"
                              value={investmentsRow.name}
                              onChange={(e) => {
                                const updatedInvestmentsRows = [
                                  ...investmentsRows,
                                ];
                                updatedInvestmentsRows[index].name =
                                  e.target.value;
                                setInvestmentsRows(updatedInvestmentsRows);
                              }}
                            />
                          </td>
                          <td className="p-0 border border-black">
                            <input
                              type="text"
                              placeholder="Cash"
                              className="w-full h-full border-0"
                              value={investmentsRow.typeOfInvestment}
                              onChange={(e) => {
                                const updatedInvestmentsRows = [
                                  ...investmentsRows,
                                ];
                                updatedInvestmentsRows[index].typeOfInvestment =
                                  e.target.value;
                                setInvestmentsRows(updatedInvestmentsRows);
                              }}
                            />
                          </td>
                          <td className="p-0 border border-black">
                            <input
                              type="number"
                              placeholder="1,000,000"
                              className="w-full h-full border-0"
                              value={investmentsRow.amount}
                              onChange={(e) => {
                                const updatedInvestmentsRows = [
                                  ...investmentsRows,
                                ];
                                updatedInvestmentsRows[index].amount =
                                  e.target.value;
                                setInvestmentsRows(updatedInvestmentsRows);
                              }}
                            />
                          </td>
                          <td className="p-0 border border-black bg-black text-white">
                            <button
                              className="w-full h-full border-0 text-center"
                              onClick={(e) => {
                                e.preventDefault();
                                deleteInvestmentsRow(index);
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
                      addInvestmentsRow();
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
        to={"/balance-sheet"}
        className="absolute top-6 right-6 hover:opacity-90 ease-in transform transition duration-150"
      >
        <CloseOutlined style={{ fontSize: "2rem" }} />
      </Link>
    </div>
  );
}

export default PrepareMyBalanceSheet;
