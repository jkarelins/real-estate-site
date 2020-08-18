import React, { Component, Fragment } from "react";
import { withRouter } from "react-router";
import { connect } from "react-redux";

import { logMeOut } from "../../actions/user";
import { clearErrors, clearSuccess } from "../../actions/error";

import DesktopMenu from "./DesktopMenu";
import MobileMenu from './MobileMenu';

import "./header.css";
import ErrorAlert from "./ErrorAlert";
import SuccessAlert from "./SuccessAlert";

class Header extends Component {
  state = {
    search: "",
    scrolling: false,
    prevScrollValue: 0, 
    scrollDirection: false
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  searchByCityname = e => {
    e.preventDefault();
    this.props.history.push(`/search/city/${this.state.search}`);
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

  componentDidMount = () => {
    window.addEventListener('scroll', this.handleScroll);
  };

  componentWillUnmount = () => {
      window.removeEventListener('scroll', this.handleScroll);
  };

  handleScroll = (event) => {
    if((window.scrollY - 5 > this.state.prevScrollValue) && (!this.state.scrollDirection || this.state.scrollDirection==='UP')){
      this.setState({
        scrollDirection: 'DOWN',
      });
    } else if((window.scrollY + 5 < this.state.prevScrollValue) && (!this.state.scrollDirection || this.state.scrollDirection==='DOWN')) {
      this.setState({
        scrollDirection: 'UP',
      });
    } 
    this.setState({prevScrollValue: window.scrollY})
  };

  render() {
    return (
      <Fragment>
        {/* Desktop menu */}
        <DesktopMenu scrollDirection={this.state.scrollDirection} user={this.props.user} logoutUser={this.logoutUser} />
        {/* Mobile menu */}
        <MobileMenu scrollDirection={this.state.scrollDirection} user={this.props.user} logoutUser={this.logoutUser} />
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
