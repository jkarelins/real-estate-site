import React, { Component, Fragment } from "react";
import { createUser } from "../../actions/user";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";
let baseUrl = "";
if (process.env.NODE_ENV === "development") {
  baseUrl = "http://localhost:4000";
} else {
  baseUrl = "https://shielded-journey-92023.herokuapp.com";
}

const initialState = {
  username: "",
  email: "",
  phoneNumber: "",
  password: "",
  repeatPassword: "",
  role: "",
  showPrivateMenu: false,
  showCompanyMenu: false,
  error: "",
  companyName: "",
  companyArr: [],
  companySelected: false,
  kvkNumber: 0
};

class SignUpForm extends Component {
  state = initialState;

  signUpValidation = e => {
    e.preventDefault();
    if (!this.state.role) {
      return this.setState({
        ...this.state,
        error: "Please select account type you want create"
      });
    }
    if (!this.state.password || this.state.password.length < 8) {
      return this.setState({
        ...this.state,
        error: "Password should be 8 symbols long or more"
      });
    }
    if (this.state.password !== this.state.repeatPassword) {
      return this.setState({
        ...this.state,
        password: "",
        repeatPassword: "",
        error: "Passwords does not match. Enter passwords one more time."
      });
    }
    this.canSignUp();
  };

  canSignUp = () => {
    this.props.createUser(this.state);
    this.setState(initialState);
    this.props.history.push("/user");
  };

  handleChange = e => {
    e.preventDefault();
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleRadioButton = e => {
    this.setState({
      role: e.target.value
    });
  };

  showPrivPersMenu = () => {
    this.setState({
      ...this.state,
      showPrivateMenu: true,
      showCompanyMenu: false,
      error: "",
      role: "privatePerson"
    });
  };

  showMenuForCompany = () => {
    this.setState({
      ...this.state,
      showPrivateMenu: false,
      showCompanyMenu: true,
      error: "",
      role: ""
    });
  };

  searchAgency = () => {
    axios
      .get(`${baseUrl}/agency/findby?name=${this.state.companyName}`)
      .then(res => {
        this.setState({
          ...this.state,
          companyArr: res.data
        });
      })
      .catch(err => console.log(err));
  };

  selectCompany = companyName => {
    this.setState({
      ...this.state,
      companyArr: [],
      companySelected: true,
      error: "",
      companyName
    });
  };

  render() {
    return (
      <Fragment>
        <div className="container mt-2">
          {this.state.error ? (
            <div className="alert alert-warning" role="alert">
              {this.state.error}
            </div>
          ) : (
            ""
          )}
        </div>
        <div className="d-flex flex-row justify-content-center mt-5">
          <div className="col-12 col-md-8 col-lg-6 col-xl-3">
            <div className="card p-5">
              <h4>Sign Up</h4>
              <form onSubmit={this.signUpValidation}>
                <div className="form-group">
                  <label htmlFor="email">Email Address</label>
                  <input
                    type="email"
                    placeholder="Email"
                    name="email"
                    className="form-control"
                    autoComplete="email"
                    value={this.state.email}
                    onChange={e => this.handleChange(e)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="username">Name & Surname</label>
                  <input
                    type="text"
                    name="username"
                    placeholder="Your First Name & Second Name"
                    className="form-control"
                    autoComplete="name"
                    value={this.state.username}
                    onChange={e => this.handleChange(e)}
                    required
                  />
                  <small className="form-text text-muted">
                    Please, input your First name & Second name
                  </small>
                </div>
                <div className="form-group">
                  <label htmlFor="phoneNumber">Phone Number</label>
                  <input
                    type="text"
                    placeholder="Phone Number"
                    name="phoneNumber"
                    className="form-control"
                    value={this.state.phoneNumber}
                    onChange={e => this.handleChange(e)}
                  />
                </div>
                <div className="form-group">
                  <button
                    type="button"
                    className={
                      this.state.error
                        ? "btn btn-lg btn-danger ml-2 mt-1"
                        : "btn btn-sm btn-outline-info ml-2 mt-1"
                    }
                    onClick={this.showPrivPersMenu}
                  >
                    I am Private person
                  </button>
                  {/* <button
                    type="button"
                    className={
                      this.state.error
                        ? "btn btn-lg btn-danger ml-2 mt-1"
                        : "btn btn-sm btn-outline-info ml-2 mt-1"
                    }
                    onClick={this.showMenuForCompany}
                  >
                    Company Representative
                  </button> */}

                  {this.state.showPrivateMenu ? (
                    <div className="alert alert-success mt-3" role="alert">
                      You have selected to create private person's profile
                    </div>
                  ) : this.state.showCompanyMenu ? (
                    <div className="mt-3">
                      <label>
                        Real Estate Company Manager
                        <input
                          type="radio"
                          name="agencyManager"
                          value="agencyManager"
                          autoComplete="organization"
                          onChange={this.handleRadioButton}
                        />
                      </label>
                      <label>
                        Real Estate Company Agent
                        <input
                          type="radio"
                          name="agencyManager"
                          value="agencyAgent"
                          autoComplete="organization"
                          onChange={this.handleRadioButton}
                        />
                      </label>
                    </div>
                  ) : (
                    ""
                  )}

                  {this.state.role === "agencyAgent" ? (
                    <div className="form-group">
                      <div className="text-center">
                        <label htmlFor="companyName">Company Name</label>
                      </div>
                      <input
                        type="text"
                        name="companyName"
                        placeholder="Company Name"
                        className="form-control"
                        value={this.state.companyName}
                        onChange={e => this.handleChange(e)}
                        required
                      />
                      <div className="text-center">
                        <button
                          type="button"
                          className="btn btn-sm btn-info mt-2"
                          onClick={this.searchAgency}
                        >
                          Search
                        </button>
                      </div>
                      {this.state.companyArr.length !== 0 ? (
                        <div>
                          {this.state.companyArr.map((company, i) => (
                            <button
                              key={i}
                              className="btn btn-sm btn-outline-info mt-1 ml-1"
                              onClick={() => this.selectCompany(company.name)}
                            >
                              {company.name}
                            </button>
                          ))}
                        </div>
                      ) : this.state.companySelected ? (
                        ""
                      ) : (
                        <div className="mt-2">
                          <small>
                            <ol>
                              <li>Input keyword to search for company</li>
                              <li>Press Search</li>
                              <li>Select your company name from list</li>
                            </ol>
                          </small>
                        </div>
                      )}
                    </div>
                  ) : this.state.role === "agencyManager" ? (
                    <div className="form-group">
                      <label htmlFor="companyName">Company Name</label>
                      <input
                        type="text"
                        name="companyName"
                        placeholder="Company Name"
                        className="form-control"
                        value={this.state.companyName}
                        onChange={e => this.handleChange(e)}
                        required
                      />
                    </div>
                  ) : (
                    ""
                  )}
                </div>
                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    className="form-control"
                    autoComplete="new-password"
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
                    autoComplete="new-password"
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
