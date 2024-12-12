import Footer from "@/components/Footer";
import Header from "@/components/Header";
import React from "react";
import { IoMdHome, IoMdSettings } from "react-icons/io";
import {
  MdOutlineSubscriptions,
  MdOutlineOutlinedFlag,
  MdOutlineHelpOutline,
  MdOutlineFeedback,
} from "react-icons/md";
import { Outlet, useNavigate } from "react-router-dom";

const TeacherLayout: React.FC = () => {
  const naviagate = useNavigate();

  return (
    <>
      <Header />
      <div className="grid grid-cols-7 h-screen">
        <div className=" flex flex-col justify-between bg-dark-acent-color text-lg">
          <div className=" px-5 flex flex-col justify-center gap-1">
            <button
              className="text-white rounded-md pt-3 pb-3 pl-5 hover:bg-primary-color/40 flex justify-start gap-5 items-center"
              onClick={() => naviagate("/teacher")}
            >
              <IoMdHome />
              Home
            </button>
            <button
              className="text-white rounded-md pt-3 pb-3 pl-5 hover:bg-primary-color/40 flex justify-start gap-5 items-center"
              onClick={() => naviagate("/teacher/courses")}
            >
              <MdOutlineSubscriptions />
              Courses
            </button>
          </div>

          <div className=" px-5 flex flex-col justify-center gap-1">
            <button className="text-white rounded-md pt-3 pb-3 pl-5 hover:bg-slate-600/40 flex justify-start gap-5 items-center">
              <IoMdSettings />
              Settings
            </button>
            <button className="text-white rounded-md pt-3 pb-3 pl-5 hover:bg-slate-600/40 flex justify-start gap-5 items-center">
              <MdOutlineOutlinedFlag />
              Report History
            </button>
            <button className="text-white rounded-md pt-3 pb-3 pl-5 hover:bg-slate-600/40 flex justify-start gap-5 items-center">
              <MdOutlineHelpOutline />
              Help
            </button>
            <button className="text-white rounded-md pt-3 pb-3 pl-5 hover:bg-slate-600/40 flex justify-start gap-5 items-center">
              <MdOutlineFeedback />
              Send Feedback
            </button>
            <hr />
          </div>
        </div>
        <div className="col-span-6">
          <Outlet />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default TeacherLayout;
