import React from "react";
import { useNavigate } from "react-router-dom";
import WhiteRoundedBtn from "../buttons/WhiteRoundedBtn";

type Props = {
  id: string;
  title: string;
  description: string;
};

const LargeCourseCard: React.FC<Props> = ({title, description, id} : Props) => {

  const navigate = useNavigate();

  const buttonAction = () => {
    navigate(`/course/${id}`);
  }

  return (
    <div className="rounded-lg  flex flex-row h-[200px] container gap-5 bg-[#EFF4FF]">
      <div className="basis-1/5">
        <img src="https://picsum.photos/300/200" alt="course-image" />
      </div>
      <div className="basis-4/5 py-5">
        <div className="text-2xl font-bold text-[#2563EB]">{title}</div>
        <p className="my-3 text-gray-500 text-lg">
          {description.substring(0, 150)}
        </p>
        <WhiteRoundedBtn buttonEvent={buttonAction} text="Get Started" />
      </div>
    </div>
  );
};

export default LargeCourseCard;
