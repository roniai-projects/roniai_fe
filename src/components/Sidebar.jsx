import { useLocation, useNavigate } from "react-router-dom";
import logo from "../assets/logo-wide.png";
import icon from "../assets/logo.png";
import user from "../assets/user.png";
import { useCompanyContext } from "../context/CompanyProvider";

import {
  HomeOutlined,
  AreaChartOutlined,
  AuditOutlined,
  LineChartOutlined,
  CheckSquareOutlined,
  BookOutlined,
  SettingOutlined,
  LogoutOutlined,
  PlusOutlined,
  BorderlessTableOutlined,
  AlignCenterOutlined,
} from "@ant-design/icons";
import { useState, useEffect } from "react";
import LogOutModal from "./LogoutModal";
import { useSelector, useDispatch } from "react-redux";
import { getUserDetails } from "../redux/userReducer";
import CreateCompany from "./CreateCompany";

export default function Sidebar() {
  const { companies, selectedCompany, updateSelectedCompany } =
    useCompanyContext();
  const userData = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);

  const navigate = useNavigate();

  const goToPage = (path) => {
    navigate(path);
  };

  const navigations = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: <HomeOutlined />,
    },
    {
      name: "Financial Performance",
      path: "/financial-performance",
      icon: <AreaChartOutlined />,
    },
    {
      name: "Cashflow Overview",
      path: "/cashflow-overview",
      icon: <LineChartOutlined />,
    },
    {
      name: "Financial Plans",
      path: "/financial-plans",
      icon: <CheckSquareOutlined />,
    },
    { name: "Financing", path: "/financing", icon: <BookOutlined /> },
    {
      name: "Financial Statements",
      path: "/balance-sheet",
      icon: <BorderlessTableOutlined />,
    },
    {
      name: "Record Operations",
      path: "/record-operations",
      icon: <AuditOutlined />,
    },
    {
      name: "Reports",
      path: "/reports",
      icon: <AlignCenterOutlined />,
    },

    { name: "Settings", path: "/settings", icon: <SettingOutlined /> },
  ];

  useEffect(() => {
    dispatch(getUserDetails());
  }, []);

  const handleCompanyChange = (e) => {
    const selectedCompany = e.target.value;
    updateSelectedCompany(selectedCompany);
    // Optionally, navigate to a different route when the company changes
    // navigate(`/dashboard`);
  };

  return (
    <div>
      <LogOutModal isOpen={isOpen} setIsOpen={setIsOpen} />
      <CreateCompany isOpen2={isOpen2} setIsOpen2={setIsOpen2} />

      <aside className="flex flex-col min-w-max md:min-w-min lg:w-64 h-full min-h-screen px-2 md:px-5 py-8 overflow-y-auto hide-scrollbar bg-white border-r font-alata">
        <button onClick={() => goToPage("/dashboard")}>
          <img className="w-auto h-10 hidden md:block" src={logo} alt="" />
          <img
            className="w-auto h-8 mx-auto block md:hidden"
            src={icon}
            alt=""
          />
        </button>

        <div className="flex flex-col justify-between flex-1 mt-6">
          <nav className="flex-1 mx-auto md:-mx-3 space-y-4">
            <a
              className="rounded-lg px-3 py-2 text-sm bg-gradient-to-r from-[#EDC6D7] via-[#CDB6D6] to-[#B0A7D4] text-gray-700 font-semibold shadow hover:opacity-80 cursor-pointer flex "
              onClick={() => goToPage("/chat-with-roni")}
            >
              <PlusOutlined style={{ fontSize: "1.2rem" }} />

              <span className="mx-2 text-sm font-medium hidden md:block">
                Chat with Roni
              </span>
            </a>
            {navigations.map((navigation, index) => (
              <a
                key={index}
                className={`flex cursor-pointer items-center w-fit md:w-full px-3 py-2 transition-colors duration-300 transform hover:bg-black hover:text-[#DBC7C8] rounded-lg ${
                  location.pathname === navigation.path
                    ? "bg-black text-[#DBC7C8]"
                    : "text-gray-600"
                }`}
                onClick={() => goToPage(navigation.path)}
              >
                <span
                  style={{
                    display: "flex",
                    alignItems: "center",
                    fontSize: "1.2rem",
                  }}
                >
                  {navigation.icon}
                </span>

                <span className="mx-2 text-sm font-medium hidden md:block">
                  {navigation.name}
                </span>
              </a>
            ))}
          </nav>

          <div className="mt-6">
            <div className="flex flex-row gap-3 items-center">
              <select
                id="company_name"
                name="company_name"
                className="rounded-lg w-full px-3 py-2 text-sm text-gray-700 font-semibold shadow hover:opacity-80 transition-all duration-150 ease-in cursor-pointer flex ring-2 ring-[#B0A7D4]"
                onChange={handleCompanyChange}
                value={selectedCompany || "none"}
              >
                {companies.map((company) => (
                  <option key={company.company_id} value={company.company_id}>
                    {company.company_name}
                  </option>
                ))}
              </select>
              <button
                className="w-auto flex items-center rounded-lg ring-2 ring-[#B0A7D4] shadow bg-[#B0A7D4] hover:opacity-80 transition-all duration-150 ease-in"
                onClick={() => setIsOpen2(true)}
              >
                <PlusOutlined style={{ fontSize: "1.2rem", padding: "7px" }} />
              </button>
            </div>

            <div className="flex flex-col-reverse md:flex-row items-center gap-6 md:gap-0 justify-between mt-4">
              <button
                onClick={() => {
                  goToPage("../settings");
                }}
                className="flex items-center gap-x-2"
              >
                <img
                  className="object-cover rounded-full h-8 w-8"
                  src={user}
                  alt="avatar"
                />
                <span className="text-sm font-medium text-gray-700 hidden md:block truncate">
                  {userData.email}
                </span>
              </button>

              <button
                onClick={() => setIsOpen(true)}
                className="text-gray-500 transition-colors duration-200 hover:text-[#DBC7C8]"
              >
                <LogoutOutlined style={{ fontSize: "1.2rem" }} />
              </button>
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
}
