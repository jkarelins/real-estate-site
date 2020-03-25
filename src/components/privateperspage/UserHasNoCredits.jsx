import React, { Component, Fragment } from "react";

export default class UserHasNoCredits extends Component {
  render() {
    if (this.props.user) {
      return (
        <Fragment>
          <h4>Sorry, advertisement limit reached</h4>
        </Fragment>
      );
    } else {
      return <h4>Loading...</h4>;
    }
  }
}
