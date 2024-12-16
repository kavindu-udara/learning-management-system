import React from "react";

interface Props {
  profileImage: string,
  userName: string;
  courseName: string;
}

const RecentSalesCard: React.FC<Props> = ({profileImage, userName, courseName }: Props) => {
  return (
    <div className="flex flex-row p-3 bg-secondary-color rounded-lg mb-3 items-center">
      <div className="basis-1/5">
        <img
          src={profileImage}
          alt="profile-icon"
          className="w-[40px] cursor-pointer rounded-full border-2 border-primary-color"
        />
      </div>
      <div className="text-lg text-dark-acent-color font-jua basis-2/5">
        {userName}
      </div>
      <div className="text-lg text-dark-acent-color font-bahnschrift basis-2/5">
        {courseName}
      </div>
    </div>
  );
};

export default RecentSalesCard;
