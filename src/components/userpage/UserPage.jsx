import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import AddNewAdvert from "../addnewadvert/AddNewAdvert";
import AgentPage from "../agentpage/AgentPage";
import ManagerPage from "../managerpage/ManagerPage";
import PrivatePersPage from "../privateperspage/PrivatePersPage";

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
      switch (this.props.user.user.role) {
        case "agencyAgent": {
          return (
            <div>
              <AgentPage />
              <AddNewAdvert />
            </div>
          );
        }
        case "agencyManager": {
          return (
            <div>
              <ManagerPage />
              <AddNewAdvert />
            </div>
          );
        }
        case "privatePerson": {
          return (
            <div>
              <PrivatePersPage />
              <AddNewAdvert />
            </div>
          );
        }
        default:
          return <h1>Hello</h1>;
      }
    }
  }
}

function mapStateToProps(state) {
  return {
    user: state.userReducer
  };
}

export default connect(mapStateToProps)(UserPage);
