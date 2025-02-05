import { Outlet, Navigate } from "react-router-dom";
import { CompanyProvider } from "../context/CompanyProvider";

const PrivateRoutes = () => {
  // Fetch the token from local storage
  const token = localStorage.getItem("jwtToken");

  // Check if the token exists and is valid (you may have other validation logic)
  const isAuthenticated = token !== null;

  return isAuthenticated ? (
    <CompanyProvider>
      <Outlet />
    </CompanyProvider>
  ) : (
    <Navigate to="/login" />
  );
};

export default PrivateRoutes;
