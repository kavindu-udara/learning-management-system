import React from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";

interface Props {
  buttonRef: React.RefObject<HTMLButtonElement>;
  nameValue: string;
  setNameValue: React.Dispatch<React.SetStateAction<string>>;
  descriptionValue: string;
  setDescriptionValue: React.Dispatch<React.SetStateAction<string>>;
  handlePartFileChange : (e: React.ChangeEvent<HTMLInputElement>) => void
  isSaving: boolean;
  onClickFunc: () => void;
};

const CreatePart: React.FC<Props> = ({
  buttonRef,
  nameValue,
  setNameValue,
  descriptionValue,
  setDescriptionValue,
  handlePartFileChange,
  isSaving,
  onClickFunc,
}: Props) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button ref={buttonRef} variant="outline" className="hidden">
          Edit Profile
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create Section</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-left">
              Title
            </Label>
            <Input
              id="name"
              value={nameValue}
              onChange={(e) => setNameValue(e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-left">
              Description
            </Label>
            <Textarea
              id="name"
              className="col-span-3"
              value={descriptionValue}
              onChange={(e) => setDescriptionValue(e.target.value)}
            ></Textarea>
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-left">
              Video File
            </Label>
            <Input
              onChange={(e) => handlePartFileChange(e)}
              id="name"
              type="file"
              accept="video/mp4,video/x-m4v,video/*"
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <Button
            onClick={() => onClickFunc()}
            type="submit"
            disabled={isSaving}
          >
            {isSaving ? "Saving..." : "Save"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreatePart;
