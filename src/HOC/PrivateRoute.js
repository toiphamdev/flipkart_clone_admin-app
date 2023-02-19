import { Navigate, Outlet } from "react-router-dom";

function PrivateRoute() {
  const token = window.localStorage.getItem("token");

  return token ? <Outlet /> : <Navigate to="/signin" />;
}

export default PrivateRoute;
