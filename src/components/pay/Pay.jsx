import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  CardElement,
  Elements,
  ElementsConsumer
} from "@stripe/react-stripe-js";
import "./pay.css";
import axios from "axios";
let baseUrl = "";
if (process.env.NODE_ENV === "development") {
  baseUrl = "http://localhost:4000";
} else {
  baseUrl = "https://shielded-journey-92023.herokuapp.com";
}

// const stripePromise = loadStripe("pk_test_pdg00O8tdW99El1V9yrNQrRE00GeePoRWx");
let stripePromise = null;

class CheckoutForm extends React.Component {
  state = {
    stripePromise: null,
    keyReceived: false
  };

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

  componentDidMount = () => {
    const amountInCents = 1000;
    axios
      .get(`${baseUrl}/payment/${amountInCents}`)
      .then(res => {
        stripePromise = loadStripe(res.data.client_secret);
      })
      .catch(console.error);
  };

  // componentDidUpdate = () => {
  //   if(this.state.keyReceived){
  //     this.setState()
  //   }
  // }
  render() {
    const { stripe } = this.props;
    console.log(this.props);
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
