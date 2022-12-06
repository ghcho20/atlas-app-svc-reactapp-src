import React, { useContext } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { UserContext } from "../contexts/user-context.js";

const PrivateRoute = () => {
  const { user } = useContext(UserContext);
  const location = useLocation();
  const redirectLoginUrl =
    `/login?redirectTo=${encodeURI(location.pathname)}` +
    (location.search === "" ? "" : `${encodeURI(location.search)}`);

  return !user ? <Navigate to={redirectLoginUrl} /> : <Outlet />;
};

export default PrivateRoute;
