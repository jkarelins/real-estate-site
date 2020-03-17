import React, { Component, Fragment } from "react";
import { createUser } from "../../actions/user";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

const initialState = {
  username: "",
  email: "",
  password: "",
  repeatPassword: "",
  role: "",
  showPrivateMenu: false
};

class SignUpForm extends Component {
  state = initialState;

  signUp = e => {
    e.preventDefault();
    this.props.createUser(this.state);
    this.setState(initialState);
  };

  handleChange = e => {
    e.preventDefault();
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  showPrivPersMenu = () => {
    this.setState({
      showPrivateMenu: true
    });
  };

  render() {
    return (
      <Fragment>
        <div className="d-flex flex-row justify-content-center mt-5">
          <div className="col-10 col-md-8 col-lg-6 col-xl-4">
            <div className="card p-5">
              <h4>Sign Up</h4>
              <form onSubmit={this.signUp}>
                <div className="form-group">
                  <label htmlFor="username">Username</label>
                  <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    className="form-control"
                    value={this.state.username}
                    onChange={e => this.handleChange(e)}
                    required
                  />
                  <small className="form-text text-muted">
                    Choose username for your account
                  </small>
                </div>
                <div className="form-group">
                  <label htmlFor="email">Your Email</label>
                  <input
                    type="email"
                    placeholder="email"
                    name="email"
                    value={this.state.email}
                    onChange={e => this.handleChange(e)}
                    required
                  />
                </div>
                <div className="form-group">
                  <button type="button" onClick={this.showPrivPersMenu}>
                    I am Private person
                  </button>
                  <button type="button">Company Representative</button>

                  {this.state.showPrivateMenu ? (
                    <div>
                      <label>
                        I want sell property
                        <input type="radio" name="agencyManager" />
                      </label>
                      <label>
                        I want buy property
                        <input type="radio" name="agencyManager" />
                      </label>
                    </div>
                  ) : (
                    ""
                  )}
                  {/* <label htmlFor="selectAccountType">
                    Select Account type you want to register:
                  </label>
                  <label>
                    Private Person selling property
                    <input type="radio" name="agencyManager" />
                  </label>
                  <label>
                    I want to buy property
                    <input type="radio" name="agencyManager" />
                  </label>
                  <label>
                    Real Estate Agency Manager
                    <input type="radio" name="agencyManager" />
                  </label>
                  <label>
                    Real Estate Agency Agent
                    <input type="radio" name="agencyManager" />
                  </label> */}
                </div>
                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    className="form-control"
                    value={this.state.password}
                    onChange={e => this.handleChange(e)}
                    required
                  />
                  <small className="form-text text-muted">
                    Choose password for your account
                  </small>
                </div>
                <div className="form-group">
                  <label htmlFor="repeatPassword">Repeat Password</label>
                  <input
                    type="password"
                    name="repeatPassword"
                    placeholder="Repeat Password"
                    className="form-control"
                    value={this.state.repeatPassword}
                    onChange={e => this.handleChange(e)}
                    required
                  />
                  <small className="form-text text-muted">
                    Choose password for your account
                  </small>
                </div>
                <div className="form-group">
                  <input
                    type="submit"
                    value="SIGN UP"
                    className="btn btn-md btn-success"
                  />
                </div>
              </form>
              <p>I have account</p>
              <Link to="/login">Login</Link>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.userReducer
  };
}

export default connect(mapStateToProps, { createUser })(SignUpForm);
