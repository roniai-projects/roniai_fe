import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

import Sidebar from "../../../components/Sidebar";
import { MenuFoldOutlined } from "@ant-design/icons";

export default function GetStarted() {
  const navigate = useNavigate();

  const goToPage = (path) => {
    navigate(path);
  };

  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen((prevIsOpen) => !prevIsOpen);
  };

  return (
    <div className="flex flex-row relative">
      {!isOpen && (
        <>
          <Sidebar />
        </>
      )}

      <section className="flex justify-center items-center h-screen w-full overflow-y-auto pb-8 md:pb-0 pt-8 md:pt-12 px-4 md:px-8 lg:px-12 bg-gray-50">
        <div className="flex flex-col items-center justify-center h-full gap-4">
          <h1 className="text-3xl font-bold md:text-center">
            Hi, I’m Roni, your AI finance assistant.
          </h1>
          <p className="text-sm font-semibold md:text-center">
            {" "}
            For now, I can help you create a budget, a financial plan for a new
            business, or apply for a loan. What would you like to do?
          </p>
          <div className="flex flex-col md:flex-row gap-4 md:gap-6 w-full justify-center">
            <button
              onClick={() => {
                goToPage("./create-a-budget");
              }}
              className="rounded-full px-4 py-2 text-sm uppercase bg-gradient-to-r from-[#EDC6D7] via-[#CDB6D6] to-[#B0A7D4] text-gray-700 font-semibold shadow hover:opacity-80 cursor-pointer"
            >
              create a budget
            </button>
            <Link
              to={"/financing"}
              className="rounded-full px-4 py-2 text-sm uppercase bg-gradient-to-r from-[#EDC6D7] via-[#CDB6D6] to-[#B0A7D4] text-gray-700 font-semibold shadow hover:opacity-80 cursor-pointer"
            >
              apply for a loan
            </Link>
          </div>
        </div>
      </section>

      <button
        onClick={toggleSidebar}
        className={`fixed opacity-50 hover:opacity-100 -translate-y-1.5 -translate-x-4 flex items-center px-3 py-2 text-gray-600 transition-colors duration-300 transform border bg-gray-100 rounded-md hover:border-[#DBC7C8] hover:text-[#DBC7C8] ${
          isOpen
            ? "top-10 left-8 md:left-12 rotate-180 transform transition"
            : "top-10 right-0 md:right-auto md:left-64 lg:left-72"
        }`}
      >
        <MenuFoldOutlined />
      </button>
    </div>
  );
}
