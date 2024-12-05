import React from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";

interface Props {
  title: string;
  description: string;
  confirmFunc: () => void;
  alertTriggerButtonRef: React.RefObject<HTMLButtonElement>;
}

const ConfirmationDialog: React.FC<Props> = ({
  title,
  description,
  confirmFunc,
  alertTriggerButtonRef,
}: Props) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger ref={alertTriggerButtonRef}></AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={() => confirmFunc()}>
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ConfirmationDialog;
