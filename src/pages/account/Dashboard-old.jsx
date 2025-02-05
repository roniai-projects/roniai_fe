// imports
import Sidebar from "../../components/Sidebar";
import IncomeOverview from "../../components/chart/IncomeOverview";

const Dashboard = () => {
  return (
    <div className="flex flex-row bg-gray-50 h-screen">
      <Sidebar />
      <div className={layout}>
        {/* Title */}
        <h3 className={title}>Dashboard</h3>

        {/* Section 1 - Overview */}
        <div className={section1}>
          <div className="p-4 bg-white rounded-xl shadow-md flex flex-col gap-1">
            <p className="font-semibold">Today's Sales</p>
            <p className="text-2xl font-bold text-gray-800">USD 2,500</p>
            <p className="text-xs">
              You need extra <span className="text-[#DBC7C8]">4,000</span> to
              hit your goal
            </p>
          </div>

          <div className="p-4 bg-white rounded-xl shadow-md flex flex-col gap-1">
            <p className="font-semibold">Daily Sales Target</p>
            <p className="text-2xl font-bold text-gray-800">USD 6,500</p>
            <p className="text-xs">
              You need extra <span className="text-[#DBC7C8]">4,000</span> to
              hit your goal
            </p>
          </div>

          <div className="p-4 bg-white rounded-xl shadow-md flex flex-col gap-1">
            <p className="font-semibold">Monthly Goal</p>
            <p className="text-2xl font-bold text-gray-800">USD 150,000</p>
            <p className="text-xs">
              You made extra <span className="text-[#DBC7C8]">50,000</span> this
              month
            </p>
          </div>
        </div>

        {/* Section 2 */}
        <div className={section2}>
          {/* Income Overview */}
          <div className="flex flex-col space-y-6">
            <h3 className={title}>Income Overview</h3>
            <IncomeOverview />
          </div>
          {/* Just for you */}
          <div className="flex flex-col space-y-6 w-full">
            <h3 className={title}>Just For You</h3>
            <div className="grid grid-cols-1 gap-5 text-sm text-gray-600">
              <div className="p-4 bg-white rounded-xl shadow-md flex flex-col gap-1 w-full">
                <p className="font-semibold">Complete your profile</p>
                <div className="relative h-2 rounded-md overflow-hidden bg-gray-300">
                  <div
                    className="absolute top-0 left-0 h-full bg-[#DBC7C8]"
                    style={{ width: "32%" }}
                  ></div>
                </div>
                <p className="text-xs">
                  Your profile is <span className="text-[#DBC7C8]">32%</span>{" "}
                  complete
                </p>
              </div>

              <div className="p-4 bg-white rounded-xl shadow-md flex flex-col gap-1 w-full leading-4">
                <p className="font-semibold">How do I maximize Roni AI?</p>
                <div className="flex flex-row justify-between gap-5">
                  <p className="text-xs truncate w-3/5">
                    Navigating the Post-Pandemic Financial Landscape: Strategies
                    for Success
                  </p>
                  <a href="#" className="text-xs text-[#B0A7D4]">
                    read article
                  </a>
                </div>

                <div className="flex flex-row justify-between gap-5">
                  <p className="text-xs truncate w-3/5">
                    Investment Opportunities in the Digital Age: Unlocking
                    Growth in the Financial Sector
                  </p>
                  <a href="#" className="text-xs text-[#B0A7D4]">
                    read article
                  </a>
                </div>

                <div className="flex flex-row justify-between gap-5">
                  <p className="text-xs truncate w-3/5">
                    Mastering Personal Finance: Proven Tips and Tricks for
                    Building Wealth
                  </p>
                  <a href="#" className="text-xs text-[#B0A7D4]">
                    read article
                  </a>
                </div>
              </div>

              <div className="p-4 bg-white rounded-xl shadow-md flex flex-col gap-1 w-full">
                <p className="font-semibold">Help & Chat Support</p>
                <p className="text-xs">
                  Typically replies within{" "}
                  <span className="text-[#DBC7C8]">5</span> mins
                </p>
                <button className="w-fit px-3 py-2 mt-4 text-gray-800 rounded-md bg-gradient-to-r from-[#EDC6D7] via-[#CDB6D6] to-[#B0A7D4] font-bold hover:opacity-80">
                  Need Help?
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

// Styles

const title = "font-semibold mt-2";

const layout =
  "w-full px-5 py-8 overflow-y-auto h-screen bg-gray-50 flex flex-col space-y-8";

const section1 =
  "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 text-sm text-gray-600";

const section2 = "flex flex-col lg:flex-row gap-5 w-full";
