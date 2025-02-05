import Sidebar from "../../../components/Sidebar";
import wallet from "../../../assets/wallet.svg";
import { Link } from "react-router-dom";

const Financing = () => {
  return (
    <div className="flex flex-row bg-gray-50 h-screen">
      <Sidebar />
      <div className={layout}>
        {/* Title */}
        <h3 className={title}>Financing</h3>
        <div className="rounded-xl bg-white p-4 text-center shadow text-sm flex flex-col items-center justify-center space-y-4">
          <h2 className="border-b border-black uppercase font-semibold pb-1 w-full">
            apply for a loan
          </h2>
          <img src={wallet} alt="wallet" className="max-h-56" />
          <h1 className="font-semibold text-lg">
            Hi, I can help you connect with potential lenders.
          </h1>
          <p>
            To facilitate connections with potential lenders, kindly provide
            your insights by answering a few essential questions. Your input
            will pave the way for tailored solutions and seamless interactions
            with lending partners. Let's embark on this journey together.
          </p>
          <Link to={"./apply-loan"} className="self-center font-semibold px-3 py-2 bg-gradient-to-r from-[#EDC6D7] via-[#CDB6D6] to-[#B0A7D4] rounded text-slate-700 hover:opacity-90 ease-in transform transition duration-150 w-fit">Answer now</Link>
        </div>
      </div>
    </div>
  );
};

export default Financing;

// Styles

const title = "font-semibold mt-2";

const layout =
  "w-full px-5 py-8 overflow-y-auto h-screen bg-gray-50 flex flex-col space-y-8";
