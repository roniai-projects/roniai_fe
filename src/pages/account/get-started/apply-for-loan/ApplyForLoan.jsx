import { useState } from "react";

import Sidebar from "../../../../components/Sidebar";
import { MenuFoldOutlined } from "@ant-design/icons";
import constants from "../../../../constants";

const questionnaires = constants.threeMonthVisionQuestionnaire;

export default function ApplyForLoan() {
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => {
    setIsOpen((prevIsOpen) => !prevIsOpen);
  };

  const [activeCardIndex, setActiveCardIndex] = useState(0);

  const handleNextCard = (e) => {
    e.preventDefault();
    setActiveCardIndex((prevIndex) => prevIndex + 1);
  };

  return (
    <div className="flex flex-row relative">
      {!isOpen && (
        <>
          <Sidebar />
        </>
      )}

      <div className="flex w-full h-screen justify-center items-center overflow-hidden">
        <form className="flex flex-col flex-1 items-center justify-center">
          {questionnaires.map((questionnaire, index) => (
            <div
              key={index}
              className="flex flex-col-reverse lg:flex-row max-w-[300px] md:max-w-md lg:max-w-3xl w-full bg-white shadow-md rounded-xl"
              style={{
                opacity: activeCardIndex === index ? 1 : 0,
                position: activeCardIndex === index ? "absolute" : "absolute",
                zIndex: activeCardIndex === index ? 15 : 10,
                transition: "opacity 0.3s ease-in",
              }}
            >
              <div className="flex flex-1 p-4 md:p-8 flex-col gap-5">
                <h2 className="text-3xl md:text-5xl font-semibold">
                  {questionnaire.header}
                </h2>
                {questionnaire.placeholder === null ? (
                  <p className="md:text-lg leading-5">
                    {questionnaire.description}
                  </p>
                ) : (
                  <input
                    type="text"
                    className="px-3 py-2 outline outline-1 text-sm md:text-base rounded-sm"
                    placeholder={questionnaire.placeholder}
                  />
                )}
                <button
                  onClick={handleNextCard}
                  className="self-start w-32 uppercase px-3 py-2 text-gray-800 rounded-md bg-gradient-to-r from-[#EDC6D7] via-[#CDB6D6] to-[#B0A7D4] font-bold hover:opacity-80"
                >
                  {questionnaire.btn}
                </button>
              </div>
              {questionnaire.img && (
                <div className="lg:w-1/2">
                  <img
                    src={questionnaire.img}
                    className="object-cover w-full h-full rounded-t-md lg:rounded-tr-md lg:rounded-br-md"
                  />
                </div>
              )}
            </div>
          ))}
        </form>
      </div>

      <button
        onClick={toggleSidebar}
        className={`fixed opacity-30 hover:opacity-100 -translate-y-1.5 -translate-x-4 flex items-center px-3 py-2 text-gray-600 transition-colors duration-300 transform border bg-gray-100 rounded-md hover:border-[#DBC7C8] hover:text-[#DBC7C8] ${
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
