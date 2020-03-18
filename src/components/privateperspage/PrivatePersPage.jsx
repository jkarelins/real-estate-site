import React, { Component } from "react";
import { connect } from "react-redux";

class PrivatePersPage extends Component {
  render() {
    return (
      <div>
        hello
        <h4>
          Welcome back: {this.props.user.email} - you are loged in as private
          person.
        </h4>
        <p>
          As private person you can publish 1 free advertisement monthly. You
          can publish more {this.props.user.freeAdvertLimit} free advertisement.
        </p>
      </div>
    );
  }
}

function mapStateToProps(state) {
  if (state.userReducer) {
    return {
      user: state.userReducer.user
    };
  }
}

export default connect(mapStateToProps)(PrivatePersPage);
