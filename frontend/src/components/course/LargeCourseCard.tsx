import React from "react";
import { Button } from "../ui/button";

const LargeCourseCard: React.FC = () => {
  return (
    <div className="rounded-lg  flex flex-row h-[200px] container border border-slate-400 gap-5">
      <div className="basis-1/5">
        <img src="https://picsum.photos/300/200" alt="course-image" />
      </div>
      <div className="basis-4/5 py-5">
        <div className="text-xl">Large Course Card</div>
        <p className="my-3">
          We all start somewhere. For programming, this series is that first
          step. I've designed it specifically for newcomers to, not just PHP,
          but programming in general. Here, you'll learn the fundamentals of PHP
          - all the way down to defining basic variables and arrays.Think of
          this series as a key stepping stone for your programming journey.
        </p>
        <Button>Get Started</Button>
      </div>
    </div>
  );
};

export default LargeCourseCard;
