import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/landingPage/Home";

// account page
import OnBoard from "./pages/account/OnBoard";
import FinancialPerformance from "./pages/account/financial-performance";
import CashflowOverview from "./pages/account/cashflow-overview";
import FinancialPlans from "./pages/account/financial-plans";
import Financing from "./pages/account/financing";
import Settings from "./pages/account/Settings";
import CreateBudget from "./pages/account/financial-plans/create-budget";
import CreateBudget2 from "./pages/account/CreateBudget";
import Chatbot2 from "./pages/account/get-started/create-a-budget/CreateBudget";
import Dashboard from "./pages/account/dashboard";
import RecordOperations from "./pages/account/record-operations";
// admin page
import Admin from "./pages/admin/Admin";

// landing page
import Login from "./pages/landingPage/Login";
import Register from "./pages/landingPage/Register";
import NoPage from "./pages/NoPage";

// auth
import PrivateRoutes from "./utils/PrivateRoutes";
import Pricing from "./pages/landingPage/Pricing";
import ApplyLoan from "./pages/account/financing/ApplyLoan";
import FakeData from "./pages/account/cashflow-overview/FakeData";
import NewBusiness from "./pages/account/financial-plans/create-budget/NewBusiness";
import ExistingBusiness from "./pages/account/financial-plans/create-budget/ExistingBusiness";
import BalanceSheet from "./pages/account/balance-sheet";
import EditBalanceSheet from "./pages/account/balance-sheet/BalanceSheet";
import Upload from "./pages/account/balance-sheet/Upload";
import PrepareMyBalanceSheet from "./pages/account/balance-sheet/prepare-my-balance-sheet/PrepareMyBalanceSheet";
import Invoice from "./pages/account/record-operations/Invoice";
import Payroll from "./pages/account/record-operations/Payroll";
import PurchaseRequisitionForm from "./pages/account/record-operations/PurchaseRequisitionForm";
import Reports from "./pages/account/reports";
import InvoiceReport from "./pages/account/reports/invoices";

function App() {
  return (
    <Router>
      <Routes>
        {/* protected routes */}
        <Route element={<PrivateRoutes />}>
          <Route element={<Dashboard />} path="/dashboard" />
          <Route element={<FakeData />} path="/cashflow-overview/1" />
          <Route element={<CashflowOverview />} path="/cashflow-overview" />
          <Route element={<Chatbot2 />} path="/chat-with-roni" />
          <Route element={<Chatbot2 />} path="/chat-with-roni">
            <Route path=":sessionId" element={<Chatbot2 />} />
          </Route>
          <Route
            element={<FinancialPerformance />}
            path="/financial-performance"
          />

          <Route element={<RecordOperations />} path="/record-operations" />
          <Route element={<Invoice />} path="/record-operations/invoice" />
          <Route element={<Payroll />} path="/record-operations/payroll" />
          <Route
            element={<PurchaseRequisitionForm />}
            path="/record-operations/purchase-requisition-form"
          />
          <Route element={<FinancialPlans />} path="/financial-plans" />
          <Route
            element={<CreateBudget />}
            path="/financial-plans/create-a-budget"
          />
          <Route
            element={<NewBusiness />}
            path="/financial-plans/create-a-budget/new-business"
          />
          <Route
            element={<ExistingBusiness />}
            path="/financial-plans/create-a-budget/existing-business"
          />
          <Route element={<CreateBudget2 />} path="/create-a-budget" />
          <Route element={<Financing />} path="/financing" />
          <Route element={<ApplyLoan />} path="/financing/apply-loan" />

          <Route element={<BalanceSheet />} path="/balance-sheet" />
          <Route
            element={<EditBalanceSheet />}
            path="/balance-sheet/edit-balance-sheet"
          />
          <Route element={<Upload />} path="/balance-sheet/upload" />
          <Route
            element={<PrepareMyBalanceSheet />}
            path="/balance-sheet/prepare-my-balance-sheet"
          />
          <Route element={<Reports />} path="/reports" />
          <Route path="/reports/invoice/:invoice_id" element={<InvoiceReport />} />

          <Route element={<OnBoard />} path="/onboard" />
          <Route element={<Settings />} path="/settings" />
        </Route>

        {/* public routes */}
        <Route element={<Home />} path="/" exact />
        <Route element={<Login />} path="/login" />
        <Route element={<Register />} path="/register" />
        <Route element={<Pricing />} path="/pricing" />
        <Route element={<Admin />} path="/admin" />

        {/* catch all non-existing routes */}
        <Route element={<NoPage />} path="*" />
      </Routes>
    </Router>
  );
}

export default App;
