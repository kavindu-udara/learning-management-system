import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import React from "react";
import PaymentComponent from "../payments/PaymentComponent";
import { toast } from "react-toastify";
import apiClient from "@/axios/axios";

interface Props {
  triggerRef: React.RefObject<HTMLButtonElement> | null;
  successCallback: () => void;
}

const CartPayDialog: React.FC<Props> = ({ triggerRef, successCallback }: Props) => {
  const handleCartPurchaseSuccess = (paymentIntent: any) => {
    toast.success("Cart Purchase Success !!");
    apiClient
      .post(`/checkout/cart-purchased`, {
        purchasedPrice: paymentIntent.amount,
      })
      .then((res) => {
        toast.success(res.data.message);
        triggerRef?.current?.click();
        successCallback();
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };

  const handleResponse = (res: any, paymentIntent: string) => {
    if (res.success) {
      toast.success("Payment successfull");
      handleCartPurchaseSuccess(paymentIntent);
    } else {
      toast.error(res.message);
    }
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
                  Cart Pay
                </div>
                <div className="font-jua text-dark-acent-color text-xl">
                  $ 100
                </div>
              </div>
              <div className="py-5">
                <div className="font-montserrat mb-3">
                  Enter Your Payment Details :{" "}
                </div>
                <PaymentComponent
                  successCallBack={handleResponse}
                  cartPay={true}
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

export default CartPayDialog;
