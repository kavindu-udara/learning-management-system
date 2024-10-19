import React from "react";
import WhiteRoundedBtn from "../buttons/WhiteRoundedBtn";

type Props = {
    title: string,
    description: string,
    buttonText: string,
    buttonAction: () => void
}

const LargeGetCard: React.FC<Props> = ({title, description, buttonText, buttonAction}: Props) => {
  return (
    <div className="bg-[#EFF4FF] rounded-2xl p-5 container">
      <span className="text-2xl font-bold text-[#2563EB]">
        {title}
      </span>
      <p className="text-gray-500 text-lg my-3">
        {description}
      </p>
      <WhiteRoundedBtn text={buttonText} buttonEvent={buttonAction} />
    </div>
  );
};

export default LargeGetCard;
