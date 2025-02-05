import React, { useState } from "react";
import constants from "../../constants";
import { useNavigate } from "react-router-dom";
import { ArrowLeftOutlined, ArrowRightOutlined } from "@ant-design/icons";

const questionnaires = constants.budgetQuestions;

export default function CreateBudget() {
  const navigate = useNavigate();
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const [inputValues, setInputValues] = useState(
    Array(questionnaires.length).fill("")
  );

  const handleEnterKey = (e) => {
    if (e.keyCode === 13) {
      // 13 is the key code for "Enter"
      e.preventDefault();
      handleNextCard(e);
    }
  };

  const handleSelectChange = (e) => {
    // Update the selected option's value in the state
    setInputValues((prevInputValues) => {
      const updatedInputValues = [...prevInputValues];
      updatedInputValues[activeCardIndex] = e.target.value;
      return updatedInputValues;
    });
  };

  const handleNextCard = (e) => {
    e.preventDefault();

    const currentQuestionnaire = questionnaires[activeCardIndex];
    const inputField = document.getElementById(`input-${activeCardIndex}`);

    if (
      currentQuestionnaire.required &&
      currentQuestionnaire.placeholder !== null
    ) {
      // If the current questionnaire is required and has an input field
      if (
        inputField?.type === "text" &&
        (!inputField.value || !inputField.value.trim())
      ) {
        alert("Please fill in the required field.");
        return; // Prevent moving to the next card
      }

      if (inputField?.type === "select-one" && inputField.selectedIndex === 0) {
        alert("Please select an option.");
        return; // Prevent moving to the next card
      }
    }

    if (activeCardIndex === questionnaires.length - 1) {
      navigate("/dashboard");
    } else {
      setActiveCardIndex((prevIndex) => prevIndex + 1);
    }
  };

  const handlePrevCard = (e) => {
    e.preventDefault();

    if (activeCardIndex === 0) {
      // If this is the first index
      e.preventDefault();
    } else {
      setActiveCardIndex((prevIndex) => prevIndex - 1);
    }
  };

  const progress = Math.round(
    Math.min(((activeCardIndex + 1) / questionnaires.length) * 100, 100)
  ); // Calculate progress percentage and limit it to a maximum of 100

  return (
    <div className="flex flex-col flex-1 items-center justify-center h-screen bg-gray-100 relative">
      {questionnaires.map((questionnaire, index) => (
        <form
          key={index}
          className="flex w-full px-4 md:px-8 lg:px-12 flex-col md:gap-10"
          style={{
            opacity: activeCardIndex === index ? 1 : 0,
            position: activeCardIndex === index ? "absolute" : "absolute",
            zIndex: activeCardIndex === index ? 15 : 10,
            transition: "opacity 0.2s ease-in",
          }}
          onKeyDown={handleEnterKey}
        >
          {/* Progress bar */}
          {index !== 0 && index !== questionnaires.length - 1 && (
            <div className="lg:w-1/2 flex flex-col">
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
          )}

          <div className="flex flex-1 flex-col gap-5">
            <h2 className="text-2xl md:text-5xl font-semibold text-center">
              {questionnaire.header}
            </h2>
            {questionnaire.description && (
              <p className="md:text-3xl leading-5 text-left w-full">
                {questionnaire.description}
                {questionnaire.required && (
                  <span className="text-red-500"> *</span>
                )}
              </p>
            )}

            {/* Input-Text */}
            {questionnaire.type && (
              <div className="flex md:flex-row gap-6">
                {Array.isArray(questionnaire.placeholder)
                  ? questionnaire.placeholder.map(
                      (placeholderText, inputIndex) => (
                        <input
                          key={inputIndex}
                          id={`input-${index}-${inputIndex}`}
                          type="text"
                          className="px-3 py-2 text-sm md:text-base text-left w-full"
                          placeholder={placeholderText}
                          required={questionnaire.required} // Use the required attribute based on the questionnaire.required value
                        />
                      )
                    )
                  : null}
              </div>
            )}

            {/* Select-Option */}
            {questionnaire.select && (
              <select
                name="countryAndLaguage"
                id="countryAndLanguage"
                value={inputValues[activeCardIndex]}
                onChange={handleSelectChange}
              >
                <option value="">Select an option</option>
                <option value="volvo">Volvo</option>
                <option value="saab">Saab</option>
                <option value="mercedes">Mercedes</option>
                <option value="audi">Audi</option>
              </select>
            )}

            {/* Select-Option2 */}
            {questionnaire.select2 && (
              <select
                name="countryAndLaguage"
                id="countryAndLanguage"
                value={inputValues[activeCardIndex]}
                onChange={handleSelectChange}
              >
                <option value="">Select an option</option>
                <option value="facebook">Facebook</option>
                <option value="twitter">Twitter</option>
                <option value="linkedIn">LinkedIn</option>
                <option value="referred">Referred</option>
              </select>
            )}

            {/* Checkbox1 */}
            {questionnaire.checkbox && (
              <>
                <div className="flex flex-row gap-2 text-sm md:text-xl items-center">
                  <input
                    type="checkbox"
                    id="smallBusinessOwner"
                    name="smallBusinessOwner"
                    value="Creating a budget"
                  />
                  <label htmlFor="smallBusinessOwner">
                    Small business owner
                  </label>
                </div>

                <div className="flex flex-row gap-2 text-sm md:text-xl items-center">
                  <input
                    type="checkbox"
                    id="startupFounder"
                    name="startupFounder"
                    value="Startup founder"
                  />
                  <label htmlFor="startupFounder">Startup founder</label>
                </div>

                <div className="flex flex-row gap-2 text-sm md:text-xl items-center">
                  <input
                    type="checkbox"
                    id="accountingProfessional"
                    name="accountingProfessional"
                    value="Accounting professional"
                  />
                  <label htmlFor="accountingProfessional">
                    Accounting professional
                  </label>
                </div>

                <div className="flex flex-row gap-2 text-sm md:text-xl items-center">
                  <input
                    type="checkbox"
                    id="financeProfessional"
                    name="financeProfessional"
                    value="Finance professional"
                  />
                  <label htmlFor="financeProfessional">
                    Finance professional
                  </label>
                </div>

                <div className="flex flex-row gap-2 text-sm md:text-xl items-center">
                  <input
                    type="checkbox"
                    id="other"
                    name="other"
                    value="Other"
                  />
                  <label htmlFor="other">Other</label>
                </div>
              </>
            )}

            {/* Checkbox2 */}
            {questionnaire.checkbox2 && (
              <>
                <div className="flex flex-row gap-2 text-sm md:text-xl items-center">
                  <input
                    type="checkbox"
                    id="budget"
                    name="budget"
                    value="Creating a budget"
                  />
                  <label htmlFor="budget">Creating a budget</label>
                </div>

                <div className="flex flex-row gap-2 text-sm md:text-xl items-center">
                  <input
                    type="checkbox"
                    id="monitorPerformance"
                    name="monitorPerformance"
                    value="Monitoring performance"
                  />
                  <label htmlFor="monitorPerformance">
                    Monitoring performance
                  </label>
                </div>

                <div className="flex flex-row gap-2 text-sm md:text-xl items-center">
                  <input
                    type="checkbox"
                    id="monitorCashFlow"
                    name="monitorCashFlow"
                    value="Monitoring cash flows"
                  />
                  <label htmlFor="monitorCashFlow">Monitoring cash flows</label>
                </div>

                <div className="flex flex-row gap-2 text-sm md:text-xl items-center">
                  <input
                    type="checkbox"
                    id="capital"
                    name="capital"
                    value="Looking for capital"
                  />
                  <label htmlFor="capital">Looking for capital</label>
                </div>

                <div className="flex flex-row gap-2 text-sm md:text-xl items-center">
                  <input
                    type="checkbox"
                    id="report"
                    name="report"
                    value="Reporting to investors and stakeholders"
                  />
                  <label htmlFor="report">
                    Reporting to investors and stakeholders
                  </label>
                </div>
              </>
            )}

            {/* Checkbox3 */}
            {questionnaire.checkbox3 && (
              <>
                <div className="flex flex-row gap-2 text-sm md:text-xl items-center">
                  <input
                    type="checkbox"
                    id="reader"
                    name="reader"
                    value="Love to read graphs"
                  />
                  <label htmlFor="reader">Love to read graphs</label>
                </div>

                <div className="flex flex-row gap-2 text-sm md:text-xl items-center">
                  <input
                    type="checkbox"
                    id="excelUser"
                    name="excelUser"
                    value="Love to use Excel"
                  />
                  <label htmlFor="excelUser">Love to use Excel</label>
                </div>

                <div className="flex flex-row gap-2 text-sm md:text-xl items-center">
                  <input
                    type="checkbox"
                    id="insights"
                    name="insights"
                    value="Just give me the insights!"
                  />
                  <label htmlFor="insights">Just give me the insights!</label>
                </div>
              </>
            )}

            {/* Buttons */}
            {questionnaire.start && (
              <div className="flex flex-row gap-6 self-center">
                <button
                  onClick={handleNextCard}
                  className="self-center w-32 uppercase px-3 py-2 text-gray-800 rounded-full bg-gradient-to-r from-[#EDC6D7] via-[#CDB6D6] to-[#B0A7D4] font-bold hover:opacity-80"
                >
                  {questionnaire.btn1}
                </button>
                <button
                  onClick={handleNextCard}
                  className="self-center w-32 uppercase px-3 py-2 text-gray-800 rounded-full bg-gradient-to-r from-[#EDC6D7] via-[#CDB6D6] to-[#B0A7D4] font-bold hover:opacity-80"
                >
                  {questionnaire.btn2}
                </button>
              </div>
            )}
            {questionnaire.submit && (
              <button
                onClick={handleNextCard}
                className="self-center w-32 uppercase px-3 py-2 text-gray-800 rounded-full bg-gradient-to-r from-[#EDC6D7] via-[#CDB6D6] to-[#B0A7D4] font-bold hover:opacity-80"
              >
                {questionnaire.btn}
              </button>
            )}
            <div className="flex flex-1 flex-row self-start gap-4 mt-2 md:mt-10">
              {questionnaire.back && (
                <button
                  onClick={handlePrevCard}
                  className="w-fit p-2 flex items-center
               justify-center text-white bg-black rounded"
                >
                  <ArrowLeftOutlined />
                </button>
              )}
              {questionnaire.next && (
                <button
                  onClick={handleNextCard}
                  className="w-fit p-2 flex items-center
               justify-center text-white bg-black rounded"
                >
                  <ArrowRightOutlined />
                </button>
              )}
            </div>
          </div>
        </form>
      ))}
    </div>
  );
}
