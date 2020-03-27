import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import "./header.css";
import { Fragment } from "react";

class Header extends Component {
  render() {
    return (
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
              </Fragment>
            ) : (
              <Fragment>
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
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.userReducer
  };
}

export default connect(mapStateToProps)(Header);
