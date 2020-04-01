import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { logMeOut } from "../../actions/user";
import { clearErrors } from "../../actions/error";

import "./header.css";

class Header extends Component {
  logoutUser = e => {
    e.preventDefault();
    this.props.logMeOut();
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
        {this.props.error ? (
          this.props.error.actionErr ? (
            <div className="mt-2 d-flex justify-content-center">
              <div className="col-6">
                <div className="alert alert-warning" role="alert">
                  {this.props.error.actionErr}
                  <button
                    type="button"
                    className="close"
                    aria-label="Close"
                    onClick={this.props.clearErrors}
                  >
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
              </div>
            </div>
          ) : this.props.error.userErr ? (
            <div className="mt-2 d-flex justify-content-center">
              <div className="col-6">
                <div className="alert alert-danger" role="alert">
                  {this.props.error.userErr}
                  <button
                    type="button"
                    className="close"
                    aria-label="Close"
                    onClick={this.props.clearErrors}
                  >
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="mt-2 d-flex justify-content-center">
              <div className="col-6">
                <div className="alert alert-warning" role="alert">
                  Unexpected error. Please contact us: technical@support.com
                  <button
                    type="button"
                    className="close"
                    aria-label="Close"
                    onClick={this.props.clearErrors}
                  >
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
              </div>
            </div>
          )
        ) : (
          ""
        )}
      </Fragment>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.userReducer,
    error: state.errorReducer
  };
}

export default connect(mapStateToProps, { logMeOut, clearErrors })(Header);
