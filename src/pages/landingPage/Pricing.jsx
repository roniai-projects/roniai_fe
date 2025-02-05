import React from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { useNavigate } from "react-router-dom";

const Pricing = () => {
  const navigate = useNavigate();

  const goToPage = (path) => {
    navigate(path);
  };
  return (
    <div
      className="relative flex flex-col mx-auto
      "
    >
      {/* navbar */}
      <div className="sticky top-0 z-50 h-0 lg:h-auto xl:h-0">
        <Navbar />
      </div>

      {/* content */}
      <section className="container flex items-center min-h-screen px-6 py-12 mx-auto">
        <div
          id="pricing"
          className="flex flex-col items-center max-w-sm mx-auto text-center gap-4 relative"
        >
          {/* <h1 className="text-2xl font-semibold text-gray-800 md:text-3xl">
            We're on beta!
          </h1> */}

          {/* <button
            onClick={() => goToPage("/register")}
            className="w-10/12 self-center uppercase font-semibold px-3 py-2 bg-gradient-to-r from-[#EDC6D7] via-[#CDB6D6] to-[#B0A7D4] rounded-full text-slate-700 hover:opacity-90 ease-in transform transition duration-150"
          >
            Sign up for free
          </button> */}

          <h1 className="text-6xl font-bold w-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-52 min-w-max">
            You are not dreaming!
          </h1>

          <div className="border-b-8 w-full border-[#B0A7D4]" />
          <h2 className="self-start text-2xl font-bold text-slate-700">
            Standard
          </h2>
          <p className="self-start text-[#B0A7D4] font-bold text-6xl flex flex-row items-baseline tracking-wide">
            <span className="text-2xl self-start translate-y-1">$</span>30{" "}
            <span className="text-2xl self-start translate-y-1">.00</span>{" "}
            <span className="text-lg text-slate-700">/ user / month</span>
          </p>
          <div className="self-start flex flex-col items-start">
            <p className="text-lg font-bold">All apps</p>
            <p className="text-lg">Roni AI</p>
          </div>
        </div>
      </section>
      {/* footer */}
      <Footer />
    </div>
  );
};

export default Pricing;
