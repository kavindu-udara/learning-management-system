import React, { useEffect, useState } from "react";

import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import apiClient from "@/axios/axios";
import { toast } from "react-toastify";
import CheckoutForm from "@/pages/stripe/CheckoutForm";

interface Props {
  courseId?: string;
  successCallBack: (
    res: {
      success: boolean;
      message: string;
    },
    paymentIntent: string
  ) => void;
  cartPay?: boolean;
}

interface Course {
  _id: string;
  title: string;
  description: string;
  categoryId: string;
}

interface Appearance {}

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

const PaymentComponent: React.FC<Props> = ({
  courseId,
  successCallBack,
  cartPay = false,
}: Props) => {
  const [clientSecret, setClientSecret] = useState("");
  const [dpmCheckerLink, setDpmCheckerLink] = useState("");

  const appearance: Appearance = {
    theme: "flat" as const,
  };
  // Enable the skeleton loader UI for optimal loading.
  const loader = "auto";

  const loadCourseData = async () => {
    await apiClient
      .get(`/course/${courseId}`)
      .then((res) => {
        createPaymentIntent(res.data.course);
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };

  const createPaymentIntent = async (course: Course) => {
    await apiClient
      .post(`/checkout/create-payment-intent/course/${courseId}`, {
        items: [course],
      })
      .then((res) => {
        setClientSecret(res.data.clientSecret);
        setDpmCheckerLink(res.data.dpmCheckerLink);
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };

  const createCartPaymentIntent = async () => {
    await apiClient
      .post(`/checkout/create-payment-intent/cart`)
      .then((res) => {
        console.log(res);
        setClientSecret(res.data.clientSecret);
        setDpmCheckerLink(res.data.dpmCheckerLink);
      })
      .catch(() => {
        toast.error("Payment failed");
      });
  };

  useEffect(() => {
    !cartPay ? loadCourseData() : createCartPaymentIntent();
  }, []);

  return (
    <div>
      {clientSecret && (
        <Elements
          options={{ clientSecret, appearance, loader }}
          stripe={stripePromise}
        >
          <CheckoutForm
            dpmCheckerLink={dpmCheckerLink}
            successCallBack={successCallBack}
          />
        </Elements>
      )}
    </div>
  );
};

export default PaymentComponent;