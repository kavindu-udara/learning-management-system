import React from "react";

const CourseTabs: React.FC = () => {
  return (
    <div className="border-b flex flex-wrap gap-5 text-lg pb-3">
      <div className="font-bold text-[#2563EB] cursor-pointer">About</div>
      <div className="cursor-pointer">What includes</div>
      <div className="cursor-pointer">Ratings</div>
    </div>
  );
};

export default CourseTabs;
