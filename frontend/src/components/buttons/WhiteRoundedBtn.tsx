import React from "react";
import { Button } from "../ui/button";

type Props = {
  text: string;
  buttonEvent?: () => void;
};

const WhiteRoundedBtn: React.FC<Props> = ({ text, buttonEvent }: Props) => {
  return (
    <Button className=" p-5 rounded-[21px]" onClick={() => buttonEvent && buttonEvent()}>
      {text}
    </Button>
  );
};

export default WhiteRoundedBtn;
