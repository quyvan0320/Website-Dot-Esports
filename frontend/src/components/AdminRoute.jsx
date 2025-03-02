import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const AdminRoute = () => {
  const { userInfo } = useSelector((state) => state.auth);
  return userInfo.role === "admin" ? <Outlet /> : <Navigate to={"/"} replace />;
};

export default AdminRoute;
