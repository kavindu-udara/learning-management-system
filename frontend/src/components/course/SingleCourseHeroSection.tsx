import React from "react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { FaCircleDot } from "react-icons/fa6";

type Props = {
  category: string;
  title: string;
  description: string;
  price?: number;
  onClickFunc: () => void;
  deleteBtnFunc?: () => void;
  isEditable?: boolean;
  imageUrl: string;
  teacherName: string;
  teacherImage: string;
};

const SingleCourseHeroSection: React.FC<Props> = ({
  category,
  title,
  description,
  price,
  onClickFunc,
  deleteBtnFunc,
  isEditable = false,
  imageUrl,
  teacherName,
  teacherImage,
}: Props) => {
  return (
    <div className="bg-white grid grid-cols-1 lg:flex justify-center">
      <div className="container flex lg:flex-row flex-col-reverse py-10 gap-10">
        <div className="lg:basis-1/2 lg:mx-0 mx-5">
          <Badge variant="outline" className="bg-white">
            {category}
          </Badge>
          <div className="text-3xl font-jua text-dark-acent-color my-3">
            {title}
          </div>
          <p className="text-gray-500 font-montserrat">{description}</p>
          <div className="flex items-center">
            <img
              src={teacherImage}
              className="rounded-full w-[30px] mr-5"
              alt="teacher-image"
            />
            <p className="text-dark-acent-color my-5 font-montserrat">
              {teacherName}
            </p>
          </div>
          <p className="text-dark-acent-color my-5 font-jua text-3xl">
            ${price}
          </p>
          {isEditable && (
            <Button className="bg-red-500" onClick={() => deleteBtnFunc?.()}>
              Delete Course
            </Button>
          )}
        </div>
        <div className="lg:basis-1/2 lg:flex lg:justify-end mx-5 lg:mx-0">
          <div className="flex items-center h-full">
            <div className="flex flex-col w-[500px] bg-secondary-color rounded-[21px]">
              <div
                className="h-[200px] w-full rounded-t-[21px]"
                style={{
                  backgroundImage: `url(${imageUrl})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              ></div>
              <div className="p-3">
                <button
                  className="bg-primary-color rounded-[21px] text-white text-[18px] p-2 font-bahnschrift w-full"
                  onClick={() => onClickFunc()}
                >
                  {isEditable ? "Edit Course" : "Start Course"}
                </button>
                <ul className="mt-3 text-gray-500 font-montserrat">
                  <li className="flex items-center gap-3 mt-2">
                    <FaCircleDot />
                    26 Video Lesson
                  </li>
                  <li className="flex items-center gap-3 mt-2">
                    <FaCircleDot />
                    Access on desktop, tablet and mobile
                  </li>
                  <li className="flex items-center gap-3 mt-2">
                    <FaCircleDot />
                    Full lifetime access
                  </li>
                  <li className="flex items-center gap-3 mt-2">
                    <FaCircleDot />
                    Cerificate of Completion
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleCourseHeroSection;
