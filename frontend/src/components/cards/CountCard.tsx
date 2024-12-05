import React from "react";

interface Props {
  count: number;
  title: string;
};

const CountCard: React.FC<Props> = ({ count, title }: Props) => {
  return (
    <div className="bg-secondary-color rounded-[21px] px-5 py-10 text-center flex flex-col">
      <span className="text-[64px] text-primary-color  font-montserrat font-bold">
        {count}
      </span>
      <span className="text-dark-acent-color  text-[24px]  font-montserrat font-bold">
        {title}
      </span>
    </div>
  );
};

export default CountCard;
