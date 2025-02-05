import React, { useState, useEffect } from "react";
import Sidebar from "../../../../components/Sidebar";
import { Link } from "react-router-dom";
import axios from "axios";
import { useCompanyContext } from "../../../../context/CompanyProvider";
import { useNavigate } from "react-router-dom";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const API_BASE_URL2 = import.meta.env.VITE_API_BASE_URL2;

export default function Invoice() {
  const navigate = useNavigate();
  const [currency, setCurrency] = useState("USD");
  const [invoiceCount, setInvoiceCount] = useState("");
  const { selectedCompany, getCompanyNameById } = useCompanyContext();

  const handleCurrencyChange = (selectedCurrency) => {
    setCurrency(selectedCurrency);
  };

  const [items, setItems] = useState([{ item: "", quantity: 0, rate: 0 }]);

  const handleAddItem = (e) => {
    e.preventDefault();

    setItems([...items, { item: "", quantity: 0, rate: 0 }]);
  };

  const handleDeleteItem = (indexToRemove) => {
    setItems((prevItems) =>
      prevItems.filter((item, index) => index !== indexToRemove)
    );
  };

  const handleInputChange = (index, field, value) => {
    setItems((prevItems) => {
      const updatedItems = [...prevItems];
      updatedItems[index] = { ...updatedItems[index], [field]: value };
      return updatedItems;
    });
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
    // console.log("discountedAmount", discountedAmount);

    const subtotalAfterDiscount = subTotal - discountedAmount;

    const taxedAmount = subtotalAfterDiscount * taxRate;
    // console.log("taxedAmount", taxedAmount);

    const totalBeforeShipping = subtotalAfterDiscount + taxedAmount;
    // console.log("totalBeforeShipping", totalBeforeShipping);

    const total = totalBeforeShipping + parseFloat(shippingFee);
    // console.log("total", total);

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
  }),
    [total, amountPaid];

  const postData = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    const invoiceData = {
      amount_paid: formData.get("amount_paid"),
      client_name: formData.get("client_name"),
      company_id: formData.get("company_id"),
      company_name: formData.get("company_name"),
      date: formData.get("date"),
      discount_in_percent: formData.get("discount_in_percent"),
      due_date: formData.get("due_date"),
      items: items.map((item) => ({
        item: item.item,
        quantity: item.quantity,
        rate: item.rate,
      })),
      notes: formData.get("notes"),
      payment_terms: formData.get("payment_terms"),
      po_number: formData.get("po_number"),
      ship_to: formData.get("ship_to"),
      shipping_cost: formData.get("shipping_cost"),
      tax_in_percent: formData.get("tax_in_percent"),
      terms: formData.get("terms"),
      balance_due: formData.get("balance_due"),
      sub_total: formData.get("sub_total"),
      total: formData.get("total"),
      invoice_number: formData.get("invoice_number"),
      currency: formData.get("currency"),
      logo: formData.get(null),
    };

    try {
      const response = await axios.post(
        `${API_BASE_URL}/create_invoice`,
        invoiceData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
            "Content-Type": "application/json",
          },
        }
      );
      alert("Form submitted successfully!");
      // console.log(invoiceData);
      // console.log(response.data);
      navigate("/reports");
    } catch (error) {
      // console.log(invoiceData)
      console.error("Error submiting form:", error);

      if (error.response && error.response.status === 500) {
        alert("Internal Server Error. Please try again later.");
      } else {
        alert("An error occurred. Please check your inputs and try again.");
      }
    }
  };

  useEffect(() => {
    const fetchInvoiceCount = async () => {
      try {
        const response = await axios.get(
          `${API_BASE_URL2}/company/${selectedCompany}/invoice/count`,
          {
            headers: {
              Accept: "application/json",
              Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
            },
          }
        );

        setInvoiceCount(response.data?.total + 1);
        // console.log(response.data);
      } catch (error) {
        if (error.response && error.response.status === 404) {
          setInvoiceCount(1);
        } else {
          console.error("Error fetching invoice count:", error);
        }
      }
    };

    if (selectedCompany) {
      fetchInvoiceCount();
    }
  }, [selectedCompany]);

  // console.log(getCompanyCurrencyById(selectedCompany));

  return (
    <div className="flex flex-row bg-gray-50 h-screen">
      <Sidebar />
      <form className={layout} onSubmit={postData}>
        <h3 className={title}>
          <Link
            to={"/record-operations"}
            className="text-gray-600 hover:text-black transform ease-in duration-150"
          >
            Record Operations
          </Link>
          {" >"} Create an Invoice
        </h3>

        <div className="self-end gap-2 flex flex-row items-center text-sm">
          <label htmlFor="currency">Choose currency</label>
          <select
            id="currency"
            onChange={(e) => handleCurrencyChange(e.target.value)}
            className="border border-gray-200"
            name="currency"
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
              <div className="flex items-center justify-center border px-8 py-12 w-36 cursor-pointer hover:shadow duration-150 ease-in">
                Add Your Logo
              </div>
              <div className="border border-gray-200 w-10/12 text-sm px-3 py-2 font-semibold min-h-[37px]">
                {getCompanyNameById(selectedCompany)}
              </div>

              <input
                className="hidden"
                type="text"
                name="company_id"
                id="company_id"
                value={selectedCompany || ""}
              />

              <div className="w-10/12 grid grid-cols-2 gap-4 mt-auto">
                <div className="flex flex-col gap-1 text-left">
                  <h2>Name of your client</h2>
                  <input
                    type="text"
                    name="client_name"
                    id="client_name"
                    className="border border-gray-200 text-sm"
                    placeholder="Name of your client (required)"
                  />
                </div>
                <div className="flex flex-col gap-1 text-left">
                  <h2>Ship to</h2>
                  <input
                    type="text"
                    name="ship_to"
                    id="ship_to"
                    className="border border-gray-200 text-sm"
                    placeholder="(optional)"
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-4 w-1/2">
              <h1 className="text-4xl font-semibold text-right">INVOICE</h1>
              <div className="self-end flex gap-1 flex-row items-center text-2xl">
                <span className=" font-bold">#</span> {invoiceCount}
                <input
                  type="text"
                  className="hidden"
                  value={invoiceCount}
                  name="invoice_number"
                />
              </div>
              <div className="grid grid-cols-1 gap-1 self-end mt-6">
                <div className="flex flex-row gap-3 items-center">
                  <h2 className="grow text-right">Date</h2>
                  <input
                    type="date"
                    name="date"
                    id="date"
                    className="text-sm border-gray-200 w-56 text-end"
                  />
                </div>
                <div className="flex flex-row gap-3 items-center">
                  <h2 className="grow text-right">Payment Terms</h2>
                  <input
                    type="text"
                    name="payment_terms"
                    id="payment_terms"
                    className="text-sm border-gray-200 w-56 text-end"
                  />
                </div>
                <div className="flex flex-row gap-3 items-center">
                  <h2 className="grow text-right">Due Date</h2>
                  <input
                    type="date"
                    name="due_date"
                    id="due_date"
                    className="text-sm border-gray-200 w-56 text-end"
                  />
                </div>
                <div className="flex flex-row gap-3 items-center">
                  <h2 className="grow text-right">PO Number</h2>
                  <input
                    type="number"
                    name="po_number"
                    id="po_number"
                    className="text-sm border-gray-200 w-56 text-end"
                  />
                </div>
              </div>
            </div>
          </div>
          <table className="w-full">
            <thead className="bg-[#b395a5] text-white">
              <tr>
                <th className="px-4 py-2">Item</th>
                <th className="px-4 py-2">Quantity</th>
                <th className="px-4 py-2">Rate</th>
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
                      type="number"
                      className="text-sm w-full border-gray-200 text-right"
                      onChange={(e) =>
                        handleInputChange(index, "quantity", e.target.value)
                      }
                      value={item.quantity}
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      className="text-sm w-full border-gray-200 text-right"
                      onChange={(e) =>
                        handleInputChange(index, "rate", e.target.value)
                      }
                      value={item.rate}
                    />
                  </td>
                  <td>
                    {currency}{" "}
                    {Number(item.quantity * item.rate).toLocaleString()}
                  </td>
                  <td>
                    <button
                      className="text-sm text-red-500 hover:text-red-700 cursor-pointer"
                      onClick={(e) => {
                        e.preventDefault();
                        handleDeleteItem(index);
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
            className="mt-2 self-start px-4 py-1.5 bg-gradient-to-r from-[#EDC6D7] via-[#CDB6D6] to-[#B0A7D4] rounded-full hover:opacity-90 ease-in transform transition duration-150"
            onClick={handleAddItem}
          >
            add another item
          </button>

          <div className="flex flex-row justify-between w-full">
            <div className="flex flex-col gap-4 w-1/2">
              <div className="w-10/12 flex flex-col gap-4">
                <div className="flex flex-col gap-1 text-left">
                  <h2>Notes</h2>
                  <textarea
                    name="notes"
                    id="notes"
                    cols="30"
                    rows="4"
                    className="border border-gray-200 text-sm"
                    placeholder="Add notes here (optional)"
                  />
                </div>
                <div className="flex flex-col gap-1 text-left">
                  <h2>Terms</h2>
                  <textarea
                    name="terms"
                    id="terms"
                    cols="30"
                    rows="4"
                    className="border border-gray-200 text-sm"
                    placeholder="Add terms here (optional)"
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
                  <input
                    type="number"
                    className="hidden"
                    value={subTotal}
                    name="sub_total"
                  />
                </div>
                <div className="flex flex-row gap-3 items-center">
                  <h2 className="grow text-right">Discount in percent</h2>
                  <div className="relative">
                    <input
                      type="number"
                      name="discount_in_percent"
                      id="discount_in_percent"
                      className="text-sm border-gray-200 w-56 text-end"
                      onChange={handleDiscountChange}
                      value={discount * 100}
                    />
                    <span className="absolute right-3 top-1/2 transform -translate-y-1/2">
                      %
                    </span>
                  </div>
                </div>
                <div className="flex flex-row gap-3 items-center">
                  <h2 className="grow text-right">Tax in percent</h2>
                  <div className="relative">
                    <input
                      type="number"
                      name="tax_in_percent"
                      id="tax_in_percent"
                      className="text-sm border-gray-200 w-56 text-end"
                      onChange={handleTaxRateChange}
                      value={taxRate * 100}
                    />
                    <span className="absolute right-3 top-1/2 transform -translate-y-1/2">
                      %
                    </span>
                  </div>
                </div>

                <div className="flex flex-row gap-3 items-center">
                  <h2 className="grow text-right">Shipping</h2>
                  <input
                    type="number"
                    name="shipping_cost"
                    id="shipping_cost"
                    className="text-sm border-gray-200 w-56 text-end"
                    onChange={handleShippingFeeChange}
                    value={shippingFee}
                  />
                </div>
                <div className="flex flex-row gap-3 items-center font-semibold">
                  <h2 className="grow text-right">Total</h2>
                  <p className="text-sm border-gray-200 w-56 text-end">
                    {currency} {total.toLocaleString()}
                  </p>

                  <input
                    type="number"
                    className="hidden"
                    value={total}
                    name="total"
                  />
                </div>
                <div className="flex flex-row gap-3 items-center">
                  <h2 className="grow text-right">Amount Paid</h2>
                  <input
                    type="number"
                    name="amount_paid"
                    id="amount_paid"
                    className="text-sm border-gray-200 w-56 text-end"
                    onChange={handleAmountPaidChange}
                    value={amountPaid}
                  />
                </div>
                <div className="flex flex-row gap-3 items-center font-semibold">
                  <h2 className="grow text-right">Balance Due</h2>
                  <p className="text-sm border-gray-200 w-56 text-end">
                    {currency} {balanceDue.toLocaleString()}
                  </p>
                  <input
                    type="number"
                    className="hidden"
                    value={balanceDue}
                    name="balance_due"
                  />
                </div>
              </div>
            </div>
          </div>
          <button
            type="submit"
            className="w-fit px-4 py-2 flex items-center
                   justify-center bg-gradient-to-r from-[#EDC6D7] via-[#CDB6D6] to-[#B0A7D4] rounded ml-auto uppercase hover:opacity-90 ease-in transform transition duration-150"
          >
            submit
          </button>
        </div>
      </form>
    </div>
  );
}

const title = "font-semibold mt-2";
const layout =
  "w-full px-5 py-8 overflow-y-auto h-screen bg-gray-50 flex flex-col space-y-8";
