import React, { Component, Fragment } from "react";

export default class UserHasNoCredits extends Component {
  render() {
    if (this.props.user) {
      return (
        <Fragment>
          <h4>Sorry, advertisement limit reached</h4>
          <form onSubmit={e => this.props.addAdverts(e)}>
            <label htmlFor="addAdverts">
              Buy more advertisements
              <input
                type="number"
                min="1"
                max="20"
                name="addExtra"
                value={this.props.addExtra}
                onChange={this.props.handleChange}
              />
            </label>
            <input type="submit" value="Add" />
          </form>
        </Fragment>
      );
    } else {
      return <h4>Loading...</h4>;
    }
  }
}
