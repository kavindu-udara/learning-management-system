import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { PaymentElement } from "@stripe/react-stripe-js";

const stripePromise = loadStripe(
  "pk_test_51PRGBsHRaLDd6tB6SpoIpLXnrIMUHoiX5kuNsRU7xCyF4UkG9xT2ViIUn6FdDv1DCDBUr9AMZaDwONdmFddPWHnX00XYdhEyDd"
);

const Stripe: React.FC = () => {
  const options = {
    // passing the client secret obtained from the server
    clientSecret: "{{CLIENT_SECRET}}",
  };

  return (
    <Elements stripe={stripePromise} options={options}>
      <form>
        <PaymentElement />
        <button>Submit</button>
      </form>
    </Elements>
  );
};

export default Stripe;
