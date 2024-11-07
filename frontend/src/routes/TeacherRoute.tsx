import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const TeacherRoute: React.FC = () => {
  const accessToken = localStorage.getItem("accessToken");
  const user = localStorage.getItem("user");

  //   covert user to json
  const userJson = JSON.parse(user!);

  return !accessToken || userJson.role !== "teacher" ? (
    <Navigate to="/" />
  ) : (
    <Outlet />
  );
};

export default TeacherRoute;
