import React, { Component } from "react";
import { Provider } from "react-redux";
import { Route, Switch } from "react-router-dom";
import store from "./store";

import Login from "./components/login/Login";
import Register from "./components/register/Register";
import UserPage from "./components/userpage/UserPage";

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <h1>Hello world of RE</h1>
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/user" component={UserPage} />
        </Switch>
      </Provider>
    );
  }
}

export default App;
