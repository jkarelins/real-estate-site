import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { logMeOut } from "../../actions/user";
import { clearErrors, clearSuccess } from "../../actions/error";

import "./header.css";
import ErrorAlert from "./ErrorAlert";
import SuccessAlert from "./SuccessAlert";

class Header extends Component {
  logoutUser = e => {
    e.preventDefault();
    this.props.logMeOut();
  };

  componentDidUpdate = () => {
    if (this.props.success) {
      setTimeout(this.props.clearSuccess, 5000);
    }

    if (this.props.error) {
      setTimeout(this.props.clearErrors, 5000);
    }
  };

  render() {
    return (
      <Fragment>
        {" "}
        <nav className="navbar navbar-light navbar-expand-lg navbar-light">
          <div className="" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
              {this.props.user ? (
                <Fragment>
                  <li className="nav-item mr-2 my-2">
                    <Link className="text-link" to="/">
                      Home
                    </Link>
                  </li>
                  <li className="nav-item mr-2 my-2">
                    <Link className="text-link" to="/favorites">
                      My Favorite Adverts
                    </Link>
                  </li>
                  <li className="nav-item mr-2 my-2">
                    <Link className="text-link" to="/myadverts">
                      My Adverts
                    </Link>
                  </li>
                  <li className="nav-item mr-2 my-2">
                    <Link className="text-link" to="/appointment">
                      My Appointments
                    </Link>
                  </li>
                  <li className="nav-item mr-2 my-2">
                    <Link className="text-link" to="/user">
                      My Account
                    </Link>
                  </li>
                  <li className="nav-item mr-2 my-2">
                    <a className="text-link" onClick={this.logoutUser} href="/">
                      Logout
                    </a>
                  </li>
                </Fragment>
              ) : (
                <Fragment>
                  <li className="nav-item mr-2 my-2">
                    <Link className="text-link" to="/">
                      Home
                    </Link>
                  </li>
                  <li className="nav-item mr-2 my-2">
                    <Link className="text-link" to="/login">
                      Login
                    </Link>
                  </li>
                  <li className="nav-item mr-2 my-2">
                    <Link className="text-link" to="/register">
                      Register
                    </Link>
                  </li>
                </Fragment>
              )}
            </ul>
            <ul className="navbar-nav ml-auto"></ul>
          </div>
        </nav>
        <ErrorAlert
          error={this.props.error}
          clearErrors={this.props.clearErrors}
        />
        <SuccessAlert
          success={this.props.success}
          clearSuccess={this.props.clearSuccess}
        />
      </Fragment>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.userReducer,
    error: state.errorReducer,
    success: state.successReducer
  };
}

export default connect(mapStateToProps, {
  logMeOut,
  clearErrors,
  clearSuccess
})(Header);
