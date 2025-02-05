import { useNavigate } from "react-router-dom";
import logo from "../assets/logo-wide.png";
import { useState } from "react";
import { MenuOutlined, CloseOutlined } from "@ant-design/icons";

export default function Navbar() {
  const [isToggled, setIsToggled] = useState(false);
  const navigate = useNavigate();

  const goToPage = (path) => {
    navigate(path);
  };

  const toggleNavbar = () => {
    setIsToggled(!isToggled);
  };
  return (
    <>
      <nav className="flex w-full flex-row justify-between items-center px-6 py-4 bg-white text-sm font-alata shadow">
        <a
          onClick={() => {
            goToPage("/");
          }}
        >
          <img
            src={logo}
            alt="Roni AI logo"
            className="w-auto h-10 cursor-pointer"
          />
        </a>

        <ul className="hidden lg:flex flex-row items-center gap-5">
          <li>
            <a
              href="#home"
              className={`py-3 px-4 hover:opacity-80`}
              onClick={() => {
                goToPage("/");
              }}
            >
              Home
            </a>
          </li>
          <li>
            <button
              className={`py-3 px-4 hover:opacity-80`}
              onClick={() => {
                goToPage("/pricing");
              }}
            >
              Pricing
            </button>
          </li>

          <li>
            <a
              href="#faqs"
              className={`py-3 px-4 hover:opacity-80`}
              onClick={() => {
                goToPage("/");
              }}
            >
              FAQs
            </a>
          </li>
          <li>
            <a
              href="#contact"
              onClick={() => {
                goToPage("/");
              }}
              className={`py-3 px-4 hover:opacity-80`}
            >
              Contact Us
            </a>
          </li>
        </ul>
        <div className="hidden lg:flex flex-row items-center gap-4 text-sm font-sans">
          <button
            onClick={() => {
              goToPage("/register");
            }}
            className="w-fit self-center px-3 py-2 bg-gradient-to-r from-[#EDC6D7] via-[#CDB6D6] to-[#B0A7D4] rounded-lg text-slate-700 hover:opacity-90 ease-in transform transition duration-150 text-sm"
          >
            Get Started
          </button>
          <button
            onClick={() => {
              goToPage("/login");
              // setIsOpen(true);
            }}
            className="w-fit self-center px-4 py-2 bg-gradient-to-r rounded-lg text-[#B0A7D4] hover:opacity-90 border-[#B0A7D4] border ease-in transform transition duration-150 text-sm"
          >
            Log In
          </button>
        </div>

        {/* navcontrol */}
        <button className="lg:hidden" onClick={toggleNavbar}>
          {isToggled ? (
            <CloseOutlined style={{ fontSize: "1.5rem" }} />
          ) : (
            <MenuOutlined style={{ fontSize: "1.5rem" }} />
          )}
        </button>
      </nav>
      <nav
        className={`absolute h-screen w-full z-50 ${
          isToggled
            ? "-translate-x-0 transition-transform ease-in shadow duration-200"
            : "-translate-x-full transition-transform ease-in duration-200"
        }`}
      >
        <ul className="flex flex-col gap-2 font-semibold px-4 pb-6 bg-white border-b-2">
          <li>
            <a
              href="#home"
              className={`py-3 px-4 hover:opacity-80 w-full flex flex-1 justify-center`}
              onClick={() => {
                goToPage("/");
              }}
            >
              Home
            </a>
          </li>
          <li>
            <a
              href="#pricing"
              className={`py-3 px-4 hover:opacity-80 w-full flex flex-1 justify-center`}
              onClick={() => {
                goToPage("/pricing");
              }}
            >
              Pricing
            </a>
          </li>
          <li>
            <a
              href="#faqs"
              className={`py-3 px-4 hover:opacity-80 w-full flex flex-1 justify-center`}
              onClick={() => {
                goToPage("/");
              }}
            >
              FAQs
            </a>
          </li>
          <li>
            <a
              href="#contact"
              className={`py-3 px-4 hover:opacity-80 w-full flex flex-1 justify-center`}
              onClick={() => {
                goToPage("/");
              }}
            >
              Contact Us
            </a>
          </li>

          <li>
            <button
              onClick={() => {
                goToPage("/register");
              }}
              className="w-full self-center uppercase font-semibold px-3 py-2 bg-gradient-to-r from-[#EDC6D7] via-[#CDB6D6] to-[#B0A7D4] rounded text-slate-700 hover:opacity-90 ease-in transform transition duration-150"
            >
              Get Started
            </button>
          </li>
          <li>
            <button
              onClick={() => {
                goToPage("/login");
                // setIsOpen(true);
              }}
              className="w-full self-center uppercase font-semibold px-3 py-2 bg-gradient-to-r rounded text-[#B0A7D4] hover:opacity-90 border-[#B0A7D4] border ease-in transform transition duration-150"
            >
              login
            </button>
          </li>
        </ul>
        <button
          onClick={toggleNavbar}
          className="w-full h-full bg-transparent"
        />
      </nav>
      {/* <div className="text-xs md:text-sm font-bold text-white bg-black w-full py-2 md:py-4 text-center opacity-90">
        Be one of our waitlist and GAIN
        <button
          onClick={() => goToPage("/register")}
          className="text-[#DBC7C8] ml-1 hover:opacity-80 cursor-pointer"
        >
          EXCLUSIVE LIFETIME BENEFITS
        </button>
        . LIMITED TIME OFFER until October 25.
      </div> */}
    </>
  );
}
