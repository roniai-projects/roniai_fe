import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const CompanyContext = createContext();

export const CompanyProvider = ({ children }) => {
  const [companies, setCompanies] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [companyDetails, setCompanyDetails] = useState(null);

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/company`, {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
          },
        });

        setCompanies(response.data);
      } catch (error) {
        console.error("Error fetching companies:", error);
      }
    };

    fetchCompanies();
  }, []);

  useEffect(() => {
    const storedCompany = localStorage.getItem("selectedCompany");
    if (storedCompany) {
      setSelectedCompany(storedCompany);
      const detailedCompany = companies.find(
        (c) => c.company_id === storedCompany
      );
      setCompanyDetails(detailedCompany);
    }
  }, [selectedCompany, companies]);

  const getCompanyNameById = (companyId) => {
    const company = companies.find((c) => c.company_id === companyId);
    return company ? company.company_name : null;
  };

  const getCompanyCurrencyById = (companyId) => {
    const company = companies.find((c) => c.company_id === companyId);
    return company ? company.company_currency : null;
  };

  const updateSelectedCompany = (companyName) => {
    setSelectedCompany(companyName);
    localStorage.setItem("selectedCompany", companyName);
    const detailedCompany = companies.find((c) => c.company_id === companyName);
    setCompanyDetails(detailedCompany);
  };

  return (
    <CompanyContext.Provider
      value={{
        companies,
        selectedCompany,
        companyDetails,
        getCompanyNameById,
        getCompanyCurrencyById,
        updateSelectedCompany,
      }}
    >
      {children}
    </CompanyContext.Provider>
  );
};

export const useCompanyContext = () => {
  return useContext(CompanyContext);
};
