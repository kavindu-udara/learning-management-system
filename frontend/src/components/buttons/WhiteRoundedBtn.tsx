import React from "react";
import { Button } from "../ui/button";

type Props = {
  text: string;
  buttonEvent?: () => void;
};

const WhiteRoundedBtn: React.FC<Props> = ({ text, buttonEvent }: Props) => {
  return (
    <Button className="bg-white text-[#2563EB] shadow-none hover:bg-[#2563EB] hover:text-white p-5 rounded-2xl" onClick={() => buttonEvent && buttonEvent()}>
      {text}
    </Button>
  );
};

export default WhiteRoundedBtn;
