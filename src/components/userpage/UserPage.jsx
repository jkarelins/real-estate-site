import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import AddNewAdvert from "../addnewadvert/AddNewAdvert";

class UserPage extends Component {
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
      return (
        <div>
          <h4>Welcome back: {this.props.user.email}</h4>
          <AddNewAdvert />
        </div>
      );
    }
  }
}

function mapStateToProps(state) {
  return {
    user: state.userReducer
  };
}

export default connect(mapStateToProps)(UserPage);
