import React, { Component } from "react";
import CheckoutForm from "../pay/CheckoutForm";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
const stripePromise = loadStripe("pk_test_pdg00O8tdW99El1V9yrNQrRE00GeePoRWx");

export default class PaymentWraper extends Component {
  render() {
    return (
      <Elements stripe={stripePromise}>
        <CheckoutForm amountInCents={this.props.amountInCents} />
      </Elements>
    );
  }
}
