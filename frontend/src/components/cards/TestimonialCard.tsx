import React from "react";
import { FaStar } from "react-icons/fa";

const TestimonialCard: React.FC = () => {
  return (
    <div className="grid grid-cols-1 shadow-lg rounded-[21px] px-5 py-10 gap-3">
      <div className="text-[32px] font-jua text-center text-dark-acent-color">
        Megan Hawyard
      </div>
      <div className="flex justify-center text-yellow-500">
        <FaStar />
        <FaStar />
        <FaStar />
        <FaStar />
        <FaStar />
      </div>
      <div className="text-[24px] font-jua text-center">
        "My child loving it. Purrfect Learning is perfect."
      </div>
    </div>
  );
};

export default TestimonialCard;
