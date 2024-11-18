import React from "react";
import { Badge } from "../ui/badge";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";

type Props = {
  categoryText: string;
  titleText: string;
  priceText: string;
  courseId: string;
  isEditable?: boolean | false;
};

const MediumCourseCard: React.FC<Props> = ({
  categoryText,
  titleText,
  priceText,
  courseId,
  isEditable = false,
}: Props) => {
  const navigate = useNavigate();

  const goToEditCoursePage = () => {
    navigate(`/teacher/edit-course/${courseId}`);
  };

  return (
    <div className="rounded-[21px] bg-secondary-color flex flex-row p-5 cursor-pointer">
      <div className="basis-1/3 flex items-center justify-center">
        <img src="https://picsum.photos/300/200" className="rounded-[21px]" alt="course-image" />
      </div>
      <div className="basis-2/3 pl-5 flex flex-col">
        <div>
          <Badge>{categoryText}</Badge>
        </div>
        <Link
          to={`/course/${courseId}`}
          className=" my-3 text-xl font-jua text-primary-color"
        >
          {titleText}
        </Link>
        <p className="text-lg text-dark-acent-color font-jua">${priceText}</p>
        <div>
          {isEditable && (
            <Button onClick={() => goToEditCoursePage()} className="rounded-[21px]">Edit</Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default MediumCourseCard;
