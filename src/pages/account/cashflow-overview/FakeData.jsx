import Sidebar from "../../../components/Sidebar";
import IncomeOverview from "../../../components/chart/IncomeOverview";

const FakeData = () => {
  return (
    <div className="flex flex-row bg-gray-50 h-screen">
      <Sidebar />
      <div className={layout}>
        {/* Title */}
        <h3 className={title}>Cashflow Overview</h3>
        {/* <div className="flex flex-1 items-center justify-center">No data</div> */}
        <IncomeOverview />
      </div>
    </div>
  );
};

export default FakeData;

// Styles

const title = "font-semibold mt-2";

const layout =
  "w-full px-5 py-8 overflow-y-auto h-screen bg-gray-50 flex flex-col space-y-8";
