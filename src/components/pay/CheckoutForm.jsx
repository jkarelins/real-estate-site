import React, { useEffect } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import axios from "axios";

import CardSection from "./CardSection";

const state = {
  amountInCents: 0,
  requested: false,
  foundUserId: false,
  userId: ""
};

export default function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async event => {
    event.preventDefault();

    if (!stripe || !elements || !state.foundUserId) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    const result = await stripe.confirmCardPayment(state.userId, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          name: "Jenny Rosen"
        }
      }
    });

    if (result.error) {
      // Show error to your customer (e.g., insufficient funds)
      console.log(result.error.message);
    } else {
      // The payment has been processed!
      if (result.paymentIntent.status === "succeeded") {
        axios
          .post("http://localhost:4000/payment/confirmed", { ...result })
          .then(res => {
            console.log(res);
          })
          .catch(console.error);
        console.log(result);
        // Show a success message to your customer
        // There's a risk of the customer closing the window before callback
        // execution. Set up a webhook or plugin to listen for the
        // payment_intent.succeeded event that handles any business critical
        // post-payment actions.
      }
    }
  };

  useEffect(() => {
    if (!state.amountInCents) {
      state.amountInCents = 1000;
    } else if (!state.requested) {
      state.requested = true;
      axios
        .get(`http://localhost:4000/payment/${state.amountInCents}`)
        .then(res => {
          // console.log(res.data);
          state.userId = res.data.client_secret;
          state.foundUserId = true;
        })
        .catch(console.error);
    }
  });

  return (
    <form onSubmit={handleSubmit}>
      <CardSection />
      <button disabled={!stripe}>Confirm order</button>
    </form>
  );
}

// {
//   paymentIntent: id: "pi_1GQdg0KdV0217vKMluG1zsFm";
//   object: "payment_intent";
//   amount: 1000;
//   canceled_at: null;
//   cancellation_reason: null;
//   capture_method: "automatic";
//   client_secret: "pi_1GQdg0KdV0217vKMluG1zsFm_secret_kelVtnrbN3XzninfspqLr9SXR";
//   confirmation_method: "automatic";
//   created: 1585159804;
//   currency: "eur";
//   description: null;
//   last_payment_error: null;
//   livemode: false;
//   next_action: null;
//   payment_method: "pm_1GQdgNKdV0217vKMEzCdyF2M";
//   payment_method_types: ["card"];
//   receipt_email: null;
//   setup_future_usage: null;
//   shipping: null;
//   source: null;
//   status: "succeeded";
// }
