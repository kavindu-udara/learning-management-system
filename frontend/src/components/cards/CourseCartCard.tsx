import React from "react";
import { Link } from "react-router-dom";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";

interface Props {
  categoryText: string;
  titleText: string;
  priceText: string;
  courseId: string;
  imageUrl: string;
  removeFromCartCallback: (id: string) => void;
}

const CourseCartCard: React.FC<Props> = ({
  categoryText,
  titleText,
  priceText,
  courseId,
  imageUrl,
  removeFromCartCallback
}: Props) => {

  return (
    <div className="rounded-[21px] bg-secondary-color flex flex-row p-5 cursor-pointer">
      <div className="basis-1/3 flex items-center justify-center">
        <div
          className=" w-full h-full rounded-l-lg bg-cover"
          style={{
            backgroundImage: `url(${imageUrl})`,
          }}
        ></div>
      </div>
      <div className="basis-2/3 pl-5 flex flex-col">
        <div>
          <Badge className="bg-white text-black hover:bg-white hover:text-black shadow-none">
            {categoryText}
          </Badge>
        </div>
        <Link
          to={`/course/${courseId}`}
          className=" my-3 text-xl font-jua text-primary-color"
        >
          {titleText}
        </Link>
        <p className="text-lg text-dark-acent-color font-jua">${priceText}</p>
        <div>
            <Button
              onClick={() => removeFromCartCallback(courseId)}
              className="rounded-[21px]"
            >
              Remove From Cart
            </Button>
        </div>
      </div>
    </div>
  );
};

export default CourseCartCard;
