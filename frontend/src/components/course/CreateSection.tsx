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

type Props = {
  buttonRef: React.RefObject<HTMLButtonElement>;
  inputValue: string;
  setInputValue: React.Dispatch<React.SetStateAction<string>>;
  isSaving: boolean;
  onClickFunc: () => void;
};

const CreateSection: React.FC<Props> = ({
  buttonRef,
  inputValue,
  setInputValue,
  isSaving,
  onClickFunc,
}: Props) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button ref={buttonRef} variant="outline" className="hidden"></Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create Section</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-left">
              Name
            </Label>
            <Input
              id="name"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
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

export default CreateSection;
