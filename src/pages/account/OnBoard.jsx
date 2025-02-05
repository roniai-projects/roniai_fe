import React, { useState, useEffect } from "react";
import constants from "../../constants";
import { useNavigate } from "react-router-dom";
import { ArrowLeftOutlined, ArrowRightOutlined } from "@ant-design/icons";
import axios from "axios";

const questionnaires = constants.onboardingquestions;

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function OnBoard() {
  const [countriesData, setCountriesData] = useState([]);
  const languages = ["english", "french", "spanish"];
  const [formData, setFormData] = useState({
    first_name: "",
    language: "",
    country: "",
    last_name: "",
    profile: [],
    referral_source: "",
    use_case: [],
  });
  const [companyData, setCompanyData] = useState({
    company_address: "",
    company_name: "",
    industry: "Advertising",
    tech_startup: true,
    website: "",
  });
  const navigate = useNavigate();
  const [activeCardIndex, setActiveCardIndex] = useState(0);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      // Handle checkboxes
      if (checked) {
        setFormData((prevFormData) => ({
          ...prevFormData,
          profile: [...prevFormData.profile, value],
          use_case: [...prevFormData.use_case, value],
        }));
      } else {
        setFormData((prevFormData) => ({
          ...prevFormData,
          profile: prevFormData.profile.filter((item) => item !== value),
          use_case: prevFormData.use_case.filter((item) => item !== value),
        }));
      }
    } else {
      // Handle text inputs
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));
    }
  };

  const handleChange2 = (name, value) => {
    setCompanyData((prevCompanyData) => ({
      ...prevCompanyData,
      [name]: value,
    }));
  };

  const handleUpdate = async (e) => {
    if (e) {
      e.preventDefault();
    }

    try {
      const token = localStorage.getItem("jwtToken");
      const url = `${API_BASE_URL}/update_onboarding_info`;

      const response = await axios.post(url, formData, {
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      // Handle the response as needed
      console.log(response.data);
      // navigate("/financial-performance");
    } catch (error) {
      // Handle errors as needed
      console.error(error);
    }
  };

  const createCompany = async (e) => {
    if (e) {
      e.preventDefault();
    }

    try {
      const token = localStorage.getItem("jwtToken");
      const url = `${API_BASE_URL}/company`;

      const response = await axios.post(url, companyData, {
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      console.log(response.data);
      alert("Submitted successfully!");
      navigate("/financial-performance");
    } catch (error) {
      console.error(error);
    }
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

    if (activeCardIndex === questionnaires.length - 7) {
      handleUpdate();
      setActiveCardIndex((prevIndex) => prevIndex + 1);
      // navigate("/financial-performance");
    } else if (activeCardIndex === questionnaires.length - 1) {
      createCompany();
    } else {
      setActiveCardIndex((prevIndex) => prevIndex + 1);
    }
  };

  const handleEnterKey = (e) => {
    if (e.keyCode === 13) {
      // 13 is the key code for "Enter"
      e.preventDefault();
      handleNextCard(e);
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
  );

  useEffect(() => {
    const fetchData = async (language) => {
      try {
        const response = await axios.get(
          `https://restcountries.com/v3.1/lang/${language}`
        );
        return response.data;
      } catch (error) {
        console.error(error);
        return [];
      }
    };

    Promise.all(languages.map(fetchData)).then((results) => {
      const allCountriesData = [].concat(...results);
      setCountriesData(allCountriesData);
    });
  }, []);

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
            {questionnaire.name && (
              <div className="flex flex-row gap-6">
                <input
                  type="text"
                  onChange={handleChange}
                  value={formData.first_name}
                  name="first_name"
                  placeholder="First Name"
                  className="px-3 py-2 text-sm md:text-base text-left w-full"
                />
                <input
                  type="text"
                  onChange={handleChange}
                  value={formData.last_name}
                  name="last_name"
                  placeholder="Last Name"
                  className="px-3 py-2 text-sm md:text-base text-left w-full"
                />
              </div>
            )}
            {/* {questionnaire.type && (
              <div className="flex md:flex-row gap-6">
                {Array.isArray(questionnaire.placeholder)
                  ? questionnaire.placeholder.map(
                      (placeholderText, inputIndex) => {
                        let inputName;
                        if (inputIndex === 0) {
                          inputName = "first_name";
                        } else if (inputIndex === 1) {
                          inputName = "last_name";
                        }

                        return (
                          <input
                            key={inputIndex}
                            id={`input-${index}-${inputIndex}`}
                            type="text"
                            name={inputName}
                            value={formData[inputName] || ""}
                            onChange={handleChange}
                            className="px-3 py-2 text-sm md:text-base text-left w-full"
                            placeholder={placeholderText}
                          />
                        );
                      }
                    )
                  : null}
              </div>
            )} */}

            {/* Select-Option */}
            {questionnaire.select && (
              <select
                name="country"
                onChange={handleChange}
                value={formData.country}
              >
                <option value="" key="select-option">
                  Select an option
                </option>
                {languages.map((language) => (
                  <optgroup
                    label={language.charAt(0).toUpperCase() + language.slice(1)}
                    key={`optgroup-${language}`}
                  >
                    {countriesData
                      .filter((country) =>
                        language === "english"
                          ? true
                          : country.languages && country.languages[language]
                      )
                      .map((country) => (
                        <option
                          key={`${country.cca2}-${language}`}
                          value={country.name.common}
                        >
                          {language.charAt(0).toUpperCase() + language.slice(1)}{" "}
                          - {country.name.common}
                        </option>
                      ))}

                    {countriesData
                      .filter((country) =>
                        language === "french"
                          ? true
                          : country.languages && country.languages[language]
                      )
                      .map((country) => (
                        <option
                          key={`${country.cca2}-${language}`}
                          value={country.name.common}
                        >
                          {language.charAt(0).toUpperCase() + language.slice(1)}{" "}
                          - {country.name.common}
                        </option>
                      ))}

                    {countriesData
                      .filter((country) =>
                        language === "spanish"
                          ? true
                          : country.languages && country.languages[language]
                      )
                      .map((country) => (
                        <option
                          key={`${country.cca2}-${language}`}
                          value={country.name.common}
                        >
                          {language.charAt(0).toUpperCase() + language.slice(1)}{" "}
                          - {country.name.common}
                        </option>
                      ))}
                  </optgroup>
                ))}
              </select>
            )}

            {/* Select-Option2 */}
            {questionnaire.select2 && (
              <select
                name="referral_source"
                value={formData.referral_source}
                onChange={handleChange}
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
                    value="Small business owner"
                    checked={formData.profile.includes("Small business owner")}
                    onChange={handleChange}
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
                    checked={formData.profile.includes("Startup founder")}
                    onChange={handleChange}
                  />
                  <label htmlFor="startupFounder">Startup founder</label>
                </div>

                <div className="flex flex-row gap-2 text-sm md:text-xl items-center">
                  <input
                    type="checkbox"
                    id="accountingProfessional"
                    name="accountingProfessional"
                    value="Accounting professional"
                    checked={formData.profile.includes(
                      "Accounting professional"
                    )}
                    onChange={handleChange}
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
                    checked={formData.profile.includes("Finance professional")}
                    onChange={handleChange}
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
                    checked={formData.profile.includes("Other")}
                    onChange={handleChange}
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

            {questionnaire.companyName && (
              <input
                type="text"
                placeholder="Roni AI"
                onChange={(e) => handleChange2("company_name", e.target.value)}
                value={companyData.company_name}
              />
            )}

            {questionnaire.industry && (
              <select
                onChange={(e) => handleChange2("industry", e.target.value)}
                value={companyData.industry}
              >
                <option value="Advertising">Advertising</option>
                <option value="Aerospace">Aerospace</option>
                <option value="Agriculture">Agriculture</option>
                <option value="Clothing Industry">Clothing Industry</option>
                <option value="Computer">Computer</option>
                <option value="Construction">Construction</option>
                <option value="Distribution">Distribution</option>
                <option value="Economics">Economics</option>
                <option value="Education">Education</option>
                <option value="Energy">Energy</option>
                <option value="Entrepreneurship">Entrepreneurship</option>
                <option value="Entertainment">Entertainment</option>
                <option value="Fashion">Fashion</option>
                <option value="Financial Services">Financial Services</option>
                <option value="Finance">Finance</option>
                <option value="Fishery">Fishery</option>
                <option value="Food Industry">Food Industry</option>
                <option value="Food Service">Food Service</option>
                <option value="Forestry">Forestry</option>
                <option value="Health care">Health care</option>
                <option value="Hospitality Industry">
                  Hospitality Industry
                </option>
                <option value="Humnan Resources">Human Resources</option>
                <option value="Insurance">Insurance</option>
                <option value="Investment">Investment</option>
                <option value="Management">Management</option>
                <option value="Manufacturing">Manufacturing</option>
                <option value="Marketing">Marketing</option>
                <option value="Media">Media</option>
                <option value="Mining">Mining</option>
                <option value="Pharmaceutics">Pharmaceutics</option>
                <option value="Production">Production</option>
                <option value="Public Administration">
                  Public Administration
                </option>
                <option value="Real State">Real State</option>
                <option value="Retail">Retail</option>
                <option value="Small Business">Small Business</option>
                <option value="Technology">Technology</option>
                <option value="Telecommunications">Telecommunications</option>
                <option value="Trade">Trade</option>
                <option value="Transport">Transport</option>
                <option value="Warehouse">Warehouse</option>
              </select>
            )}

            {questionnaire.businessAddress && (
              <input
                type="text"
                onChange={(e) =>
                  handleChange2("company_address", e.target.value)
                }
                value={companyData.company_address}
              />
            )}

            {questionnaire.website && (
              <input
                type="text"
                onChange={(e) => handleChange2("website", e.target.value)}
                value={companyData.website}
              />
            )}

            {questionnaire.techStartup && (
              <select
                onChange={(e) =>
                  handleChange2("tech_startup", e.target.value === "true")
                }
                value={String(companyData.tech_startup)}
              >
                <option value="true">Yes</option>
                <option value="false">No</option>
              </select>
            )}

            {/* Buttons */}
            {questionnaire.start && (
              <button
                onClick={handleNextCard}
                className="self-center w-32 uppercase px-3 py-2 text-gray-800 rounded-full bg-gradient-to-r from-[#EDC6D7] via-[#CDB6D6] to-[#B0A7D4] font-bold hover:opacity-80"
              >
                {questionnaire.btn}
              </button>
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
