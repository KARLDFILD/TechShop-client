import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useContext } from "react";
import { Context } from "../main";
import { LOGIN_ROUTE } from "../utils/const";

const ProtectedRoute = ({ role }) => {
  const { user } = useContext(Context);

  if (!user.isAuth || (role && !user.hasRole(role))) {
    return <Navigate to={LOGIN_ROUTE} />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
