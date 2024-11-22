import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const TeacherRoute: React.FC = () => {
  const user = useSelector((state: any) => state.userReducer.user);

  return user.role !== "teacher" ? <Navigate to="/" /> : <Outlet />;
};

export default TeacherRoute;
