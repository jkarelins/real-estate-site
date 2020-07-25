import React, { Component, Fragment } from "react";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { logMeOut } from "../../actions/user";
import { clearErrors, clearSuccess } from "../../actions/error";

import "./header.css";
import ErrorAlert from "./ErrorAlert";
import SuccessAlert from "./SuccessAlert";

class Header extends Component {
  state = {
    search: ""
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  searchByCityname = e => {
    e.preventDefault();
    this.props.history.push(`/search/city/${this.state.search}`);
    // console.log(this.state);
  };

  logoutUser = e => {
    e.preventDefault();
    this.props.logMeOut();
  };

  componentDidUpdate = () => {
    if (this.handleTimer) {
      clearTimeout(this.handleTimer);
    }
    if (this.props.success) {
      this.handleTimer = setTimeout(this.props.clearSuccess, 5000);
    }

    if (this.props.error) {
      if (this.handleTimer) {
        clearTimeout(this.handleTimer);
      }
      this.handleTimer = setTimeout(this.props.clearErrors, 5000);
    }
  };

  render() {
    // console.log(this.props.history);
    return (
      <Fragment>
        <nav className="navbar navbar-expand-lg fixed-top justify-content-end d-none d-md-flex">
          <div className="navbarLinkContainer" id="navbarSupportedContent">
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
                  {/* <li className="nav-item mr-2 my-2">
                    <i className="fa fa-bars" aria-hidden="true"></i>
                  </li> */}
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
          {/* <form
            className="form-inline ml-auto my-lg-0"
            onSubmit={e => this.searchByCityname(e)}
          >
            <input
              className="form-control mr-sm-2"
              type="search"
              placeholder="Input City Name"
              aria-label="Search"
              name="search"
              onChange={this.handleChange}
            />
            <button
              className="btn btn-outline-success my-2 my-sm-0"
              type="submit"
            >
              Search
            </button>
          </form> */}
        </nav>
        <div style={{height:"100px"}}></div>
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

export default withRouter(
  connect(mapStateToProps, {
    logMeOut,
    clearErrors,
    clearSuccess
  })(Header)
);
