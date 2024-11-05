import Login from "@/pages/auth/Login";
import { RootState } from "@reduxjs/toolkit/query";
import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute: React.FC = () => {
  const currentUser = useSelector((state: RootState) => state.userReducer.user);

  const accessToken = localStorage.getItem("accessToken");
  const user = localStorage.getItem("user");

  // get access token from cookie
  // const token = document.cookie["access_token"];
  // const token = document.cookie.match(new RegExp('access_token=([^;]*)'))[1];
  // const token = document.cookie.split(';').find(cookie => cookie.trim().startsWith('access_token=')).split('=')[1];

  // if (!accessToken || !user) {
  //   return <Navigate to="/login" />;
  // }else{
  //   const currentUser = JSON.parse(user);
  // }

  return !accessToken || !user ? <Navigate to="/login" /> : <Outlet />;

  // return currentUser._id ? <Outlet /> : <Login />;
};

export default PrivateRoute;