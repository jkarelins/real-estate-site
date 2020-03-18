import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class AgentPage extends Component {
  render() {
    if (!this.props.user) {
      return (
        <div>
          <h4>This page is only for users. Please Login or sign up first.</h4>
          <Link to="/login">Login</Link>
          <br />
          <Link to="/register">Sign Up</Link>
        </div>
      );
    } else {
      console.log(typeof this.props.user.agencyConfirmedByManager);
      if (this.props.user.role === "agencyAgent") {
        return (
          <div>
            hello
            <h4>
              Welcome back: {this.props.user.email} - you are loged in as agent
              of "{this.props.user.agency.name}"
            </h4>
            <p>
              {!this.props.user.agencyConfirmedByManager
                ? "Your profile is not confirmed yet. Contact your manager"
                : "Your account is confirmed, you can use it"}
            </p>
          </div>
        );
      }
    }
  }
}

function mapStateToProps(state) {
  if (state.userReducer) {
    return {
      user: state.userReducer.user
    };
  }
}

export default connect(mapStateToProps)(AgentPage);
