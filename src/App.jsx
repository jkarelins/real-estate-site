import React, { Component } from "react";
import { Provider } from "react-redux";
import { Route, Switch } from "react-router-dom";
import store from "./store";

import Header from "./components/header/Header";
import Login from "./components/login/Login";
import Register from "./components/register/Register";
import UserPage from "./components/userpage/UserPage";
import MainPage from "./components/mainpage/MainPage";
import SelectedAdvert from "./components/selectedadvert/SelectedAdvert";
import FavoriteAdverts from "./components/userpage/FavoriteAdverts";
import MyAdverts from "./components/userpage/MyAdverts";
import MyAppointments from "./components/appointment/MyAppointments";
import SearchedBy from "./components/mainpage/SearchedBy";

import "bootstrap/dist/css/bootstrap.css";

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Header />
        <Switch>
          <Route path="/myadverts" component={MyAdverts} />
          <Route path="/favorites" component={FavoriteAdverts} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/user" component={UserPage} />
          <Route path="/advert/:id" component={SelectedAdvert} />
          <Route path="/appointment" exact component={MyAppointments} />
          <Route path="/search/:keyword/:value" component={SearchedBy} />
          <Route path="/" exact component={MainPage} />
        </Switch>
      </Provider>
    );
  }
}

export { App };
