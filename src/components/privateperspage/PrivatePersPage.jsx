import React, { Component } from "react";
import { connect } from "react-redux";
import UserHasNoCredits from "./UserHasNoCredits";
import UserHasCredits from "./UserHasCredits";
import PaymentWraper from "../pay/PaymentWraper";

const initialState = {
  topUp: false,
  success: false,
  amountInEUR: 0
};
class PrivatePersPage extends Component {
  state = initialState;

  topUp = () => {
    if (this.state.amountInEUR < 1) return;
    this.setState({
      topUp: true,
      success: false
    });
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  componentDidUpdate(prevProps) {
    if (prevProps.user.paidAdvertLimit !== this.props.user.paidAdvertLimit) {
      this.setState({ ...initialState, success: true });
    }
  }

  render() {
    const haveCredits =
      this.props.user.paidAdvertLimit === 0 &&
      this.props.user.freeAdvertLimit === 0;
    return (
      <div>
        {this.state.success ? (
          <h4>Your account was successfuly charged</h4>
        ) : this.state.topUp ? (
          <PaymentWraper amountInCents={+this.state.amountInEUR * 100} />
        ) : (
          <div>
            <label htmlFor="topUpSum">
              <input
                type="number"
                name="amountInEUR"
                placeholder=""
                min="1"
                max="100"
                step="1"
                value={this.state.amountInEUR}
                onChange={this.handleChange}
              />
              EUR
            </label>
            <button onClick={this.topUp}>Top Up Balance</button>
          </div>
        )}
        {haveCredits ? (
          <UserHasNoCredits user={this.props.user} />
        ) : (
          <UserHasCredits user={this.props.user} />
        )}
      </div>
    );
  }
}

function mapStateToProps(state) {
  if (state.userReducer) {
    return {
      user: state.userReducer.user
    };
  }
}

export default connect(mapStateToProps)(PrivatePersPage);
