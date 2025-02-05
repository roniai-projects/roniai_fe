import Sidebar from "../../../components/Sidebar";
import createBudget from "../../../assets/createBudget.svg";
import { Link } from "react-router-dom";

const FinancialPlans = () => {
  return (
    <div className="flex flex-row bg-gray-50 h-screen">
      <Sidebar />
      <div className={layout}>
        {/* Title */}
        <h3 className={title}>Financial Plans</h3>
        <div className="rounded-xl bg-white p-4 text-center shadow text-sm flex flex-col items-center justify-center space-y-4">
          <h2 className="border-b border-black uppercase font-semibold pb-1 w-full">
            create a budget
          </h2>
          <img
            src={createBudget}
            alt="create a budget illustration"
            className="max-h-56"
          />
          <h1 className="font-semibold text-lg">
            Hi, I’m Roni, your AI finance assistant.
          </h1>
          <div>
            <span className="uppercase font-semibold">
              Transform your business finances effortlessly:
            </span>
            <ul>
              <li>&bull; Automated 1-year budget creation</li>
              <li>&bull; Automated 3-statement financial forecast</li>
              <li>&bull; Perfect for both existing and new ventures</li>
            </ul>
          </div>
          <Link
            to={"./create-a-budget"}
            className="self-center font-semibold px-3 py-2 bg-gradient-to-r from-[#EDC6D7] via-[#CDB6D6] to-[#B0A7D4] rounded text-slate-700 hover:opacity-90 ease-in transform transition duration-150 w-fit"
          >
            Let's go
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FinancialPlans;

// Styles

const title = "font-semibold mt-2";

const layout =
  "w-full px-5 py-8 overflow-y-auto h-screen bg-gray-50 flex flex-col space-y-8";
