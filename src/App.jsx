import React, { Component } from "react";
import { Provider } from "react-redux";

import store from "./store";

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <h1>Hello world of RE</h1>
      </Provider>
    );
  }
}

export default App;
