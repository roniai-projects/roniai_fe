import React, { useState, useEffect } from "react";
import Sidebar from "../../../components/Sidebar";
import { Link } from "react-router-dom";
import axios from "axios";
import Loader from "../../../components/Loader";
import { useCompanyContext } from "../../../context/CompanyProvider";

const API_BASE_URL2 = import.meta.env.VITE_API_BASE_URL2;

export default function index() {
  const token = localStorage.getItem("jwtToken");
  const { selectedCompany } = useCompanyContext();

  const [isLoading, setIsLoading] = useState(false);
  const [invoices, setInvoices] = useState([]);

  useEffect(() => {
    const getAllInvoices = async () => {
      try {
        if (!selectedCompany) {
          return;
        }

        const response = await axios.get(
          `${API_BASE_URL2}/company/${selectedCompany}/invoice`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setInvoices(response.data);
        console.log(response.data);
      } catch (error) {
        setInvoices([]);
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    setIsLoading(true);
    getAllInvoices();
  }, [selectedCompany, token]);

  console.log(selectedCompany);


  return (
    <div className="flex flex-row bg-gray-50 h-screen">
      <Sidebar />
      <div className={layout}>
        <h3 className={title}>Reports</h3>

        {isLoading ? (
          <div className="flex flex-1 items-center justify-center">
            <Loader />
          </div>
        ) : invoices && invoices.length > 0 ? (
          <div className="rounded-xl bg-white p-4 shadow text-sm flex flex-col items-center justify-center space-y-4">
            <h2 className="border-b border-black uppercase font-semibold pb-1 w-full">
              invoices
            </h2>
            <table className="min-w-full bg-white border border-gray-300 text-center">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-300 px-4 py-2">
                    Date Created
                  </th>
                  <th className="border border-gray-300 px-4 py-2">
                    Due Date
                  </th>
                  <th className="border border-gray-300 px-4 py-2">
                    Client Name
                  </th>
                  <th className="border border-gray-300 px-4 py-2">
                    Amount Paid
                  </th>
                  <th className="border border-gray-300 px-4 py-2">
                    Balance Due
                  </th>
                  <th className="border border-gray-300 px-4 py-2">Notes</th>
                  <th className="border border-gray-300 px-4 py-2">Action</th>
                </tr>
              </thead>
              <tbody>
                {invoices.map((invoice) => (
                  <tr key={invoice.invoice_id} className="hover:bg-gray-50">
                    <td className="border border-gray-300 px-4 py-2">
                      {invoice.date}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {invoice.due_date}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {invoice.client_name}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {invoice.amount_paid}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {invoice.balance_due}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {invoice.notes}
                    </td>
                    <td className="border border-gray-300 px-4 py-2 text-center">
                      <Link
                        to={`./invoice/${invoice.invoice_id}`}
                        className="bg-[#B0A7D4] px-3 py-1 rounded hover:opacity-80"
                      >
                        View
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="flex flex-1 items-center justify-center text-gray-600">
            No data found.
          </div>
        )}
      </div>
    </div>
  );
}

const title = "font-semibold mt-2";
const layout =
  "w-full px-5 py-8 overflow-y-auto h-screen bg-gray-50 flex flex-col space-y-8";
