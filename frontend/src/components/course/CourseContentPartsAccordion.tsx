import React, { useState } from "react";
import { AccordionContent } from "../ui/accordion";
import { Button } from "../ui/button";
import { FaLock } from "react-icons/fa";

type Props = {
  parts:
    | [
        {
          _id: string;
          title: string;
          description: string;
          videoUrl: string;
          sectionId: string;
          createdAt: string;
          updatedAt: string;
          __v: number;
        }
      ]
    | [];
  section: {
    _id: string;
  };
  isEditable: boolean | false;
  handleEditPartButton?: (part: {
    _id: string;
    title: string;
    description: string;
  }) => void;
  handleDeletePartButton?: (id: string) => void;
  titleCallback?: (titleId: string) => void;
  isLocked: boolean;
};

const CourseContentPartsAccordion: React.FC<Props> = ({
  parts,
  section,
  isEditable,
  handleEditPartButton,
  handleDeletePartButton,
  titleCallback,
  isLocked,
}: Props) => {
  
  return (
    <>
      {parts
        .filter((part) => part.sectionId === section._id)
        .map((part) => (
          <AccordionContent
            className={isEditable ? "text-lg" : `text-md  font-montserrat`}
            key={part._id}
          >
            <div className="flex justify-between mx-5">
              <div>
                <span
                  onClick={() => {
                    if (!isLocked) {
                      titleCallback?.(part._id);
                    }
                  }}
                  className={`text-lg font-montserrat flex items-center gap-3 ${
                    isLocked
                      ? "text-light-gray-color cursor-not-allowed"
                      : "text-primary-color cursor-pointer"
                  }`}
                >
                  {isLocked && <FaLock />}
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
                {isLocked && "Locked"}
              </div>
            </div>
          </AccordionContent>
        ))}
    </>
  );
};

export default CourseContentPartsAccordion;
