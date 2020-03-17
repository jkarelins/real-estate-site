import React, { Component } from "react";
import { Provider } from "react-redux";
import { Route, Switch } from "react-router-dom";

import store from "./store";

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <h1>Hello world of RE</h1>
        <Switch>
          <Route path="/" />
        </Switch>
      </Provider>
    );
  }
}

export default App;
