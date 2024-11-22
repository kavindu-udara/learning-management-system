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
} from "@/components/ui/alert-dialog";
import PaymentComponent from "../payments/PaymentComponent";
import { toast } from "react-toastify";
import apiClient from "@/axios/axios";
import { useSelector } from "react-redux";

type Props = {
  triggerRef: React.RefObject<HTMLButtonElement> | null;
  courseId: string;
  coursePrice: number;
  courseTitle: string;
  loadCourseData: () => void;
};

const PurchaseCourse: React.FC<Props> = ({
  triggerRef,
  courseId,
  courseTitle,
  coursePrice,
  loadCourseData,
}: Props) => {
    
  const user = useSelector((state:any) => state.userReducer.user);

  const handleResponse = (res, paymentIntent) => {
    if (res.success) {
      toast.success("Payment successfull");
      handlepurchasedCourse(paymentIntent);
    } else {
      toast.error(res.message);
    }
  };

  const handlepurchasedCourse = (paymentIntent: any) => {
    apiClient
      .post(`/checkout/course-purchased`, {
        courseId,
        userId: user._id,
        purchasedPrice: paymentIntent.amount,
      })
      .then((res) => {
        toast.success(res.data.message);
        loadCourseData();
        triggerRef?.current?.click();
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
    loadCourseData();
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger ref={triggerRef} className="hidden">
        Open
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogDescription>
            <div className="grid grid-cols-1">
              <div>
                <div className="font-jua text-primary-color text-3xl">
                  {courseTitle}
                </div>
                <div className="font-jua text-dark-acent-color text-xl">
                  ${coursePrice}
                </div>
              </div>
              <div className="py-5">
                <div className="font-montserrat mb-3">
                  Enter Your Payment Details :{" "}
                </div>
                <PaymentComponent
                  courseId={courseId}
                  successCallBack={handleResponse}
                />
              </div>
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="w-full">Cancel</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default PurchaseCourse;
