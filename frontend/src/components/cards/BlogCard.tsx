import React from "react";
import { BsFillCalendar3WeekFill } from "react-icons/bs";
import { IoPersonCircle } from "react-icons/io5";
import { FaCommentAlt } from "react-icons/fa";

const BlogCard: React.FC = () => {
  return (
    <div className="p-5 bg-secondary-color rounded-[21px] grid grid-cols-1 gap-3">
      <div className="text-[24px] text-primary-color font-jua">
        How To Teach Your Kid Easily
      </div>
      <div className="flex">
        <span className="bg-primary-color rounded-[21px] px-3 font-jua py-2 text-white font-[14px] items-center inline-flex">
          <BsFillCalendar3WeekFill className="text-white mr-3" />
          30 Jun 2023
        </span>
      </div>
      <div className="font-montserrat text-[14px]">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore ducimus
        nisi accusamus et suscipit voluptatibus veniam vero itaque culpa fugit?
        Corpor
      </div>
      <div className="border-t-2 border-dark-acent-color grid grid-cols-2 pt-3 ">
        <div className="font-jua inline-flex items-center">
          <IoPersonCircle className="text-primary-color mr-2 text-[34px]" />
          <span className="font-jua text-[14px] text-dark-acent-color">
            John Doe
          </span>
        </div>
        <div className="font-jua flex justify-end items-center">
          <FaCommentAlt className="text-primary-color mr-2 text-[25px]" />
          <span className="font-jua text-[14px] text-dark-acent-color">40</span>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
