import Footer from "@/components/Footer";
import Header from "@/components/Header";
import React from "react";
import { IoMdHome, IoIosArrowForward, IoMdSettings } from "react-icons/io";
import { SiYoutubeshorts } from "react-icons/si";
import {
  MdOutlineSubscriptions,
  MdPodcasts,
  MdOutlineAccessTime,
  MdOutlineOutlinedFlag,
  MdOutlineHelpOutline,
  MdOutlineFeedback,
} from "react-icons/md";
import { FaHistory } from "react-icons/fa";
import { RiPlayList2Fill } from "react-icons/ri";
import { PiVideoBold } from "react-icons/pi";
import { AiOutlineLike } from "react-icons/ai";
import { IoCut } from "react-icons/io5";
import { Outlet } from "react-router-dom";

const TeacherLayout: React.FC = () => {
  return (
    <>
      <Header />
      <div className="grid grid-cols-7 h-screen">
        <div className="bg-gray-600 grid grid-cols-1 overflow-y-scroll  text-lg">
          <div className="bg-black px-5 flex flex-col justify-center gap-1">
            <button className="text-white rounded-md pt-3 pb-3 pl-5 hover:bg-slate-600/40 flex justify-start gap-5 items-center">
              <IoMdHome />
              Home
            </button>
            <button className="text-white rounded-md pt-3 pb-3 pl-5 hover:bg-slate-600/40 flex justify-start gap-5 items-center">
              <SiYoutubeshorts />
              Shorts
            </button>
            <button className="text-white rounded-md pt-3 pb-3 pl-5 hover:bg-slate-600/40 flex justify-start gap-5 items-center">
              <MdOutlineSubscriptions />
              Subscription
            </button>
            <hr />
          </div>

          <div className="bg-black px-5 flex flex-col justify-center gap-1">
            <button className="text-white rounded-md pt-3 pb-3 pl-5 hover:bg-slate-600/40 flex justify-start gap-5 items-center">
              You
              <IoIosArrowForward />
            </button>
            <button className="text-white rounded-md pt-3 pb-3 pl-5 hover:bg-slate-600/40 flex justify-start gap-5 items-center">
              <RiPlayList2Fill />
              Playlist
            </button>

            <button className="text-white rounded-md pt-3 pb-3 pl-5 hover:bg-slate-600/40 flex justify-start gap-5 items-center">
              <FaHistory />
              History
            </button>

            <button className="text-white rounded-md pt-3 pb-3 pl-5 hover:bg-slate-600/40 flex justify-start gap-5 items-center">
              <PiVideoBold />
              Your Videos
            </button>

            <button className="text-white rounded-md pt-3 pb-3 pl-5 hover:bg-slate-600/40 flex justify-start gap-5 items-center">
              <MdPodcasts />
              Your Podcasts
            </button>

            <button className="text-white rounded-md pt-3 pb-3 pl-5 hover:bg-slate-600/40 flex justify-start gap-5 items-center">
              <MdOutlineAccessTime />
              Watch Later
            </button>

            <button className="text-white rounded-md pt-3 pb-3 pl-5 hover:bg-slate-600/40 flex justify-start gap-5 items-center">
              <AiOutlineLike />
              Liked Videos
            </button>

            <button className="text-white rounded-md pt-3 pb-3 pl-5 hover:bg-slate-600/40 flex justify-start gap-5 items-center">
              <IoCut />
              Your Clips
            </button>

            <hr />
          </div>

          <div className="bg-black px-5 flex flex-col justify-center gap-1">
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
