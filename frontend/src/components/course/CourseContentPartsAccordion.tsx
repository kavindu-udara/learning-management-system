import React, { useState } from "react";
import { AccordionContent } from "../ui/accordion";
import { Button } from "../ui/button";
import { FaLock } from "react-icons/fa";

type Part = {
  _id: string;
  title: string;
  description: string;
  videoUrl: string;
  sectionId: string;
  isLocked: boolean;
};

type Props = {
  parts: Part[];
  isEditable: boolean | false;
  handleEditPartButton?: (part: {
    _id: string;
    title: string;
    description: string;
  }) => void;
  handleDeletePartButton?: (id: string) => void;
  titleCallback?: (part: Part) => void;
  partTitleUnlockCallback?: (titleId: string) => void;
};

const CourseContentPartsAccordion: React.FC<Props> = ({
  parts,
  isEditable,
  handleEditPartButton,
  handleDeletePartButton,
  titleCallback,
  partTitleUnlockCallback
}: Props) => {

  console.log(parts)

  return (
    <>
      {parts
        .map((part) => (
          <AccordionContent
            className={isEditable ? "text-lg" : `text-md  font-montserrat`}
            key={part._id}
          >
            <div className="flex justify-between mx-5">
              <div>
                <span
                  onClick={() => {
                    if (!part.isLocked) {
                      titleCallback?.(part);
                    }else{
                      partTitleUnlockCallback?.(part._id);
                    }
                  }}
                  className={`text-lg font-montserrat flex items-center gap-3 ${
                    part.isLocked
                      ? "text-light-gray-color cursor-not-allowed"
                      : "text-primary-color cursor-pointer"
                  }`}
                >
                  {part.isLocked && <FaLock />}
                  {part.title}
                </span>
                {isEditable && (
                  <Button
                    className="mx-5"
                    onClick={() => handleEditPartButton?.(part)}
                  >
                    Edit
                  </Button>
                )}
                {isEditable && (
                  <Button
                    className="bg-red-500"
                    onClick={() => handleDeletePartButton?.(part._id)}
                  >
                    Delete
                  </Button>
                )}
              </div>
              <div className="text-light-gray-color">
                {part.isLocked && "Locked"}
              </div>
            </div>
          </AccordionContent>
        ))}
    </>
  );
};

export default CourseContentPartsAccordion;
