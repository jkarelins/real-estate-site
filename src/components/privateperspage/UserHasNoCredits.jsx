import React, { Component, Fragment } from "react";

export default class UserHasNoCredits extends Component {
  render() {
    if (this.props.user) {
      return (
        <Fragment>
          <div class="alert alert-info mt-3" role="alert">
            Sorry, advertisement limit reached.
          </div>
        </Fragment>
      );
    } else {
      return <h4>Loading...</h4>;
    }
  }
}
