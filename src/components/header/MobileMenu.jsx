import React, { Component, Fragment } from 'react';
import { Link } from "react-router-dom";


export default class MobileMenu extends Component {
  state = {
    mobileHeight: 8,
    margin: 100,
    opened: false
  }
  toggleMenu = () => {
    if(this.state.opened){
      this.setState({
        mobileHeight: 110,
        margin: 0,
        opened: false
      })
    } else {
      this.setState({
        mobileHeight: 8,
        margin: 100,
        opened: true
      })
    }
  }
  render() {
    return (
      <nav className={`mainNav d-inline-block text-right pr-3 d-md-none 
      ${this.props.scrollDirection==='DOWN'?'navHidden':'navVisible'}`} style={{height:`${this.state.mobileHeight}vh`}}>
        <ul className="navbar-nav mr-auto">
          <li className="nav-item mr-2 mt-2" onClick={this.toggleMenu}>
            <i className="fa fa-bars" style={{fontSize: '40px', color: '#EDF7F6'}}></i>
          </li>
        </ul>
        <ul className="navbar-nav mr-auto" style={{marginTop: `-${this.state.margin}vh`}} onClick={this.toggleMenu}>
          {this.props.user ? (
            <Fragment>
              <li className="nav-item mr-2 mt-3">
                <Link className="mobileLink" to="/">
                  Home
                </Link>
              </li>
              <li className="nav-item mr-2 mt-3">
                <Link className="mobileLink" to="/favorites">
                  My Favorite Adverts
                </Link>
              </li>
              <li className="nav-item mr-2 mt-3">
                <Link className="mobileLink" to="/myadverts">
                  My Adverts
                </Link>
              </li>
              {/* <li className="nav-item mr-2 mt-3">
                <Link className="mobileLink" to="/appointment">
                  My Appointments
                </Link>
              </li> */}
              <li className="nav-item mr-2 mt-3">
                <Link className="mobileLink" to="/user">
                  My Account
                </Link>
              </li>
              <li className="nav-item mr-2 mt-3">
                <a className="mobileLink" onClick={this.props.logoutUser} href="/">
                  Logout
                </a>
              </li>
            </Fragment>
          ) : (
            <Fragment>
              <li className="nav-item mr-2 mt-3">
                <Link className="mobileLink" to="/">
                  Home
                </Link>
              </li>
              <li className="nav-item mr-2 mt-3">
                <Link className="mobileLink" to="/login">
                  Login
                </Link>
              </li>
              <li className="nav-item mr-2 mt-3">
                <Link className="mobileLink" to="/register">
                  Register
                </Link>
              </li>
            </Fragment>
          )}
        </ul>
      </nav>
    )
  }
}
