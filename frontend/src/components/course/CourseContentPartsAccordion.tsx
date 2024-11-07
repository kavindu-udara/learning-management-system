import React from "react";
import { AccordionContent } from "../ui/accordion";
import { Button } from "../ui/button";

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
};

const CourseContentPartsAccordion: React.FC<Props> = ({
  parts,
  section,
  isEditable,
  handleEditPartButton,
  handleDeletePartButton,
  titleCallback,
}: Props) => {
  return (
    <>
      {parts
        .filter((part) => part.sectionId === section._id)
        .map((part) => (
          <AccordionContent
            className={isEditable ? "text-lg" : "text-lg cursor-pointer"}
            key={part._id}
          >
            <span onClick={() => titleCallback?.(part._id)} className="text-lg">{part.title}</span>
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
          </AccordionContent>
        ))}
    </>
  );
};

export default CourseContentPartsAccordion;
