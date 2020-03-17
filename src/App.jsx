import React, { Component } from "react";
import { Provider } from "react-redux";
import { Route, Switch } from "react-router-dom";
import Login from "./components/login/Login";

import store from "./store";
import Register from "./components/register/Register";

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <h1>Hello world of RE</h1>
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
        </Switch>
      </Provider>
    );
  }
}

export default App;
