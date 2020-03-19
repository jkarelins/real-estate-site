import React, { Component, Fragment } from "react";
import { createUser } from "../../actions/user";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";

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
      role: "privatePerson"
    });
  };

  showMenuForCompany = () => {
    this.setState({
      ...this.state,
      showPrivateMenu: false,
      showCompanyMenu: true,
      role: ""
    });
  };

  searchAgency = () => {
    axios
      .get(`http://localhost:4000/agency/findby?name=${this.state.companyName}`)
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
      companyName
    });
  };

  render() {
    return (
      <Fragment>
        {this.state.error ? <p>{this.state.error}</p> : ""}
        <div className="d-flex flex-row justify-content-center mt-5">
          <div className="col-10 col-md-8 col-lg-6 col-xl-4">
            <div className="card p-5">
              <h4>Sign Up</h4>
              <form onSubmit={this.signUpValidation}>
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
                    placeholder="Email"
                    name="email"
                    value={this.state.email}
                    onChange={e => this.handleChange(e)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="phoneNumber">Phone Number</label>
                  <input
                    type="text"
                    placeholder="Phone Number"
                    name="phoneNumber"
                    value={this.state.phoneNumber}
                    onChange={e => this.handleChange(e)}
                  />
                </div>
                <div className="form-group">
                  <button type="button" onClick={this.showPrivPersMenu}>
                    I am Private person
                  </button>
                  <button type="button" onClick={this.showMenuForCompany}>
                    Company Representative
                  </button>

                  {this.state.showPrivateMenu ? (
                    <p>You have selected to create private person's profile</p>
                  ) : this.state.showCompanyMenu ? (
                    <div>
                      <label>
                        Real Estate Agency Manager
                        <input
                          type="radio"
                          name="agencyManager"
                          value="agencyManager"
                          onChange={this.handleRadioButton}
                        />
                      </label>
                      <label>
                        Real Estate Agency Agent
                        <input
                          type="radio"
                          name="agencyManager"
                          value="agencyAgent"
                          onChange={this.handleRadioButton}
                        />
                      </label>
                    </div>
                  ) : (
                    ""
                  )}

                  {this.state.role === "agencyAgent" ? (
                    <div className="form-group">
                      <label htmlFor="companyName">Agency Name</label>
                      <input
                        type="text"
                        name="companyName"
                        placeholder="Company Name"
                        className="form-control"
                        value={this.state.companyName}
                        onChange={e => this.handleChange(e)}
                        required
                      />
                      <button type="button" onClick={this.searchAgency}>
                        Search
                      </button>
                      {this.state.companyArr.length !== 0 ? (
                        <ul>
                          {this.state.companyArr.map((company, i) => (
                            <li
                              key={i}
                              onClick={() => this.selectCompany(company.name)}
                            >
                              {company.name}
                            </li>
                          ))}
                        </ul>
                      ) : this.state.companySelected ? (
                        ""
                      ) : (
                        <small>
                          <ol>
                            <li>Input keyword to search for company</li>
                            <li>Press Search</li>
                            <li>Select your company name from list</li>
                          </ol>
                        </small>
                      )}
                    </div>
                  ) : this.state.role === "agencyManager" ? (
                    <div className="form-group">
                      <label htmlFor="companyName">Agency Name</label>
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
