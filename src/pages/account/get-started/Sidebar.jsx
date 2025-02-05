import logo from "../../../assets/logo.png";
import germee from "../../../assets/germee.jpeg";
import {
  HomeOutlined,
  LineChartOutlined,
  CheckSquareOutlined,
  BookOutlined,
  SettingOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import LogOutModal from "../../../components/LogoutModal";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  const navigate = useNavigate();

  const goToPage = (path) => {
    navigate(path);
  };

  const navigations = [
    {
      name: "Financial Performance",
      path: "/financial-performance",
      icon: <HomeOutlined />,
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
    { name: "Settings", path: "/settings", icon: <SettingOutlined /> },
  ];
  return (
    <>
      <LogOutModal isOpen={isOpen} setIsOpen={setIsOpen} />
      <aside className="fixed md:static z-10 flex flex-col items-center w-16 h-screen py-8 overflow-y-auto bg-white border-r">
        <nav className="flex flex-col flex-1 space-y-6">
          <button onClick={() => goToPage("/financial-performance")}>
            <img className="w-auto h-8 mx-auto" src={logo} />
          </button>
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
                  alignItems: "center", // Align items vertically centered
                  fontSize: "1.2rem",
                }}
              >
                {navigation.icon}
              </span>
            </a>
          ))}
        </nav>

        <div className="flex flex-col space-y-6">
          <button
            onClick={() => setIsOpen(true)}
            className="text-gray-500 transition-colors duration-200 hover:text-[#DBC7C8]"
          >
            <LogoutOutlined style={{ fontSize: "1.3rem" }} />
          </button>
          <button
            onClick={() => {
              goToPage("../settings");
            }}
          >
            <img
              className="object-cover w-8 h-8 rounded-full"
              src={germee}
              alt="avatar"
            />
          </button>
        </div>
      </aside>
    </>
  );
}
