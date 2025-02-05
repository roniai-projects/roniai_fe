import logo from "../../assets/logo-wide.png";
import icon from "../../assets/logo.png";
import { HomeOutlined, LogoutOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { getUserDetails } from "../../redux/userReducer";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import LogOutModal from "../../components/LogoutModal";

const AdminNav = ({ setIsLoggedIn }) => {
  const navigate = useNavigate();
  const userData = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);

  const goToPage = (path) => {
    navigate(path);
  };

  const navigations = [
    {
      name: "Manage Users",
      path: "/admin",
      icon: <HomeOutlined />,
    },
  ];

  // const handleSuccessfulLogout = () => {
  //   localStorage.removeItem("jwtToken");
  //   setIsLoggedIn(false);
  // };

  useEffect(() => {
    dispatch(getUserDetails());
  }, []);
  return (
    <>
      <LogOutModal isOpen={isOpen} setIsOpen={setIsOpen} />
      <aside className="flex flex-col min-w-max md:min-w-min lg:w-64 h-full min-h-screen px-2 md:px-5 py-8 overflow-y-auto bg-white border-r">
        <button onClick={() => goToPage("/financial-performance")}>
          <img className="w-auto h-10 hidden md:block" src={logo} alt="" />
          <img
            className="w-auto h-8 mx-auto block md:hidden"
            src={icon}
            alt=""
          />
        </button>

        <div className="flex flex-col justify-between flex-1 mt-6">
          <nav className="flex-1 mx-auto md:-mx-3 space-y-4">
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
            <div className="flex flex-col-reverse md:flex-row items-center gap-6 md:gap-0 justify-between mt-6">
              <div className="flex items-center gap-x-2">
                <img
                  className="object-cover rounded-full h-8 w-8"
                  src={icon}
                  alt="avatar"
                />
                <span className="text-sm font-medium text-gray-700 hidden md:block">
                  {userData.email}
                </span>
              </div>

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
    </>
  );
};

export default AdminNav;
