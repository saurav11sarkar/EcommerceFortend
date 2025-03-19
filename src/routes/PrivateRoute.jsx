import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router";

const PrivateRoute = ({ children, role }) => {
  const { data } = useSelector((state) => state.auth);
  const location = useLocation();
  // console.log(data);

  if (!data) {
    alert("You must be logged in!");
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (role && data.role !== role) {
    alert("You are not authorized to access this page!");
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default PrivateRoute;
