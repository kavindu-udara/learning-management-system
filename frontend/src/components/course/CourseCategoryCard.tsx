import React from "react";

interface Props {
    title: string
}

const CourseCategoryCard: React.FC<Props> = ({title} : Props) => {

  return (
    <div className="bg-secondary-color p-3 rounded-[21px] font-jua text-[20px] text-dark-acent-color text-center cursor-pointer flex items-center justify-center">
      {title}
    </div>
  );
};

export default CourseCategoryCard;
