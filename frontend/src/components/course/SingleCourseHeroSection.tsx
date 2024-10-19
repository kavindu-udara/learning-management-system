import React from "react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";

type Props = {
  category: string;
  title: string;
  description: string;
  onClickFunc: () => void;
  isEditable: boolean;
};

const SingleCourseHeroSection: React.FC<Props> = ({
  category,
  title,
  description,
  onClickFunc,
  isEditable = false,
}: Props) => {
  return (
    <div className="bg-[#EFF4FF] flex justify-center">
      <div className="container flex flex-row py-10 gap-10">
        <div className="basis-1/2">
          <Badge variant="outline" className="bg-white">
            {category}
          </Badge>
          <div className="text-3xl font-bold text-[#2563EB] my-3">{title}</div>
          <p className="text-gray-500">{description}</p>
          <Button className="mt-5 mx-3" onClick={() => onClickFunc()}>
            {isEditable ? "Edit Course" : "Start Course"}
          </Button>
          {isEditable && <Button className="bg-red-500">Delete Course</Button>}
        </div>
        <div className="basis-1/2">
          <img src="https://picsum.photos/500/300" alt="" />
        </div>
      </div>
    </div>
  );
};

export default SingleCourseHeroSection;
