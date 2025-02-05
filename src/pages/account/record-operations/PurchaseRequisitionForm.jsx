import React, { useState, useEffect } from "react";
import Sidebar from "../../../components/Sidebar";
import { Link } from "react-router-dom";

export default function PurchaseRequisitionForm() {
  const [currency, setCurrency] = useState("USD");

  const handleCurrencyChange = (selectedCurrency) => {
    setCurrency(selectedCurrency);
  };

  const [items, setItems] = useState([{ item: "", quantity: 0, rate: 0 }]);

  const handleAddItem = () => {
    setItems([...items, { item: "", quantity: 0, rate: 0 }]);
  };

  const handleDeleteItem = (indexToRemove) => {
    setItems((prevItems) =>
      prevItems.filter((item, index) => index !== indexToRemove)
    );
  };

  const handleInputChange = (index, field, value) => {
    const updatedItems = [...items];
    updatedItems[index][field] = value;
    setItems(updatedItems);
  };

  const [subTotal, setSubtotal] = useState(0);

  useEffect(() => {
    const subTotal = items.reduce(
      (acc, item) => acc + item.quantity * item.rate,
      0
    );
    setSubtotal(subTotal);
  }, [items]);

  const [discount, setDiscount] = useState(0);
  const [taxRate, setTaxRate] = useState(0);
  const [shippingFee, setShippingFee] = useState(0);

  const handleDiscountChange = (e) => {
    const discountInput = parseFloat(e.target.value) / 100;
    setDiscount(discountInput);
  };

  const handleTaxRateChange = (e) => {
    const taxRateInput = parseFloat(e.target.value) / 100;
    setTaxRate(taxRateInput);
  };

  const handleShippingFeeChange = (e) => {
    setShippingFee(e.target.value);
  };

  const [total, setTotal] = useState(0);

  const calculateTotal = (subTotal, discount, taxRate, shippingFee) => {
    const discountedAmount = subTotal * discount;
    console.log("discountedAmount", discountedAmount);

    const totalBeforeShipping =
      subTotal + subTotal * taxRate - discountedAmount;
    console.log("totalBeforeShipping", totalBeforeShipping);

    const total = totalBeforeShipping + parseFloat(shippingFee);
    console.log("total", total);

    return total;
  };

  useEffect(() => {
    const total = calculateTotal(subTotal, discount, taxRate, shippingFee);
    setTotal(total);
  }, [subTotal, discount, taxRate, shippingFee]);

  const [amountPaid, setAmountPaid] = useState(0);

  const handleAmountPaidChange = (e) => {
    setAmountPaid(e.target.value);
  };

  const [balanceDue, setBalanceDue] = useState(0);

  useEffect(() => {
    setBalanceDue(total - amountPaid);
  });

  return (
    <div className="flex flex-row bg-gray-50 h-screen">
      <Sidebar />
      <div className={layout}>
        <h3 className={title}>
          <Link
            to={"/record-operations"}
            className="text-gray-600 hover:text-black transform ease-in duration-150"
          >
            Record Operations
          </Link>
          {" >"} Purchase Requisition Form
        </h3>

        <div className="self-end gap-2 flex flex-row items-center text-sm">
          <label htmlFor="selectCurrency">Choose currency</label>
          <select
            id="selectCurrency"
            onChange={(e) => handleCurrencyChange(e.target.value)}
            className="border-gray-200"
          >
            <option value="USD">USD</option>
            <option value="PHP">PHP</option>
            <option value="GBP">GBP</option>
            <option value="MXN">MXN</option>
          </select>
        </div>

        <div className="rounded-xl bg-white p-4 text-center shadow text-sm flex flex-col items-center justify-center space-y-4">
          <div className="flex flex-row justify-between w-full">
            <div className="flex flex-col gap-4 w-1/2">
              <div className="flex items-center justify-center border px-8 py-12 h-28 w-36 cursor-pointer hover:shadow duration-150 ease-in">
                Add Your Logo
              </div>
              <div className="grid grid-cols-2 gap-4 mt-auto">
                <div className="flex flex-col gap-1 text-left">
                  <h2>Requisioned by</h2>
                  <input
                    type="text"
                    className="border border-gray-200 text-sm"
                  />
                </div>
                <div className="flex flex-col gap-1 text-left">
                  <h2>Department</h2>
                  <input
                    type="text"
                    className="border border-gray-200 text-sm"
                  />
                </div>
              </div>
              <div className="flex flex-col gap-1 text-left">
                <h2>Purpose of Purchase</h2>
                <textarea
                  name=""
                  id=""
                  cols="30"
                  rows="4"
                  className="border border-gray-200 text-sm"
                  placeholder="Add purpose of purchase here (required)"
                />
              </div>
            </div>

            <div className="flex flex-col gap-4 w-1/2">
              <h1 className="text-3xl font-semibold text-right">
                PURCHASE REQUISITION FORM
              </h1>
              <div className="self-end flex gap-1 flex-row items-center text-2xl">
                <span className=" font-bold">#</span> 1
              </div>
              <div className="grid grid-cols-1 gap-1 self-end mt-6">
                <div className="flex flex-row gap-3 items-center">
                  <h2 className="grow text-right">Date</h2>
                  <input
                    type="date"
                    className="text-sm border-gray-200 w-56 text-end"
                  />
                </div>
                <div className="flex flex-row gap-3 items-center">
                  <h2 className="grow text-right">Date Needed</h2>
                  <input
                    type="date"
                    className="text-sm border-gray-200 w-56 text-end"
                  />
                </div>
                <div className="flex flex-row gap-3 items-center">
                  <h2 className="grow text-right">Charge to</h2>
                  <input
                    type="text"
                    className="text-sm border-gray-200 w-56 text-end"
                  />
                </div>

                <div className="flex flex-row gap-3 items-center">
                  <h2 className="grow text-right">Ship via</h2>
                  <input
                    type="number"
                    className="text-sm border-gray-200 w-56 text-end"
                  />
                </div>

                <div className="flex flex-row gap-3 items-center">
                  <h2 className="grow text-right">Supplier code</h2>
                  <input
                    type="number"
                    className="text-sm border-gray-200 w-56 text-end"
                  />
                </div>

                <div className="flex flex-row gap-3 items-center">
                  <h2 className="grow text-right">Supplier in Mexico?</h2>
                  <select
                    name="supplier_in_mexico"
                    id="supplier_in_mexico"
                    className="text-sm border-gray-200 w-56 text-end"
                  >
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1 text-left">
              <h2>Vendor Name</h2>
              <input type="text" className="border border-gray-200 text-sm" />
            </div>
            <div className="flex flex-col gap-1 text-left">
              <h2>Vendor Address</h2>
              <input type="text" className="border border-gray-200 text-sm" />
            </div>
            <div className="flex flex-col gap-1 text-left">
              <h2>Point of Contact</h2>
              <input type="text" className="border border-gray-200 text-sm" />
            </div>
            <div className="flex flex-col gap-1 text-left">
              <h2>Vendor phone</h2>
              <input type="text" className="border border-gray-200 text-sm" />
            </div>
          </div>

          <table className="w-full">
            <thead className="bg-[#b395a5] text-white">
              <tr>
                <th className="px-4 py-2">Item</th>
                <th className="px-4 py-2">Description</th>
                <th className="px-4 py-2">Quantity</th>
                <th className="px-4 py-2">Unit Cost</th>
                <th className="px-4 py-2">Amount</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, index) => (
                <tr key={index}>
                  <td>
                    <input
                      type="text"
                      className="text-sm w-full border-gray-200"
                      value={item.item}
                      onChange={(e) =>
                        handleInputChange(index, "item", e.target.value)
                      }
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      className="text-sm w-full border-gray-200"
                      value={item.description}
                      onChange={(e) =>
                        handleInputChange(index, "description", e.target.value)
                      }
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      className="text-sm w-full border-gray-200 text-right"
                      value={item.quantity}
                      onChange={(e) =>
                        handleInputChange(index, "quantity", e.target.value)
                      }
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      className="text-sm w-full border-gray-200 text-right"
                      value={item.rate}
                      onChange={(e) =>
                        handleInputChange(index, "rate", e.target.value)
                      }
                    />
                  </td>
                  <td>
                    {currency}{" "}
                    {Number(item.quantity * item.rate).toLocaleString()}
                  </td>
                  <td>
                    <button
                      className="text-sm text-red-500 hover:text-red-700 cursor-pointer"
                      onClick={() => handleDeleteItem(index)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button
            className="mt-2 self-start px-4 py-1.5 bg-gradient-to-r from-[#EDC6D7] via-[#CDB6D6] to-[#B0A7D4] rounded-full hover:opacity-90 ease-in transform transition duration-150"
            onClick={handleAddItem}
          >
            add another item
          </button>

          <div className="flex flex-row justify-between w-full items-baseline">
            <div className="flex flex-col gap-4 w-1/2">
              <div className="w-full flex flex-col gap-4">
                <div className="flex flex-col gap-1 text-left">
                  <h2>
                    Information regarding deadlines or urgency and special
                    shipping
                  </h2>
                  <textarea
                    name=""
                    id=""
                    cols="30"
                    rows="4"
                    className="border border-gray-200 text-sm"
                    placeholder="Add information regarding deadlines or urgency and special shipping here (optional)"
                  />
                </div>
                <div className="flex flex-col gap-1 text-left">
                  <h2>Payment and shipping terms for these suppliers</h2>
                  <textarea
                    name=""
                    id=""
                    cols="30"
                    rows="4"
                    className="border border-gray-200 text-sm"
                    placeholder="Add payment and shipping terms for these suppliers here (optional)"
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-4 w-1/2">
              <div className="grid grid-cols-1 gap-1 self-end mt-6">
                <div className="flex flex-row gap-3 items-center font-semibold">
                  <h2 className="grow text-right">Subtotal</h2>
                  <p className="text-sm border-gray-200 w-56 text-end">
                    {currency} {subTotal.toLocaleString()}
                  </p>
                </div>
                <div className="flex flex-row gap-3 items-center">
                  <h2 className="grow text-right">Discount in percent</h2>
                  <input
                    type="number"
                    className="text-sm border-gray-200 w-56 text-end"
                    value={discount * 100}
                    onChange={handleDiscountChange}
                  />
                </div>
                <div className="flex flex-row gap-3 items-center">
                  <h2 className="grow text-right">Tax in percent</h2>
                  <input
                    type="number"
                    className="text-sm border-gray-200 w-56 text-end"
                    value={taxRate * 100}
                    onChange={handleTaxRateChange}
                  />
                </div>
                <div className="flex flex-row gap-3 items-center">
                  <h2 className="grow text-right">Shipping</h2>
                  <input
                    type="number"
                    className="text-sm border-gray-200 w-56 text-end"
                    value={shippingFee}
                    onChange={handleShippingFeeChange}
                  />
                </div>
                <div className="flex flex-row gap-3 items-center font-semibold">
                  <h2 className="grow text-right">Total</h2>
                  <p className="text-sm border-gray-200 w-56 text-end">
                    {currency} {total.toLocaleString()}
                  </p>
                </div>
                <div className="flex flex-row gap-3 items-center">
                  <h2 className="grow text-right">Amount Paid</h2>
                  <input
                    type="number"
                    className="text-sm border-gray-200 w-56 text-end"
                    value={amountPaid}
                    onChange={handleAmountPaidChange}
                  />
                </div>
                <div className="flex flex-row gap-3 items-center font-semibold">
                  <h2 className="grow text-right">Balance Due</h2>
                  <p className="text-sm border-gray-200 w-56 text-end">
                    {currency} {balanceDue.toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-1 text-left w-full">
            <h2>Notes and other information</h2>
            <textarea
              name=""
              id=""
              cols="30"
              rows="4"
              className="border border-gray-200 text-sm"
              placeholder="Add notes and other information here (optional)"
            />
          </div>

          {/* <div className="w-full" />
          <div className="border-b-2 w-full" />
          <p className="self-start font-medium">
            PURCHASING DEPARTMENT USE ONLY
          </p>

          <div className="grid grid-cols-6 w-full ">
            <div className="font-semibold bg-black text-white px-4 py-2 col-span-4 text-left">
              APPROVALS
            </div>
            <div className="font-semibold bg-black text-white px-4 py-2 col-span-1">
              APPROVED?
            </div>
            <div className="font-semibold bg-black text-white px-4 py-2 col-span-1">
              VENDOR EIN ON FILE?
            </div>

            <div className="font-semibold  text-white col-span-1 text-left px-4 py-2 bg-[#b395a5]">
              Name 1
            </div>
            <div className="font-semibold  text-white col-span-2 px-4 py-2 bg-[#b395a5]">
              Signature 1
            </div>
            <div className="font-semibold  text-white col-span-1 px-4 py-2 bg-[#b395a5]">
              Date
            </div>
            <div className="font-semibold  text-white col-span-1 px-4 py-2 bg-[#b395a5]">
              Yes / No
            </div>
            <div className="font-semibold  text-white col-span-1 px-4 py-2 bg-[#b395a5]">
              Yes / No
            </div>

            <input type="text" className="text-sm col-span-1 border-gray-200 px-4 py-2" />
            <input type="text" className="text-sm col-span-2 border-gray-200 px-4 py-2" />
            <input type="date" className="text-sm col-span-1 border-gray-200 px-4 py-2" />
            <select className="text-sm" name="approved1" id="approved1">
              <option value="yes">yes</option>
              <option value="no">no</option>
            </select>
            <select className="text-sm" name="ein1" id="ein1">
              <option value="yes">yes</option>
              <option value="no">no</option>
            </select>

            <div className="font-semibold  text-white col-span-1 text-left px-4 py-2 bg-[#b395a5]">
              Name 2
            </div>
            <div className="font-semibold  text-white col-span-2 px-4 py-2 bg-[#b395a5]">
              Signature 2
            </div>
            <div className="font-semibold  text-white col-span-1 px-4 py-2 bg-[#b395a5]">
              Date
            </div>
            <div className="font-semibold  text-white col-span-1 px-4 py-2 bg-[#b395a5]">
              Yes / No
            </div>
            <div className="font-semibold  text-white col-span-1 px-4 py-2 bg-[#b395a5]">
              Yes / No
            </div>

            <input type="text" className="text-sm col-span-1 border-gray-200 px-4 py-2" />
            <input type="text" className="text-sm col-span-2 border-gray-200 px-4 py-2" />
            <input type="date" className="text-sm col-span-1 border-gray-200 px-4 py-2" />
            <select className="text-sm" name="approved2" id="approved2">
              <option value="yes">yes</option>
              <option value="no">no</option>
            </select>
            <select className="text-sm" name="ein2" id="ein2">
              <option value="yes">yes</option>
              <option value="no">no</option>
            </select>

            <div className="font-semibold bg-black text-white px-4 py-2 col-span-4 text-left">
              COMMENTS
            </div>
            <div className="font-semibold bg-black text-white px-4 py-2 col-span-1">
              P.O. NUMBER
            </div>
            <div className="font-semibold bg-black text-white px-4 py-2 col-span-1">
              EIN OR SSN
            </div>

            <input type="text" className="text-sm col-span-4 border-gray-200 px-4 py-2" />
            <input type="number" className="text-sm col-span-1 border-gray-200 px-4 py-2" />
            <input type="number" className="text-sm col-span-1 border-gray-200 px-4 py-2" />
          </div> */}

          <button
            className="w-fit px-4 py-2 flex items-center
                   justify-center bg-gradient-to-r from-[#EDC6D7] via-[#CDB6D6] to-[#B0A7D4] rounded ml-auto uppercase hover:opacity-90 ease-in transform transition duration-150"
          >
            submit
          </button>
        </div>
      </div>
    </div>
  );
}

const title = "font-semibold mt-2";
const layout =
  "w-full px-5 py-8 overflow-y-auto h-screen bg-gray-50 flex flex-col space-y-8";
