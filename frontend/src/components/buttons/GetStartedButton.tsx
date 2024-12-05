import React from "react";

interface Props {
  onClickCallback: () => void;
};

const GetStartedButton: React.FC<Props> = ({ onClickCallback }: Props) => {
  return (
    <button className="bg-primary-color rounded-[11px] text-white text-[36px] p-5 font-bahnschrift" onClick={onClickCallback}>
      Get Started
    </button>
  );
};

export default GetStartedButton;
