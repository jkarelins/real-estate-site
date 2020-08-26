import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import {App} from "./App";
import { Router } from "react-router-dom";
import * as serviceWorker from "./serviceWorker";

import ReactGA from "react-ga";
import 'font-awesome/css/font-awesome.min.css';

import { createBrowserHistory } from "history";
const trackingId = "UA-161722256-1";
ReactGA.initialize(trackingId);

const history = createBrowserHistory();
// Initialize google analytics page view tracking
history.listen((location) => {
  ReactGA.set({ page: location.pathname }); // Update the user's current page
  ReactGA.pageview(location.pathname); // Record a pageview for the given page
});

ReactDOM.render(
  <Router history={history}>
    <App />
  </Router>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
