import React from "react";
import {
  Dialog,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogContent,
  DialogFooter,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Textarea } from "../ui/textarea";

interface Category {
  _id: string;
  name: string;
};

interface Props {
  buttonRef: React.RefObject<HTMLButtonElement>;
  imageRef: React.RefObject<HTMLInputElement>;
  setCourseTitle: React.Dispatch<React.SetStateAction<string>>;
  setCategoryId: React.Dispatch<React.SetStateAction<string>>;
  categoryId: string;
  courseTitle: string;
  setCourseDescription: React.Dispatch<React.SetStateAction<string>>;
  courseDescription: string;
  setCoursePrice: React.Dispatch<React.SetStateAction<string>>;
  coursePrice: string;
  submitFunc: () => void;
  isSaving: boolean;
  categories: Category[];
  isEditable?: boolean | false;
  setCourseImage: React.Dispatch<React.SetStateAction<any>>;
};

const CreateCourseDialog: React.FC<Props> = ({
  buttonRef,
  setCourseTitle,
  setCategoryId,
  categoryId,
  courseTitle,
  setCourseDescription,
  courseDescription,
  setCoursePrice,
  coursePrice,
  categories,
  submitFunc,
  isSaving,
  isEditable,
  imageRef,
  setCourseImage,
}: Props) => {
  const imageInputRef = imageRef;

  const handleCourseImageInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCourseImage(e.target.files![0]);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" ref={buttonRef} className="hidden">
          Course
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[700px]">
        <DialogHeader>
          <DialogTitle>
            {isEditable ? "Edit Course Details" : "Add Course Details"}{" "}
          </DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-2 w-full items-center gap-4 mb-4">
          <div className="grid w-full items-center gap-4">
            <Label>Title</Label>
            <Input
              type="text"
              value={courseTitle}
              onChange={(e) => setCourseTitle(e.target.value)}
            />
          </div>
          <div className="grid w-full items-center gap-4">
            <Label>Category</Label>
            <Select
              value={categoryId}
              onValueChange={(categoryId: string) => setCategoryId(categoryId)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {categories.map((category: Category) => {
                    return (
                      <SelectItem value={category._id} key={category._id}>
                        {category.name}
                      </SelectItem>
                    );
                  })}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="grid w-full items-center gap-4">
          <div className="flex flex-col space-y-1.5">
            <Label>Description</Label>
            <Textarea
              value={courseDescription}
              onChange={(e) => setCourseDescription(e.target.value)}
            />
          </div>
          <div className="flex flex-col space-y-1.5">
            <Label>Price (USD)</Label>
            <Input
              type="number"
              value={coursePrice}
              onChange={(e) => setCoursePrice(e.target.value)}
              placeholder="100"
              min={0}
              max={1000000}
              step={10}
            />
          </div>
          <div className="flex flex-col space-y-1.5">
            <Label>Course Image</Label>
            <Input
              type="file"
              accept="image/*"
              ref={imageInputRef}
              onChange={(e) => handleCourseImageInput(e)}
            />
          </div>
        </div>
        <DialogFooter>
          <Button
            type="submit"
            onClick={() => submitFunc()}
            disabled={isSaving}
          >
            {isSaving ? "Saving" : "Save changes"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreateCourseDialog;
