import React, { Component } from "react";
import { Provider } from "react-redux";
import { Route, Switch, Link } from "react-router-dom";
import store from "./store";

import Login from "./components/login/Login";
import Register from "./components/register/Register";
import UserPage from "./components/userpage/UserPage";
import MainPage from "./components/mainpage/MainPage";
import SelectedAdvert from "./components/selectedadvert/SelectedAdvert";
import FavoriteAdverts from "./components/userpage/FavoriteAdverts";
import MyAdverts from "./components/userpage/MyAdverts";
import ShowAppointment from "./components/appointment/ShowAppointment";
import MyAppointments from "./components/appointment/MyAppointments";
// import Pay from "./components/pay/Pay";
import CheckoutForm from "./components/pay/CheckoutForm";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe("pk_test_pdg00O8tdW99El1V9yrNQrRE00GeePoRWx");

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <h1>Hello world of RE</h1>
        <Link to="/">Home</Link>
        <br />
        <Link to="/login">Login</Link> <br />
        <Link to="/register">Register</Link>
        <br />
        <Link to="/favorites">My Favorite Adverts</Link>
        <br />
        <Link to="/myadverts">My Adverts</Link>
        <br />
        <Link to="/appointment">My Appointments</Link>
        <br />
        <Link to="pay">Top Up my account</Link>
        <Switch>
          <Route path="/myadverts" component={MyAdverts} />
          <Route path="/favorites" component={FavoriteAdverts} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/user" component={UserPage} />
          <Route path="/advert/:id" component={SelectedAdvert} />
          <Route path="/appointment/:randAddress" component={ShowAppointment} />
          <Route path="/appointment" exact component={MyAppointments} />
          <Elements stripe={stripePromise}>
            <Route path="/pay" component={CheckoutForm} />
          </Elements>
          {/* <Route path="/pay" component={Pay} /> */}

          <Route path="/" exact component={MainPage} />
        </Switch>
      </Provider>
    );
  }
}

export default App;
