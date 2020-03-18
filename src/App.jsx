import React, { Component } from "react";
import { Provider } from "react-redux";
import { Route, Switch, Link } from "react-router-dom";
import store from "./store";

import Login from "./components/login/Login";
import Register from "./components/register/Register";
import UserPage from "./components/userpage/UserPage";
import MainPage from "./components/mainpage/MainPage";

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <h1>Hello world of RE</h1>
        <Link to="/">Home</Link>
        <br />
        <Link to="/login">Login</Link> <br />
        <Link to="/register">Register</Link>
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/user" component={UserPage} />
          <Route path="/" exact component={MainPage} />
        </Switch>
      </Provider>
    );
  }
}

export default App;
