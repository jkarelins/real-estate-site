import React, { useEffect, Fragment } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import axios from "axios";
import { useStore, useDispatch } from "react-redux";
import { creditAddSuccess } from "../../actions/user";

import CardSection from "./CardSection";

let baseUrl = "";
if (process.env.NODE_ENV === "development") {
  baseUrl = "http://localhost:4000";
} else {
  baseUrl = "https://shielded-journey-92023.herokuapp.com";
}

const state = {
  amountInCents: 0,
  requested: false,
  foundUserId: false,
  userId: ""
};

export default function CheckoutForm(props) {
  const { userReducer } = useStore().getState();
  const stripe = useStripe();
  const elements = useElements();
  const dispatch = useDispatch();

  const handleSubmit = async event => {
    event.preventDefault();

    if (!stripe || !elements || !state.foundUserId) {
      return;
    }

    const result = await stripe.confirmCardPayment(state.userId, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          name: userReducer.user.email
        }
      }
    });

    if (result.error) {
      // Show error to your customer (e.g., insufficient funds)
      console.log(result.error.message);
    } else {
      // The payment has been processed!
      if (result.paymentIntent.status === "succeeded") {
        const { jwt } = userReducer;
        axios.defaults.headers.common["Authorization"] = `Bearer ${jwt}`;

        axios
          .post(`${baseUrl}/user/addcredits`, { ...result })
          .then(res => {
            dispatch(creditAddSuccess(res.data));
            state.requested = false;
            state.foundUserId = false;
          })
          .catch(console.error);
      }
    }
  };

  useEffect(() => {
    if (userReducer) {
      if (!state.amountInCents) {
        state.amountInCents = +props.amountInCents;
      } else if (!state.requested) {
        state.requested = true;
        const { jwt } = userReducer;
        axios.defaults.headers.common["Authorization"] = `Bearer ${jwt}`;

        axios
          .get(`${baseUrl}/payment/${state.amountInCents}`)
          .then(res => {
            // console.log(res.data);
            state.userId = res.data.client_secret;
            state.foundUserId = true;
          })
          .catch(console.error);
      }
    }
  });

  return (
    <Fragment>
      <div className="alert alert-info mt-3" role="alert">
        You are going to top up your account for {state.amountInCents / 100}{" "}
        EUR. It is {state.amountInCents / 100} new advertisements. 1
        advertisement price is 1 EUR.
      </div>

      <div className="row">
        {userReducer ? (
          <form onSubmit={handleSubmit} className="col-12">
            <CardSection />
            <br />
            <button disabled={!stripe} className="btn btn-success">
              Confirm order
            </button>
          </form>
        ) : (
          <div class="alert alert-warning mt-3" role="alert">
            Sorry to TopUp your account, you should login first
          </div>
        )}
      </div>
    </Fragment>
  );
}
