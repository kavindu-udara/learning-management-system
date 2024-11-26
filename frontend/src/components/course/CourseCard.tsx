import React from "react";
import { FaStar } from "react-icons/fa6";
import { LuClock } from "react-icons/lu";
import { BsFillCalendar3WeekFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

type Props = {
  id: string;
  title: string;
  price: string;
  createdAt: string;
  isNew?: boolean | false;
  imageUrl: string;
  teacherName: string;
  teacherImage: string;
};

const CourseCard: React.FC<Props> = ({
  id,
  title,
  price,
  createdAt,
  isNew,
  imageUrl,
  teacherName,
  teacherImage,
}: Props) => {
  const navigate = useNavigate();

  const formatDate = (dateString: string) => {
    return formatter.format(new Date(dateString));
  };

  const formatter = new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  return (
    <div
      className="rounded-[21px] bg-secondary-color flex flex-col cursor-pointer hover:shadow-lg"
      onClick={() => navigate(`/course/${id}`)}
    >
      <div
        className="bg-cover rounded-t-[21px] h-[150px] w-full flex justify-end"
        style={{
          backgroundImage: `url(${imageUrl})`,
        }}
      >
        <div className="pt-3">
          {isNew && (
            <span className="bg-primary-color rounded-[21px] text-[14px] font-jua text-white px-3 py-1 mr-5">
              New
            </span>
          )}
        </div>
      </div>
      <div className="p-3 grid grid-cols-1 gap-2">
        <div className="flex items-center font-montserrat text-light-gray-color">
          <img
            src={teacherImage}
            className="rounded-full w-[30px] mr-5"
            alt=""
          />
          {teacherName}
        </div>
        <div className="font-jua text-dark-acent-color text-[24px]">
          {title}
        </div>
        <div className="flex text-[#FFC600] mb-2 items-center gap-1">
          <FaStar />
          <FaStar />
          <FaStar />
          <FaStar />
          <FaStar />
          <span className="bg-primary-color rounded-[21px] font-jua px-3 text-white text-[14px] flex items-center">
            4.5
          </span>
        </div>
        <div className="grid grid-cols-2">
          <div className="flex items-center gap-3 font-montserrat text-light-gray-color text-[13px]">
            <LuClock className="text-primary-color text-[20px]" />
            1:30 Hours
          </div>
          <div className="flex items-center gap-3 font-montserrat text-light-gray-color text-[13px]">
            <BsFillCalendar3WeekFill className="text-primary-color text-[20px]" />
            {formatDate(createdAt)}
          </div>
        </div>
        <div className="text-dark-acent-color font-jua text-[24px]">
          ${price}
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
