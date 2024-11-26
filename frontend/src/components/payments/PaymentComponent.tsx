import React, { useEffect, useState } from "react";

import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import apiClient from "@/axios/axios";
import { toast } from "react-toastify";
import CheckoutForm from "@/pages/stripe/CheckoutForm";

type Props = {
  courseId: string;
  successCallBack: ({
    success,
    message,
  }: {
    success: boolean;
    message: string;
  }) => void;
};

type course =
  | {
      _id: string;
      title: string;
      description: string;
      categoryId: string;
    }
  | [];

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

const PaymentComponent: React.FC<Props> = ({
  courseId,
  successCallBack,
}: Props) => {
  const [clientSecret, setClientSecret] = useState("");
  const [dpmCheckerLink, setDpmCheckerLink] = useState("");
  const [course, setCourse] = useState<course>([]);
  const [currentCourseId, setCurrentCourseId] = useState<string>("");

  const appearance = {
    theme: "flat",
  };
  // Enable the skeleton loader UI for optimal loading.
  const loader = "auto";

  const loadCourseData = async () => {
    await apiClient
      .get(`/course/${currentCourseId}`)
      .then((res) => {
        setCourse(res.data.course);
        createPaymentIntent(res.data.course);
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };

  const createPaymentIntent = async (course) => {
    await apiClient
      .post(`/checkout/create-payment-intent/${courseId}`, {
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

  useEffect(() => {
    loadCourseData();
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
