import React, { useState } from "react";
import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { Button } from "@/components/ui/button";
import { Card, CardFooter } from "@/components/ui/card";

type Props = {
  dpmCheckerLink?: string;
  successCallBack: ({
  }) => void
};
// import "../../stripe.css";

const CheckoutForm: React.FC<Props> = ({ dpmCheckerLink, successCallBack }: Props) => {
  const stripe = useStripe();
  const elements = useElements();

  const [message, setMessage] = useState<string | undefined | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsLoading(true);

    const { error, paymentIntent  } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // return_url: "http://localhost:5173/checkout/complete",
      },
      redirect: 'if_required', 
    });
    
    if (error?.type === "card_error" || error?.type === "validation_error") {
      setMessage(error.message);
      successCallBack({success:false, message: error.message});
    } else if (paymentIntent && paymentIntent?.status === "succeeded") {
      handlePaymentSuccess(paymentIntent);
    } else {
      setMessage("An unexpected error occurred.");
    }

    setIsLoading(false);
  };

  const paymentElementOptions = {
    layout: "accordion",
  };

  const handlePaymentSuccess = (paymentIntent: any) => {
      console.log(paymentIntent);
      successCallBack({success: true, message: "Payment successfull"}, paymentIntent);
  }

  return (
    <Card className="w-full">
      <form id="payment-form" onSubmit={handleSubmit}>
        <PaymentElement id="payment-element" options={paymentElementOptions} />
        <CardFooter>
          <Button
            disabled={isLoading || !stripe || !elements}
            id="submit"
            className="w-full mt-3"
          >
            <span id="button-text">
              {isLoading ? (
                <div className="spinner" id="spinner"></div>
              ) : (
                "Pay now"
              )}
            </span>
          </Button>
          <div>
            {message && (
              <div id="payment-message" className="text-red-700">
                {message}
              </div>
            )}
          </div>
        </CardFooter>
      </form>
    </Card>
  );
};

export default CheckoutForm;
