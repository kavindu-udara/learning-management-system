import React from "react";
import defaultProfileIcon from "../../assets/header/default-profile-icon.png";

const RecentSalesCard: React.FC = () => {
  return (
    <div className="flex flex-row p-3 bg-secondary-color rounded-lg mb-3 items-center">
      <div className="basis-1/5">
        <img
          src={defaultProfileIcon}
          alt="profile-icon"
          className="w-[40px] cursor-pointer rounded-full border-2 border-primary-color"
        />
      </div>
      <div className="text-lg text-dark-acent-color font-jua basis-2/5">
        Kavindu Udara
      </div>
      <div className="text-lg text-dark-acent-color font-bahnschrift basis-2/5">
        course name
      </div>
    </div>
  );
};

export default RecentSalesCard;
