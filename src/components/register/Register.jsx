import React, { Component, Fragment } from "react";
import { createUser } from "../../actions/user";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

const initialState = {
  email: "",
  password: ""
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
                    value={this.state.email}
                    onChange={e => this.handleChange(e)}
                  />
                  <small className="form-text text-muted">
                    Choose username for your account
                  </small>
                </div>
                <div className="form-group">
                  <label htmlFor="username">Password</label>
                  <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    className="form-control"
                    value={this.state.password}
                    onChange={e => this.handleChange(e)}
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
