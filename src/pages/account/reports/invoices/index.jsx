import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import Sidebar from "../../../../components/Sidebar";
import { useEffect, useState } from "react";
import axios from "axios";
import { useCompanyContext } from "../../../../context/CompanyProvider";

const API_BASE_URL2 = import.meta.env.VITE_API_BASE_URL2;

function index() {
  const { invoice_id } = useParams();
  const token = localStorage.getItem("jwtToken");
  const [invoiceData, setInvoiceData] = useState(null);
  const [invoiceCount, setInvoiceCount] = useState("");
  const { selectedCompany } = useCompanyContext();
  const navigate = useNavigate();

  useEffect(() => {
    const getInvoiceById = async () => {
      try {
        const response = await axios.get(
          `${API_BASE_URL2}/invoice/${invoice_id}`,
          {
            headers: {
              Accept: "application/json",
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        console.log(response.data);
        setInvoiceData(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    getInvoiceById();
  }, [invoice_id, token]);

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

        setInvoiceCount(response.data?.total);
        // console.log(response.data);
      } catch (error) {
        if (error.response && error.response.status === 404) {
          setInvoiceCount(1);
          navigate("../reports");
        } else {
          console.error("Error fetching invoice count:", error);
        }
      }
    };

    if (selectedCompany) {
      fetchInvoiceCount();
    }
  }, [selectedCompany]);

  useEffect(() => {
    console.log(
      "invoiceData:",
      invoiceData,
      typeof invoiceData,
      Array.isArray(invoiceData) ? invoiceData.length : null
    );

    if (!invoiceData?.length === 0) {
      console.log("Redirecting to ../reports");
      navigate("../reports");
    }
  }, [invoiceData, navigate]);


  return (
    <div className="flex flex-row bg-gray-50 h-screen">
      <Sidebar />
      <div className={layout}>
        <h3 className={title}>Reports</h3>

        {invoiceData && (
          <div className="rounded-xl bg-white p-4 text-center shadow text-sm flex flex-col items-center justify-center space-y-4">
            {/* <p>Invoice ID: {invoiceData.invoice_id}</p> */}
            <div className="flex flex-row justify-between w-full">
              <div className="flex flex-col gap-4 w-1/2">
                <div className="flex items-center justify-center border px-8 py-12 w-36 cursor-pointer hover:shadow duration-150 ease-in">
                  Add Your Logo
                </div>

                <p
                  id="company_name"
                  className="w-10/12 border border-gray-200 text-sm min-h-[37px] py-2 px-3"
                >
                  {invoiceData.company_name || "null"}
                </p>

                <div className="w-10/12 grid grid-cols-2 gap-4 mt-auto">
                  <div className="flex flex-col gap-1 text-left">
                    <h2>Name of your client</h2>
                    <p className="border border-gray-200 text-sm min-h-[37px] py-2 px-3">
                      {invoiceData.client_name}
                    </p>
                  </div>
                  <div className="flex flex-col gap-1 text-left">
                    <h2>Ship to</h2>
                    <p
                      className="border border-gray-200 text-sm min-h-[37px] py-2 px-3"
                      placeholder="(optional)"
                    >
                      {invoiceData.ship_to}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-4 w-1/2">
                <h1 className="text-4xl font-semibold text-right">INVOICE</h1>
                <div className="self-end flex gap-1 flex-row items-center text-2xl">
                  <span className=" font-bold">#</span>{" "}
                  {/* {invoiceData.invoice_number} */}
                  {invoiceCount}
                </div>
                <div className="grid grid-cols-1 gap-1 self-end mt-6">
                  <div className="flex flex-row gap-3 items-center">
                    <h2 className="grow text-right">Date</h2>
                    <p className="text-sm py-2 px-3 w-56 text-end border border-gray-200 min-h-[37px]">
                      {invoiceData.date}
                    </p>
                  </div>
                  <div className="flex flex-row gap-3 items-center">
                    <h2 className="grow text-right">Payment Terms</h2>
                    <p className="text-sm py-2 px-3 w-56 text-end border border-gray-200 min-h-[37px]">
                      {invoiceData.payment_terms}
                    </p>
                  </div>
                  <div className="flex flex-row gap-3 items-center">
                    <h2 className="grow text-right">Due Date</h2>
                    <p className="text-sm py-2 px-3 w-56 text-end border border-gray-200 min-h-[37px]">
                      {invoiceData.due_date}
                    </p>
                  </div>
                  <div className="flex flex-row gap-3 items-center">
                    <h2 className="grow text-right">PO Number</h2>
                    <p className="text-sm py-2 px-3 w-56 text-end border border-gray-200 min-h-[37px]">
                      {invoiceData.po_number}
                    </p>
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
                </tr>
              </thead>
              <tbody>
                {invoiceData.items.map((item, index) => (
                  <tr key={index}>
                    <td className="border border-gray-200 text-sm min-h-[37px] py-2 px-3">
                      {item.item}
                    </td>
                    <td className="border border-gray-200 text-sm min-h-[37px] py-2 px-3">
                      {item.quantity}
                    </td>
                    <td className="border border-gray-200 text-sm min-h-[37px] py-2 px-3">
                      {item.quantity}
                    </td>
                    <td className="border border-gray-200 text-sm min-h-[37px] py-2 px-3">
                      {invoiceData.currency}{" "}
                      {Number(item.quantity * item.rate).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="flex flex-row justify-between w-full">
              <div className="flex flex-col gap-4 w-1/2">
                <div className="w-10/12 flex flex-col gap-4 flex-1">
                  <div className="flex flex-col gap-1 text-left grow">
                    <h2>Notes</h2>
                    <p className="border border-gray-200 text-sm min-h-[120px] py-2 px-3 overflow-y-auto">
                      {invoiceData.notes}
                    </p>
                  </div>
                  <div className="flex flex-col gap-1 text-left grow">
                    <h2>Terms</h2>
                    <p className="border border-gray-200 text-sm min-h-[120px] py-2 px-3 overflow-y-auto">
                      {invoiceData.terms}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-4 w-1/2">
                <div className="grid grid-cols-1 gap-1 self-end mt-6">
                  <div className="flex flex-row gap-3 items-center font-semibold">
                    <h2 className="grow text-right">Subtotal</h2>
                    <p className="text-sm w-56 text-end px-3 py-2">
                      {invoiceData.currency} {invoiceData.sub_total}
                    </p>
                  </div>
                  <div className="flex flex-row gap-3 items-center">
                    <h2 className="grow text-right">Discount in percent</h2>
                    <div className="relative">
                      <p className="text-sm border border-gray-200 w-56 text-end px-7 py-2">
                        {invoiceData.discount_in_percent}
                        <span className="absolute right-3 top-1/2 transform -translate-y-1/2">
                          %
                        </span>
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-row gap-3 items-center">
                    <h2 className="grow text-right">Tax in percent</h2>
                    <div className="relative">
                      <p className="text-sm border border-gray-200 w-56 text-end px-7 py-2">
                        {invoiceData.tax_in_percent}
                        <span className="absolute right-3 top-1/2 transform -translate-y-1/2">
                          %
                        </span>
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-row gap-3 items-center">
                    <h2 className="grow text-right">Shipping</h2>
                    <p className="text-sm border border-gray-200 w-56 text-end min-h-[37px] px-3 py-2 ">
                      {invoiceData.shipping_cost}
                    </p>
                  </div>
                  <div className="flex flex-row gap-3 items-center font-semibold">
                    <h2 className="grow text-right">Total</h2>
                    <p className="text-sm w-56 text-end min-h-[37px] px-3 py-2 ">
                      {invoiceData.currency} {invoiceData.total}
                    </p>
                  </div>
                  <div className="flex flex-row gap-3 items-center">
                    <h2 className="grow text-right">Amount Paid</h2>
                    <p className="text-sm border border-gray-200 w-56 text-end min-h-[37px] px-3 py-2 ">
                      {invoiceData.amount_paid}
                    </p>
                  </div>
                  <div className="flex flex-row gap-3 items-center font-semibold">
                    <h2 className="grow text-right">Balance Due</h2>
                    <p className="text-sm w-56 text-end min-h-[37px] px-3 py-2 ">
                      {invoiceData.currency}
                      {Number(invoiceData.balance_due).toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default index;

const title = "font-semibold mt-2";
const layout =
  "w-full px-5 py-8 overflow-y-auto h-screen bg-gray-50 flex flex-col space-y-8";
