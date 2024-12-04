import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { Button } from "../ui/button";
import CourseContentPartsAccordion from "./CourseContentPartsAccordion";
import { FaPlus } from "react-icons/fa6";

interface Part {
  _id: string;
  title: string;
  description: string;
  videoUrl: string;
  sectionId: string;
  isLocked: boolean;
};

interface Props  {
  sections: {
    _id: string;
    title: string;
    courseId: string;
    parts: Part[];
  }[];
  isEditable: boolean | false;
  handleEditSectionButton?: (section: { _id: string; title: string }) => void;
  handleDeletesectionButton?: (id: string) => void;
  handleAddPartDialog?: (id: string) => void;
  handleEditPartButton?: (part: {
    _id: string;
    title: string;
    description: string;
  }) => void;
  handleDeletePartButton?: (id: string) => void;
  partTitleCallback?: (part: Part) => void;
  partTitleUnlockCallback?: (partId: string) => void;
};

const CourseContentSectionsAccordion: React.FC<Props> = ({
  sections,
  isEditable,
  handleEditSectionButton,
  handleDeletesectionButton,
  handleAddPartDialog,
  handleEditPartButton,
  handleDeletePartButton,
  partTitleCallback,
  partTitleUnlockCallback,
}: Props) => {
  return (
    <Accordion type="single" collapsible className="w-full">
      {sections.map((section) => (
        <AccordionItem
          key={section._id}
          value={section._id}
          className="text-xl bg-secondary-color p-3 rounded-[21px]"
        >
          <AccordionTrigger className="text-xl">
            <div className="flex flex-row items-center gap-5 font-bahnschrift text-dark-acent-color text-xl">
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
            parts={section.parts}
            isEditable={isEditable}
            handleEditPartButton={handleEditPartButton}
            handleDeletePartButton={handleDeletePartButton}
            titleCallback={partTitleCallback}
            partTitleUnlockCallback={partTitleUnlockCallback}
          />

          {isEditable && (
            <AccordionContent className="text-lg text-center flex justify-center">
              <span
                onClick={() => handleAddPartDialog?.(section._id)}
                className="bg-primary-color rounded-[21px] p-2 cursor-pointer text-secondary-color"
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
