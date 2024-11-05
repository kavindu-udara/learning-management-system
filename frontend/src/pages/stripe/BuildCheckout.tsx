import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useParams,
} from "react-router-dom";
import apiClient from "@/axios/axios";
import CheckoutForm from "./CheckoutForm";
import CompletePage from "./CompletePage";
import { toast } from "react-toastify";

// ! this part automatically run twise need to fix it

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

type course =
  | {
      _id: string;
      title: string;
      description: string;
      categoryId: string;
    }
  | [];

const BuildCheckout: React.FC = () => {
  const [clientSecret, setClientSecret] = useState("");
  const [dpmCheckerLink, setDpmCheckerLink] = useState("");
  const [course, setCourse] = useState<course>([]);
  const [currentCourseId, setCurrentCourseId] = useState<string>("");

  const { courseIdParam } = useParams();

  const appearance = {
    theme: "flat",
  };
  // Enable the skeleton loader UI for optimal loading.
  const loader = "auto";

  const loadCourseData = async () => {
    await apiClient
      .get(`/course/${currentCourseId}`)
      .then((res) => {
        console.log(res);
        setCourse(res.data.course);
        createPaymentIntent(res.data.course);
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };

  const createPaymentIntent = async (course) => {
    await apiClient
      .post(`/stripe/create-payment-intent/${courseIdParam}`, {
        items: [course],
      })
      .then((res) => {
        console.log(res);
        setClientSecret(res.data.clientSecret);
        setDpmCheckerLink(res.data.dpmCheckerLink);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    // console.log(currentCourseId + " " + courseIdParam);
    if (courseIdParam != "complete") {
      setCurrentCourseId(courseIdParam);
    }
    loadCourseData();
    console.log(course);
  }, []);

  // TODO : item is null

  return (
    <div className="App">
      {clientSecret && (
        <Elements
          options={{ clientSecret, appearance, loader }}
          stripe={stripePromise}
        >
          <Routes>
            <Route
              path="/"
              element={<CheckoutForm dpmCheckerLink={dpmCheckerLink} />}
            />
            <Route path="/complete" element={<CompletePage />} />
          </Routes>
        </Elements>
      )}
    </div>
  );
};

export default BuildCheckout;
