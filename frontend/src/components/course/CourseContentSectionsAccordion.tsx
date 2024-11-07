import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { Button } from "../ui/button";
import CourseContentPartsAccordion from "./CourseContentPartsAccordion";
import { FaPlus } from "react-icons/fa6";

type Props = {
  sections:
    | [
        {
          _id: string;
          title: string;
        }
      ]
    | [];
  isEditable: boolean | false;
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
  handleEditSectionButton?: (section: { _id: string; title: string }) => void;
  handleDeletesectionButton?: (id: string) => void;
  handleAddPartDialog?: (id: string) => void;
  handleEditPartButton?: (part: {
    _id: string;
    title: string;
    description: string;
  }) => void;
  handleDeletePartButton?: (id: string) => void;
  partTitleCallback?: () => void;
};

const CourseContentSectionsAccordion: React.FC<Props> = ({
  sections,
  isEditable,
  parts,
  handleEditSectionButton,
  handleDeletesectionButton,
  handleAddPartDialog,
  handleEditPartButton,
  handleDeletePartButton,
  partTitleCallback,
}: Props) => {
  return (
    <Accordion type="single" collapsible className="w-full">
      {sections.map((section) => (
        <AccordionItem value={section._id} className="text-xl">
          <AccordionTrigger className="text-xl">
            <div className="flex flex-row items-center gap-5">
              {section.title}
            </div>
          </AccordionTrigger>
          <AccordionContent className="text-lg flex flex-row gap-5">
            {isEditable && (
              <Button onClick={() => handleEditSectionButton?.(section)}>
                Edit
              </Button>
            )}
            {isEditable && (
              <Button
                className="bg-red-500"
                onClick={() => handleDeletesectionButton?.(section._id)}
              >
                Delete
              </Button>
            )}
          </AccordionContent>

          <CourseContentPartsAccordion
            parts={parts}
            section={section}
            isEditable={isEditable}
            handleEditPartButton={handleEditPartButton}
            handleDeletePartButton={handleDeletePartButton}
            titleCallback={partTitleCallback}
          />

          {isEditable && (
            <AccordionContent className="text-lg text-center flex justify-center">
              <span
                onClick={() => handleAddPartDialog?.(section._id)}
                className="bg-[#EFF4FF] p-2 cursor-pointer text-[#2563EB]"
              >
                <FaPlus />
              </span>
            </AccordionContent>
          )}
        </AccordionItem>
      ))}
    </Accordion>
  );
};

export default CourseContentSectionsAccordion;
