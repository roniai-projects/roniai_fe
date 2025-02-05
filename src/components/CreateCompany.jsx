import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function CreateCompany({ isOpen2, setIsOpen2 }) {
  const [companyData, setCompanyData] = useState({
    company_address: "",
    company_name: "",
    industry: "Advertising",
    tech_startup: true,
    website: "",
    currency: "USD",
  });

  function closeModal() {
    setIsOpen2(false);
  }

  const handleChange = (name, value) => {
    setCompanyData((prevCompanyData) => ({
      ...prevCompanyData,
      [name]: value,
    }));
  };

  const createCompany = async (e) => {
    if (e) {
      e.preventDefault();
    }

    if (
      !companyData.company_name ||
      !companyData.industry ||
      !companyData.company_address ||
      !companyData.industry ||
      !companyData.website ||
      !companyData.currency
    ) {
      console.log(companyData.company_address);
      console.log(companyData.company_name);
      console.log(companyData.industry);
      console.log(companyData.tech_startup);
      console.log(companyData.website);
      console.log(companyData.currency);
      alert("Please fill out all fields.");
      return;
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
      alert("Company added successfully!");
      closeModal();
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Transition appear show={isOpen2} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-lg transform overflow-hidden bg-white px-12 py-8 text-left align-middle shadow-xl transition-all flex gap-6 items-center flex-col border rounded-xl">
                  <Dialog.Title
                    as="h2"
                    className="text-3xl font-semibold text-center"
                  >
                    Add a new company?
                  </Dialog.Title>

                  <div className="grid grid-cols-2 gap-4 w-full">
                    <div className="flex flex-col gap-1 items-start">
                      <label className="text-base font-semibold text-center">
                        Company name:
                      </label>
                      <input
                        type="text"
                        placeholder="Roni AI"
                        className="text-sm rounded-lg w-full"
                        onChange={(e) =>
                          handleChange("company_name", e.target.value)
                        }
                        value={companyData.company_name}
                      />
                    </div>

                    <div className="flex flex-col gap-1 items-start">
                      <label className="text-base font-semibold text-center">
                        Industry:
                      </label>
                      <select
                        className="text-sm rounded-lg w-full"
                        onChange={(e) =>
                          handleChange("industry", e.target.value)
                        }
                        value={companyData.industry}
                      >
                        <option value="Advertising">Advertising</option>
                        <option value="Aerospace">Aerospace</option>
                        <option value="Agriculture">Agriculture</option>
                        <option value="Clothing Industry">
                          Clothing Industry
                        </option>
                        <option value="Computer">Computer</option>
                        <option value="Construction">Construction</option>
                        <option value="Distribution">Distribution</option>
                        <option value="Economics">Economics</option>
                        <option value="Education">Education</option>
                        <option value="Energy">Energy</option>
                        <option value="Entrepreneurship">
                          Entrepreneurship
                        </option>
                        <option value="Entertainment">Entertainment</option>
                        <option value="Fashion">Fashion</option>
                        <option value="Financial Services">
                          Financial Services
                        </option>
                        <option value="Finance">Finance</option>
                        <option value="Fishery">Fishery</option>
                        <option value="Food Industry">Food Industry</option>
                        <option value="Food Service">Food Service</option>
                        <option value="Forestry">Forestry</option>
                        <option value="Health care">Health care</option>
                        <option value="Hospitality Industry">
                          Hospitality Industry
                        </option>
                        <option value="Humnan Resources">
                          Human Resources
                        </option>
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
                        <option value="Telecommunications">
                          Telecommunications
                        </option>
                        <option value="Trade">Trade</option>
                        <option value="Transport">Transport</option>
                        <option value="Warehouse">Warehouse</option>
                      </select>
                    </div>

                    <div className="flex flex-col gap-1 items-start">
                      <label className="text-base font-semibold text-center">
                        Company address:
                      </label>
                      <input
                        type="text"
                        placeholder="Remote"
                        className="text-sm rounded-lg w-full"
                        onChange={(e) =>
                          handleChange("company_address", e.target.value)
                        }
                        value={companyData.company_address}
                      />
                    </div>

                    <div className="flex flex-col gap-1 items-start">
                      <label className="text-base font-semibold text-center">
                        Currency:
                      </label>
                      <select
                        id="currency"
                        onChange={(e) =>
                          handleChange("currency", e.target.value)
                        }
                        className="text-sm rounded-lg w-full"
                        name="currency"
                      >
                        <option value="USD">USD</option>
                        <option value="PHP">PHP</option>
                        <option value="GBP">GBP</option>
                        <option value="MXN">MXN</option>
                      </select>
                    </div>

                    <div className="flex flex-col gap-1 items-start">
                      <label className="text-base font-semibold text-center">
                        Website:
                      </label>
                      <input
                        type="text"
                        placeholder="www.roni.ai"
                        className="text-sm rounded-lg w-full"
                        onChange={(e) =>
                          handleChange("website", e.target.value)
                        }
                        value={companyData.website}
                      />
                    </div>

                    <div className="flex flex-col gap-1 items-start">
                      <label className="text-base font-semibold text-center">
                        Are you a tech startup:
                      </label>
                      <select
                        className="text-sm rounded-lg w-full"
                        onChange={(e) =>
                          handleChange(
                            "tech_startup",
                            e.target.value === "true"
                          )
                        }
                        value={companyData.tech_startup}
                      >
                        <option value="true">Yes</option>
                        <option value="false">No</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 w-full">
                    <button
                      className="w-full text-[#EDC6D7] bg-white border border-[#EDC6D7] rounded-md px-5 py-2 font-semibold text-sm hover:opacity-80"
                      onClick={() => {
                        closeModal();
                      }}
                    >
                      Cancel
                    </button>

                    <button
                      className="w-full bg-gradient-to-r text-gray-800 from-[#EDC6D7] via-[#CDB6D6] to-[#B0A7D4] rounded-md px-5 py-2 font-semibold text-sm hover:opacity-80"
                      onClick={() => {
                        createCompany();
                      }}
                    >
                      Submit
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
