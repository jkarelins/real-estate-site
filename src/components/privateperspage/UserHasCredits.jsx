import React, { Component, Fragment } from "react";

export default class UserHasCredits extends Component {
  render() {
    if (this.props.user) {
      return (
        <Fragment>
          <h4>
            Welcome back: {this.props.user.username} - you are loged in as
            private person.
          </h4>
          <p>As private person you can publish 1 free advertisement monthly.</p>
          <p>
            You can publish more {this.props.user.freeAdvertLimit} free
            advertisement.
          </p>
          <p>
            You also have {this.props.user.paidAdvertLimit} paid advertisement
            limit.
          </p>
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
