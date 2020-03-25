import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  CardElement,
  Elements,
  ElementsConsumer
} from "@stripe/react-stripe-js";
import "./pay.css";

const stripePromise = loadStripe("pk_test_pdg00O8tdW99El1V9yrNQrRE00GeePoRWx");

class CheckoutForm extends React.Component {
  handleSubmit = async event => {
    event.preventDefault();
    const { stripe, elements } = this.props;
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement)
    });
    if (error) {
      console.log(error);
    }
    if (paymentMethod) {
      console.log(paymentMethod);
    }
  };

  render() {
    const { stripe } = this.props;
    return (
      <form onSubmit={this.handleSubmit}>
        <CardElement />
        <button type="submit" disabled={!stripe}>
          Pay
        </button>
      </form>
    );
  }
}

const InjectedCheckoutForm = () => (
  <ElementsConsumer>
    {({ stripe, elements }) => (
      <CheckoutForm stripe={stripe} elements={elements} />
    )}
  </ElementsConsumer>
);

const Pay = () => (
  <Elements stripe={stripePromise}>
    <InjectedCheckoutForm />
  </Elements>
);

export default Pay;
