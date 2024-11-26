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
    <div className="bg-secondary-color rounded-[21px] p-5 container">
      <span className="text-2xl text-primary-color font-jua">
        {title}
      </span>
      <p className="text-gray-500 text-lg font-montserrat my-3">
        {description}
      </p>
      <WhiteRoundedBtn text={buttonText} buttonEvent={buttonAction} />
    </div>
  );
};

export default LargeGetCard;
